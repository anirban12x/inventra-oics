import { NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/inventra"

async function connectToDatabase() {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    return client.db("inventra")
}

export async function POST(request: NextRequest) {
    try {
        const db = await connectToDatabase()
        const { reportType, startDate, endDate } = await request.json()

        let data

        switch (reportType) {
            case "Inventory Status":
                data = await db.collection("products").find({}).toArray()
                break
            case "Transaction Log":
                data = await db.collection("stockMovements").find({
                    timestamp: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                }).toArray()
                break
            case "Low Stock Alerts":
                data = await db.collection("products").find({
                    $expr: { $lte: ["$quantity", "$lowStockThreshold"] }
                }).toArray()
                break
            case "Category Breakdown":
                data = await db.collection("products").aggregate([
                    { $group: { _id: "$category", count: { $sum: 1 }, totalQuantity: { $sum: "$quantity" } } },
                    { $project: { category: "$_id", count: 1, totalQuantity: 1, _id: 0 } }
                ]).toArray()
                break
            case "Monthly Summary":
                const start = new Date(startDate)
                const end = new Date(endDate)
                const sales = await db.collection("stockMovements").aggregate([
                    { $match: { type: "Sale", timestamp: { $gte: start, $lte: end } } },
                    { $group: { _id: null, totalSales: { $sum: "$quantityChange" } } }
                ]).toArray()
                const purchases = await db.collection("stockMovements").aggregate([
                    { $match: { type: "Purchase", timestamp: { $gte: start, $lte: end } } },
                    { $group: { _id: null, totalPurchases: { $sum: "$quantityChange" } } }
                ]).toArray()
                data = [{
                    period: `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`,
                    totalSales: sales.length > 0 ? Math.abs(sales[0].totalSales) : 0,
                    totalPurchases: purchases.length > 0 ? purchases[0].totalPurchases : 0,
                }]
                break
            default:
                return NextResponse.json({ error: "Invalid report type" }, { status: 400 })
        }

        return NextResponse.json(data)
    } catch (error) {
        console.error("Error generating report:", error)
        return NextResponse.json({ error: "Failed to generate report" }, { status: 500 })
    }
}
