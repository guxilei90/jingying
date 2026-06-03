/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
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
                      <span>
                        当前场景分析：
                        <strong className="text-blue-600 font-bold font-sans">
                          {selectedScenario === 'morning' ? '早会晨间研判场景 (晨会5分钟决策)' : '日终盘后业绩结转场景 (盘后清账)'}
                        </strong>
                        （数据结转清算时间：{selectedDate} {selectedScenario === 'morning' ? '08:30:00' : '17:00:00'}）
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
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

                  {/* 投资板块 */}
                  <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.015)]">
                    <div className="flex items-center gap-2 pb-3 border-b border-[#E5E7EB] mb-4">
                      <span className="w-1.5 h-4 bg-[#6287EE] rounded-full"></span>
                      <h3 className="text-sm font-bold text-[#1F2937] tracking-tight">投资板块当日盈亏</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-[#6287EE] rounded-xl p-4 text-white">
                        <div className="text-[12px] opacity-80 mb-1">合计用资变化</div>
                        <div className="text-[22px] font-mono font-bold">+17.7亿</div>
                      </div>
                      <div className="bg-[#ED6C3D] rounded-xl p-4 text-white">
                        <div className="text-[12px] opacity-80 mb-1">合计当日盈亏</div>
                        <div className="text-[22px] font-mono font-bold">+1,725万</div>
                      </div>
                      <div className="bg-[#ED6C3D] rounded-xl p-4 text-white">
                        <div className="text-[12px] opacity-80 mb-1">合计当日收益率</div>
                        <div className="text-[22px] font-mono font-bold">+0.97%</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {/* 当日用资变化 */}
                      <div className="bg-[#F7F9FC] rounded-xl p-4">
                        <div className="text-[14px] text-[#6B7280] font-semibold mb-3">当日用资变化</div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">权益类</span>
                            <span className="font-mono text-[#1F2937]">+12.5亿</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">固收类</span>
                            <span className="font-mono text-[#1F2937]">+3.2亿</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">做市类</span>
                            <span className="font-mono text-[#1F2937]">+0.8亿</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">总部-投行做市</span>
                            <span className="font-mono text-[#1F2937]">+1.5亿</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">总部-其他</span>
                            <span className="font-mono text-[#1F2937]">-0.3亿</span>
                          </div>
                        </div>
                      </div>
                      {/* 当日盈亏 */}
                      <div className="bg-[#F7F9FC] rounded-xl p-4">
                        <div className="text-[14px] text-[#6B7280] font-semibold mb-3">当日盈亏</div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">权益类</span>
                            <span className="font-mono font-bold text-[#ED6C3D]">+1,820万</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">固收类</span>
                            <span className="font-mono font-bold text-[#ED6C3D]">+82万</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">做市类</span>
                            <span className="font-mono font-bold text-[#ED6C3D]">+5万</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">总部-投行做市</span>
                            <span className="font-mono text-[#27C781]">-29万</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">总部-其他</span>
                            <span className="font-mono text-[#27C781]">-153万</span>
                          </div>
                        </div>
                      </div>
                      {/* 当日收益率 */}
                      <div className="bg-[#F7F9FC] rounded-xl p-4">
                        <div className="text-[14px] text-[#6B7280] font-semibold mb-3">当日收益率</div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">权益类</span>
                            <span className="font-mono font-bold text-[#ED6C3D]">+1.62%</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">固收类</span>
                            <span className="font-mono font-bold text-[#ED6C3D]">+0.26%</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">做市类</span>
                            <span className="font-mono font-bold text-[#ED6C3D]">+0.06%</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">总部-投行做市</span>
                            <span className="font-mono text-[#27C781]">-0.19%</span>
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <span className="text-[#6B7280]">总部-其他</span>
                            <span className="font-mono text-[#27C781]">-0.15%</span>
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
        <p className="font-semibold text-slate-500">© 2026 天风证券集团股份有限公司 · 经营规划委员会 & 首席中轨道风控中心 · 保密并账监制</p>
        <p className="mt-2 text-[10px] text-slate-400 font-mono">
          System Core: Sandbox Stable Clean | Session Token: SECY-PRES-{selectedDate}-{selectedScenario.toUpperCase()}
        </p>
      </footer>
    </div>
  );
}
