import { roundNumber } from '../../../../../src/modules/Shared/application/utils/roundNumber';

describe('roundNumber', () => {
  test('should correctly return the number rounded when the thousandth is less than 5', () => {
    const number = 283.36413;
    const expectedRoundedNumber = 283.36;

    const roundedNumber = roundNumber(number);
    expect(roundedNumber).toBe(expectedRoundedNumber);
  });

  test('should correctly return the number rounded when the thousandth is greater than 5', () => {
    const number = 283.36813;
    const expectedRoundedNumber = 283.37;

    const roundedNumber = roundNumber(number);
    expect(roundedNumber).toBe(expectedRoundedNumber);
  });

  test('should correctly return the number rounded when the thousandth is 5', () => {
    const number = 283.36513;
    const expectedRoundedNumber = 283.37;

    const roundedNumber = roundNumber(number);
    expect(roundedNumber).toBe(expectedRoundedNumber);
  });

  test('should correctly return the number rounded when the decimals amount is 4', () => {
    const number = 283.3651583;
    const expectedRoundedNumber = 283.3652;

    const roundedNumber = roundNumber(number, 4);
    expect(roundedNumber).toBe(expectedRoundedNumber);
  });
});
