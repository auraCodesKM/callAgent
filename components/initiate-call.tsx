"use client"

import { useState } from "react"
import { Phone, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface InitiateCallProps {
  onStartCall: () => void
}

export default function InitiateCall({ onStartCall }: InitiateCallProps) {
  const [isMicEnabled, setIsMicEnabled] = useState(true)

  return (
    <div className="phone-frame">
      <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black p-6 flex flex-col">
        {/* Status bar */}
        <div className="status-bar flex justify-between items-center px-2 py-2 text-white mb-6 rounded-lg">
          <div className="text-sm font-medium">2:04</div>
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

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg">
            <span className="text-3xl font-bold text-white">AI</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">CS AI Agent</h2>
          <p className="text-gray-400 mb-8 text-center">Voice-enabled AI Agent</p>

          <div className="flex gap-6 mb-8">
            <Button
              variant="ghost"
              size="icon"
              className="h-14 w-14 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
              onClick={() => setIsMicEnabled(!isMicEnabled)}
            >
              {isMicEnabled ? <Mic size={22} /> : <MicOff size={22} />}
            </Button>

            <Button
              onClick={onStartCall}
              size="icon"
              className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
            >
              <Phone size={22} />
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">Tap the call button to start a conversation</p>
          <p className="text-xs text-gray-500 mt-1">Powered by Voiceflow AI</p>
        </div>
      </div>
    </div>
  )
}
