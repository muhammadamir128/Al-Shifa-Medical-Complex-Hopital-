import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { hash } from "bcrypt"

type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "DOCTOR"
  | "NURSE"
  | "RECEPTIONIST"
  | "PHARMACIST"
  | "LAB_TECHNICIAN"
  | "PATIENT"

const Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  NURSE: "NURSE",
  RECEPTIONIST: "RECEPTIONIST",
  PHARMACIST: "PHARMACIST",
  LAB_TECHNICIAN: "LAB_TECHNICIAN",
  PATIENT: "PATIENT",
} as const

// Roles a visitor is allowed to create for themselves. ADMIN and
// SUPER_ADMIN are intentionally excluded — those accounts must be
// provisioned by an existing administrator, never self-registered.
const SELF_REGISTERABLE_ROLES: Role[] = [
  Role.PATIENT,
  Role.DOCTOR,
  Role.NURSE,
  Role.RECEPTIONIST,
  Role.PHARMACIST,
  Role.LAB_TECHNICIAN,
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      password,
      role,
      gender,
      bloodGroup,
      specialization,
      qualification,
      licenseNumber,
      shift,
    } = body

    // Validate required input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      )
    }

    // Enforce a minimum password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    // Resolve and authorize the requested role (defaults to PATIENT)
    const requestedRole = (role || Role.PATIENT) as Role
    if (!SELF_REGISTERABLE_ROLES.includes(requestedRole)) {
      return NextResponse.json(
        { error: "This role is not available for self-registration." },
        { status: 403 }
      )
    }

    // Role-specific required fields
    if (
      requestedRole === Role.DOCTOR &&
      (!specialization || !licenseNumber)
    ) {
      return NextResponse.json(
        { error: "Specialization and license number are required for doctors." },
        { status: 400 }
      )
    }

    if (requestedRole === Role.NURSE && !licenseNumber) {
      return NextResponse.json(
        { error: "License number is required for nurses." },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create the user and its role-specific profile record atomically,
    // so a failure half-way never leaves an orphaned user behind.
    const user = await db.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name,
          email: normalizedEmail,
          phone: phone || null,
          password: hashedPassword,
          role: requestedRole,
          isActive: true,
          emailVerified: false,
        },
      })

      switch (requestedRole) {
        case Role.PATIENT:
          await tx.patient.create({
            data: {
              userId: newUser.id,
              gender: gender || null,
              bloodGroup: bloodGroup || null,
            },
          })
          break

        case Role.DOCTOR:
          await tx.doctor.create({
            data: {
              userId: newUser.id,
              specialization: specialization || null,
              qualification: qualification || null,
              licenseNumber: licenseNumber || null,
            },
          })
          break

        case Role.NURSE:
          await tx.nurse.create({
            data: {
              userId: newUser.id,
              qualification: qualification || null,
              licenseNumber: licenseNumber || null,
              shift: shift || null,
            },
          })
          break

        // RECEPTIONIST, PHARMACIST and LAB_TECHNICIAN have no separate
        // profile table — the User record alone is sufficient.
      }

      return newUser
    })

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: user.id,
        role: user.role,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
