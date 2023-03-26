export interface ChangeAccountPassword {
    change(token: string, email: string, newPassword: string): Promise<void>
}