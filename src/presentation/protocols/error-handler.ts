export interface ErrorHandler {
    handle(error: any): Promise<any>
}