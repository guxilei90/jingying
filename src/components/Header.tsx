/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Zap, Calendar } from 'lucide-react';
import { DailyFinancialSnapshot } from '../types';

interface HeaderProps {
  currentSnapshot: DailyFinancialSnapshot;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedScenario: 'morning' | 'evening';
  setSelectedScenario: (scene: 'morning' | 'evening') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSnapshot,
  selectedDate,
  setSelectedDate,
  selectedScenario,
  setSelectedScenario,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('zh-CN', { hour12: false }) + ' CST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-[#E5E7EB] bg-[#FFFFFF] px-6 py-4 text-[#1F2937] select-none relative z-30 shadow-[0_2px_15px_rgba(0,0,0,0.01)]">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Logo and App Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-[#6287EE] px-2.5 py-1.5 text-white font-black text-[16px] font-mono tracking-wider rounded-lg shadow-sm">
            TF
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
              天风证券每日经营实况
            </h1>
          </div>
        </div>

        {/* Real-time Ticker clock */}
        <div className="flex items-center gap-2 self-end md:self-auto text-xs">
          <div className="border border-[#E5E7EB] px-3 py-2 rounded-xl bg-[#F7F9FC] flex items-center gap-2 font-mono text-[#6B7280] shadow-inner">
            <span className="h-2 w-2 rounded-full bg-[#27C781] animate-pulse"></span>
            <span>{timeStr || '08:30:00 CST'}</span>
          </div>
        </div>
      </div>

      {/* Control Navigation & Tab selectors bar */}
      <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Date / Scenario Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Scenario Selector */}
          <div className="flex items-center bg-[#EBEEF3] p-0.5 rounded-xl">
            <button
              onClick={() => setSelectedScenario('morning')}
              className={`px-4 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1.5 text-[14px] ${
                selectedScenario === 'morning'
                  ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/10'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              T-1日经营分析
            </button>
            <button
              onClick={() => setSelectedScenario('evening')}
              className={`px-4 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1.5 text-[14px] ${
                selectedScenario === 'evening'
                  ? 'bg-[#6287EE] text-white shadow-sm shadow-[#6287EE]/10'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              T日预估投资分析
            </button>
          </div>
        </div>

        {/* Data timeliness note */}
        <div className="text-[14px] text-[#6B7280] font-mono">
          数据来源：前一交易日(T-1)收盘清算 · 仅供参考
        </div>
      </div>
    </header>
  );
};