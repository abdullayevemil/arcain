"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export default function FlipCard({
  front,
  back
}: {
  front: ReactNode
  back: ReactNode
}) {
  return (
    <div className="group perspective">
      <div className="relative h-64 w-full rounded-2xl transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
        <div className="absolute inset-0 backface-hidden rounded-2xl border bg-background p-6">
          {front}
        </div>

        <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-2xl border bg-muted p-6">
          {back}
        </div>
      </div>
    </div>
  )
}