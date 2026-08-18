import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

// GET - Fetch all departments
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const departments = await db.department.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            doctors: true,
            nurses: true
          }
        }
      }
    })

    return NextResponse.json({ departments })
  } catch (error) {
    console.error("Error fetching departments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create new department
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, head, phone } = body

    // Check if department exists
    const existingDepartment = await db.department.findUnique({
      where: { name }
    })

    if (existingDepartment) {
      return NextResponse.json({ error: "Department already exists" }, { status: 400 })
    }

    const department = await db.department.create({
      data: {
        name,
        description,
        head,
        phone
      }
    })

    return NextResponse.json({ department }, { status: 201 })
  } catch (error) {
    console.error("Error creating department:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
