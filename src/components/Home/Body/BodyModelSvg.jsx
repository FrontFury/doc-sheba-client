// src/components/BodyModelSvg.jsx
"use client";

import React, { useState } from "react";

export default function BodyModelSvg({ gender = "male", selectedPart, onSelectPart }) {
  const [hoveredPart, setHoveredPart] = useState(null);

  const getPartClass = (partId) => {
    const isSelected = selectedPart === partId;
    const isHovered = hoveredPart === partId;

    return `cursor-pointer transition-all duration-300 stroke-[#ffffff] stroke-[1.5] ${
      isSelected
        ? "fill-[#0F766E] opacity-100 stroke-teal-300 drop-shadow-[0_0_12px_rgba(15,118,110,0.8)]"
        : isHovered
        ? "fill-[#0F766E]/70 drop-shadow-[0_0_8px_rgba(15,118,110,0.5)]"
        : "fill-[#b09564] opacity-90"
    }`;
  };

  return (
    <div className="relative w-full h-[520px] flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-2 border border-slate-200/80 dark:border-slate-800 overflow-hidden">
      <svg
        viewBox="0 0 300 600"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id={`${gender}-anatomy`}>
          {/* Head */}
          <path
            id="head"
            className={getPartClass("head")}
            onClick={() => onSelectPart("head")}
            onMouseEnter={() => setHoveredPart("head")}
            onMouseLeave={() => setHoveredPart(null)}
            d="M 125 40 C 125 20, 175 20, 175 40 C 175 80, 170 100, 150 110 C 130 100, 125 80, 125 40 Z"
          />

          {/* Neck */}
          <path
            id="neck"
            className={getPartClass("head")}
            onClick={() => onSelectPart("head")}
            onMouseEnter={() => setHoveredPart("head")}
            onMouseLeave={() => setHoveredPart(null)}
            d="M 135 110 L 165 110 L 170 130 L 130 130 Z"
          />

          {/* Chest */}
          <path
            id="chest"
            className={getPartClass("chest")}
            onClick={() => onSelectPart("chest")}
            onMouseEnter={() => setHoveredPart("chest")}
            onMouseLeave={() => setHoveredPart(null)}
            d="M 110 135 C 130 130, 170 130, 190 135 C 195 160, 185 195, 150 195 C 115 195, 105 160, 110 135 Z"
          />

          {/* Abdomen */}
          <path
            id="abdomen"
            className={getPartClass("abdomen")}
            onClick={() => onSelectPart("abdomen")}
            onMouseEnter={() => setHoveredPart("abdomen")}
            onMouseLeave={() => setHoveredPart(null)}
            d="M 118 198 C 135 198, 165 198, 182 198 C 180 250, 175 285, 150 290 C 125 285, 120 250, 118 198 Z"
          />

          {/* Arms */}
          <g
            id="arms"
            className={getPartClass("arms")}
            onClick={() => onSelectPart("arms")}
            onMouseEnter={() => setHoveredPart("arms")}
            onMouseLeave={() => setHoveredPart(null)}
          >
            <path id="left-arm" d="M 105 138 C 90 150, 75 190, 65 250 C 58 290, 52 320, 40 330 C 45 350, 58 350, 68 320 C 80 260, 92 200, 105 165 Z" />
            <path id="right-arm" d="M 195 138 C 210 150, 225 190, 235 250 C 242 290, 248 320, 260 330 C 255 350, 242 350, 232 320 C 220 260, 208 200, 195 165 Z" />
          </g>

          {/* Pelvis */}
          <path
            id="pelvis"
            className={getPartClass("pelvis")}
            onClick={() => onSelectPart("pelvis")}
            onMouseEnter={() => setHoveredPart("pelvis")}
            onMouseLeave={() => setHoveredPart(null)}
            d="M 120 292 C 135 292, 165 292, 180 292 C 185 330, 170 350, 150 355 C 130 350, 115 330, 120 292 Z"
          />

          {/* Legs */}
          <g
            id="legs"
            className={getPartClass("legs")}
            onClick={() => onSelectPart("legs")}
            onMouseEnter={() => setHoveredPart("legs")}
            onMouseLeave={() => setHoveredPart(null)}
          >
            <path id="left-leg" d="M 122 355 C 130 400, 132 450, 128 500 C 125 540, 110 570, 95 585 L 130 585 C 142 560, 148 500, 148 450 C 148 400, 145 360, 145 358 Z" />
            <path id="right-leg" d="M 178 355 C 170 400, 168 450, 172 500 C 175 540, 190 570, 205 585 L 170 585 C 158 560, 152 500, 152 450 C 152 400, 155 360, 155 358 Z" />
          </g>
        </g>
      </svg>

      {/* Hover Info Tooltip */}
      <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#0F766E] border border-teal-100 dark:border-teal-900 shadow-sm capitalize flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-ping" />
        <span>Selected: {selectedPart}</span>
      </div>
    </div>
  );
}