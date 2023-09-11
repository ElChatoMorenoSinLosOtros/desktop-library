function isGreaterThanZero(numberToCheck: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (numberToCheck > 0) {
      resolve(true);
    } else {
      reject(new Error('number is negative'));
    }
  });
}

function validateISBN(textToCheck: string): Promise<boolean> {
  const regex = /^\d{3}-\d{10}$/;
  return new Promise((resolve, reject) => {
    if (regex.test(textToCheck)) {
      resolve(true);
    } else {
      reject(new Error('invalid ISBN'));
    }
  });
}

function validatePhoneNumber(textToCheck: string): Promise<boolean> {
  const regex = /^\d{8}$/;
  return new Promise((resolve, reject) => {
    if (regex.test(textToCheck)) {
      resolve(true);
    } else {
      reject(new Error('invalid phone'));
    }
  });
}

export default { isGreaterThanZero, validateISBN, validatePhoneNumber };
