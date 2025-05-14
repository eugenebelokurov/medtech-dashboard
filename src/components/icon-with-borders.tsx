import { LucideIcon } from "lucide-react"

interface StrokedIconProps {
    icon: LucideIcon
    color?: string
    strokeColour?: string
    size?: number
}

export default function StrokedIcon({ icon, size = 2 }: StrokedIconProps) {
    const Icon = icon

    return (
        <div className="relative">
            <Icon
                className={`absolute top-0 left-0 opacity-0 group-hover/icon:opacity-100`}
                color="#FFFFFF"
                strokeWidth={size+4}
            />

            <Icon
                className={`relative group-hover/icon:text-[#EA3323]`}
                strokeWidth={size}
            />
        </div>
    )}