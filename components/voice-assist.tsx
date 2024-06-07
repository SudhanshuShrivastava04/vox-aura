"use client";

import React, { useEffect, useRef } from "react";

const VoiceAssistant = () => {
  const contentRef = useRef<HTMLHeadingElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const speak = (text: string) => {
    const textSpeak = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();

    const femaleVoice = voices.find((voice) => voice.name === "Google हिन्दी");

    if (femaleVoice) {
      textSpeak.voice = femaleVoice;
    } else {
      console.warn("Female voice not found, using default voice.");
    }

    textSpeak.rate = 1;
    textSpeak.volume = 1;
    textSpeak.pitch = 1;

    window.speechSynthesis.speak(textSpeak);
  };

  const wishMe = () => {
    const day = new Date();
    const hour = day.getHours();
    if (hour >= 0 && hour < 12) {
      speak("Good Morning! Have a nice day.");
    } else if (hour >= 12 && hour < 17) {
      speak("Good Afternoon! How's it going?");
    } else {
      speak("Good Evening! Time to relax.");
    }
  };

  const takeCommand = (message: string) => {
    if (message.includes("wish me")) {
      wishMe();
    } else if (message.includes("hey") || message.includes("hello")) {
      speak("Hello! How may I help you?");
    } else if (message.includes("open google")) {
      window.open("https://google.com", "_blank");
      speak("Opening Google...");
    } else if (message.includes("open youtube")) {
      window.open("https://youtube.com", "_blank");
      speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
      window.open("https://facebook.com", "_blank");
      speak("Opening Facebook...");
    } else if (
      message.includes("what is") ||
      message.includes("who is") ||
      message.includes("what are")
    ) {
      window.open(
        `https://www.google.com/search?q=${message.replace(" ", "+")}`,
        "_blank"
      );
      const finalText =
        "This is what I found on the internet regarding " + message;
      speak(finalText);
    } else if (message.includes("wikipedia")) {
      window.open(
        `https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`,
        "_blank"
      );
      const finalText =
        "This is what I found on Wikipedia regarding " + message;
      speak(finalText);
    } else if (message.includes("time")) {
      const time = new Date().toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak("The current time is " + time);
    } else if (message.includes("date")) {
      const date = new Date().toLocaleString(undefined, {
        month: "short",
        day: "numeric",
      });
      speak("Today's date is " + date);
    } else if (message.includes("calculator")) {
      window.open("Calculator:///");
      speak("Opening Calculator");
    } else if (message.includes("weather")) {
      window.open("https://weather.com", "_blank");
      speak("Opening Weather information...");
    } else if (message.includes("play music")) {
      window.open("https://spotify.com", "_blank");
      speak("Playing music on Spotify...");
    } else {
      window.open(
        `https://www.google.com/search?q=${message.replace(" ", "+")}`,
        "_blank"
      );
      speak("I found some information for " + message + " on Google");
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const currentIndex = event.resultIndex;
      const transcript = event.results[currentIndex][0].transcript;
      if (contentRef.current) {
        contentRef.current.textContent = transcript;
      }
      takeCommand(transcript.toLowerCase());
    };

    window.addEventListener("load", () => {
      speak("Initializing JARVIS..");
      wishMe();
    });

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (contentRef.current) {
      contentRef.current.textContent = "Listening...";
    }
    recognitionRef.current?.start();
  };

  return (
    <div className="flex justify-center items-center gap-2 flex-col">
      <button
        className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] hover:scale-105 transition duration-200 focus:scale-90"
        onClick={startListening}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6366f1_0%,#393BB2_50%,#0ea5e9_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Click Here to Talk
        </span>
      </button>
      <h1
        className="text-xl font-bold text-center text-white relative z-20"
        ref={contentRef}
      >
        Click here to speak
      </h1>
    </div>
  );
};

export default VoiceAssistant;
