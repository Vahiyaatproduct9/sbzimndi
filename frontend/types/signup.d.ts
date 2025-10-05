export type signupPage = 'signup' | 'kyc' | 'documents' | 'UPI';
export interface signUpInfo {
    name: string;
    email: string;
    password: string;
    phone: string;
    location: number[] | { lat: number, long: number, acc: number },
    ifsc?: string | null;
    fullName?: string | null;
    upiId?: string | null;
    accountNumber?: string | null;
    pan_number?: string | null;
    aadhar_uri?: string | null;
    bank_proof_uri?: string | null;
    pan_uri?: string | null;
}
export type tabs = 'home' | 'search' | 'add' | 'profile'