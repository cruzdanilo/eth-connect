import * as expect from 'expect'
import { coder } from '../src/solidity/coder'
import { formatInputAddress } from '../src/solidity/formatters'
import * as formatters from '../src/utils/formatters'

let tests = [
  // { input: 'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZS', result: '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8' },
  { input: '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8', result: '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8' },
  { input: '00c5496aee77c1ba1f0854206a26dda82a81d6d8', result: '0x00c5496aee77c1ba1f0854206a26dda82a81d6d8' },
  { input: '0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae', result: '0x11f4d0a3c12e86b4b5f39b213f7e19d048276dae' },
  { input: '0xBF79cE2fbd819e5aBC2327563D02a200255B7Cb3', result: '0xBF79cE2fbd819e5aBC2327563D02a200255B7Cb3' }
]

let errorTests = [
  '0x0c5496aee77c1ba1f0854206a26dda82a81d6d8',
  '0x0c5496aee77c1ba1f0854206a26dda82a81d6d8',
  '00c5496aee77c1ba1f0854206a26dda82a81d6d',
  '0x0',
  'XE7338O073KYGTWWZN0F2WZ0R8PX5ZPPZE',
  '0x'
]

describe('formatters', function () {
  describe('inputAddressFormatter', function () {
    tests.forEach(function (test, i) {
      it('should return the correct value: ' + i, function () {
        expect(formatters.inputAddressFormatter(test.input)).toEqual(test.result)
      })
    })
  })
})

describe('formatters', function () {
  describe('inputAddressFormatter', function () {
    errorTests.forEach(function (test, i) {
      it('should throw an exception: ' + i, function () {
        expect(function () {
          formatters.inputAddressFormatter(test)
        }).toThrow()
      })
    })
  })
  describe('formatInputAddress', () => {
    tests.forEach(function (test) {
      it('formatInputAddress: ' + test.input, () => {
        const t = formatInputAddress(test.input)
        expect(coder.decodeParam('address', t.encode())).toEqual(test.result.toLowerCase())
      })
    })
  })
})
