import { ACTIONS_SEPARATOR } from './constants'

export default function combineActions(...actions) {
  let list = []
  if (actions.length === 1) {
    const input = actions[0]
    if (Array.isArray(input)) {
      list = input
    } else {
      list = [input]
    }
  } else {
    list = actions
  }
  return list.join(ACTIONS_SEPARATOR)
}
