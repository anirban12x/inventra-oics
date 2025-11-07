import { MongoClient } from "mongodb"
import { config } from "dotenv"

config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/inventra"

async function clearDatabase() {
    const client = new MongoClient(MONGODB_URI)

    try {
        await client.connect()
        const db = client.db("inventra")

        console.log("Clearing existing database...")

        // Drop all collections
        const collections = await db.collections()
        for (const collection of collections) {
            await collection.drop()
            console.log(`Dropped collection: ${collection.collectionName}`)
        }

        console.log("Database cleared successfully!")

    } catch (error) {
        console.error("Error clearing database:", error)
    } finally {
        await client.close()
    }
}

clearDatabase()
