import type { Nutrition } from '../../types'

interface Props {
  nutrition: Nutrition
  size?: number
  showLegend?: boolean
}

export default function NutritionRing({ nutrition, size = 160, showLegend = true }: Props) {
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  const segments = [
    { value: nutrition.vegetables, color: '#4ade80', label: '蔬菜' },
    { value: nutrition.protein, color: '#fb923c', label: '蛋白质' },
    { value: nutrition.carbs, color: '#fbbf24', label: '主食' },
  ]

  let offset = 0

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        {segments.map(seg => {
          const dashArray = (seg.value / 100) * circumference
          const strokeDasharray = `${dashArray} ${circumference - dashArray}`
          const strokeDashoffset = -offset
          offset += dashArray

          return (
            <circle
              key={seg.label}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          )
        })}
      </svg>

      {showLegend && (
        <div className="flex gap-4 text-xs">
          {segments.map(seg => (
            <div key={seg.label} className="flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-gray-500 dark:text-gray-400">
                {seg.label} {seg.value}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
