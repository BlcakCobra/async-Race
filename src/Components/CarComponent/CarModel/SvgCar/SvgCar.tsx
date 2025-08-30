import React, { JSX } from 'react';

interface SvgCarProps {
  color?: string;
}

export default function SvgCar({ color = '#fff' }: SvgCarProps): JSX.Element {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 300 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="60"
        y="100"
        width="180"
        height="400"
        rx="40"
        ry="40"
        fill={color}
        stroke="#333"
        strokeWidth="4"
      />
      <rect
        x="90"
        y="200"
        width="120"
        height="80"
        rx="250"
        ry="10"
        fill="#ccc"
        stroke="#666"
        strokeWidth="2"
      />
      <rect
        x="90"
        y="330"
        width="120"
        height="80"
        rx="250"
        ry="10"
        fill="#ccc"
        stroke="#666"
        strokeWidth="2"
      />
      <circle
        cx="80"
        cy="110"
        r="10"
        fill="#ff0"
        stroke="#aaa"
        strokeWidth="1"
      />
      <circle
        cx="220"
        cy="110"
        r="10"
        fill="#ff0"
        stroke="#aaa"
        strokeWidth="1"
      />
      <circle
        cx="80"
        cy="490"
        r="10"
        fill="#f00"
        stroke="#aaa"
        strokeWidth="1"
      />
      <circle
        cx="220"
        cy="490"
        r="10"
        fill="#f00"
        stroke="#aaa"
        strokeWidth="1"
      />
      <circle cx="60" cy="160" r="15" fill="#222" />
      <circle cx="240" cy="160" r="15" fill="#222" />
      <circle cx="60" cy="440" r="15" fill="#222" />
      <circle cx="240" cy="440" r="15" fill="#222" />
      <line
        x1="150"
        y1="100"
        x2="150"
        y2="500"
        stroke="#444"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
    </svg>
  );
}
