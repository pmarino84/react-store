export default function createAction(type, payloadFactory) {
  const makePayload = payloadFactory ? payloadFactory : (value) => value
  return function actionFactory(...args) {
    return {
      type,
      payload: makePayload(...args)
    }
  }
}
