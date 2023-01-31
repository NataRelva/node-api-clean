import { CpfCnpjValidator } from "../presentation/protocols/cpf-cnpj-validator";

export interface ValidatorCPFCNPJ {
    validaCpfCnpj(cpfCnpj: string): boolean;
}

export class CpfCnpjValidatorAdapter implements CpfCnpjValidator {
    private readonly validatorCpfCnpj: ValidatorCpfCnpj;
    constructor(validator: ValidatorCpfCnpj) {
        this.validatorCpfCnpj = validator;
    }

    isValid(cpfCnpj: string): boolean {
        return this.validatorCpfCnpj.validaCpfCnpj(cpfCnpj);
    }
}

export class ValidatorCpfCnpj implements ValidatorCPFCNPJ {
    validaCpfCnpj(value: string): boolean {
        value = value.replace(/[^\d]+/g, "");
        if (!value) {
            return false;
        }
        if (value.length === 11) {
            const checkList = [
                "00000000000",
                "11111111111",
                "22222222222",
                "33333333333",
                "44444444444",
                "55555555555",
                "66666666666",
                "77777777777",
                "88888888888",
                "99999999999",
            ];
            if (checkList.includes(value)) {
                return false;
            }
            let sum = 0;
            let weight = 10;
            for (let i = 0; i < 9; i++) {
                sum += parseInt(value[i]) * weight;
                weight--;
            }
            let rev = 11 - (sum % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }
            if (rev !== parseInt(value[9])) {
                return false;
            }
            sum = 0;
            weight = 11;
            for (let i = 0; i < 10; i++) {
                sum += parseInt(value[i]) * weight;
                weight--;
            }
            rev = 11 - (sum % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }
            if (rev !== parseInt(value[10])) {
                return false;
            }
            return true;
        } else if (value.length === 14) {
            const checkList = [
                "00000000000000",
                "11111111111111",
                "22222222222222",
                "33333333333333",
                "44444444444444",
                "55555555555555",
                "66666666666666",
                "77777777777777",
                "88888888888888",
                "99999999999999",
            ];
            if (checkList.includes(value)) {
                return false;
            }
            let sum = 0;
            let pos = 0;
            const weight = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            for (let i = 0; i < 12; i++) {
                sum += parseInt(value[i]) * weight[pos];
                pos++;
            }
            let rev = 11 - (sum % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }
            if (rev !== parseInt(value[12])) {
                return false;
            }
            sum = 0;
            pos = 0;
            const weight2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
            for (let i = 0; i < 13; i++) {
                sum += parseInt(value[i]) * weight2[pos];
                pos++;
            }
            rev = 11 - (sum % 11);
            if (rev === 10 || rev === 11) {
                rev = 0;
            }
            if (rev !== parseInt(value[13])) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
}
