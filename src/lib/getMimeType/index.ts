export const getMimeType = (base64String: string) => {
    if (base64String.startsWith('/9j/')) {
        return 'image/jpeg';
    } else if (base64String.startsWith('iVBORw0KGgo')) {
        return 'image/png';
    } else if (base64String.startsWith('R0lGOD')) {
        return 'image/gif';
    } else if (base64String.startsWith('UklGR')) {
        return 'image/webp';
    } else {
        return 'image/png';
    }
};
