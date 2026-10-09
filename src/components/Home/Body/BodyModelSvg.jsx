"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const REG = {
  head: ["Eye", "Nose", "Brain", "Ear", "Teeth"],
  neck: ["Throat"],
  chest: ["Heart", "Lungs"],
  abdomen: ["Liver", "Spine", "Kidneys", "Stomach"],
  arm: ["Arm"],
  elbow: ["Elbow"],
  pelvis: ["Lower Back", "Hip"],
  thigh: ["Thigh"],
  knee: ["Knee"],
  foot: ["Ankle", "Foot"],
  skin: ["Skin"],
};

const TAIL = [
  [118, 484, 112, 492, 114, 498],
  [128, 504, 140, 502, 142, 496],
  [142, 486, 140, 476, 140, 468],
];

const BODY = {
  male: {
    start: [150, 10],
    seg: [
      [138, 10, 128, 22, 128, 38],
      [128, 50, 134, 60, 140, 66],
      [141, 72, 141, 76, 141, 80],
      [138, 84, 124, 84, 106, 92],
      [94, 95, 87, 106, 87, 120],
      [85, 140, 83, 158, 81, 172],
      [78, 195, 72, 220, 68, 240],
      [64, 252, 60, 266, 68, 278],
      [76, 272, 79, 260, 82, 248],
      [86, 228, 92, 200, 96, 180],
      [98, 164, 100, 146, 106, 128],
      [108, 148, 114, 168, 118, 190],
      [118, 206, 112, 224, 110, 244],
      [108, 266, 106, 292, 108, 320],
      [109, 340, 112, 352, 112, 368],
      [108, 385, 110, 405, 118, 420],
      [122, 440, 122, 460, 122, 472],
    ].concat(
      TAIL,
      [
        [140, 440, 142, 410, 144, 385],
        [146, 365, 148, 340, 148, 320],
        [148, 300, 150, 280, 150, 262],
      ]
    ),
    det: [
      "M150 92C138 90 124 92 112 96",
      "M149 106C148 126 132 138 114 124",
      "M108 98C100 108 98 122 102 132",
      "M126 152C124 172 124 192 126 210",
      "M122 222C132 232 142 246 150 256",
      "M92 190C86 215 82 232 80 244",
      "M122 282C124 302 126 320 126 336",
      "M138 282C140 302 142 320 142 336",
      "M122 346Q130 340 138 346",
      "M118 390C116 405 120 420 124 432",
      "M134 380V456",
      "M104 150C102 162 100 170 100 176",
    ],
    mid: [
      "M150 106V150",
      "M139 160H161",
      "M138 174H162",
      "M139 188H161",
      "M150 152V212",
      "M140 74L150 90L160 74",
    ],
    ear: [128, 40],
  },
  female: {
    start: [150, 12],
    seg: [
      [139, 12, 130, 22, 130, 38],
      [130, 50, 135, 60, 141, 66],
      [142, 72, 142, 76, 142, 82],
      [138, 86, 124, 86, 114, 94],
      [104, 97, 99, 108, 98, 122],
      [96, 142, 94, 158, 92, 172],
      [89, 194, 84, 218, 80, 238],
      [74, 256, 72, 268, 80, 276],
      [86, 270, 88, 258, 90, 246],
      [94, 226, 99, 200, 102, 182],
      [104, 166, 105, 148, 107, 130],
      [109, 150, 122, 170, 124, 194],
      [124, 214, 106, 232, 104, 262],
      [104, 290, 106, 312, 108, 336],
      [109, 350, 112, 358, 112, 370],
      [109, 386, 111, 406, 118, 422],
      [121, 442, 122, 460, 122, 472],
    ].concat(
      TAIL,
      [
        [140, 440, 142, 412, 145, 390],
        [147, 368, 149, 345, 149, 325],
        [149, 305, 150, 285, 150, 266],
      ]
    ),
    det: [
      "M150 94C138 92 126 94 116 98",
      "M116 114C118 130 134 138 148 126",
      "M112 98C104 108 102 122 106 132",
      "M124 200C122 214 114 232 108 252",
      "M124 290C126 310 128 326 128 338",
      "M138 290C140 310 142 326 142 338",
      "M122 349Q130 343 138 349",
      "M118 392C116 406 120 421 124 432",
      "M134 382V456",
      "M90 186C86 210 82 228 80 240",
    ],
    mid: ["M150 106V122", "M150 150V212", "M141 76L150 90L159 76"],
    ear: [130, 40],
  },
};

const SIDE = [
  ["arm", "50,84 114,88 106,130 104,164 50,164"],
  ["arm", "50,190 100,190 100,292 50,292"],
  ["elbow", "50,164 108,164 108,190 50,190"],
];

const MIDR = [
  ["head", "100,0 200,0 200,66 100,66"],
  ["neck", "130,66 170,66 176,90 124,90"],
  ["chest", "114,88 186,88 194,130 194,152 106,152 106,130"],
  ["abdomen", "106,152 194,152 194,222 106,222"],
  ["pelvis", "98,222 202,222 202,276 98,276"],
  ["thigh", "98,276 202,276 202,336 98,336"],
  ["knee", "98,336 202,336 202,376 98,376"],
  ["foot", "98,462 202,462 202,512 98,512"],
];

const LB = [
  ["Eye", "L", 40, 202, 36, "head"],
  ["Nose", "L", 54, 210, 46, "head"],
  ["Throat", "L", 78, 210, 76, "neck"],
  ["Arm", "L", 124, 153, 135, "arm"],
  ["Liver", "L", 166, 192, 166, "abdomen"],
  ["Spine", "L", 182, 210, 190, "abdomen"],
  ["Lower Back", "L", 212, 204, 234, "pelvis"],
  ["Thigh", "L", 290, 188, 300, "thigh"],
  ["Skin", "L", 390, 188, 400, "skin"],
  ["Foot", "L", 484, 188, 486, "foot"],
  ["Brain", "R", 36, 212, 24, "head"],
  ["Ear", "R", 49, 231, 40, "head"],
  ["Teeth", "R", 62, 210, 56, "head"],
  ["Heart", "R", 114, 224, 112, "chest"],
  ["Lungs", "R", 128, 238, 124, "chest"],
  ["Elbow", "R", 170, 272, 176, "elbow"],
  ["Kidneys", "R", 186, 226, 190, "abdomen"],
  ["Stomach", "R", 200, 220, 204, "abdomen"],
  ["Hip", "R", 240, 244, 250, "pelvis"],
  ["Knee", "R", 352, 230, 352, "knee"],
  ["Ankle", "R", 465, 229, 466, "foot"],
];

function buildPathD(g) {
  let d = "M" + g.start.join(" ");
  let pts = [g.start];
  g.seg.forEach((s) => {
    d += "C" + s.join(" ");
    pts.push([s[4], s[5]]);
  });
  for (let i = g.seg.length - 1; i >= 0; i--) {
    let s = g.seg[i];
    let p = pts[i];
    d +=
      "C" +
      [
        300 - s[2],
        s[3],
        300 - s[0],
        s[1],
        300 - p[0],
        p[1],
      ].join(" ");
  }
  return d + "Z";
}

export default function BodyModelSvg({
  gender = "male",
  selectedPart,
  onSelectPart,
}) {
  const [hoveredPart, setHoveredPart] = useState(null);

  const g = BODY[gender] || BODY.male;
  const bodyD = buildPathD(g);
  const clipId = `clip-${gender}`;

  // ডাইনামিক সিলেকশন ও গ্রুপ হ্যান্ডলিং ফিক্সড
  const checkIsSelected = (r) => {
    if (selectedPart === r) return true;
    if (selectedPart === "legs" && ["thigh", "knee", "foot"].includes(r)) return true;
    if (selectedPart === "arms" && ["arm", "elbow"].includes(r)) return true;
    return false;
  };

  const checkIsHovered = (r) => {
    if (hoveredPart === r) return true;
    if (hoveredPart === "legs" && ["thigh", "knee", "foot"].includes(r)) return true;
    if (hoveredPart === "arms" && ["arm", "elbow"].includes(r)) return true;
    return false;
  };

  return (
    <div className="relative w-full h-[580px] flex items-center justify-center bg-slate-50/70 dark:bg-slate-900/60 rounded-3xl p-3 pt-14 sm:pt-16 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-inner group">
      
      {/* 1. Live Interactive Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0F766E] dark:text-teal-400 border border-teal-100 dark:border-teal-900/80 shadow-md flex items-center gap-2 z-20 max-w-[240px] sm:max-w-none truncate"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0F766E]"></span>
        </span>
        <motion.span
          key={hoveredPart || selectedPart}
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="truncate"
        >
          {hoveredPart
            ? `Hovering: ${REG[hoveredPart]?.join(", ") || hoveredPart}`
            : selectedPart
            ? `Selected: ${REG[selectedPart]?.join(", ") || selectedPart}`
            : "Click any body region"}
        </motion.span>
      </motion.div>

      {/* 2. Model Gender Badge */}
      <motion.div
        key={gender}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-3 right-3 bg-[#0F766E]/10 dark:bg-teal-500/10 text-[#0F766E] dark:text-teal-300 text-[11px] font-extrabold px-3 py-1 rounded-xl border border-[#0F766E]/20 z-20"
      >
        {gender.toUpperCase()} MODEL
      </motion.div>

      {/* 3. SVG Anatomical Renderer */}
      <svg
        viewBox="0 -35 420 555"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full select-none"
        role="img"
        aria-label={`${gender} anatomical body map`}
      >
        <defs>
          <clipPath id={clipId}>
            <path d={bodyD} />
          </clipPath>

          <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <AnimatePresence mode="wait">
          <motion.g
            key={gender}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <g transform="translate(60 0)">
              {/* Neutral Silhouette Background */}
              <path
                d={bodyD}
                className="fill-slate-200/90 dark:fill-slate-800/90 stroke-slate-300 dark:stroke-slate-700 stroke-[1.2] transition-colors"
              />

              {/* Anatomical Details & Lines */}
              <g className="fill-none stroke-slate-400/80 dark:stroke-slate-600/80 stroke-[0.8] stroke-linecap-round opacity-60 pointer-events-none">
                <ellipse cx={g.ear[0]} cy={g.ear[1]} rx="3.5" ry="7" />
                <ellipse
                  cx={300 - g.ear[0]}
                  cy={g.ear[1]}
                  rx="3.5"
                  ry="7"
                />
                {g.det.map((d, i) => (
                  <path key={`det-${i}`} d={d} />
                ))}
                <g transform="translate(300 0) scale(-1 1)">
                  {g.det.map((d, i) => (
                    <path key={`det-m-${i}`} d={d} />
                  ))}
                </g>
                {g.mid.map((d, i) => (
                  <path key={`mid-${i}`} d={d} />
                ))}
              </g>

              {/* Clipped Interactive Regions (Middle Regions) */}
              <g clipPath={`url(#${clipId})`}>
                {MIDR.map(([r, pts], idx) => {
                  const sel = checkIsSelected(r);
                  const hov = checkIsHovered(r);
                  return (
                    <polygon
                      key={`midr-${idx}`}
                      points={pts}
                      onClick={() => onSelectPart(r)}
                      onMouseEnter={() => setHoveredPart(r)}
                      onMouseLeave={() => setHoveredPart(null)}
                      filter={sel ? "url(#activeGlow)" : undefined}
                      className={`cursor-pointer transition-all duration-200 ${
                        sel
                          ? "fill-[#0F766E] dark:fill-teal-400 fill-opacity-95 stroke-teal-200 dark:stroke-white stroke-[2.5]"
                          : hov
                          ? "fill-[#0F766E]/40 dark:fill-teal-500/40 fill-opacity-60 stroke-teal-400 stroke-[1]"
                          : "fill-transparent hover:fill-slate-300/30 dark:hover:fill-slate-700/30"
                      }`}
                    />
                  );
                })}

                {/* Side Regions (Arms & Elbows) */}
                {SIDE.map(([r, pts], idx) => {
                  const sel = checkIsSelected(r);
                  const hov = checkIsHovered(r);
                  return (
                    <React.Fragment key={`side-${idx}`}>
                      <polygon
                        points={pts}
                        onClick={() => onSelectPart(r)}
                        onMouseEnter={() => setHoveredPart(r)}
                        onMouseLeave={() => setHoveredPart(null)}
                        filter={sel ? "url(#activeGlow)" : undefined}
                        className={`cursor-pointer transition-all duration-200 ${
                          sel
                            ? "fill-[#0F766E] dark:fill-teal-400 fill-opacity-95 stroke-teal-200 dark:stroke-white stroke-[2.5]"
                            : hov
                            ? "fill-[#0F766E]/40 dark:fill-teal-500/40 fill-opacity-60 stroke-teal-400 stroke-[1]"
                            : "fill-transparent hover:fill-slate-300/30 dark:hover:fill-slate-700/30"
                        }`}
                      />
                      <g transform="translate(300 0) scale(-1 1)">
                        <polygon
                          points={pts}
                          onClick={() => onSelectPart(r)}
                          onMouseEnter={() => setHoveredPart(r)}
                          onMouseLeave={() => setHoveredPart(null)}
                          filter={sel ? "url(#activeGlow)" : undefined}
                          className={`cursor-pointer transition-all duration-200 ${
                            sel
                              ? "fill-[#0F766E] dark:fill-teal-400 fill-opacity-95 stroke-teal-200 dark:stroke-white stroke-[2.5]"
                              : hov
                              ? "fill-[#0F766E]/40 dark:fill-teal-500/40 fill-opacity-60 stroke-teal-400 stroke-[1]"
                              : "fill-transparent hover:fill-slate-300/30 dark:hover:fill-slate-700/30"
                          }`}
                        />
                      </g>
                    </React.Fragment>
                  );
                })}
              </g>
            </g>

            {/* Pointer Lines & Interactive Labels */}
            <g>
              {LB.map(([label, side, labelY, targetX, targetY, r], idx) => {
                const isLeft = side === "L";
                const lx = isLeft ? 94 : 326;
                const tx = isLeft ? 90 : 334;
                const sel = checkIsSelected(r);

                return (
                  <g
                    key={`lb-${idx}`}
                    onClick={() => onSelectPart(r)}
                    onMouseEnter={() => setHoveredPart(r)}
                    onMouseLeave={() => setHoveredPart(null)}
                    className="cursor-pointer group/label"
                  >
                    <line
                      x1={lx}
                      y1={labelY}
                      x2={targetX}
                      y2={targetY}
                      className={`transition-all duration-200 ${
                        sel
                          ? "stroke-[#0F766E] dark:stroke-teal-400 stroke-[2.5]"
                          : "stroke-slate-300 dark:stroke-slate-700 stroke-[1] group-hover/label:stroke-teal-500"
                      }`}
                    />
                    <circle
                      cx={targetX}
                      cy={targetY}
                      r={sel ? "3.5" : "2.2"}
                      className={`transition-all duration-200 ${
                        sel
                          ? "fill-[#0F766E] dark:fill-teal-300 stroke-2 stroke-white dark:stroke-slate-900"
                          : "fill-slate-400 dark:fill-slate-500 group-hover/label:fill-teal-500"
                      }`}
                    />
                    <text
                      x={tx}
                      y={labelY + 4}
                      textAnchor={isLeft ? "end" : "start"}
                      className={`text-[12px] transition-all duration-200 ${
                        sel
                          ? "fill-[#0F766E] dark:fill-teal-300 font-extrabold text-[13px] drop-shadow-sm"
                          : "fill-slate-600 dark:fill-slate-400 font-semibold group-hover/label:fill-teal-600 dark:group-hover/label:fill-teal-300"
                      }`}
                    >
                      {label}
                    </text>
                  </g>
                );
              })}
            </g>
          </motion.g>
        </AnimatePresence>
      </svg>
    </div>
  );
}