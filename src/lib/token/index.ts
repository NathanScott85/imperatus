import { jwtDecode } from 'jwt-decode';

export const isTokenExpiringSoon = (
    token: string,
    thresholdInSeconds = 60,
): boolean => {
    if (!token) return true;

    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const expiryTime = decoded.exp * 1000;
        const currentTime = Date.now();
        const timeLeft = expiryTime - currentTime;
        return timeLeft <= thresholdInSeconds * 1000;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return true;
    }
};

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        return Date.now() >= decoded.exp * 1000;
    } catch (error) {
        console.error('Invalid token:', error);
        return true;
    }
};
