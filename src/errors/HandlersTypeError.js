export default class HandlersTypeError extends Error {
  constructor() {
    super("Handlers should be an object of type { [string]: Function } ");
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}