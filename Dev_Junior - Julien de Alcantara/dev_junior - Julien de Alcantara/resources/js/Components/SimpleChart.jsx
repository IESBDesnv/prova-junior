import { useState, useEffect } from 'react';

export default function SimpleChart({ data, type = 'bar', title, color = '#E91E63' }) {
    const [maxValue, setMaxValue] = useState(0);

    useEffect(() => {
        if (data && data.length > 0) {
            const max = Math.max(...data.map(item => item.value));
            setMaxValue(max);
        }
    }, [data]);

    if (!data || data.length === 0) {
        return (
            <div className="bg-white/50 rounded-2xl p-6 text-center">
                <p className="text-gray-500">Nenhum dado disponível</p>
            </div>
        );
    }

    return (
        <div className="bg-white/80 rounded-2xl p-6 shadow-lg border-2 border-primary/20">
            <h3 className="text-lg font-bold text-primary mb-4 text-center">{title}</h3>
            
            {type === 'bar' && (
                <div className="space-y-3">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                            <div className="w-20 text-sm font-medium text-gray-700 truncate">
                                {item.name}
                            </div>
                            <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                                <div 
                                    className="h-full rounded-full transition-all duration-1000 ease-out"
                                    style={{
                                        width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
                                        backgroundColor: color,
                                        background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`
                                    }}
                                >
                                    <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xs font-bold text-white drop-shadow-sm">
                                        {item.value}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {type === 'pie' && (
                <div className="flex flex-wrap justify-center gap-4">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: item.color || color }}
                            ></div>
                            <span className="text-sm font-medium text-gray-700">
                                {item.name}: {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {type === 'line' && (
                <div className="relative h-40">
                    <svg className="w-full h-full" viewBox="0 0 400 160">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={color} stopOpacity="0.8"/>
                                <stop offset="100%" stopColor={color} stopOpacity="0.3"/>
                            </linearGradient>
                        </defs>
                        <path
                            d={`M ${data.map((item, index) => 
                                `${index * (400 / (data.length - 1))},${160 - (item.value / maxValue) * 140}`
                            ).join(' L ')}`}
                            stroke={color}
                            strokeWidth="3"
                            fill="none"
                            className="drop-shadow-sm"
                        />
                        <path
                            d={`M ${data.map((item, index) => 
                                `${index * (400 / (data.length - 1))},${160 - (item.value / maxValue) * 140}`
                            ).join(' L ')} L 400,160 L 0,160 Z`}
                            fill="url(#lineGradient)"
                            opacity="0.3"
                        />
                        {data.map((item, index) => (
                            <circle
                                key={index}
                                cx={index * (400 / (data.length - 1))}
                                cy={160 - (item.value / maxValue) * 140}
                                r="4"
                                fill={color}
                                className="drop-shadow-sm"
                            />
                        ))}
                    </svg>
                </div>
            )}
        </div>
    );
}
