export default ({
    ifsc,
    accountNumber,
    confirmAccountNumber
}: {
    ifsc: string;
    accountNumber: string;
    confirmAccountNumber: string;
}) =>{
    if (ifsc.length !== 11) {
        return 'IFSC code must be 11 characters long';
    }
    if (!/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(ifsc)) {
        return 'Invalid IFSC code format';
    }
    if (accountNumber.length < 9 || accountNumber.length > 18) {
        return 'Account number must be between 9 and 18 digits long';
    }
    if (!/^\d+$/.test(accountNumber)) {
        return 'Account number must contain only digits';
    }
    if (accountNumber !== confirmAccountNumber) {
        return 'Account numbers do not match';
    }
    return null; // No errors
}