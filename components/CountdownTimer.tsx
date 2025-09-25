import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: { [key: string]: number } = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents: React.ReactElement[] = [];
    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval] && interval !== 'seconds' && Object.keys(timerComponents).length === 0) {
            return;
        }
        timerComponents.push(
            <div key={interval} className="text-center">
                <div className="font-mono text-lg font-bold">{String(timeLeft[interval]).padStart(2, '0')}</div>
                <div className="text-xs text-[var(--text-faint)] uppercase">{interval}</div>
            </div>
        );
    });
    
    return (
        <div className="flex gap-2 justify-center">
            {timerComponents.length ? timerComponents.slice(0,3).flatMap((component, index) => index > 0 ? [<span key={`sep-${index}`} className="text-lg">:</span>, component] : [component]) : <span className="text-lg font-bold text-[var(--error-border)]">Auction Ended</span>}
        </div>
    );
};

export default CountdownTimer;
