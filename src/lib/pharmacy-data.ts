export type InventoryStatus = "IN_STOCK" | "LOW_STOCK" | "CRITICAL" | "OUT_OF_STOCK"
export type PrescriptionPriority = "URGENT" | "HIGH" | "NORMAL"
export type PrescriptionStatus = "PENDING" | "IN_PROGRESS" | "READY" | "DISPENSED" | "ON_HOLD"
export type PaymentStatus = "PAID" | "PENDING" | "PARTIALLY_PAID"

export interface PharmacyMedicine {
  id: string
  name: string
  genericName: string
  category: string
  dosageForm: string
  strength: string
  manufacturer: string
  supplierId: string
  stock: number
  reorderLevel: number
  maxStock: number
  unitPrice: number
  expiryDate: string
  batchNumber: string
  location: string
  storage: string
  prescriptionRequired: boolean
  fastMoving: boolean
  monthlyDemand: number
}

export interface Supplier {
  id: string
  name: string
  contact: string
  phone: string
  leadTimeDays: number
  reliability: number
  openOrders: number
}

export interface PurchaseOrder {
  id: string
  supplierId: string
  medicineId: string
  orderedQty: number
  expectedDate: string
  status: "ORDERED" | "IN_TRANSIT" | "RECEIVED"
  amount: number
}

export interface PrescriptionItem {
  medicineId: string
  name: string
  dosage: string
  frequency: string
  duration: string
  quantity: number
}

export interface Prescription {
  id: string
  patient: {
    name: string
    id: string
    age: number
    gender: string
  }
  doctor: string
  department: string
  date: string
  time: string
  priority: PrescriptionPriority
  status: PrescriptionStatus
  items: PrescriptionItem[]
  notes: string
  insurance: string
  allergies: string[]
  counselingRequired: boolean
  turnaroundMins: number
}

export interface DispensedRecord {
  id: string
  prescriptionId: string
  patient: {
    name: string
    id: string
  }
  doctor: string
  dispensedBy: string
  dispensedAt: string
  items: {
    medicineId: string
    name: string
    quantity: number
    price: number
  }[]
  totalAmount: number
  paymentStatus: PaymentStatus
  collectionMethod: "Counter" | "Ward Delivery" | "Emergency Dispatch"
  counselingDone: boolean
  notes: string
}

export interface PharmacyActivity {
  action: string
  user: string
  time: string
  type: "inventory" | "prescription" | "billing" | "alert"
}

export interface PharmacySetting {
  dispensingSafetyChecks: boolean
  requireCounselingForNewRx: boolean
  autoFlagExpiringStock: boolean
  allowPartialDispense: boolean
  lowStockAlertThreshold: number
  expiryAlertDays: number
  operatingHours: string
  queueTargetMins: number
}

export const pharmacySuppliers: Supplier[] = [
  { id: "SUP-01", name: "MediCore Supplies", contact: "Sana Malik", phone: "+92 300 1112233", leadTimeDays: 2, reliability: 97, openOrders: 3 },
  { id: "SUP-02", name: "HealthBridge Pharma", contact: "Usman Tariq", phone: "+92 321 4446622", leadTimeDays: 4, reliability: 92, openOrders: 2 },
  { id: "SUP-03", name: "NovaMed Distributors", contact: "Ayesha Noor", phone: "+92 333 8885522", leadTimeDays: 3, reliability: 95, openOrders: 4 },
]

export const pharmacyInventory: PharmacyMedicine[] = [
  { id: "MED001", name: "Amoxicillin 500mg", genericName: "Amoxicillin", category: "Antibiotics", dosageForm: "Capsule", strength: "500mg", manufacturer: "Pfizer", supplierId: "SUP-01", stock: 15, reorderLevel: 50, maxStock: 240, unitPrice: 12.5, expiryDate: "2026-06-15", batchNumber: "BTH2024001", location: "Shelf A-12", storage: "Room Temperature", prescriptionRequired: true, fastMoving: true, monthlyDemand: 140 },
  { id: "MED002", name: "Ibuprofen 400mg", genericName: "Ibuprofen", category: "Pain Relief", dosageForm: "Tablet", strength: "400mg", manufacturer: "Johnson & Johnson", supplierId: "SUP-02", stock: 28, reorderLevel: 100, maxStock: 320, unitPrice: 8.99, expiryDate: "2026-12-20", batchNumber: "BTH2024002", location: "Shelf B-05", storage: "Room Temperature", prescriptionRequired: false, fastMoving: true, monthlyDemand: 180 },
  { id: "MED003", name: "Metformin 500mg", genericName: "Metformin", category: "Diabetes", dosageForm: "Tablet", strength: "500mg", manufacturer: "Novartis", supplierId: "SUP-01", stock: 245, reorderLevel: 75, maxStock: 400, unitPrice: 15, expiryDate: "2027-03-10", batchNumber: "BTH2024003", location: "Shelf C-08", storage: "Room Temperature", prescriptionRequired: true, fastMoving: true, monthlyDemand: 210 },
  { id: "MED004", name: "Omeprazole 20mg", genericName: "Omeprazole", category: "Gastric", dosageForm: "Capsule", strength: "20mg", manufacturer: "AstraZeneca", supplierId: "SUP-03", stock: 12, reorderLevel: 60, maxStock: 220, unitPrice: 22.75, expiryDate: "2026-08-25", batchNumber: "BTH2024004", location: "Shelf A-03", storage: "Protect from Moisture", prescriptionRequired: true, fastMoving: true, monthlyDemand: 120 },
  { id: "MED005", name: "Lisinopril 10mg", genericName: "Lisinopril", category: "Cardiovascular", dosageForm: "Tablet", strength: "10mg", manufacturer: "Merck", supplierId: "SUP-03", stock: 35, reorderLevel: 50, maxStock: 180, unitPrice: 18.5, expiryDate: "2026-11-30", batchNumber: "BTH2024005", location: "Shelf D-02", storage: "Room Temperature", prescriptionRequired: true, fastMoving: false, monthlyDemand: 80 },
  { id: "MED006", name: "Paracetamol 500mg", genericName: "Acetaminophen", category: "Pain Relief", dosageForm: "Tablet", strength: "500mg", manufacturer: "GSK", supplierId: "SUP-02", stock: 520, reorderLevel: 200, maxStock: 700, unitPrice: 5.99, expiryDate: "2027-01-15", batchNumber: "BTH2024006", location: "Shelf A-01", storage: "Room Temperature", prescriptionRequired: false, fastMoving: true, monthlyDemand: 300 },
  { id: "MED007", name: "Atorvastatin 20mg", genericName: "Atorvastatin", category: "Cardiovascular", dosageForm: "Tablet", strength: "20mg", manufacturer: "Pfizer", supplierId: "SUP-01", stock: 180, reorderLevel: 100, maxStock: 280, unitPrice: 25, expiryDate: "2026-09-20", batchNumber: "BTH2024007", location: "Shelf D-05", storage: "Room Temperature", prescriptionRequired: true, fastMoving: false, monthlyDemand: 74 },
  { id: "MED008", name: "Ciprofloxacin 500mg", genericName: "Ciprofloxacin", category: "Antibiotics", dosageForm: "Tablet", strength: "500mg", manufacturer: "Bayer", supplierId: "SUP-01", stock: 0, reorderLevel: 40, maxStock: 160, unitPrice: 14.25, expiryDate: "2026-07-10", batchNumber: "BTH2024008", location: "Shelf A-15", storage: "Room Temperature", prescriptionRequired: true, fastMoving: false, monthlyDemand: 52 },
  { id: "MED009", name: "Salbutamol Inhaler", genericName: "Salbutamol", category: "Respiratory", dosageForm: "Inhaler", strength: "100mcg", manufacturer: "GSK", supplierId: "SUP-02", stock: 44, reorderLevel: 45, maxStock: 120, unitPrice: 32, expiryDate: "2026-10-18", batchNumber: "BTH2024009", location: "Cold Rack R-02", storage: "Protect from Heat", prescriptionRequired: true, fastMoving: false, monthlyDemand: 48 },
  { id: "MED010", name: "Insulin Glargine", genericName: "Insulin Glargine", category: "Diabetes", dosageForm: "Injection", strength: "100IU/ml", manufacturer: "Sanofi", supplierId: "SUP-03", stock: 26, reorderLevel: 20, maxStock: 80, unitPrice: 58, expiryDate: "2026-05-28", batchNumber: "BTH2024010", location: "Refrigerator 1", storage: "Refrigerated", prescriptionRequired: true, fastMoving: true, monthlyDemand: 36 },
  { id: "MED011", name: "Azithromycin 250mg", genericName: "Azithromycin", category: "Antibiotics", dosageForm: "Tablet", strength: "250mg", manufacturer: "Sandoz", supplierId: "SUP-02", stock: 62, reorderLevel: 40, maxStock: 200, unitPrice: 16.25, expiryDate: "2026-06-04", batchNumber: "BTH2024011", location: "Shelf A-18", storage: "Room Temperature", prescriptionRequired: true, fastMoving: false, monthlyDemand: 60 },
  { id: "MED012", name: "Vitamin D3 1000IU", genericName: "Cholecalciferol", category: "Vitamins & Supplements", dosageForm: "Tablet", strength: "1000IU", manufacturer: "Abbott", supplierId: "SUP-03", stock: 110, reorderLevel: 55, maxStock: 180, unitPrice: 9.75, expiryDate: "2027-02-12", batchNumber: "BTH2024012", location: "Shelf V-04", storage: "Room Temperature", prescriptionRequired: false, fastMoving: false, monthlyDemand: 42 },
]

export const pharmacyPurchaseOrders: PurchaseOrder[] = [
  { id: "PO-1001", supplierId: "SUP-01", medicineId: "MED001", orderedQty: 180, expectedDate: "2026-05-25", status: "IN_TRANSIT", amount: 2250 },
  { id: "PO-1002", supplierId: "SUP-03", medicineId: "MED004", orderedQty: 120, expectedDate: "2026-05-26", status: "ORDERED", amount: 2730 },
  { id: "PO-1003", supplierId: "SUP-01", medicineId: "MED008", orderedQty: 90, expectedDate: "2026-05-24", status: "ORDERED", amount: 1282.5 },
  { id: "PO-1004", supplierId: "SUP-02", medicineId: "MED009", orderedQty: 80, expectedDate: "2026-05-28", status: "IN_TRANSIT", amount: 2560 },
]

export const pharmacyPrescriptions: Prescription[] = [
  {
    id: "RX001",
    patient: { name: "John Smith", id: "PAT001", age: 45, gender: "Male" },
    doctor: "Dr. Sarah Wilson",
    department: "Cardiology",
    date: "2026-05-23",
    time: "09:15 AM",
    priority: "URGENT",
    status: "PENDING",
    items: [
      { medicineId: "MED005", name: "Lisinopril 10mg", dosage: "1 tablet", frequency: "Once daily", duration: "30 days", quantity: 30 },
      { medicineId: "MED007", name: "Atorvastatin 20mg", dosage: "1 tablet", frequency: "At bedtime", duration: "30 days", quantity: 30 },
      { medicineId: "MED006", name: "Paracetamol 500mg", dosage: "1 tablet", frequency: "As needed", duration: "5 days", quantity: 10 },
    ],
    notes: "BP review in 2 weeks. Avoid missed doses.",
    insurance: "State Life",
    allergies: ["Penicillin"],
    counselingRequired: true,
    turnaroundMins: 18,
  },
  {
    id: "RX002",
    patient: { name: "Emily Davis", id: "PAT002", age: 32, gender: "Female" },
    doctor: "Dr. Michael Brown",
    department: "Neurology",
    date: "2026-05-23",
    time: "09:30 AM",
    priority: "NORMAL",
    status: "READY",
    items: [
      { medicineId: "MED002", name: "Ibuprofen 400mg", dosage: "1 tablet", frequency: "As needed", duration: "7 days", quantity: 14 },
      { medicineId: "MED012", name: "Vitamin D3 1000IU", dosage: "1 tablet", frequency: "Once daily", duration: "30 days", quantity: 30 },
    ],
    notes: "Migraine rescue protocol explained.",
    insurance: "Self Pay",
    allergies: [],
    counselingRequired: false,
    turnaroundMins: 9,
  },
  {
    id: "RX003",
    patient: { name: "Robert Johnson", id: "PAT003", age: 58, gender: "Male" },
    doctor: "Dr. Lisa Chen",
    department: "Orthopedics",
    date: "2026-05-23",
    time: "10:00 AM",
    priority: "HIGH",
    status: "IN_PROGRESS",
    items: [
      { medicineId: "MED004", name: "Omeprazole 20mg", dosage: "1 capsule", frequency: "Once daily", duration: "14 days", quantity: 14 },
      { medicineId: "MED006", name: "Paracetamol 500mg", dosage: "1-2 tablets", frequency: "As needed", duration: "7 days", quantity: 20 },
    ],
    notes: "Post-surgery meds. Counsel on GI protection.",
    insurance: "EFU",
    allergies: ["Latex"],
    counselingRequired: true,
    turnaroundMins: 22,
  },
  {
    id: "RX004",
    patient: { name: "Sarah Miller", id: "PAT004", age: 28, gender: "Female" },
    doctor: "Dr. James Wilson",
    department: "Pediatrics",
    date: "2026-05-23",
    time: "10:15 AM",
    priority: "URGENT",
    status: "PENDING",
    items: [
      { medicineId: "MED001", name: "Amoxicillin 500mg", dosage: "5ml", frequency: "Three times daily", duration: "10 days", quantity: 150 },
    ],
    notes: "Pediatric dose. Complete full course.",
    insurance: "Jubilee Health",
    allergies: [],
    counselingRequired: true,
    turnaroundMins: 11,
  },
  {
    id: "RX005",
    patient: { name: "Michael Lee", id: "PAT005", age: 65, gender: "Male" },
    doctor: "Dr. Emma Thompson",
    department: "General Medicine",
    date: "2026-05-23",
    time: "10:45 AM",
    priority: "NORMAL",
    status: "ON_HOLD",
    items: [
      { medicineId: "MED003", name: "Metformin 500mg", dosage: "1 tablet", frequency: "Twice daily", duration: "30 days", quantity: 60 },
      { medicineId: "MED010", name: "Insulin Glargine", dosage: "10 units", frequency: "At bedtime", duration: "30 days", quantity: 3 },
    ],
    notes: "Insurance pre-auth required for insulin refill.",
    insurance: "Adamjee",
    allergies: [],
    counselingRequired: true,
    turnaroundMins: 28,
  },
  {
    id: "RX006",
    patient: { name: "Nida Farooq", id: "PAT006", age: 39, gender: "Female" },
    doctor: "Dr. Ali Raza",
    department: "Pulmonology",
    date: "2026-05-23",
    time: "11:20 AM",
    priority: "HIGH",
    status: "DISPENSED",
    items: [
      { medicineId: "MED009", name: "Salbutamol Inhaler", dosage: "2 puffs", frequency: "As needed", duration: "30 days", quantity: 1 },
      { medicineId: "MED004", name: "Omeprazole 20mg", dosage: "1 capsule", frequency: "Once daily", duration: "14 days", quantity: 14 },
    ],
    notes: "Spacer use demonstrated.",
    insurance: "Self Pay",
    allergies: ["Sulfa"],
    counselingRequired: true,
    turnaroundMins: 13,
  },
  {
    id: "RX007",
    patient: { name: "Hamza Qureshi", id: "PAT007", age: 52, gender: "Male" },
    doctor: "Dr. Hina Aftab",
    department: "Infectious Disease",
    date: "2026-05-23",
    time: "12:00 PM",
    priority: "NORMAL",
    status: "PENDING",
    items: [
      { medicineId: "MED011", name: "Azithromycin 250mg", dosage: "2 tablets day 1 then 1 daily", frequency: "Once daily", duration: "5 days", quantity: 6 },
      { medicineId: "MED008", name: "Ciprofloxacin 500mg", dosage: "1 tablet", frequency: "Twice daily", duration: "5 days", quantity: 10 },
    ],
    notes: "Second item currently unavailable; suggest substitute review.",
    insurance: "Askari Health",
    allergies: [],
    counselingRequired: true,
    turnaroundMins: 31,
  },
]

export const pharmacyDispensedRecords: DispensedRecord[] = [
  {
    id: "DSP-100",
    prescriptionId: "RX090",
    patient: { name: "Alice Brown", id: "PAT010" },
    doctor: "Dr. Sarah Wilson",
    dispensedBy: "Pharmacist Jane Doe",
    dispensedAt: "2026-05-23 14:30",
    items: [
      { medicineId: "MED001", name: "Amoxicillin 500mg", quantity: 21, price: 12.5 },
      { medicineId: "MED006", name: "Paracetamol 500mg", quantity: 20, price: 5.99 },
    ],
    totalAmount: 382.3,
    paymentStatus: "PAID",
    collectionMethod: "Counter",
    counselingDone: true,
    notes: "Complete the full course of antibiotics.",
  },
  {
    id: "DSP-099",
    prescriptionId: "RX089",
    patient: { name: "David Wilson", id: "PAT009" },
    doctor: "Dr. Michael Brown",
    dispensedBy: "Pharmacist John Smith",
    dispensedAt: "2026-05-23 14:15",
    items: [
      { medicineId: "MED003", name: "Metformin 500mg", quantity: 60, price: 15 },
      { medicineId: "MED005", name: "Lisinopril 10mg", quantity: 30, price: 18.5 },
    ],
    totalAmount: 1455,
    paymentStatus: "PAID",
    collectionMethod: "Counter",
    counselingDone: true,
    notes: "Monitor blood sugar levels regularly.",
  },
  {
    id: "DSP-098",
    prescriptionId: "RX088",
    patient: { name: "Emma Thompson", id: "PAT008" },
    doctor: "Dr. Lisa Chen",
    dispensedBy: "Pharmacist Jane Doe",
    dispensedAt: "2026-05-23 13:45",
    items: [
      { medicineId: "MED002", name: "Ibuprofen 400mg", quantity: 30, price: 8.99 },
      { medicineId: "MED004", name: "Omeprazole 20mg", quantity: 14, price: 22.75 },
    ],
    totalAmount: 588.2,
    paymentStatus: "PAID",
    collectionMethod: "Counter",
    counselingDone: true,
    notes: "Take ibuprofen with food.",
  },
  {
    id: "DSP-097",
    prescriptionId: "RX087",
    patient: { name: "James Miller", id: "PAT007" },
    doctor: "Dr. James Wilson",
    dispensedBy: "Pharmacist John Smith",
    dispensedAt: "2026-05-23 13:20",
    items: [
      { medicineId: "MED007", name: "Atorvastatin 20mg", quantity: 30, price: 25 },
      { medicineId: "MED006", name: "Paracetamol 500mg", quantity: 10, price: 5.99 },
    ],
    totalAmount: 809.9,
    paymentStatus: "PENDING",
    collectionMethod: "Ward Delivery",
    counselingDone: false,
    notes: "Medication sent to ward. Cashier follow-up pending.",
  },
  {
    id: "DSP-096",
    prescriptionId: "RX086",
    patient: { name: "Sophia Davis", id: "PAT006" },
    doctor: "Dr. Emma Thompson",
    dispensedBy: "Pharmacist Jane Doe",
    dispensedAt: "2026-05-23 12:50",
    items: [
      { medicineId: "MED009", name: "Salbutamol Inhaler", quantity: 1, price: 32 },
    ],
    totalAmount: 32,
    paymentStatus: "PAID",
    collectionMethod: "Emergency Dispatch",
    counselingDone: true,
    notes: "Emergency bronchodilator issue handled quickly.",
  },
  {
    id: "DSP-095",
    prescriptionId: "RX085",
    patient: { name: "William Johnson", id: "PAT005" },
    doctor: "Dr. Sarah Wilson",
    dispensedBy: "Pharmacist John Smith",
    dispensedAt: "2026-05-22 18:10",
    items: [
      { medicineId: "MED005", name: "Lisinopril 10mg", quantity: 30, price: 18.5 },
      { medicineId: "MED007", name: "Atorvastatin 20mg", quantity: 30, price: 25 },
    ],
    totalAmount: 1305,
    paymentStatus: "PARTIALLY_PAID",
    collectionMethod: "Counter",
    counselingDone: true,
    notes: "Remaining payment to be collected from insurance desk.",
  },
  {
    id: "DSP-094",
    prescriptionId: "RX084",
    patient: { name: "Olivia Martinez", id: "PAT004" },
    doctor: "Dr. Michael Brown",
    dispensedBy: "Pharmacist Jane Doe",
    dispensedAt: "2026-05-21 16:20",
    items: [
      { medicineId: "MED004", name: "Omeprazole 20mg", quantity: 30, price: 22.75 },
      { medicineId: "MED012", name: "Vitamin D3 1000IU", quantity: 30, price: 9.75 },
    ],
    totalAmount: 975,
    paymentStatus: "PAID",
    collectionMethod: "Counter",
    counselingDone: true,
    notes: "Diet advice shared.",
  },
]

export const pharmacyActivities: PharmacyActivity[] = [
  { action: "Urgent pediatric antibiotic moved to priority queue", user: "Pharmacist Jane Doe", time: "5 min ago", type: "prescription" },
  { action: "Purchase order PO-1003 raised for Ciprofloxacin", user: "Inventory Bot", time: "18 min ago", type: "inventory" },
  { action: "Insulin cold-chain check completed", user: "Pharmacist John Smith", time: "42 min ago", type: "alert" },
  { action: "Ward delivery pending payment flag added", user: "Cash Counter", time: "1 hr ago", type: "billing" },
  { action: "Shelf A-03 expiry audit updated", user: "Pharmacist Jane Doe", time: "2 hr ago", type: "inventory" },
]

export const pharmacySettings: PharmacySetting = {
  dispensingSafetyChecks: true,
  requireCounselingForNewRx: true,
  autoFlagExpiringStock: true,
  allowPartialDispense: true,
  lowStockAlertThreshold: 100,
  expiryAlertDays: 45,
  operatingHours: "08:00 AM - 11:00 PM",
  queueTargetMins: 15,
}

export const pharmacyMonthlyRevenue = [
  { month: "Dec", revenue: 38600, orders: 1250 },
  { month: "Jan", revenue: 41250, orders: 1348 },
  { month: "Feb", revenue: 39800, orders: 1280 },
  { month: "Mar", revenue: 43720, orders: 1415 },
  { month: "Apr", revenue: 45590, orders: 1492 },
  { month: "May", revenue: 48310, orders: 1564 },
]

export const pharmacyWeeklyFlow = [
  { day: "Mon", dispensed: 72, pending: 16 },
  { day: "Tue", dispensed: 81, pending: 19 },
  { day: "Wed", dispensed: 77, pending: 14 },
  { day: "Thu", dispensed: 88, pending: 17 },
  { day: "Fri", dispensed: 96, pending: 13 },
  { day: "Sat", dispensed: 89, pending: 11 },
  { day: "Sun", dispensed: 64, pending: 9 },
]

export function getInventoryStatus(stock: number, reorderLevel: number): InventoryStatus {
  if (stock === 0) return "OUT_OF_STOCK"
  if (stock <= Math.max(10, reorderLevel * 0.4)) return "CRITICAL"
  if (stock <= reorderLevel) return "LOW_STOCK"
  return "IN_STOCK"
}

export function getInventoryStatusLabel(status: InventoryStatus) {
  return status.replace(/_/g, " ")
}

export function getDaysUntilExpiry(expiryDate: string) {
  const now = new Date("2026-05-23T00:00:00")
  const expiry = new Date(expiryDate)
  return Math.ceil((expiry.getTime() - now.getTime()) / 86400000)
}

export function getMedicineById(id: string) {
  return pharmacyInventory.find((medicine) => medicine.id === id)
}

export function getSupplierById(id: string) {
  return pharmacySuppliers.find((supplier) => supplier.id === id)
}

export function getInventoryInsights() {
  const lowStock = pharmacyInventory.filter((medicine) => ["LOW_STOCK", "CRITICAL", "OUT_OF_STOCK"].includes(getInventoryStatus(medicine.stock, medicine.reorderLevel)))
  const outOfStock = pharmacyInventory.filter((medicine) => getInventoryStatus(medicine.stock, medicine.reorderLevel) === "OUT_OF_STOCK")
  const expiringSoon = pharmacyInventory.filter((medicine) => getDaysUntilExpiry(medicine.expiryDate) <= pharmacySettings.expiryAlertDays)
  const inventoryValue = pharmacyInventory.reduce((sum, medicine) => sum + medicine.stock * medicine.unitPrice, 0)
  const categoryBreakdown = Array.from(
    pharmacyInventory.reduce((map, medicine) => {
      const current = map.get(medicine.category) ?? { category: medicine.category, items: 0, stock: 0, value: 0 }
      current.items += 1
      current.stock += medicine.stock
      current.value += medicine.stock * medicine.unitPrice
      map.set(medicine.category, current)
      return map
    }, new Map<string, { category: string; items: number; stock: number; value: number }>() ).values(),
  ).sort((a, b) => b.value - a.value)

  return {
    totalMedicines: pharmacyInventory.length,
    totalUnits: pharmacyInventory.reduce((sum, medicine) => sum + medicine.stock, 0),
    inventoryValue,
    lowStock,
    outOfStock,
    expiringSoon,
    categoryBreakdown,
    fastMoving: pharmacyInventory.filter((medicine) => medicine.fastMoving),
  }
}

export function getPrescriptionInsights() {
  const pending = pharmacyPrescriptions.filter((prescription) => prescription.status === "PENDING")
  const inProgress = pharmacyPrescriptions.filter((prescription) => prescription.status === "IN_PROGRESS")
  const ready = pharmacyPrescriptions.filter((prescription) => prescription.status === "READY")
  const onHold = pharmacyPrescriptions.filter((prescription) => prescription.status === "ON_HOLD")
  const urgent = pharmacyPrescriptions.filter((prescription) => prescription.priority === "URGENT")
  const counseling = pharmacyPrescriptions.filter((prescription) => prescription.counselingRequired)
  const stockRisk = pharmacyPrescriptions.map((prescription) => {
    const unavailable = prescription.items.filter((item) => {
      const medicine = getMedicineById(item.medicineId)
      return !medicine || medicine.stock < item.quantity
    })
    return {
      ...prescription,
      unavailable,
      canFullyDispense: unavailable.length === 0,
    }
  })

  return {
    pending,
    inProgress,
    ready,
    onHold,
    urgent,
    counseling,
    averageTurnaround:
      Math.round(
        pharmacyPrescriptions.reduce((sum, prescription) => sum + prescription.turnaroundMins, 0) /
          pharmacyPrescriptions.length,
      ) || 0,
    stockRisk,
  }
}

export function getDispensedInsights() {
  const todayRecords = pharmacyDispensedRecords.filter((record) => record.dispensedAt.startsWith("2026-05-23"))
  const weekRecords = pharmacyDispensedRecords.filter((record) => new Date(record.dispensedAt) >= new Date("2026-05-17"))
  const todayRevenue = todayRecords.reduce((sum, record) => sum + record.totalAmount, 0)
  const weekRevenue = weekRecords.reduce((sum, record) => sum + record.totalAmount, 0)
  const paymentPending = pharmacyDispensedRecords.filter((record) => record.paymentStatus !== "PAID")
  const topMedicines = Array.from(
    pharmacyDispensedRecords
      .flatMap((record) => record.items)
      .reduce((map, item) => {
        const current = map.get(item.name) ?? { name: item.name, quantity: 0, revenue: 0 }
        current.quantity += item.quantity
        current.revenue += item.quantity * item.price
        map.set(item.name, current)
        return map
      }, new Map<string, { name: string; quantity: number; revenue: number }>())
      .values(),
  )
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)

  return {
    todayRecords,
    weekRecords,
    todayRevenue,
    weekRevenue,
    totalRevenue: pharmacyDispensedRecords.reduce((sum, record) => sum + record.totalAmount, 0),
    paymentPending,
    counselingCompletion: Math.round(
      (pharmacyDispensedRecords.filter((record) => record.counselingDone).length / pharmacyDispensedRecords.length) * 100,
    ),
    topMedicines,
  }
}

export function getPharmacyDashboardData() {
  const inventory = getInventoryInsights()
  const prescriptions = getPrescriptionInsights()
  const dispensed = getDispensedInsights()

  return {
    stats: {
      totalMedicines: inventory.totalMedicines,
      lowStockItems: inventory.lowStock.length,
      pendingPrescriptions: prescriptions.pending.length,
      dispensedToday: dispensed.todayRecords.length,
      inventoryValue: inventory.inventoryValue,
      todayRevenue: dispensed.todayRevenue,
      expiringSoon: inventory.expiringSoon.length,
      openPurchaseOrders: pharmacyPurchaseOrders.filter((po) => po.status !== "RECEIVED").length,
    },
    pendingPrescriptions: prescriptions.stockRisk.slice(0, 6),
    lowStock: inventory.lowStock.slice(0, 6),
    expiringSoon: inventory.expiringSoon.slice(0, 5),
    activities: pharmacyActivities,
    supplierPerformance: pharmacySuppliers.map((supplier) => ({
      name: supplier.name,
      reliability: supplier.reliability,
      openOrders: supplier.openOrders,
      leadTimeDays: supplier.leadTimeDays,
    })),
    categoryBreakdown: inventory.categoryBreakdown.map((entry) => ({
      name: entry.category,
      value: Math.round(entry.value),
    })),
    monthlyRevenue: pharmacyMonthlyRevenue,
    weeklyFlow: pharmacyWeeklyFlow,
    topMedicines: dispensed.topMedicines,
  }
}
