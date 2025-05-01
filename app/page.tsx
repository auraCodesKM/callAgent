"use client"

import { useState } from "react"
import CallInterface from "@/components/call-interface"
import InitiateCall from "@/components/initiate-call"

export default function Home() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isCallConnecting, setIsCallConnecting] = useState(false)

  const startCall = () => {
    setIsCallConnecting(true)
    // Simulate connection delay
    setTimeout(() => {
      setIsCallConnecting(false)
      setIsCallActive(true)
    }, 2000)
  }

  const endCall = () => {
    setIsCallActive(false)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="w-full max-w-md mx-auto">
        {!isCallActive && !isCallConnecting ? (
          <InitiateCall onStartCall={startCall} />
        ) : (
          <CallInterface isConnecting={isCallConnecting} onEndCall={endCall} />
        )}
      </div>

      {/* Instructions for demo */}
      <div className="mt-8 text-center text-white/70 max-w-md">
        <h3 className="text-lg font-medium mb-2">Demo Instructions</h3>
        <p className="text-sm">
          This is a realistic phone call interface for your AI agent. Press the green call button to start, and the red
          button to end the call.
        </p>
      </div>
    </main>
  )
}
