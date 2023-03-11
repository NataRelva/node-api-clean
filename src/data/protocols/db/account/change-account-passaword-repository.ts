export interface ChangeAccountPasswordRepository {
    change(email: string, password: string): Promise<void>
}