'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAnonymousUser } from '@/hooks/useAnonymousUser';
import ProgressBar from './ProgressBar';

interface Ebook {
    id: string; // Added id for API mapping
    title: string;
    shortTitle: string;
    category: string;
    logo: string;
    description: string;
    features: string[];
    link: string;
}

interface ProgressData {
    ebook_id: string;
    scroll_position: number;
    time_spent: number;
    is_completed: boolean;
    chapter_id: string;
}

const EbookProgressCard: React.FC<{ ebook: Ebook }> = ({ ebook }) => {
    const userId = useAnonymousUser();
    const [progress, setProgress] = useState<ProgressData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        // Fetch progress
        async function fetchProgress() {
            try {
                const res = await fetch(`/api/progress/${ebook.id}?userId=${userId}`);
                const data = await res.json();
                if (data.progress) {
                    setProgress(data.progress);
                }
            } catch (err) {
                console.error('Failed to fetch progress', err);
            } finally {
                setLoading(false);
            }
        }

        fetchProgress();
    }, [userId, ebook.id]);

    // Format time (seconds to m:ss or h:mm)
    const formatTime = (seconds: number) => {
        if (seconds < 60) return `${seconds}s`;
        const mins = Math.floor(seconds / 60);
        if (mins < 60) return `${mins}m`;
        const hrs = Math.floor(mins / 60);
        const remMins = mins % 60;
        return `${hrs}h ${remMins}m`;
    };

    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front relative flex flex-col">
                    <Image
                        src={ebook.logo}
                        alt={`${ebook.title} Logo`}
                        width={150}
                        height={150}
                        style={{ objectFit: 'contain' }}
                        className="mb-4"
                    />
                    <h3>{ebook.title}</h3>
                    <span className="category mb-4 block">{ebook.category}</span>

                    {/* Progress Summary on Front */}
                    {!loading && progress && (
                        <div className="mt-auto w-full px-4 mb-4">
                            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
                                <span>{progress.is_completed ? 'Completed' : 'In Progress'}</span>
                                <span>{Math.round(progress.scroll_position)}%</span>
                            </div>
                            <ProgressBar completed={progress.scroll_position} height="h-2" />
                        </div>
                    )}
                </div>

                <div className="flip-card-back relative">
                    <h3>{ebook.shortTitle}</h3>
                    <p>{ebook.description}</p>
                    <ul className="mb-4">
                        {ebook.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                        ))}
                    </ul>

                    {/* Detailed Stats on Back */}
                    {!loading && progress && (
                        <div className="bg-white/10 p-3 rounded-lg mb-4 text-sm w-full">
                            <div className="flex justify-between mb-1">
                                <span>Time Read:</span>
                                <span className="font-mono">{formatTime(progress.time_spent)}</span>
                            </div>
                            {progress.chapter_id && (
                                <div className="flex justify-between">
                                    <span>Current:</span>
                                    <span className="truncate max-w-[120px] ml-2" title={progress.chapter_id}>
                                        {progress.chapter_id}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <Link
                        href={ebook.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-btn"
                    >
                        {progress ? 'Continue Reading' : 'Start Reading'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EbookProgressCard;
