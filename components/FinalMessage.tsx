import React, { useState, useEffect, useRef } from 'react';
import { FINAL_MESSAGES_DATA } from '../constants';

export const FinalMessage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step < FINAL_MESSAGES_DATA.length) {
      const fullText = FINAL_MESSAGES_DATA[step].text;
      setDisplayedText('');
      setIsTyping(true);

      // Split by whitespace but capture delimiters to preserve newlines and spaces
      // 'Hello\nWorld' -> ['Hello', '\n', 'World']
      const parts = fullText.split(/(\s+)/);
      let index = 0;
      
      const interval = setInterval(() => {
        if (index < parts.length) {
          setDisplayedText(prev => prev + parts[index]);
          index++;
          
          // Auto scroll to bottom as text generates
          if (textContainerRef.current) {
             textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
          }
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 150); // Slow word-by-word speed

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const isLastStep = step === FINAL_MESSAGES_DATA.length - 1;

  return (
    <div className="bg-white/95 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl max-w-2xl w-[95%] text-center border-4 border-[#FF6B6B]/20 min-h-[500px] flex flex-col relative overflow-hidden">
       
       <div 
         ref={textContainerRef}
         className="flex-grow flex flex-col justify-center items-center overflow-y-auto mb-8"
       >
         <div className={`whitespace-pre-wrap font-['Poppins'] text-lg md:text-xl leading-loose text-gray-800 transition-colors duration-500 ${step === 1 ? 'font-serif text-[#d63031]' : ''}`}>
           {displayedText}
           {isTyping && <span className="animate-pulse ml-1 text-[#FF6B6B]">|</span>}
         </div>
       </div>

       <div className="flex-shrink-0 h-24 flex flex-col items-center justify-center">
         {!isTyping && (
            <div className="animate-bounce-in w-full">
               {!isLastStep ? (
                  <button 
                    onClick={handleNext} 
                    className="bg-[#FF6B6B] hover:bg-[#ff5252] text-white px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 font-bold text-lg"
                  >
                     Continue ❤️
                  </button>
               ) : (
                  <div className="flex flex-col items-center animate-fade-in w-full">
                       <button 
                          onClick={() => window.location.reload()} 
                          className="text-[#FF6B6B] font-semibold hover:underline mb-6"
                       >
                          Replay Experience ↺
                       </button>
                       
                       <div className="w-full border-t border-gray-200 pt-4">
                         <p className="text-[10px] md:text-xs text-gray-400 font-mono">
                            Made with ❤️ at #216 | Supported by GPT & Google AI Studio
                         </p>
                       </div>
                  </div>
               )}
            </div>
         )}
       </div>
    </div>
  );
};
