import {describe, expect, test} from "@jest/globals"
import { randomNumber } from "@utils/RandomHelper"

describe('Random number helper test', () => {
  test('Get random number between 0 and given number', () => {
    const number = randomNumber(5);
    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThanOrEqual(5);

    const number2 = randomNumber(5);
    expect(number2).toBeGreaterThanOrEqual(0);
    expect(number2).toBeLessThanOrEqual(5);
  })
})
