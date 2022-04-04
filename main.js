// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
const validateCred = (ccNumIn) => {
  let multiplyByTwoFlag = false;
  let multiplyByTwoResult = 0;
  let sum = 0;
  for (let i = ccNumIn.length-1; i >= 0; i--) {
    if (multiplyByTwoFlag) {
      multiplyByTwoResult = ccNumIn[i] * 2;
      if (multiplyByTwoResult > 9) {
        multiplyByTwoResult -= 9;
      }
      sum += multiplyByTwoResult;
    } else {
      sum += ccNumIn[i];
    }
    multiplyByTwoFlag = !multiplyByTwoFlag;
  }
  return (sum % 10 === 0) ? true : false;
};
// Test validateCred()
console.log(validateCred(valid1));    // should return true
console.log(validateCred(invalid1));  // should return false

const findInvalidCards = (batchIn) => {
  const invalidCards = [];
  for (card of batchIn) {
    if (!validateCred(card)) {
      invalidCards.push(card);
    }
  }
  return invalidCards;
};
// Test findInvalidCards();
console.log(findInvalidCards([valid1, valid2, valid2, valid3, valid4]));            // should be empty
console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5]));  // should return all invalid arrays

const idInvalidCardCompanies = (invalidCards) => {
  const invalidIssuers = [];
  for (card of invalidCards) {
    switch (card[0]) {
      case 3:
        if (invalidIssuers.indexOf('Amex (American Express)') === -1) {
          invalidIssuers.push('Amex (American Express)');
        }
        break;
      case 4:
        if (invalidIssuers.indexOf('Visa') === -1) {
          invalidIssuers.push('Visa');
        }
        break;
      case 5:
        if (invalidIssuers.indexOf('Mastercard') === -1) {
          invalidIssuers.push('Mastercard');
        }
        break;
      case 6:
        if (invalidIssuers.indexOf('Discover') === -1) {
          invalidIssuers.push('Discover');
        }
        break;
      default:
        console.log('Company not found');
        break;
    }
  }
  return invalidIssuers;
};
// Test idInvalidCardCompanies
console.log(idInvalidCardCompanies([invalid1]));  // should return 'Visa'
console.log(idInvalidCardCompanies(batch));       // should return invalid card companies

// Removes spaces and hyphens from a given string
const removeNonDigits = numberString => numberString.split('').filter(digit => (digit !== ' ' && digit !== '-'));
// Test removeNonDigits
console.log(removeNonDigits('4368290078651875'));     // should return ['4', '3', '6', '8', '2', '9', '0', '0', '7', '8', '6', '5', '1', '8', '7', '5']
console.log(removeNonDigits('4368 2900 7865 1875'));  // should return ['4', '3', '6', '8', '2', '9', '0', '0', '7', '8', '6', '5', '1', '8', '7', '5']
console.log(removeNonDigits('4368-2900-7865-1875'));  // should return ['4', '3', '6', '8', '2', '9', '0', '0', '7', '8', '6', '5', '1', '8', '7', '5']

// Converts string with credit card number to array of numbers
const cardStringToNumber = numberString => {
  // Check for invalid digits. 0 is a special case (it is a boolean false)
  for (char of numberString) {
    if (!Number(char) && char !== '0') {
      console.log('String should only contain digits 0-9');
      return;
    }
  }
  return numberString.map(Number);
}
// Test cardStringToNumber
console.log(cardStringToNumber(removeNonDigits('4368290078651875')));    // should return [4, 3, 6, 8, 2, 9, 0, 0, 7, 8, 6, 5, 1, 8, 7, 5]
console.log(cardStringToNumber(removeNonDigits('4368&2900&7865&1875'))); // should return undefined

// Calculate card check number (Luhn algorithm)
const calculateCardCheckDigit = card => {
  const len = card.length;
  //let sum = card[len-2];
  let sum = 0;
  const parity = (len - 2) % 2;
  for (let i = 0; i < len - 1; i++) {
    let digit = card[i];
    if (i % 2 === parity) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return 10 - (sum % 10);
};
// Test
console.log(calculateCardCheckDigit(valid1)); // should return 8 (last element of valid1 array)
