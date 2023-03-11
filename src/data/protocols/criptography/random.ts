export interface RandomUuid {
  random(): Promise<string>
}