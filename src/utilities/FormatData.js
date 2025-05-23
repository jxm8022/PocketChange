export const GetStringLength = (inputString) => {
    return inputString.trim().replace(' ', '').length;
}

export const FormatString = (inputString) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export const CleanFloat = (inputFloat) => {
    return Math.abs(inputFloat) < 1e-10 ? 0 : inputFloat;
}

export const FloatString = (inputFloat) => {
    if (!inputFloat) {
        let zero = 0;
        return zero.toFixed(2);
    }

    return CleanFloat(inputFloat).toFixed(2);
}