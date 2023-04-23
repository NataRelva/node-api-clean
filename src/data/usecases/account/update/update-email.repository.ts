import { UpdateEmailRepository } from '../../../protocols/db/account/update-email.repository';
import { AccountModel } from '../../add-account/db-add-account-protocols';
import { UpdateEmail } from './../../../../domain/useCases/account/update-email.usecase';
export class DbUpdateEmailRepository implements UpdateEmail {
  constructor(
    private readonly updateEmailRepository: UpdateEmailRepository
  ) {}
  async execute(data: { accountId: string; email: string }): Promise<AccountModel> {
    const updatedAccount = await this.updateEmailRepository.updateEmail(data);
    return updatedAccount;
  }
}