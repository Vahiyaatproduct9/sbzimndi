export default async function ({
    name,
    email,
    phone,
    password,
    repass,
    lctnEnbld,
    location: {
        longitude,
        latitude, accuracy
    }
}: {
    name: string;
    email: string;
    phone: string;
    password: string;
    repass: string;
    lctnEnbld: boolean;
    location: {
        longitude: number;
        latitude: number;
        accuracy: number;
    };
}) {
    if (name.length < 3) {
        return 'Name must be at least 3 characters long';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Invalid email address';
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        return 'Phone number must be 10 digits long';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters long';
    }
    if (password !== repass) {
        return 'Passwords do not match';
    }
    if (lctnEnbld) {
        if (longitude === 0 && latitude === 0 && accuracy === 0) {
            return 'Location is enabled but not available';
        }
    }
    return null;
}