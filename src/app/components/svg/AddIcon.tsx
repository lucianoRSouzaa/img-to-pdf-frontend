import { SvgProperties } from "./svg-properties";

type AddIconSVGProps = SvgProperties & {
  stroke?: string;
}

export function AddIconSVG({ height = '24', width = '24', stroke = '#B3B3B3' }: AddIconSVGProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4V20" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 12H20" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}