'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import Link from 'next/link';

export default function NotificationBell() {
    const [count, setCount] = useState(0);

    const fetchCount = async () => {
        const res = await fetch('/api/notifications');
        const data = await res.json();

        const unread = data.filter((n: any) => !n.isRead).length;
        setCount(unread);
    };

    useEffect(() => {
        fetchCount();
        const interval = setInterval(fetchCount, 5000);
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