"use client"

import { useState, useEffect } from "react"
import { PhoneOff, Mic, MicOff, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

interface CallInterfaceProps {
  isConnecting: boolean
  onEndCall: () => void
}

export default function CallInterface({ isConnecting, onEndCall }: CallInterfaceProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const isMobile = useMobile()

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (!isConnecting) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isConnecting])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  return (
    <div className="phone-frame">
      <div className="relative w-full h-full call-gradient">
        {/* Status bar */}
        <div className="status-bar absolute top-0 left-0 right-0 flex justify-between items-center px-5 py-3 text-white z-10">
          <div className="text-sm font-medium">{formatTime(callDuration)}</div>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-0.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 w-0.5 rounded-sm ${i < 3 ? "bg-white" : "bg-white/30"}`}
                  style={{ height: `${6 + i * 2}px` }}
                ></div>
              ))}
            </div>
            <div className="flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 15L21 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 5L12 11L21 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="w-6 h-3 border border-white rounded-sm flex items-center p-0.5">
              <div className="w-3 h-full bg-white rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Call status */}
        <div className="absolute top-16 left-0 right-0 flex justify-center">
          <div className="px-4 py-1 rounded-full bg-black/20 backdrop-blur-md text-white text-sm font-medium">
            {isConnecting ? "Calling..." : "00:12 • Voice"}
          </div>
        </div>

        {/* Avatar and name */}
        <div className="absolute top-1/4 left-0 right-0 flex flex-col items-center text-white">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-5 shadow-lg avatar-pulse">
            <span className="text-4xl font-bold">AI</span>
          </div>
          <h1 className="text-3xl font-bold mb-1">Arvya Legal Agent</h1>
          <p className="text-lg text-gray-300 opacity-80">{isConnecting ? "Calling mobile..." : "Connected"}</p>
        </div>

        {/* Audio visualizer */}
        <div className="absolute left-0 right-0 top-1/2 flex items-end justify-center gap-1.5 h-16">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="audio-wave rounded-full w-1.5"
              style={{
                animationDelay: `${i * 0.1}s`,
                height: `${Math.sin((i + 1) * 0.7) * 24 + 8}px`,
              }}
            ></div>
          ))}
        </div>

        {/* Call controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-10">
          <div className="flex justify-center items-center gap-8">
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-16 w-16 rounded-full call-control-button text-white"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
              </Button>
              <span className="text-white text-xs mt-2">{isMuted ? "Unmute" : "Mute"}</span>
            </div>

            <div className="flex flex-col items-center">
              <Button
                variant="destructive"
                size="icon"
                className="h-16 w-16 rounded-full call-end-button shadow-lg"
                onClick={onEndCall}
              >
                <PhoneOff size={24} />
              </Button>
              <span className="text-white text-xs mt-2">End</span>
            </div>
          </div>
        </div>

        {/* Info button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-20 right-4 h-8 w-8 rounded-full bg-black/20 backdrop-blur-md border-0 text-white"
        >
          <Info size={16} />
        </Button>
      </div>
    </div>
  )
}
