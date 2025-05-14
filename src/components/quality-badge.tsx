interface QualityBadgeProps {
  quality: string
}


export default function QualityBadge({ quality }: QualityBadgeProps) {
  // Determine color based on quality
  let bgColor = "bg-gray-100"
  let textColor = "text-gray-800"

  if (quality.includes("Good quality")) {
    bgColor = "bg-green-100"
    textColor = "text-green-800"
  } else if (quality.includes("Average quality")) {
    bgColor = "bg-yellow-100"
    textColor = "text-yellow-800"
  } else if (quality.includes("Poor quality")) {
    bgColor = "bg-red-100"
    textColor = "text-red-800"
  }

  return (
    <span className={`${bgColor} ${textColor} px-2 py-1 rounded-full whitespace-nowrap text-xs font-semibold`}>
      {quality}
    </span>
  )
}
  