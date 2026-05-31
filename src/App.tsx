import React, { useState, useRef, useEffect } from "react";
import { 
  Home, 
  BookOpen, 
  Sparkles, 
  PhoneCall, 
  Menu, 
  Volume2, 
  Mic, 
  MicOff, 
  CheckCircle, 
  Lock, 
  Send, 
  ArrowLeft, 
  Languages, 
  User, 
  HelpCircle, 
  History, 
  Compass, 
  Check, 
  MessageSquare,
  Award,
  ChevronRight,
  BookMarked,
  Gamepad2,
  PlayCircle,
  Lightbulb,
  AlertCircle,
  Smartphone,
  ShieldCheck,
  Zap,
  CheckSquare,
  VolumeX,
  Pause,
  Play,
  RotateCcw,
  UserCheck,
  SmartphoneIcon,
  Flame,
  Plus,
  RefreshCw,
  Trash2,
  Bell,
  Wifi,
  Database,
  Unlock
} from "lucide-react";
import { TOPICS as initialTopics, THEMES, QUOTES } from "./data";
import { Topic, Message, TranslationResult } from "./types";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";

// Safe fallback image component to prevent broken Unsplash images from showing as broken resource icons
function SafeImage({ 
  src, 
  alt, 
  className, 
  fallbackText,
  gradientFrom, 
  gradientTo,
  ...props 
}: React.ImgHTMLAttributes<HTMLImageElement> & { 
  fallbackText?: string;
  gradientFrom?: string;
  gradientTo?: string;
}) {
  const [hasError, setHasError] = useState(false);

  // Reset error state when the src changes (critical for component reuse/recycling)
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const getPlaceholderConfig = (text: string) => {
    const norm = (text || "").toLowerCase();
    
    if (norm.includes("interview") || norm.includes("job") || norm.includes("tough") || norm.includes("college") || norm.includes("professor") || norm.includes("admission") || norm.includes("professional")) {
      return {
        gradient: "from-blue-600 to-indigo-700",
        emoji: "💼",
        sub: "INTERVIEW PRO"
      };
    }
    if (norm.includes("workspace") || norm.includes("work") || norm.includes("co-worker") || norm.includes("meeting") || norm.includes("office") || norm.includes("team") || norm.includes("feedback") || norm.includes("business") || norm.includes("corporate")) {
      return {
        gradient: "from-indigo-600 to-violet-800",
        emoji: "👥",
        sub: "WORKPLACE"
      };
    }
    if (norm.includes("introduce") || norm.includes("self") || norm.includes("routine") || norm.includes("education") || norm.includes("routine") || norm.includes("academic") || norm.includes("learn") || norm.includes("stud")) {
      return {
        gradient: "from-emerald-500 to-teal-600",
        emoji: "🎓",
        sub: "ABOUT YOURSELF"
      };
    }
    if (norm.includes("friend") || norm.includes("routine") || norm.includes("casual") || norm.includes("routine") || norm.includes("speak") || norm.includes("vocabulary") || norm.includes("pronun")) {
      return {
        gradient: "from-emerald-500 to-teal-600",
        emoji: "✨",
        sub: "FLUENCY"
      };
    }
    if (norm.includes("dinner") || norm.includes("family") || norm.includes("weekend") || norm.includes("airport") || norm.includes("attendant") || norm.includes("city") || norm.includes("hotel") || norm.includes("doctor") || norm.includes("shopping") || norm.includes("phone")) {
      return {
        gradient: "from-rose-500 to-orange-500",
        emoji: "🏡",
        sub: "DAILY LIFE"
      };
    }
    if (norm.includes("bank") || norm.includes("hdfc") || norm.includes("finan") || norm.includes("money")) {
      return {
        gradient: "from-sky-500 to-indigo-600",
        emoji: "🏦",
        sub: "BANKING"
      };
    }
    if (norm.includes("goat") || norm.includes("sheep") || norm.includes("bakrid") || norm.includes("fest")) {
      return {
        gradient: "from-amber-500 to-amber-600",
        emoji: "🐐",
        sub: "FESTIVAL"
      };
    }
    if (norm.includes("byju") || norm.includes("brand") || norm.includes("tech") || norm.includes("educat")) {
      return {
        gradient: "from-purple-500 to-red-600",
        emoji: "📱",
        sub: "EDTECH"
      };
    }
    if (norm.includes("nestle") || norm.includes("happi") || norm.includes("well") || norm.includes("employee")) {
      return {
        gradient: "from-emerald-400 to-cyan-500",
        emoji: "🍫",
        sub: "CORPORATE"
      };
    }
    
    // Default general fallback
    return {
      gradient: "from-indigo-500 to-purple-600",
      emoji: "🎙️",
      sub: "COACH VANI"
    };
  };

  const config = getPlaceholderConfig(fallbackText || alt || "");
  const appliedGradient = (gradientFrom && gradientTo) ? `from-${gradientFrom} to-${gradientTo}` : config.gradient;

  if (hasError || !src) {
    return (
      <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br ${appliedGradient} text-white select-none overflow-hidden ${className || ""}`}>
        {/* Decorative concentric glowing rings or abstract grids */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5 border border-white/10 pointer-events-none" />
        <div className="absolute -left-6 -top-6 w-20 h-20 rounded-full bg-white/5 border border-white/10 pointer-events-none" />
        
        {/* Centered themed layout */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-2">
          <span className="text-2xl filter drop-shadow-sm mb-1 transform hover:scale-110 transition duration-300">{config.emoji}</span>
          <span className="text-[7.5px] text-white/90 font-black uppercase tracking-widest leading-none bg-black/10 px-1.5 py-0.5 rounded-full border border-white/10">{config.sub}</span>
          <span className="text-[9.5px] font-extrabold text-white mt-1 px-2 line-clamp-1 truncate max-w-full leading-tight">{fallbackText || alt || "Practice"}</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => {
        console.warn("Image load failed, showing beautiful placeholder:", alt);
        setHasError(true);
      }}
      {...props}
    />
  );
}

// --- VANI Translation block component ---
interface TranslationBlockProps {
  text: string | null;
  loading?: boolean;
}

function TranslationBlock({ text, loading }: TranslationBlockProps) {
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleListen = () => {
    if (!text) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-IN";
    u.rate = 0.85;
    u.onend = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    setSpeaking(true);
  };

  const baseClassName = "self-end max-w-[82%] bg-[#F3E8FF] border-l-4 border-[#8B2FC9] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl p-4.5 mt-2 mb-3 shadow-xs text-left";

  // LOADING STATE — shimmer skeleton
  if (loading) {
    return (
      <div className={baseClassName}>
        <style>{`
          @keyframes shimmerAnimation {
            0% { opacity: 0.4; }
            50% { opacity: 0.85; }
            100% { opacity: 0.4; }
          }
        `}</style>
        <div className="text-[10px] md:text-[11px] font-extrabold tracking-wider text-[#8B2FC9] uppercase mb-2">
          🔤 IN ENGLISH
        </div>
        <div 
          className="h-3.5 bg-[#8B2FC9]/15 rounded-lg w-[70%]"
          style={{ animation: "shimmerAnimation 1.2s ease infinite" }}
        />
        <div 
          className="h-3.5 bg-[#8B2FC9]/10 rounded-lg w-[45%] mt-1.5"
          style={{ animation: "shimmerAnimation 1.2s ease infinite" }}
        />
      </div>
    );
  }

  // LOADED STATE — full beautiful card
  return (
    <div 
      className={baseClassName}
      style={{
        animation: "fadeSlideUp 0.35s ease forwards"
      }}
    >
      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="text-[10px] md:text-[11px] font-extrabold tracking-wider text-[#8B2FC9] uppercase mb-1.5">
        🔤 IN ENGLISH
      </div>

      <div className="h-[1px] bg-[#8B2FC9]/15 mb-2.5" />

      <div className="text-[18px] md:text-[20px] font-bold text-[#1A1A1A] leading-relaxed mb-3">
        {text}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={handleCopy} 
          style={{
            background: copied ? "rgba(76,175,80,0.15)" : "#EEEEEE",
            border: "none",
            borderRadius: "14px",
            padding: "5px 12px",
            fontSize: "12px",
            fontWeight: 600,
            color: copied ? "#4CAF50" : "#333",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          {copied ? "✓ Copied!" : "📋 Copy"}
        </button>

        <button
          onClick={handleListen}
          style={{
            background: speaking ? "rgba(139,47,201,0.25)" : "rgba(139,47,201,0.12)",
            border: "none",
            borderRadius: "14px",
            padding: "5px 12px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#8B2FC9",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          {speaking ? "⏹ Stop" : "🔊 Listen"}
        </button>
      </div>
    </div>
  );
}

// --- Ambient Music Synthesizer Class (Web Audio API) ---
class AmbientMusicManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscs: OscillatorNode[] = [];
  private gains: GainNode[] = [];
  private trackType: 'lofi' | 'bengali' | 'celestial' = 'lofi';
  private loopInterval: any = null;

  constructor() {}

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.20, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.startLoop();
    } catch (e) {
      console.warn("Web Audio API not fully initialized or supported on this system.", e);
    }
  }

  public setTrackType(track: 'lofi' | 'bengali' | 'celestial') {
    this.trackType = track;
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    // instantly play updated track chord
    this.playChord();
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.5);
    }
  }

  public playChord() {
    if (!this.ctx || !this.masterGain) return;
    
    // warm Indian frequencies (Santoor pentatonic raga cluster) vs lofi vs celestial
    let notes = [130.81, 164.81, 196.00, 246.94, 293.66]; // Lo-fi (C Major 7/9)
    
    if (this.trackType === 'bengali') {
      // mystic peaceful Bengali Baul / Santoor vibe drone
      notes = [138.59, 174.61, 196.00, 207.65, 277.18]; // peaceful F minor raga stack
    } else if (this.trackType === 'celestial') {
      notes = [146.83, 174.61, 220.00, 293.66, 349.23]; // D minor atmospheric pad
    }

    // fade out older oscillators
    this.oscs.forEach(o => { try { o.stop(); } catch(e){} });
    this.oscs = [];

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      
      osc.type = this.trackType === 'bengali' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // detune a bit for warmth
      osc.detune.setValueAtTime((Math.random() - 0.5) * 12, this.ctx.currentTime);

      gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      const targetGain = 0.05 - (idx * 0.007);
      gainNode.gain.linearRampToValueAtTime(Math.max(0.005, targetGain), this.ctx.currentTime + 1.0 + Math.random());
      
      // sustain
      gainNode.gain.setValueAtTime(Math.max(0.005, targetGain), this.ctx.currentTime + 4.0);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 5.5 + Math.random());

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);
      
      osc.start();
      this.oscs.push(osc);
    });
  }

  private startLoop() {
    this.playChord();
    this.loopInterval = setInterval(() => {
      this.playChord();
    }, 5500);
  }

  public cleanup() {
    if (this.loopInterval) clearInterval(this.loopInterval);
    this.oscs.forEach(o => { try { o.stop(); } catch(e){} });
    this.oscs = [];
    if (this.ctx) {
      try { this.ctx.close(); } catch(e){}
      this.ctx = null;
    }
  }
}

const INDIAN_LANGUAGES = [
  { code: "Bengali", name: "Bengali (বাংলা / Benglish)", flag: "🇧🇩" },
  { code: "Hindi", name: "Hindi (हिंदी / Hinglish)", flag: "🇮🇳" },
  { code: "Telugu", name: "Telugu (తెలుగు)", flag: "🇮🇳" },
  { code: "Tamil", name: "Tamil (தமிழ்)", flag: "🇮🇳" },
  { code: "Marathi", name: "Marathi (मराठी)", flag: "🇮🇳" },
  { code: "Urdu", name: "Urdu (اردו)", flag: "🇮🇳" },
  { code: "Gujarati", name: "Gujarati (ગુજરાતી)", flag: "🇮🇳" },
  { code: "Kannada", name: "Kannada (ಕನ್ನಡ)", flag: "🇮🇳" },
  { code: "Malayalam", name: "Malayalam (മലയാളം)", flag: "🇮🇳" },
  { code: "Punjabi", name: "Punjabi (ਪੰਜਾਬী)", flag: "🇮🇳" }
];

const getLangSpeechCode = (langCode: string): string => {
  switch (langCode) {
    case "Hindi": return "hi-IN";
    case "Bengali": return "bn-IN";
    case "Telugu": return "te-IN";
    case "Tamil": return "ta-IN";
    case "Marathi": return "mr-IN";
    case "Urdu": return "ur-IN";
    case "Gujarati": return "gu-IN";
    case "Kannada": return "kn-IN";
    case "Malayalam": return "ml-IN";
    case "Punjabi": return "pa-IN";
    default: return "hi-IN";
  }
};
export default function App() {
  const [appStage, setAppStage] = useState<string>(() => {
    return localStorage.getItem("vani_opening_completed") === "true" ? "app" : "splash";
  });
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loginOtpSent, setLoginOtpSent] = useState<boolean>(false);
  const [otpValue, setOtpValue] = useState<string>("");

  // Screens: "onboarding", "home", "topics", "translate", "call", "chat"
  const [screen, setScreen] = useState<string>(() => {
    const plan = localStorage.getItem("userPlan") || localStorage.getItem("vani_user_plan") || "none";
    const completedOnboarding = localStorage.getItem("vani_onboarding_completed") === "true";
    return (plan !== "none" || completedOnboarding) ? "home" : "onboarding";
  });
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [translatorOpen, setTranslatorOpen] = useState<boolean>(false);
  const [onboardingGoal, setOnboardingGoal] = useState<string>("interview");
  
  // Advanced States & VANI Engine Configurations
  const [userName, setUserName] = useState<string>("Learner");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  
  // Subscription tier root state variables
  const [userPlan, setUserPlan] = useState<string>(() => {
    return localStorage.getItem("userPlan") || localStorage.getItem("vani_user_plan") || "none";
  });
  const [trialDaysLeft, setTrialDaysLeft] = useState<number>(() => {
    const saved = localStorage.getItem("vani_trial_days_left") || localStorage.getItem("trialDaysLeft");
    return saved ? parseInt(saved, 10) : 7;
  });
  const [trialStartDate, setTrialStartDate] = useState<number | null>(() => {
    const saved = localStorage.getItem("vani_trial_start_date") || localStorage.getItem("trialStartDate");
    return saved ? parseInt(saved, 10) : null;
  });
  const [trialExpired, setTrialExpired] = useState<boolean>(() => {
    return localStorage.getItem("vani_trial_expired") === "true" || localStorage.getItem("trialExpired") === "true";
  });
  const [sessionMsgCount, setSessionMsgCount] = useState<number>(0);

  // Subscription Gate System states
  const [gateMode, setGateMode] = useState<"splash" | "onboarding" | "trial_expired" | "plan_expired" | "none">("splash");
  const [onboardingPage, setOnboardingPage] = useState<number>(1);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<{ key: string; price: string; name: string } | null>(null);
  const [showPayModal, setShowPayModal] = useState<boolean>(false);
  const [payProcessing, setPayProcessing] = useState<boolean>(false);
  const [showPaySuccess, setShowPaySuccess] = useState<boolean>(false);
  const [trialSessionsCount, setTrialSessionsCount] = useState<number>(() => {
    const saved = localStorage.getItem("trialSessionsCount");
    return saved ? parseInt(saved, 10) : 4;
  });
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [showPrivacy, setShowPrivacy] = useState<boolean>(false);
  const [showAccessibility, setShowAccessibility] = useState<boolean>(false);

  // Access gate functions
  function canAccess(topicIndex: number) {
    if (userPlan === "premium" || userPlan === "promaster" || userPlan === "pro" || userPlan === "monthly") return true;
    if (userPlan === "trial" && !trialExpired) return topicIndex === 0;
    return false;
  }

  function canUseVoiceStation() {
    return userPlan === "monthly" ||
           userPlan === "premium" ||
           userPlan === "promaster" ||
           userPlan === "pro";
  }

  function canSendMessage() {
    if (userPlan === "premium" ||
        userPlan === "promaster" ||
        userPlan === "monthly" ||
        userPlan === "pro") return true;
    if (userPlan === "trial" && !trialExpired)
      return sessionMsgCount < 5;
    return false;
  }

  useEffect(() => {
    if (appStage === "splash") {
      const t = setTimeout(() => {
        setAppStage("opening");
      }, 2800);
      return () => clearTimeout(t);
    }
  }, [appStage]);

  // Auto launch flow hook
  useEffect(() => {
    // Increment session count on launch if in trial mode
    if (localStorage.getItem("userPlan") === "trial") {
      const currentSessions = parseInt(localStorage.getItem("trialSessionsCount") || "4", 10);
      localStorage.setItem("trialSessionsCount", String(currentSessions + 1));
      setTrialSessionsCount(currentSessions + 1);
    }

    const timer = setTimeout(() => {
      const plan = localStorage.getItem("userPlan") || localStorage.getItem("vani_user_plan") || "none";
      const startDate = localStorage.getItem("trialStartDate") || localStorage.getItem("vani_trial_start_date");
      const expiry = localStorage.getItem("planExpiry") || localStorage.getItem("vani_plan_expiry");

      if (!plan || plan === "none") {
        setGateMode("none");
        return;
      }

      if (plan === "trial") {
        if (!startDate) {
          setGateMode("none");
          return;
        }
        const ms = Date.now() - parseInt(startDate, 10);
        const days = ms / (1000 * 60 * 60 * 24);

        if (days >= 7) {
          localStorage.setItem("trialExpired", "true");
          localStorage.setItem("vani_trial_expired", "true");
          setTrialExpired(true);
          setGateMode("trial_expired");
        } else {
          const daysLeft = Math.ceil(7 - days);
          setUserPlan("trial");
          setTrialDaysLeft(daysLeft);
          setTrialExpired(false);
          setGateMode("none");
        }
        return;
      }

      if (plan === "monthly" || plan === "premium" || plan === "promaster" || plan === "pro") {
        if (!expiry) {
          setGateMode("none");
          return;
        }
        const now = Date.now();
        if (now > parseInt(expiry, 10)) {
          setGateMode("plan_expired");
        } else {
          setUserPlan(plan);
          setGateMode("none");
        }
        return;
      }

      setGateMode("none");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Auto synchronizations for persistent local storage & backward compatibility
  useEffect(() => {
    localStorage.setItem("userPlan", userPlan);
    localStorage.setItem("vani_user_plan", userPlan);
    setIsPremium(userPlan === "premium" || userPlan === "pro" || userPlan === "promaster");
    setActivePlan(userPlan === "promaster" ? "pro" : userPlan === "pro" ? "pro" : userPlan === "premium" ? "premium" : userPlan === "monthly" ? "basic" : "none" as any);
  }, [userPlan]);

  useEffect(() => {
    localStorage.setItem("vani_trial_days_left", String(trialDaysLeft));
  }, [trialDaysLeft]);

  useEffect(() => {
    if (trialStartDate !== null) {
      localStorage.setItem("vani_trial_start_date", String(trialStartDate));
    } else {
      localStorage.removeItem("vani_trial_start_date");
    }
  }, [trialStartDate]);

  useEffect(() => {
    localStorage.setItem("vani_trial_expired", String(trialExpired));
  }, [trialExpired]);

  // Trial expiry check on every app open & Web Speech API pre-load optimization
  useEffect(() => {
    if (trialStartDate && userPlan === "trial") {
      const ms = Date.now() - trialStartDate;
      const days = ms / (1000 * 60 * 60 * 24);
      if (days >= 7) {
        setTrialExpired(true);
      }
    }

    // Pre-trigger Web Speech API voice loading so speech generation is purely instantaneous
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      const onVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
      };
    }
  }, []);

  const [trialTimeLeft, setTrialTimeLeft] = useState<number>(604799); // 7 days in seconds
  const [streak, setStreak] = useState<number>(6);
  const [xp, setXp] = useState<number>(420);
  const [dailyGoalMins, setDailyGoalMins] = useState<number>(15);
  const [dailyGoalDone, setDailyGoalDone] = useState<number>(4);

  const [activeToast, setActiveToast] = useState<{ message: string; subMessage?: string; type: 'success' | 'info' | 'streak' } | null>(null);

  const showToast = (message: string, subMessage?: string, type: 'success' | 'info' | 'streak' = 'info') => {
    setActiveToast({ message, subMessage, type });
  };

  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  const celebrateStreak = (customType?: 'side-cannons' | 'burst') => {
    if (customType === 'side-cannons') {
      try {
        const end = Date.now() + 1200;
        const colors = ['#f43f5e', '#10b981', '#fbbf24', '#3b82f6', '#ec4899'];
        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: colors
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: colors
          });
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      } catch (e) {}
    } else {
      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.75 }
        });
      } catch (e) {}
    }
  };

  const handleProgressStreak = () => {
    const isAlreadyReached = dailyGoalDone >= dailyGoalMins;
    const newMins = Math.min(dailyGoalMins, dailyGoalDone + 1);
    setDailyGoalDone(newMins);
    setStreak(prev => prev + 1);
    setXp(prev => prev + 20);

    if (newMins >= dailyGoalMins && !isAlreadyReached) {
      celebrateStreak('side-cannons');
      showToast("🏆 Daily Practice Goal Reached!", "You completed 15 mins! Special +100 XP unlocked!", "success");
      setXp(prev => prev + 100);
      playTTS("Amazing work! You've successfully hit your daily learning goal. Keep up this magnificent streak!", 4099);
    } else {
      celebrateStreak('burst');
      showToast("🔥 Daily Streak Advanced!", `Active streak: ${streak + 1} Days • ${newMins}/${dailyGoalMins} mins done! (+20 XP)`, "streak");
    }
  };
  const [musicSelected, setMusicSelected] = useState<'lofi' | 'bengali' | 'celestial' | 'off'>('off');
  const [emotionalTone, setEmotionalTone] = useState<'warm' | 'energetic' | 'calm_bengali' | 'stern'>('warm');
  const [continuousListening, setContinuousListening] = useState<boolean>(false);
  const [noiseCancellation, setNoiseCancellation] = useState<boolean>(true);
  const [interruptionDetection, setInterruptionDetection] = useState<boolean>(true);
  const [currentCaptionWords, setCurrentCaptionWords] = useState<string[]>([]);
  const [captionWordIndex, setCaptionWordIndex] = useState<number>(-1);
  const [isSpeechSynthPaused, setIsSpeechSynthPaused] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>("Synced"); // Syncing, Synced, Offline
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [accentScore, setAccentScore] = useState<number>(89);
  const [userMemories, setUserMemories] = useState<string[]>([
    "Your native regional language is Bengali.",
    "Goal: To sound confident during standard client calls.",
    "Common pitfall: Pluralizing uncountable nouns like 'feedbacks'."
  ]);
  const [newMemory, setNewMemory] = useState<string>("");
  const [activePlan, setActivePlan] = useState<'none' | 'basic' | 'premium' | 'pro'>('none');
  const [selectedPlanPrice, setSelectedPlanPrice] = useState<number>(7); // ₹7 Trial checkout option
  const [otpPhone, setOtpPhone] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>("");
  const [isOtpLoggedIn, setIsOtpLoggedIn] = useState<boolean>(false);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [billingOverlayOpen, setBillingOverlayOpen] = useState<boolean>(false);
  const [otpOverlayOpen, setOtpOverlayOpen] = useState<boolean>(false);
  const [submittingPayment, setSubmittingPayment] = useState<boolean>(false);
  const [activeBillingStep, setActiveBillingStep] = useState<'select' | 'vpa' | 'success'>('select');
  const [selectedUPIApp, setSelectedUPIApp] = useState<string>("gpay");
  const [customVPA, setCustomVPA] = useState<string>("");
  const [paymentSuccessTriggered, setPaymentSuccessTriggered] = useState<boolean>(false);
  const [reportOverlayOpen, setReportOverlayOpen] = useState<boolean>(false);
  const [reportTab, setReportTab] = useState<'performance' | 'account'>('performance');
  const [voiceToastMessage, setVoiceToastMessage] = useState<string>("");
  
  // Custom switch for lightning-fast voice chat response (0ms delay local synthesis vs cloud AI model)
  const [useInstantTurboVoice, setUseInstantTurboVoice] = useState<boolean>(() => {
    return localStorage.getItem("vani_use_instant_voice") !== "false";
  });
  
  // Custom Step-by-Step Onboarding states
  const [onboardingSubStep, setOnboardingSubStep] = useState<string>("welcome"); // welcome, phone, otp, trial_offer, upi_payment, success
  const [phoneInput, setPhoneInput] = useState<string>("");
  const [otpInput, setOtpInput] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const [otpSentLabel, setOtpSentLabel] = useState<string>("");
  const [isPhoneLoggedIn, setIsPhoneLoggedIn] = useState<boolean>(false);
  const [homeActiveTheme, setHomeActiveTheme] = useState<string | null>(null);
  const [homeSearchQuery, setHomeSearchQuery] = useState<string>("");

  // Sound Reactive UI waveform trigger states
  const [waveHeaving, setWaveHeaving] = useState<boolean>(false);

  // Sound recognition states for translator
  const translatorRecognitionRef = useRef<any>(null);
  const [isTranslatorListening, setIsTranslatorListening] = useState<boolean>(false);

  const startTranslatorVoiceRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please try Chrome, Edge, or Safari.");
      return;
    }

    if (isTranslatorListening) {
      if (translatorRecognitionRef.current) {
        try {
          translatorRecognitionRef.current.stop();
        } catch (e) {}
      }
      setIsTranslatorListening(false);
      return;
    }

    setIsTranslatorListening(true);
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    // Set target recognition language dynamically
    const langCode = getLangSpeechCode(selectedSourceLang);
    recognition.lang = langCode;

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setTranslatorInput(speechToText);
      setIsTranslatorListening(false);
      
      // Auto translate to English instantly
      setTimeout(() => {
        runQuickTranslate(speechToText);
      }, 300);
    };

    recognition.onerror = (event: any) => {
      console.error("Translator Speech Error:", event.error);
      setIsTranslatorListening(false);
    };

    recognition.onend = () => {
      setIsTranslatorListening(false);
    };

    translatorRecognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e) {
      console.error("Failed to start speech recognition", e);
      setIsTranslatorListening(false);
    }
  };

  // References
  const musicRef = useRef<AmbientMusicManager | null>(null);
  const captionIntervalRef = useRef<any>(null);

  // Initialize and cleanup ambient music synthesizer
  useEffect(() => {
    musicRef.current = new AmbientMusicManager();
    return () => {
      musicRef.current?.cleanup();
      if (captionIntervalRef.current) clearInterval(captionIntervalRef.current);
    };
  }, []);

  // Live timer for trial active countdown (ticking seconds & milliseconds)
  const [tickerMs, setTickerMs] = useState<number>(99);
  useEffect(() => {
    const timer = setInterval(() => {
      setTrialTimeLeft((prev) => (prev > 0 ? prev - 1 : 604800));
    }, 1000);

    const msTimer = setInterval(() => {
      setTickerMs((prev) => (prev > 0 ? prev - 1 : 99));
    }, 85);

    return () => {
      clearInterval(timer);
      clearInterval(msTimer);
    };
  }, []);

  const selectMusicTrack = (track: 'lofi' | 'bengali' | 'celestial' | 'off') => {
    setMusicSelected(track);
    if (track === 'off') {
      musicRef.current?.cleanup();
      musicRef.current = null;
    } else {
      if (!musicRef.current) {
        musicRef.current = new AmbientMusicManager();
      }
      musicRef.current.init();
      musicRef.current.setTrackType(track);
    }
  };

  const duckMusic = (duck: boolean) => {
    if (musicRef.current) {
      // lower volume during speech, swell when finished
      musicRef.current.setVolume(duck ? 0.04 : 0.20);
    }
  };

  const startCaptionAnimation = (text: string) => {
    const words = text.replace(/[*#]/g, "").split(" ");
    setCurrentCaptionWords(words);
    setCaptionWordIndex(0);
    setWaveHeaving(true);
    duckMusic(true);

    if (captionIntervalRef.current) clearInterval(captionIntervalRef.current);
    
    let currentIdx = 0;
    // speaking cadence: ~230ms per word
    captionIntervalRef.current = setInterval(() => {
      currentIdx++;
      if (currentIdx < words.length) {
        setCaptionWordIndex(currentIdx);
      } else {
        clearInterval(captionIntervalRef.current);
        setCaptionWordIndex(-1);
        setCurrentCaptionWords([]);
        setWaveHeaving(false);
        duckMusic(false);
      }
    }, 240);
  };

  // App state
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [quickStudyActive, setQuickStudyActive] = useState<boolean>(false);
  
  // Chatting with VANI State
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [loadingReply, setLoadingReply] = useState<boolean>(false);
  const [userLevel, setUserLevel] = useState<string>("Intermediate");
  
  // Dynamic Selected Source Language
  const [selectedSourceLang, setSelectedSourceLang] = useState<string>("Bengali");

  // Live Translator Mini-App state
  const [translatorInput, setTranslatorInput] = useState<string>("");
  const [translatorResult, setTranslatorResult] = useState<TranslationResult | null>(null);
  const [translating, setTranslating] = useState<boolean>(false);

  // Voice Speech Recognition setup
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // TTS audio tracking for currently playing voices
  const [playingAudioIndex, setPlayingAudioIndex] = useState<number | null>(null);
  const [ttsLoading, setTtsLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, loadingReply]);

  // Handle Chrome & browser Web Speech API for voice dictation
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-IN"; // Target Indian speaking style

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        if (transcript) {
          setChatInput((prev) => (prev ? prev + " " + transcript : transcript));
        }
        setIsListening(false);
      };

      rec.onerror = (err: any) => {
        console.error("Speech Recognition Error", err);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported or permitted in this browser version. Try typing your message instead!");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn("Speech recognition active already", err);
      }
    }
  };

  // Safe client-side playback of VANI's base64 audio stream
  const playTTS = async (text: string, index: number) => {
    setPlayingAudioIndex(index);
    setTtsLoading(true);
    setIsSpeechSynthPaused(false);

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    // start animated captions
    startCaptionAnimation(text);

    if (useInstantTurboVoice) {
      playSpeechSynthesisFallback(text);
      setTtsLoading(false);
      return;
    }

    const controller = new AbortController();
    const abortTimeoutId = setTimeout(() => controller.abort(), 1200); // 1.2s timeout to guarantee instant speaking fallback if API is slow

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone: emotionalTone }),
        signal: controller.signal,
      });
      clearTimeout(abortTimeoutId);

      if (!response.ok) throw new Error("TTS synthesize failed");
      const data = await response.json();

      if (data.audio && !data.fallback) {
        const audioBytes = atob(data.audio);
        const arrayBuffer = new ArrayBuffer(audioBytes.length);
        const bufferView = new Uint8Array(arrayBuffer);
        for (let i = 0; i < audioBytes.length; i++) {
          bufferView[i] = audioBytes.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        
        audio.onended = () => {
          setPlayingAudioIndex(null);
          setWaveHeaving(false);
          duckMusic(false);
        };
        audio.play();
      } else {
        playSpeechSynthesisFallback(text);
      }
    } catch (err) {
      console.warn("Server TTS failed or took too long, falling back to Web Speech API:", err);
      playSpeechSynthesisFallback(text);
    } finally {
      setTtsLoading(false);
    }
  };

  const playSpeechSynthesisFallback = (textToSpeak: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = textToSpeak.replace(/[*#]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "en-IN";
      utterance.rate = 0.95;

      const voices = window.speechSynthesis.getVoices();
      const idealVoice = voices.find(v => 
        (v.lang.toLowerCase().includes("in") && v.name.toLowerCase().includes("google")) || 
        v.lang.toLowerCase().includes("en-in") || 
        v.lang.toLowerCase().includes("hi-in") ||
        v.name.toLowerCase().includes("female") || 
        v.name.toLowerCase().includes("zira") || 
        v.name.toLowerCase().includes("veena")
      ) || voices.find(v => v.lang.toLowerCase().startsWith("en")) || voices[0];

      if (idealVoice) {
        utterance.voice = idealVoice;
      }

      utterance.onend = () => {
        setPlayingAudioIndex(null);
        setWaveHeaving(false);
        duckMusic(false);
      };
      utterance.onerror = () => {
        setPlayingAudioIndex(null);
        setWaveHeaving(false);
        duckMusic(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setPlayingAudioIndex(null);
      setWaveHeaving(false);
      duckMusic(false);
    }
  };

  const toggleSpeechPauseResume = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isSpeechSynthPaused) {
        window.speechSynthesis.resume();
        setIsSpeechSynthPaused(false);
        setWaveHeaving(true);
        duckMusic(true);
      } else {
        window.speechSynthesis.pause();
        setIsSpeechSynthPaused(true);
        setWaveHeaving(false);
        duckMusic(false);
      }
    }
  };

  const handleBillingSuccess = (planName: string) => {
    let planId: string = 'premium';
    if (planName === "Trial") {
      planId = 'trial';
      setTrialStartDate(Date.now());
      setTrialDaysLeft(7);
      setTrialExpired(false);
      setSessionMsgCount(0);
    } else if (planName === "Monthly" || planName === "Basic") {
      planId = 'monthly';
    } else if (planName === "Premium") {
      planId = 'premium';
    } else if (planName === "Pro" || planName === "Pro Master" || planName === "ProMaster") {
      planId = 'pro';
    }
    
    setUserPlan(planId);
    setIsPremium(planId === 'premium' || planId === 'pro');
    setActivePlan(planId as any);
    setActiveBillingStep('success');
    
    // Confetti celebration
    try {
      confetti({
        particleCount: 150,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#ec4899", "#a855f7", "#10b981", "#fbbf24"]
      });
    } catch(e){}

    const audioMsg = `Ami VANI! Congratulations, ${userName}! Your ${planId.toUpperCase()} tier fluency pass has been successfully registered on our UPI network. Let's speak English with natural confidence together every single day!`;
    setTimeout(() => {
      playTTS(audioMsg, 999);
    }, 600);
  };

  const handleOTPLoginSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpPhone.trim()) return;
    setOtpLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setOtpLoading(false);
      alert("🔐 Firebase OTP Mock Sent! Enter '123456' to authenticly sync profiles.");
    }, 900);
  };

  const verifyOTPCodeSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpLoading(true);
    setTimeout(() => {
      setIsOtpLoggedIn(true);
      setOtpLoading(false);
      setOtpOverlayOpen(false);
      setSyncStatus("Synced");
      alert(`🎉 OTP Verified successfully! Welcome back, ${userName}. Synced profile, memories, and XP logs securely via Firestore!`);
    }, 1000);
  };

  function needsTranslation(text: string): boolean {
    // Non-Latin Unicode (Bengali, Hindi, Telugu, Tamil etc.)
    if (/[\u0080-\uFFFF]/.test(text))
      return true;

    // Romanised Hinglish / Benglish patterns
    const patterns = [
      /\b(ami|amar|tumi|tomake|kemon|achho|ache|bhalo|bhalobashi|kothay|esho|hobe|bolchi|dekho|jao)\b/i,
      /\b(mujhe|tumhe|kya|kyun|kaise|nahi|haan|theek|achha|bahut|bolna|karna|jana|aana|suno)\b/i,
      /\b(naku|meeku|emi|ela|enduku|cheppandi|avunu|kaadu)\b/i,
      /\b(naan|nee|enna|epdi|sollu|theriyum|theriyaadu|paaru)\b/i,
    ];
    return patterns.some(p => p.test(text));
  }

  // Send situational message to Coach VANI via backend
  const handleChatSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || loadingReply) return;

    if (!canSendMessage()) {
      let limitMsg = "You've reached your subscription tier message limit. Upgrade to a Monthly or Premium plan to enjoy unlimited chats with Coach VANI!";
      if (userPlan === "trial") {
        if (trialExpired) {
          limitMsg = "Your 7-day VIP Access Trial has expired. Upgrade your plan to continue practicing English with Coach VANI!";
        } else {
          limitMsg = "You've reached your trial limit of 5 messages per session. Upgrade to Monthly or Premium for unlimited conversation!";
        }
      } else if (userPlan === "none") {
        limitMsg = "You don't have an active plan or trial. Upgrade now or start your ₹7 Trial to begin chatting!";
      }
      playTTS(limitMsg, 8479);
      alert(`⚠️ Subscription Limit Reached\n\n${limitMsg}`);
      setSelectedPlanPrice(7);
      setBillingOverlayOpen(true);
      return;
    }

    const userText = chatInput.trim();
    setChatInput("");
    setSessionMsgCount(prev => prev + 1);
    setLoadingReply(true);

    const isNative = needsTranslation(userText);

    const newUserMsg: Message = { 
      role: "user", 
      content: userText, 
      translationText: null,
      translationLoading: isNative 
    };
    const updatedMessages = [...chatMessages, newUserMsg];

    // INSTANTLY display user's typed chat bubble on the screen for zero-latency feel
    setChatMessages(updatedMessages);

    // 1. Asynchronously fetch the regional translation in the background if native language detected
    if (isNative) {
      fetch("/api/quick-translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: userText }]
        })
      })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error("Translation status not ok");
        })
        .then(transData => {
          const translationText = transData?.content?.[0]?.text?.trim() || null;
          
          // Update the last user message with translationText - style triggers immediate change
          setChatMessages(prev => {
            const updated = [...prev];
            for (let i = updated.length - 1; i >= 0; i--) {
              if (updated[i].role === "user" && updated[i].translationLoading) {
                updated[i] = {
                  ...updated[i],
                  translationText: translationText,
                  translationLoading: false
                };
                break;
              }
            }
            return updated;
          });
        })
        .catch(transErr => {
          console.warn("Translation request error:", transErr);
          // Reset loading status in case of error
          setChatMessages(prev => {
            const updated = [...prev];
            for (let i = updated.length - 1; i >= 0; i--) {
              if (updated[i].role === "user" && updated[i].translationLoading) {
                updated[i] = {
                  ...updated[i],
                  translationLoading: false
                };
                break;
              }
            }
            return updated;
          });
        });
    }

    // 2. Fetch the virtual coach reply from the server in parallel
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          topicTitle: selectedTopic ? selectedTopic.title : "General Chat",
          userLevel
        }),
      });

      if (!response.ok) throw new Error("Bilingual coach route error");
      const data = await response.json();

      setChatMessages(prev => {
        // Ensure we preserve any async translation updates on the user's message!
        const withResponse = [...prev];
        withResponse.push({
          role: "assistant",
          content: data.reply,
          grammarFeedback: data.grammarCorrection,
          vocabBoost: data.vocabularyBoost,
          bilingualTip: data.bilingualTip
        });
        return withResponse;
      });

      // Automatically speak VANI's conversational response
      if (data.reply) {
        setTimeout(() => {
          playTTS(data.reply, updatedMessages.length);
        }, 300);
      }

    } catch (err: any) {
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Coach VANI is facing temporary static. Let's try saying that again!"
        }
      ]);
    } finally {
      setLoadingReply(false);
    }
  };

  // Clean regional language to English quick translator buddy
  const runQuickTranslate = async (textToTranslate?: string) => {
    const rawVal = textToTranslate !== undefined ? textToTranslate : translatorInput;
    if (!rawVal.trim()) return;
    setTranslating(true);
    setTranslatorResult(null);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: rawVal,
          sourceLanguage: selectedSourceLang
        }),
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      setTranslatorResult(data);
    } catch (err) {
      console.error("Translation tool failed", err);
    } finally {
      setTranslating(false);
    }
  };

  const openConversationTopic = (topic: Topic, isQuickStudyMode = false) => {
    // If the topic is a premium or subscription-gated block, prompt upgrade
    if (topic.id > 0 && !canAccess(topic.id - 1)) {
      let suggestPrice = 99;
      if (topic.id > 28) {
        suggestPrice = 249;
      } else if (userPlan === "none") {
        suggestPrice = 7;
      }
      setSelectedPlanPrice(suggestPrice);
      
      let reason = "This scenario is locked.";
      if (userPlan === "none") {
        reason = "Upgrade now to a premium status or choose our 7-day VIP Trial for ₹7 to instantly unlock the 'Introduce Yourself' practice module!";
      } else if (userPlan === "trial" && trialExpired) {
        reason = "Your 7-day active trial has expired! Please select a subscription tier to continue your conversational training.";
      } else if (userPlan === "trial") {
        reason = "Only the 'Introduce Yourself' module is open on the Trial plan. Upgrade to Monthly Basic or Premium VIP plans to unlock more scenarios!";
      } else if (userPlan === "monthly") {
        reason = "This scenario requires upgrading to the Premium tier to unlock all 40+ dynamic scenarios!";
      }
      
      playTTS(reason, 234);
      alert(`🔒 Tier Restricted Module\n\n${reason}`);
      setBillingOverlayOpen(true);
      return;
    }

    if (topic.locked) {
      alert("This topic is locked! Complete active topics to advance.");
      return;
    }
    
    setSelectedTopic(topic);
    setQuickStudyActive(isQuickStudyMode);

    let initialMessage = `Namaste! I'm VANI, your English coach. Today we are exploring "${topic.title}" together. Don't worry about making mistakes! How do you feel about this topic? Tell me in a sentence.`;
    
    if (isQuickStudyMode) {
      const quickStudyGreetings: Record<number, string> = {
        1: "⚡ QUICK STUDY DRILL ⚡\n\nNamaste! Welcome to your rapid-fire practice for 'Introduce Yourself'. Let's perfect your elevator pitch. In one brief sentence, what is your current profession or field of study?",
        10: "⚡ QUICK STUDY DRILL ⚡\n\nNamaste! Welcome to your Job Interview focus session. Let's do a quick behavioural challenge. Why should a major educational or corporate brand hire you? Give a 2-sentence response!",
        19: "⚡ QUICK STUDY DRILL ⚡\n\nNamaste! Let's brush up your office coffee-break chat skills. A coworker asks: 'Any fun weekend plans, or just catching up on sleep?' How would you reply naturally in English?",
        31: "⚡ QUICK STUDY DRILL ⚡\n\nNamaste! You are meeting your tutor to get feedback on a recent test. You want to politely ask: 'Are there any extra practice resources I can work on?' How would you phrase this in your own words?"
      };
      
      initialMessage = quickStudyGreetings[topic.id] || `⚡ QUICK STUDY DRILL ⚡\n\nNamaste! Ready for an express learning sprint on "${topic.title}"? Let's kick-start your confidence with a rapid-fire question. Tell me, what is the most important vocabulary word you associate with this scenario?`;
    }

    setChatMessages([
      {
        role: "assistant",
        content: initialMessage
      }
    ]);
    setScreen("chat");
  };

  // Calculate user stats dynamically
  const completedCount = topics.filter(t => t.done).length;
  const progressPercent = Math.round((completedCount / topics.length) * 100);

  // Handle marking active topic done
  const markCurrentTopicAsDone = () => {
    if (selectedTopic) {
      setTopics((prev) => 
        prev.map((t) => t.id === selectedTopic.id ? { ...t, done: true } : t)
      );
      alert(`🎉 Congratulations! You have completed speaking practice for: "${selectedTopic.title}"`);
    }
  };

  // Mock Voice Call Dialing state
  const [callActive, setCallActive] = useState<boolean>(false);
  const [callText, setCallText] = useState<string>("Coach VANI is listening... Tap the button and start speaking in English. Speak about anything!");
  const [callMessages, setCallMessages] = useState<string[]>([]);
  const [callStatusText, setCallStatusText] = useState<string>("Ready to Call"); // "Ready", "Dialing...", "Connected"
  
  const [callMessagesList, setCallMessagesList] = useState<Message[]>([]);
  const [callUserSpokenText, setCallUserSpokenText] = useState<string>("");
  const [callGrammarCorrection, setCallGrammarCorrection] = useState<string>("");
  const [callVocabularyBoost, setCallVocabularyBoost] = useState<string>("");
  const [isCallListening, setIsCallListening] = useState<boolean>(false);
  const callRecognitionRef = useRef<any>(null);

  // Auto clean-up when navigating away from Call Screen
  useEffect(() => {
    if (screen !== "call" && callActive) {
      endVoiceCall();
    }
  }, [screen]);

  // Voice Call listening & orchestrator loop
  useEffect(() => {
    if (!callActive) {
      if (callRecognitionRef.current) {
        try {
          callRecognitionRef.current.stop();
        } catch (e) {}
        callRecognitionRef.current = null;
      }
      setIsCallListening(false);
      return;
    }

    // If VANI is currently speaking (playing audio), do NOT start speech recognition!
    if (waveHeaving || playingAudioIndex !== null) {
      if (callRecognitionRef.current) {
        try {
          callRecognitionRef.current.stop();
        } catch (e) {}
      }
      setIsCallListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setCallStatusText("Device Incompatible");
      return;
    }

    if (!isCallListening) {
      const rec = new SpeechRecognition();
      rec.continuous = false; 
      rec.interimResults = false;
      rec.lang = "en-IN"; // Target speaking Style

      rec.onstart = () => {
        setIsCallListening(true);
        setCallStatusText("Listening...");
      };

      rec.onresult = async (e: any) => {
        const transcript = e.results[0][0].transcript;
        if (transcript && transcript.trim()) {
          setCallUserSpokenText(transcript);
          await handleCallSpeechSubmitted(transcript);
        }
      };

      rec.onerror = (err: any) => {
        console.error("Call Speech Recognition Error", err.error);
        setIsCallListening(false);
      };

      rec.onend = () => {
        setIsCallListening(false);
      };

      callRecognitionRef.current = rec;
      try {
        rec.start();
      } catch (err) {
        console.warn("Call speech recognition start issue:", err);
      }
    }
  }, [callActive, waveHeaving, playingAudioIndex, isCallListening]);

  const handleCallSpeechSubmitted = async (userText: string) => {
    if (!userText || !userText.trim()) return;

    setCallStatusText("Thinking...");
    
    const newUserMessage: Message = { role: "user", content: userText };
    const updatedMessages = [...callMessagesList, newUserMessage];
    setCallMessagesList(updatedMessages);

    try {
      const topicTitle = selectedTopic ? selectedTopic.title : "Voice Call General Practice";
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          topicTitle: topicTitle,
          userLevel: "Intermediate"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to reach VANI voice processor");
      }

      const data = await response.json();
      
      const vaniReply = data.reply || "I didn't quite catch that. Could you say it again in simple English?";
      setCallGrammarCorrection(data.grammarCorrection || "");
      setCallVocabularyBoost(data.vocabularyBoost || "");

      const newVaniMessage: Message = { 
        role: "assistant", 
        content: vaniReply,
        grammarFeedback: data.grammarCorrection,
        vocabBoost: data.vocabularyBoost,
        bilingualTip: data.bilingualTip
      };
      
      setCallMessagesList((prev) => [...prev, newVaniMessage]);
      setCallStatusText("Speaking...");

      await playTTS(vaniReply, 889);

    } catch (err: any) {
      console.error("Error communicating with VANI AI:", err);
      setCallStatusText("Connection Error");
      const fallbackReply = "Sorry, I had a brief connection issue. Can you repeat that?";
      await playTTS(fallbackReply, 889);
    }
  };

  const startVoiceCall = () => {
    if (!canUseVoiceStation()) {
      let limitMsg = "VANI Voice calling practice is blocked under your current subscription tier. Upgrade to Monthly Basic or Premium plan for full voice calling access!";
      if (userPlan === "trial") {
        limitMsg = "Speaking on the dynamic Voice Dialer station is blocked during the active Trial tier. Upgrade to a Monthly or Premium plan to call Coach VANI!";
      } else if (userPlan === "none") {
        limitMsg = "You don't have an active plan or trial. Upgrade to Monthly or Premium to speak live with Coach VANI!";
      }
      playTTS(limitMsg, 811);
      alert(`🔒 Voice Connection Blocked\n\n${limitMsg}`);
      setSelectedPlanPrice(99);
      setBillingOverlayOpen(true);
      return;
    }

    setCallActive(true);
    setCallStatusText("Connecting...");
    setCallUserSpokenText("");
    setCallGrammarCorrection("");
    setCallVocabularyBoost("");
    
    if (callRecognitionRef.current) {
      try {
        callRecognitionRef.current.stop();
      } catch (e) {}
    }

    const greetingText = `Namaste! I am VANI, your AI English Coach. Welcome to the Voice Personality Station! Speak to me freely in English, and I will rectify any grammar or vocabulary mistakes you make. What shall we talk about today?`;
    
    const initialMsg: Message = {
      role: "assistant",
      content: greetingText
    };
    setCallMessagesList([initialMsg]);

    setTimeout(() => {
      setCallStatusText("Speaking...");
      playTTS(greetingText, 888);
    }, 700);
  };

  const endVoiceCall = () => {
    setCallActive(false);
    setCallStatusText("Call Disconnected");
    setIsCallListening(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (callRecognitionRef.current) {
      try {
        callRecognitionRef.current.stop();
      } catch (e) {}
    }
  };

  const filteredHomeTopics = topics.filter((t) => {
    const matchesTheme = !homeActiveTheme || t.theme === homeActiveTheme;
    const matchesSearch = !homeSearchQuery.trim() || 
      t.title.toLowerCase().includes(homeSearchQuery.toLowerCase()) || 
      t.theme.toLowerCase().includes(homeSearchQuery.toLowerCase()) ||
      t.cat.toLowerCase().includes(homeSearchQuery.toLowerCase());
    return matchesTheme && matchesSearch;
  });

  // Subscription Action Handlers
  const handleStartTrial = () => {
    setSelectedPlanDetails({
      key: "trial",
      price: "₹7.00 for 7 days",
      name: "7-Day Trial"
    });
    setShowPayModal(true);
  };

  const handleSubscribePlan = (plan: string) => {
    const details: Record<string, { price: string; name: string }> = {
      monthly  : { 
        price: "₹99.00 / month", 
        name : "Easy English — Basic Monthly" 
      },
      premium  : { 
        price: "₹249.00 / month", 
        name : "Easy English — Premium" 
      },
      promaster: { 
        price: "₹449.00 / month", 
        name : "Easy English — Pro Master" 
      }
    };
    
    setSelectedPlanDetails({
      key: plan,
      price: details[plan].price,
      name: details[plan].name
    });
    setShowPayModal(true);
  };

  const confirmPaymentSimulation = () => {
    if (!selectedPlanDetails) return;
    setPayProcessing(true);
    setTimeout(() => {
      const plan = selectedPlanDetails.key;
      
      localStorage.setItem("userPlan", plan);
      localStorage.setItem("vani_user_plan", plan);
      setUserPlan(plan);
      
      if (plan === "trial") {
        const now = Date.now();
        localStorage.setItem("trialStartDate", String(now));
        localStorage.setItem("vani_trial_start_date", String(now));
        localStorage.setItem("trialExpired", "false");
        localStorage.setItem("vani_trial_expired", "false");
        setTrialStartDate(now);
        setTrialDaysLeft(7);
        setTrialExpired(false);
      } else {
        const expiry = Date.now() + (30 * 24 * 60 * 60 * 1000);
        localStorage.setItem("planExpiry", String(expiry));
        localStorage.setItem("vani_plan_expiry", String(expiry));
      }
      
      setPayProcessing(false);
      setShowPayModal(false);
      setShowPaySuccess(true);
      
      // Auto success callback bursts canvas confetti
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn("Confetti call bypassed:", e);
      }
      
    }, 1800);
  };

  const enterAppAfterPayment = () => {
    setShowPaySuccess(false);
    setGateMode("none");
    setBillingOverlayOpen(false);
  };

  // Rendering methods for Subscription Gating Screens
  const renderSplashScreen = () => {
    return (
      <div id="splash-screen" style={{
        position        : "absolute",
        top             : 0, left: 0,
        width           : "100%", height: "100%",
        background      : "#0D0D0D",
        display         : "flex",
        flexDirection   : "column",
        alignItems     : "center",
        justifyContent : "center",
        zIndex         : 9999,
      }}>
        {/* Animated logo */}
        <div id="splash-logo" style={{
          width           : "96px",
          height          : "96px",
          borderRadius   : "50%",
          background      : "linear-gradient(135deg, #FF6B2B, #FF8C55)",
          display         : "flex",
          alignItems     : "center",
          justifyContent : "center",
          fontSize       : "44px",
          marginBottom   : "24px",
          animation       : "splashPulse 1s ease-in-out infinite alternate",
          boxShadow      : "0 0 40px rgba(255,107,43,0.5)",
        }}>🎙️</div>

        {/* App name */}
        <h1 style={{
          fontFamily   : "'Cormorant Garamond', serif",
          fontSize     : "36px",
          color         : "#FF8C4A",
          margin        : "0 0 8px 0",
          letterSpacing: "2px",
        }}>Easy English</h1>

        {/* Tagline */}
        <p style={{
          fontFamily   : "Poppins, sans-serif",
          fontSize     : "13px",
          color         : "#767676",
          margin        : "0 0 40px 0",
        }}>Powered by VANI AI</p>

        {/* Loading bar */}
        <div style={{
          width           : "160px",
          height          : "3px",
          background      : "#1A1A1A",
          borderRadius   : "4px",
          overflow        : "hidden",
        }}>
          <div id="splash-bar" style={{
            height          : "3px",
            background      : "#FF6B2B",
            width           : "0%",
            borderRadius   : "4px",
            animation       : "loadBar 1.4s ease forwards",
          }}></div>
        </div>

        <style>{`
          @keyframes splashPulse {
            from { transform: scale(1); }
            to   { transform: scale(1.08); }
          }
          @keyframes loadBar {
            from { width: 0%; }
            to   { width: 100%; }
          }
        `}</style>
      </div>
    );
  };

  const renderOnboardingScreen = () => {
    return (
      <div className="absolute inset-0 bg-[#0D0D0D] z-[9990] flex flex-col justify-between p-6 overflow-y-auto text-white select-none" style={{ fontFamily: "Poppins, sans-serif" }}>
        
        {onboardingPage === 1 && (
          <div className="flex-1 flex flex-col justify-center items-center text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B2B] to-[#FF8C55] rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_40px_rgba(255,107,43,0.4)]">
              🎙️
            </div>
            
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "#FF8C4A" }} className="font-bold tracking-wide">
              Meet VANI
            </h2>
            
            <p className="text-[15px] font-medium text-white mt-1">
              Your Personal AI Spoken English Coach
            </p>
            
            <p className="text-[13px] text-[#767676] max-w-xs mt-3 leading-relaxed">
              Speak better English in just 15 minutes a day — guaranteed.
            </p>
            
            <div className="w-full max-w-xs mt-8 space-y-4 text-left">
              <div className="feature-row">
                <span>✅</span> <span>Voice-first learning — just speak</span>
              </div>
              <div className="feature-row">
                <span>✅</span> <span>Real-time corrections by VANI</span>
              </div>
              <div className="feature-row">
                <span>✅</span> <span>50 topics from basics to professional</span>
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-10">
              <span className="text-[#FF6B2B] text-lg leading-none">●</span>
              <span className="text-stone-605 text-stone-600 text-lg leading-none">○</span>
              <span className="text-stone-605 text-stone-600 text-lg leading-none">○</span>
            </div>
            
            <button 
              onClick={() => setOnboardingPage(2)}
              className="w-full mt-8 py-4 bg-gradient-to-r from-[#FF6B2B] to-[#FF8C55] rounded-xl text-white font-bold text-center transition hover:opacity-90 active:scale-98 shadow-[0_4px_20px_rgba(255,107,43,0.3)]"
            >
              Next →
            </button>
          </div>
        )}

        {onboardingPage === 2 && (
          <div className="flex-1 flex flex-col justify-center py-6">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "#FF8C4A" }} className="font-bold text-center mb-6">
              How VANI Works
            </h2>
            
            <div className="space-y-4 max-w-md w-full mx-auto">
              <div className="bg-[#1A1A1A] border border-stone-800 rounded-2xl p-5 flex items-start gap-4">
                <span className="text-3xl">🎙️</span>
                <div>
                  <h4 className="font-bold text-white text-base">Speak</h4>
                  <p className="text-xs text-stone-400 mt-1">Tap the mic and talk in English</p>
                </div>
              </div>
              
              <div className="bg-[#1A1A1A] border border-stone-800 rounded-2xl p-5 flex items-start gap-4">
                <span className="text-3xl">👂</span>
                <div>
                  <h4 className="font-bold text-white text-base">VANI Listens</h4>
                  <p className="text-xs text-stone-400 mt-1">VANI hears your voice and understands</p>
                </div>
              </div>
              
              <div className="bg-[#1A1A1A] border border-stone-800 rounded-2xl p-5 flex items-start gap-4">
                <span className="text-3xl">✅</span>
                <div>
                  <h4 className="font-bold text-white text-base">VANI Corrects</h4>
                  <p className="text-xs text-stone-400 mt-1">Get instant feedback and improve fast</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              <span className="text-stone-605 text-stone-600 text-lg leading-none">○</span>
              <span className="text-[#FF6B2B] text-lg leading-none">●</span>
              <span className="text-stone-605 text-stone-600 text-lg leading-none">○</span>
            </div>
            
            <div className="flex gap-4 w-full mt-8">
              <button 
                onClick={() => setOnboardingPage(1)}
                className="flex-1 py-4 bg-[#1A1A1A] border border-stone-800 hover:bg-[#252525] rounded-xl text-stone-300 font-bold text-center transition active:scale-98"
              >
                ← Back
              </button>
              <button 
                onClick={() => setOnboardingPage(3)}
                className="flex-1 py-4 bg-gradient-to-r from-[#FF6B2B] to-[#FF8C55] rounded-xl text-white font-bold text-center transition hover:opacity-90 active:scale-98 shadow-[0_4px_20px_rgba(255,107,43,0.3)]"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {onboardingPage === 3 && (
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar py-2">
            {renderPlanSelectionMarkup({ hideTrialCard: false, onBack: () => setOnboardingPage(2) })}
          </div>
        )}
      </div>
    );
  };

  const renderPlanSelectionMarkup = ({ hideTrialCard = false, onBack = null }: { hideTrialCard?: boolean; onBack?: (() => void) | null }) => {
    return (
      <div id="plan-selection-screen" className="flex-1 flex flex-col bg-[#0D0D0D] text-white">
        {/* HEADER */}
        <div style={{ padding: "24px 20px 8px", textAlign: "center" }} className="relative">
          {onBack && (
            <button 
              onClick={onBack}
              className="absolute left-1 top-2 p-2 text-stone-400 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div style={{
            fontSize     : "11px",
            letterSpacing: "3px",
            color         : "#FF8C4A",
            textTransform: "uppercase",
            marginBottom : "8px",
          }}>START YOUR JOURNEY</div>

          <h1 style={{
            fontFamily   : "'Cormorant Garamond', serif",
            fontSize     : "30px",
            color         : "#FFFFFF",
            margin        : "0 0 8px 0",
          }}>Choose Your Plan</h1>

          <p style={{
            fontSize     : "13px",
            color         : "#767676",
            margin        : "0 0 24px 0",
          }}>Unlock VANI and start speaking better English today</p>
        </div>

        {/* PLAN LISTING */}
        <div className="space-y-4 px-1 pb-10 overflow-y-auto no-scrollbar">
          
          {/* Card 1: 7-Day Trial */}
          {!hideTrialCard && (
            <div 
              className="plan-card" 
              id="card-trial"
              onClick={() => handleStartTrial()}
              style={{
                margin          : "0 16px 16px",
                background      : "#1A1A1A",
                border          : "2px solid #FF6B2B",
                borderRadius   : "20px",
                padding         : "20px",
                cursor          : "pointer",
                position        : "relative"
              }}
            >
              <div style={{
                position        : "absolute",
                top             : "-12px",
                left            : "50%",
                transform       : "translateX(-50%)",
                background      : "#FF6B2B",
                color           : "white",
                fontSize       : "10px",
                fontWeight     : "bold",
                padding         : "4px 16px",
                borderRadius   : "20px",
                whiteSpace     : "nowrap",
                letterSpacing  : "1px",
              }}>START HERE — BEST FOR BEGINNERS</div>

              <div style={{
                display         : "flex",
                justifyContent : "space-between",
                alignItems     : "flex-start",
                marginTop      : "8px",
                marginBottom   : "16px",
              }}>
                <div>
                  <div style={{
                    fontSize     : "20px",
                    fontWeight   : "bold",
                    color         : "#FFFFFF",
                  }}>7-Day Trial</div>
                  <div style={{
                    fontSize     : "12px",
                    color         : "#767676",
                    marginTop    : "2px",
                  }}>Try before you commit</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontSize     : "36px",
                    fontWeight   : "bold",
                    color         : "#FF8C4A",
                    lineHeight   : "1",
                  }}>₹7</div>
                  <div style={{
                    fontSize     : "11px",
                    color         : "#767676",
                  }}>for 7 days</div>
                </div>
              </div>

              <div style={{
                display         : "flex",
                flexDirection  : "column",
                gap             : "8px",
                marginBottom   : "16px",
              }}>
                <div className="feature-row">✅ 'Introduce Yourself' practice session unlocked</div>
                <div className="feature-row">✅ VANI interactive chat (5 messages/session)</div>
                <div className="feature-row">✅ Pronunciation and regional accent checks</div>
                <div className="feature-row">🔒 Other 40+ dynamic scenarios — locked</div>
                <div className="feature-row locked text-[#555555]">🔒 VANI Voice Dialing station — locked</div>
                <div className="feature-row locked text-[#555555]">🔒 Comprehensive STAR Interview — locked</div>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); handleStartTrial(); }}
                style={{
                  width           : "100%",
                  height          : "52px",
                  background      : "linear-gradient(135deg,#FF6B2B,#FF8C55)",
                  border          : "none",
                  borderRadius   : "14px",
                  color           : "white",
                  fontSize       : "16px",
                  fontWeight     : "bold",
                  cursor          : "pointer",
                  fontFamily     : "Poppins, sans-serif",
                  boxShadow      : "0 4px 20px rgba(255,107,43,0.4)",
                }}
              >
                Start 7-Day Trial — ₹7 Only
              </button>

              <div style={{
                textAlign    : "center",
                fontSize     : "11px",
                color         : "#555",
                marginTop    : "8px",
              }}>No auto-renewal · One-time payment</div>
            </div>
          )}

          {/* Card 2: Basic Monthly */}
          <div 
            className="plan-card" 
            id="card-monthly"
            onClick={() => handleSubscribePlan("monthly")}
            style={{
              margin          : "0 16px 16px",
              background      : "#1A1A1A",
              border          : "2px solid #374151",
              borderRadius   : "20px",
              padding         : "20px",
              cursor          : "pointer",
              position        : "relative"
            }}
          >
            <div style={{
              display         : "flex",
              justifyContent : "space-between",
              alignItems     : "flex-start",
              marginBottom   : "16px",
            }}>
              <div>
                <div style={{
                  fontSize     : "20px",
                  fontWeight   : "bold",
                  color         : "#FFFFFF",
                }}>Basic Monthly</div>
                <div style={{
                  fontSize     : "12px",
                  color         : "#767676",
                  marginTop    : "2px",
                }}>Most popular starter plan</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontSize     : "36px",
                  fontWeight   : "bold",
                  color         : "#FF8C4A",
                  lineHeight   : "1",
                }}>₹99</div>
                <div style={{
                  fontSize     : "11px",
                  color         : "#767676",
                }}>per month</div>
              </div>
            </div>

            <div style={{
              display         : "flex",
              flexDirection  : "column",
              gap             : "8px",
              marginBottom   : "16px",
            }}>
              <div className="feature-row">✅ All 40+ Topics unlocked (Unlimited lessons)</div>
              <div className="feature-row">✅ VANI text chat — unlimited</div>
              <div className="feature-row">✅ Interview modules unlocked</div>
              <div className="feature-row">✅ All Latest and Trending content</div>
              <div className="feature-row locked text-[#555555]">🔒 VANI Voice coaching — locked</div>
              <div className="feature-row locked text-[#555555]">🔒 IELTS tools — locked</div>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); handleSubscribePlan("monthly"); }}
              style={{
                width           : "100%",
                height          : "52px",
                background      : "#1A1A1A",
                border          : "2px solid #FF6B2B",
                borderRadius   : "14px",
                color           : "#FF8C4A",
                fontSize       : "16px",
                fontWeight     : "bold",
                cursor          : "pointer",
                fontFamily     : "Poppins, sans-serif",
              }}
            >
              Subscribe — ₹99/month
            </button>

            <div style={{
              textAlign    : "center",
              fontSize     : "11px",
              color         : "#555",
              marginTop    : "8px",
            }}>Cancel anytime · Auto-renews monthly</div>
          </div>

          {/* Card 3: Premium */}
          <div 
            className="plan-card" 
            id="card-premium"
            onClick={() => handleSubscribePlan("premium")}
            style={{
              margin          : "0 16px 16px",
              background      : "linear-gradient(180deg,#1E1208,#1A1A1A)",
              border          : "2px solid #FF8C4A",
              borderRadius   : "20px",
              padding         : "20px",
              cursor          : "pointer",
              position        : "relative",
              boxShadow      : "0 8px 32px rgba(255,140,74,0.2)",
            }}
          >
            <div style={{
              position        : "absolute",
              top             : "-12px",
              left            : "50%",
              transform       : "translateX(-50%)",
              background      : "linear-gradient(90deg,#FF6B2B,#FF8C55)",
              color           : "white",
              fontSize       : "10px",
              fontWeight     : "bold",
              padding         : "4px 20px",
              borderRadius   : "20px",
              whiteSpace     : "nowrap",
              letterSpacing  : "1px",
            }}>⭐ MOST POPULAR — BEST VALUE</div>

            <div style={{
              display         : "flex",
              justifyContent : "space-between",
              alignItems     : "flex-start",
              marginTop      : "8px",
              marginBottom   : "16px",
            }}>
              <div>
                <div style={{
                  fontSize     : "20px",
                  fontWeight   : "bold",
                  color         : "#FFFFFF",
                }}>Premium</div>
                <div style={{
                  fontSize     : "12px",
                  color         : "#FF8C4A",
                  marginTop    : "2px",
                }}>Full VANI experience</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontSize     : "36px",
                  fontWeight   : "bold",
                  color         : "#FF8C4A",
                  lineHeight   : "1",
                }}>₹249</div>
                <div style={{
                  fontSize     : "11px",
                  color         : "#767676",
                }}>per month</div>
              </div>
            </div>

            <div style={{
              display         : "flex",
              flexDirection  : "column",
              gap             : "8px",
              marginBottom   : "16px",
            }}>
              <div className="feature-row gold text-[#E8C97A]">✅ All 40 topics fully unlocked</div>
              <div className="feature-row gold text-[#E8C97A]">✅ VANI Voice coaching — FULLY UNLOCKED</div>
              <div className="feature-row gold text-[#E8C97A]">✅ VANI text chat — unlimited + priority</div>
              <div className="feature-row gold text-[#E8C97A]">✅ IELTS preparation tools</div>
              <div className="feature-row gold text-[#E8C97A]">✅ VIP coaching sessions</div>
              <div className="feature-row gold text-[#E8C97A]">✅ Corporate roleplay scenarios</div>
              <div className="feature-row gold text-[#E8C97A]">✅ Bengali phonetics unlocked</div>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); handleSubscribePlan("premium"); }}
              style={{
                width           : "100%",
                height          : "52px",
                background      : "linear-gradient(135deg,#FF6B2B,#FF8C55)",
                border          : "none",
                borderRadius   : "14px",
                color           : "white",
                fontSize       : "16px",
                fontWeight     : "bold",
                cursor          : "pointer",
                fontFamily     : "Poppins, sans-serif",
                boxShadow      : "0 4px 24px rgba(255,107,43,0.5)",
              }}
            >
              Go Premium — ₹249/month
            </button>

            <div style={{
              textAlign    : "center",
              fontSize     : "11px",
              color         : "#555",
              marginTop    : "8px",
            }}>Cancel anytime · Auto-renews monthly</div>
          </div>

          {/* Card 4: Pro Master */}
          <div 
            className="plan-card" 
            id="card-promaster"
            onClick={() => handleSubscribePlan("promaster")}
            style={{
              margin          : "0 16px 16px",
              background      : "linear-gradient(180deg,#0D0820,#1A1A1A)",
              border          : "2px solid #7C3AED",
              borderRadius   : "20px",
              padding         : "20px",
              cursor          : "pointer",
              position        : "relative"
            }}
          >
            <div style={{
              position        : "absolute",
              top             : "-12px",
              left            : "50%",
              transform       : "translateX(-50%)",
              background      : "linear-gradient(90deg,#7C3AED,#FF6B2B)",
              color           : "white",
              fontSize       : "10px",
              fontWeight     : "bold",
              padding         : "4px 20px",
              borderRadius   : "20px",
              whiteSpace     : "nowrap",
              letterSpacing  : "1px",
            }}>👑 LIFETIME PRO MASTER</div>

            <div style={{
              display         : "flex",
              justifyContent : "space-between",
              alignItems     : "flex-start",
              marginTop      : "8px",
              marginBottom   : "16px",
            }}>
              <div>
                <div style={{
                  fontSize     : "20px",
                  fontWeight   : "bold",
                  color         : "#FFFFFF",
                }}>Pro Master</div>
                <div style={{
                  fontSize     : "12px",
                  color         : "#A78BFA",
                  marginTop    : "2px",
                }}>For serious English learners</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{
                  fontSize     : "36px",
                  fontWeight   : "bold",
                  color         : "#A78BFA",
                  lineHeight   : "1",
                }}>₹449</div>
                <div style={{
                  fontSize     : "11px",
                  color         : "#767676",
                }}>per month</div>
              </div>
            </div>

            <div style={{
              display         : "flex",
              flexDirection  : "column",
              gap             : "8px",
              marginBottom   : "16px",
            }}>
              <div className="feature-row purple text-[#C4B5FD]">✅ Everything in Premium</div>
              <div className="feature-row purple text-[#C4B5FD]">✅ VIP interview coaching queue</div>
              <div className="feature-row purple text-[#C4B5FD]">✅ IELTS feedback tools — advanced</div>
              <div className="feature-row purple text-[#C4B5FD]">✅ Priority VANI response routes</div>
              <div className="feature-row purple text-[#C4B5FD]">✅ Dedicated progress coach</div>
              <div className="feature-row purple text-[#C4B5FD]">✅ Early access to new features</div>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); handleSubscribePlan("promaster"); }}
              style={{
                width           : "100%",
                height          : "52px",
                background      : "linear-gradient(135deg,#7C3AED,#FF6B2B)",
                border          : "none",
                borderRadius   : "14px",
                color           : "white",
                fontSize       : "16px",
                fontWeight     : "bold",
                cursor          : "pointer",
                fontFamily     : "Poppins, sans-serif",
                boxShadow      : "0 4px 24px rgba(124,58,237,0.4)",
              }}
            >
              Go Pro Master — ₹449/month
            </button>

            <div style={{
              textAlign    : "center",
              fontSize     : "11px",
              color         : "#555",
              marginTop    : "8px",
            }}>Cancel anytime · Auto-renews monthly</div>
          </div>

          {/* LEGAL FOOTER */}
          <div style={{
            padding       : "16px 20px 32px",
            textAlign      : "center",
            fontSize       : "11px",
            color         : "#555",
            lineHeight     : "1.6",
            fontFamily     : "Poppins, sans-serif",
          }}>
            Payments processed via Google Play Billing. Subscriptions auto-renew unless cancelled 24 hours before renewal date. Managed through your Google Play account.
            <br /><br />
            <span style={{ color: "#FF8C4A", textDecoration: "underline", cursor: "pointer" }} onClick={() => setShowTerms(true)}>Terms of Service</span>
            &nbsp;·&nbsp;
            <span style={{ color: "#FF8C4A", textDecoration: "underline", cursor: "pointer" }} onClick={() => setShowPrivacy(true)}>Privacy Policy</span>
            &nbsp;·&nbsp;
            <span style={{ color: "#FF8C4A", textDecoration: "underline", cursor: "pointer" }} onClick={() => setShowAccessibility(true)}>Accessibility</span>
          </div>

        </div>
      </div>
    );
  };

  const renderTrialExpiredScreen = () => {
    return (
      <div id="trial-expired-screen" className="absolute inset-0 bg-[#0D0D0D] z-[9990] flex flex-col p-4 overflow-y-auto text-white select-none" style={{ fontFamily: "Poppins, sans-serif" }}>
        <div style={{ padding: "40px 20px 20px", textAlign: "center" }}>
          
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>⏰</div>

          <h1 style={{ fontSize: "26px", color: "#FF8C4A", margin: "0 0 8px 0" }} className="font-bold">
            Your Trial Has Ended
          </h1>

          <p style={{ fontSize: "14px", color: "#767676", margin: "0 0 8px 0", lineHeight: "1.6" }}>
            Your 7-day trial is complete.
          </p>

          <div style={{
            background      : "#1A1A1A",
            border          : "1px solid #2A2A2A",
            borderRadius   : "16px",
            padding         : "16px",
            margin          : "20px 0",
            textAlign      : "left"
          }}>
            <div style={{ fontSize: "13px", color: "#FF8C4A", fontWeight: "bold", marginBottom: "12px" }}>
              📊 Your Progress So Far
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#B0B0B0", fontSize: "13px" }}>Topics completed</span>
              <span style={{ color: "#FF8C4A", fontWeight: "bold", fontSize: "13px" }}>
                <span>{topics.filter(t => t.done).length}</span>/12
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#B0B0B0", fontSize: "13px" }}>Sessions with VANI</span>
              <span style={{ color: "#FF8C4A", fontWeight: "bold", fontSize: "13px" }}>
                <span>{trialSessionsCount}</span>
              </span>
            </div>
          </div>

          <p style={{ fontSize: "14px", color: "#B0B0B0", marginBottom: "24px" }} className="leading-relaxed">
            Continue your journey — upgrade to keep your progress and unlock everything.
          </p>
        </div>

        {renderPlanSelectionMarkup({ hideTrialCard: true, onBack: null })}
      </div>
    );
  };

  const renderPlanExpiredScreen = () => {
    return (
      <div id="plan-expired-screen" className="absolute inset-0 bg-[#0D0D0D] z-[9990] flex flex-col p-4 overflow-y-auto text-white select-none" style={{ fontFamily: "Poppins, sans-serif" }}>
        <div style={{ padding: "40px 20px 20px", textAlign: "center" }}>
          
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔒</div>

          <h1 style={{ fontSize: "26px", color: "#FF8C4A", margin: "0 0 8px 0" }} className="font-bold">
            Subscription Expired
          </h1>

          <p style={{ fontSize: "14px", color: "#767676", margin: "0 0 16px 0", lineHeight: "1.6" }}>
            Your monthly access period has completed. Select a plan below to renew and continue chatting with VANI.
          </p>
        </div>

        {renderPlanSelectionMarkup({ hideTrialCard: true, onBack: null })}
      </div>
    );
  };

  const renderPaymentModal = () => {
    if (!selectedPlanDetails) return null;
    return (
      <div id="payment-modal" style={{
        display         : "flex",
        position        : "fixed",
        top             : 0, left: 0,
        width           : "100%", height: "100%",
        background      : "rgba(0,0,0,0.7)",
        zIndex         : 10000,
        alignItems     : "flex-end",
        justifyContent : "center",
      }}>
        <div id="payment-sheet" style={{
          background      : "#1A1A1A",
          borderRadius   : "24px 24px 0 0",
          padding         : "24px 20px 40px",
          width           : "100%",
          maxWidth       : "420px",
          fontFamily     : "Poppins, sans-serif",
        }} className="transform translate-y-0 transition-transform duration-350 text-white">
          
          {/* Google Play header */}
          <div style={{
            display         : "flex",
            alignItems     : "center",
            gap             : "10px",
            marginBottom   : "20px",
            paddingBottom  : "16px",
            borderBottom   : "1px solid #2A2A2A",
          }}>
            <div style={{
              width           : "32px",
              height          : "32px",
              background      : "linear-gradient(135deg,#4285F4,#34A853,#FBBC05,#EA4335)",
              borderRadius   : "8px",
              display         : "flex",
              alignItems     : "center",
              justifyContent : "center",
              fontSize       : "16px",
            }}>▶</div>
            <div style={{
              fontSize       : "14px",
              fontWeight     : "bold",
              color           : "#FFFFFF",
            }}>Google Play</div>
          </div>

          {/* Plan summary */}
          <div style={{
            background      : "#222222",
            borderRadius   : "12px",
            padding         : "16px",
            marginBottom   : "20px",
          }}>
            <div id="modal-plan-name" style={{
              fontSize       : "16px",
              fontWeight     : "bold",
              color           : "#FFFFFF",
              marginBottom   : "4px",
            }}>{selectedPlanDetails.name}</div>

            <div id="modal-plan-price" style={{
              fontSize       : "24px",
              fontWeight     : "bold",
              color           : "#FF8C4A",
              marginBottom   : "4px",
            }}>{selectedPlanDetails.price}</div>

            <div style={{
              fontSize       : "12px",
              color         : "#767676",
            }}>Auto-renews monthly. Cancel anytime.</div>
          </div>

          {/* Payment method */}
          <div style={{
            display         : "flex",
            alignItems     : "center",
            justifyContent : "space-between",
            padding         : "14px 0",
            borderBottom   : "1px solid #2A2A2A",
            marginBottom   : "20px",
          }}>
            <div style={{
              display         : "flex",
              alignItems     : "center",
              gap             : "10px",
            }}>
              <div style={{
                width           : "36px",
                height          : "24px",
                background      : "#4285F4",
                borderRadius   : "6px",
                display         : "flex",
                alignItems     : "center",
                justifyContent : "center",
                fontSize       : "12px",
                color           : "white",
                fontWeight     : "bold",
              }}>G</div>
              <span style={{
                fontSize       : "13px",
                color           : "#FFFFFF",
              }}>Google Play (UPI)</span>
            </div>
            <span style={{ color: "#FF8C4A" }}>▼</span>
          </div>

          {/* Subscribe button */}
          <button 
            id="confirm-payment-btn"
            onClick={confirmPaymentSimulation}
            disabled={payProcessing}
            style={{
              width           : "100%",
              height          : "56px",
              background      : payProcessing ? "#555" : "#1A73E8",
              border          : "none",
              borderRadius   : "14px",
              color           : "white",
              fontSize       : "16px",
              fontWeight     : "bold",
              cursor          : payProcessing ? "not-allowed" : "pointer",
              fontFamily     : "Poppins, sans-serif",
              marginBottom   : "12px",
            }}
          >
            {payProcessing ? "Processing..." : "Subscribe Now"}
          </button>

          {/* Cancel link */}
          <div style={{ textAlignment: "center" }} className="text-center">
            <span 
              onClick={() => setShowPayModal(false)}
              style={{
                fontSize       : "13px",
                color         : "#767676",
                cursor          : "pointer",
                textDecoration : "underline",
              }}
            >
              Cancel
            </span>
          </div>

          {/* Legal note */}
          <div style={{
            fontSize       : "10px",
            color           : "#555",
            textAlign      : "center",
            marginTop      : "12px",
            lineHeight     : "1.5",
          }}>
            By subscribing you agree to Google Play Terms. Subscription managed by Google Play. Cancel under Google Play → Subscriptions.
          </div>

        </div>
      </div>
    );
  };

  const renderPaymentSuccess = () => {
    if (!selectedPlanDetails) return null;
    const messages: Record<string, string> = {
      trial    : "Your 7-day trial is active!\nVANI is waiting for you.",
      monthly  : "Welcome to Basic Monthly!\n28 topics are now unlocked.",
      premium  : "Welcome to Premium!\nAll 40 topics + Voice coaching unlocked!",
      promaster: "Welcome to Pro Master!\nVIP access granted. VANI is yours."
    };
    return (
      <div id="payment-success" style={{
        position        : "fixed",
        top             : 0, left: 0,
        width           : "100%", height: "100%",
        background      : "#0D0D0D",
        zIndex         : 10001,
        display         : "flex",
        flexDirection  : "column",
        alignItems     : "center",
        justifyContent : "center",
        fontFamily     : "Poppins, sans-serif",
      }} className="text-white p-6">
        
        {/* Animated tick */}
        <div id="success-tick" style={{
          width           : "80px",
          height          : "80px",
          borderRadius   : "50%",
          background      : "linear-gradient(135deg,#22C55E,#16A34A)",
          display         : "flex",
          alignItems     : "center",
          justifyContent : "center",
          fontSize       : "36px",
          marginBottom   : "24px",
          animation       : "tickBounce 0.6s ease-out forwards",
        }}>✓</div>

        <h2 style={{
          color         : "#FFFFFF",
          fontSize     : "24px",
          margin        : "0 0 8px 0",
          textAlign    : "center",
        }} className="font-bold text-center">Payment Successful!</h2>

        <p id="success-message" style={{
          color         : "#B0B0B0",
          fontSize     : "14px",
          textAlign    : "center",
          margin        : "0 20px 32px",
          lineHeight   : "1.6",
          whiteSpace   : "pre-line"
        }}>{messages[selectedPlanDetails.key] || "Welcome to Easy English Premium!"}</p>

        {/* CSS Confetti */}
        <div id="confetti-container" className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => {
            const colors = ["#FF6B2B","#FF8C4A","#22C55E","#3B82F6","#F59E0B","#EC4899"];
            const color = colors[i % colors.length];
            const top = Math.random() * 30;
            const left = Math.random() * 100;
            const duration = 1 + Math.random();
            const delay = Math.random() * 0.5;
            return (
              <div 
                key={i} 
                className="absolute w-2 h-2 rounded-full overflow-hidden"
                style={{
                  background: color,
                  top: `${top}%`,
                  left: `${left}%`,
                  animation: `fall ${duration}s ease-in forwards`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>

        <button 
          onClick={enterAppAfterPayment}
          style={{
            background    : "linear-gradient(135deg,#FF6B2B,#FF8C55)",
            border        : "none",
            borderRadius : "14px",
            color         : "white",
            fontSize       : "16px",
            fontWeight     : "bold",
            padding       : "16px 48px",
            cursor        : "pointer",
            fontFamily     : "Poppins, sans-serif",
            boxShadow      : "0 4px 20px rgba(255,107,43,0.4)",
          }}
        >
          Start Learning with VANI 🎙️
        </button>

        <style>{`
          @keyframes tickBounce {
            0%   { transform: scale(0); opacity: 0; }
            60%  { transform: scale(1.2); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes fall {
            to { 
              transform  : translateY(100vh) rotate(360deg);
              opacity    : 0;
            }
          }
        `}</style>
      </div>
    );
  };

  const renderLegalModals = () => {
    if (!showTerms && !showPrivacy && !showAccessibility) return null;
    const title = showTerms ? "Terms of Service" : showPrivacy ? "Privacy Policy" : "Accessibility Guidelines";
    const content = showTerms 
      ? "Welcome to Easy English. By using our coaching platform powered by VANI AI, you agree to comply with our Terms of Service. Access to standard topics is subject to your selected plan limits. Subscription payments are processed securely, and no real-money transactions are processed in this simulator environment."
      : showPrivacy
      ? "Your privacy is important to us. VANI AI processes audio and conversational text to provide real-time grammatical corrections and vocabulary corrections. We do not store, sell, or analyze your voice recordings for any other purposes."
      : "Easy English is committed to digital accessibility. We support screen readers, adjustable speech synthesizers, manual keyboard inputs, and sound reactive waveforms to make English learning fully inclusive.";

    return (
      <div className="fixed inset-0 bg-black/80 z-[10005] flex items-center justify-center p-5 font-poppins text-white select-none">
        <div className="bg-[#1A1A1A] border border-stone-800 rounded-3xl p-6 w-full max-w-sm text-left relative shadow-2xl">
          <h3 className="text-lg font-bold text-[#FF8C4A] mb-3">{title}</h3>
          <p className="text-xs text-stone-300 leading-relaxed mb-6">{content}</p>
          <button 
            onClick={() => {
              setShowTerms(false);
              setShowPrivacy(false);
              setShowAccessibility(false);
            }}
            className="w-full py-3 bg-[#FF6B2B] hover:bg-[#FF8C55] rounded-xl text-white font-bold text-center text-xs transition active:scale-95"
          >
            I Understand
          </button>
        </div>
      </div>
    );
  };

  const MENU_ITEMS = [
    { icon: <Languages className="w-5 h-5 text-rose-500" />, label: "Express Translator", action: () => { setTranslatorOpen(true); setMenuOpen(false); } },
    { icon: <Compass className="w-5 h-5 text-emerald-500" />, label: "Discover All Topics", action: () => { setScreen("topics"); setMenuOpen(false); } },
    { icon: <History className="w-5 h-5 text-amber-500" />, label: "Practice Log Performance", action: () => { setReportOverlayOpen(true); setMenuOpen(false); } },
    { icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />, label: "User's Account Status", action: () => { setReportOverlayOpen(true); setMenuOpen(false); } },
  ];

  return (
    <div className="relative max-w-md mx-auto min-h-screen flex flex-col bg-stone-50 overflow-hidden shadow-2xl border-x border-stone-200">
      
      {/* ── NEW: Splash Screen ── */}
      {appStage === "splash" && (
        <SplashScreen />
      )}

      {/* ── NEW: Opening Screen ── */}
      {appStage === "opening" && (
        <OpeningScreen
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          otpSent={loginOtpSent}
          setOtpSent={setLoginOtpSent}
          otpValue={otpValue}
          setOtpValue={setOtpValue}
          onContinue={() => {
            localStorage.setItem("vani_opening_completed", "true");
            setAppStage("app");
          }}
          onShowTerms={() => setShowTerms(true)}
          onShowPrivacy={() => setShowPrivacy(true)}
        />
      )}

      {/* ── EXISTING APP ── */}
      {appStage === "app" && (
        <>
          {/* Global Celebrations and Milestone Toasts */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: -45, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92, y: -25 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute top-4 left-4 right-4 z-[9999] bg-slate-900 border border-slate-800 text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div className={`p-2 rounded-xl text-lg flex items-center justify-center shrink-0 ${
              activeToast.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 font-bold' :
              activeToast.type === 'streak' ? 'bg-rose-500/20 text-rose-400 font-bold' :
              'bg-blue-500/20 text-blue-400 font-bold'
            }`}>
              {activeToast.type === 'success' ? '🏆' : activeToast.type === 'streak' ? '🔥' : '✨'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11.5px] font-black tracking-wide leading-tight uppercase text-slate-100">{activeToast.message}</p>
              {activeToast.subMessage && (
                <p className="text-[10px] text-slate-400 font-bold leading-normal mt-0.5">{activeToast.subMessage}</p>
              )}
            </div>
            <button 
              onClick={() => setActiveToast(null)}
              className="text-slate-500 hover:text-slate-300 text-xs p-1 font-black cursor-pointer active:scale-95 duration-100"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic start-up gating overlays */}
      {gateMode === "splash" && renderSplashScreen()}
      {gateMode === "onboarding" && renderOnboardingScreen()}
      {gateMode === "trial_expired" && renderTrialExpiredScreen()}
      {gateMode === "plan_expired" && renderPlanExpiredScreen()}

      {/* Payment Sheet & Success Celebrations */}
      {showPayModal && renderPaymentModal()}
      {showPaySuccess && renderPaymentSuccess()}

      {/* Legal Modals */}
      {renderLegalModals()}
      
      {/* Dynamic Left Hamburger Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <div className="absolute inset-0 z-50 flex">
            {/* Drawer Area */}
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-4/5 bg-white h-full flex flex-col p-6 shadow-2xl z-50 overflow-y-auto"
            >
              <div className="flex items-center gap-3 pb-6 border-b border-stone-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white text-2xl shadow-md">
                  V
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight text-stone-800">
                    <span className="text-rose-500">Easy</span> English
                  </h2>
                  <p className="text-xs text-stone-500 font-semibold">with Coach VANI 🤖</p>
                </div>
              </div>

              <div className="flex-1 py-6 space-y-1">
                {MENU_ITEMS.map((item, index) => (
                  <button 
                    key={index} 
                    onClick={item.action} 
                    className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition active:bg-stone-100 text-stone-700 font-medium text-sm text-left"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => {
                  handleProgressStreak();
                }}
                className="w-full text-left p-4 bg-lime-50 hover:bg-lime-100/60 rounded-2xl border border-lime-200 mb-4 cursor-pointer active:scale-95 transition-all duration-200"
              >
                <p className="text-xs text-lime-800 font-extrabold mb-1 flex items-center gap-1">
                  <span>🔥 Current Streak</span>
                  <span className="animate-pulse text-[10px] bg-lime-200 text-lime-800 px-1.5 py-0.2 rounded-full font-black">TAP +XP</span>
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce">⚡</span>
                  <p className="text-sm font-black text-stone-800">{streak} Days Active</p>
                </div>
              </button>

              <div className="pt-4 border-t border-stone-100 text-center">
                <p className="text-xxs text-stone-400 font-bold">VANI ENG TUTOR VERSION 2.1</p>
              </div>
            </motion.div>

            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="flex-1 bg-black/40 h-full cursor-pointer"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Slide-Up Indian Translation Buddy */}
      <AnimatePresence>
        {translatorOpen && (
          <div className="absolute inset-0 z-40 bg-black/30 flex items-end">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full bg-white rounded-t-[32px] p-6 max-h-[85vh] overflow-y-auto shadow-2xl z-50"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Languages className="w-5 h-5 text-rose-500" />
                  <h3 className="text-lg font-black text-rose-600 uppercase tracking-tight">English Translation Only</h3>
                </div>
                <button 
                  onClick={() => setTranslatorOpen(false)}
                  className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full text-xs font-bold"
                >
                  Close
                </button>
              </div>

              <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                Translate your native thoughts <strong className="text-rose-550 font-bold">strictly into fluent spoken English</strong>! VANI works exclusively to convert and elevate expressions into English only.
              </p>

              {/* Translation flow diagram indicator */}
              <div className="my-3 bg-rose-50/50 rounded-2xl p-3 border border-rose-100 flex items-center justify-between text-center select-none">
                <div className="flex-1">
                  <span className="block text-[10px] font-black text-rose-500 uppercase tracking-wider">Indian Source</span>
                  <span className="block text-xs font-bold text-stone-700 mt-0.5">{selectedSourceLang}</span>
                </div>
                <div className="px-2 font-black text-rose-500 text-sm animate-pulse">➜</div>
                <div className="flex-1">
                  <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-wider">English Output</span>
                  <span className="block text-xs font-bold text-stone-850 mt-0.5">Fluent Conversational</span>
                </div>
              </div>

              {/* Strict constraints notification */}
              <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200/60 flex gap-2 items-start text-left mb-2">
                <span className="text-xs text-amber-600 mt-0.5 shrink-0">⚠️</span>
                <p className="text-[9.5px] text-amber-900 font-extrabold leading-normal uppercase">
                  Strictly Regional to English Conversational revisions only. Translation to other directions is deliberately unsupported.
                </p>
              </div>

              {/* Language Selector for Drawer */}
              <div className="flex gap-2 items-center bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-2 text-xs text-stone-700">
                <span className="font-extrabold shrink-0 text-stone-500 uppercase text-[10px]">Source Language:</span>
                <select
                  value={selectedSourceLang}
                  onChange={(e) => {
                    setSelectedSourceLang(e.target.value);
                    setTranslatorResult(null);
                  }}
                  className="bg-transparent focus:outline-none flex-1 font-black text-rose-500 cursor-pointer"
                >
                  {INDIAN_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="font-medium text-stone-800">
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 space-y-3">
                <div className="relative">
                  <input 
                    type="text" 
                    value={translatorInput}
                    onChange={(e) => setTranslatorInput(e.target.value)}
                    placeholder={
                      selectedSourceLang === "Bengali" 
                        ? "e.g., Ami bhalo achi or আমার টিকিট এখনও কনফার্ম হয়নি..."
                        : selectedSourceLang === "Hindi"
                        ? "e.g., Flight ticket confirm ho gayi hai or मुझे कल छुट्टी चाहिए..."
                        : selectedSourceLang === "Telugu"
                        ? "e.g., Naku tondaraga vellali or నాకు సహాయం కావాలి..."
                        : selectedSourceLang === "Tamil"
                        ? "e.g., Yenakku ungalai pidikkum or எனக்கு ஒரு உதவி வேண்டும்..."
                        : `Type your ${selectedSourceLang} thought here...`
                    }
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 font-medium placeholder-stone-400"
                  />
                  {/* Speech input toggle */}
                  <button
                    type="button"
                    onClick={startTranslatorVoiceRecognition}
                    className={`absolute right-3 top-2.5 p-2 rounded-full transition-all active:scale-90 ${
                      isTranslatorListening
                        ? "bg-rose-500 text-white animate-pulse"
                        : "bg-rose-100 text-rose-500 hover:bg-rose-200"
                    }`}
                    title={`Speak in ${selectedSourceLang}`}
                  >
                    {isTranslatorListening ? (
                      <span className="flex items-center justify-center relative w-4.5 h-4.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping" />
                        <Mic className="w-3.5 h-3.5 shrink-0 z-10" />
                      </span>
                    ) : (
                      <Mic className="w-3.5 h-3.5 shrink-0" />
                    )}
                  </button>
                </div>
                
                <button
                  onClick={() => runQuickTranslate()}
                  disabled={translating || !translatorInput.trim()}
                  className="w-full py-3 bg-rose-500 text-white font-extrabold text-sm rounded-xl hover:bg-rose-600 active:scale-98 transition disabled:opacity-50"
                >
                  {translating ? "Translating Thoughts..." : "Translate to English"}
                </button>
              </div>

              {translatorResult && (
                <div className="mt-5 space-y-4 pt-4 border-t border-stone-100">
                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-100/50">
                    <p className="text-[11px] font-black text-amber-800 tracking-wide uppercase">Simple English Translation</p>
                    <p className="text-sm font-bold text-stone-800 mt-1 leading-snug">
                      "{translatorResult.translatedSimple}"
                    </p>
                  </div>

                  <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100/50">
                    <p className="text-[11px] font-black text-rose-800 tracking-wide uppercase">Polished Conversational English</p>
                    <p className="text-sm font-bold text-stone-800 mt-1 leading-snug italic">
                      "{translatorResult.translatedSmart}"
                    </p>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 flex gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-stone-700">Pronunciation & Use Tip</p>
                      <p className="text-xs text-stone-500 mt-1">{translatorResult.pronunciationTip}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Billing VIP Checkout Overlays & Pages */}
      <AnimatePresence>
        {billingOverlayOpen && (
          <div className="absolute inset-0 bg-[#0D0D0D] z-50 flex flex-col overflow-y-auto no-scrollbar">
            {renderPlanSelectionMarkup({ 
              hideTrialCard: true, 
              onBack: () => setBillingOverlayOpen(false) 
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Database sync Phone OTP Authentication simulator Overlays & Pages */}
      <AnimatePresence>
        {otpOverlayOpen && (
          <div id="otp-overlay-container" className="absolute inset-0 z-50 bg-stone-900/60 flex items-center justify-center p-5 backdrop-blur-xs">
            <motion.div 
              id="otp-authenticator-panel"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl z-50 text-left border border-stone-200 select-none"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-100" id="otp-header">
                <div className="flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Firebase Sync Gateway</span>
                </div>
                <button 
                  id="btn-close-otp"
                  onClick={() => setOtpOverlayOpen(false)}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-400 rounded-full text-[11px] font-extrabold transition"
                >
                  Close
                </button>
              </div>

              {/* Secure banner */}
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-start gap-2.5 mt-4" id="otp-description">
                <Lock className="w-5 h-5 text-indigo-505 shrink-0 mt-0.5 text-indigo-600" />
                <p className="text-[10.5px] text-stone-600 leading-normal font-semibold font-sans">
                  We use verified Google Firestore & Firebase SMS Authentication. Profiles, streaks, memories, and XP achievements sync cleanly.
                </p>
              </div>

              {/* FORM VIEW 1: Send OTP phone input */}
              {!otpSent ? (
                <form onSubmit={handleOTPLoginSimulate} className="mt-4 space-y-4" id="otp-phone-form">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black text-stone-400 tracking-wider block">Enter Indian Mobile Number:</label>
                    <div className="flex border border-stone-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500">
                      <span className="bg-stone-50 px-3 py-2.5 text-xs text-stone-500 font-extrabold border-r border-stone-200 select-none">
                        +91
                      </span>
                      <input 
                        type="tel" 
                        required
                        value={otpPhone}
                        onChange={(e) => setOtpPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                        placeholder="e.g. 98765 43210"
                        className="flex-1 px-3 py-2.5 text-xs font-extrabold tracking-wide focus:outline-none placeholder-stone-400 text-stone-800"
                        id="input-phone-digits"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={otpLoading || otpPhone.length < 10}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 disabled:opacity-45 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
                    id="btn-otp-send-action"
                  >
                    {otpLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Firebase SMS code...</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-4 h-4" />
                        <span>Send Authentication OTP Code</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* FORM VIEW 2: Verify secure SMS authentication code */
                <form onSubmit={verifyOTPCodeSimulate} className="mt-4 space-y-4" id="otp-code-form">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <label className="text-[10px] uppercase font-black text-stone-400 tracking-wider block">Enter SMS verification code:</label>
                      <span className="text-[9.5px] text-amber-600 font-black animate-pulse font-mono bg-amber-50 px-1 border border-amber-200">CODE IS '123456'</span>
                    </div>
                    <input 
                      type="text" 
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').substring(0, 6))}
                      placeholder="Enter 6-digit code"
                      className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-xs font-black text-center tracking-widest focus:outline-none focus:ring-1 focus:ring-indigo-500 text-stone-800"
                      id="input-verification-digits"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={otpLoading || otpCode.length < 6}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 disabled:opacity-45 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
                    id="btn-otp-verify-action"
                  >
                    {otpLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Authenticating SMS credentials...</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4" />
                        <span>Verify OTP and Authorize Sync</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpCode("");
                    }}
                    className="w-full text-center text-stone-400 font-bold text-[10.5px] tracking-wider uppercase hover:text-stone-600 py-1"
                  >
                    Change Phone Number
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Performance Assessment & User Account Overlay */}
      <AnimatePresence>
        {reportOverlayOpen && (
          <div id="report-overlay-container" className="absolute inset-0 z-50 bg-stone-900/60 flex items-end justify-center backdrop-blur-xs select-none">
            <motion.div 
              id="report-overlay-panel"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full bg-white rounded-t-[32px] p-6 max-h-[88vh] overflow-y-auto shadow-2xl z-50 border-t border-stone-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100" id="report-header">
                <div>
                  <h3 className="text-lg font-black tracking-tight text-indigo-950 uppercase">VANI Coach Analytics</h3>
                  <p className="text-[10px] text-stone-500 font-bold">Dynamic Performance Assessment Hub</p>
                </div>
                <button 
                  id="btn-close-report"
                  onClick={() => setReportOverlayOpen(false)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 active:scale-95 text-stone-600 rounded-full text-xs font-black transition"
                >
                  Close
                </button>
              </div>

              {/* TABS NAVIGATION */}
              <div className="flex bg-stone-100 p-1.5 rounded-2xl gap-1 mt-4" id="report-tabs">
                <button
                  id="tab-btn-performance"
                  onClick={() => setReportTab('performance')}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition ${
                    reportTab === 'performance' 
                      ? "bg-white text-rose-500 shadow-xs" 
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  📈 Practice Log
                </button>
                <button
                  id="tab-btn-account"
                  onClick={() => setReportTab('account')}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition ${
                    reportTab === 'account' 
                      ? "bg-white text-indigo-600 shadow-xs" 
                      : "text-stone-500 hover:text-stone-800"
                  }`}
                >
                  ⚙️ User's Account
                </button>
              </div>

              {/* TAB CONTENT 1: performance & practice log */}
              {reportTab === 'performance' && (
                <div className="mt-5 space-y-5 text-left" id="panel-performance">
                  {/* Accent score summary */}
                  <div className="bg-gradient-to-r from-rose-50 to-amber-50 p-4 rounded-3xl border border-rose-100 text-left relative overflow-hidden flex items-center justify-between">
                    <div className="space-y-1 relative z-10">
                      <span className="px-2 py-0.5 bg-rose-500 text-white rounded font-black text-[7.5px] uppercase tracking-wider">Accent Quality</span>
                      <h4 className="text-sm font-black text-stone-900">Pronunciation Accent Score</h4>
                      <p className="text-[10.5px] text-stone-600 leading-snug font-medium">Calculated dynamically across active speaking logs</p>
                    </div>
                    {/* Score Circle */}
                    <div className="relative w-16 h-16 shrink-0 flex items-center justify-center bg-white border border-rose-200 rounded-full shadow-xs">
                      <span className="text-xl font-black text-rose-500">{accentScore}%</span>
                    </div>
                  </div>

                  {/* Competencies */}
                  <div className="space-y-3">
                    <h5 className="text-[10px] uppercase font-black text-stone-400 tracking-wider">Metric Performance</h5>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-stone-50 p-3 rounded-2xl border border-stone-150">
                        <p className="text-[10px] text-stone-400 font-bold">Fluency & Tempo</p>
                        <p className="text-lg font-black text-indigo-950 mt-1">130 WPM</p>
                        <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: "86%" }} />
                        </div>
                        <span className="text-[8.5px] text-emerald-600 font-bold block mt-1">Excellent standard flow</span>
                      </div>

                      <div className="bg-stone-50 p-3 rounded-2xl border border-stone-150">
                        <p className="text-[10px] text-stone-400 font-bold">Grammar Accuracy</p>
                        <p className="text-lg font-black text-indigo-950 mt-1">92%</p>
                        <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div className="bg-rose-500 h-full rounded-full" style={{ width: "92%" }} />
                        </div>
                        <span className="text-[8.5px] text-rose-500 font-bold block mt-1">Superior subject concord</span>
                      </div>

                      <div className="bg-stone-50 p-3 rounded-2xl border border-stone-150">
                        <p className="text-[10px] text-stone-400 font-bold">Vocabulary Size</p>
                        <p className="text-lg font-black text-indigo-950 mt-1">85%</p>
                        <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: "85%" }} />
                        </div>
                        <span className="text-[8.5px] text-amber-600 font-bold block mt-1">Highly expressive phrasing</span>
                      </div>

                      <div className="bg-stone-50 p-3 rounded-2xl border border-stone-150">
                        <p className="text-[10px] text-stone-400 font-bold font-sans">Pause Frequency</p>
                        <p className="text-lg font-black text-indigo-950 mt-1">94%</p>
                        <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full" style={{ width: "94%" }} />
                        </div>
                        <span className="text-[8.5px] text-indigo-600 font-bold block mt-1">Highly natural dialogue</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Timeline logs */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h5 className="text-[10px] uppercase font-black text-stone-400 tracking-wider">Practice log history timeline</h5>
                      <span className="bg-stone-100 text-stone-600 font-bold text-[9.5px] px-2 py-0.5 rounded-full">{topics.filter(t => t.done).length + 3} Completed workouts</span>
                    </div>

                    <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-1 no-scrollbar">
                      {/* Topics that user set as done in this session */}
                      {topics.filter(t => t.done).map((topic) => (
                        <div key={topic.id} className="p-3 bg-white border border-stone-200 rounded-2xl flex items-start gap-3 shadow-xxs">
                          <span className="text-xl p-2 bg-emerald-50 text-emerald-600 rounded-xl">🎯</span>
                          <div className="flex-1 space-y-0.5">
                            <div className="flex justify-between items-baseline">
                              <h6 className="font-extrabold text-stone-850 text-xs truncate max-w-[150px]">{topic.title}</h6>
                              <span className="text-[8.5px] bg-emerald-100/60 text-[#137333] font-black px-1.5 py-0.5 rounded-sm uppercase">PRACTICED TODAY</span>
                            </div>
                            <p className="text-[10.5px] text-stone-500 font-semibold">Fluency Rating: <strong className="text-stone-700">92%</strong> | Theme: {topic.theme}</p>
                            <p className="text-[9.5px] text-rose-500 italic font-bold">Outstanding focus! Continuous dialogue makes perfect.</p>
                          </div>
                        </div>
                      ))}

                      {/* Mocked history logs */}
                      <div className="p-3 bg-white border border-stone-200 rounded-2xl flex items-start gap-3 shadow-xxs">
                        <span className="text-xl p-2 bg-rose-50 text-rose-500 rounded-xl">🗣️</span>
                        <div className="flex-1 space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <h6 className="font-extrabold text-stone-850 text-xs">Introduce Yourself</h6>
                            <span className="text-[8.5px] bg-[#f9ebea] text-[#b03a2e] font-black px-1.5 py-0.5 rounded-sm uppercase">YESTERDAY</span>
                          </div>
                          <p className="text-[10.5px] text-stone-500 font-semibold">Fluency Rating: <strong className="text-stone-700">94%</strong> | Duration: {dailyGoalDone} mins</p>
                          <p className="text-[9.5px] text-emerald-600 font-black">Superb! Clean tone formulation with perfect career goal outlines.</p>
                        </div>
                      </div>

                      <div className="p-3 bg-white border border-stone-200 rounded-2xl flex items-start gap-3 shadow-xxs">
                        <span className="text-xl p-2 bg-amber-50 text-amber-550 rounded-xl">🏫</span>
                        <div className="flex-1 space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <h6 className="font-extrabold text-stone-850 text-xs">Meet Child's Teacher</h6>
                            <span className="text-[8.5px] text-stone-500 font-black px-1.5 py-0.5 rounded-sm bg-stone-100 uppercase">2 DAYS AGO</span>
                          </div>
                          <p className="text-[10.5px] text-stone-500 font-semibold">Fluency Rating: <strong className="text-stone-700">89%</strong> | Duration: 5 mins</p>
                          <p className="text-[9.5px] text-stone-600 font-bold leading-normal">Very polite and highly respectful. Focus slightly on preposition placements next.</p>
                        </div>
                      </div>

                      <div className="p-3 bg-white border border-stone-200 rounded-2xl flex items-start gap-3 shadow-xxs">
                        <span className="text-xl p-2 bg-indigo-50 text-indigo-550 rounded-xl">💼</span>
                        <div className="flex-1 space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <h6 className="font-extrabold text-stone-850 text-xs">Job Interview Practice</h6>
                            <span className="text-[8.5px] text-stone-500 font-black px-1.5 py-0.5 rounded-sm bg-stone-100 uppercase">3 DAYS AGO</span>
                          </div>
                          <p className="text-[10.5px] text-stone-500 font-semibold">Fluency Rating: <strong className="text-stone-700">91%</strong> | Duration: 6 mins</p>
                          <p className="text-[9.5px] text-stone-600 font-bold leading-normal">Awesome usage of robust verbs like "oversee", "spearhead", and "resolve".</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 2: accounts & present subscription status */}
              {reportTab === 'account' && (
                <div className="mt-5 space-y-5 text-left" id="panel-account">
                  {/* Account detail label */}
                  <div className="bg-stone-50 p-4 rounded-3xl border border-stone-200 relative flex flex-col gap-2">
                    <p className="text-[9px] font-black uppercase text-stone-400 tracking-wider">Registered Profile Identification</p>
                    <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-stone-100 shadow-xxs">
                      <div>
                        <p className="text-xs font-black text-stone-800">mtripti85@gmail.com</p>
                        <p className="text-[9.5px] text-stone-400 font-bold mt-0.5">Session Security: {isOtpLoggedIn ? "Authenticated Account Sync Active" : "Local Database Mode"}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-[#137333] font-black rounded-lg text-[9.5px] uppercase">ACTIVE USER</span>
                    </div>
                  </div>

                  {/* Present Subscription status container */}
                  <div className="space-y-4">
                    <h5 className="text-[10px] uppercase font-black text-stone-400 tracking-wider">Present Subscription Status</h5>
                    
                    <div className="bg-white border border-stone-200 p-5 rounded-3xl shadow-xs text-stone-800 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl select-none">
                          {userPlan === "pro" ? "🏆" : userPlan === "premium" ? "👑" : userPlan === "monthly" ? "⚡" : userPlan === "trial" ? "🎟️" : "💎"}
                        </span>
                        <div className="flex-1 text-left">
                          <h4 className="text-sm font-black text-stone-900 capitalize leading-tight">
                            {userPlan === "pro" ? "PRO MASTER Lifetime Access" : `${userPlan} Plan`}
                          </h4>
                          <p className="text-[11px] text-stone-500 font-bold mt-0.5 leading-normal">
                            {userPlan === "none" && "Limited Practice Tier. Upgrade to unlock all features."}
                            {userPlan === "trial" && (trialExpired ? "Expired Active Trial" : `Active VIP Trial (${trialDaysLeft} Days Remaining)`)}
                            {userPlan === "monthly" && "Basic Monthly Tier — Unlimited texts unlocked!"}
                            {userPlan === "premium" && "VIP Premium Fluency Tier — All voice and text unlocked!"}
                            {userPlan === "pro" && "High Priority VIP queue + advanced coaching line"}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-lg text-[9px] uppercase font-extrabold tracking-wider shrink-0">
                          {userPlan === "none" ? "Free" : userPlan}
                        </span>
                      </div>

                      <div className="pt-4 border-t border-stone-150 text-[10.5px] leading-relaxed space-y-2 font-semibold text-stone-500 text-left">
                        <div className="flex justify-between items-center">
                          <span>Allowed General Topics (Scenario Drawer):</span>
                          <span className="text-stone-800 font-extrabold">
                            {userPlan === "pro" || userPlan === "premium" || userPlan === "monthly" ? "All 40 Topics" : userPlan === "trial" && !trialExpired ? "1 Topic ('Introduce Yourself')" : "0 Topics (Locked)"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>VANI Voice Calling capability:</span>
                          <span className={canUseVoiceStation() ? "text-emerald-600 font-extrabold" : "text-amber-650 font-extrabold"}>
                            {canUseVoiceStation() ? "✓ Unlocked & Priorities Ready" : "✗ Blocked — Upgrade to Call VANI"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Text Chat Daily Message Count:</span>
                          <span className="text-stone-800 font-extrabold">
                            {userPlan === "trial" ? `${sessionMsgCount} / 5 messages sent` : (userPlan === "none" ? "Locked" : "✓ Unlimited messages Enabled")}
                          </span>
                        </div>
                      </div>

                      {/* Simulator togglers for testing all plan permutations seamlessly */}
                      <div className="pt-3.5 border-t border-stone-150 space-y-2 text-left bg-stone-50/50 p-3 rounded-2xl">
                        <p className="text-[8.5px] uppercase font-black text-stone-400 tracking-wider">DEV SIMULATION: SWITCH SUBSCRIPTION TIER</p>
                        <div className="grid grid-cols-5 gap-1">
                          {[
                            { id: "None", val: "none" },
                            { id: "Trial", val: "trial" },
                            { id: "Monthly", val: "monthly" },
                            { id: "Premium", val: "premium" },
                            { id: "Pro", val: "pro" }
                          ].map((planOpt) => (
                            <button
                              key={planOpt.id}
                              onClick={() => {
                                setUserPlan(planOpt.val);
                                if (planOpt.val === "trial") {
                                  setTrialStartDate(Date.now() - 1); // active start date
                                  setTrialDaysLeft(7);
                                  setTrialExpired(false);
                                  setSessionMsgCount(0);
                                }
                                playTTS(`Switched to simulated ${planOpt.val} subscription tier.`, 9);
                              }}
                              className={`py-1 text-[8px] font-black uppercase text-center rounded-lg border transition active:scale-95 ${
                                userPlan === planOpt.val 
                                  ? "bg-stone-900 text-white border-stone-950 shadow-xxs" 
                                  : "bg-white border-stone-200 text-stone-500 hover:bg-stone-100"
                              }`}
                            >
                              {planOpt.id}
                            </button>
                          ))}
                        </div>
                        
                        {userPlan === "trial" && (
                          <div className="mt-2 flex items-center justify-between border-t border-stone-150 pt-1.5">
                            <span className="text-[8.5px] font-bold text-stone-400 uppercase">Trial Expiry simulation</span>
                            <button
                              onClick={() => {
                                setTrialExpired(true);
                                setTrialDaysLeft(0);
                                playTTS("Simulated trial expiry. Topic access now locked.", 51);
                              }}
                              className="px-2 py-0.5 bg-red-50 hover:bg-red-100 text-red-650 rounded border border-red-200 text-[8.5px] font-black uppercase active:scale-95 transition"
                            >
                              Expire Trial Now
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Firebase SMS Cloud login status promo */}
                  {!isOtpLoggedIn && (
                    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-3xl flex items-start gap-3 mt-1 shadow-xxs">
                      <div className="text-xl select-none">☁️</div>
                      <div className="flex-1 space-y-1.5">
                        <h6 className="text-[11.5px] font-black text-indigo-950 uppercase tracking-tight">Need Cloud Backup?</h6>
                        <p className="text-[10.5px] text-stone-600 font-semibold leading-normal font-sans">
                          Sync your practice logs and account details globally. Use secure Firebase OTP check-ins immediately.
                        </p>
                        <button 
                          onClick={() => {
                            setReportOverlayOpen(false);
                            setOtpOverlayOpen(true);
                          }}
                          className="mt-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white uppercase text-[9.5px] font-black rounded-lg transition active:scale-95"
                        >
                          Verify phone & Cloud Sync
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Container Content */}
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar pb-16">
        
        {/* APP TOP HEADING BAR */}
        {screen !== "chat" && screen !== "onboarding" && (
          <div className="px-5 py-4 flex items-center justify-between bg-white border-b border-stone-100 shrink-0">
            <button 
              onClick={() => setMenuOpen(true)}
              className="p-2 hover:bg-stone-50 rounded-lg active:scale-95 transition"
            >
              <Menu className="w-6 h-6 text-stone-800" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xl">👩‍🏫</span>
              <h1 className="text-xl font-black text-rose-500 tracking-tight">
                VANI <span className="text-indigo-600 font-extrabold text-[10px] ml-1 px-1.5 py-0.5 rounded-md bg-stone-100 border border-stone-200 uppercase tracking-widest leading-none inline-block align-middle">AI Coach</span>
              </h1>
            </div>

            <button 
              onClick={() => { setScreen("topics"); setSelectedTheme(null); }}
              className="bg-stone-50 hover:bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200 flex items-center gap-1.5 text-xs font-bold text-stone-600 shadow-xxs transition active:scale-95"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{progressPercent}% Done</span>
            </button>
          </div>
        )}

        {/* LOBBY / ONBOARDING SCREEN */}
        {screen === "onboarding" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 flex-1 flex flex-col justify-between max-w-md mx-auto"
          >
            {/* STEP 1: WELCOME & DETAILS PROFILE CAPTURE */}
            {onboardingSubStep === "welcome" && (
              <div className="space-y-5 my-auto text-left py-4">
                {/* Brand Header */}
                <div className="text-center py-4 space-y-2.5 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-tr from-rose-500/10 to-indigo-500/10 rounded-full blur-xl -z-10" />
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 text-white font-black text-3xl shadow-lg border-2 border-white select-none animate-bounce">
                    👩‍🏫
                  </div>
                  <h2 className="text-2xl font-black text-indigo-950 tracking-tight leading-tight pt-1">
                    VANI Voci <span className="text-rose-550 font-extrabold text-[10px] px-2 py-0.5 rounded-md bg-rose-50 border border-rose-100 uppercase tracking-widest ml-1 inline-block align-middle">Smart AI Coach</span>
                  </h2>
                  <h3 className="text-sm font-black text-stone-800 tracking-tight leading-snug">
                    Welcome to Easy English — your AI-powered spoken English partner.
                  </h3>
                  <p className="text-xxs text-stone-500 font-semibold px-4 max-w-sm mx-auto leading-relaxed">
                    Improve accent pronunciation, conquer hesitation, and practice real conversation rounds.
                  </p>
                </div>

                {/* Captured Details */}
                <div className="space-y-4">
                  {/* Name Input */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-150 shadow-xxs space-y-2">
                    <span className="text-[10px] uppercase font-black tracking-widest text-indigo-700 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-rose-500" />
                      Enter Student Name
                    </span>
                    <input 
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Priyanshu, Ananya, Shreya"
                      className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-stone-800 transition placeholder:text-stone-400 focus:outline-none"
                    />
                  </div>

                  {/* Native language select */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-150 shadow-xxs space-y-3">
                    <span className="text-[10px] uppercase font-black tracking-widest text-indigo-700 flex items-center gap-1">
                      <Languages className="w-3.5 h-3.5 text-rose-500" />
                      What is your native regional language?
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { code: "Bengali", name: "বাংলা", flag: "🇧🇩" },
                        { code: "Hindi", name: "हिंदी", flag: "🇮🇳" },
                        { code: "Telugu", name: "తెలుగు", flag: "🇮🇳" },
                        { code: "Tamil", name: "தமிழ்", flag: "🇮🇳" },
                        { code: "Marathi", name: "मराठी", flag: "🇮🇳" },
                        { code: "Urdu", name: "اردو", flag: "🇮🇳" }
                      ].map((lang) => {
                        const isActive = selectedSourceLang === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setSelectedSourceLang(lang.code);
                              const updatedMemories = [...userMemories];
                              updatedMemories[0] = `Your native regional language is ${lang.code}.`;
                              setUserMemories(updatedMemories);
                            }}
                            className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                              isActive 
                                ? "bg-indigo-50 border-indigo-300 text-indigo-950 font-black scale-102" 
                                : "bg-stone-50 hover:bg-stone-100 border-stone-150 text-stone-600"
                            }`}
                          >
                            <span className="text-xs font-bold">{lang.flag} {lang.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Coaching Objective */}
                  <div className="bg-white p-4 rounded-2xl border border-stone-150 shadow-xxs space-y-3">
                    <span className="text-[10px] uppercase font-black tracking-widest text-indigo-700 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-rose-500" />
                      Set Primary Coaching Objective
                    </span>
                    <div className="space-y-1.5">
                      {[
                        { id: "interview", title: "👔 Job Interview Prep & STAR Pitch" },
                        { id: "work", title: "💼 Workplace Meetings & Standups" },
                        { id: "daily", title: "🗣️ Public Speaking & Conversation" }
                      ].map((item) => {
                        const isSelected = onboardingGoal === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setOnboardingGoal(item.id)}
                            className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                              isSelected 
                                ? "bg-indigo-50 border-indigo-300 text-indigo-950 font-bold" 
                                : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700"
                            }`}
                          >
                            <span className="text-xs">{item.title}</span>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? "border-indigo-600 bg-indigo-600" : "border-stone-400"
                            }`}>
                              {isSelected && <Check className="w-2 h-2 text-white stroke-[3px]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      playTTS("Welcome to VANI! Please enter your mobile number to continue with your secure student account creation.", 999);
                      setOnboardingSubStep("phone");
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-indigo-600 hover:opacity-95 active:scale-98 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Mobile Login 📱</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: MOBILE NUMBER LOGIN INPUT */}
            {onboardingSubStep === "phone" && (
              <div className="space-y-6 my-auto text-left py-6">
                <div className="text-center py-2 space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 font-bold text-2xl mb-1 border border-indigo-100">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-indigo-950 tracking-tight leading-none">
                    Enter Mobile Number
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    Please enter your mobile number to continue.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-stone-150 shadow-xxs space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black tracking-widest text-stone-500">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1.5 bg-stone-550 bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 text-xs font-black text-stone-600 select-none shrink-0">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input 
                        type="tel"
                        maxLength={10}
                        value={phoneInput}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setPhoneInput(val);
                          setPhoneNumberError("");
                        }}
                        placeholder="70034 50921"
                        className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300 rounded-xl px-3.5 py-2 text-xs font-bold text-stone-800 transition focus:outline-none"
                      />
                    </div>
                    {phoneNumberError && (
                      <p className="text-[10px] text-rose-500 font-bold">{phoneNumberError}</p>
                    )}
                  </div>

                  <p className="text-[10px] text-stone-400 font-semibold leading-relaxed">
                    By entering, you confirm registration under active Indian cellular services. A secure one-time passcode will be sent.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      if (phoneInput.length < 10) {
                        setPhoneNumberError("Please enter a valid 10-digit mobile number.");
                        return;
                      }
                      setOtpLoading(true);
                      setTimeout(() => {
                        setOtpLoading(false);
                        const cleanFormattedPhone = `+91 ${phoneInput.substring(0,5)} ${phoneInput.substring(5)}`;
                        setOtpSentLabel(cleanFormattedPhone);
                        setOnboardingSubStep("otp");
                        playTTS("We’ve sent a secure OTP to your number for verification. It is 2026.", 999);
                      }, 900);
                    }}
                    disabled={otpLoading}
                    className="w-full py-3.5 bg-indigo-950 hover:bg-stone-900 active:scale-98 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    {otpLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Security OTP 🚀</span>
                        <Send className="w-3.5 h-3.5 text-indigo-300" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setOnboardingSubStep("welcome")}
                    className="w-full py-2.5 text-stone-500 text-xxs font-bold text-center underline hover:text-stone-700"
                  >
                    ← Back to Details Setup
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: OTP VERIFICATION CODE */}
            {onboardingSubStep === "otp" && (
              <div className="space-y-6 my-auto text-left py-6">
                <div className="text-center py-2 space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 font-bold text-2xl mb-1 border border-emerald-100">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-indigo-950 tracking-tight leading-none">
                    Security Verification
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    We’ve sent a secure OTP to your number for verification.
                  </p>
                  <p className="text-xxs font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-100/50 rounded-full py-0.5 px-3 inline-block">
                    Sent to {otpSentLabel || "+91 Mobile"}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-stone-150 shadow-xxs space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-black tracking-widest text-stone-500 block">
                      Enter 4-Digit One Time Passcode
                    </label>
                    <div className="flex gap-2 justify-center">
                      <input 
                        type="text"
                        maxLength={4}
                        value={otpInput}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setOtpInput(val);
                          setOtpError("");
                        }}
                        placeholder="e.g. 2026"
                        className="w-36 tracking-[0.75em] text-center bg-stone-50 border-2 border-stone-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300 rounded-xl px-3 py-2.5 text-base font-black text-indigo-950 transition focus:outline-none placeholder:tracking-normal placeholder:text-xxs placeholder:font-bold"
                      />
                    </div>
                    {otpError && (
                      <p className="text-[10px] text-rose-500 font-bold text-center">{otpError}</p>
                    )}
                  </div>

                  {/* Simulator Hint */}
                  <div className="bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100 text-center">
                    <span className="text-[9px] text-indigo-700 font-bold">💡 Testing code is: <strong className="text-indigo-950 font-black">2026</strong> (Click of auto prefill is active)</span>
                  </div>

                  <div className="flex items-center justify-between text-xxs text-stone-400 font-bold">
                    <span>Didn't receive passcode?</span>
                    <button 
                      onClick={() => {
                        setOtpInput("2026");
                        playTTS("OTP Code 2026 filled automatically.", 999);
                      }}
                      className="text-indigo-650 text-indigo-605 text-indigo-600 font-black hover:underline"
                    >
                      Prefill OTP 🔐
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      if (!otpInput) {
                        setOtpError("Please enter the 4-digit code.");
                        return;
                      }
                      if (otpInput !== "2026" && otpInput !== "1234") {
                        setOtpError("Incorrect OTP passcode entered (Enter 2026 to verify).");
                        return;
                      }
                      setOtpLoading(true);
                      setTimeout(() => {
                        setOtpLoading(false);
                        setIsPhoneLoggedIn(true);
                        setIsOtpLoggedIn(true);
                        setOnboardingSubStep("trial_offer");
                        playTTS("Congratulations! Log in successful. Let's start your premium English speaking training now.", 999);
                      }, 950);
                    }}
                    disabled={otpLoading}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
                  >
                    {otpLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Verify & Log In Securely 🎉</span>
                        <Unlock className="w-3.5 h-3.5 text-emerald-100" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setOnboardingSubStep("phone")}
                    className="w-full py-2.5 text-stone-500 text-xxs font-bold text-center underline hover:text-stone-700"
                  >
                    Change phone number
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PREMIUM TRIAL OFFER CARD SCREEN */}
            {onboardingSubStep === "trial_offer" && (
              <div className="space-y-5 my-auto text-left py-2">
                {/* Header Badge */}
                <div className="text-center py-2 space-y-1 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-200">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-[9px] rounded-full uppercase tracking-widest leading-none shadow-xxs animate-pulse mb-1">
                    👑 Premium Access Trial Invitation
                  </span>
                  <p className="text-xs text-stone-600 font-bold leading-relaxed px-2">
                    Start your 7-day premium trial for just ₹7. Cancel anytime.
                  </p>
                </div>

                {/* Grid checklist of premium assets requested */}
                <div className="bg-white p-4.5 rounded-3xl border border-stone-150 shadow-xxs space-y-3.5">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#D81B60] block select-none border-b border-stone-100 pb-1.5">
                    What you unlock in your ₹7 VIP Trial Account:
                  </span>

                  <div className="space-y-2.5">
                    {[
                      { title: "Unlock 'Introduce Yourself' active practice module", icon: "🎙️" },
                      { title: "VANI interactive conversational practice (5 msgs/session)", icon: "💬" },
                      { title: "Native Indian regional accent pronunciation checks", icon: "📊" },
                      { title: "Conquer speech hesitation confidence rounds", icon: "⚡" },
                      { title: "All other 40+ topics & voice dialing will remain locked (Requires monthly subscription to open)", icon: "🔒" }
                    ].map((perk, i) => (
                      <div key={i} className={`flex gap-2 items-start text-xs font-semibold ${perk.icon === "🔒" ? "text-stone-400 font-bold" : "text-stone-850"}`}>
                        <span className="text-sm shrink-0 leading-none mt-0.5">{perk.icon}</span>
                        <div className="space-y-0.5">
                          <span className="block">{perk.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl p-3 border border-amber-100 text-center space-y-1">
                    <span className="text-[11px] font-black text-rose-500 block">₹7.00 for full 7-day VIP Trial Access</span>
                    <span className="text-[9px] text-stone-500 font-bold block">No auto-deduct trap! Unused scenarios stay locked. Upgrade to basic monthly to unlock rest.</span>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <button
                    onClick={() => {
                      playTTS("Secure checkout initiated. Select your UPI app of entering your custom UPI handle.", 999);
                      setOnboardingSubStep("upi_payment");
                    }}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-550 hover:opacity-95 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition flex items-center justify-center gap-2.5 animate-shimmer scale-102"
                  >
                    <span>Activate 7-Day Access with UPI (₹7 Only) ⚡</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>

                  <button
                    onClick={() => {
                      localStorage.setItem("vani_onboarding_completed", "true");
                      setUserPlan("none");
                      setIsPremium(false);
                      setScreen("home");
                      playTTS("Welcome to Easy English. You are now entered with Free basic limits. Upgrade to Premium anytime from your home dashboard.", 999);
                      try {
                        confetti({
                          particleCount: 80,
                          spread: 60,
                          origin: { y: 0.8 }
                        });
                      } catch (e) {}
                    }}
                    className="w-full py-2.5 text-stone-400 hover:text-stone-600 text-xxs font-black text-center block"
                  >
                    Or skip trial and enter standard Free tier
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: UPI PAYMENT SCREEN METRIC */}
            {onboardingSubStep === "upi_payment" && (
              <div className="space-y-5 my-auto text-left py-4">
                <div className="text-center py-2 space-y-1 bg-stone-900 text-white rounded-3xl p-5 relative overflow-hidden shadow-md">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-20 rotate-45" />
                  <span className="text-stone-400 font-bold text-xxs uppercase tracking-widest block">🔒 Pay securely via BHIM UPI</span>
                  <div className="text-2xl font-black text-white mt-1">₹7.00</div>
                  <p className="text-[10px] text-emerald-400 font-extrabold tracking-wider mt-1 flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3 fill-emerald-400 stroke-none" /> VANI PRESET VERIFIED MERCHANT
                  </p>
                </div>

                {/* Method selector */}
                <div className="bg-white p-4.5 rounded-3xl border border-stone-150 shadow-xxs space-y-4">
                  <span className="text-[10px] uppercase font-black tracking-widest text-stone-500 block">
                    Choose Your Favorite UPI Mobile App
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "gpay", label: "Google Pay", color: "border-blue-200 text-blue-700 bg-blue-50/20", icon: "🟢" },
                      { id: "phonepe", label: "PhonePe", color: "border-purple-200 text-purple-700 bg-purple-50/20", icon: "🟣" },
                      { id: "paytm", label: "Paytm APP", color: "border-sky-205 border-sky-200 text-sky-700 bg-sky-50/20", icon: "🔵" },
                      { id: "bhim", label: "BHIM / Other", color: "border-emerald-200 text-emerald-700 bg-emerald-50/20", icon: "🟠" }
                    ].map((app) => {
                      const isSel = selectedUPIApp === app.id;
                      return (
                        <button
                          key={app.id}
                          onClick={() => {
                            setSelectedUPIApp(app.id);
                            setCustomVPA("");
                          }}
                          className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 ${
                            isSel 
                              ? "border-indigo-650 border-indigo-500 ring-2 ring-indigo-100 bg-white shadow-xs font-black" 
                              : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700"
                          }`}
                        >
                          <span className="text-base">{app.icon}</span>
                          <span className="text-xs">{app.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Manual UPI VPA entry */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <label className="text-[9px] uppercase font-black tracking-widest text-stone-500 block">
                      Or entering manual UPI Address / VPA ID
                    </label>
                    <input 
                      type="text"
                      value={customVPA}
                      onChange={(e) => {
                        setCustomVPA(e.target.value);
                        setSelectedUPIApp("custom");
                      }}
                      placeholder="e.g. Priyanshu@oksbi, anya@ybl"
                      className="w-full bg-stone-50 border border-stone-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300 rounded-xl px-3.5 py-2 text-xs font-bold text-stone-800 transition focus:outline-none placeholder:text-stone-400"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      setSubmittingPayment(true);
                      setWaveHeaving(true);
                      
                      // Process trial activation beautifully
                      setTimeout(() => {
                        setSubmittingPayment(false);
                        setWaveHeaving(false);
                        setUserPlan("trial");
                        setTrialStartDate(Date.now());
                        setTrialDaysLeft(7);
                        setTrialExpired(false);
                        setSessionMsgCount(0);
                        setIsPremium(false); // set to false because trial is not technically the VIP master plan, but rather trial which opens Introduce Yourself and 5 msgs
                        setTrialTimeLeft(604800); // Reset trial countdown to full 7 days
                        setOnboardingSubStep("success");
                        playTTS("Congratulations! Your seven day premium trial has been successfully activated. Unlock unlimited conversation speaking.", 999);
                        try {
                          confetti({
                            particleCount: 150,
                            spread: 80,
                            origin: { y: 0.6 }
                          });
                        } catch (e) {}
                      }, 2000);
                    }}
                    disabled={submittingPayment}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition flex items-center justify-center gap-2"
                  >
                    {submittingPayment ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying with UPI gateway...</span>
                      </div>
                    ) : (
                      <>
                        <span>Approve & Pay ₹7 securely 🔒</span>
                        <Unlock className="w-3.5 h-3.5 text-white" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setOnboardingSubStep("trial_offer")}
                    className="w-full py-2.5 text-stone-500 text-xxs font-bold text-center underline hover:text-stone-700"
                  >
                    ← Back to premium trial options
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: TRIAL ACTIVATED SUCCESS! */}
            {onboardingSubStep === "success" && (
              <div className="space-y-6 my-auto text-left py-4">
                <div className="text-center py-4 space-y-3 relative">
                  {/* Glowing background circles */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -z-10" />
                  
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 text-white font-black text-4xl shadow-lg border-2 border-white animate-bounce">
                    🎉
                  </div>
                  
                  <h3 className="text-xl font-black text-indigo-950 tracking-tight leading-none">
                    Congratulations!
                  </h3>
                  <p className="text-xs font-bold text-stone-700 tracking-tight">
                    Your ₹7 VIP Trial is active. Only 'Introduce Yourself' is unlocked. Other features will unlock on Monthly/Premium subscription.
                  </p>
                  
                  <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-4 py-1 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest mx-auto">
                    <Zap className="w-3.5 h-3.5 fill-emerald-500 stroke-none" />
                    Trial active — 7 Days left
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-stone-150 shadow-xxs space-y-4">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#D81B60] block">
                    Your Student Access Status:
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-stone-705 select-none">
                    {[
                      { icon: "🎙️", label: "Introduce Yourself Unlocked" },
                      { icon: "🤖", label: "Interactive VANI Chat" },
                      { icon: "📊", label: "Accent Feedback On" },
                      { icon: "🔒", label: "Voice Dial Locked" },
                      { icon: "🔒", label: "40+ Scenarios Locked" },
                      { icon: "🔒", label: "STAR Interview Locked" }
                    ].map((perk, i) => (
                      <div key={i} className={`p-2.5 rounded-xl border flex items-center gap-2 ${perk.icon === "🔒" ? "bg-stone-50 border-stone-100 text-stone-400" : "bg-emerald-50/50 border-emerald-150 text-emerald-950 font-bold"}`}>
                        <span className="text-base shrink-0">{perk.icon}</span>
                        <span className="text-[9px] uppercase font-black tracking-tight leading-3 block">{perk.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      localStorage.setItem("vani_onboarding_completed", "true");
                      setScreen("home");
                    }}
                    className="w-full py-4 bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:opacity-95 active:scale-98 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition flex items-center justify-center gap-1.5"
                  >
                    <span>Enter Personalized VANI Dashboard ✨</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
        {screen === "home" && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col bg-[#f2f5f9] min-h-screen text-stone-800 pb-20 p-4 space-y-4"
          >
            {/* Top clean header */}
            <div className="flex items-center justify-between py-1 bg-transparent select-none">
              <div className="text-left">
                <h1 className="text-xl font-black text-indigo-950 tracking-tight leading-none">VANI Dashboard</h1>
                <p className="text-[10px] text-stone-500 font-bold mt-1">Your Personal English Speaking Coach</p>
              </div>

              {/* Pill shaped interactive Report Button */}
              <button 
                onClick={() => setReportOverlayOpen(true)}
                className="border border-sky-200/50 shadow-[0_2px_8px_rgba(14,165,233,0.1)] px-4 py-1.5 rounded-full bg-white text-sky-600 font-extrabold text-xs flex items-center gap-1.5 hover:bg-sky-50 active:scale-95 transition"
              >
                <span>📈 Progress Report</span>
              </button>
            </div>

            {/* Premium Trial active simulation badge - neat and clean */}
            <div className="p-3 bg-white border border-stone-200 rounded-2xl shadow-xxs text-left flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1 bg-purple-100 text-purple-700 rounded-lg text-sm select-none">👑</span>
                <div>
                  <h4 className="font-black text-stone-800 text-[10px] tracking-wide uppercase leading-none">VIP Premium Status</h4>
                  <p className="text-[10px] text-stone-500 mt-1 leading-snug">
                    {userPlan === "trial" ? "🎁 7-Day Active Trial!" : (isPremium ? "Premium Active! Unlimited speech and dialogues." : "Free basic tier. Upgrade to unlock all exercises.")}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsPremium(!isPremium);
                  setTrialTimeLeft(isPremium ? 0 : 604800);
                  playTTS(isPremium ? "Now practicing in free tier" : "Coaching trial activated successfully!", 123);
                }}
                className={`px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[9px] font-black uppercase tracking-wider transition shrink-0 border border-stone-200`}
              >
                {isPremium ? "Go Free" : "Go VIP"}
              </button>
            </div>

            {/* VANI Turbo / High Fidelity speaking switcher */}
            <div className="p-3 bg-white border border-stone-200 rounded-2xl shadow-xxs text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 bg-rose-50 border border-rose-100 text-rose-500 rounded-xl text-xs select-none">⚡</span>
                  <div>
                    <h4 className="font-black text-stone-800 text-[10px] tracking-wide uppercase leading-none">VANI Speaking Speed</h4>
                    <p className="text-[9.5px] text-stone-500 mt-1.5 leading-tight">
                      {useInstantTurboVoice 
                        ? "⚡ Turbo Engine: INSTANT responses, 0ms lag!" 
                        : "🎙️ AI High-Fidelity: Premium synthesis audio."}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-stone-50 border border-stone-250/20 p-1 rounded-xl self-end sm:self-auto shrink-0 font-sans">
                  <button
                    onClick={() => {
                      setUseInstantTurboVoice(true);
                      localStorage.setItem("vani_use_instant_voice", "true");
                      playTTS("Now using VANI Turbo speaking mode. Responses are instant!", 123);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-tight transition active:scale-95 ${
                      useInstantTurboVoice 
                        ? "bg-stone-900 text-white shadow-xxs" 
                        : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                    }`}
                  >
                    Turbo (Instant)
                  </button>
                  <button
                    onClick={() => {
                      setUseInstantTurboVoice(false);
                      localStorage.setItem("vani_use_instant_voice", "false");
                      playTTS("Now using High Fidelity speaking mode. Responses are generated with rich premium tone.", 123);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-tight transition active:scale-95 ${
                      !useInstantTurboVoice 
                        ? "bg-stone-900 text-white shadow-xxs" 
                        : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                    }`}
                  >
                    High-Fi AI
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION: 4 Curated Scenario Topics for Homepage */}
            <div className="space-y-3.5 text-left">
              <div className="flex justify-between items-baseline select-none">
                <h3 className="text-base font-black text-indigo-950 tracking-tight uppercase">Featured Scenarios</h3>
                <button 
                  onClick={() => {
                    setSelectedTheme(null);
                    setScreen("topics");
                  }}
                  className="text-[10px] font-black text-rose-500 hover:underline hover:text-rose-600 transition tracking-wider uppercase"
                >
                  See All →
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    id: 1,
                    title: "Introduce Yourself",
                    theme: "About Yourself",
                    tag: "BEGINNER 👨‍🎓",
                    tagColor: "bg-teal-500",
                    desc: "Perfect your professional elevator pitch dynamically.",
                    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=350&q=75",
                    item: topics.find(t => t.id === 1)
                  },
                  {
                    id: 10,
                    title: "Job Interview",
                    theme: "Interview Pro",
                    tag: "PRO PREP ⭐",
                    tagColor: "bg-amber-500",
                    desc: "Train for behavioral interviews & tough questions.",
                    img: "https://images.unsplash.com/photo-1541560052-5e137f229371?w=350&q=75",
                    item: topics.find(t => t.id === 10)
                  },
                  {
                    id: 19,
                    title: "Office Chat",
                    theme: "Work Place",
                    tag: "OFFICE 💼",
                    tagColor: "bg-indigo-600",
                    desc: "Simulate small talk & daily business cooperation.",
                    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=350&q=75",
                    item: topics.find(t => t.id === 19)
                  },
                  {
                    id: 31,
                    title: "Meet Teacher",
                    theme: "Daily Life",
                    tag: "DAILY LIFE 🏫",
                    tagColor: "bg-rose-500",
                    desc: "Discuss exam scores & feedback with tutors gracefully.",
                    img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=350&q=75",
                    item: topics.find(t => t.id === 31)
                  }
                ].map((scen) => {
                  return (
                    <div 
                      key={scen.id}
                      onClick={() => scen.item && openConversationTopic(scen.item)}
                      className="bg-white rounded-3xl overflow-hidden border border-stone-150 shadow-xxs cursor-pointer hover:shadow-sm hover:border-stone-250 transition duration-300 flex flex-col group text-left"
                    >
                      <div className="h-28 relative overflow-hidden select-none bg-stone-100">
                        <SafeImage 
                          src={scen.img} 
                          alt={scen.title} 
                          fallbackText={scen.title}
                          className="w-full h-full object-cover group-hover:scale-102 transition duration-300" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent pointer-events-none" />
                        <span className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[7.5px] font-black text-white uppercase tracking-wider ${scen.tagColor}`}>
                          {scen.tag}
                        </span>
                      </div>
                      <div className="p-3.5 flex flex-col flex-1 justify-between bg-white space-y-2">
                        <div>
                          <h4 className="text-[12px] font-black text-stone-900 tracking-tight leading-snug group-hover:text-rose-500 transition line-clamp-1">{scen.title}</h4>
                          <p className="text-[9px] text-stone-500 font-bold leading-relaxed line-clamp-2">{scen.desc}</p>
                        </div>
                        <div className="flex flex-col gap-2 pt-1 border-t border-stone-100 pt-1.5 mt-auto">
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] uppercase tracking-wider font-extrabold text-stone-400">{scen.theme}</span>
                            <span className="text-[10px] text-rose-500 font-black group-hover:translate-x-0.5 transition shrink-0">Speak →</span>
                          </div>
                          <button
                            id={`btn-quick-study-${scen.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (scen.item) {
                                openConversationTopic(scen.item, true);
                              }
                            }}
                            className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 border border-amber-600 text-white hover:text-white text-[8px] font-extrabold uppercase tracking-wide rounded-xl transition flex items-center justify-center gap-1 shadow-3xs hover:scale-101 active:scale-99"
                          >
                            <span>⚡ Quick Study</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CHOOSE CONVERSATION DIVIDER HEADER */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-stone-200"></div>
              <span className="text-[9px] font-black tracking-widest text-stone-400 uppercase">CHOOSE CONVERSATION</span>
              <div className="flex-1 h-px bg-stone-200"></div>
            </div>

            {/* Theme Filter grid formatted inside elegant white circular cards */}
            <div className="grid grid-cols-4 gap-2 py-1 select-none">
              {[
                { name: "About Yourself", count: topics.filter(t => t.theme === "About Yourself").length, icon: "👨‍👩‍👦", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&q=70" },
                { name: "Interview Pro",  count: topics.filter(t => t.theme === "Interview Pro").length,  icon: "👨‍💼", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=70" },
                { name: "Work Place",     count: topics.filter(t => t.theme === "Work Place").length,     icon: "💼", img: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=100&q=70" },
                { name: "Daily Life",     count: topics.filter(t => t.theme === "Daily Life").length,     icon: "💬", img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&q=70" }
              ].map((theme) => {
                const isActive = homeActiveTheme === theme.name;
                return (
                  <button
                    key={theme.name}
                    onClick={() => {
                      setHomeActiveTheme(isActive ? null : theme.name);
                    }}
                    className="flex flex-col items-center group active:scale-95 transition text-center"
                  >
                    <div className={`w-14 h-14 rounded-full border overflow-hidden shadow-xxs relative flex items-center justify-center bg-stone-100 transition ${
                      isActive 
                        ? "ring-2 ring-rose-500 scale-102 border-rose-500 bg-rose-50/50" 
                        : "border-stone-250 ring-2 ring-stone-100 group-hover:ring-rose-200"
                    }`}>
                      <SafeImage src={theme.img} alt={theme.name} fallbackText={theme.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-indigo-950/15 group-hover:bg-transparent transition" />
                    </div>
                    <span className="text-[10px] font-black text-stone-700 mt-2 leading-tight tracking-tight max-w-[76px] truncate">{theme.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Premium Interactive Scrollable Topics & Scenarios Browser Block */}
            <div className="space-y-3 bg-stone-50 border border-stone-200 p-3.5 rounded-[24px]">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">🔍</span>
                <input
                  type="text"
                  value={homeSearchQuery}
                  onChange={(e) => setHomeSearchQuery(e.target.value)}
                  placeholder="Search 40+ conversation topics & questions..."
                  className="w-full bg-white pl-8 pr-7 py-2 rounded-xl text-xs font-semibold text-stone-850 outline-none border border-stone-200 focus:border-rose-400 placeholder:text-stone-400 focus:shadow-xs transition"
                />
                {homeSearchQuery && (
                  <button 
                    onClick={() => setHomeSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 hover:text-stone-700 font-extrabold"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex justify-between items-center px-0.5">
                <p className="text-[9px] font-black uppercase text-stone-400 tracking-wider">
                  {homeActiveTheme ? `${homeActiveTheme} Topics` : "All Topics"} 
                  {homeSearchQuery ? ` matching "${homeSearchQuery}"` : ""} ({filteredHomeTopics.length})
                </p>
                {(homeActiveTheme || homeSearchQuery) && (
                  <button
                    onClick={() => { setHomeActiveTheme(null); setHomeSearchQuery(""); }}
                    className="text-[9px] font-black text-rose-500 hover:underline uppercase tracking-wider"
                  >
                    Show All
                  </button>
                )}
              </div>

              {/* Scrollable grid listing all options */}
              <div className="max-h-[260px] overflow-y-auto pr-1 space-y-2 no-scrollbar scroll-smooth" id="home-questions-scroll-panel">
                {filteredHomeTopics.length === 0 ? (
                  <div className="bg-white p-6 rounded-2xl border border-stone-150 text-center text-stone-500 text-xs font-semibold">
                    No conversation scenarios matched the active filters.
                  </div>
                ) : (
                  filteredHomeTopics.map((t) => {
                    const isSubLocked = !canAccess(t.id - 1);
                    const isLocked = t.locked || isSubLocked;
                    return (
                      <div 
                        key={t.id}
                        onClick={() => openConversationTopic(t)}
                        className={`flex items-center gap-3 bg-white p-2.5 rounded-xl border transition duration-150 relative ${
                          isLocked 
                            ? "opacity-65 bg-stone-50 border-stone-150 cursor-pointer hover:border-rose-350" 
                            : "border-stone-150 hover:border-rose-300 hover:shadow-xxs cursor-pointer active:scale-99"
                        }`}
                      >
                        <SafeImage src={t.img} alt={t.title} fallbackText={t.title} className="w-10 h-10 rounded-lg object-cover shrink-0 select-none bg-stone-100" />
                        
                        <div className="flex-1 text-left min-w-0">
                          <span className="text-[7.5px] font-black text-stone-450 tracking-wider uppercase">
                            {isSubLocked ? "🔒 Subscription Locked" : t.cat}
                          </span>
                          <h4 className="font-extrabold text-[11px] text-stone-850 leading-none truncate mt-0.5">{t.title}</h4>
                          <span className="text-[7.5px] text-[#137333] font-bold block mt-1 uppercase tracking-wide">Theme: {t.theme}</span>
                        </div>

                        <div className="shrink-0 flex items-center justify-center p-1 select-none text-[9.5px] font-black text-rose-500 pr-2">
                          {t.done ? (
                            <span className="text-emerald-500 font-bold bg-emerald-50 px-1 py-0.5 rounded text-[8px] uppercase">Practiced ✓</span>
                          ) : isLocked ? (
                            <div className="flex items-center gap-1 bg-stone-105 text-stone-500 px-1.5 py-0.5 rounded text-[8px] uppercase">
                              <Lock className="w-2.5 text-stone-400" />
                              {isSubLocked ? "Unlock" : t.locked ? "Prereq" : "Lock"}
                            </div>
                          ) : (
                            <span className="flex items-center gap-0.5">
                              Speak
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Section: Latest & Trending Yellow-to-Cyan Gradient Banner */}
            <div 
              onClick={() => {
                openConversationTopic({ 
                  id: 0, 
                  title: "Talk About Anything", 
                  cat: "Speaking", 
                  theme: "General", 
                  locked: false, 
                  done: false, 
                  img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=75" 
                });
                playTTS("Let's talk in English! You can type in any regional Indian language or Hinglish, and VANI will automatically translate it for you inside the chat.", 999);
              }}
              className="bg-gradient-to-r from-amber-100 via-amber-50 to-cyan-100 border border-amber-200/40 rounded-3xl p-5 shadow-sm text-left relative overflow-hidden flex gap-4 items-center justify-between cursor-pointer hover:shadow-md transition"
            >
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl" />
              <div className="space-y-1 relative z-10 max-w-[70%]">
                <span className="px-2 py-0.5 bg-amber-500 text-stone-900 rounded font-black text-[7px] uppercase tracking-wider">NEW MODULE</span>
                <h4 className="text-sm font-black text-stone-950">Latest & Trending</h4>
                <p className="text-[10px] text-stone-600 font-bold leading-snug">Things people are talking about. Practice translating localized ideas to smart English!</p>
              </div>

              {/* Stacked visually engaging cards */}
              <div className="relative w-16 h-12 shrink-0 select-none">
                <div className="absolute top-0 right-0 w-11 h-11 bg-white p-0.5 rounded-lg shadow-md border border-stone-150 rotate-12 transform">
                  <SafeImage src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=80&q=60" alt="Finance" fallbackText="HDFC" className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="absolute top-1 right-2 w-11 h-11 bg-white p-0.5 rounded-lg shadow-md border border-stone-150 -rotate-12 transform">
                  <SafeImage src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=80&q=60" alt="Workplace" fallbackText="Nestle" className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="absolute top-2 right-4 w-11 h-11 bg-white p-0.5 rounded-lg shadow-lg border border-stone-150 rotate-3 transform">
                  <SafeImage src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=80&q=60" alt="Local" fallbackText="Farmer" className="w-full h-full object-cover rounded-md" />
                </div>
              </div>
            </div>

            {/* Streak trigger statistics tracker card */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 text-left flex items-center justify-between gap-3 shadow-sm">
              <div className="space-y-1">
                <p className="text-[9px] text-stone-400 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  <span>Coach Speaking Goal</span>
                </p>
                <p className="text-[11px] font-extrabold text-stone-800">
                  Progressing <span className="text-rose-500 font-black">{dailyGoalDone}</span> of <span className="text-stone-500">{dailyGoalMins} mins</span> goal!
                </p>
              </div>
              <button 
                onClick={() => {
                  handleProgressStreak();
                }}
                className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100/80 cursor-pointer border border-rose-100 px-3 py-2 rounded-xl text-rose-500 text-xxs font-black uppercase tracking-widest active:scale-95 transition-all duration-200"
              >
                <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-bounce" />
                <span>{streak} Days</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* SCREEN 2: ALL TOPICS PAGE */}
        {screen === "topics" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col bg-[#e6f4ea] min-h-screen text-stone-800 pb-36 p-5 space-y-6 text-left animate-fade-in"
          >
            {/* Header section with completion progress derived from Screenshot 1 */}
            <div>
              <div className="flex justify-between items-baseline select-none">
                <div>
                  <h2 className="text-3xl font-black text-[#137333] tracking-tight animate-pulse">Topics</h2>
                  <p className="text-[12px] text-stone-600 font-bold mt-1">Completed Topics</p>
                </div>
                {/* Big Bold Red Badge */}
                <div className="text-4xl font-serif italic text-rose-500 font-black tracking-tighter filter drop-shadow-sm pr-1">
                  {completedCount}
                </div>
              </div>
              
              {/* Minty beautiful slider progress bar */}
              <div className="w-full bg-white h-3 rounded-full mt-3 overflow-hidden shadow-inner border border-emerald-100/50 flex">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                  style={{ width: `${progressPercent || 3}%` }}
                />
              </div>
            </div>

            {/* RECOMMENDED FOR YOU HORIZONTAL SCROLL LIST */}
            <div className="space-y-3 animate-slide-left">
              <h3 className="text-base font-black text-emerald-950 tracking-tight">Recommended for you</h3>
              <div className="flex gap-3.5 overflow-x-auto pb-2.5 no-scrollbar scroll-smooth select-none">
                {[
                  {
                    id: 1,
                    title: "Introduce Yourself",
                    cat: "Speaking",
                    theme: "About Yourself",
                    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=350&q=75",
                    item: topics.find(t => t.id === 1)
                  },
                  {
                    id: 10,
                    title: "Job Interview",
                    cat: "Speaking",
                    theme: "Interview Pro",
                    img: "https://images.unsplash.com/photo-1541560052-5e137f229371?w=350&q=75",
                    item: topics.find(t => t.id === 10)
                  },
                  {
                    id: 23,
                    title: "Make New Friends",
                    cat: "Speaking",
                    theme: "Daily Life",
                    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=350&q=75",
                    item: topics.find(t => t.id === 23)
                  }
                ].map((rec) => {
                  return (
                    <div 
                      key={rec.id}
                      onClick={() => rec.item && openConversationTopic(rec.item)}
                      className="w-48 bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-xxs shrink-0 cursor-pointer hover:shadow-md transition duration-200 active:scale-98 text-left"
                    >
                      <div className="h-28 overflow-hidden select-none bg-stone-150">
                        <SafeImage src={rec.img} alt={rec.title} fallbackText={rec.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3 bg-white">
                        <h5 className="font-extrabold text-stone-850 text-xs leading-snug tracking-tight truncate">{rec.title}</h5>
                        <span className="text-[10px] font-extrabold text-[#137333] uppercase tracking-wide mt-2 block">{rec.cat}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* THEMES CIRCULAR SELECTORS */}
            <div className="space-y-3 select-none animate-fade-in">
              <h3 className="text-base font-black text-emerald-950 tracking-tight">Themes</h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { name: "About Yourself", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&q=75" },
                  { name: "Interview Pro",  img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=75" },
                  { name: "Work Place",     img: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=100&q=75" },
                  { name: "Daily Life",     img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&q=75" }
                ].map((th) => {
                  const count = topics.filter(t => t.theme === th.name).length;
                  const isSelect = selectedTheme === th.name;
                  return (
                    <button
                      key={th.name}
                      onClick={() => setSelectedTheme(selectedTheme === th.name ? null : th.name)}
                      className="flex flex-col items-center group transition"
                    >
                      <div className={`w-14 h-14 rounded-full border border-stone-250 overflow-hidden shadow-xxs flex items-center justify-center transition ${
                        isSelect ? "ring-2 ring-emerald-500 scale-102" : "ring-2 ring-stone-100"
                      }`}>
                        <SafeImage src={th.img} alt={th.name} fallbackText={th.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10.5px] font-black text-stone-800 tracking-tight mt-2 block truncate w-full">{th.name}</span>
                      <span className="text-[8.5px] text-stone-500 font-bold block mt-0.5">{count} Topics</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ALL TOPICS LIST CATALOG */}
            <div className="space-y-3">
              <h3 className="text-base font-black text-emerald-950 tracking-tight">
                {selectedTheme ? `${selectedTheme} Topics` : "All Topics"}
              </h3>
              
              <div className="space-y-2.5">
                {topics
                  .filter(t => !selectedTheme || t.theme === selectedTheme)
                  .map((t) => {
                    const isSubLocked = !canAccess(t.id - 1);
                    const isLocked = t.locked || isSubLocked;
                    return (
                      <div 
                        key={t.id}
                        onClick={() => openConversationTopic(t)}
                        className={`flex items-center gap-3.5 bg-white p-3 rounded-2xl border transition duration-150 relative ${
                          isLocked 
                            ? "opacity-65 bg-stone-50 border-stone-205 cursor-pointer hover:border-emerald-350" 
                            : "border-stone-150 shadow-xxs hover:border-emerald-300 hover:shadow-xs cursor-pointer active:scale-99"
                        }`}
                      >
                        <SafeImage src={t.img} alt={t.title} fallbackText={t.title} className="w-14 h-14 rounded-xl object-cover shrink-0 select-none bg-stone-100" />
                        
                        <div className="flex-1 text-left min-w-0">
                          <span className="text-[9px] font-black text-stone-400 tracking-wider uppercase">
                            {isSubLocked ? "🔒 Subscription Locked" : t.cat}
                          </span>
                          <h4 className="font-extrabold text-xs text-stone-850 leading-snug truncate mt-0.5">{t.title}</h4>
                          <p className="text-[9px] text-[#0f5132] font-bold tracking-tight uppercase mt-1">Theme: {t.theme}</p>
                        </div>

                        <div className="shrink-0 flex items-center justify-center p-1 select-none">
                          {t.done ? (
                            <div className="w-5.5 h-5.5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                              <Check className="w-3" />
                            </div>
                          ) : isLocked ? (
                            <div className="flex items-center gap-1 bg-stone-100 text-stone-550 px-2 py-0.5 rounded text-[8.5px] uppercase font-black">
                              <Lock className="w-3 text-stone-400" />
                              {isSubLocked ? "Unlock" : "Prereq"}
                            </div>
                          ) : (
                            <ChevronRight className="w-4 h-4 text-stone-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* STICKY ACTION PIPELINE BAR ABOVE NAVIGATION FOR UNSURE */}
            <div className="fixed bottom-[68px] left-[5%] right-[5%] max-w-[90%] bg-white border border-stone-200 shadow-lg px-4 py-3 rounded-full flex items-center justify-between z-30 select-none">
              <div className="flex items-center gap-1.5 font-black text-xs text-stone-800 uppercase tracking-widest leading-none">
                <span className="text-xl">❓?</span> UNSURE?
              </div>
              <button 
                onClick={() => openConversationTopic({ id: 0, title: "Talk About Anything", cat: "Speaking", theme: "General", locked: false, done: false, img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=75" })}
                className="px-5 py-2.5 rounded-full bg-[#e07a5f] hover:bg-[#d66d51] text-white font-black text-[10.5px] uppercase tracking-wider shadow-sm transition active:scale-95"
              >
                Talk About Anything
              </button>
            </div>
          </motion.div>
        )}



        {/* SCREEN 4: DIAL CALL VOICE PRACTICE BOARD */}
        {screen === "call" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col justify-center overflow-y-auto no-scrollbar p-6 bg-stone-50"
            id="call-screen-container"
          >
            {!canUseVoiceStation() ? (
              /* LOCKED STATE (trial users) */
              <div 
                id="voice-station-locked-state" 
                className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none"
              >
                <div 
                  id="lock-icon-container" 
                  className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6 border border-stone-200 shadow-xs"
                >
                  <span className="text-4xl">🔒</span>
                </div>
                
                <h2 
                  id="locked-title" 
                  className="text-2xl font-black text-rose-650 tracking-tight uppercase"
                >
                  VANI Voice Personality Station
                </h2>
                
                <p 
                  id="locked-description" 
                  className="text-stone-605 font-bold text-sm max-w-sm mt-4 leading-relaxed"
                >
                  This feature is not available on Monthly but avalo at Premium plans and above.
                </p>

                <div className="mt-8 w-full max-w-xs space-y-3">
                  <button
                    id="btn-upgrade-monthly"
                    onClick={() => {
                      setSelectedPlanPrice(99);
                      setBillingOverlayOpen(true);
                    }}
                    className="w-full py-3.5 px-6 rounded-2xl font-black uppercase text-xs tracking-wider bg-rose-500 hover:bg-rose-600 active:scale-98 text-white shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    🚀 Upgrade to Monthly — ₹99/mo
                  </button>
                  
                  <p 
                    id="locked-subtext" 
                    className="text-stone-400 text-[11px] font-semibold"
                  >
                    Upgrade to speak live with VANI and practice real conversations.
                  </p>
                </div>
                
                <button
                  id="locked-go-back"
                  onClick={() => setScreen("home")}
                  className="mt-10 text-stone-500 font-bold hover:underline py-1 text-xs uppercase tracking-wider"
                >
                  Go Back Home
                </button>
              </div>
            ) : (
              /* UNLOCKED STATE (monthly/premium) */
              <div 
                id="voice-station-unlocked-state" 
                className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-8 text-center text-white bg-slate-900 rounded-3xl border border-white/5 shadow-2xl relative select-none my-auto"
              >
                <div 
                  id="call-icon-container" 
                  className="w-24 h-24 bg-gradient-to-tr from-purple-600 via-rose-500 to-amber-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.45)] animate-pulse"
                >
                  <span className="text-4xl animate-bounce">📞</span>
                </div>
                
                <h2 
                  id="unlocked-title" 
                  className="text-2xl font-black text-white tracking-tight uppercase"
                >
                  VANI Voice Personality Station
                </h2>
                
                <p 
                  id="unlocked-subtitle" 
                  className="text-stone-300 font-medium text-sm max-w-sm mt-4 leading-relaxed"
                >
                  Have a real-time spoken conversation with Coach VANI. Practice pronunciation, fluency, and natural English speech.
                </p>

                <div className="mt-8 w-full max-w-xs space-y-4">
                  <button
                    id="btn-start-voice-practice"
                    onClick={() => {
                      setVoiceToastMessage("Voice session starting...");
                      setTimeout(() => {
                        setVoiceToastMessage("");
                      }, 4000);
                    }}
                    className="w-full py-4 px-6 rounded-2xl font-black uppercase text-xs tracking-wider bg-violet-600 hover:bg-violet-700 active:scale-98 text-white shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    🎙️ Start Voice Practice
                  </button>

                  <button
                    id="btn-voice-back"
                    onClick={() => setScreen("home")}
                    className="w-full text-center text-xs text-stone-400 hover:text-white font-bold uppercase tracking-wider py-1"
                  >
                    Back
                  </button>
                </div>

                {/* Nice Toast simulation overlay */}
                {voiceToastMessage && (
                  <div 
                    id="voice-toast-notification"
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-violet-950/90 border border-violet-500/30 text-violet-200 text-xs font-extrabold uppercase px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce"
                  >
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                    <span>{voiceToastMessage}</span>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* SCREEN 5: CHAT SCREEN WITH VANI */}
        {screen === "chat" && (
          <div className="flex-1 flex flex-col bg-stone-50 h-[calc(100vh-64px)] relative">
            
            {/* CHAT BAR TOP INDICATOR */}
            <div className="bg-white border-b border-stone-100 px-4 py-3 flex items-center gap-3 shrink-0">
              <button 
                onClick={() => setScreen("topics")}
                className="p-1 hover:bg-stone-50 rounded-lg transition active:scale-95 shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-stone-600" />
              </button>

              <div className="relative shrink-0 select-none">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-lg shadow-sm">
                  👩‍🏫
                </div>
                {/* pulsating green active bubble */}
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-bounce" />
              </div>

              <div className="flex-1 text-left min-w-0">
                <h3 className="text-sm font-extrabold text-stone-800 leading-none">Coach VANI</h3>
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  <span className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider">● Online Tutor</span>
                  {quickStudyActive && (
                    <span className="px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[7px] uppercase rounded tracking-wider shadow-3xs animate-pulse">
                      ⚡ Quick Study Mode
                    </span>
                  )}
                </div>
              </div>

              {selectedTopic && (
                <div className="text-right max-w-[120px] shrink-0 flex flex-col items-end gap-1">
                  <p className="text-xxs font-black text-rose-500 truncate leading-none">{selectedTopic.title}</p>
                  <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest truncate leading-none">{selectedTopic.cat}</p>
                  {!selectedTopic.done && (
                    <button
                      onClick={markCurrentTopicAsDone}
                      className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[8px] tracking-wider font-extrabold rounded-md border border-emerald-200 transition uppercase whitespace-nowrap"
                    >
                      ✓ Done
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* MESSAGE INTERACTION HISTORY CONTAINER */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {chatMessages.map((m, index) => {
                const isUser = m.role === "user";
                return (
                  <div key={index} className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}>
                    
                    {/* Chat Bubble card */}
                    <div className="flex items-end gap-2 max-w-[85%]">
                      {!isUser && (
                        <span className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 flex items-center justify-center text-8px text-white select-none shadow-xxs">
                          👩
                        </span>
                      )}

                      <div className={`p-6 rounded-3xl text-left relative ${isUser ? "bg-stone-850 text-white rounded-br-xs shadow-md" : "bg-white text-stone-850 border border-stone-150 rounded-bl-sm shadow-md"}`}>
                        <p className="font-bold text-[24px] md:text-[26px] leading-relaxed pr-8">{m.content}</p>

                        {!isUser && (
                          <button
                            onClick={() => playTTS(m.content, index)}
                            disabled={ttsLoading}
                            className="absolute right-3 bottom-3 p-1.5 rounded-full hover:bg-stone-100 text-rose-500 bg-white shadow-xxs border border-stone-200"
                            title="Listen Pronunciation"
                          >
                            <Volume2 className={`w-4.5 h-4.5 ${playingAudioIndex === index ? "animate-pulse scale-110 text-emerald-600" : ""}`} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* VANI MULTILINGUAL TRANSLATION BLOCK */}
                    {isUser && (m.translationLoading || m.translationText) && (
                      <TranslationBlock 
                        text={m.translationText} 
                        loading={m.translationLoading === true} 
                      />
                    )}

                    {/* VANI EDUCATIONAL PEDAGOGICAL TIPS BLOCK */}
                    {!isUser && (m.grammarFeedback || m.vocabBoost) && (
                      <div className="ml-8 max-w-[85%] bg-white/70 backdrop-blur-xxs border border-stone-100 p-4 rounded-2xl space-y-3 text-left shadow-xxs">
                        <div className="flex items-center gap-1.5 pb-2 border-b border-stone-150 font-black text-[12px] text-rose-500 tracking-wider">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span>COACH VANI'S SPEAKING CHECK</span>
                        </div>

                        {m.grammarFeedback && (
                          <div>
                            <span className="font-extrabold text-stone-500 text-[11px] tracking-wider uppercase block">Grammar Tune-up</span>
                            <p className="text-[18px] font-bold text-stone-800 leading-relaxed mt-1 bg-stone-50 p-2.5 rounded-xl border border-stone-150">{m.grammarFeedback}</p>
                          </div>
                        )}

                        {m.vocabBoost && (
                          <div>
                            <span className="font-extrabold text-stone-500 text-[11px] tracking-wider uppercase block">Confidence vocabulary upgrade</span>
                            <p className="text-[18px] font-extrabold text-stone-900 leading-relaxed mt-1">{m.vocabBoost}</p>
                          </div>
                        )}

                        {m.bilingualTip && (
                          <div className="pt-1 text-xs text-emerald-700 font-black">
                            🌾 Desi expression: {m.bilingualTip}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {loadingReply && (
                <div className="flex items-center gap-2 text-left">
                  <span className="w-7 h-7 bg-rose-500/20 rounded-full flex items-center justify-center text-xs animate-bounce select-none">
                    👩‍🏫
                  </span>
                  <div className="bg-white p-3.5 rounded-2xl border border-stone-150 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-ping" />
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-ping delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-ping delay-200" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* CHAT INPUT FORM BOARD */}
            <div className="bg-white border-t border-stone-150 p-4 flex items-center gap-3 shadow-inner shrink-0 z-10">
              
              {/* Voice Input Microphone - Now swapped with 'Mark Topic Done' button, super accessible */}
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all active:scale-95 shrink-0 ${
                  isListening 
                    ? "bg-rose-500 text-white animate-pulse shadow-md" 
                    : "bg-rose-100 hover:bg-rose-200 text-rose-600 border border-rose-200 shadow-sm"
                }`}
                title={isListening ? "Listening... Tap to stop" : "Voice Typing Mode"}
              >
                <Mic className="w-10 h-10 shrink-0" />
              </button>

              <form 
                onSubmit={handleChatSubmit} 
                className="flex-1 flex bg-stone-50 border border-stone-200 rounded-3xl overflow-hidden px-4 py-2 bg-white shadow-sm items-center"
              >
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Respond to VANI in English..."
                  className="flex-1 bg-transparent border-none outline-none py-3 text-[25px] placeholder:text-[22px] text-stone-850 font-bold min-h-[64px]"
                  disabled={loadingReply}
                />
              </form>

              <button
                onClick={() => handleChatSubmit()}
                disabled={loadingReply || !chatInput.trim()}
                className="w-20 h-20 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white flex items-center justify-center rounded-3xl shadow-md transition disabled:opacity-40 shrink-0"
              >
                <Send className="w-8 h-8" />
              </button>
            </div>
            
          </div>
        )}

      </div>

      {/* BOTTOM TAB-NAVIGATION BAR */}
      {screen !== "chat" && screen !== "onboarding" && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-stone-150 py-1.5 pb-2.5 flex justify-around items-center shrink-0 z-20 shadow-md">
          {[
            { id: "home", icon: <Home className="w-5 h-5" />, label: "Home" },
            { id: "topics", icon: <BookOpen className="w-5 h-5" />, label: "Topics" },
            { id: "call", icon: <PhoneCall className="w-5 h-5" />, label: "Call" },
          ].map((tab) => {
            const isActive = screen === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setScreen(tab.id); setSelectedTheme(null); }}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${isActive ? "text-rose-500" : "text-stone-400 hover:text-stone-600"}`}
              >
                <div className="relative">
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabOutline"
                      className="absolute -inset-2 bg-rose-50 rounded-xl -z-10"
                      transition={{ type: "spring", damping: 15 }}
                    />
                  )}
                  {tab.icon}
                </div>
                <span className="text-[10.5px] font-black tracking-wide leading-none">{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

        </>
      )}

      {/* ── NEW: Terms Modal (global) ── */}
      {showTerms && (
        <TermsSheet
          onClose={() => setShowTerms(false)}
        />
      )}

      {/* ── NEW: Privacy Modal (global) ── */}
      {showPrivacy && (
        <PrivacySheet
          onClose={() => setShowPrivacy(false)}
        />
      )}

    </div>
  );
}

// ── Splash Screen ─────────────────────────────
function SplashScreen() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg," +
        "#EEF4FF 0%, #F8F0FF 50%," +
        "#FFF5E6 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
      overflow: "hidden"
    }}>

      {/* Twinkling star particles */}
      <style>{`
        @keyframes twinkle {
          0%,100% { opacity:0.2; transform:scale(0.8); }
          50% { opacity:1; transform:scale(1.2); }
        }
        @keyframes floatUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes glowPulse {
          0%,100% { filter: drop-shadow(0 0 8px rgba(139,47,201,0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(139,47,201,0.8)); }
        }
        @keyframes dot {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.4); opacity: 1; }
        }
      `}</style>

      {/* Stars background */}
      {[...Array(12)].map((_,i) => (
        <div key={i} style={{
          position: "absolute",
          width: i%3===0 ? 6 : 4,
          height: i%3===0 ? 6 : 4,
          borderRadius: "50%",
          background: "#8B2FC9",
          top: `${10 + (i * 7.2) % 70}%`,
          left: `${5 + (i * 13) % 90}%`,
          animation:
            `twinkle ${1.5 + i*0.3}s ` +
            `${i*0.2}s ease-in-out infinite`,
          opacity: 0.3
        }} />
      ))}

      {/* Devi Saraswati Avatar Illustration */}
      {/* SVG-based artistic avatar */}
      <div style={{
        animation:
          "floatUp 1s ease forwards, " +
          "glowPulse 3s 1s ease-in-out infinite",
        marginBottom: 24
      }}>
        <svg width="160" height="180"
          viewBox="0 0 160 180"
          xmlns="http://www.w3.org/2000/svg">

          {/* Halo / divine glow ring */}
          <ellipse cx="80" cy="42" rx="44" ry="44"
            fill="none"
            stroke="url(#haloGrad)"
            strokeWidth="3"
            strokeDasharray="6 4"
            opacity="0.7"/>
          <defs>
            <radialGradient id="haloGrad">
              <stop offset="0%"
                stopColor="#FFD700"/>
              <stop offset="100%"
                stopColor="#FF8C00"/>
            </radialGradient>
            <radialGradient id="skinGrad"
              cx="50%" cy="40%">
              <stop offset="0%"
                stopColor="#FDDBB4"/>
              <stop offset="100%"
                stopColor="#F5C99A"/>
            </radialGradient>
            <linearGradient id="sareeGrad"
              x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%"
                stopColor="#8B2FC9"/>
              <stop offset="100%"
                stopColor="#E07A5F"/>
            </linearGradient>
          </defs>

          {/* Inner halo filled soft */}
          <ellipse cx="80" cy="42" rx="40" ry="40"
            fill="rgba(255,215,0,0.08)"/>

          {/* Body / saree */}
          <ellipse cx="80" cy="148" rx="46" ry="38"
            fill="url(#sareeGrad)" opacity="0.9"/>

          {/* Neck */}
          <rect x="72" y="88" width="16" height="18"
            rx="8" fill="url(#skinGrad)"/>

          {/* Face */}
          <ellipse cx="80" cy="72" rx="28" ry="30"
            fill="url(#skinGrad)"/>

          {/* Hair */}
          <ellipse cx="80" cy="50" rx="28" ry="18"
            fill="#2C1810"/>
          <ellipse cx="55" cy="68" rx="8" ry="16"
            fill="#2C1810"/>
          <ellipse cx="105" cy="68" rx="8" ry="16"
            fill="#2C1810"/>

          {/* Hair bun / juda */}
          <ellipse cx="80" cy="38" rx="12" ry="10"
            fill="#2C1810"/>
          <circle cx="80" cy="30" r="5"
            fill="#FFD700"/>

          {/* Bindi */}
          <circle cx="80" cy="60" r="3"
            fill="#FF4444"/>

          {/* Eyes */}
          <ellipse cx="70" cy="70" rx="5" ry="4"
            fill="white"/>
          <ellipse cx="90" cy="70" rx="5" ry="4"
            fill="white"/>
          <circle cx="71" cy="70" r="3"
            fill="#2C1810"/>
          <circle cx="91" cy="70" r="3"
            fill="#2C1810"/>
          <circle cx="72" cy="69" r="1"
            fill="white"/>
          <circle cx="92" cy="69" r="1"
            fill="white"/>

          {/* Eyebrows */}
          <path d="M64 64 Q70 61 76 64"
            stroke="#2C1810" strokeWidth="2"
            fill="none" strokeLinecap="round"/>
          <path d="M84 64 Q90 61 96 64"
            stroke="#2C1810" strokeWidth="2"
            fill="none" strokeLinecap="round"/>

          {/* Smile */}
          <path d="M73 82 Q80 88 87 82"
            stroke="#C27B5A" strokeWidth="2"
            fill="none" strokeLinecap="round"/>

          {/* Nose */}
          <ellipse cx="80" cy="77" rx="2" ry="1.5"
            fill="#C27B5A" opacity="0.6"/>

          {/* Earrings */}
          <circle cx="52" cy="74" r="5"
            fill="#FFD700" opacity="0.9"/>
          <circle cx="108" cy="74" r="5"
            fill="#FFD700" opacity="0.9"/>

          {/* Necklace */}
          <path d="M66 98 Q80 106 94 98"
            stroke="#FFD700" strokeWidth="2.5"
            fill="none" strokeLinecap="round"/>

          {/* Veena / book hint (knowledge symbol) */}
          <rect x="96" y="110" width="22" height="16"
            rx="3" fill="#F5DEB3" opacity="0.9"/>
          <line x1="98" y1="115"
            x2="116" y2="115"
            stroke="#8B4513" strokeWidth="1"/>
          <line x1="98" y1="119"
            x2="116" y2="119"
            stroke="#8B4513" strokeWidth="1"/>
          <text x="99" y="124"
            fontSize="7" fill="#8B4513"
            fontWeight="bold">ABC</text>

          {/* Lotus in other hand */}
          <circle cx="44" cy="118" r="8"
            fill="#FF9EAF" opacity="0.8"/>
          <circle cx="44" cy="118" r="4"
            fill="#FFD700"/>

          {/* Saree gold border */}
          <ellipse cx="80" cy="148" rx="46" ry="38"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            opacity="0.6"/>

        </svg>
      </div>

      {/* App name */}
      <div style={{
        fontSize: 32,
        fontWeight: 900,
        letterSpacing: -0.5,
        animation: "floatUp 1s 0.3s ease both"
      }}>
        <span style={{ color: "#E07A5F" }}>
          Easy
        </span>
        <span style={{ color: "#2D6A4F" }}>
          {" "}English
        </span>
      </div>

      {/* Tagline */}
      <div style={{
        fontSize: 15,
        color: "#666",
        marginTop: 8,
        letterSpacing: 0.3,
        animation: "floatUp 1s 0.5s ease both"
      }}>
        with Coach VANI 🤖
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: 13,
        color: "#999",
        marginTop: 6,
        fontStyle: "italic",
        animation: "floatUp 1s 0.7s ease both"
      }}>
        English learning comes alive!
      </div>

      {/* Bottom wave */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        background:
          "linear-gradient(to top," +
          "rgba(139,47,201,0.15), transparent)"
      }} />

      {/* Loading dots */}
      <div style={{
        position: "absolute",
        bottom: 40,
        display: "flex",
        gap: 8
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 8, height: 8,
            borderRadius: "50%",
            background: "#8B2FC9",
            animation:
              `dot 1.2s ${i*0.2}s` +
              ` ease-in-out infinite`
          }} />
        ))}
      </div>

    </div>
  );
}

interface OpeningScreenProps {
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  otpSent: boolean;
  setOtpSent: (val: boolean) => void;
  otpValue: string;
  setOtpValue: (val: string) => void;
  onContinue: () => void;
  onShowTerms: () => void;
  onShowPrivacy: () => void;
}

// ── Opening / Login Screen ────────────────────
function OpeningScreen({
  phoneNumber, setPhoneNumber,
  otpSent, setOtpSent,
  otpValue, setOtpValue,
  onContinue, onShowTerms, onShowPrivacy
}: OpeningScreenProps) {
  const [loading, setLoading] = useState(false);

  const handleGetOTP = () => {
    if (phoneNumber.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1200);
  };

  const handleVerifyOTP = () => {
    if (otpValue.length < 4) return;
    // In production connect to real OTP service
    // For personal project: any 4+ digit OTP
    onContinue();
  };

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      background: "#F0F4FF",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      zIndex: 998
    }} className="no-scrollbar">

      <style>{`
        @keyframes fadeIn {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      {/* Hero image area */}
      <div style={{
        position: "relative",
        height: 250,
        overflow: "hidden",
        background:
          "linear-gradient(135deg," +
          "#C8E6FF, #E8D5FF)",
        flexShrink: 0
      }}>
        {/* Sparky-style: people learning */}
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.85
          }}
        />

        {/* App name overlay */}
        <div style={{
          position: "absolute",
          top: 20,
          left: 0, right: 0,
          textAlign: "center"
        }}>
          <div style={{
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: -0.5
          }}>
            <span style={{ color: "#E07A5F" }}>
              Easy
            </span>
            <span style={{ color: "#fff",
              textShadow:
                "0 2px 8px rgba(0,0,0,0.3)" }}>
              {" "}English
            </span>
          </div>
        </div>

        {/* Trusted badge */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          background: "rgba(30,30,30,0.75)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10
        }}>
          <span style={{ fontSize: 14 }}>
            ⭐⭐⭐⭐⭐
          </span>
          <span style={{
            color: "white",
            fontSize: 11,
            fontWeight: 600
          }}>
            English learning comes alive!
          </span>
        </div>
      </div>

      {/* Login card */}
      <div style={{
        flex: 1,
        background: "white",
        borderRadius: "24px 24px 0 0",
        marginTop: -16,
        padding: "24px 20px 32px",
        animation: "fadeIn 0.5s ease forwards",
        position: "relative",
        zIndex: 10
      }}>

        {/* Heading */}
        <div style={{
          textAlign: "center",
          marginBottom: 20
        }}>
          <div style={{
            fontSize: 24,
            fontWeight: 950,
            color: "#1A1A1A",
            letterSpacing: "-0.5px"
          }}>
            Speak and Learn
          </div>
          <div style={{
            fontSize: 14,
            color: "#777",
            marginTop: 4,
            fontWeight: "600"
          }}>
            with your AI Coach VANI
          </div>
          {/* Carousel dots */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginTop: 10
          }}>
            <div style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: "#ccc"
            }} />
            <div style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: "#8B2FC9"
            }} />
          </div>
        </div>

        {/* Phone input row */}
        {!otpSent ? (
          <>
            <div style={{
              display: "flex",
              gap: 10,
              marginBottom: 14
            }}>
              {/* Country code */}
              <div style={{
                background: "#F5F5F5",
                borderRadius: 12,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                flexShrink: 0,
                border: "1.5px solid #E8E8E8"
              }}>
                <span style={{ fontSize: 18 }}>
                  🇮🇳
                </span>
                <span style={{
                  fontWeight: 700,
                  fontSize: 14
                }}>+91</span>
              </div>

              {/* Phone number input */}
              <div style={{
                flex: 1,
                background: "#F5F5F5",
                borderRadius: 12,
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: "1.5px solid #E8E8E8"
              }}>
                <span style={{ fontSize: 16 }}>
                  📱
                </span>
                <input
                  type="text"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={e =>
                    setPhoneNumber(
                      e.target.value
                        .replace(/\D/g, "")
                    )
                  }
                  placeholder="Phone Number"
                  style={{
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    fontSize: 14,
                    flex: 1,
                    fontFamily: "inherit",
                    fontWeight: "bold"
                  }}
                />
              </div>
            </div>

            {/* Get OTP button */}
            <button
              onClick={handleGetOTP}
              disabled={
                phoneNumber.length < 10 ||
                loading
              }
              style={{
                width: "100%",
                background:
                  phoneNumber.length < 10
                    ? "#ccc"
                    : "linear-gradient(135deg," +
                      "#E07A5F,#C85A3F)",
                border: "none",
                borderRadius: 14,
                padding: "14px",
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                cursor:
                  phoneNumber.length < 10
                    ? "not-allowed"
                    : "pointer",
                marginBottom: 14,
                transition: "all 0.2s",
                letterSpacing: 0.3
              }}>
              {loading
                ? "Sending OTP..."
                : "Get OTP"}
            </button>
          </>
        ) : (
          <>
            {/* OTP input */}
            <div style={{
              textAlign: "center",
              marginBottom: 14
            }}>
              <div style={{
                fontSize: 12,
                color: "#555",
                marginBottom: 10,
                fontWeight: "600"
              }}>
                OTP sent to +91 {phoneNumber}
              </div>
              <input
                type="text"
                maxLength={6}
                value={otpValue}
                onChange={e =>
                  setOtpValue(e.target.value.replace(/\D/g, ""))
                }
                placeholder="Enter OTP"
                style={{
                  width: "100%",
                  border: "2px solid #8B2FC9",
                  borderRadius: 12,
                  padding: "12px 14px",
                  fontSize: 18,
                  fontWeight: 700,
                  textAlign: "center",
                  outline: "none",
                  letterSpacing: 4,
                  fontFamily: "inherit",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <button
              onClick={handleVerifyOTP}
              style={{
                width: "100%",
                background:
                  "linear-gradient(135deg," +
                  "#8B2FC9,#6A1E9E)",
                border: "none",
                borderRadius: 14,
                padding: "14px",
                color: "white",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                marginBottom: 14,
                letterSpacing: 0.3
              }}>
              Verify & Continue
            </button>
            <button
              onClick={() => setOtpSent(false)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                color: "#888",
                fontSize: 12,
                cursor: "pointer",
                marginBottom: 8,
                fontWeight: "600"
              }}>
              ← Change number
            </button>
          </>
        )}

        {/* Divider */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          margin: "4px 0 14px"
        }}>
          <div style={{
            flex: 1, height: 1,
            background: "#eee"
          }} />
          <span style={{
            color: "#aaa",
            fontSize: 11,
            fontWeight: 800
          }}>OR</span>
          <div style={{
            flex: 1, height: 1,
            background: "#eee"
          }} />
        </div>

        {/* Google Sign In */}
        <button
          onClick={onContinue}
          style={{
            width: "100%",
            background: "white",
            border: "1.5px solid #E0E0E0",
            borderRadius: 14,
            padding: "12px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 20,
            color: "#333"
          }}>
          <svg width="18" height="18"
            viewBox="0 0 48 48" className="shrink-0">
            <path fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22
              9.21 3.6l6.85-6.85C35.9 2.38
              30.47 0 24 0 14.62 0 6.51 5.38
              2.56 13.22l7.98 6.19C12.43
              13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09
              -.38-4.55H24v9.02h12.94c-.58
              2.96-2.26 5.48-4.78 7.18l7.73
              6c4.51-4.18 7.09-10.36
              7.09-17.65z"/>
            <path fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76
              -2.99-.76-4.59s.27-3.14.76
              -4.59l-7.98-6.19C.92 16.46 0
              20.12 0 24c0 3.88.92 7.54 2.56
              10.78l7.97-6.19z"/>
            <path fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13
              15.89-5.81l-7.73-6c-2.15
              1.45-4.92 2.3-8.16 2.3-6.26
              0-11.57-4.22-13.47-9.91l-7.98
              6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Sign in with Google
        </button>

        {/* Terms text */}
        <div style={{
          textAlign: "center",
          fontSize: 11,
          color: "#888",
          lineHeight: 1.6,
          fontWeight: "600"
        }}>
          By proceeding you agree to our{" "}
          <span
            onClick={onShowTerms}
            style={{
              color: "#8B2FC9",
              fontWeight: 800,
              cursor: "pointer",
              textDecoration: "underline"
            }}>
            Terms and Conditions
          </span>
          {" "}and{" "}
          <span
            onClick={onShowPrivacy}
            style={{
              color: "#8B2FC9",
              fontWeight: 800,
              cursor: "pointer",
              textDecoration: "underline"
            }}>
            Privacy Policy
          </span>
        </div>

      </div>
    </div>
  );
}

interface SheetProps {
  onClose: () => void;
}

// ── Terms & Conditions Bottom Sheet ───────────
function TermsSheet({ onClose }: SheetProps) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 10010,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end"
    }}>
      {/* Dark overlay */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)"
        }}
      />

      {/* Sheet */}
      <div style={{
        position: "relative",
        background: "white",
        borderRadius: "22px 22px 0 0",
        maxHeight: "88vh",
        display: "flex",
        flexDirection: "column",
        zIndex: 1
      }}>

        {/* Drag handle */}
        <div style={{
          width: 40,
          height: 4,
          background: "#DDD",
          borderRadius: 4,
          margin: "12px auto 0"
        }} />

        {/* Scrollable content */}
        <div style={{
          overflowY: "auto",
          padding: "16px 24px 30px",
          flex: 1
        }} className="no-scrollbar">

          <h2 style={{
            fontSize: 16,
            fontWeight: 900,
            color: "#1A1A1A",
            marginBottom: 20,
            textTransform: "uppercase",
            letterSpacing: 0.3
          }}>
            Terms and Conditions of Access or Use
          </h2>

          {[
            {
              title: "Acceptance of Terms",
              body:
                "By accessing and using the Easy " +
                "English app (a personal educational " +
                "project by an independent developer), " +
                "you acknowledge your agreement to " +
                "adhere to these Terms and Conditions. " +
                "Please review these terms carefully " +
                "as they govern your use of this app. " +
                "If any part is not agreeable to you, " +
                "we request that you stop using it."
            },
            {
              title: "Nature of This Project",
              body:
                "Easy English with Coach VANI is an " +
                "independent personal project developed " +
                "by an individual developer. It is not " +
                "owned or operated by any registered " +
                "company or corporate entity. This app " +
                "is built to help Indian learners " +
                "improve their spoken English skills " +
                "using AI technology."
            },
            {
              title: "Subscription and Payment",
              body:
                "When you start the trial (₹7 for 7 " +
                "days) or subscribe to a monthly plan, " +
                "you agree to the applicable fee which " +
                "will be charged via your selected " +
                "payment method. The trial period " +
                "grants limited access to 30% of app " +
                "features. Monthly plans unlock up to " +
                "70% of features. Premium plans unlock " +
                "100% of all features including VANI " +
                "Voice Personality Station."
            },
            {
              title: "Refund and Cancellation Policy",
              body:
                "All payments made are non-refundable " +
                "once processed. You may cancel your " +
                "subscription at any time. After " +
                "cancellation, no further charges will " +
                "be made and you will retain access " +
                "until the end of your current billing " +
                "period. Cancellation can be requested " +
                "via the My Account section within the " +
                "app."
            },
            {
              title: "AI-Generated Content",
              body:
                "Responses from Coach VANI are " +
                "generated by an AI model. While every " +
                "effort is made to ensure quality and " +
                "accuracy, AI responses may occasionally " +
                "contain errors. The developer does not " +
                "guarantee 100% accuracy of all AI " +
                "coaching advice, grammar corrections, " +
                "or translations provided."
            },
            {
              title:
                "Translation Services",
              body:
                "The translation feature within this " +
                "app translates Indian regional " +
                "languages (Bengali, Hindi, Telugu, " +
                "Tamil, Marathi, Odia, Punjabi, " +
                "Gujarati, Kannada and Hinglish) " +
                "strictly into English only. No other " +
                "translation direction is supported. " +
                "Translation accuracy depends on AI " +
                "model capability and input clarity."
            },
            {
              title: "User Responsibilities",
              body:
                "You are responsible for maintaining " +
                "the confidentiality of your account " +
                "and for all activities that occur " +
                "under your account. You must not " +
                "misuse the app, attempt to reverse " +
                "engineer it, or use it for any " +
                "purpose other than personal English " +
                "language learning."
            },
            {
              title:
                "User Conduct and Prohibited Activities",
              body:
                "You may not use this app for any " +
                "unlawful purpose, to harass others, " +
                "to submit false information, to " +
                "transmit malware, or to interfere " +
                "with the app's security or " +
                "functionality. Accounts found " +
                "violating these rules may be " +
                "suspended without refund."
            },
            {
              title: "User Eligibility",
              body:
                "This app is intended for users aged " +
                "13 and above. Users under 18 should " +
                "use the app under parental or guardian " +
                "supervision. The developer is not " +
                "liable for misuse by underage users."
            },
            {
              title:
                "Warranty Disclaimer & Liability",
              body:
                "This app is provided on an as-is " +
                "basis without warranties of any kind. " +
                "The developer does not guarantee " +
                "uninterrupted, error-free service. " +
                "Use of this app is entirely at your " +
                "own risk. The developer shall not be " +
                "held liable for any direct, indirect, " +
                "or consequential damages arising from " +
                "use of this app."
            },
            {
              title: "Intellectual Property",
              body:
                "All content, design, code, and AI " +
                "coaching material within Easy English " +
                "is the intellectual property of the " +
                "developer. Unauthorised reproduction, " +
                "distribution, or commercial use of " +
                "any part of this app is strictly " +
                "prohibited."
            },
            {
              title: "Termination",
              body:
                "The developer reserves the right to " +
                "suspend or terminate access to any " +
                "user account that violates these " +
                "terms. Users may also stop using the " +
                "app at any time."
            },
            {
              title: "Modifications to the Service",
              body:
                "Features, pricing, and content of " +
                "this app are subject to change " +
                "without prior notice. The developer " +
                "is not liable for any modification, " +
                "suspension, or discontinuation of " +
                "any part of the service."
            },
            {
              title: "Dispute Resolution",
              body:
                "Any disputes arising from use of " +
                "this app shall be resolved amicably " +
                "through direct communication. This " +
                "app is governed by the laws of India. " +
                "The courts of West Bengal shall have " +
                "jurisdiction over any unresolved " +
                "disputes."
            },
          ].map((section, i) => (
            <div key={i} style={{
              marginBottom: 16
            }}>
              <div style={{
                fontWeight: 800,
                fontSize: 13,
                color: "#1A1A1A",
                marginBottom: 6
              }}>
                {section.title}
              </div>
              <div style={{
                fontSize: 12,
                color: "#555",
                lineHeight: 1.6,
                textAlign: "justify"
              }}>
                {section.body}
              </div>
            </div>
          ))}

        </div>

        {/* Close button */}
        <div style={{
          padding: "12px 24px 20px",
          borderTop: "1px solid #F0F0F0",
          background: "white"
        }}>
          <button
            onClick={onClose}
            style={{
              width: "100%",
              background:
                "linear-gradient(135deg," +
                "#8B2FC9,#6A1E9E)",
              border: "none",
              borderRadius: 14,
              padding: "14px",
              color: "white",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer"
            }}>
            I Understand & Accept
          </button>
        </div>

      </div>
    </div>
  );
}

// ── Privacy Policy Bottom Sheet ───────────────
function PrivacySheet({ onClose }: SheetProps) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 10010,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end"
    }}>
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)"
        }}
      />
      <div style={{
        position: "relative",
        background: "white",
        borderRadius: "22px 22px 0 0",
        maxHeight: "88vh",
        display: "flex",
        flexDirection: "column",
        zIndex: 1
      }}>
        <div style={{
          width: 40, height: 4,
          background: "#DDD",
          borderRadius: 4,
          margin: "12px auto 0"
        }} />

        <div style={{
          overflowY: "auto",
          padding: "16px 24px 30px",
          flex: 1
        }} className="no-scrollbar">

          <h2 style={{
            fontSize: 16,
            fontWeight: 900,
            color: "#1A1A1A",
            marginBottom: 20,
            textTransform: "uppercase"
          }}>
            Privacy Policy
          </h2>

          {[
            {
              title: "Our Commitment",
              body:
                "Easy English with Coach VANI is " +
                "committed to protecting your privacy. " +
                "This policy explains what information " +
                "we collect, how we use it, and your " +
                "rights regarding your personal data."
            },
            {
              title: "Information We Collect",
              body:
                "We may collect your phone number or " +
                "Google account email for login " +
                "purposes only. We collect your in-app " +
                "conversation data solely to provide " +
                "the VANI coaching service. We collect " +
                "basic usage data such as topics " +
                "accessed and session duration to " +
                "improve the learning experience."
            },
            {
              title: "How We Use Your Data",
              body:
                "Your data is used only to provide " +
                "and improve the Easy English learning " +
                "experience. Your conversation messages " +
                "are sent to the AI model API to " +
                "generate VANI's coaching responses. " +
                "We do not sell, share, or transfer " +
                "your personal data to any third party " +
                "for commercial purposes."
            },
            {
              title: "AI and API Data Processing",
              body:
                "Messages you send to Coach VANI are " +
                "processed by the API and by using this app you " +
                "acknowledge that your messages are " +
                "transmitted to servers " +
                "for processing. Please review " +
                "privacy details on how " +
                "they handle data."
            },
            {
              title: "Data Storage",
              body:
                "This app currently stores session " +
                "data in your device memory only " +
                "during active use. No personal " +
                "conversation data is permanently " +
                "stored on external servers by this " +
                "app. Subscription and payment data " +
                "is handled by the respective payment " +
                "gateway providers."
            },
            {
              title: "Your Rights",
              body:
                "You have the right to access, " +
                "correct, or request deletion of your " +
                "personal data at any time. You may " +
                "stop using the app and request " +
                "account deletion by contacting the " +
                "developer directly."
            },
            {
              title: "Children's Privacy",
              body:
                "This app is not directed to children " +
                "under the age of 13. If you believe " +
                "a child under 13 has used this app " +
                "without consent, please contact us " +
                "so we can take appropriate action."
            },
            {
              title: "Changes to This Policy",
              body:
                "This privacy policy may be updated " +
                "from time to time. Continued use of " +
                "the app after changes constitutes " +
                "acceptance of the updated policy. " +
                "Users are encouraged to review this " +
                "policy periodically."
            },
            {
              title: "Contact",
              body:
                "This is a personal independent " +
                "project. For any privacy concerns, " +
                "queries, or data deletion requests, " +
                "please contact the developer directly " +
                "through the Help section within the " +
                "app."
            },
          ].map((s, i) => (
            <div key={i} style={{
              marginBottom: 16
            }}>
              <div style={{
                fontWeight: 800,
                fontSize: 13,
                color: "#1A1A1A",
                marginBottom: 6
              }}>
                {s.title}
              </div>
              <div style={{
                fontSize: 12,
                color: "#555",
                lineHeight: 1.6,
                textAlign: "justify"
              }}>
                {s.body}
              </div>
            </div>
          ))}

        </div>

        <div style={{
          padding: "12px 24px 20px",
          borderTop: "1px solid #F0F0F0",
          background: "white"
        }}>
          <button
            onClick={onClose}
            style={{
              width: "100%",
              background:
                "linear-gradient(135deg," +
                "#E07A5F,#C85A3F)",
              border: "none",
              borderRadius: 14,
              padding: "14px",
              color: "white",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer"
            }}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
