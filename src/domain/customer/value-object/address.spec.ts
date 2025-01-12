import Address from "./address";

describe("Address unit tests", () => {
    it("It should throw error when street is blank", () => {
        expect(() => {
            const address = new Address("", 10, "000000-000", "Manaus")
            address.validate()
        }).toThrow("Street is required.");
    });

    it("It should throw error when number is 0", () => {
      expect(() => {
        const address = new Address("Rua tal", 0, "000000-000", "Manaus");
        address.validate();
      }).toThrow("Number is required.");
    });

    it("It should throw error when zip code is blank", () => {
      expect(() => {
        const address = new Address("Rua tal", 10, "", "Manaus");
        address.validate();
      }).toThrow("Zip Code is required.");
    });

    it("It should throw error when city is blank", () => {
      expect(() => {
        const address = new Address("Rua tal", 10, "000000-000", "");
        address.validate();
      }).toThrow("City is required.");
    });

    it("should mount a complete address as string if validated", () => {
        const address = new Address("Rua tal", 10, "000000-000", "Manaus");
        const strigifiedAddress = address.toString();
        expect(strigifiedAddress).toBe("Rua tal, 10, 000000-000 - Manaus");
        // expect(() => {
        // }).toBe("Rua tal,10,000000-000 Manaus");
    })

})