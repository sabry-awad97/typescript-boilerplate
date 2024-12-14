interface Medication {
  id: string;
  name: string;
  manufacturer: string;
  category: "prescription" | "otc" | "controlled";
  price: number;
  stock: number;
  expiryDate: Date;
  dosageForm: "tablet" | "capsule" | "liquid" | "cream";
  strength: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  prescriptions: Prescription[];
  insuranceProvider?: string;
}

interface Prescription {
  id: string;
  medicationId: string;
  doctorName: string;
  issueDate: Date;
  expiryDate: Date;
  dosage: string;
  frequency: string;
  quantity: number;
  refillsRemaining: number;
}

export class PharmacySystem {
  private medications: Map<string, Medication> = new Map();
  private customers: Map<string, Customer> = new Map();

  addMedication(medication: Medication): void {
    if (this.medications.has(medication.id)) {
      throw new Error("Medication already exists");
    }
    this.medications.set(medication.id, medication);
  }

  updateStock(medicationId: string, quantity: number): void {
    const medication = this.medications.get(medicationId);
    if (!medication) {
      throw new Error("Medication not found");
    }
    medication.stock += quantity;
    this.medications.set(medicationId, medication);
  }

  addCustomer(customer: Customer): void {
    if (this.customers.has(customer.id)) {
      throw new Error("Customer already exists");
    }
    this.customers.set(customer.id, customer);
  }

  addPrescription(customerId: string, prescription: Prescription): void {
    const customer = this.customers.get(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    const medication = this.medications.get(prescription.medicationId);
    if (!medication) {
      throw new Error("Medication not found");
    }

    if (
      medication.category === "prescription" ||
      medication.category === "controlled"
    ) {
      if (prescription.expiryDate < new Date()) {
        throw new Error("Prescription has expired");
      }
    }

    customer.prescriptions.push(prescription);
    this.customers.set(customerId, customer);
  }

  dispenseMedication(customerId: string, prescriptionId: string): void {
    const customer = this.customers.get(customerId);
    if (!customer) {
      throw new Error("Customer not found");
    }

    const prescription = customer.prescriptions.find(
      (p) => p.id === prescriptionId
    );
    if (!prescription) {
      throw new Error("Prescription not found");
    }

    const medication = this.medications.get(prescription.medicationId);
    if (!medication) {
      throw new Error("Medication not found");
    }

    if (medication.stock < prescription.quantity) {
      throw new Error("Insufficient stock");
    }

    if (prescription.refillsRemaining <= 0) {
      throw new Error("No refills remaining");
    }

    medication.stock -= prescription.quantity;
    prescription.refillsRemaining--;

    this.medications.set(medication.id, medication);
    this.customers.set(customer.id, customer);
  }

  checkLowStock(threshold: number = 10): Medication[] {
    return Array.from(this.medications.values()).filter(
      (med) => med.stock <= threshold
    );
  }

  getExpiredMedications(): Medication[] {
    const today = new Date();
    return Array.from(this.medications.values()).filter(
      (med) => med.expiryDate < today
    );
  }

  getMedication(id: string): Medication | undefined {
    return this.medications.get(id);
  }

  getCustomer(id: string): Customer | undefined {
    return this.customers.get(id);
  }
}
