import { beforeEach, describe, expect, it } from "vitest";
import { PharmacySystem } from "./index";

describe("PharmacySystem", () => {
  let pharmacy: PharmacySystem;
  const testMedication = {
    id: "med1",
    name: "Aspirin",
    manufacturer: "Bayer",
    category: "otc" as const,
    price: 9.99,
    stock: 100,
    expiryDate: new Date("2025-12-31"),
    dosageForm: "tablet" as const,
    strength: "325mg",
  };

  const testCustomer = {
    id: "cust1",
    name: "John Doe",
    phone: "555-0123",
    email: "john@example.com",
    prescriptions: [],
  };

  const testPrescription = {
    id: "presc1",
    medicationId: "med1",
    doctorName: "Dr. Smith",
    issueDate: new Date(),
    expiryDate: new Date("2024-12-31"),
    dosage: "1 tablet",
    frequency: "twice daily",
    quantity: 60,
    refillsRemaining: 3,
  };

  beforeEach(() => {
    pharmacy = new PharmacySystem();
  });

  describe("Medication Management", () => {
    it("should add a new medication", () => {
      pharmacy.addMedication(testMedication);
      expect(pharmacy.getMedication("med1")).toEqual(testMedication);
    });

    it("should throw error when adding duplicate medication", () => {
      pharmacy.addMedication(testMedication);
      expect(() => pharmacy.addMedication(testMedication)).toThrow(
        "Medication already exists"
      );
    });

    it("should update medication stock", () => {
      pharmacy.addMedication(testMedication);
      pharmacy.updateStock("med1", 50);
      const updated = pharmacy.getMedication("med1");
      expect(updated?.stock).toBe(150);
    });

    it("should identify low stock medications", () => {
      const lowStockMed = { ...testMedication, stock: 5 };
      pharmacy.addMedication(lowStockMed);
      const lowStock = pharmacy.checkLowStock(10);
      expect(lowStock).toHaveLength(1);
      expect(lowStock[0]!.id).toBe("med1");
    });
  });

  describe("Customer Management", () => {
    it("should add a new customer", () => {
      pharmacy.addCustomer(testCustomer);
      expect(pharmacy.getCustomer("cust1")).toEqual(testCustomer);
    });

    it("should throw error when adding duplicate customer", () => {
      pharmacy.addCustomer(testCustomer);
      expect(() => pharmacy.addCustomer(testCustomer)).toThrow(
        "Customer already exists"
      );
    });
  });

  describe("Prescription Management", () => {
    beforeEach(() => {
      pharmacy.addMedication(testMedication);
      pharmacy.addCustomer(testCustomer);
    });

    it("should add a prescription to customer", () => {
      pharmacy.addPrescription("cust1", testPrescription);
      const customer = pharmacy.getCustomer("cust1");
      expect(customer?.prescriptions).toHaveLength(1);
      expect(customer?.prescriptions[0]).toEqual(testPrescription);
    });

    it("should dispense medication and update stock", () => {
      pharmacy.addPrescription("cust1", testPrescription);
      pharmacy.dispenseMedication("cust1", "presc1");

      const medication = pharmacy.getMedication("med1");
      const customer = pharmacy.getCustomer("cust1");
      const prescription = customer?.prescriptions[0];

      expect(medication?.stock).toBe(90); // 100 - 60
      expect(prescription?.refillsRemaining).toBe(2);
    });

    it("should throw error when dispensing with insufficient stock", () => {
      const lowStockMed = { ...testMedication, stock: 10 };
      pharmacy = new PharmacySystem();
      pharmacy.addMedication(lowStockMed);
      pharmacy.addCustomer(testCustomer);
      pharmacy.addPrescription("cust1", testPrescription);

      expect(() => pharmacy.dispenseMedication("cust1", "presc1")).toThrow(
        "Insufficient stock"
      );
    });
  });
});
