import "./BattleScreen.css";
import { useEffect, useState } from "react";

function BattleScreen() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isCatching, setIsCatching] = useState(false);
    const [shakeCount, setShakeCount] = useState(0);
    const [flashOn, setFlashOn] = useState(false);
    const labels = ["GitHub", "LinkedIn", "About"];
    const links = [
        "https://github.com/R1baszzZ",
        "https://www.linkedin.com/in/guilhermeribas23/",
        "/about"
    ];


    useEffect(() => {
        function handleKeyDown(e) {
            const key = e.key;
            
            if (!isCatching && (key === "ArrowLeft" || key === 'a' || key === 'A')) {
                setSelectedIndex((i) => Math.max(0, i-1));
            }  

            if (!isCatching && (key === "ArrowRight" || key === 'd' || key === 'D')) {
                setSelectedIndex((i) => Math.min(2, i+1));
            }

            if (key === "Enter" && !isCatching) {
                setIsCatching(true);
                setShakeCount(0);
                
            }
        
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown",  handleKeyDown);
    }, [isCatching]
    );

    useEffect(() => {
        if (!isCatching) return;

        if (shakeCount >= 3) {
            setFlashOn(true);

        const t1 = setTimeout(() => {
            if (selectedIndex === 2) {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

            setFlashOn(false);
            setIsCatching(false);
            setShakeCount(0);
            } else {
            window.location.href = links[selectedIndex];
            }
        }, 650);

        return () => clearTimeout(t1);
        }

        const timer = setTimeout(() => {
            setShakeCount((c) => c+1);
        }, 600);
        return () => clearTimeout(timer);
    }, [isCatching, shakeCount, selectedIndex])
    
    return (
        <main className="battle">
            <div className="battle__frame">
                <section className="battle__stage">
                    <div className="battle__trainer">Trainer</div>

                    <div className="battle__targets">
                        <div className={selectedIndex === 0 ? "target target--selected" : "target"}>
                            <div className="target__icon">GH</div>
                            <div className="target__label">GitHub</div>
                        </div>

                        <div className={selectedIndex === 1 ? "target target--selected" : "target"}>
                            <div className="target__icon">IN</div>
                            <div className="target__label">LinkedIn</div>
                        </div>
                        <div className={selectedIndex === 2 ? "target target--selected" : "target"}>
                            <div className="target__icon">ME</div>
                            <div className="target__label">About</div>
                        </div>
                    </div>
                </section>

                <section className="battle__hud">
                <div className="hud__box">
                    <div>{isCatching ? `Capturing ${labels[selectedIndex]}...` : `Choose your target: ${labels[selectedIndex]}`} </div>
                    <div className="hud__hint">←/→ to select · Enter to catch</div>
                </div>
                </section>
            </div>
            {flashOn && <div className="flash" />}
        </main>
    )
};

export default BattleScreen