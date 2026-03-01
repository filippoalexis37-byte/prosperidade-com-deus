import { useState, useCallback, useRef, useEffect } from "react";

interface UseTTSOptions {
  text: string;
  lang?: string;
  rate?: number;
}

export const useTTS = ({ text, lang = "pt-BR", rate: initialRate = 1 }: UseTTSOptions) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(initialRate);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);
  const pausedAtRef = useRef(0);

  // Estimate duration based on text length and rate
  const estimateDuration = useCallback((text: string, rate: number) => {
    // Average speaking rate: ~150 words per minute in Portuguese
    const words = text.split(/\s+/).length;
    return (words / 150) * 60 / rate;
  }, []);

  useEffect(() => {
    setDuration(estimateDuration(text, rate));
  }, [text, rate, estimateDuration]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback((fromTime: number) => {
    clearTimer();
    startTimeRef.current = Date.now() - fromTime * 1000;
    const dur = estimateDuration(text, rate);
    
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setCurrentTime(Math.min(elapsed, dur));
      setProgress(Math.min((elapsed / dur) * 100, 100));
    }, 200);
  }, [text, rate, clearTimer, estimateDuration]);

  const play = useCallback(() => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    clearTimer();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;

    // Try to find a Portuguese voice
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.startsWith("pt"));
    if (ptVoice) utterance.voice = ptVoice;

    utterance.onstart = () => {
      setIsPlaying(true);
      startTimer(0);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      setCurrentTime(estimateDuration(text, rate));
      clearTimer();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      clearTimer();
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [text, lang, rate, clearTimer, startTimer, estimateDuration]);

  const pause = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      pausedAtRef.current = currentTime;
      clearTimer();
    }
  }, [currentTime, clearTimer]);

  const resume = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      startTimer(pausedAtRef.current);
    }
  }, [startTimer]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else if (window.speechSynthesis.paused) {
      resume();
    } else {
      play();
    }
  }, [isPlaying, play, pause, resume]);

  const stop = useCallback(() => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    clearTimer();
  }, [clearTimer]);

  const changeRate = useCallback((newRate: number) => {
    setRate(newRate);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      clearTimer();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = newRate;

      const voices = window.speechSynthesis.getVoices();
      const ptVoice = voices.find(v => v.lang.startsWith("pt"));
      if (ptVoice) utterance.voice = ptVoice;

      utterance.onstart = () => {
        setIsPlaying(true);
        startTimer(0);
      };
      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
        clearTimer();
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        clearTimer();
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, [isPlaying, text, lang, clearTimer, startTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      clearTimer();
    };
  }, [clearTimer]);

  return {
    isPlaying,
    progress,
    currentTime,
    duration,
    rate,
    togglePlay,
    stop,
    changeRate,
    isSupported: "speechSynthesis" in window,
  };
};
