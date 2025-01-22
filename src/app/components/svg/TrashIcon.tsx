

import { SvgProperties } from "./svg-properties";

type TrashIconSVGProps = SvgProperties & {
  stroke?: string;
}

export function TrashIconSVG({ height = '32', width = '32', stroke = '#FBFBFB' }: TrashIconSVGProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.5 9.5L22.8803 19.5251C22.7219 22.0864 22.6428 23.3671 22.0008 24.2879C21.6833 24.7431 21.2747 25.1273 20.8007 25.416C19.8421 26 18.559 26 15.9927 26C13.4231 26 12.1383 26 11.179 25.4149C10.7048 25.1257 10.296 24.7408 9.97868 24.2848C9.33688 23.3626 9.25945 22.0801 9.10461 19.5152L8.5 9.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 9.5H25M20.0557 9.5L19.3731 8.09173C18.9196 7.15626 18.6928 6.68852 18.3017 6.39681C18.215 6.3321 18.1231 6.27454 18.027 6.2247C17.5939 6 17.0741 6 16.0345 6C14.9688 6 14.436 6 13.9957 6.23412C13.8981 6.28601 13.805 6.3459 13.7173 6.41317C13.3216 6.7167 13.1006 7.20155 12.6586 8.17126L12.0529 9.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13.5 20.5V14.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18.5 20.5V14.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}