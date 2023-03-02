import { CheckRegistrationRepository } from './../../data/protocols/db/account/check-registration-repository';
import { CheckRegistration } from './../../presentation/protocols/check-registration';
export class CheckRegistrationAdapter implements CheckRegistration {
    constructor(
        private readonly checkRegistrationRepository: CheckRegistrationRepository
    ) { }

    async check(cpfCnpj: string, email: string): Promise<void> {
        await this.checkRegistrationRepository.check(cpfCnpj, email)
    }
}