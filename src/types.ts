/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// 经营单元拆分细项接口
export interface BusinessUnitSubItem {
  id: string;
  name: string;
  todayRevenue: number; // 当日收入 (万元)
  monthRevenue: number; // 当月收入 (万元)
  yearRevenue: number;  // 当年收入 (万元)
  trend?: 'up' | 'down' | 'stable';
}

// 集团一级经营责任目标/单元接口
export interface BusinessUnit {
  id: string;
  name: string;
  manager: string;
  todayRevenue: number;  // 当日营业收入 (万元)
  todayProfit: number;   // 当日利润总额 (万元)
  monthProfit: number;   // 当月累计利润 (万元)
  yearProfit: number;    // 当年累计利润 (万元)
  revenueRatio: number;  // 收入占比 (%)
  profitRatio: number;   // 利润占比 (%)
  budgetCompletion: number; // 预算完成率 (%)
  children?: BusinessUnitSubItem[];
}

// 投资类资产类别
export type InvestmentCategory = '权益类' | '固收类' | '做市类';

// 投资收益接口
export interface InvestmentProfit {
  category: InvestmentCategory;
  todayProfit: number; // 当日收益 (万元)
  monthProfit: number; // 当月收益 (万元)
  yearProfit: number;  // 当年收益 (万元)
}

// 持仓规模结构
export interface HoldingSize {
  type: '股票' | 'ETF' | '债券' | '现金';
  scale: number; // 持仓规模 (万元)
  ratio: number; // 占比 (%)
}

// Top重仓持仓明细
export interface TopHolding {
  id: string;
  code: string;
  name: string;
  scale: number;       // 持仓市值 (万元)
  ratio: number;       // 持仓占比 (%)
  todayPnL: number;    // 当日盈亏 (万元)
  cumulativePnL: number; // 累计盈亏 (万元)
}

// 持仓交易异动变动情况
export interface HoldingChange {
  id: string;
  code: string;
  name: string;
  changeType: '新增' | '增持' | '减持' | '清仓';
  amount: number;      // 异动金额 (万元)
  price?: number;      // 成交估价/净值
  notes: string;       // 变动摘要
}

// 资金运用(用资情况)接口
export interface CapitalUtilization {
  category: InvestmentCategory;
  limit: number;    // 总额度 (万元)
  used: number;     // 已使用资金 (万元)
  remaining: number; // 剩余资金 (万元)
  utilizationRate: number; // 用资率 (%)
}

// 风控警告级别类型
export type RiskLevel = 'RED' | 'YELLOW' | 'GREEN';

// 风险提示接口
export interface RiskPrompt {
  id: string;
  type: '市场风险' | '流动性风险' | '集中度风险' | '股票质押风险';
  status: RiskLevel;
  description: string;
  targetDetails?: string; // 涉及标的/业务
  indicator?: string;     // 当前风控指标
}

// 宏观核心经营概览
export interface ManagementOverview {
  todayRevenue: number;    // 当日总收入 (万元)
  revenueMonth: number;    // 当月累计总收入 (万元)
  revenueYear: number;     // 当年累计总收入 (万元)
  revenueYoY: number;      // 收入同比 (%)
  revenueMoM: number;      // 收入环比 (%)
  revenueBudgetRate: number; // 收入预算完成率 (%)

  todayProfit: number;     // 当日总利润 (万元)
  profitMonth: number;     // 当月累计总利润 (万元)
  profitYear: number;      // 当年累计总利润 (万元)
  profitYoY: number;       // 利润同比 (%)
  profitMoM: number;       // 利润环比 (%)
  profitBudgetRate: number;  // 利润预算完成率 (%)
}

// 市场指数
export interface MarketIndex {
  name: string;            // 指数名称
  code: string;           // 指数代码
  points: number;         // 当前点位
  changePercent: number;  // 涨跌幅 (%)
  volume: number;         // 成交量 (亿元)
  volumeChange: number;   // 成交量变化 (%)
}

// 大盘市场概览
export interface MarketOverview {
  indices: MarketIndex[];       // 主要指数
  totalVolume: number;          // 沪深两市总成交量 (亿元)
  volumeChangePercent: number; // 成交量环比变化 (%)
  marketTrend: '上涨' | '下跌' | '震荡'; // 市场趋势
}

// AI经营摘要结构
export interface AiOperationNarrative {
  revenueText: string;     // 今日营业收入描述
  profitText: string;      // 今日利润总额描述
  contributors: string[];  // 主要贡献单位
  detractors: string[];    // 主要下降单位
  highlights: string[];    // 经营亮点
  risks: string[];         // 经营风险
  summaryParagraph: string;// 最终控制在150字以内的段落
}

// AI投资摘要结构
export interface AiInvestmentNarrative {
  incomeText: string;      // 今日投资收益情况描述
  sourceDetails: string[]; // 收益主要来源
  lossDetails: string[];   // 亏损主要来源
  allocationChange: string;// 持仓变化情况
  capitalChange: string;   // 用资变化情况
  riskAlert: string;       // 风险提示
  summaryParagraph: string;// 最终控制在150字以内的投资结论段落
}

// 整个系统每日快照
export interface DailyFinancialSnapshot {
  date: string;
  scenario: 'morning' | 'evening'; // 晨会场景 vs 盘后场景
  overview: ManagementOverview;
  marketOverview: MarketOverview; // 大盘市场概览
  aiOperation: AiOperationNarrative;
  operatingUnits: BusinessUnit[];
  aiInvestment: AiInvestmentNarrative;
  investmentProfits: InvestmentProfit[];
  holdingSizes: HoldingSize[];
  topHoldings: TopHolding[];
  holdingChanges: HoldingChange[];
  capitalUtilizations: CapitalUtilization[];
  riskPrompts: RiskPrompt[];
}
