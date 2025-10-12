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
export interface Address {
    city: string;
    state: string;
    country: string;
    street1: string;
    street2: string;
    postal_code: string;
}

export interface User {
    id: string;
    bio: string | null;
    ifsc: string | null;
    email: string;
    rating: number;
    upi_id: string | null;
    address: Address | null;
    accuracy: number | null;
    latitude: number | null;
    longitude: number | null;
    location: string | null;
    password?: string; // optional, should not be exposed in UI
    upi_name: string | null;
    fcm_token: string | null;
    full_name: string;
    user_type: "buyer" | "seller" | string;
    bank_proof: string | null;
    created_at: string;
    updated_at: string;
    items_sold: number;
    is_verified: boolean;
    aadhar_front: string | null;
    personal_pan: string | null;
    phone_number: string;
    spirit_animal: string | null;
    account_number: string | null;
    profile_picture: string | null;
    rzp_merchant_status: string | null;
    rzp_linked_account_id: string | null;
    rzp_stakeholder_account_id: string | null;
}

export interface Conversation_Data {
    id: string;
    buyer_id: string;
    seller_id: string;
    created_at: string;
    last_message: string | null;
    last_message_at: string | null;
    buyer: User;
    seller: User;
}

export interface Conversation {
    success: boolean;
    error: string | null;
    message: string | null;
    data: Conversation_Data[];
}

export interface Message {
    id: string | null;
    conversation_id: string | null;
    body: string | null;
    sender_id: string | null;
    created_at: Date | string;
    read: boolean;
}