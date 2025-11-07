import { MongoClient } from "mongodb"
import { config } from "dotenv"

config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/inventra"

// Approximate USD to INR conversion rate
const USD_TO_INR_RATE = 83

async function convertCurrencyInDatabase() {
    const client = new MongoClient(MONGODB_URI)

    try {
        await client.connect()
        const db = client.db("inventra")

        console.log("Converting currency from USD ($) to INR (₹)...")
        console.log(`Using conversion rate: 1 USD = ${USD_TO_INR_RATE} INR`)

        // Update all products - convert prices from USD to INR
        const productsResult = await db.collection("products").updateMany(
            {},
            [
                {
                    $set: {
                        price: {
                            $round: [
                                { $multiply: ["$price", USD_TO_INR_RATE] },
                                2
                            ]
                        }
                    }
                }
            ]
        )

        console.log(`Updated ${productsResult.modifiedCount} products with INR prices`)

        // Optionally, you can also update any other collections that might have price/currency fields
        // For example, if you have orders, sales records, etc.

        console.log("Currency conversion completed successfully!")

    } catch (error) {
        console.error("Error converting currency:", error)
    } finally {
        await client.close()
    }
}

convertCurrencyInDatabase()
