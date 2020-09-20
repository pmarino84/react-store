import { ACTIONS_SEPARATOR } from './constants'

export default function combineActions(...actions) {
  return actions.join(ACTIONS_SEPARATOR)
}
