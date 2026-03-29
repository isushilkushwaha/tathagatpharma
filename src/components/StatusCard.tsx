"use client";

import { useEffect, useState } from "react";

export default function StatusCard() {
  const [status, setStatus] = useState({
    label: "Loading...",
    subtext: "Checking hours",
    color: "text-slate-400",
    bgColor: "bg-slate-50"
  });

  useEffect(() => {
    // Logic to change status based on India Standard Time (IST)
    const updateStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay(); // 0 is Sunday

      if (day === 0) {
        setStatus({ label: "Closed", subtext: "Opens Monday", color: "text-red-500", bgColor: "bg-red-50" });
      } else if (hour >= 9 && hour < 21) {
        setStatus({ label: "Open Now", subtext: "Until 9:00 PM", color: "text-green-600", bgColor: "bg-green-50" });
      } else {
        setStatus({ label: "Closed", subtext: "Opens 9:00 AM", color: "text-orange-500", bgColor: "bg-orange-50" });
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 z-30 
                    bg-white/90 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-xl 
                    border border-white/40 min-w-35 sm:min-w-45
                    animate-in fade-in zoom-in duration-700">
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2 h-2 rounded-full animate-pulse ${status.label === "Open Now" ? "bg-green-500" : "bg-red-500"}`} />
        <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
          Clinic Status
        </p>
      </div>
      
      <p className={`text-lg sm:text-xl font-black tracking-tight ${status.color}`}>
        {status.label}
      </p>
      <p className="text-[10px] sm:text-xs font-medium text-slate-500">
        {status.subtext}
      </p>
    </div>
  );
}