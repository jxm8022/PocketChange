export const GetStringLength = (inputString) => {
    return inputString.trim().replace(' ', '').length;
}

export const FormatString = (inputString) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}