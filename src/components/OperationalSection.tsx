/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, FileDown, Landmark, Sparkles, SlidersHorizontal, ArrowUpRight, TrendingUp, CheckCircle2, AlertCircle, ArrowDownRight, Target, ChevronRight } from 'lucide-react';
import { BusinessUnit, ManagementOverview } from '../types';

interface OperationalSectionProps {
  overview: ManagementOverview;
  operatingUnits: BusinessUnit[];
  onProprietaryClick?: () => void; // Linkage trigger to focus investment section
}

export const OperationalSection: React.FC<OperationalSectionProps> = ({
  overview,
  operatingUnits,
  onProprietaryClick
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    'bu-wealth': true, // Expanded by default to showcase detailed structure right away
    'bu-proprietary': true
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'todayProfit' | 'yearProfit' | 'revenueRatio' | 'id'>('id');

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderValueColor = (val: number) => {
    if (val > 0) return 'text-[#ED6C3D] font-mono'; // Rise Red
    if (val < 0) return 'text-[#27C781] font-mono'; // Loss Green
    return 'text-[#6B7280] font-mono';
  };

  const formatNum = (num: number, hasSign = false) => {
    const absVal = Math.abs(num).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (num > 0) return hasSign ? `+${absVal}` : absVal;
    if (num < 0) return `-${absVal}`;
    return '0.00';
  };

  // Sort and filter the business units
  const filteredUnits = operatingUnits
    .filter(unit => unit.name.toLowerCase().includes(searchQuery.toLowerCase()) || unit.manager.includes(searchQuery))
    .sort((a, b) => {
      if (sortBy === 'todayProfit') return b.todayProfit - a.todayProfit;
      if (sortBy === 'yearProfit') return b.yearProfit - a.yearProfit;
      if (sortBy === 'revenueRatio') return b.revenueRatio - a.revenueRatio;
      return 0; // Maintain natural tree order
    });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 select-none">
      
      {/* LEFT COMPONENT (lg:col-span-9): Multi-dimensional Business Unit Performance Bento Cards */}
      <div className="lg:col-span-9 bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.025)] transition-all">
        
        {/* Section header bar */}
        <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#6287EE] rounded-full"></span>
            <h2 className="text-[16px] font-bold text-[#1F2937] tracking-tight flex items-center gap-1.5">
              分条线经营单元业绩看板
            </h2>
            <span className="text-[14px] text-[#6B7280] bg-[#EBEEF3] border border-[#E5E7EB] px-2 py-0.5 rounded-full font-medium">
              T-1日全口径穿透式快照
            </span>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
          {filteredUnits.map((unit) => {
            const isProprietaryUnit = unit.id === 'bu-proprietary';
            const hasChildren = unit.children && unit.children.length > 0;
            const isExpanded = !!expandedRows[unit.id];

            return (
              <div 
                key={unit.id}
                className={`border rounded-2xl p-4.5 transition-all flex flex-col justify-between hover:shadow-xs relative bg-[#FFFFFF] ${
                  isProprietaryUnit 
                    ? 'border-[#6287EE] shadow-[0_2px_15px_rgba(37,99,235,0.015)]' 
                    : 'border-[#E5E7EB]'
                }`}
              >
                {/* Card Top Row */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-3.5 rounded-full ${
                        unit.id === 'bu-wealth' ? 'bg-amber-500 animate-pulse' :
                        unit.id === 'bu-proprietary' ? 'bg-[#6287EE]' :
                        unit.id === 'bu-ib' ? 'bg-[#886CE6]' :
                        unit.id === 'bu-am' ? 'bg-[#6287EE]' :
                        unit.id === 'bu-corp' ? 'bg-[#6287EE]' : 'bg-[#6287EE]'
                      }`} />
                      <div>
                        <h3 className="font-bold text-[#1F2937] text-[16px] tracking-tight">{unit.name}</h3>
                        <span className="text-[14px] text-[#6B7280] font-sans">负责人：{unit.manager}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-[12px] text-[#6B7280] font-sans">当日营收贡献</div>
                      <span className="text-[14px] font-mono font-bold text-[#ED6C3D] bg-[#F7C4AB]/40 border border-[#ED6C3D]/30 px-1.5 py-0.2 rounded-md min-w-[5rem] text-center">
                        {unit.revenueRatio.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Core Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2 mt-3.5 bg-[#F2F4F7] p-2.5 rounded-xl border border-[#E5E7EB]/60">
                    <div className="p-2 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB]">
                      <span className="text-[12px] text-[#6B7280] font-medium block">日营收</span>
                      <span className="text-[16px] font-mono font-bold text-[#ED6C3D] mt-0.5 block">
                        +{formatNum(unit.todayRevenue)} <span className="font-sans font-normal text-[12px] text-[#6B7280] ml-0.2">万</span>
                      </span>
                    </div>
                    <div className="p-2 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] flex items-center justify-between">
                      <div>
                        <span className="text-[12px] text-[#6B7280] font-medium block">年累计利润总额</span>
                        <span className={`text-[16px] font-mono font-bold mt-0.5 block ${renderValueColor(unit.todayProfit)}`}>
                          {unit.todayProfit > 0 ? '+' : ''}{formatNum(unit.todayProfit)} <span className="font-sans font-normal text-[12px] ml-0.2">万</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[12px] text-[#6B7280] font-medium block">年进度</span>
                        <span className="text-[14px] font-mono font-bold text-[#6287EE] block">{unit.budgetCompletion}%</span>
                      </div>
                    </div>
                    <div className="p-2 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB]">
                      <span className="text-[12px] text-[#6B7280] font-medium block">当月累计营收</span>
                      <span className="text-[16px] font-mono font-semibold text-[#1F2937] mt-0.5 block">
                        {formatNum(unit.monthProfit)} <span className="font-sans font-normal text-[12px] text-[#6B7280] ml-0.2">万</span>
                      </span>
                    </div>
                    <div className="p-2 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] flex items-center justify-between">
                      <div>
                        <span className="text-[12px] text-[#6B7280] font-medium block">年累计营收</span>
                        <span className="text-[16px] font-mono font-bold text-slate-900 mt-0.5 block">
                          {formatNum(unit.yearProfit)} <span className="font-sans font-normal text-[12px] text-[#6B7280] ml-0.2">万</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[12px] text-[#6B7280] font-medium block">年进度</span>
                        <span className={`text-[14px] font-mono font-bold block ${
                          unit.budgetCompletion >= 45.8 ? 'text-[#6287EE]' : 'text-[#ECB66D]'
                        }`}>
                          {unit.budgetCompletion}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom interactive and drill-down panels */}
                <div>
                  {isProprietaryUnit && (
                    <div className="mt-2.5 bg-[#6287EE]/50 border border-[#6287EE] p-2 rounded-xl text-[14px] text-[#6287EE] flex items-center justify-between gap-1">
                      <span className="font-medium shrink-0">⚡️ 上海自营已与底层并账对齐</span>
                      {onProprietaryClick && (
                        <button 
                          onClick={onProprietaryClick}
                          className="text-[12px] font-bold bg-[#6287EE] hover:bg-blue-700 text-white rounded-lg px-2 py-0.8 transition-all cursor-pointer shadow-xs whitespace-nowrap shrink-0"
                        >
                          [ 🎯 持仓穿透 ]
                        </button>
                      )}
                    </div>
                  )}

                  {/* 财富管理中心业务情况 */}
                  {unit.id === 'bu-wealth' && (
                    <div className="mt-3.5">
                      <div className="grid grid-cols-4 gap-2">
                        {/* 当日新开客户数 */}
                        <div className="bg-[#F7F9FC] rounded-xl p-2.5 border border-[#E5E7EB]">
                          <div className="text-[12px] text-[#6B7280] mb-1">当日新开客户数</div>
                          <div className="text-[14px] font-mono font-bold text-[#1F2937]">164<span className="text-[12px] font-normal text-[#6B7280] ml-2">本年 3.8万</span></div>
                          <div className="text-[12px] text-[#6B7280]">存量客户 <span className="font-mono">173万</span></div>
                        </div>
                        {/* 当日新开客户托管资产 */}
                        <div className="bg-[#F7F9FC] rounded-xl p-2.5 border border-[#E5E7EB]">
                          <div className="text-[12px] text-[#6B7280] mb-1">当日新开客户托管资产</div>
                          <div className="text-[14px] font-mono font-bold text-[#1F2937]">135万<span className="text-[12px] font-normal text-[#6B7280] ml-2">本年 57.34亿</span></div>
                          <div className="text-[12px] text-[#6B7280]">托管资产 <span className="font-mono">2,457.18亿</span></div>
                        </div>
                        {/* 当日产品销量（非货） */}
                        <div className="bg-[#F7F9FC] rounded-xl p-2.5 border border-[#E5E7EB]">
                          <div className="text-[12px] text-[#6B7280] mb-1">当日产品销量（非货）</div>
                          <div className="text-[14px] font-mono font-bold text-[#1F2937]">1.65亿<span className="text-[12px] font-normal text-[#6B7280] ml-2">本年 185.89亿</span></div>
                          <div className="text-[12px] text-[#6B7280]">产品保有量 <span className="font-mono">50.55亿</span></div>
                        </div>
                        {/* 当日交易市占率 */}
                        <div className="bg-[#F7F9FC] rounded-xl p-2.5 border border-[#E5E7EB]">
                          <div className="text-[12px] text-[#6B7280] mb-1">当日交易市占率</div>
                          <div className="text-[14px] font-mono font-bold text-[#1F2937]">1.9‰<span className="text-[12px] font-normal text-[#6B7280] ml-2">年均 1.91‰</span></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Nested fine items (collapsible cards for Wealth Management and Proprietary units only) */}
                  {hasChildren && (unit.id === 'bu-wealth' || unit.id === 'bu-proprietary') && (
                    <div className="mt-3.5 pt-3 border-t border-[#E5E7EB]">
                      {isExpanded && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                          {unit.children?.map((sub) => {
                            const isPos = sub.todayRevenue >= 0;
                            return (
                              <div 
                                key={sub.id} 
                                className="bg-[#f8fafc] hover:bg-[#EBEEF3]/50 border border-[#E5E7EB] rounded-xl p-2.5 transition-all text-[14px]"
                              >
                                <div className="flex items-center justify-between font-bold text-[#1F2937] pb-1 border-b border-[#E5E7EB]/60 text-[12px]">
                                  <span className="truncate text-[12px]">{sub.name}</span>
                                </div>
                                <div className="mt-2 space-y-1 font-mono text-[12px] text-[#6B7280]">
                                  <div className="flex justify-between">
                                    <span>日营收:</span>
                                    <span className="text-[#ED6C3D] font-semibold">
                                      +{formatNum(sub.todayRevenue)}万
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-[#6B7280]">
                                    <span>当年累计:</span>
                                    <span className="text-[#1F2937] font-semibold">{formatNum(sub.yearRevenue)}万</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        </div>

      {/* RIGHT COMPONENT (lg:col-span-3): Annual Budget Progress Status Guard */}
      <div className="lg:col-span-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.025)] transition-all flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[#E5E7EB] mb-4.5">
            <div className="flex items-center gap-2">
              <div>
                <h3 className="text-[16px] font-bold text-[#1F2937]">预算时序进度监测面板</h3>
                <p className="text-[14px] text-[#6B7280]">YTD 智能预警与提质增效中枢</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[14px] font-mono font-bold px-2 py-0.8 bg-[#EBEEF3] border border-[#E5E7EB] text-[#6287EE] rounded-lg">
                标准进度 45.8%
              </span>
            </div>
          </div>

          {/* Revenue Achievement Section */}
          <div className="bg-[#F7F9FC]/70 border border-[#E5E7EB] rounded-2xl p-5 mb-4 h-[600px] flex flex-col">
            <div className="flex justify-between items-center text-[18px] font-semibold text-[#6B7280] mb-3">
              <span>营收达成概览</span>
              <span className="font-mono text-[14px] text-[#6287EE] font-bold">
                {operatingUnits.filter(u => u.budgetCompletion >= 45.8).length} 领先 / {operatingUnits.filter(u => u.budgetCompletion < 45.8).length} 滞后
              </span>
            </div>

            {/* Visual ratio bar */}
            <div className="w-full h-3 bg-slate-150 rounded-full overflow-hidden flex mb-4">
              <div
                className="h-full bg-[#6287EE] transition-all duration-500"
                style={{ width: `${(operatingUnits.filter(u => u.budgetCompletion >= 45.8).length / operatingUnits.length) * 100}%` }}
              />
              <div
                className="h-full bg-[#ED6C3D] transition-all duration-500"
                style={{ width: `${(operatingUnits.filter(u => u.budgetCompletion < 45.8).length / operatingUnits.length) * 100}%` }}
              />
            </div>

            {/* Top 3 Achieved */}
            <div className="mb-4 flex-1">
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#6287EE] mb-3">
                <CheckCircle2 className="h-4 w-4" />
                <span>时序达成先锋条线</span>
              </div>
              <div className="space-y-3">
                {operatingUnits
                  .filter(u => u.budgetCompletion >= 45.8)
                  .sort((a, b) => b.budgetCompletion - a.budgetCompletion)
                  .slice(0, 3)
                  .map(unit => {
                    const surplus = unit.budgetCompletion - 45.8;
                    return (
                      <div key={unit.id} className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] bg-white">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-[#6287EE]"></span>
                          <span className="font-bold text-[#1F2937] text-[14px] truncate">{unit.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#1F2937] text-[16px]">{unit.budgetCompletion}%</span>
                          <ArrowUpRight className="h-4 w-4 text-[#6287EE]" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Top 3 Lagging */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#ED6C3D] mb-3">
                <AlertCircle className="h-4 w-4" />
                <span>进度偏缓跟进条线</span>
              </div>
              <div className="space-y-3">
                {operatingUnits
                  .filter(u => u.budgetCompletion < 45.8)
                  .sort((a, b) => a.budgetCompletion - b.budgetCompletion)
                  .slice(0, 3)
                  .map(unit => {
                    const deficit = 45.8 - unit.budgetCompletion;
                    return (
                      <div key={unit.id} className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] bg-white">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          <span className="font-bold text-[#1F2937] text-[14px] truncate">{unit.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#1F2937] text-[16px]">{unit.budgetCompletion}%</span>
                          <ArrowDownRight className="h-4 w-4 text-[#ED6C3D]" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Profit Achievement Section */}
          <div className="bg-[#F7F9FC]/70 border border-[#E5E7EB] rounded-2xl p-5 mb-4 h-[600px] flex flex-col">
            <div className="flex justify-between items-center text-[18px] font-semibold text-[#6B7280] mb-3">
              <span>利润达成概览</span>
              <span className="font-mono text-[14px] text-[#ED6C3D] font-bold">
                {operatingUnits.filter(u => u.budgetCompletion >= 45.8).length} 领先 / {operatingUnits.filter(u => u.budgetCompletion < 45.8).length} 滞后
              </span>
            </div>

            {/* Visual ratio bar */}
            <div className="w-full h-3 bg-slate-150 rounded-full overflow-hidden flex mb-4">
              <div
                className="h-full bg-[#ED6C3D] transition-all duration-500"
                style={{ width: `${(operatingUnits.filter(u => u.budgetCompletion >= 45.8).length / operatingUnits.length) * 100}%` }}
              />
              <div
                className="h-full bg-[#F09060] transition-all duration-500"
                style={{ width: `${(operatingUnits.filter(u => u.budgetCompletion < 45.8).length / operatingUnits.length) * 100}%` }}
              />
            </div>

            {/* Top 3 Achieved */}
            <div className="mb-4 flex-1">
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#ED6C3D] mb-3">
                <CheckCircle2 className="h-4 w-4" />
                <span>时序达成先锋条线</span>
              </div>
              <div className="space-y-3">
                {operatingUnits
                  .filter(u => u.budgetCompletion >= 45.8)
                  .sort((a, b) => b.budgetCompletion - a.budgetCompletion)
                  .slice(0, 3)
                  .map(unit => {
                    const surplus = unit.budgetCompletion - 45.8;
                    return (
                      <div key={unit.id} className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] bg-white">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-[#ED6C3D]"></span>
                          <span className="font-bold text-[#1F2937] text-[14px] truncate">{unit.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#1F2937] text-[16px]">{unit.budgetCompletion}%</span>
                          <ArrowUpRight className="h-4 w-4 text-[#ED6C3D]" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Top 3 Lagging */}
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[14px] font-bold text-[#F09060] mb-3">
                <AlertCircle className="h-4 w-4" />
                <span>进度偏缓跟进条线</span>
              </div>
              <div className="space-y-3">
                {operatingUnits
                  .filter(u => u.budgetCompletion < 45.8)
                  .sort((a, b) => a.budgetCompletion - b.budgetCompletion)
                  .slice(0, 3)
                  .map(unit => {
                    const deficit = 45.8 - unit.budgetCompletion;
                    return (
                      <div key={unit.id} className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] bg-white">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                          <span className="font-bold text-[#1F2937] text-[14px] truncate">{unit.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#1F2937] text-[16px]">{unit.budgetCompletion}%</span>
                          <ArrowDownRight className="h-4 w-4 text-[#F09060]" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 每日资讯概览卡片 */}
      <div className="lg:col-span-4 bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3 border-b border-[#E5E7EB] pb-2">
          <span className="w-1.5 h-4 bg-[#886CE6] rounded-full"></span>
          <h3 className="text-[16px] font-bold text-[#1F2937]">每日资讯概览</h3>
        </div>
        <div className="space-y-3 text-[14px]">
          <div className="border-b border-[#E5E7EB] pb-3">
            <div className="font-semibold text-[#1F2937] mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#886CE6] rounded-full"></span>
              <span>券商公告</span>
            </div>
            <div className="text-[#1F2937] pl-4">
              <p>1.中信证券 2025 年度 A 股权益分派实施公告:公司拟向全体 A 股股东每股派送现金红利 <strong className="font-mono font-bold">0.41</strong> 元，共派送现金红利 <strong className="font-mono font-bold">5,002,192,689.34</strong> 元，股权登记日为 <strong className="font-mono font-bold">2026 年 6 月 9 日</strong>，现金红利发放日为 <strong className="font-mono font-bold">2026 年 6 月 10 日</strong>。</p>
            </div>
          </div>
          <div>
            <div className="font-semibold text-[#1F2937] mb-2 flex items-center gap-1.5">
              <span className="w-1 h-1 bg-[#886CE6] rounded-full"></span>
              <span>行业动态</span>
            </div>
            <div className="text-[#1F2937] pl-4 space-y-1">
              <p>1.年内券商发债突破 <strong className="font-mono font-bold">1 万亿元</strong>，同比增长 <strong className="font-mono font-bold">114.86%</strong></p>
              <p>2."透支式分红"频现，高分红热潮背后有隐忧，上市公司分红要量更要质</p>
              <p>3.科创债年内发行规模超 <strong className="font-mono font-bold">8,500 亿元</strong>，市场有望持续扩容</p>
              <p>4.港股 IPO 保荐人格局:中金公司 <strong className="font-mono font-bold">71 个</strong>项目领跑，多家券商各有表现</p>
            </div>
          </div>
        </div>
      </div>

      {/* 公司收发文卡片 */}
      <div className="lg:col-span-8 bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3 border-b border-[#E5E7EB] pb-2">
          <span className="w-1.5 h-4 bg-[#27C781] rounded-full"></span>
          <h3 className="text-[16px] font-bold text-[#1F2937]">公司收发文</h3>
        </div>
        <div className="space-y-4 text-[14px]">
          {/* 收文 */}
          <div>
            <table className="w-full text-[#1F2937] table-fixed">
              <colgroup>
                <col style={{width: '6%'}} />
                <col style={{width: '14%'}} />
                <col style={{width: '50%'}} />
                <col style={{width: '30%'}} />
              </colgroup>
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left font-medium py-1"><span className="font-semibold text-[#1F2937]">收文</span></th>
                  <th className="text-left font-medium py-1">发文单位</th>
                  <th className="text-left font-medium py-1">标题</th>
                  <th className="text-left font-medium py-1">主送部门</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#E5E7EB]/50">
                  <td className="py-1.5"></td>
                  <td className="py-1.5">中国证券业协会</td>
                  <td className="py-1.5">关于反馈证券公司数字化能力成熟度评估复核得分的通知 (第二轮)</td>
                  <td className="py-1.5">-</td>
                </tr>
                <tr className="border-b border-[#E5E7EB]/50">
                  <td className="py-1.5"></td>
                  <td className="py-1.5">中国证券业协会</td>
                  <td className="py-1.5">中国证券业协会重点课题评审感谢信(天风证券)</td>
                  <td className="py-1.5">-</td>
                </tr>
                <tr className="border-b border-[#E5E7EB]/50">
                  <td className="py-1.5"></td>
                  <td className="py-1.5">中国证券业协会</td>
                  <td className="py-1.5">关于填报证券行业税务问题调研问卷的函</td>
                  <td className="py-1.5">-</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* 发文 */}
          <div>
            <table className="w-full text-[#1F2937] table-fixed">
              <colgroup>
                <col style={{width: '6%'}} />
                <col style={{width: '14%'}} />
                <col style={{width: '50%'}} />
                <col style={{width: '30%'}} />
              </colgroup>
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left font-medium py-1"><span className="font-semibold text-[#1F2937]">发文</span></th>
                  <th className="text-left font-medium py-1">发文提起部门</th>
                  <th className="text-left font-medium py-1">标题</th>
                  <th className="text-left font-medium py-1">主送单位</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#E5E7EB]/50">
                  <td className="py-1.5"></td>
                  <td className="py-1.5">合规法律部</td>
                  <td className="py-1.5">关于南京鼎之昇诉天风证券、天风资管委托合同纠纷案 一审判决的报告</td>
                  <td className="py-1.5">宏泰集团</td>
                </tr>
                <tr className="border-b border-[#E5E7EB]/50">
                  <td className="py-1.5"></td>
                  <td className="py-1.5">人力资源部</td>
                  <td className="py-1.5">天风证券关于解除李正友等 4 人劳动关系的报告</td>
                  <td className="py-1.5">湖北监管局</td>
                </tr>
                <tr className="border-b border-[#E5E7EB]/50">
                  <td className="py-1.5"></td>
                  <td className="py-1.5">风险管理部</td>
                  <td className="py-1.5">关于光大银行代销集合产品风险处置情况紧急报告 (湖北监管局、上海监管局)</td>
                  <td className="py-1.5">湖北监管局、上海监管局</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};
