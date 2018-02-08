import React from 'react';

export const Loading = () => (
  <div className="loading">
    <svg
      width="50px"
      height="50px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      style={{ background: 'none' }}
    >
      <rect x="10.5" y="10.5" width="25" height="25" fill="#00558d">
        <animate
          attributeName="fill"
          values="#338dc9;#00558d;#00558d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
          calcMode="discrete"
        />
      </rect>
      <rect x="37.5" y="10.5" width="25" height="25" fill="#00558d">
        <animate
          attributeName="fill"
          values="#338dc9;#00558d;#00558d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.125s"
          calcMode="discrete"
        />
      </rect>
      <rect x="64.5" y="10.5" width="25" height="25" fill="#00558d">
        <animate
          attributeName="fill"
          values="#338dc9;#00558d;#00558d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.25s"
          calcMode="discrete"
        />
      </rect>
      <rect x="10.5" y="37.5" width="25" height="25" fill="#00558d">
        <animate
          attributeName="fill"
          values="#338dc9;#00558d;#00558d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.875s"
          calcMode="discrete"
        />
      </rect>
      <rect x="64.5" y="37.5" width="25" height="25" fill="#00558d">
        <animate
          attributeName="fill"
          values="#338dc9;#00558d;#00558d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.375s"
          calcMode="discrete"
        />
      </rect>
      <rect x="10.5" y="64.5" width="25" height="25" fill="#00558d">
        <animate
          attributeName="fill"
          values="#338dc9;#00558d;#00558d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.75s"
          calcMode="discrete"
        />
      </rect>
      <rect x="37.5" y="64.5" width="25" height="25" fill="#00558d">
        <animate
          attributeName="fill"
          values="#338dc9;#00558d;#00558d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.625s"
          calcMode="discrete"
        />
      </rect>
      <rect x="64.5" y="64.5" width="25" height="25" fill="#00558d">
        <animate
          attributeName="fill"
          values="#338dc9;#00558d;#00558d"
          keyTimes="0;0.125;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.5s"
          calcMode="discrete"
        />
      </rect>
    </svg>
  </div>
);
