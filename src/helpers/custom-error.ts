export class CustomError extends Error {
  constructor(message: string, public code?: string, public meta?: any) {
    super(message)
    this.name = 'CustomError'
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      meta: this.meta,
    }
  }
}
