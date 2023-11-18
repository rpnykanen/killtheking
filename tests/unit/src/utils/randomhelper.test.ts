import {describe, expect, test} from "@jest/globals"
// import Grid from "@board/Grid";
// import Position from "@board/Position"
import { randomNumber } from "../../../../src/utils/RandomHelper"

describe('Random number helper test', () => {
  test('Get random number between 0 and given number', () => {
    const random = randomNumber;
    Array.from(Array(5)).forEach((value) =>{
      const number = random(5);
      expect(number).toBeGreaterThanOrEqual(0);
      expect(number).toBeLessThanOrEqual(5);
    })
  })
})
