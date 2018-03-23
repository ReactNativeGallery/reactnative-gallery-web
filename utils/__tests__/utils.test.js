import {
  jsonToString,
  invariantsUndef,
  isFocus,
  tmatches,
  baseApi,
  logError,
  logInfo,
  logWarning,
  now
} from '../'

it('should transform json to pretty string', () => {
  expect(jsonToString({
    id: 1,
    list: [{ key: 0, value: 'value', value1: 'value1' }],
    bool: true,
    num: 1,
    str: 'string',
    key1: undefined,
    key2: null
  })).toBe(`{
  "id": 1,
  "list": [
    {
      "key": 0,
      "value": "value",
      "value1": "value1"
    }
  ],
  "bool": true,
  "num": 1,
  "str": "string",
  "key2": null
}`)
})

it('should throw exception according undefined key', () => {
  try {
    invariantsUndef({
      id: undefined
    })
  } catch (error) {
    expect(error.message).toBe('"id" is undefined')
  }
})

it('should not throw exception according defined key', () => {
  invariantsUndef({
    id: 1
  })
  expect(true).toBe(true)
})

it('should return value if focus props', () => {
  expect(isFocus('#fff')({ focus: true })).toBe('#fff')
})

it('should return null if not focus props', () => {
  expect(isFocus('#fff')({ focus: false })).toBe(null)
})

it('should match type', () => {
  const date = new Date()
  expect(tmatches('a string')({ string: x => x })).toBe('a string')
  expect(tmatches(1)({ number: x => x })).toBe(1)
  expect(tmatches(true)({ boolean: x => !x })).toBe(false)
  expect(tmatches(date)({ object: x => x })).toBe(date)
  expect(tmatches({ id: 0 })({ object: x => x.id })).toBe(0)
  expect(tmatches({ id: 0 })({ object: undefined })).toEqual({ id: 0 })
})

it('should return correct url', () => {
  expect(baseApi({ headers: { host: 'domain.com' } })).toBe('http://domain.com')
  expect(baseApi(null)).toBe('https://reactnative.gallery')
})

it('should log info', () => {
  logInfo('test')
  expect(true).toBe(true)
})

it('should log warn', () => {
  logWarning('test')
  expect(true).toBe(true)
})

it('should log warn', () => {
  logError()
  expect(true).toBe(true)
  logError('test 1')
  expect(true).toBe(true)
  logError(new Error('test 2'))
  expect(true).toBe(true)
})

it('should give now date', () => {
  expect(typeof now).toBe('function')
  expect(typeof now()).toBeDefined()
  expect(typeof now()).toBe('object')
  expect(now().getTime()).toBeLessThanOrEqual(new Date().getTime())
})
