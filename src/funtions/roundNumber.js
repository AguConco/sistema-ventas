export const roundToSpecialNumber = num => {
    let lastDigit = num % 10
    if (lastDigit === 1 || lastDigit === 2) return num - lastDigit
    else if (lastDigit === 3 || lastDigit === 4) return num + (5 - lastDigit)
    else if (lastDigit === 6 || lastDigit === 7) return num - (lastDigit - 5)
    else if (lastDigit === 8 || lastDigit === 9) return num + (10 - lastDigit)
    else return num;
}