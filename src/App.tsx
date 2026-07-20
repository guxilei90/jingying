/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Header } from './components/Header';
import { AiSummary } from './components/AiSummary';
import { OperationalSection } from './components/OperationalSection';
import { InvestmentSection } from './components/InvestmentSection';
import { mockFinancialData } from './data/mockFinancialData';

export default function App() {
  const [selectedDate, setSelectedDate] = useState<string>('2026-06-03');
  const [selectedScenario, setSelectedScenario] = useState<'morning' | 'evening'>('morning');

  // Multi-date safety check fallback values
  const dateSnapshotMap = mockFinancialData[selectedDate] || mockFinancialData['2026-06-03'];
  const snapshot = dateSnapshotMap[selectedScenario] || dateSnapshotMap['morning'];

  // Linkage callback: when clicking on '下穿查看持仓' from operation table, scroll down and flash attention or expand
  const handleProprietaryLinkage = () => {
    const element = document.getElementById('investment-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans antialiased text-slate-800">
      
      {/* 1. TOP HEADER & TELEMETRY CLOCK BAR */}
      <Header
        currentSnapshot={snapshot}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedScenario={selectedScenario}
        setSelectedScenario={setSelectedScenario}
      />

      {/* VIEWPORT AREA WITH ANIMATED TRANSITIONS */}
      <main className="max-w-[1920px] mx-auto p-6 space-y-6">
        <motion.div
              key="terminal-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {selectedScenario === 'morning' ? (
                <>
                  {/* Scenario Ticker banner notice (Beautiful App Store Capsule) */}
                  <div className="bg-blue-50/50 border border-blue-100/60 p-4 rounded-2xl text-xs flex flex-col md:flex-row md:items-center justify-between gap-2 shadow-[0_2px_12px_rgba(37,99,235,0.015)]">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                      </span>
                      <span className="text-[14px]">
                        当前场景分析：
                        <strong className="text-blue-600 font-bold font-sans">
                          {selectedScenario === 'morning' ? '研判场景' : '日终盘后业绩结转场景 (盘后清账)'}
                        </strong>
                        （数据结转清算时间：
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="bg-blue-50 border border-blue-300 text-blue-600 font-mono px-2 py-1 rounded cursor-pointer hover:border-blue-500 hover:bg-blue-100 outline-none text-[14px]"
                        />
                        ）
                      </span>
                    </div>
                    <div className="text-[14px] text-slate-500 font-mono">
                      数字化账套沙箱在并账模式下运行，清算中心指标完全可向下穿透与多账户联动。
                    </div>
                  </div>

                  {/* 2. TOP CARDS (Metric Summary left card + AI Analysis right cards) */}
                  <AiSummary
                    aiOperation={snapshot.aiOperation}
                    aiInvestment={snapshot.aiInvestment}
                    overview={snapshot.overview}
                    selectedDate={selectedDate}
                    selectedScenario={selectedScenario}
                    marketOverview={snapshot.marketOverview}
                  />

                  {/* 投资板块 + 风控指标 左右布局 */}
                  <div className="grid grid-cols-12 gap-4">
                    {/* 投资板块日盈亏 (col-span-7) */}
                    <div className="col-span-7 bg-gradient-to-br from-[#FAFAFC] via-[#F4F6F9] to-[#ECEEF3] border border-[#E8EAEF] rounded-3xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB] mb-3">
                        <span className="w-1.5 h-4 bg-[#6287EE] rounded-full"></span>
                        <h3 className="text-sm font-bold text-[#1F2937] tracking-tight">投资板块日盈亏</h3>
                      </div>
                      {/* AI投资情况分析卡片 */}
                      <div className="mb-3 bg-gradient-to-r from-[#6287EE]/5 to-[#ED6C3D]/5 border border-[#E5E7EB]/50 rounded-2xl p-3">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-[#6287EE]" />
                          <span className="text-[14px] font-bold text-[#1F2937]">AI投资情况分析</span>
                          <span className="text-[10px] text-[#6B7280] bg-[#F7F9FC] px-1.5 py-0.5 rounded-full">T-1日</span>
                        </div>
                        <p className="text-[14px] text-[#6B7280] leading-relaxed">
                          今日自营受通信、储能板块回撤影响净亏损1,631万元，占当日总市值-0.63%。六大账户中仅高股息账户与ETF量化对冲贡献正收益，防御性账户表现稳健。
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="bg-[#6287EE] rounded-xl p-3 text-white">
                          <div className="text-[11px] opacity-80 mb-1">合计用资变化</div>
                          <div className="text-[18px] font-mono font-bold">+17.7亿</div>
                          <div className="text-[10px] opacity-60 mt-1">较上日+2.3亿</div>
                        </div>
                        <div className="bg-[#ED6C3D] rounded-xl p-3 text-white">
                          <div className="text-[11px] opacity-80 mb-1">合计日盈亏</div>
                          <div className="text-[18px] font-mono font-bold">+1,725万</div>
                          <div className="text-[10px] opacity-60 mt-1">较上日+85万</div>
                        </div>
                        <div className="bg-[#ED6C3D] rounded-xl p-3 text-white">
                          <div className="text-[11px] opacity-80 mb-1">年累计收益率</div>
                          <div className="text-[18px] font-mono font-bold">+0.97%</div>
                          <div className="text-[10px] opacity-60 mt-1">较上日+0.12%</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-[#F7F9FC] rounded-xl p-3">
                          <div className="text-[12px] text-[#6B7280] font-semibold mb-2">日用资变化</div>
                          <div className="space-y-1.5 text-[14px]">
                            <div className="flex justify-between"><span className="text-[#6B7280]">权益类</span><span className="font-mono">+12.5亿</span></div>
                            <div className="flex justify-between"><span className="text-[#6B7280]">固收类</span><span className="font-mono">+3.2亿</span></div>
                            <div className="flex justify-between"><span className="text-[#6B7280]">做市类</span><span className="font-mono">+0.8亿</span></div>
                            <div className="flex justify-between"><span className="text-[#6B7280]">总部-投行</span><span className="font-mono">+1.5亿</span></div>
                            <div className="flex justify-between"><span className="text-[#6B7280]">总部-其他</span><span className="font-mono">-0.3亿</span></div>
                          </div>
                        </div>
                        <div className="bg-[#F7F9FC] rounded-xl p-3">
                          <div className="text-[12px] text-[#6B7280] font-semibold mb-2">日盈亏</div>
                          <div className="space-y-1.5 text-[14px]">
                            <div className="flex justify-between"><span className="text-[#6B7280]">权益类</span><span className="font-mono text-[#ED6C3D]">+1,820万</span></div>
                            <div className="flex justify-between"><span className="text-[#6B7280]">固收类</span><span className="font-mono text-[#ED6C3D]">+82万</span></div>
                            <div className="flex justify-between"><span className="text-[#6B7280]">做市类</span><span className="font-mono text-[#ED6C3D]">+5万</span></div>
                            <div className="flex justify-between"><span className="text-[#6B7280]">总部-投行</span><span className="font-mono text-[#27C781]">-29万</span></div>
                            <div className="flex justify-between"><span className="text-[#6B7280]">总部-其他</span><span className="font-mono text-[#27C781]">-153万</span></div>
                          </div>
                        </div>
                        <div className="bg-[#F7F9FC] rounded-xl p-3">
                          <div className="text-[12px] text-[#6B7280] font-semibold mb-2">年累计收益率</div>
                          <div className="space-y-1.5 text-[14px]">
                            <div className="flex justify-between"><span className="text-[#6B7280]">权益类</span><span className="font-mono text-[#ED6C3D]">+1.62%</span></div>
                            <div className="flex justify-between"><span className="text-[#6B7280]">固收类</span><span className="font-mono text-[#ED6C3D]">+0.26%</span></div>
                            <div className="flex justify-between"><span className="text-[#6B7280]">做市类</span><span className="font-mono text-[#ED6C3D]">+0.06%</span></div>
                            <div className="flex justify-between"><span className="text-[#6B7280]">总部-投行</span><span className="font-mono text-[#27C781]">-0.19%</span></div>
                            <div className="flex justify-between"><span className="text-[#6B7280]">总部-其他</span><span className="font-mono text-[#27C781]">-0.15%</span></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 风控指标情况 (col-span-5) */}
                    <div className="col-span-5 bg-[#F8F9FB] border border-[#E8EAEF] rounded-3xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB] mb-3">
                        <span className="w-1.5 h-4 bg-[#27C781] rounded-full"></span>
                        <h3 className="text-sm font-bold text-[#1F2937] tracking-tight">风控指标情况</h3>
                      </div>
                      <div className="mb-3 bg-gradient-to-r from-[#27C781]/5 to-[#6287EE]/5 border border-[#E5E7EB]/50 rounded-2xl p-3">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27C781] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#27C781]"></span>
                          </span>
                          <span className="text-[14px] font-bold text-[#1F2937]">AI风控分析</span>
                          <span className="text-[10px] text-[#6B7280] bg-[#F7F9FC] px-1.5 py-0.5 rounded-full">T-1日</span>
                        </div>
                        <p className="text-[14px] text-[#6B7280] leading-relaxed">
                          今日风控各项指标均处于安全区间，无超标情况。
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white rounded-lg p-2 border border-[#E5E7EB]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#27C781] shrink-0"></span>
                            <span className="text-[12px] text-[#6B7280]">风险覆盖率</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-mono font-bold text-[#1F2937]">163.70%</span>
                            <span className="text-[12px] text-[#9CA3AF]">≥120% ≥100%</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-[#E5E7EB]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#27C781] shrink-0"></span>
                            <span className="text-[12px] text-[#6B7280]">资本杠杆率</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-mono font-bold text-[#1F2937]">21.63%</span>
                            <span className="text-[12px] text-[#9CA3AF]">≥9.6% ≥8%</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-[#E5E7EB]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#27C781] shrink-0"></span>
                            <span className="text-[12px] text-[#6B7280]">净资本/净资产</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-mono font-bold text-[#1F2937]">69.26%</span>
                            <span className="text-[12px] text-[#9CA3AF]">≥24% ≥20%</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-[#E5E7EB]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#27C781] shrink-0"></span>
                            <span className="text-[12px] text-[#6B7280]">流动性覆盖率</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-mono font-bold text-[#1F2937]">397.72%</span>
                            <span className="text-[12px] text-[#9CA3AF]">≥120% ≥100%</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-[#ECB66D]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ECB66D] shrink-0"></span>
                            <span className="text-[12px] text-[#6B7280]">净稳定资金率</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-mono font-bold text-[#ECB66D]">109.56%</span>
                            <span className="text-[12px] text-[#9CA3AF]">≥120% ≥100%</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-[#E5E7EB]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#27C781] shrink-0"></span>
                            <span className="text-[12px] text-[#6B7280]">自营权益类/净资本</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-mono font-bold text-[#1F2937]">16.31%</span>
                            <span className="text-[12px] text-[#9CA3AF]">≤80% ≤100%</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-[#E5E7EB]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#27C781] shrink-0"></span>
                            <span className="text-[12px] text-[#6B7280]">自营非权益/净资本</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-mono font-bold text-[#1F2937]">153.25%</span>
                            <span className="text-[12px] text-[#9CA3AF]">≤400% ≤500%</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-[#E5E7EB]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#27C781] shrink-0"></span>
                            <span className="text-[12px] text-[#6B7280]">单一权益成本/净资本</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-mono font-bold text-[#1F2937]">0.86%</span>
                            <span className="text-[12px] text-[#9CA3AF]">≤24% ≤30%</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-[#ED6C3D]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ED6C3D] shrink-0"></span>
                            <span className="text-[12px] text-[#6B7280]">单一权益市值/总市值</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-mono font-bold text-[#ED6C3D]">3.99%</span>
                            <span className="text-[12px] text-[#9CA3AF]">≤4% ≤5%</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-[#ED6C3D]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ED6C3D] shrink-0"></span>
                            <span className="text-[12px] text-[#6B7280]">单一非权益/总规模</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-mono font-bold text-[#ED6C3D]">83.33%</span>
                            <span className="text-[12px] text-[#9CA3AF]">≤16% ≤20%</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-[#E5E7EB]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#27C781] shrink-0"></span>
                            <span className="text-[12px] text-[#6B7280]">单一客户融资/净资本</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-mono font-bold text-[#1F2937]">2.63%</span>
                            <span className="text-[12px] text-[#9CA3AF]">≤4% ≤5%</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-2 border border-[#E5E7EB]">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#27C781] shrink-0"></span>
                            <span className="text-[12px] text-[#6B7280]">担保证券/该股总市值</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[14px] font-mono font-bold text-[#1F2937]">1.85%</span>
                            <span className="text-[12px] text-[#9CA3AF]">≤16% ≤20%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. MIDDLE SECTION: GROUP BUSINESS LINES & BUDGET RADAR CHART */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
                      <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">集团二级经营条线及预算达成雷达监控</span>
                    </div>
                    <OperationalSection
                      overview={snapshot.overview}
                      operatingUnits={snapshot.operatingUnits}
                      onProprietaryClick={handleProprietaryLinkage}
                    />
                  </div>
                </>
              ) : null}

              {/* 4. BOTTOM SECTION: POST-MARKET INVESTMENT PORTFOLIOS & RISK SENTINEL */}
              <div id="investment-container" className="space-y-2 scroll-mt-24 pt-2">
                <div className="flex items-center gap-2 px-1">
                  <span className="w-2.5 h-2.5 bg-teal-500 rounded-full"></span>
                  <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">自营投资穿透、六大自营账户资产及风控</span>
                  <span className="text-[10px] text-slate-400">T-1日持仓快照</span>
                </div>
                <InvestmentSection
                  profits={snapshot.investmentProfits}
                  sizes={snapshot.holdingSizes}
                  topHoldings={snapshot.topHoldings}
                  changes={snapshot.holdingChanges}
                  utilizations={snapshot.capitalUtilizations}
                  risks={snapshot.riskPrompts}
                  selectedScenario={selectedScenario}
                />
              </div>
            </motion.div>
      </main>

      {/* FOOTER SYSTEM LABEL */}
      <footer className="border-t border-slate-100 mt-16 py-8 text-center text-xs text-slate-400 bg-white shadow-inner select-none">
        <p className="font-semibold text-slate-500">2026 天风证券股份有限公司 经营管理 保密并账监制</p>
        <p className="mt-2 text-[10px] text-slate-400 font-mono">
          System Core: Sandbox Stable Clean | Session Token: SECY-PRES-{selectedDate}-{selectedScenario.toUpperCase()}
        </p>
      </footer>
    </div>
  );
}
