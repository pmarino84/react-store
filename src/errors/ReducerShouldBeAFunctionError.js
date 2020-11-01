export default class ReducerShouldBeAFunctionError extends Error {
  constructor() {
    super('Reducer should be a function')
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}