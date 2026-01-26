"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const roles = [
  {
    label: "Student",
    value: "STUDENT",
  },
  {
    label: "Property Owner",
    value: "LANDLORD",
  },
]

export function RolePopover({
  value,
  onChange,
}: {
  value: string | null
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  const selected = roles.find(r => r.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selected ? selected.label : "Select role"}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-1">
        {roles.map(role => (
          <button
            key={role.value}
            type="button"
            onClick={() => {
              onChange(role.value)
              setOpen(false)
            }}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
              "hover:bg-accent"
            )}
          >
            <Check
              className={cn(
                "h-4 w-4",
                value === role.value ? "opacity-100" : "opacity-0"
              )}
            />
            {role.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}