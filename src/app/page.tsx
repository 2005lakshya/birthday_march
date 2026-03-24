"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";
import confetti from "canvas-confetti";

const markers: GlobeMarker[] = [
  {
    lat: 20.5937,
    lng: 78.9629,
    src: "/harshita.jpeg"
  }
];

const globeConfig = {
  radius: 2.5,
  globeColor: "#000000",
  showAtmosphere: false,
  atmosphereIntensity: 0,
  enableZoom: false,
  enablePan: false,
  ambientIntensity: 0.9,
  pointLightIntensity: 2.5,
  dark: 1,
  baseColor: [0, 0, 0],
  glowColor: [1, 1, 1],
  markerColor: [1, 0, 0],
  autoRotateSpeed: 0.6
};

const Slider = ({ onComplete }: { onComplete: () => void }) => {
  const SLIDER_WIDTH = 300;
  const HANDLE_WIDTH = 50;
  const PADDING = 5;
  const DRAG_MAX = SLIDER_WIDTH - HANDLE_WIDTH - PADDING * 2;

  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, DRAG_MAX * 0.7], [1, 0]);
  const width = useTransform(x, [0, DRAG_MAX], ["0%", "100%"]);

  return (
    <div className="slider-container">
      <div className="slider-track">
        <motion.div style={{ width }} className="slider-fill" />
        <motion.span style={{ opacity }} className="slider-label">
          Hold & Slide to Reveal
        </motion.span>
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: DRAG_MAX }}
        dragElastic={0}
        dragMomentum={false}
        style={{ x }}
        onDragEnd={() => {
          if (x.get() > DRAG_MAX - 10) {
            onComplete();
          }
        }}
        className="slider-handle"
      >
        <div className="handle-icon">→</div>
      </motion.div>
    </div>
  );
};

const Bokeh = () => (
  <div className="bokeh-container">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="bokeh-orb"
        initial={{
          x: Math.random() * 100 + "%",
          y: Math.random() * 100 + "%",
          scale: 0,
          opacity: 0
        }}
        animate={{
          y: Math.random() * 100 + "%",
          scale: [0.5, 1.2, 0.8],
          opacity: [0.1, 0.4, 0.2]
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    ))}
  </div>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showBirthday, setShowBirthday] = useState(false);
  const [candlesOut, setCandlesOut] = useState(false);

  const handleComplete = () => {
    setShowBirthday(true);
    
    // Grand celebration burst
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleCakeClick = () => {
    setCandlesOut(!candlesOut);
    // Burst splash effect
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff007f', '#00d4ff', '#ffffff', '#ffd700']
    });
  };

  const codeText = `/**
 * Today, the 26th day of March, is your birthday.
 * So I created a webpage to celebrate this special day.
 */
Girl u = new Girl("Harshita");
// March 26th, when the bell rang, your age increased 
Date time = new Date(); 
SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String dateStr = fmt.format(time);
if( dateStr.equals("2026-03-26 00:00:00") ){
    u.age ++;
}
// My best wishes will be with you simultaneously.
new Thread (){
// Forever and ever. I wish
while(true){
    u.fortune ++;
    u.happiness ++;
}
}.start()
// The last thing I wanna say, boring and ordinary, is:
System.out.println("Happy Birthday Harshita!");`;

  useEffect(() => {
    setMounted(true);
    if (showBirthday) {
      let i = 0;
      const typingInterval = setInterval(() => {
        setTypedText(codeText.substring(0, i));
        i++;
        if (i > codeText.length) {
          clearInterval(typingInterval);
        }
      }, 50);
      return () => clearInterval(typingInterval);
    }
  }, [codeText, showBirthday]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {!showBirthday ? (
        <motion.main
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 1 }}
          className="intro-page"
        >
          <Bokeh />
          <div className="intro-content">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="intro-text"
            >
              I have something secret to show you...
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <Slider onComplete={handleComplete} />
            </motion.div>
          </div>
        </motion.main>
      ) : (
        <motion.main
          key="birthday"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="page"
        >
          <header className="header">
            <h1>
              Happy Birthday Harshita
              <span 
                className={`cake-animate ${candlesOut ? 'candles-out' : ''}`} 
                aria-label="cake" 
                style={{ display: 'inline-block', marginLeft: '12px', verticalAlign: 'middle', cursor: 'pointer' }}
                onClick={handleCakeClick}
              >
                <svg width="42" height="42" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Plate */}
                  <ellipse cx="30" cy="56" rx="22" ry="4" fill="#666"/>
                  {/* Bottom Layer */}
                  <rect x="10" y="38" width="40" height="12" rx="6" fill="#ffb347"/>
                  <rect x="10" y="38" width="40" height="6" rx="6" fill="#ffe0b2"/>
                  {/* Middle Layer */}
                  <rect x="16" y="28" width="28" height="12" rx="6" fill="#ff69b4"/>
                  <rect x="16" y="28" width="28" height="6" rx="6" fill="#fff3e0"/>
                  {/* Top Layer */}
                  <rect x="22" y="20" width="16" height="10" rx="5" fill="#7ed6df"/>
                  <rect x="22" y="20" width="16" height="5" rx="5" fill="#fff3e0"/>
                  {/* Candles */}
                  <rect x="26" y="14" width="2" height="8" rx="1" fill="#ffe066"/>
                  <rect x="30" y="12" width="2" height="10" rx="1" fill="#ffe066"/>
                  <rect x="34" y="14" width="2" height="8" rx="1" fill="#ffe066"/>
                  {/* Candle Flames */}
                  <ellipse className="cake-flame" cx="27" cy="14" rx="1" ry="2" fill="#ffbe76"/>
                  <ellipse className="cake-flame" cx="31" cy="12" rx="1" ry="2" fill="#ffbe76"/>
                  <ellipse className="cake-flame" cx="35" cy="14" rx="1" ry="2" fill="#ffbe76"/>
                  {/* Sparkles */}
                  <circle className="cake-sparkle" cx="18" cy="24" r="1.2" fill="#fff200"/>
                  <circle className="cake-sparkle" cx="42" cy="22" r="1.2" fill="#fff200"/>
                  <circle className="cake-sparkle" cx="30" cy="18" r="1.2" fill="#fff200"/>
                  <circle className="cake-sparkle" cx="24" cy="34" r="1" fill="#00c3ff"/>
                  <circle className="cake-sparkle" cx="36" cy="36" r="1" fill="#ff5252"/>
                </svg>
              </span>
            </h1>
          </header>

          <section className="code-side">
            <pre className="code-text" dangerouslySetInnerHTML={{ __html: syntaxHighlight(typedText) }} />
          </section>

          <section className="globe-side">
            <Globe3D
              markers={markers}
              config={globeConfig}
              className="w-full h-full bg-transparent"
            />
          </section>

          <div className="copyright">
            <hr />
            <p>Made with love by <a href="#" target="_blank" rel="noopener noreferrer">Lakshya</a></p>
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
}

// Robust syntax highlighting to prevent overlapping tags
function syntaxHighlight(code: string) {
  if (!code) return "";
  let result = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Highlight comments
  result = result.replace(/(\/\*\*[\s\S]*?\*\/|\/\/.*)/g, '<span class="comments">$1</span>');

  // Highlight strings
  result = result.replace(/("[^"]*")/g, '<span class="string">$1</span>');

  // Highlight keywords NOT inside tags
  const keywords = ["new", "if", "while", "Thread", "Override", "true", "Date", "SimpleDateFormat", "String", "System", "out", "println"];
  const keywordRegex = new RegExp(`\\b(${keywords.join("|")})\\b(?![^<]*>)`, "g");
  result = result.replace(keywordRegex, '<span class="keyword">$1</span>');

  return result;
}
