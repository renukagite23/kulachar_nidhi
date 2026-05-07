'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';

export default function NotificationBell() {
    const [count, setCount] = useState(0);

    const fetchCount = async () => {
        try {
            const res = await fetch('/api/notifications');

            if (!res.ok) return;

            const data = await res.json();

            const unread = Array.isArray(data)
                ? data.filter((n: any) => !n.isRead).length
                : 0;

            // Only update if changed (prevents extra re-renders)
            setCount(prev => (prev !== unread ? unread : prev));

        } catch (error) {
            console.error('Notification fetch error:', error);
        }
    };

    useEffect(() => {
        fetchCount();

        // 🔁 Poll every 10 seconds (better than 5s)
        const interval = setInterval(fetchCount, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Link href="/admin/notifications" className="relative">
            <Bell className="w-6 h-6 text-secondary" />

            {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {count}
                </span>
            )}
        </Link>
    );
}