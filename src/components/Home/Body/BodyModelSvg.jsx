"use client";

import React, { useState } from "react";

export default function BodyModelSvg({ gender = "male", selectedPart, onSelectPart }) {
  const [hoveredPart, setHoveredPart] = useState(null);

  // বডি পার্ট অনুযায়ী সুন্দর ডিসপ্লে নেম
  const partNames = {
    head: "Head & Neck",
    chest: "Chest & Heart",
    abdomen: "Abdomen & Liver",
    arms: "Arms & Joint Care",
    pelvis: "Pelvis & Urology",
    legs: "Legs & Orthopedics",
  };

  // Dynamic SVG Styling & Glow Effects
  const getPartClass = (partId) => {
    const isSelected = selectedPart === partId;
    const isHovered = hoveredPart === partId;

    return `cursor-pointer transition-all duration-300 stroke-[#ffffff] stroke-[1.5] ${
      isSelected
        ? "fill-[#0F766E] stroke-teal-300 drop-shadow-[0_0_12px_rgba(15,118,110,0.85)] animate-pulse"
        : isHovered
        ? "fill-[#0F766E]/70 stroke-teal-200 drop-shadow-[0_0_8px_rgba(15,118,110,0.5)]"
        : "fill-[#b09564] hover:fill-[#0F766E]/60 opacity-90"
    }`;
  };

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-2 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-inner group">
      
      {/* 1. Live Interactive Tooltip Badge */}
      <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#0F766E] dark:text-teal-400 border border-teal-100 dark:border-teal-900/80 shadow-md flex items-center gap-2 transition-all">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0F766E]"></span>
        </span>
        <span>
          {hoveredPart ? `Hovering: ${partNames[hoveredPart]}` : `Selected: ${partNames[selectedPart] || selectedPart}`}
        </span>
      </div>

      {/* 2. Top-Right Active Status Indicator */}
      <div className="absolute top-3 right-3 bg-[#0F766E]/10 dark:bg-teal-500/10 text-[#0F766E] dark:text-teal-300 text-[11px] font-extrabold px-3 py-1 rounded-xl border border-[#0F766E]/20">
        {gender.toUpperCase()} MODEL
      </div>

      {/* SVG Vector Drawing */}
      <svg
        viewBox="0 0 300 600"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {gender === "male" ? (
          /* ================= MALE ANATOMY ================= */
          <g id="male-anatomy">
            {/* Head & Neck */}
            <g
              id="head-group"
              className={getPartClass("head")}
              onClick={() => onSelectPart("head")}
              onMouseEnter={() => setHoveredPart("head")}
              onMouseLeave={() => setHoveredPart(null)}
            >
              <path d="M 125 40 C 125 20, 175 20, 175 40 C 175 80, 170 100, 150 110 C 130 100, 125 80, 125 40 Z" />
              <path d="M 135 110 L 165 110 L 170 130 L 130 130 Z" />
            </g>

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
        ) : (
          /* ================= FEMALE ANATOMY ================= */
          <g id="female-anatomy">
            {/* Head & Neck */}
            <g
              id="head-group-female"
              className={getPartClass("head")}
              onClick={() => onSelectPart("head")}
              onMouseEnter={() => setHoveredPart("head")}
              onMouseLeave={() => setHoveredPart(null)}
            >
              <path d="M 128 45 C 128 25, 172 25, 172 45 C 172 80, 168 98, 150 106 C 132 98, 128 80, 128 45 Z" />
              <path d="M 138 106 L 162 106 L 166 125 L 134 125 Z" />
            </g>

            {/* Chest */}
            <path
              id="chest"
              className={getPartClass("chest")}
              onClick={() => onSelectPart("chest")}
              onMouseEnter={() => setHoveredPart("chest")}
              onMouseLeave={() => setHoveredPart(null)}
              d="M 115 128 C 130 125, 170 125, 185 128 C 192 155, 182 188, 150 188 C 118 188, 108 155, 115 128 Z"
            />

            {/* Abdomen */}
            <path
              id="abdomen"
              className={getPartClass("abdomen")}
              onClick={() => onSelectPart("abdomen")}
              onMouseEnter={() => setHoveredPart("abdomen")}
              onMouseLeave={() => setHoveredPart(null)}
              d="M 122 190 C 135 190, 165 190, 178 190 C 172 235, 175 270, 150 275 C 125 270, 128 235, 122 190 Z"
            />

            {/* Arms */}
            <g
              id="arms"
              className={getPartClass("arms")}
              onClick={() => onSelectPart("arms")}
              onMouseEnter={() => setHoveredPart("arms")}
              onMouseLeave={() => setHoveredPart(null)}
            >
              <path id="left-arm" d="M 110 130 C 98 145, 82 185, 72 245 C 65 285, 58 315, 48 325 C 52 342, 64 342, 74 315 C 84 255, 96 195, 110 155 Z" />
              <path id="right-arm" d="M 190 130 C 202 145, 218 185, 228 245 C 235 285, 242 315, 252 325 C 248 342, 236 342, 226 315 C 216 255, 204 195, 190 155 Z" />
            </g>

            {/* Pelvis */}
            <path
              id="pelvis"
              className={getPartClass("pelvis")}
              onClick={() => onSelectPart("pelvis")}
              onMouseEnter={() => setHoveredPart("pelvis")}
              onMouseLeave={() => setHoveredPart(null)}
              d="M 115 278 C 132 278, 168 278, 185 278 C 195 320, 175 350, 150 355 C 125 350, 105 320, 115 278 Z"
            />

            {/* Legs */}
            <g
              id="legs"
              className={getPartClass("legs")}
              onClick={() => onSelectPart("legs")}
              onMouseEnter={() => setHoveredPart("legs")}
              onMouseLeave={() => setHoveredPart(null)}
            >
              <path id="left-leg" d="M 120 355 C 130 400, 131 450, 127 500 C 124 540, 112 570, 98 585 L 130 585 C 140 560, 145 500, 145 450 C 145 400, 142 360, 142 358 Z" />
              <path id="right-leg" d="M 180 355 C 170 400, 169 450, 173 500 C 176 540, 188 570, 202 585 L 170 585 C 160 560, 155 500, 155 450 C 155 400, 158 360, 158 358 Z" />
            </g>
          </g>
        )}
      </svg>

      
    </div>
  );
}