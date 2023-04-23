export interface ChangeAccountPassword {
    change(token: string, email: string, newPassword: string, call?: 'login' | 'profile'): Promise<void>
}