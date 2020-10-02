import { ACTIONS_SEPARATOR } from '../src/constants'
import combineActions from '../src/combineActions'

describe('combineActions', () => {
  test('combine uno due to uno|due', () => {
    expect(combineActions('uno', 'due')).toBe('uno' + ACTIONS_SEPARATOR + 'due')
  })

  test('give only action sola result to sola', () => {
    expect(combineActions('sola')).toBe('sola')
  })

  test('give an array result to array.join(\'|\')', () => {
    const actions = ['uno', 'due', 'tre']
    expect(combineActions(['uno', 'due', 'tre'])).toBe(actions.join(ACTIONS_SEPARATOR))
  })
})
