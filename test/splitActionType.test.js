import splitActionType from '../src/utils/splitActionType'

describe('splitActionType', () => {
  test('thorw error if call without params', () => {
    expect(() => {
      try {
        splitActionType()
      } catch (ex) {
        throw ex
      }
    }).toThrow()
  })

  test('return an array', () => {
    expect(splitActionType('')).toEqual(expect.any(Array))
  })

  test('contains two types', () => {
    expect(splitActionType('uno|due')).toHaveLength(2)
  })

  test('give "uno|due" result [uno, due]', () => {
    expect(splitActionType('uno|due')).toEqual(expect.arrayContaining(['uno', 'due']))
  })
})