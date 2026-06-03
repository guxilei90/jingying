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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-50 pb-4 mb-5 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#6287EE] rounded-full"></span>
            <h2 className="text-sm font-bold text-[#1F2937] tracking-tight flex items-center gap-1.5">
              分条线经营与自营责任单元业绩卡片看板
            </h2>
            <span className="text-[14px] text-[#6B7280] bg-[#EBEEF3] border border-[#E5E7EB] px-2 py-0.5 rounded-full font-medium">
              T-1日全口径穿透式快照
            </span>
          </div>

          {/* Search, Filter & Export */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            {/* Search filter */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="搜索条线/主管"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#F7F9FC] border border-[#E5E7EB] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#1F2937] placeholder-slate-400 focus:outline-none focus:border-[#6287EE]/50 w-36 font-sans"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-[#F7F9FC] border border-[#E5E7EB] rounded-xl px-2 py-1.5 text-xs text-[#6B7280] focus:outline-none focus:border-[#6287EE]/50"
            >
              <option value="id">默认条线顺</option>
              <option value="todayProfit">按本日盈亏</option>
              <option value="yearProfit">按当年累计</option>
              <option value="revenueRatio">按收入贡献</option>
            </select>

            {/* Simulated Report Downloader */}
            <button
              onClick={() => alert(`[演示系统] 天风证券经营实况报表已就绪！\n已成功生成《各业务条线及经营责任清算明细-YTD.xlsx》并推送到您的总裁办公室邮箱及晨会机要板。`)}
              className="flex items-center gap-1 bg-[#ECB66D] hover:bg-[#CCA96F] text-[#FFFFFF] border border-[#CCA96F] px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer font-semibold shrink-0"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span>导出 excel</span>
            </button>
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
                        <h3 className="font-bold text-[#1F2937] text-[13px] tracking-tight">{unit.name}</h3>
                        <span className="text-[14px] text-[#6B7280] font-sans">主管：{unit.manager}</span>
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
                      <span className="text-[12px] text-[#6B7280] font-medium block">T-1日营收</span>
                      <span className="text-[16px] font-mono font-bold text-[#1F2937] mt-0.5 block">
                        {formatNum(unit.todayRevenue)} <span className="font-sans font-normal text-[12px] text-[#6B7280] ml-0.2">万</span>
                      </span>
                    </div>
                    <div className="p-2 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] flex items-center justify-between">
                      <div>
                        <span className="text-[12px] text-[#6B7280] font-medium block">利润总额</span>
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
                      <span className="text-[12px] text-[#6B7280] font-medium block">当月累计</span>
                      <span className="text-[16px] font-mono font-semibold text-[#1F2937] mt-0.5 block">
                        {formatNum(unit.monthProfit)} <span className="font-sans font-normal text-[12px] text-[#6B7280] ml-0.2">万</span>
                      </span>
                    </div>
                    <div className="p-2 bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] flex items-center justify-between">
                      <div>
                        <span className="text-[12px] text-[#6B7280] font-medium block">当年累计(超额)</span>
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

                  {/* Nested fine items (collapsible cards for Wealth Management and Proprietary units only) */}
                  {hasChildren && (unit.id === 'bu-wealth' || unit.id === 'bu-proprietary') && (
                    <div className="mt-3.5 pt-3 border-t border-[#E5E7EB]">
                      <div 
                        onClick={() => toggleRow(unit.id)}
                        className="flex items-center justify-between cursor-pointer text-[#1F2937] hover:text-[#6287EE] transition-colors mb-2 text-[10.5px] font-bold"
                      >
                        <span className="flex items-center gap-1">
                          <span>📂 条线业务成份 ({unit.children?.length}大业务板块)</span>
                        </span>
                        <span className="text-[#6B7280] text-[9.5px]">
                          {isExpanded ? '点击折叠 ✕' : '点击展开 ➔'}
                        </span>
                      </div>
                      
                      {isExpanded && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {unit.children?.map((sub) => {
                            const isPos = sub.todayRevenue >= 0;
                            return (
                              <div 
                                key={sub.id} 
                                className="bg-[#f8fafc] hover:bg-[#EBEEF3]/50 border border-[#E5E7EB] rounded-xl p-2.5 transition-all text-[14px]"
                              >
                                <div className="flex items-center justify-between font-bold text-[#1F2937] pb-1 border-b border-[#E5E7EB]/60">
                                  <span className="truncate">{sub.name}</span>
                                  <span className="text-[12px] font-normal text-[#6B7280] scale-[0.85] origin-right shrink-0">成分</span>
                                </div>
                                <div className="mt-2 space-y-1 font-mono text-[9.5px] text-[#6B7280]">
                                  <div className="flex justify-between">
                                    <span>T-1日营收:</span>
                                    <span className={isPos ? "text-[#ED6C3D] font-semibold" : "text-[#ECB66D]"}>
                                      {isPos ? '+' : ''}{formatNum(sub.todayRevenue)}万
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

        {/* Legend / Caption footer */}
        <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between text-[16px] text-[#6B7280] gap-2 border-t border-[#E5E7EB] pt-3.5">
          <span>数据源: 集中交易柜台、TA估值清算系统 · 实结T-0 16:30对齐（分时条线数据已按自筹责任中枢扎差并轧）</span>
          <div className="flex items-center gap-3 font-semibold text-[14px] shrink-0">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F7C4AB]0"></span> 
              <span className="text-red-650">T-1日创富盈利</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F7C4AB]"></span> 
              <span className="text-[#ECB66D]">T-1日波动回撤</span>
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT COMPONENT (lg:col-span-3): Annual Budget Progress Status Guard */}
      <div className="lg:col-span-3 bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.025)] transition-all flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-[#E5E7EB] mb-4.5">
            <div className="flex items-center gap-2">
              <div>
                <h3 className="text-[13px] font-bold text-[#1F2937]">预算时序进度监测面板</h3>
                <p className="text-[14px] text-[#6B7280]">YTD 智能预警与提质增效中枢</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[14px] font-mono font-bold px-2 py-0.8 bg-[#EBEEF3] border border-[#E5E7EB] text-[#6287EE] rounded-lg">
                标准进度 45.8%
              </span>
            </div>
          </div>

          {/* Quick status progress gauge */}
          <div className="bg-[#F7F9FC]/70 border border-[#E5E7EB] rounded-2xl p-3.5 mb-4">
            <div className="flex justify-between items-center text-[16px] font-semibold text-[#6B7280] mb-2">
              <span>达成广度概览</span>
              <span className="font-mono text-xs text-[#6287EE] font-bold">50.0% 正位达标</span>
            </div>
            
            {/* Visual ratio bar */}
            <div className="w-full h-2 bg-slate-150 rounded-full overflow-hidden flex mb-2.5">
              <div className="h-full bg-[#F7C4AB] transition-all duration-500" style={{ width: '50%' }} title="3条线已达成 YTD 进度" />
              <div className="h-full bg-[#6287EE] transition-all duration-500" style={{ width: '50%' }} title="3条线待发力追赶 YTD 进度" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-[14px] text-[#6B7280] pt-1">
              <div className="bg-[#6287EE]/10 border border-[#6287EE]/30 py-1 px-1.5 rounded-lg flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#6287EE] rounded-full"></span>
                <span>领先达标线：<strong className="font-mono text-[#6287EE] font-bold">3</strong> 条</span>
              </div>
              <div className="bg-amber-50/50 border border-amber-100/30 py-1 px-1.5 rounded-lg flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                <span>距要求滞后：<strong className="font-mono text-amber-700 font-bold">3</strong> 条</span>
              </div>
            </div>
          </div>

          {/* Category List: ACHIEVED (Lead Units) */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-[16px] font-bold text-[#6287EE] bg-[#6287EE]/10 p-1.5 rounded-lg px-2.5 mb-2 border border-[#6287EE]/20">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#6287EE] shrink-0" />
                  <span>时序达成先锋条线</span>
                </span>
                <span className="text-[9.5px] scale-[0.9] origin-right font-normal">超越基准(45.8%)</span>
              </div>

              <div className="space-y-1.5">
                {operatingUnits
                  .filter(u => u.budgetCompletion >= 45.8)
                  .map(unit => {
                    const surplus = unit.budgetCompletion - 45.8;
                    return (
                      <div key={unit.id} className="group flex items-center justify-between p-2.5 rounded-xl border border-[#E5E7EB] hover:border-border-[#F7C4AB] hover:bg-[#F7C4AB]/10 transition-all text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6287EE]"></span>
                          <span className="font-bold text-[#1F2937] truncate">{unit.name}</span>
                          <span className="text-[12px] text-[#6B7280] scale-[0.85] origin-left">({unit.manager})</span>
                        </div>
                        <div className="flex items-center gap-2 text-right">
                          <div>
                            <span className="font-mono font-bold text-[#1F2937] block text-[16px]">{unit.budgetCompletion}%</span>
                            <span className="text-[12px] font-mono text-[#6287EE] block flex items-center gap-0.2 select-none justify-end font-semibold">
                              <ArrowUpRight className="h-2.5 w-2.5 stroke-[2.5]" />+{surplus.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>

            {/* Category List: LAGGING (Warning Units) */}
            <div>
              <div className="flex items-center justify-between text-[16px] font-bold text-[#ECB66D] bg-[#F7C4AB]/40 p-1.5 rounded-lg px-2.5 mb-2 border border-[#F7C4AB]/20">
                <span className="flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5 text-[#ECB66D] shrink-0" />
                  <span>进度偏缓跟进条线</span>
                </span>
                <span className="text-[9.5px] scale-[0.9] origin-right font-normal">补齐缺口(45.8%)</span>
              </div>

              <div className="space-y-1.5">
                {operatingUnits
                  .filter(u => u.budgetCompletion < 45.8)
                  .map(unit => {
                    const deficit = 45.8 - unit.budgetCompletion;
                    return (
                      <div key={unit.id} className="group flex items-center justify-between p-2.5 rounded-xl border border-[#E5E7EB] hover:border-amber-200 hover:bg-amber-50/10 transition-all text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          <span className="font-bold text-[#1F2937] truncate">{unit.name}</span>
                          <span className="text-[12px] text-[#6B7280] scale-[0.85] origin-left">({unit.manager})</span>
                        </div>
                        <div className="flex items-center gap-2 text-right">
                          <div>
                            <span className="font-mono font-bold text-[#1F2937] block text-[16px]">{unit.budgetCompletion}%</span>
                            <span className="text-[12px] font-mono text-amber-600 block flex items-center gap-0.2 select-none justify-end font-semibold">
                              <ArrowDownRight className="h-2.5 w-2.5 stroke-[2.5]" />-{deficit.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Actionable decision box at bottom */}
        <div className="mt-4 bg-[#f8fafc] border border-[#E5E7EB] p-3 rounded-2xl text-[10.5px]">
          <div className="flex items-center gap-1 font-bold text-[#1F2937] pb-1.5 mb-1.5 border-b border-[#E5E7EB]">
            <Sparkles className="h-3.5 w-3.5 text-[#6287EE] shrink-0" />
            <span>天风决策赋能建议</span>
          </div>
          <p className="text-[#6B7280] leading-relaxed text-[14px]">
            当前财富管理仅差 <strong className="text-amber-600 font-mono">0.8%</strong> 即可回填时间线，建议强化季末代销及基金固收自研转化；投资银行当前缺口较大（-4.8%），需加快项目投决会审议进度和发行窗口期锁定。
          </p>
        </div>
      </div>

    </div>
  );
};
