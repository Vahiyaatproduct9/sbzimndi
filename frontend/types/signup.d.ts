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
export interface order {
    accuracy: number;
    bought_by: string | null;
    created_at: Date;
    description: string;
    expiry_date: Date;
    id: string;
    image_url: string;
    latitude: number;
    longitude: number;
    name: string;
    price: number;
    quantity: string;
    user_id: string;
}
interface users_bought_by {
    full_name: string;
    latitude: number;
    longitude: number;
    id: string;
}
export interface orders_bought_by extends order {
    users: users_bought_by
}

export interface notification {
    id: string;
    user_id: string;
    body: {
        body: string;
        data: {
            code: 'bought_item' | 'new_message',
            newRow: order,
            oldRow: { id: string; }

        },
        title: string;
    },
    created_at: Date;
    id: string;
    is_read: boolean;
    user_id: string;
}