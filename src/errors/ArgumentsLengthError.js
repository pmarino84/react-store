export default class ArgumentsLengthError extends Error {
  constructor(requiredLength) {
    super(`You should pass ${requiredLength} arguments`)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}