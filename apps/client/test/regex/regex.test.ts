import {
  isPositiveNumber,
  validateISBN,
  validatePhoneNumber
} from '../../src/app/services/regexService';

describe('regex isPositiveNumber tests', () => {
  it('should return true if number is greater than 0', async () => {
    let result = await isPositiveNumber('5');
    expect(result).toBe(true);
    result = await isPositiveNumber('123');
    expect(result).toBe(true);
    result = await isPositiveNumber('12.23');
    expect(result).toBe(true);
  });

  it('should return true if number is equal to 0', async () => {
    const result = await isPositiveNumber('0');
    expect(result).toBe(true);
  });

  it('should return new Error if number is lower than 0', async () => {
    await expect(isPositiveNumber('-2')).rejects.toThrow('number is negative');
    await expect(isPositiveNumber('-123')).rejects.toThrow(
      'number is negative'
    );
    await expect(isPositiveNumber('-5.4')).rejects.toThrow(
      'number is negative'
    );
  });
});

describe('regex validateISBN tests', () => {
  it('should return true if ISBN is according to ISBN format(/^\\d{3}-\\d{10}$/)', async () => {
    let result = await validateISBN('123-1234567890');
    expect(result).toBe(true);
    result = await validateISBN('542-1230939380');
    expect(result).toBe(true);
    result = await validateISBN('000-1239090909');
    expect(result).toBe(true);
  });
  it('should return new Error if ISBN is not according to ISBN format', async () => {
    await expect(validateISBN('1234567890123')).rejects.toThrow('invalid ISBN');
    await expect(validateISBN('123-123123123123')).rejects.toThrow(
      'invalid ISBN'
    );
    await expect(validateISBN('123----123123123')).rejects.toThrow(
      'invalid ISBN'
    );
    await expect(validateISBN('12-12312312312')).rejects.toThrow(
      'invalid ISBN'
    );
  });
});

describe('regex validatePhoneNumber test', () => {
  it('should return true if number format is according to phone number format(/^\\d{8}$/)', async () => {
    let result = await validatePhoneNumber('12345678');
    expect(result).toBe(true);
    result = await validatePhoneNumber('98765432');
    expect(result).toBe(true);
    result = await validatePhoneNumber('12300123');
    expect(result).toBe(true);
  });
  it('should return new Error if number is not according to phone number format', async () => {
    await expect(validatePhoneNumber('123456789')).rejects.toThrow(
      'invalid phone'
    );
    await expect(validatePhoneNumber('123f23424')).rejects.toThrow(
      'invalid phone'
    );
    await expect(validatePhoneNumber('091')).rejects.toThrow('invalid phone');
  });
});
