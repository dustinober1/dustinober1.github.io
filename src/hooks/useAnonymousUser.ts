import { useState, useEffect } from 'react';

export function useAnonymousUser() {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Check localStorage for existing ID
        let storedId = localStorage.getItem('ebook_progress_user_id');

        if (!storedId) {
            // Generate simple random ID if none exists
            storedId = 'anon_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
            localStorage.setItem('ebook_progress_user_id', storedId);
        }

        setUserId(storedId);
    }, []);

    return userId;
}
