export default async function({
    name,
    email,
    phone,
    password,
    repass,
    lctnEnbld,
    location: {
        long,
        lat, acc
    }
} : {
    name: string;
    email: string;
    phone: string;
    password: string;
    repass: string;
    lctnEnbld: boolean;
    location: {
        long: number;
        lat: number;
        acc: number;
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
        if (long === 0 && lat === 0 && acc === 0) {
            return 'Location is enabled but not available';
        }
    }
    return null;
}