import { StatusChipNested } from "./issues/status-chip-nested"

interface DefectChipsProps {
    defects: {
      crit?: number
      nonCrit?: number
      med?: number
      nonMed?: number
    }
  }
  
export default function DefectChips({ defects }: DefectChipsProps) {
  return (
    <div className="flex flex-row gap-1">
      <div className="flex flex-row gap-1">
        {defects.crit !== undefined && defects.crit > 0 && (
          <StatusChipNested count={defects.crit} type="crit" />
        )}
  
        {defects.nonCrit !== undefined && defects.nonCrit > 0 && (
          <StatusChipNested count={defects.nonCrit} type="nonCrit" />
        )}
      </div>

      <div className="flex flex-row gap-1">
        {defects.med !== undefined && defects.med > 0 && (
          <StatusChipNested count={defects.med} type="med" />
        )}

        {defects.nonMed !== undefined && defects.nonMed > 0 && (
          <StatusChipNested count={defects.nonMed} type="nonMed" />
        )}
      </div>

      {/* If no defects, show zero */}
      {(!defects.crit || defects.crit === 0) &&
        (!defects.nonCrit || defects.nonCrit === 0) &&
        (!defects.med || defects.med === 0) && 
        (!defects.nonMed || defects.nonMed === 0) && 
        <span className="text-gray-500">0</span>}
    </div>
  )
}
