/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, ArrowUpRight, ArrowDownRight, Lightbulb, ShieldAlert, Cpu, Landmark } from 'lucide-react';
import { AiOperationNarrative, AiInvestmentNarrative, ManagementOverview, MarketOverview as MarketOverviewType } from '../types';

interface AiSummaryProps {
  aiOperation: AiOperationNarrative;
  aiInvestment: AiInvestmentNarrative;
  overview: ManagementOverview;
  selectedDate: string;
  selectedScenario: 'morning' | 'evening';
  marketOverview: MarketOverviewType;
}

export const AiSummary: React.FC<AiSummaryProps> = ({
  aiOperation,
  aiInvestment,
  overview,
  selectedDate,
  selectedScenario,
  marketOverview
}) => {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [progress, setProgress] = useState(100);
  const [animatedValues, setAnimatedValues] = useState({
    todayRevenue: 0,
    revenueMonth: 0,
    revenueYear: 0,
    profitMonth: 0,
    profitYear: 0,
  });
  const [animatedProgress, setAnimatedProgress] = useState({ budget: 0, profitRatio: 0 });

  // Count-up animation for numbers and progress bars
  useEffect(() => {
    const duration = 1200;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // cubic ease out

      setAnimatedValues({
        todayRevenue: overview.todayRevenue * easeOut,
        revenueMonth: overview.revenueMonth * easeOut,
        revenueYear: overview.revenueYear * easeOut,
        profitMonth: overview.profitMonth * easeOut,
        profitYear: overview.profitYear * easeOut,
      });
      setAnimatedProgress({
        budget: overview.profitBudgetRate * easeOut,
        profitRatio: Math.min(overview.profitMonth / overview.revenueMonth * 100, 100) * easeOut,
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedValues({
          todayRevenue: overview.todayRevenue,
          revenueMonth: overview.revenueMonth,
          revenueYear: overview.revenueYear,
          profitMonth: overview.profitMonth,
          profitYear: overview.profitYear,
        });
        setAnimatedProgress({
          budget: overview.profitBudgetRate,
          profitRatio: Math.min(overview.profitMonth / overview.revenueMonth * 100, 100),
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [overview.todayRevenue, overview.revenueMonth, overview.revenueYear, overview.profitMonth, overview.profitYear, overview.profitBudgetRate]);

  useEffect(() => {
    setIsRegenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRegenerating(false);
          return 100;
        }
        return prev + 25;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [selectedDate, selectedScenario]);

  const handleManualTrigger = () => {
    setIsRegenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRegenerating(false);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const renderValueColor = (val: number) => {
    if (val > 0) return 'text-[#ED6C3D] font-mono';
    if (val < 0) return 'text-[#27C781] font-mono';
    return 'text-[#6B7280] font-mono';
  };

  const formatNum = (num: number, hasSign = false, animated = false) => {
    const displayNum = animated ? num : Math.round(num);
    const absVal = displayNum.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    if (num > 0) return hasSign ? `+${absVal}` : absVal;
    if (num < 0) return `-${absVal}`;
    return '0';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 px-1 py-1 select-none">

      {/* LEFT CARD (Col-span 7): 营业收入 & 利润总额 大盘实况卡片 */}
      <div className="lg:col-span-7 bg-[#F8F9FB] border border-[#E8EAEF] rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all relative overflow-hidden min-h-[340px]">
        {/* Decorative flowing lines background */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{opacity: '0.03'}} viewBox="0 0 400 300" preserveAspectRatio="none">
          <path d="M0,150 Q100,100 200,150 T400,150" fill="none" stroke="#6287EE" strokeWidth="1"/>
          <path d="M0,200 Q150,120 300,180 T450,140" fill="none" stroke="#ED6C3D" strokeWidth="1"/>
          <path d="M-50,100 Q80,60 180,120 T380,80" fill="none" stroke="#6287EE" strokeWidth="0.8"/>
          <path d="M0,250 Q200,180 350,220 T500,170" fill="none" stroke="#ED6C3D" strokeWidth="0.8"/>
          <path d="M0,50 Q120,20 240,60 T480,30" fill="none" stroke="#6287EE" strokeWidth="0.6"/>
        </svg>
        <div>
          <div className="flex items-center gap-2 border-b border-slate-50 pb-3 mb-4">
            <span className="w-1.5 h-4 bg-[#6287EE] rounded-full"></span>
            <h3 className="text-[16px] font-bold text-[#1F2937] tracking-tight">集团核心经营与盈利总览</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Operating Revenue Segment */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#FAFAFC] via-[#F4F6F9] to-[#ECEEF3] hover:from-[#FAFAFC] hover:to-[#E8EBF0] p-4 rounded-2xl border border-[#E4E7ED] transition-all">
              {/* Elegant flowing lines background */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" viewBox="0 0 400 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6287EE"/>
                    <stop offset="100%" stopColor="#6287EE" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ED6C3D"/>
                    <stop offset="100%" stopColor="#ED6C3D" stopOpacity="0"/>
                  </linearGradient>
                  <linearGradient id="lineGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6287EE"/>
                    <stop offset="50%" stopColor="#ED6C3D" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="#ED6C3D"/>
                  </linearGradient>
                </defs>
                <path d="M-20,80 Q80,20 180,70 T380,50" fill="none" stroke="url(#lineGrad1)" strokeWidth="1.5"/>
                <path d="M-10,120 Q100,60 200,100 T420,80" fill="none" stroke="url(#lineGrad2)" strokeWidth="1"/>
                <path d="M0,40 Q120,10 220,50 T400,30" fill="none" stroke="url(#lineGrad3)" strokeWidth="0.8" strokeDasharray="4 2"/>
                <path d="M50,140 Q150,100 250,130 T450,100" fill="none" stroke="url(#lineGrad1)" strokeWidth="0.6" strokeDasharray="2 4"/>
              </svg>
              {/* Soft decorative blur elements */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#6287EE]/20 via-[#6287EE]/5 to-transparent rounded-bl-full blur-[20px]"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#ED6C3D]/18 via-[#ED6C3D]/5 to-transparent rounded-tr-full blur-[15px]"></div>
              {/* Subtle top line */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D0D5E0]/50 to-transparent"></div>

              <div className="grid grid-cols-2 gap-4 items-center relative z-10">
                {/* Left: Revenue Data */}
                <div>
                  <div className="text-[14px] text-[#6B7280] font-semibold flex items-center gap-2">
                    <span className="w-1 h-3 bg-[#ED6C3D] rounded-full"></span>
                    营业收入 (T-1日收盘)
                  </div>
                  <div className="text-[28px] font-bold text-[#ED6C3D] font-mono mt-3 flex items-baseline gap-1">
                    <span>{formatNum(animatedValues.todayRevenue, true)}</span>
                    <span className="text-2xs font-sans font-medium text-[#6B7280]">万</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-[14px]">
                    <span className="text-[#6B7280] font-medium">环比增长:</span>
                    <span className={`font-bold font-mono text-[#ED6C3D]`}>
                      +{overview.revenueMoM}%
                    </span>
                  </div>
                </div>
                {/* Right: Trend Chart */}
                <div className="border-l border-[#E8EAEF] pl-4 flex-1 min-w-[140px]">
                  <div className="text-[12px] text-[#6B7280] mb-1">近7日趋势</div>
                  <div className="h-24">
                    <svg className="w-full h-full" viewBox="0 0 560 56" preserveAspectRatio="xMidYMid meet">
                      {/* Gradient fill */}
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ED6C3D" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#ED6C3D" stopOpacity="0.02" />
                        </linearGradient>
                      </defs>
                      {/* Trend line with smooth curve */}
                      {(() => {
                        const data = [650, 720, 680, 750, 710, 780, overview.todayRevenue];
                        const max = 850;
                        const min = 500;
                        const points = data.map((val, i) => {
                          const x = i * (560 / 6);
                          const y = ((max - val) / (max - min)) * 46 + 5;
                          return { x, y, val };
                        });
                        // Create smooth curve path
                        const linePath = points.reduce((acc, p, i) => {
                          if (i === 0) return `M ${p.x},${p.y}`;
                          const prev = points[i - 1];
                          const cpx = (prev.x + p.x) / 2;
                          return `${acc} C ${cpx},${prev.y} ${cpx},${p.y} ${p.x},${p.y}`;
                        }, '');
                        // Fill path
                        const fillPath = `${linePath} L 560,56 L 0,56 Z`;
                        return (
                          <>
                            <path d={fillPath} fill="url(#revenueGradient)" />
                            <path
                              d={linePath}
                              fill="none"
                              stroke="#ED6C3D"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </>
                        );
                      })()}
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#6B7280] mt-1">
                    <span>T-7</span>
                    <span>T-6</span>
                    <span>T-5</span>
                    <span>T-4</span>
                    <span>T-3</span>
                    <span>T-2</span>
                    <span>T-1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Long-term Cumulative & Budget Achievement subfields */}
          <div className="mt-5 pt-3 border-t border-slate-50">
            <div className="grid grid-cols-2 gap-6 text-[14px]">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-[#6B7280] font-medium">当月累计创收</span>
                  <span className="font-mono font-semibold text-[#1F2937]">{formatNum(animatedValues.revenueMonth)} 万</span>
                </div>
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-[#6B7280] font-medium">当年创收(YTD)</span>
                  <span className="font-mono font-bold text-[#1F2937]">{(animatedValues.revenueYear / 10000).toFixed(2)} 亿</span>
                </div>
              </div>
              <div className="space-y-3 border-l border-[#E5E7EB] pl-6">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-[#6B7280] font-medium">当月利润总额</span>
                  <span className="font-mono font-semibold text-[#1F2937]">{formatNum(animatedValues.profitMonth)} 万</span>
                </div>
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-[#6B7280] font-medium">年累计利润总额</span>
                  <span className="font-mono font-bold text-[#6287EE]">{(animatedValues.profitYear / 10000).toFixed(2)} 亿</span>
                </div>
              </div>
            </div>
            {/* Budget progress bar */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#E5E7EB]/65">
                <div className="flex items-center justify-between text-[14px] mb-2">
                  <span className="text-[#6B7280] font-semibold">集团预算进度里程碑</span>
                  <span className="font-bold font-mono text-[#6287EE]">{overview.profitBudgetRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-[#EBEEF3] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#6287EE] to-[#7B9EEE] h-full rounded-full"
                    style={{ width: `${animatedProgress.budget}%`, transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  ></div>
                </div>
              </div>
              {/* Monthly progress bar */}
              <div className="bg-[#F7F9FC] p-4 rounded-xl border border-[#E5E7EB]/65">
                <div className="flex items-center justify-between text-[14px] mb-2">
                  <span className="text-[#6B7280] font-semibold">年累计利润总额时序</span>
                  <span className="font-bold font-mono text-[#ED6C3D]">{animatedProgress.profitRatio.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-[#EBEEF3] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#ED6C3D] to-[#F09060] h-full rounded-full"
                    style={{ width: `${animatedProgress.profitRatio}%`, transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT CARD (Col-span 5): AI经营与投资决策摘要 */}
      <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.015)] relative overflow-hidden flex flex-col justify-between hover:shadow-[0_12px_35px_rgba(0,0,0,0.025)] transition-all">
        <div className="absolute top-0 right-0 h-44 w-44 bg-[#6287EE]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div>
          <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-bold text-[#1F2937] tracking-tight">AI 总裁经营决策摘要</h3>
              <span className="text-[14px] text-[#6B7280] font-mono">
                ({selectedScenario === 'morning' ? '晨会直达' : '盘后财计'})
              </span>
            </div>
            <div className="flex items-center gap-2">
              {isRegenerating ? (
                <span className="text-[12px] font-mono text-[#6287EE] animate-pulse bg-[#F7F9FC] px-2 py-0.5 rounded-full border border-[#E5E7EB]">
                  智算中 {progress}%
                </span>
              ) : (
                <span className="text-[12px] font-mono text-[#6B7280] bg-[#F7F9FC] px-2 py-0.5 rounded-full border border-[#E5E7EB] flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ECB66D]"></span> AI决策中枢
                </span>
              )}
              <button
                onClick={handleManualTrigger}
                title="重构宏观/微观量化归因"
                className="p-1 text-[#6B7280] hover:text-[#1F2937] transition-colors cursor-pointer rounded-lg hover:bg-[#F7F9FC]"
              >
                <RefreshCw className={`h-3 w-3 ${isRegenerating ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#f8fafc] border-l-3 border-[#6287EE] p-3.5 rounded-r-xl text-[14px] leading-relaxed text-[#6B7280] font-sans shadow-sm select-text">
              {isRegenerating ? (
                <div className="flex flex-col gap-2.5 py-1">
                  <div className="h-3.5 w-11/12 bg-slate-200/60 rounded animate-pulse"></div>
                  <div className="h-3.5 w-10/12 bg-slate-200/60 rounded animate-pulse"></div>
                  <div className="h-3.5 w-8/12 bg-slate-200/60 rounded animate-pulse"></div>
                </div>
              ) : (
                <p>{aiOperation.summaryParagraph} 同时自营与高股息账户在今日盘后展现积极防御特征，调仓动作基本到位。</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F7C4AB]/10 border border-[#F7C4AB]/20 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-[#ED6C3D] font-semibold text-[14px] mb-2">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>核心创富主体</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {aiOperation.contributors.map((unit, index) => (
                    <span key={index} className="bg-[#F7C4AB]/30 text-[#ED6C3D] border border-[#F7C4AB]/30 px-2 py-0.5 rounded-lg text-[12px] font-medium">
                      {unit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#A8E6CF]/10 border border-[#A8E6CF]/20 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-[#27C781] font-semibold text-[14px] mb-2">
                  <ArrowDownRight className="h-4 w-4" />
                  <span>波动/承压项</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {aiOperation.detractors.map((unit, index) => (
                    <span key={index} className="bg-[#A8E6CF]/30 text-[#27C781] border border-[#A8E6CF]/30 px-2 py-0.5 rounded-lg text-[12px] font-medium">
                      {unit}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {marketOverview.indices.map((index) => (
                <div key={index.code} className="bg-[#F7F9FC] rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-[#6B7280] font-medium">{index.name}</span>
                    <span className={`text-[12px] font-mono font-bold ${index.changePercent >= 0 ? 'text-[#ED6C3D]' : 'text-[#ECB66D]'}`}>
                      {index.changePercent >= 0 ? '+' : ''}{index.changePercent}%
                    </span>
                  </div>
                  <div className="text-[18px] font-mono font-bold text-[#1F2937]">{index.points.toFixed(2)}</div>
                  <div className="text-[14px] text-[#6B7280] mt-1">成交 {index.volume.toLocaleString()} 亿</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
