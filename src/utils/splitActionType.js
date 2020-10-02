import { ACTIONS_SEPARATOR } from '../constants'

/**
 * ATTENTION: for internal use only!
 * Return a list of combined action types
 * @param {String} type Type to check
 */
export default function splitActionType(type) {
  return type.includes(ACTIONS_SEPARATOR) ? type.split(ACTIONS_SEPARATOR) : [type]
}
