import { NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/inventra"

async function connectToDatabase() {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    return client.db("inventra")
}

// GET all stock movements
export async function GET(request: NextRequest) {
    try {
        const db = await connectToDatabase()
        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get("limit") || "50")
        const offset = parseInt(searchParams.get("offset") || "0")

        const movements = await db.collection("stockMovements")
            .aggregate([
                { $sort: { timestamp: -1 } },
                { $skip: offset },
                { $limit: limit },
                {
                    $lookup: {
                        from: "products",
                        localField: "product",
                        foreignField: "_id",
                        as: "productInfo"
                    }
                },
                {
                    $addFields: {
                        productName: {
                            $cond: {
                                if: { $gt: [{ $size: "$productInfo" }, 0] },
                                then: { $arrayElemAt: ["$productInfo.name", 0] },
                                else: "$productName"
                            }
                        }
                    }
                }
            ])
            .toArray()

        // Transform movements to include product and user details
        const transformedMovements = movements.map(movement => ({
            ...movement,
            id: movement._id.toString(),
            date: movement.timestamp.toISOString().split('T')[0],
            product: movement.productName || "Unknown Product",
        }))

        return NextResponse.json(transformedMovements)
    } catch (error) {
        console.error("Error fetching stock movements:", error)
        return NextResponse.json({ error: "Failed to fetch stock movements" }, { status: 500 })
    }
}

// POST new stock movement
export async function POST(request: NextRequest) {
    try {
        const db = await connectToDatabase()
        const body = await request.json()

        // Validate required fields
        if (!body.productId || !body.type || body.quantityChange === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // Get product details
        const product = await db.collection("products").findOne({ _id: new ObjectId(body.productId) })
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        // Calculate quantity change based on type
        let quantityChange = Math.abs(parseInt(body.quantityChange))
        if (body.type === "Sale" || body.type === "Damage") {
            quantityChange = -quantityChange
        }

        // Create stock movement record
        const stockMovement = {
            product: new ObjectId(body.productId),
            productName: product.name,
            sku: product.sku,
            type: body.type,
            quantityChange: quantityChange,
            newQuantity: Math.max(0, product.quantity + quantityChange),
            reason: body.reason || "",
            user: new ObjectId(body.userId || "000000000000000000000000"), // Default user ID
            timestamp: new Date(),
        }

        // Insert stock movement
        const movementResult = await db.collection("stockMovements").insertOne(stockMovement)

        // Update product quantity
        await db.collection("products").updateOne(
            { _id: new ObjectId(body.productId) },
            {
                $inc: { quantity: quantityChange },
                $set: { updatedAt: new Date() }
            }
        )

        // Get the inserted movement with full details
        const insertedMovement = await db.collection("stockMovements").findOne({ _id: movementResult.insertedId })

        return NextResponse.json({
            ...insertedMovement,
            id: insertedMovement!._id.toString(),
            date: insertedMovement!.timestamp.toISOString().split('T')[0],
            product: insertedMovement!.productName,
        })
    } catch (error) {
        console.error("Error creating stock movement:", error)
        return NextResponse.json({ error: "Failed to create stock movement" }, { status: 500 })
    }
}
