export function isPositiveNumber(numberToCheck: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (parseFloat(numberToCheck) >= 0) {
      resolve(true);
    } else {
      reject(new Error('Invalid Number'));
    }
  });
}

export function validateISBN(textToCheck: string): Promise<boolean> {
  const regex = /^\d{3}-\d{10}$/;
  return new Promise((resolve, reject) => {
    if (regex.test(textToCheck)) {
      resolve(true);
    } else {
      reject(new Error('Invalid ISBN'));
    }
  });
}

export function validatePhoneNumber(textToCheck: string): Promise<boolean> {
  const regex = /^\d{8}$/;
  return new Promise((resolve, reject) => {
    if (regex.test(textToCheck)) {
      resolve(true);
    } else {
      reject(new Error('Invalid phone number'));
    }
  });
}
