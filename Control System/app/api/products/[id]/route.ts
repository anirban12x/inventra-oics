import { NextRequest, NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/inventra"

async function connectToDatabase() {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    return client.db("inventra")
}

// PUT update product
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const db = await connectToDatabase()
        const body = await request.json()
        const { id } = params

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
        }

        // Check if SKU already exists for other products
        if (body.sku) {
            const existingProduct = await db.collection("products").findOne({
                sku: body.sku,
                _id: { $ne: new ObjectId(id) }
            })
            if (existingProduct) {
                return NextResponse.json({ error: "SKU already exists" }, { status: 400 })
            }
        }

        const updateData = {
            ...body,
            quantity: Number(body.quantity) || 0,
            price: Number(body.price) || 0,
            lowStockThreshold: Number(body.lowStockThreshold) || 10,
            updatedAt: new Date(),
        }

        const result = await db.collection("products").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        )

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        const updatedProduct = await db.collection("products").findOne({ _id: new ObjectId(id) })

        return NextResponse.json({
            ...updatedProduct,
            id: updatedProduct!._id.toString(),
            status: updatedProduct!.quantity === 0
                ? "Out of Stock"
                : updatedProduct!.quantity <= updatedProduct!.lowStockThreshold
                    ? "Low Stock"
                    : "In Stock"
        })
    } catch (error) {
        console.error("Error updating product:", error)
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
    }
}

// DELETE product
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const db = await connectToDatabase()
        const { id } = params

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
        }

        const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) })

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Product deleted successfully" })
    } catch (error) {
        console.error("Error deleting product:", error)
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
    }
}
