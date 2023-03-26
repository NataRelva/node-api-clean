import { AccountModel } from './../../../../domain/models/account/account';
export interface UpdatePasswordResetToken { 
  updatePasswordResetToken(email: string, passwordHash: string, passwordResetExpires: Date): Promise<AccountModel | null>
}