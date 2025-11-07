// Database seeding script with dummy data
import { config } from "dotenv"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

// Load environment variables from .env file
config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/inventra"

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const db = client.db("inventra")

    // Clear existing data
    await db.collection("users").deleteMany({})
    await db.collection("products").deleteMany({})
    await db.collection("stockMovements").deleteMany({})
    await db.collection("notifications").deleteMany({})

    console.log("Creating users...")
    const users = []
    const adminPassword = await bcrypt.hash("admin123", 10)
    const staffPassword = await bcrypt.hash("staff123", 10)

    // Admin users
    for (let i = 1; i <= 3; i++) {
      users.push({
        fullName: `Admin User ${i}`,
        email: `admin${i}@inventra.com`,
        phone: `+1201555${1000 + i}`,
        password: adminPassword,
        role: "Admin",
        createdAt: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1),
      })
    }

    // Staff users
    for (let i = 1; i <= 17; i++) {
      users.push({
        fullName: `Staff Member ${i}`,
        email: `staff${i}@inventra.com`,
        phone: `+1201555${2000 + i}`,
        password: staffPassword,
        role: "Staff",
        createdAt: new Date(2024, Math.floor(Math.random() * 6), Math.floor(Math.random() * 28) + 1),
      })
    }

    const usersResult = await db.collection("users").insertMany(users)
    console.log(`Inserted ${usersResult.insertedCount} users`)

    // Insert products for Stocks
    console.log("Creating products for Stocks...")
    const categories = ["Mobile Phones", "Laptops & Computers", "Television & Audio", "Home Appliances", "Gaming & Accessories", "Smart Devices & IoT", "Cameras & Photography", "Computer Components"]

    // Price ranges in INR for different categories
    const getPriceForCategory = (category: string): number => {
      const priceRanges = {
        "Mobile Phones": { min: 15000, max: 150000 },
        "Laptops & Computers": { min: 25000, max: 250000 },
        "Television & Audio": { min: 8000, max: 300000 },
        "Home Appliances": { min: 5000, max: 80000 },
        "Gaming & Accessories": { min: 2000, max: 60000 },
        "Smart Devices & IoT": { min: 1500, max: 45000 },
        "Cameras & Photography": { min: 3000, max: 400000 },
        "Computer Components": { min: 2500, max: 200000 }
      }
      const range = priceRanges[category as keyof typeof priceRanges] || { min: 1000, max: 10000 }
      return Math.random() * (range.max - range.min) + range.min
    }

    // Generate realistic descriptions for   products
    const getDescriptionForCategory = (category: string, productName: string): string => {
      const descriptions = {
        "Mobile Phones": `Latest ${productName} with advanced camera system, fast processor, and long-lasting battery. Perfect for photography, gaming, and daily use.`,
        "Laptops & Computers": `High-performance ${productName} ideal for work, gaming, and content creation. Features latest processors and premium build quality.`,
        "Television & Audio": `Premium ${productName} delivering exceptional picture/sound quality with smart features and modern connectivity options.`,
        "Home Appliances": `Energy-efficient ${productName} designed for Indian homes. Reliable, durable, and packed with innovative features.`,
        "Gaming & Accessories": `Professional-grade ${productName} for serious gamers. Enhanced performance, comfort, and precision for competitive gaming.`,
        "Smart Devices & IoT": `Smart ${productName} with voice control and app integration. Make your home smarter and more convenient.`,
        "Cameras & Photography": `Professional ${productName} for photography enthusiasts. Capture stunning photos and videos with advanced features.`,
        "Computer Components": `High-quality ${productName} for building powerful PCs. Excellent performance and reliability for demanding applications.`
      }
      return descriptions[category as keyof typeof descriptions] || `Premium ${productName} with excellent build quality and performance.`
    }
    const productNames = {
      "Mobile Phones": [
        "iPhone 15 Pro Max 256GB",
        "Samsung Galaxy S24 Ultra 512GB",
        "OnePlus 12 256GB",
        "Xiaomi 14 Ultra 512GB",
        "Google Pixel 8 Pro 128GB",
        "Vivo X100 Pro 256GB",
        "Oppo Find X7 Ultra 512GB",
        "Realme GT 5 Pro 256GB",
        "Nothing Phone (2a) 128GB",
        "Motorola Edge 50 Ultra 256GB"
      ],
      "Laptops & Computers": [
        "Dell XPS 13 i7 16GB",
        "HP Pavilion 15 Ryzen 7",
        "Lenovo ThinkPad X1 Carbon",
        "Asus ROG Strix G15 RTX 4060",
        "Acer Predator Helios 300",
        "MSI Gaming Laptop GF63",
        "Apple MacBook Air M2 256GB",
        "HP Envy x360 Convertible",
        "Lenovo IdeaPad Gaming 3",
        "Asus VivoBook Pro 15"
      ],
      "Television & Audio": [
        "Sony Bravia 55\" 4K Smart TV",
        "Samsung Neo QLED 65\" 8K TV",
        "LG OLED C3 55\" 4K TV",
        "TCL C835 Mini LED 65\" TV",
        "OnePlus TV 50\" 4K Android",
        "Mi TV 5X 55\" 4K Smart TV",
        "Sony WH-1000XM5 Headphones",
        "JBL PartyBox 310 Speaker",
        "Bose QuietComfort 45",
        "boAt Rockerz 550 Wireless"
      ],
      "Home Appliances": [
        "LG Double Door Refrigerator 260L",
        "Samsung Front Load Washing Machine",
        "Whirlpool Split AC 1.5 Ton",
        "IFB Microwave Oven 25L",
        "Philips Air Fryer 4.1L",
        "Bajaj Mixer Grinder 750W",
        "Crompton Ceiling Fan 1200mm",
        "Orient Electric Water Heater 15L",
        "Prestige Induction Cooktop 2000W",
        "Kent Grand Plus RO Water Purifier"
      ],
      "Gaming & Accessories": [
        "Sony PlayStation 5 Console",
        "Microsoft Xbox Series X",
        "Nintendo Switch OLED",
        "Logitech G Pro X Gaming Headset",
        "Razer DeathAdder V3 Gaming Mouse",
        "Corsair K95 RGB Mechanical Keyboard",
        "ASUS ROG Swift 27\" Gaming Monitor",
        "SteelSeries Arctis 7P Wireless",
        "HyperX Cloud Flight Gaming Headset",
        "Sony DualSense Wireless Controller"
      ],
      "Smart Devices & IoT": [
        "Amazon Echo Dot 5th Gen",
        "Google Nest Hub 2nd Gen",
        "Philips Hue Smart Bulb E27",
        "TP-Link Tapo Smart Camera",
        "Samsung SmartThings Hub",
        "Mi Smart Band 8",
        "Apple Watch Series 9 GPS",
        "Fitbit Charge 6 Fitness Tracker",
        "Honeywell Smart Thermostat",
        "Ring Video Doorbell 4"
      ],
      "Cameras & Photography": [
        "Canon EOS R6 Mark II Body",
        "Sony Alpha A7 IV Mirrorless",
        "Nikon D780 DSLR Body",
        "Fujifilm X-T5 Mirrorless",
        "GoPro Hero 12 Black Action Camera",
        "DJI Mini 4 Pro Drone",
        "Canon RF 24-70mm f/2.8L Lens",
        "Sony FE 85mm f/1.8 Lens",
        "Manfrotto Carbon Fiber Tripod",
        "SanDisk Extreme Pro 128GB SD Card"
      ],
      "Computer Components": [
        "NVIDIA GeForce RTX 4090 24GB",
        "AMD Radeon RX 7900 XTX 24GB",
        "Intel Core i9-14900K Processor",
        "AMD Ryzen 9 7950X Processor",
        "ASUS ROG Strix Z790-E Motherboard",
        "Corsair Vengeance DDR5 32GB RAM",
        "Samsung 980 PRO 2TB NVMe SSD",
        "WD Black SN850X 1TB NVMe SSD",
        "Corsair RM1000x 1000W PSU",
        "NZXT Kraken Z73 360mm AIO Cooler"
      ]
    }

    const products = []
    let productCount = 0

    for (const category of categories) {
      for (let i = 0; i < 30; i++) {
        const nameList = productNames[category as keyof typeof productNames]
        const baseName = nameList[i % nameList.length]
        const quantity = Math.floor(Math.random() * 500)
        const lowStockThreshold = Math.floor(Math.random() * 20) + 5

        products.push({
          name: `${baseName} - Variant ${Math.floor(i / nameList.length) + 1}`,
          sku: `SKU${String(88000 + productCount).padStart(5, "0")}`,
          category,
          quantity,
          price: Math.round(getPriceForCategory(category) * 100) / 100,
          description: getDescriptionForCategory(category, baseName),
          imageUrl: `/placeholder.svg?height=200&width=200&query=${category}%20product`,
          lowStockThreshold,
          addedBy: Object.values(usersResult.insertedIds)[Math.floor(Math.random() * Object.keys(usersResult.insertedIds).length)],
          createdAt: new Date(2025, Math.random() > 0.5 ? 8 : 9, Math.floor(Math.random() * 28) + 1),
        })
        productCount++
      }
    }

    const productsResult = await db.collection("products").insertMany(products)
    console.log(`Inserted ${productsResult.insertedCount} products`)

    // Insert stock movements
    console.log("Creating stock movements...")
    const movements = []
    const movementTypes = ["Purchase", "Sale", "Damage", "Return", "Initial"]

    for (let i = 0; i < 500; i++) {
      const product = products[Math.floor(Math.random() * products.length)]
      const quantityChange = Math.floor(Math.random() * 100) - 20

      movements.push({
        product: productsResult.insertedIds[products.indexOf(product)],
        sku: product.sku,
        type: movementTypes[Math.floor(Math.random() * movementTypes.length)],
        quantityChange,
        newQuantity: Math.max(0, product.quantity + quantityChange),
        reason: `Stock ${Math.random() > 0.5 ? "addition" : "adjustment"} for inventory management`,
        user: Object.values(usersResult.insertedIds)[Math.floor(Math.random() * Object.keys(usersResult.insertedIds).length)],
        timestamp: new Date(
          2025,
          Math.random() > 0.5 ? 8 : 9, // September (8) or October (9)
          Math.floor(Math.random() * 28) + 1,
          Math.floor(Math.random() * 24),
          Math.floor(Math.random() * 60),
        ),
      })
    }

    const movementsResult = await db.collection("stockMovements").insertMany(movements)
    console.log(`Inserted ${movementsResult.insertedCount} stock movements`)

    // Insert notifications
    console.log("Creating notifications...")
    const notifications = []

    for (let i = 0; i < 50; i++) {
      const product = products[Math.floor(Math.random() * products.length)]
      notifications.push({
        type: i % 2 === 0 ? "Low Stock" : "Stock Change",
        message: i % 2 === 0 ? `Product "${product.name}" is low on stock` : `Stock updated for "${product.name}"`,
        read: Math.random() > 0.4,
        user: Object.values(usersResult.insertedIds)[Math.floor(Math.random() * Object.keys(usersResult.insertedIds).length)],
        timestamp: new Date(
          2025,
          Math.random() > 0.5 ? 8 : 9, // September (8) or October (9)
          Math.floor(Math.random() * 28) + 1,
          Math.floor(Math.random() * 24),
          Math.floor(Math.random() * 60),
        ),
      })
    }

    const notificationsResult = await db.collection("notifications").insertMany(notifications)
    console.log(`Inserted ${notificationsResult.insertedCount} notifications`)

    // Create indexes
    console.log("Creating indexes...")
    await db.collection("users").createIndex({ email: 1 }, { unique: true })
    await db.collection("users").createIndex({ phone: 1 }, { unique: true })
    await db.collection("products").createIndex({ sku: 1 }, { unique: true })
    await db.collection("products").createIndex({ category: 1 })
    await db.collection("stockMovements").createIndex({ timestamp: -1 })
    await db.collection("notifications").createIndex({ user: 1, timestamp: -1 })

    console.log("Database seeding completed successfully!")
  } finally {
    await client.close()
  }
}

seedDatabase().catch(console.error)
