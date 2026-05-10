import React from 'react'

const particlePositions = [
  [12, 20], [28, 74], [48, 26], [66, 68], [84, 38], [55, 48],
]

export default function AnimatedBackground(): JSX.Element {
  return (
    <div className="traveloop-animated-bg" aria-hidden="true">
      <div className="traveloop-aurora traveloop-aurora-one" />
      <div className="traveloop-aurora traveloop-aurora-two" />
      <div className="traveloop-map-grid" />
      <svg className="traveloop-route-lines" viewBox="0 0 1200 760" preserveAspectRatio="none">
        <path className="traveloop-route-line line-one" d="M-40 560 C 210 320, 390 640, 650 380 S 1000 180, 1240 300" />
        <path className="traveloop-route-line line-two" d="M80 180 C 280 280, 410 80, 620 210 S 910 520, 1160 410" />
        <g className="traveloop-destination-pins">
          <circle cx="182" cy="500" r="4" />
          <circle cx="560" cy="350" r="4" />
          <circle cx="930" cy="190" r="4" />
        </g>
      </svg>
      <div className="traveloop-compass-orbit">
        <span />
      </div>
      <div className="traveloop-particle-field">
        {particlePositions.map(([left, top], index) => (
          <span
            key={`${left}-${top}`}
            className="traveloop-particle"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${index * 0.55}s`,
              animationDuration: `${10 + (index % 5) * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
