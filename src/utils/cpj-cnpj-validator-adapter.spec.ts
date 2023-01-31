import {
    CpfCnpjValidatorAdapter,
    ValidatorCpfCnpj,
} from "./cpf-cnpj-validator.adapter";

const makeValidatorStub = () => {
    return new ValidatorCpfCnpj();
};

const makeSut = () => {
    const validator = makeValidatorStub();
    const sut = new CpfCnpjValidatorAdapter(validator);
    return { sut };
};

describe("CpfCnpj Validator", () => {
    test("Should return false if validator return false", () => {
        const { sut } = makeSut();
        jest.spyOn(sut, "isValid").mockReturnValue(false);
        const isValidCnfCnpj = sut.isValid("11174235497");
        expect(isValidCnfCnpj).toBe(false);
    });

    test("Should return true if validator return true", () => {
        const { sut } = makeSut();
        jest.spyOn(sut, "isValid").mockReturnValue(true);
        const isValidCnfCnpj = sut.isValid("11174235497");
        expect(isValidCnfCnpj).toBe(true);
    });

    test("Should return true if validator cpf", () => {
        const { sut } = makeSut();
        const isValidCnfCnpj = sut.isValid("111.742.354-97");
        expect(isValidCnfCnpj).toBe(true);
    });

    test("Should return false if invalid cpf", () => {
        const { sut } = makeSut();
        const isValidCnfCnpj = sut.isValid("11174235492");
        expect(isValidCnfCnpj).toBe(false);
    });

    test("Should return true if valid cnpj", () => {
        const { sut } = makeSut();
        const isValidCnfCnpj = sut.isValid("72068665000148");
        expect(isValidCnfCnpj).toBe(true);
    });

    test("Should return false if invalid cnpj", () => {
        const { sut } = makeSut();
        const isValidCnfCnpj = sut.isValid("95.363.863/0001-32");
        expect(isValidCnfCnpj).toBe(false);
    });
});
