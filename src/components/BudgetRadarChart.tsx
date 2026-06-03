/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface RadarAxis {
  key: string;
  label: string;
  expected: number; // Scheduled/Expected completion rate (e.g., 45.8%)
  actual: number;   // Actual completion rate
  expectedValue: number; // Actual absolute value expected (if any)
  actualValue: number;   // Actual absolute value achieved
  unit: string;
}

interface BudgetRadarChartProps {
  axes: RadarAxis[];
  title?: string;
}

export const BudgetRadarChart: React.FC<BudgetRadarChartProps> = ({
  axes,
  title = "预算达成进度控制雷达图"
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG parameters
  const size = 300;
  const center = size / 2;
  const radius = center * 0.75;
  const totalAxes = axes.length;

  const pointsCount = totalAxes;
  const mathCoordinates = (index: number, value: number) => {
    // Offset by -90deg so the first axis is at the top
    const angle = (index * 2 * Math.PI) / pointsCount - Math.PI / 2;
    const valueRatio = Math.min(Math.max(value, 0), 100) / 100; // clamp between 0-100%
    const currentRadius = radius * valueRatio;
    const x = center + currentRadius * Math.cos(angle);
    const y = center + currentRadius * Math.sin(angle);
    return { x, y };
  };

  // Generate background concentric rings
  const ringSteps = [20, 40, 60, 80, 100];
  const concentricPolygons = ringSteps.map((step) => {
    return Array.from({ length: totalAxes }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
      const currentRadius = radius * (step / 100);
      const x = center + currentRadius * Math.cos(angle);
      const y = center + currentRadius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  });

  // Calculate points for Expected path
  const expectedPoints = axes.map((axis, i) => {
    const { x, y } = mathCoordinates(i, axis.expected);
    return `${x},${y}`;
  }).join(' ');

  // Calculate points for Actual path
  const actualPoints = axes.map((axis, i) => {
    const { x, y } = mathCoordinates(i, axis.actual);
    return `${x},${y}`;
  }).join(' ');

  // Get labels and text anchor positions
  const getLabelProps = (index: number) => {
    const angle = (index * 2 * Math.PI) / totalAxes - Math.PI / 2;
    const x = center + (radius + 20) * Math.cos(angle);
    const y = center + (radius + 15) * Math.sin(angle);
    
    let textAnchor = 'middle';
    if (Math.cos(angle) > 0.1) textAnchor = 'start';
    else if (Math.cos(angle) < -0.1) textAnchor = 'end';

    return { x, y, textAnchor };
  };

  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative h-full flex flex-col justify-between select-none">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-3.5 bg-#6287EE rounded-full"></span>
            <h4 className="text-xs font-bold text-[#1F2937] tracking-wide">{title}</h4>
          </div>
          <span className="text-[14px] text-[#6B7280] font-mono">时序达成对齐</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[14px] text-[#6B7280] mb-4 bg-[#F7F9FC]/55 p-2 rounded-xl border border-[#E5E7EB]/50 justify-center">
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-[#6287EE] border-t border-dashed"></span>
            <span className="font-medium text-[#6B7280]">时序预期线 (45.8%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 bg-#6287EE/20 border border-#6287EE rounded-sm"></span>
            <span className="font-semibold text-#6287EE">实际达成率</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative flex items-center justify-center py-2">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
          {/* Concentric grid lines */}
          {concentricPolygons.map((points, idx) => (
            <polygon
              key={idx}
              points={points}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="0.8"
              strokeDasharray={idx === ringSteps.length - 1 ? "none" : "3 3"}
            />
          ))}

          {/* Grid concentric text indices */}
          {ringSteps.map((step, idx) => {
            const angle = 0 - Math.PI / 2; // Top axis line placement
            const currentRadius = radius * (step / 100);
            const x = center + currentRadius * Math.cos(angle);
            const y = center + currentRadius * Math.sin(angle);
            return (
              <text
                key={idx}
                x={x - 6}
                y={y + 3}
                fill="#94a3b8"
                fontSize="8"
                fontFamily="font-mono"
                className="font-mono font-semibold"
              >
                {step}%
              </text>
            );
          })}

          {/* Spokes/Axes Web lines */}
          {Array.from({ length: totalAxes }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / totalAxes - Math.PI / 2;
            const xOuter = center + radius * Math.cos(angle);
            const yOuter = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={xOuter}
                y2={yOuter}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            );
          })}

          {/* Translucent Scheduled/Expected Area: Dashed loop */}
          <polygon
            points={expectedPoints}
            fill="none"
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.85"
            className="transition-all duration-300"
          />

          {/* Actual Achievement Area: Filled color */}
          <polygon
            points={actualPoints}
            fill="url(#radarBlueGrad)"
            stroke="#6287EE"
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />

          {/* Gradient filter defining */}
          <defs>
            <linearGradient id="radarBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6287EE" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Axis Labels and Nodes */}
          {axes.map((axis, i) => {
            const { x, y, textAnchor } = getLabelProps(i);
            const actCoord = mathCoordinates(i, axis.actual);
            const expCoord = mathCoordinates(i, axis.expected);
            const isHovered = hoveredIndex === i;

            return (
              <g key={i}>
                {/* Text Title for Axis */}
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  fill={isHovered ? "#1e3a8a" : "#475569"}
                  fontSize="11"
                  className="font-semibold cursor-pointer select-none"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {axis.label}
                </text>

                {/* Sub text indicating rate */}
                <text
                  x={x}
                  y={y + 11}
                  textAnchor={textAnchor}
                  fill={axis.actual >= axis.expected ? "#6287EE" : "#ECB66D"}
                  fontSize="9"
                  className="font-mono"
                >
                  {axis.actual}%
                </text>

                {/* Expected Line Nodes */}
                <circle
                  cx={expCoord.x}
                  cy={expCoord.y}
                  r="3.5"
                  fill="#ffffff"
                  stroke="#6366f1"
                  strokeWidth="1.5"
                />

                {/* Actual Line Nodes */}
                <circle
                  cx={actCoord.x}
                  cy={actCoord.y}
                  r={isHovered ? "6" : "4.5"}
                  fill="#6287EE"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer transition-all duration-200 shadow-md"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip inside container */}
        <div className="absolute inset-x-0 bottom-1 flex justify-center h-12 pointer-events-none">
          {hoveredIndex !== null ? (
            <div className="bg-slate-900/90 text-white text-[10.5px] px-3 py-1.5 rounded-xl flex items-center gap-3 shadow-md backdrop-blur-md animate-fade-in border border-slate-700/50">
              <div>
                <span className="text-[#6B7280]">板块:</span> <strong className="font-sans text-white">{axes[hoveredIndex].label}</strong>
              </div>
              <div className="w-[1px] h-3 bg-slate-700"></div>
              <div>
                <span className="text-[#6B7280]">时序预期:</span> <span className="font-mono text-indigo-300">{axes[hoveredIndex].expected}%</span>
              </div>
              <div className="w-[1px] h-3 bg-slate-700"></div>
              <div>
                <span className="text-[#6B7280]">当前实际:</span>{' '}
                <span className={`font-mono font-bold ${axes[hoveredIndex].actual >= axes[hoveredIndex].expected ? 'text-[#ED6C3D]' : 'text-[#ECB66D]'}`}>
                  {axes[hoveredIndex].actual}%
                </span>
              </div>
            </div>
          ) : (
            <div className="text-[14px] text-[#6B7280] flex items-center italic">
              提示：鼠标悬停在雷达图轴点上可比对目标完成差值
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
