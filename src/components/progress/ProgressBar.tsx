import React from 'react';

interface ProgressBarProps {
    completed: number; // 0 to 100
    total?: number; // default 100
    color?: string;
    height?: string;
    className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    completed,
    total = 100,
    color = 'bg-blue-600',
    height = 'h-2.5',
    className = ''
}) => {
    const percentage = Math.min(100, Math.max(0, (completed / total) * 100));

    return (
        <div className={`w-full bg-gray-200 rounded-full dark:bg-gray-700 ${height} ${className}`}>
            <div
                className={`${color} ${height} rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${percentage}%` }}
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
            ></div>
        </div>
    );
};

export default ProgressBar;
