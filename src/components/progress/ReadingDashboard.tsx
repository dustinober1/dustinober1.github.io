'use client';

import React, { useEffect, useState } from 'react';
import { useAnonymousUser } from '@/hooks/useAnonymousUser';

interface AnalyticsData {
    totalBooksStarted: number;
    booksCompleted: number;
    totalTimeRead: number;
    streakDays: number;
}

const ReadingDashboard: React.FC = () => {
    const userId = useAnonymousUser();
    const [stats, setStats] = useState<AnalyticsData | null>(null);

    useEffect(() => {
        if (!userId) return;

        async function fetchAnalytics() {
            try {
                const res = await fetch(`/api/progress/analytics?userId=${userId}`);
                const data = await res.json();
                if (data.stats) {
                    setStats(data.stats);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchAnalytics();
    }, [userId]);

    if (!stats) return null; // Don't show empty dashboard if no data or loading

    // Only show if user has actually started reading something
    if (stats.totalBooksStarted === 0) return null;

    return (
        <section className="mb-8">
            <div className="container">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Your Reading Stats</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalBooksStarted}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Books Started</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.booksCompleted}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {Math.round(stats.totalTimeRead / 60)}<span className="text-sm font-normal text-gray-400">m</span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Total Time</div>
                        </div>
                        {/* Placeholder for streak */}
                        <div className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm opacity-50">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">-</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Day Streak</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReadingDashboard;
