"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

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
  autoRotateSpeed: 0.5
};

const Slider = ({ onComplete }: { onComplete: () => void }) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 200], [1, 0]);
  const width = useTransform(x, [0, 195], ["0%", "100%"]); // Matches mobile better

  return (
    <div className="slider-container">
      <div className="slider-track">
        <motion.div style={{ width }} className="slider-fill" />
        <motion.span style={{ opacity }} className="slider-label">
          Slide to Reveal
        </motion.span>
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 195 }} // More conservative to fit all screens
        dragElastic={0}
        dragMomentum={false}
        style={{ x }}
        onDragEnd={() => {
          if (x.get() > 180) {
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

  const handleComplete = () => {
    setShowBirthday(true);
  };

  const codeText = `/**
 * Today, the 24th day of March, is your birthday.
 * So I created a webpage to celebrate this special day.
 */
Girl u = new Girl("Harshita");
// March 24th, when the bell rang, your age increased 
Date time = new Date(); 
SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String dateStr = fmt.format(time);
if( dateStr.equals("2026-03-24 00:00:00") ){
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
            <h1 className="header-mobile-wrap">
              <span>Happy Birthday </span>
              <span className="name-line">Harshita</span>
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
