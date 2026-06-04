/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldAlert, TrendingUp, DollarSign, PieChart, Activity, RefreshCw, Layers, CheckCircle2, ChevronRight, Bookmark, Landmark, AlertTriangle } from 'lucide-react';
import { InvestmentProfit, HoldingSize, TopHolding, HoldingChange, CapitalUtilization, RiskPrompt, RiskLevel } from '../types';

interface InvestmentSectionProps {
  profits: InvestmentProfit[];
  sizes: HoldingSize[];
  topHoldings: TopHolding[];
  changes: HoldingChange[];
  utilizations: CapitalUtilization[];
  risks: RiskPrompt[];
  selectedScenario: 'morning' | 'evening';
}

export const InvestmentSection: React.FC<InvestmentSectionProps> = ({
  profits,
  sizes,
  topHoldings,
  changes,
  utilizations,
  risks,
  selectedScenario,
}) => {
  const [selectedAccount, setSelectedAccount] = useState<string>('acc-2070');
  const [isRiskConfirmed, setIsRiskConfirmed] = useState<Record<string, boolean>>({});
  const [animatedKpi, setAnimatedKpi] = useState({
    totalValue: 0,
    netBuy: 0,
    dailyPnL: 0,
    yearPnL: 0,
  });

  // Count-up animation for KPI values - triggers when switching to 盘后分析
  useEffect(() => {
    // Reset to 0 when switching to evening scenario to replay animation
    if (selectedScenario === 'evening') {
      setAnimatedKpi({
        totalValue: 0,
        netBuy: 0,
        dailyPnL: 0,
        yearPnL: 0,
      });
    }

    const duration = 1000;
    const steps = 50;
    const interval = duration / steps;
    let step = 0;

    const targetValues = {
      totalValue: 25.80,
      netBuy: -26.17,
      dailyPnL: -1.631,
      yearPnL: 9.644,
    };

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedKpi({
        totalValue: targetValues.totalValue * easeOut,
        netBuy: targetValues.netBuy * easeOut,
        dailyPnL: targetValues.dailyPnL * easeOut,
        yearPnL: targetValues.yearPnL * easeOut,
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedKpi(targetValues);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [selectedScenario]);

  const handleForcedExit = (id: string, target: string) => {
    alert(`[风控部强平响应指令] 针对超期质押标的项: "${target}" 的强制退出程序已就绪。\n正在通过中国证券登记结算上海/深圳分公司进行实时并账清算与强制交割。`);
    setIsRiskConfirmed(prev => ({ ...prev, [id]: true }));
  };

  const getRiskBadge = (status: RiskLevel) => {
    if (status === 'RED') {
      return (
        <span className="inline-flex items-center gap-1.5 bg-[#F7C4AB] text-[#ED6C3D] border border-[#ED6C3D] px-2.5 py-0.5 rounded-full text-[14px] font-bold animate-pulse">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F7C4AB]0"></span>
          破线强平区
        </span>
      );
    }
    if (status === 'YELLOW') {
      return (
        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-0.5 rounded-full text-[14px] font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
          预警追保
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 bg-[#27C781] text-[#27C781] border border-bg-[#F7C4AB] px-2.5 py-0.5 rounded-full text-[14px] font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-[#27C781]"></span>
        合规稳健
      </span>
    );
  };

  const renderValueColor = (val: number, hasBold = true) => {
    if (val > 0) return `text-[#ED6C3D] font-mono ${hasBold ? 'font-bold' : ''}`;
    if (val < 0) return `text-[#27C781] font-mono ${hasBold ? 'font-bold' : ''}`;
    return 'text-[#6B7280] font-mono';
  };

  const formatNum = (num: number, hasSign = false) => {
    const absVal = Math.abs(num).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (num > 0) return hasSign ? `+${absVal}` : absVal;
    if (num < 0) return `-${absVal}`;
    return '0.00';
  };

  // Six account definitions exactly matching user's image metrics
  const accountsData = [
    {
      id: 'acc-2070',
      name: '2070 ETF交易账户',
      type: '权益类ETF',
      netBuy: -2002,
      holdingsValue: 112069, // 11.21亿 (112,069万元)
      todayPnL: -1185,
      yearPnL: 11487, // 1.15亿
      desc: '持有权益类基金11.21亿元，本年累计盈利1.15亿元，单日随半导体与人工智能回撤 1,185 万元。',
      etfs: [
        { name: '创业板ETF易方达', code: '159915', qty: '6,920 万份', price: 4.06, value: 28068, netBuy: 0, todayPnL: 7, YTD: 4528 },
        { name: '通信ETF华夏', code: '515880', qty: '20,700 万份', price: 1.20, value: 24778, netBuy: 0, todayPnL: -207, YTD: 3441 },
        { name: '通信ETF国泰', code: '515810', qty: '16,000 万份', price: 1.54, value: 24624, netBuy: 0, todayPnL: -144, YTD: 2407 },
        { name: '储能电池ETF易方达', code: '159501', qty: '4,601 万份', price: 2.43, value: 11189, netBuy: 11346, todayPnL: -158, YTD: -158 },
        { name: '创业板成长ETF华夏', code: '159958', qty: '10,000 万份', price: 0.93, value: 9250, netBuy: 0, todayPnL: -50, YTD: -6 },
        { name: '科创半导体ETF华夏', code: '588200', qty: '3,550 万份', price: 2.57, value: 9109, netBuy: 0, todayPnL: -366, YTD: 142 },
        { name: '半导体设备ETF国泰', code: '562500', qty: '4,000 万份', price: 1.26, value: 5052, netBuy: -5105, todayPnL: -339, YTD: 560 },
        { name: '人工智能ETF易方达', code: '159819', qty: '0 万份', price: 2.01, value: 0, netBuy: -8244, todayPnL: 72, YTD: 572 }
      ]
    },
    {
      id: 'acc-2151',
      name: '2151 高股息账户',
      type: '高分红红利股',
      netBuy: 2727,
      holdingsValue: 140300, // 14.03亿
      todayPnL: 0,
      yearPnL: 1903,
      desc: '账户股票市值14.03亿元，本年累计分红 1,903万元，单日防守未新增分红。账面红利股回撤平盘。'
    },
    {
      id: 'acc-2152',
      name: '2152 股指期货账户',
      type: '套期保值交易',
      netBuy: -26895,
      holdingsValue: 0,
      todayPnL: -417,
      yearPnL: -671,
      desc: '账户持仓名义本金为0，本日做空套保，合计净买入-26,895万元，单日亏损417万元。'
    },
    {
      id: 'acc-2154',
      name: '2154 期权交易账户',
      type: '波动做市保护',
      netBuy: 0,
      holdingsValue: 0,
      todayPnL: 0,
      yearPnL: 10,
      desc: '平盘中。期权防波对冲市值 0 万元，本年累计贡献盈利 10 万元，运行正常。'
    },
    {
      id: 'acc-2156',
      name: '2156 股票自营多头',
      type: '成长股多头',
      netBuy: 0,
      holdingsValue: 0,
      todayPnL: 0,
      yearPnL: 31,
      desc: '自营股票主账户无仓位，本年累计实现落袋盈利 31 万元。'
    },
    {
      id: 'acc-2160',
      name: '2160 融券融券中轨',
      type: '客户对冲账户',
      netBuy: 0,
      holdingsValue: 3600, // 3600万
      todayPnL: -29,
      yearPnL: 34,
      desc: '股票持仓市值0.36亿元，本年累计盈利34万元，受大盘行情牵连单日亏损 29 万元。'
    }
  ];

  const currentAcc = accountsData.find(a => a.id === selectedAccount) || accountsData[0];

  return (
    <div className="space-y-5 select-none">
      
      {/* SECTION TOP HEADER: Title card */}
      <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.015)]">
        <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#6287EE] rounded-full animate-pulse"></span>
            <h2 className="text-base font-bold text-[#1F2937] tracking-tight flex items-center gap-1.5">
              [盘后分析] 集团自营自筹与持仓大类实况 (六账户总清算)
            </h2>
          </div>
          <span className="text-[14px] text-[#6B7280] font-mono">账套并账核对: 16:30 POS</span>
        </div>

        {/* Aggregate Consolidated Ledger bar (Six Accounts Comprehensive sum) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5E7EB]">
            <span className="text-[14px] text-[#6B7280] font-semibold block">多账户持仓总市值</span>
            <span className="text-[20px] font-bold text-slate-900 font-mono mt-2 block">{animatedKpi.totalValue.toFixed(2)} 亿元</span>
            <span className="text-[12px] text-[#6B7280] block mt-1 font-sans">对应并账底层资产258,000万</span>
          </div>

          <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5E7EB]">
            <span className="text-[14px] text-[#6B7280] font-semibold block">{selectedScenario === 'evening' ? 'T日' : 'T-1'}日多账户净买入</span>
            <span className="text-[20px] font-bold text-[#27C781] font-mono mt-2 block">{animatedKpi.netBuy.toFixed(0)} 万元</span>
            <span className="text-[12px] hover:text-[#27C781] block mt-1">日内多头平盘/空单对冲</span>
          </div>

          <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5E7EB]">
            <span className="text-[14px] text-[#6B7280] font-semibold block">单日多账户总损益</span>
            <span className="text-[20px] font-bold text-[#27C781] font-mono mt-2 block">{animatedKpi.dailyPnL.toFixed(0)} 万元</span>
            <span className="text-[12px] text-[#6B7280] block mt-1">通信/储能回撤导致</span>
          </div>

          <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E5E7EB]">
            <span className="text-[14px] text-[#6B7280] font-semibold block">本年多账户累计盈余</span>
            <span className="text-[20px] font-bold text-[#ED6C3D] font-mono mt-2 block">+{animatedKpi.yearPnL.toFixed(0)} 万元</span>
            <span className="text-[12px] text-[#ED6C3D] block mt-1">YTD净获利水平健壮</span>
          </div>
        </div>
      </div>

      {/* DUAL COLUMN MIDDLE WORKSPACE */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        
        {/* LEFT COLUMN: Six Accounts Deck and Selected Details (xl:col-span-8) */}
        <div className="xl:col-span-8 space-y-4">
          
          {/* Account Selection Deck (horizontal cards) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {accountsData.map((acc) => {
              const isActive = acc.id === selectedAccount;
              return (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccount(acc.id)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                    isActive
                      ? 'bg-[#6287EE]/20 border-[#6287EE]/55 shadow-sm shadow-[#6287EE]/5'
                      : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-[#1F2937]">{acc.name}</span>
                    <span className="text-[14px] font-medium bg-[#EBEEF3] text-[#6B7280] px-1.5 py-0.2 rounded-full">{acc.type}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-1 text-[14px] font-mono text-[#6B7280]">
                    <div>
                      <span>市值：</span> 
                      <strong className="text-[#1F2937]">{(acc.holdingsValue / 10000).toFixed(2)}亿</strong>
                    </div>
                    <div>
                      <span>{selectedScenario === 'evening' ? 'T日' : 'T-1'}日盈亏：</span> 
                      <span className={acc.todayPnL > 0 ? "text-[#ED6C3D] font-semibold" : acc.todayPnL < 0 ? "text-[#27C781] font-semibold" : "text-[#6B7280]"}>
                        {acc.todayPnL === 0 ? "0.00" : `${acc.todayPnL}万`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed sheet of selected account (especially ETF list code matching image) */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.015)]">
            <div className="flex flex-col md:flex-row justify-between border-b border-slate-50 pb-3 mb-4 gap-2">
              <div>
                <h3 className="text-base font-bold text-[#1F2937] flex items-center gap-1.5">
                  <Bookmark className="h-4 w-4 text-[#6287EE]" />
                  {currentAcc.name} 底层穿透持仓清单
                </h3>
                <p className="text-[16px] text-[#6B7280] mt-1 max-w-xl leading-relaxed">{currentAcc.desc}</p>
              </div>

              {/* Account summary pill */}
              <div className="bg-[#F7F9FC] border border-[#E5E7EB] rounded-2xl p-3 px-4 text-[14px] font-mono flex items-center gap-5 text-[#6B7280] self-start">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-[#6B7280]">累计收益</span>
                  <span className={`text-[16px] font-bold ${currentAcc.yearPnL >= 0 ? "text-[#ED6C3D]" : "text-[#27C781]"}`}>
                    {currentAcc.yearPnL > 0 ? "+" : ""}{currentAcc.yearPnL} 万
                  </span>
                </div>
                <div className="w-[1px] h-4 bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-[#6B7280]">{selectedScenario === 'evening' ? 'T日' : 'T-1'}日收益</span>
                  <span className={`text-[16px] font-bold ${currentAcc.todayPnL >= 0 ? "text-[#ED6C3D]" : "text-[#27C781]"}`}>
                    {currentAcc.todayPnL === 0 ? "平盘" : `${currentAcc.todayPnL}万`}
                  </span>
                </div>
              </div>
            </div>

            {/* If 2070 ETF account, render the high-contrast data sheet matching User's exact layout! */}
            {currentAcc.etfs ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-bold text-[14px] bg-[#F7F9FC]/50">
                      <th className="py-2.5 px-3">代码</th>
                      <th className="py-2.5 px-3">简称</th>
                      <th className="py-2.5 px-3 text-right">数量(万份)</th>
                      <th className="py-2.5 px-3 text-right">单位净值(元)</th>
                      <th className="py-2.5 px-3 text-right">持仓市值(万元)</th>
                      <th className="py-2.5 px-3 text-right">{selectedScenario === 'evening' ? 'T日' : 'T-1'}日净买入(万元)</th>
                      <th className="py-2.5 px-3 text-right">本日盈亏(万元)</th>
                      <th className="py-2.5 px-3 text-right">累计盈亏(万元)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {currentAcc.etfs.map((e, index) => (
                      <tr key={index} className="hover:bg-[#F7F9FC]/50 transition-colors text-[14px]">
                        <td className="py-3 px-3 font-mono text-[#6B7288]">{e.code}</td>
                        <td className="py-3 px-3 font-semibold text-[#1F2937]">{e.name}</td>
                        <td className="py-3 px-3 text-right font-mono text-[#6B7288]">{e.qty}</td>
                        <td className="py-3 px-3 text-right font-mono text-[#6B7288]">{e.price.toFixed(2)}</td>
                        <td className="py-3 px-3 text-right font-mono text-[#1F2937] font-medium">
                          {e.value.toLocaleString('zh-CN')}
                        </td>
                        <td className="py-3 px-3 text-right font-mono">
                          <span className={e.netBuy > 0 ? "text-[#ED6C3D] font-semibold" : e.netBuy < 0 ? "text-[#6287EE] font-semibold" : "text-[#6B7288]"}>
                            {e.netBuy === 0 ? "0" : e.netBuy > 0 ? `+${e.netBuy.toLocaleString('zh-CN')}` : e.netBuy.toLocaleString('zh-CN')}
                          </span>
                        </td>
                        <td className={`py-3 px-3 text-right ${renderValueColor(e.todayPnL)}`}>
                          {formatNum(e.todayPnL, true)}
                        </td>
                        <td className={`py-3 px-3 text-right ${renderValueColor(e.YTD)}`}>
                          {formatNum(e.YTD, true)}
                        </td>
                      </tr>
                    ))}
                    {/* Sum Totals */}
                    <tr className="bg-[#F7F9FC]/60 font-semibold border-t-2 border-[#E5E7EB] text-[14px]">
                      <td colSpan={2} className="py-3 px-3 text-[#1F2937]">合计</td>
                      <td className="py-3 px-3 text-right">--</td>
                      <td className="py-3 px-3 text-right">--</td>
                      <td className="py-3 px-3 text-right font-mono text-slate-900">112,069</td>
                      <td className="py-3 px-3 text-right font-mono text-[#6287EE]">-2,002</td>
                      <td className="py-3 px-3 text-right font-mono text-[#27C781]">-1,185</td>
                      <td className="py-3 px-3 text-right font-mono text-[#ED6C3D]">+11,487</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 bg-[#F7F9FC]/50 rounded-2xl border border-[#E5E7EB] text-center">
                <Landmark className="h-8 w-8 text-slate-350 mb-2" />
                <span className="text-[#6B7280] font-semibold text-xs">{currentAcc.name} 持仓正常</span>
                <p className="text-[14px] text-[#6B7280] mt-1 max-w-sm">该账户持仓已经和中央结算系统对账完成，目前属于落袋平盘或做空套保防御态势。详细对账报表及原始估值表可在右上角下载区域查看。</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Capital allocation rates & Wind alerts (xl:col-span-4) */}
        <div className="xl:col-span-4 space-y-4">
          
          {/* Day transaction logs (T日持仓大批量成交异动监控) */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.015)]">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-[#6287EE] rounded-full"></span>
                <span className="text-base font-bold text-[#1F2937] tracking-wide">[持仓异动]{selectedScenario === 'evening' ? 'T日变动' : 'T-1日账户变动'}</span>
              </div>
              <span className="text-[12px] text-[#6B7280] font-mono">交易池</span>
            </div>

            <div className="space-y-2.5">
              {changes.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="bg-[#F7F9FC]/60 hover:bg-[#EBEEF3]/50 border border-[#E5E7EB] p-3 rounded-2xl flex items-center justify-between text-[14px] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[14px] px-1.5 py-0.5 rounded-full font-bold ${
                      c.changeType === '新增'
                        ? 'bg-[#6287EE]/30 text-[#6287EE] border border-[#6287EE]/30'
                        : c.changeType === '增持'
                          ? 'bg-[#F7C4AB]/30 text-[#ED6C3D] border border-[#ED6C3D]/30'
                          : 'bg-[#27C781]/30 text-[#27C781] border border-[#27C781]/30'
                    }`}>
                      {c.changeType}
                    </span>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-[#1F2937] text-[14px]">{c.name}</span>
                        <span className="text-[14px] text-[#6B7280] font-mono">({c.code})</span>
                      </div>
                      <span className="text-[14px] text-[#6B7280] mt-0.5 block line-clamp-1">{c.notes}</span>
                    </div>
                  </div>
                  <div className="text-right font-mono shrink-0 font-bold text-[#1F2937] text-[14px]">
                    {c.amount > 0 ? '+' : ''}{c.amount} 万
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance risk sentinel warnings (强平扣款与催收催资) */}
          <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.015)]">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-3.5 bg-[#F7C4AB] rounded-full animate-pulse"></span>
                <span className="text-base font-bold text-[#1F2937] tracking-wide">[合规哨兵] 限额与四大核心风险雷达</span>
              </div>
              <span className="text-[12px] text-[#6B7280] font-mono">自检响应</span>
            </div>

            <div className="space-y-3">
              {risks.slice(0, 2).map((risk) => {
                const isBreached = risk.status === 'RED';
                const isConcern = risk.status === 'YELLOW';
                const isConfirmed = !!isRiskConfirmed[risk.id];

                return (
                  <div 
                    key={risk.id} 
                    className={`border p-3.5 rounded-2xl transition-all flex flex-col justify-between ${
                      isBreached 
                        ? 'border-red-105 bg-[#F7C4AB]/30' 
                        : isConcern
                          ? 'border-amber-100 bg-amber-50/30'
                          : 'border-[#E5E7EB] bg-[#F7F9FC]/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#1F2937]">{risk.type}</span>
                        {risk.type !== '流动性风险' && risk.type !== '市场风险' && getRiskBadge(risk.status)}
                      </div>
                      <p className="text-[14px] leading-relaxed text-[#6B7280] font-sans mt-0.5">
                        {risk.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#E5E7EB]/60 pt-2 mt-2.5 text-[14px] font-mono">
                      <span className="text-[#6B7280] text-[14px]">
                        指标: <strong className="text-[#1F2937] font-bold">{risk.indicator}</strong>
                      </span>
                      
                      {isBreached ? (
                        <button 
                          onClick={() => handleForcedExit(risk.id, risk.targetDetails || risk.type)}
                          disabled={isConfirmed}
                          className={`font-sans px-2.5 py-1 rounded-xl text-[10.5px] font-bold cursor-pointer transition-all shadow-sm ${
                            isConfirmed 
                              ? 'bg-[#EBEEF3] text-[#6B7280] border border-[#E5E7EB] cursor-not-allowed'
                              : 'bg-[#F7C4AB] hover:bg-red-600 text-white'
                          }`}
                        >
                          {isConfirmed ? '强平清结算中' : '⚠️ 强平清算'}
                        </button>
                      ) : isConcern ? (
                        <span className="text-[#27C781] font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5" /> 安全
                        </span>
                      ) : (
                        <span className="text-[#27C781] font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5" /> 安全
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
