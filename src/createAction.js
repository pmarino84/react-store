import PayloadFactoryShouldBeAFunctionError from './errors/PayloadFactoryShouldBeAFunctionError'
import ShouldGiveActionTypeError from './errors/ShouldGiveActionTypeError'

function createPayloadFactory(factory) {
  let makePayload = null
  if (factory) {
    if (typeof factory !== 'function') throw new PayloadFactoryShouldBeAFunctionError()
    makePayload = factory
  } else {
    makePayload = (value) => value
  }
  return makePayload
}

export default function createAction(type, payloadFactory) {
  if (!type) throw new ShouldGiveActionTypeError()
  const makePayload = createPayloadFactory(payloadFactory)
  return function actionFactory(...args) {
    return {
      type,
      payload: makePayload(...args)
    }
  }
}
