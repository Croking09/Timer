import { useState, useEffect } from 'react';

const Timer = ({limitDate}) => {
    const calculateTimeLeft = () => {
        let diff = limitDate - new Date();
        let timeLeft = {};

        if (diff >= 1000) {
            timeLeft.days = Math.floor(diff / (1000 * 60 * 60 * 24));
            timeLeft.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            timeLeft.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            timeLeft.seconds = Math.floor((diff % (1000 * 60)) / 1000);
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        });

        return () => clearInterval(interval);
    }, [limitDate]);

    return (
        <div className="flex">
            <div className="relative bg-white p-16 rounded-2xl shadow-lg text-center">
                {Object.keys(timeLeft).length > 0 ? (
                    <div>
                        <div className="relative z-10">
                            <p className="text-lg font-semibold font-mono">
                                {String(timeLeft.hours).padStart(2, '0')}:
                                {String(timeLeft.minutes).padStart(2, '0')}:
                                {String(timeLeft.seconds).padStart(2, '0')}
                            </p>
                        </div>

                        <div className="absolute inset-0 flex items-center z-0">
                            <span className="text-9xl font-bold text-gray-800 opacity-20 pb-3">
                                {String(timeLeft.days).padStart(2, '0')}
                            </span>
                            <span className="text-2xl font-bold text-gray-800 opacity-20" style={{ transform: 'rotate(-90deg)' }}>
                                days
                            </span>
                        </div>
                    </div>
                ) : (
                    <p className="text-lg font-semibold text-red-500 z-10 relative">Time is up!</p>
                )}
            </div>
        </div>
    );
}

export default Timer;
