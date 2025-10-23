
import React from 'react';
import ParticleNetwork from './ParticleNetwork';

const App: React.FC = () => {
    // Inline styles for the complex background sheen effect, as it cannot be fully replicated with Tailwind utilities.
    const sheenBackgroundStyle: React.CSSProperties = {
        background: `linear-gradient(
            135deg,
            transparent 40%,
            rgba(255, 255, 255, 0.28) 48%,
            rgba(255, 255, 255, 0.56) 50%,
            rgba(255, 255, 255, 0.28) 52%,
            transparent 60%
        )`,
        backgroundSize: '250% 250%',
        WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='0' y='35' font-size='10' font-weight='700' fill='white' transform='rotate(-45 50 50)'%3ESHΞN™%3C/text%3E%3Ctext x='50' y='85' font-size='10' font-weight='700' fill='white' transform='rotate(-45 50 50)'%3ESHΞN™%3C/text%3E%3C/svg%3E")`,
        maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='0' y='35' font-size='10' font-weight='700' fill='white' transform='rotate(-45 50 50)'%3ESHΞN™%3C/text%3E%3Ctext x='50' y='85' font-size='10' font-weight='700' fill='white' transform='rotate(-45 50 50)'%3ESHΞN™%3C/text%3E%3C/svg%3E")`,
    };

    return (
        <main className="bg-[#121212] min-h-screen flex justify-center items-center p-2 sm:p-8 box-border overflow-hidden relative">
            <div
                className="fixed top-0 left-0 w-full h-full z-[-2] animate-random-sheen"
                style={sheenBackgroundStyle}
            ></div>

            <ParticleNetwork />

            <div className="relative w-full sm:w-[90%] max-w-[1200px] h-[90vh] sm:h-[80vh] rounded-[20px] z-10 p-[10px] bg-gradient-to-br from-[#8B0000] to-[#FF4136] shadow-[inset_3px_3px_8px_rgba(0,0,0,0.6),inset_-3px_-3px_8px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="absolute inset-[10px] bg-[#121212] rounded-[12px] z-0"></div>
                
                <div className="relative z-[1] w-full h-full bg-transparent rounded-[12px] flex flex-col overflow-hidden">
                    <iframe 
                        className="flex-grow w-full border-none block" 
                        src="https://wormai.vercel.app" 
                        title="Worm AI"
                        allow="clipboard-write">
                    </iframe>
                    <footer className="bg-transparent py-[0.85rem] text-center flex-shrink-0">
                        <a 
                            href="https://t.me/shervini" 
                            className="text-[1.1rem] font-medium no-underline bg-gradient-to-l from-[#8B0000] to-[#FF4136] bg-[400%_400%] bg-clip-text text-transparent animate-wave inline-block"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Exclusive SHΞN™ made
                        </a>
                    </footer>
                </div>
            </div>
        </main>
    );
};

export default App;