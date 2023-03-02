export interface ErrorHandler {
    handle(error: Error): Promise<any>
}