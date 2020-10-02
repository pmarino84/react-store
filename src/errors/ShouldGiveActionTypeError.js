export default class ShouldGiveActionTypeError extends Error {
  constructor() {
    super('Should give action type')
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}