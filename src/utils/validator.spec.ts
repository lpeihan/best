import { isPhoneNumber } from './validator';

describe('validator', () => {
  describe('isPhoneNumber', () => {
    it('should return false when the phone number is not start with 1', () => {
      const value = '27750621302';

      expect(isPhoneNumber(value)).toBe(false);
    });
  });
});
