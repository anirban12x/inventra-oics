import { NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/inventra"

async function connectToDatabase() {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    return client.db("inventra")
}

// GET all products
export async function GET(request: NextRequest) {
    try {
        const db = await connectToDatabase()
        const { searchParams } = new URL(request.url)
        const search = searchParams.get("search") || ""
        const category = searchParams.get("category") || ""

        let query: any = {}

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { sku: { $regex: search, $options: "i" } }
            ]
        }

        if (category && category !== "All") {
            query.category = category
        }

        const products = await db.collection("products").find(query).toArray()

        // Transform products to include status based on quantity and lowStockThreshold
        const transformedProducts = products.map(product => ({
            ...product,
            id: product._id.toString(),
            status: product.quantity === 0
                ? "Out of Stock"
                : product.quantity <= product.lowStockThreshold
                    ? "Low Stock"
                    : "In Stock"
        }))

        return NextResponse.json(transformedProducts)
    } catch (error) {
        console.error("Error fetching products:", error)
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }
}

// POST new product
export async function POST(request: NextRequest) {
    try {
        const db = await connectToDatabase()
        const body = await request.json()

        // Validate required fields
        if (!body.name || !body.sku || !body.category) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // Check if SKU already exists
        const existingProduct = await db.collection("products").findOne({ sku: body.sku })
        if (existingProduct) {
            return NextResponse.json({ error: "SKU already exists" }, { status: 400 })
        }

        const newProduct = {
            ...body,
            quantity: Number(body.quantity) || 0,
            price: Number(body.price) || 0,
            lowStockThreshold: Number(body.lowStockThreshold) || 10,
            createdAt: new Date(),
        }

        const result = await db.collection("products").insertOne(newProduct)

        const insertedProduct = await db.collection("products").findOne({ _id: result.insertedId })

        return NextResponse.json({
            ...insertedProduct,
            id: insertedProduct!._id.toString(),
            status: insertedProduct!.quantity === 0
                ? "Out of Stock"
                : insertedProduct!.quantity <= insertedProduct!.lowStockThreshold
                    ? "Low Stock"
                    : "In Stock"
        })
    } catch (error) {
        console.error("Error creating product:", error)
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }
}
