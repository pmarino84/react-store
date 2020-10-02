export default class PayloadFactoryShouldBeAFunctionError extends Error {
  constructor() {
    super('Payload factory should be a function')
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}