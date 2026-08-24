import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
import path from 'path'

type Role =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'DOCTOR'
  | 'NURSE'
  | 'RECEPTIONIST'
  | 'PHARMACIST'
  | 'LAB_TECHNICIAN'
  | 'PATIENT'

const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  RECEPTIONIST: 'RECEPTIONIST',
  PHARMACIST: 'PHARMACIST',
  LAB_TECHNICIAN: 'LAB_TECHNICIAN',
  PATIENT: 'PATIENT',
} as const

type AppointmentStatus =
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'

const AppointmentStatus = {
  SCHEDULED: 'SCHEDULED',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW',
} as const

type PaymentStatus =
  | 'PENDING'
  | 'PAID'
  | 'PARTIALLY_PAID'
  | 'REFUNDED'
  | 'CANCELLED'

const PaymentStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED',
} as const

type PrescriptionStatus = 'PENDING' | 'DISPENSED' | 'CANCELLED'

const PrescriptionStatus = {
  PENDING: 'PENDING',
  DISPENSED: 'DISPENSED',
  CANCELLED: 'CANCELLED',
} as const

type LabTestStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

const LabTestStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const

// Resolve the SQLite file path relative to the project root, matching the
// runtime logic in src/lib/db.ts (Prisma otherwise resolves it relative to
// the schema file, which breaks the seed script).
const rawUrl = process.env.DATABASE_URL
if (rawUrl?.startsWith('file:')) {
  const filePath = rawUrl.slice('file:'.length)
  if (!path.isAbsolute(filePath)) {
    const abs = path.resolve(process.cwd(), filePath).replace(/\\/g, '/')
    process.env.DATABASE_URL = `file:${abs}`
  }
}

const prisma = new PrismaClient()

async function main() {
  const password = await hash('Admin@123', 10)
  const patientPassword = await hash('Password@123', 10)

  // Create departments
  const departments = await Promise.all([
    prisma.department.upsert({
      where: { name: 'Cardiology' },
      update: {},
      create: {
        name: 'Cardiology',
        description: 'Heart and cardiovascular system',
        phone: '555-0101'
      }
    }),
    prisma.department.upsert({
      where: { name: 'Neurology' },
      update: {},
      create: {
        name: 'Neurology',
        description: 'Brain and nervous system',
        phone: '555-0102'
      }
    }),
    prisma.department.upsert({
      where: { name: 'Orthopedics' },
      update: {},
      create: {
        name: 'Orthopedics',
        description: 'Bones, joints, and muscles',
        phone: '555-0103'
      }
    }),
    prisma.department.upsert({
      where: { name: 'Pediatrics' },
      update: {},
      create: {
        name: 'Pediatrics',
        description: 'Medical care for infants and children',
        phone: '555-0104'
      }
    }),
    prisma.department.upsert({
      where: { name: 'General Medicine' },
      update: {},
      create: {
        name: 'General Medicine',
        description: 'General healthcare services',
        phone: '555-0105'
      }
    }),
    prisma.department.upsert({
      where: { name: 'Emergency' },
      update: {},
      create: {
        name: 'Emergency',
        description: '24/7 Emergency Care',
        phone: '555-0100'
      }
    })
  ])

  // Create users
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@hospital.local' },
    update: {},
    create: {
      email: 'superadmin@hospital.local',
      name: 'Super Admin',
      password: password,
      role: Role.SUPER_ADMIN,
      isActive: true,
      emailVerified: true
    }
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@hospital.local' },
    update: {},
    create: {
      email: 'admin@hospital.local',
      name: 'Admin User',
      password: password,
      role: Role.ADMIN,
      isActive: true,
      emailVerified: true
    }
  })

  const doctorUser = await prisma.user.upsert({
    where: { email: 'doctor@hospital.local' },
    update: {},
    create: {
      email: 'doctor@hospital.local',
      name: 'Dr. John Smith',
      password: patientPassword,
      role: Role.DOCTOR,
      phone: '555-1001',
      isActive: true,
      emailVerified: true
    }
  })

  const doctor = await prisma.doctor.upsert({
    where: { userId: doctorUser.id },
    update: {},
    create: {
      userId: doctorUser.id,
      specialization: 'Cardiology',
      qualification: 'MD, FACC',
      licenseNumber: 'DOC-2024-001',
      departmentId: departments[0].id,
      consultationFee: 150
    }
  })

  const nurseUser = await prisma.user.upsert({
    where: { email: 'nurse@hospital.local' },
    update: {},
    create: {
      email: 'nurse@hospital.local',
      name: 'Sarah Johnson',
      password: patientPassword,
      role: Role.NURSE,
      phone: '555-1002',
      isActive: true,
      emailVerified: true
    }
  })

  const nurse = await prisma.nurse.upsert({
    where: { userId: nurseUser.id },
    update: {},
    create: {
      userId: nurseUser.id,
      qualification: 'RN, BSN',
      licenseNumber: 'NUR-2024-001',
      departmentId: departments[0].id,
      shift: 'DAY'
    }
  })

  const receptionistUser = await prisma.user.upsert({
    where: { email: 'receptionist@hospital.local' },
    update: {},
    create: {
      email: 'receptionist@hospital.local',
      name: 'Emily Davis',
      password: patientPassword,
      role: Role.RECEPTIONIST,
      phone: '555-1003',
      isActive: true,
      emailVerified: true
    }
  })

  const pharmacistUser = await prisma.user.upsert({
    where: { email: 'pharmacist@hospital.local' },
    update: {},
    create: {
      email: 'pharmacist@hospital.local',
      name: 'Michael Brown',
      password: patientPassword,
      role: Role.PHARMACIST,
      phone: '555-1004',
      isActive: true,
      emailVerified: true
    }
  })

  const labUser = await prisma.user.upsert({
    where: { email: 'lab@hospital.local' },
    update: {},
    create: {
      email: 'lab@hospital.local',
      name: 'Lisa Wilson',
      password: patientPassword,
      role: Role.LAB_TECHNICIAN,
      phone: '555-1005',
      isActive: true,
      emailVerified: true
    }
  })

  const patientUser = await prisma.user.upsert({
    where: { email: 'patient@hospital.local' },
    update: {},
    create: {
      email: 'patient@hospital.local',
      name: 'James Patient',
      password: patientPassword,
      role: Role.PATIENT,
      phone: '555-2001',
      isActive: true,
      emailVerified: true
    }
  })

  const patient = await prisma.patient.upsert({
    where: { userId: patientUser.id },
    update: {},
    create: {
      userId: patientUser.id,
      dateOfBirth: new Date('1990-05-15'),
      gender: 'Male',
      bloodGroup: 'O+',
      address: '123 Main Street, City',
      emergencyContact: '555-9999',
      medicalHistory: 'No major illnesses',
      allergies: 'Penicillin'
    }
  })

  // Create medications
  const medications = await Promise.all([
    prisma.medication.upsert({
      where: { id: 'med-001' },
      update: {},
      create: {
        id: 'med-001',
        name: 'Amoxicillin 500mg',
        genericName: 'Amoxicillin',
        category: 'Antibiotic',
        manufacturer: 'Pharma Corp',
        unitPrice: 15.99,
        stockQuantity: 500,
        reorderLevel: 100
      }
    }),
    prisma.medication.upsert({
      where: { id: 'med-002' },
      update: {},
      create: {
        id: 'med-002',
        name: 'Ibuprofen 400mg',
        genericName: 'Ibuprofen',
        category: 'Pain Relief',
        manufacturer: 'MediHealth',
        unitPrice: 8.50,
        stockQuantity: 1000,
        reorderLevel: 200
      }
    }),
    prisma.medication.upsert({
      where: { id: 'med-003' },
      update: {},
      create: {
        id: 'med-003',
        name: 'Metformin 500mg',
        genericName: 'Metformin',
        category: 'Diabetes',
        manufacturer: 'HealthFirst',
        unitPrice: 12.00,
        stockQuantity: 300,
        reorderLevel: 50
      }
    }),
    prisma.medication.upsert({
      where: { id: 'med-004' },
      update: {},
      create: {
        id: 'med-004',
        name: 'Lisinopril 10mg',
        genericName: 'Lisinopril',
        category: 'Blood Pressure',
        manufacturer: 'CardioMed',
        unitPrice: 20.00,
        stockQuantity: 200,
        reorderLevel: 50
      }
    }),
    prisma.medication.upsert({
      where: { id: 'med-005' },
      update: {},
      create: {
        id: 'med-005',
        name: 'Omeprazole 20mg',
        genericName: 'Omeprazole',
        category: 'Gastric',
        manufacturer: 'GastroHealth',
        unitPrice: 18.00,
        stockQuantity: 400,
        reorderLevel: 100
      }
    })
  ])

  // Create settings
  await prisma.setting.upsert({
    where: { key: 'hospital_name' },
    update: {},
    create: {
      key: 'hospital_name',
      value: 'Al-Shifa Medical Complex'
    }
  })

  await prisma.setting.upsert({
    where: { key: 'hospital_address' },
    update: {},
    create: {
      key: 'hospital_address',
      value: '456 Healthcare Ave, Medical City, MC 12345'
    }
  })

  await prisma.setting.upsert({
    where: { key: 'hospital_phone' },
    update: {},
    create: {
      key: 'hospital_phone',
      value: '(555) 123-4567'
    }
  })

  await prisma.setting.upsert({
    where: { key: 'hospital_email' },
    update: {},
    create: {
      key: 'hospital_email',
      value: 'info@alshifamedical.com'
    }
  })

  // ============================================================
  //  Bulk demo data — seeded once so every dashboard shows real,
  //  meaningful numbers instead of empty tables.
  // ============================================================
  if ((await prisma.appointment.count()) === 0) {
    console.log('Seeding bulk demo data...')
    const pw = patientPassword
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const daysAgo = (n: number) => new Date(startOfToday.getTime() - n * 86400000)
    const daysAhead = (n: number) => new Date(startOfToday.getTime() + n * 86400000)
    const atTime = (base: Date, h: number, m: number) =>
      new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m)

    // --- Extra doctors across departments ---
    const doctorSeeds = [
      { name: 'Dr. Sarah Wilson', email: 'sarah.wilson@hospital.local', spec: 'Cardiology', dept: 0, fee: 180 },
      { name: 'Dr. Michael Brown', email: 'michael.brown@hospital.local', spec: 'Neurology', dept: 1, fee: 200 },
      { name: 'Dr. Lisa Chen', email: 'lisa.chen@hospital.local', spec: 'Orthopedics', dept: 2, fee: 160 },
      { name: 'Dr. James Wilson', email: 'james.wilson@hospital.local', spec: 'Pediatrics', dept: 3, fee: 140 },
      { name: 'Dr. Emma Thompson', email: 'emma.thompson@hospital.local', spec: 'General Medicine', dept: 4, fee: 120 },
      { name: 'Dr. David Lee', email: 'david.lee@hospital.local', spec: 'Emergency Medicine', dept: 5, fee: 220 },
    ]
    const seededDoctors = [doctor]
    for (let i = 0; i < doctorSeeds.length; i++) {
      const d = doctorSeeds[i]
      const u = await prisma.user.create({
        data: {
          email: d.email, name: d.name, password: pw, role: Role.DOCTOR,
          phone: `555-30${i + 10}`, isActive: true, emailVerified: true,
        },
      })
      seededDoctors.push(
        await prisma.doctor.create({
          data: {
            userId: u.id, specialization: d.spec, qualification: 'MD',
            licenseNumber: `DOC-2024-${100 + i}`, departmentId: departments[d.dept].id,
            consultationFee: d.fee,
          },
        }),
      )
    }

    // --- Extra nurses ---
    const nurseSeeds = [
      { name: 'Olivia Martin', email: 'olivia.martin@hospital.local', dept: 1, shift: 'DAY' },
      { name: 'Sophia Garcia', email: 'sophia.garcia@hospital.local', dept: 3, shift: 'NIGHT' },
      { name: 'Isabella Reed', email: 'isabella.reed@hospital.local', dept: 5, shift: 'EVENING' },
    ]
    const seededNurses = [nurse]
    for (let i = 0; i < nurseSeeds.length; i++) {
      const n = nurseSeeds[i]
      const u = await prisma.user.create({
        data: {
          email: n.email, name: n.name, password: pw, role: Role.NURSE,
          phone: `555-40${i + 10}`, isActive: true, emailVerified: true,
        },
      })
      seededNurses.push(
        await prisma.nurse.create({
          data: {
            userId: u.id, qualification: 'RN, BSN', licenseNumber: `NUR-2024-${100 + i}`,
            departmentId: departments[n.dept].id, shift: n.shift,
          },
        }),
      )
    }

    // --- Extra medications (some intentionally low-stock) ---
    const medSeeds = [
      { name: 'Paracetamol 500mg', cat: 'Pain Relief', price: 5.0, stock: 800, reorder: 150 },
      { name: 'Aspirin 75mg', cat: 'Cardiac', price: 6.5, stock: 40, reorder: 100 },
      { name: 'Atorvastatin 20mg', cat: 'Cholesterol', price: 22.0, stock: 260, reorder: 60 },
      { name: 'Cetirizine 10mg', cat: 'Antihistamine', price: 7.0, stock: 25, reorder: 80 },
      { name: 'Azithromycin 250mg', cat: 'Antibiotic', price: 28.0, stock: 180, reorder: 50 },
      { name: 'Salbutamol Inhaler', cat: 'Respiratory', price: 35.0, stock: 18, reorder: 40 },
      { name: 'Insulin Glargine', cat: 'Diabetes', price: 55.0, stock: 90, reorder: 30 },
      { name: 'Diclofenac Gel', cat: 'Pain Relief', price: 12.0, stock: 320, reorder: 70 },
    ]
    const allMeds = [...medications]
    for (const m of medSeeds) {
      allMeds.push(
        await prisma.medication.create({
          data: {
            name: m.name, category: m.cat, unitPrice: m.price,
            stockQuantity: m.stock, reorderLevel: m.reorder,
          },
        }),
      )
    }
    // push a couple of original meds below their reorder level too
    await prisma.medication.update({ where: { id: 'med-003' }, data: { stockQuantity: 28 } })
    await prisma.medication.update({ where: { id: 'med-004' }, data: { stockQuantity: 14 } })

    // --- Patients ---
    const firstNames = ['John', 'Emily', 'Robert', 'Sarah', 'Michael', 'Jennifer', 'William', 'Linda', 'David', 'Susan', 'Richard', 'Karen', 'Joseph', 'Nancy', 'Thomas', 'Betty', 'Charles', 'Helen', 'Daniel', 'Sandra', 'Matthew', 'Donna', 'Anthony', 'Carol']
    const lastNames = ['Smith', 'Davis', 'Johnson', 'Miller', 'Lee', 'Brown', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Garcia', 'Clark', 'Lewis', 'Walker', 'Hall', 'Young', 'King', 'Wright', 'Hill']
    const bloodGroups = ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-']
    const conditions = ['Hypertension', 'Type 2 Diabetes', 'Asthma', 'Cardiac Arrhythmia', 'Chronic Migraine', 'Arthritis']
    const seededPatients: { patient: any; user: any }[] = [{ patient, user: patientUser }]
    for (let i = 0; i < 24; i++) {
      const u = await prisma.user.create({
        data: {
          email: `patient${i + 1}@hospital.local`,
          name: `${firstNames[i]} ${lastNames[i]}`,
          password: pw, role: Role.PATIENT,
          phone: `555-5${String(i).padStart(3, '0')}`,
          isActive: true, emailVerified: true,
          createdAt: daysAgo(i % 14),
        },
      })
      const p = await prisma.patient.create({
        data: {
          userId: u.id, gender: i % 2 === 0 ? 'Male' : 'Female',
          bloodGroup: bloodGroups[i % bloodGroups.length],
          dateOfBirth: new Date(1958 + (i % 45), i % 12, (i % 27) + 1),
          address: `${100 + i} Main Street, Medical City`,
          allergies: i % 3 === 0 ? 'Penicillin' : i % 3 === 1 ? 'None known' : 'Pollen',
          medicalHistory: conditions[i % conditions.length],
        },
      })
      seededPatients.push({ patient: p, user: u })
    }

    // --- Appointments ---
    const apptTypes = ['Consultation', 'Follow-up', 'Check-up', 'Emergency']
    const reasons = ['Hypertension check', 'Chest pain evaluation', 'Annual physical', 'Diabetes management', 'Post-surgery check', 'Cardiac follow-up', 'Routine check-up', 'Fever and cold']
    const slots = [['09:00 AM', '09:30 AM'], ['09:30 AM', '10:00 AM'], ['10:00 AM', '10:30 AM'], ['10:30 AM', '11:00 AM'], ['11:00 AM', '11:45 AM'], ['02:00 PM', '02:30 PM'], ['02:30 PM', '03:00 PM'], ['03:30 PM', '04:00 PM']]
    const allAppointments: { appt: any; patient: any; doctorId: string }[] = []
    let apptIdx = 0
    const makeAppt = async (date: Date, status: AppointmentStatus, patIdx: number, docIdx: number) => {
      const t = slots[apptIdx % slots.length]
      const pat = seededPatients[patIdx % seededPatients.length]
      const doc = seededDoctors[docIdx % seededDoctors.length]
      const a = await prisma.appointment.create({
        data: {
          patientId: pat.patient.id, doctorId: doc.id, userId: pat.user.id,
          date, startTime: t[0], endTime: t[1], status,
          type: apptTypes[apptIdx % apptTypes.length],
          reason: reasons[apptIdx % reasons.length],
        },
      })
      allAppointments.push({ appt: a, patient: pat, doctorId: doc.id })
      apptIdx++
      return a
    }
    const todayStatuses: AppointmentStatus[] = [
      AppointmentStatus.COMPLETED, AppointmentStatus.COMPLETED, AppointmentStatus.IN_PROGRESS,
      AppointmentStatus.CONFIRMED, AppointmentStatus.CONFIRMED, AppointmentStatus.SCHEDULED,
      AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED, AppointmentStatus.SCHEDULED,
      AppointmentStatus.COMPLETED, AppointmentStatus.CONFIRMED, AppointmentStatus.SCHEDULED,
    ]
    for (let i = 0; i < todayStatuses.length; i++)
      await makeAppt(startOfToday, todayStatuses[i], i + 1, i)
    for (let i = 0; i < 38; i++) {
      const st = i % 9 === 0 ? AppointmentStatus.CANCELLED
        : i % 13 === 0 ? AppointmentStatus.NO_SHOW
        : AppointmentStatus.COMPLETED
      await makeAppt(daysAgo((i % 27) + 1), st, i + 2, i + 1)
    }
    for (let i = 0; i < 22; i++)
      await makeAppt(daysAhead((i % 14) + 1), i % 2 === 0 ? AppointmentStatus.CONFIRMED : AppointmentStatus.SCHEDULED, i + 3, i + 2)

    // --- Billings (for completed appointments) ---
    let billIdx = 0
    for (const { appt } of allAppointments) {
      if (appt.status !== AppointmentStatus.COMPLETED) continue
      const base = 90 + (billIdx % 9) * 55
      const tax = Math.round(base * 0.08)
      const paid = billIdx % 4 !== 0
      await prisma.billing.create({
        data: {
          appointmentId: appt.id, patientId: appt.patientId,
          totalAmount: base, tax, discount: 0, grandTotal: base + tax,
          status: paid ? PaymentStatus.PAID : PaymentStatus.PENDING,
          paymentMethod: paid ? (billIdx % 2 === 0 ? 'Card' : 'Cash') : null,
          paymentDate: paid ? appt.date : null,
          createdAt: appt.date,
        },
      })
      billIdx++
    }

    // --- Prescriptions + items ---
    const presStatuses: PrescriptionStatus[] = [
      PrescriptionStatus.PENDING, PrescriptionStatus.DISPENSED, PrescriptionStatus.DISPENSED,
      PrescriptionStatus.PENDING, PrescriptionStatus.DISPENSED,
    ]
    for (let i = 0; i < 30; i++) {
      const src = allAppointments[i % allAppointments.length]
      const pres = await prisma.prescription.create({
        data: {
          patientId: src.patient.user.id,
          doctorId: src.doctorId,
          status: presStatuses[i % presStatuses.length],
          notes: 'Take as directed by physician.',
          createdAt: daysAgo(i % 12),
        },
      })
      for (let j = 0; j <= i % 3; j++) {
        await prisma.prescriptionItem.create({
          data: {
            prescriptionId: pres.id,
            medicationId: allMeds[(i + j) % allMeds.length].id,
            dosage: '1 tablet', frequency: 'Twice daily', duration: '7 days',
            quantity: 14, instructions: 'After meals',
          },
        })
      }
    }

    // --- Lab requests + results ---
    const labStatuses: LabTestStatus[] = [
      LabTestStatus.PENDING, LabTestStatus.PENDING, LabTestStatus.IN_PROGRESS,
      LabTestStatus.COMPLETED, LabTestStatus.COMPLETED, LabTestStatus.PENDING,
    ]
    const testTypes = ['Complete Blood Count', 'Lipid Panel', 'Blood Glucose', 'Urinalysis', 'Liver Function Test', 'Thyroid Panel', 'Chest X-Ray', 'ECG']
    const labPriorities = ['ROUTINE', 'URGENT', 'STAT']
    for (let i = 0; i < 28; i++) {
      const src = allAppointments[i % allAppointments.length]
      const lr = await prisma.labRequest.create({
        data: {
          patientId: src.patient.patient.id, doctorId: src.doctorId,
          testType: testTypes[i % testTypes.length],
          priority: labPriorities[i % labPriorities.length],
          status: labStatuses[i % labStatuses.length],
          createdAt: i % 5 === 0 ? atTime(startOfToday, 8 + (i % 8), 0) : daysAgo(i % 9),
        },
      })
      if (lr.status === LabTestStatus.COMPLETED) {
        await prisma.labResult.create({
          data: {
            requestId: lr.id, patientId: src.patient.patient.id,
            results: JSON.stringify({ summary: 'Within normal range' }),
            technician: 'Lisa Wilson', notes: 'No abnormalities detected.',
            reportedAt: i % 4 === 0 ? atTime(startOfToday, 10 + (i % 6), 0) : daysAgo(i % 6),
          },
        })
      }
    }

    // --- Vitals ---
    for (let i = 0; i < 32; i++) {
      const pat = seededPatients[(i + 1) % seededPatients.length]
      await prisma.vital.create({
        data: {
          patientId: pat.patient.id,
          nurseId: seededNurses[i % seededNurses.length].id,
          temperature: 36.4 + (i % 12) / 10,
          bloodPressure: `${110 + (i % 22)}/${70 + (i % 16)}`,
          heartRate: 64 + (i % 26),
          respiratoryRate: 14 + (i % 6),
          oxygenSaturation: 95 + (i % 5),
          weight: 58 + (i % 32), height: 158 + (i % 32),
          recordedAt: i < 14 ? atTime(startOfToday, 8 + (i % 9), (i * 7) % 60) : daysAgo(1 + (i % 7)),
        },
      })
    }

    // --- Nurse tasks ---
    const taskTitles = ['Administer medication - Room 204', 'Record vitals - Room 105', 'Assist ward round', 'Update patient charts', 'Prepare discharge papers', 'Check IV drips - Ward B', 'Patient mobility assistance - Room 302', 'Restock medical supplies', 'Monitor post-op patient - Room 210', 'Collect blood sample - Room 118', 'Wound dressing - Room 225', 'Patient transfer to radiology']
    const taskPriorities = ['HIGH', 'MEDIUM', 'LOW']
    const taskStatuses = ['PENDING', 'PENDING', 'IN_PROGRESS', 'COMPLETED']
    for (let i = 0; i < taskTitles.length; i++) {
      await prisma.task.create({
        data: {
          nurseId: seededNurses[i % seededNurses.length].id,
          title: taskTitles[i],
          priority: taskPriorities[i % 3],
          status: taskStatuses[i % 4],
          dueDate: atTime(startOfToday, 9 + (i % 9), (i * 10) % 60),
        },
      })
    }

    // --- Medical records ---
    for (let i = 0; i < 18; i++) {
      const src = allAppointments[i % allAppointments.length]
      await prisma.medicalRecord.create({
        data: {
          patientId: src.patient.patient.id, doctorId: src.doctorId,
          diagnosis: conditions[i % conditions.length],
          treatment: 'Prescribed medication and follow-up care.',
          notes: 'Patient responding well to treatment.',
          createdAt: daysAgo(i % 22),
        },
      })
    }

    // --- Notifications ---
    const notifTemplates = [
      { title: 'New appointment request', message: 'A new appointment has been requested.', type: 'APPOINTMENT' },
      { title: 'Lab results ready', message: 'Lab results are now available for review.', type: 'LAB' },
      { title: 'Prescription dispensed', message: 'A prescription has been dispensed.', type: 'PRESCRIPTION' },
      { title: 'Payment received', message: 'A bill payment has been recorded.', type: 'BILLING' },
    ]
    for (const u of [admin, doctorUser, nurseUser, receptionistUser, pharmacistUser, labUser, patientUser]) {
      for (let j = 0; j < 4; j++) {
        const t = notifTemplates[j % notifTemplates.length]
        await prisma.notification.create({
          data: {
            userId: u.id, title: t.title, message: t.message, type: t.type,
            isRead: j > 1, createdAt: new Date(now.getTime() - (j + 1) * 2700000),
          },
        })
      }
    }

    // --- Audit logs (recent activity feed) ---
    const auditActions = [
      { action: 'New patient registered', entity: 'Patient', user: receptionistUser },
      { action: 'Appointment cancelled', entity: 'Appointment', user: doctorUser },
      { action: 'Lab results uploaded', entity: 'LabResult', user: labUser },
      { action: 'Prescription dispensed', entity: 'Prescription', user: pharmacistUser },
      { action: 'Bill paid', entity: 'Billing', user: receptionistUser },
      { action: 'User account updated', entity: 'User', user: admin },
      { action: 'New doctor onboarded', entity: 'Doctor', user: admin },
      { action: 'Medication stock updated', entity: 'Medication', user: pharmacistUser },
      { action: 'Vitals recorded', entity: 'Vital', user: nurseUser },
      { action: 'Appointment confirmed', entity: 'Appointment', user: receptionistUser },
    ]
    for (let i = 0; i < auditActions.length; i++) {
      const a = auditActions[i]
      await prisma.auditLog.create({
        data: {
          userId: a.user.id, action: a.action, entity: a.entity,
          createdAt: new Date(now.getTime() - (i + 1) * 1500000),
        },
      })
    }

    console.log('Bulk demo data seeded.')
  }

  console.log('Seed completed successfully!')
  console.log('Departments:', departments.length)
  console.log('Medications:', medications.length)
  console.log('Users created with roles:')
  console.log('  - Super Admin: superadmin@hospital.local / Admin@123')
  console.log('  - Admin: admin@hospital.local / Admin@123')
  console.log('  - Doctor: doctor@hospital.local / Password@123')
  console.log('  - Nurse: nurse@hospital.local / Password@123')
  console.log('  - Receptionist: receptionist@hospital.local / Password@123')
  console.log('  - Pharmacist: pharmacist@hospital.local / Password@123')
  console.log('  - Lab Technician: lab@hospital.local / Password@123')
  console.log('  - Patient: patient@hospital.local / Password@123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
