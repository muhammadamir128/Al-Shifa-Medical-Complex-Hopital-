import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

// GET - Fetch all medications
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const category = searchParams.get("category")
    const lowStock = searchParams.get("lowStock")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")
    const skip = (page - 1) * limit

    const where: any = {}
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { genericName: { contains: search, mode: "insensitive" } }
      ]
    }

    if (category && category !== "ALL") {
      where.category = category
    }

    if (lowStock === "true") {
      where.stockQuantity = { lte: db.medication.fields.reorderLevel }
    }

    const [medications, total] = await Promise.all([
      db.medication.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: "asc" }
      }),
      db.medication.count({ where })
    ])

    return NextResponse.json({
      medications,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching medications:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create new medication
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !["ADMIN", "SUPER_ADMIN", "PHARMACIST"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { 
      name, 
      genericName, 
      category, 
      manufacturer, 
      description, 
      unitPrice, 
      stockQuantity, 
      reorderLevel, 
      expiryDate, 
      batchNumber, 
      location 
    } = body

    const medication = await db.medication.create({
      data: {
        name,
        genericName,
        category,
        manufacturer,
        description,
        unitPrice: parseFloat(unitPrice),
        stockQuantity: parseInt(stockQuantity),
        reorderLevel: parseInt(reorderLevel) || 10,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        batchNumber,
        location
      }
    })

    return NextResponse.json({ medication }, { status: 201 })
  } catch (error) {
    console.error("Error creating medication:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
