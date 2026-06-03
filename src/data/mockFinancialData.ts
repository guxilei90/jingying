/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DailyFinancialSnapshot } from '../types';

export const mockFinancialData: Record<string, Record<'morning' | 'evening', DailyFinancialSnapshot>> = {
  '2026-06-03': {
    morning: {
      date: '2026-06-03',
      scenario: 'morning',
      overview: {
        todayRevenue: 785.40, // 万元
        revenueMonth: 12560.80,
        revenueYear: 148900.50,
        revenueYoY: 12.4, // 同比
        revenueMoM: 3.8,  // 环比
        revenueBudgetRate: 46.5, // 预算完成
        todayProfit: 312.20,
        profitMonth: 4890.60,
        profitYear: 58400.30,
        profitYoY: 8.5,
        profitMoM: 2.1,
        profitBudgetRate: 48.2
      },
      marketOverview: {
        indices: [
          { name: '上证指数', code: '000001.SH', points: 3420.78, changePercent: 1.52, volume: 4825.63, volumeChange: 12.8 },
          { name: '深成指', code: '399001.SZ', points: 11285.35, changePercent: 2.18, volume: 5632.45, volumeChange: 15.3 },
          { name: '创业板', code: '399006.SZ', points: 2215.68, changePercent: 2.76, volume: 2456.82, volumeChange: 18.6 },
          { name: '科创50', code: '000688.SH', points: 1025.42, changePercent: 3.25, volume: 1285.30, volumeChange: 22.1 }
        ],
        totalVolume: 10458.27,
        volumeChangePercent: 15.8,
        marketTrend: '上涨'
      },
      aiOperation: {
        revenueText: "今日营业收入达 785.40 万元，同比增长 12.4%。",
        profitText: "利润总额达 312.20 万元，同比增长 8.5%。",
        contributors: ["财富管理中心", "天风（上海）证券资产管理有限公司", "投资银行委员会"],
        detractors: ["上海证券自营分公司权益业务", "公司总部投资"],
        highlights: [
          "财富管理佣金手续费重回高点，今日拉动48%业绩表现",
          "投资银行委员会IPO及债券承销单日创收累计突破百万元"
        ],
        risks: [
          "上海证券自营分公司权益类仓位受今日早盘盘面微跌影响，录得浮亏35万元",
          "股票质押收入受质押规模持续下降及风险合规收紧影响，利润较上月环比下降5.2%"
        ],
        summaryParagraph: "今日预计营业收入同比增长12%，利润总额增长8.5%。主要贡献来自财富管理中心、天风资管和投资银行委员会。上海自营权益业务因权益回撤有所拖累。建议重点关注股票质押收入随着规模萎缩而持续下降的情况，防范相关质押履约保障比例破位风险。"
      },
      operatingUnits: [
        {
          id: 'bu-corp-finance',
          name: '企业融资业务委员会',
          manager: '张建军',
          todayRevenue: 85.00,
          todayProfit: 35.00,
          monthProfit: 520.00,
          yearProfit: 5800.00,
          revenueRatio: 10.8,
          profitRatio: 11.2,
          budgetCompletion: 44.6,
          children: [
            { id: 'bu-cf-1', name: '企业融资项目', todayRevenue: 60.00, monthRevenue: 380.00, yearRevenue: 4200.00 },
            { id: 'bu-cf-2', name: '融资顾问项目', todayRevenue: 25.00, monthRevenue: 140.00, yearRevenue: 1600.00 }
          ]
        },
        {
          id: 'bu-ib',
          name: '投资银行委员会',
          manager: '王晓宇',
          todayRevenue: 120.00,
          todayProfit: 48.00,
          monthProfit: 680.00,
          yearProfit: 7100.00,
          revenueRatio: 15.3,
          profitRatio: 15.4,
          budgetCompletion: 47.3,
          children: [
            { id: 'bu-ib-1', name: 'IPO业务', todayRevenue: 75.00, monthRevenue: 420.00, yearRevenue: 4500.00 },
            { id: 'bu-ib-2', name: '债券承销业务', todayRevenue: 35.00, monthRevenue: 210.00, yearRevenue: 2100.00 },
            { id: 'bu-ib-3', name: '财务顾问业务', todayRevenue: 10.00, monthRevenue: 50.00, yearRevenue: 500.00 }
          ]
        },
        {
          id: 'bu-wealth',
          name: '财富管理中心',
          manager: '刘振东',
          todayRevenue: 310.00,
          todayProfit: 145.00,
          monthProfit: 2100.00,
          yearProfit: 26500.03,
          revenueRatio: 39.5,
          profitRatio: 46.4,
          budgetCompletion: 51.5,
          children: [
            { id: 'bu-w-1', name: '手续费及佣金收入', todayRevenue: 185.00, monthRevenue: 1220.00, yearRevenue: 15500.00 },
            { id: 'bu-w-2', name: '利息净收入', todayRevenue: 95.00, monthRevenue: 680.00, yearRevenue: 8500.00 },
            { id: 'bu-w-3', name: '股票质押收入', todayRevenue: 30.00, monthRevenue: 200.00, yearRevenue: 2500.00 }
          ]
        },
        {
          id: 'bu-proprietary',
          name: '上海证券自营分公司',
          manager: '钱敏行',
          todayRevenue: 95.00,
          todayProfit: -35.00,
          monthProfit: 620.00,
          yearProfit: 7800.00,
          revenueRatio: 12.1,
          profitRatio: -11.2,
          budgetCompletion: 41.2,
          children: [
            { id: 'bu-p-1', name: '权益类', todayRevenue: -35.00, monthRevenue: 240.00, yearRevenue: 2800.00 },
            { id: 'bu-p-2', name: '固收类', todayRevenue: 110.00, monthRevenue: 310.00, yearRevenue: 4100.00 },
            { id: 'bu-p-3', name: '做市类', todayRevenue: 20.00, monthRevenue: 70.00, yearRevenue: 900.00 }
          ]
        },
        {
          id: 'bu-tf-am',
          name: '天风（上海）证券资产管理有限公司',
          manager: '赵元峰',
          todayRevenue: 75.00,
          todayProfit: 41.50,
          monthProfit: 450.00,
          yearProfit: 5200.00,
          revenueRatio: 9.5,
          profitRatio: 13.3,
          budgetCompletion: 49.5,
          children: [
            { id: 'bu-tfam-1', name: '集合资管计划', todayRevenue: 45.00, monthRevenue: 270.00, yearRevenue: 3100.00 },
            { id: 'bu-tfam-2', name: '单一专项及公募', todayRevenue: 30.00, monthRevenue: 180.00, yearRevenue: 2100.00 }
          ]
        },
        {
          id: 'bu-inst-advisor',
          name: '机构投顾总部',
          manager: '杜永强',
          todayRevenue: 45.40,
          todayProfit: 18.00,
          monthProfit: 280.00,
          yearProfit: 3100.00,
          revenueRatio: 5.8,
          profitRatio: 5.8,
          budgetCompletion: 45.9,
          children: [
            { id: 'bu-ia-1', name: '机构通道及分仓', todayRevenue: 30.00, monthRevenue: 190.00, yearRevenue: 2100.00 },
            { id: 'bu-ia-2', name: '基金代销及评价', todayRevenue: 15.40, monthRevenue: 90.00, yearRevenue: 1000.00 }
          ]
        },
        {
          id: 'bu-hainan-research',
          name: '海南研究咨询分公司',
          manager: '李德华',
          todayRevenue: 12.50,
          todayProfit: 2.20,
          monthProfit: 45.00,
          yearProfit: 480.00,
          revenueRatio: 1.6,
          profitRatio: 0.7,
          budgetCompletion: 40.0,
          children: [
            { id: 'bu-hr-1', name: '外部研报购买收入', todayRevenue: 8.00, monthRevenue: 30.00, yearRevenue: 320.00 },
            { id: 'bu-hr-2', name: '会议路演咨询收入', todayRevenue: 4.50, monthRevenue: 15.00, yearRevenue: 160.00 }
          ]
        },
        {
          id: 'bu-headquarters',
          name: '公司总部投资',
          manager: '周宏杰',
          todayRevenue: -5.00,
          todayProfit: -12.00,
          monthProfit: 140.00,
          yearProfit: 1900.06,
          revenueRatio: -0.6,
          profitRatio: -3.8,
          budgetCompletion: 38.0,
          children: [
            { id: 'bu-hq-1', name: '总部资金拆借收益', todayRevenue: 5.00, monthRevenue: 40.00, yearRevenue: 500.00 },
            { id: 'bu-hq-2', name: '股权长期投资损益', todayRevenue: -10.00, monthRevenue: 100.00, yearRevenue: 1400.00 }
          ]
        },
        {
          id: 'bu-tf-intl',
          name: '天风国际证券集团有限公司',
          manager: 'Donald Chen',
          todayRevenue: 48.00,
          todayProfit: 22.00,
          monthProfit: 310.00,
          yearProfit: 3500.00,
          revenueRatio: 6.1,
          profitRatio: 7.0,
          budgetCompletion: 46.1,
          children: [
            { id: 'bu-tfintl-1', name: '境外经纪及通道', todayRevenue: 28.00, monthRevenue: 180.00, yearRevenue: 2100.00 },
            { id: 'bu-tfintl-2', name: '境外资管及投行', todayRevenue: 20.00, monthRevenue: 130.00, yearRevenue: 1400.00 }
          ]
        },
        {
          id: 'bu-tf-rui',
          name: '天风天睿投资有限公司',
          manager: '郑捷',
          todayRevenue: 15.00,
          todayProfit: 8.50,
          monthProfit: 95.00,
          yearProfit: 1100.00,
          revenueRatio: 1.9,
          profitRatio: 2.7,
          budgetCompletion: 42.3,
          children: [
            { id: 'bu-tfr-1', name: '私募股权直投项目', todayRevenue: 15.00, monthRevenue: 95.00, yearRevenue: 1100.00 }
          ]
        },
        {
          id: 'bu-tf-creative',
          name: '天风创新投资有限公司',
          manager: '徐立新',
          todayRevenue: 5.00,
          todayProfit: 3.50,
          monthProfit: 55.00,
          yearProfit: 620.00,
          revenueRatio: 0.6,
          profitRatio: 1.1,
          budgetCompletion: 39.7,
          children: [
            { id: 'bu-tfc-1', name: '另类衍生及股权创投', todayRevenue: 5.00, monthRevenue: 55.00, yearRevenue: 620.00 }
          ]
        },
        {
          id: 'bu-tf-property',
          name: '天风天睿物业管理（武汉）有限公司',
          manager: '孙桂兰',
          todayRevenue: 4.50,
          todayProfit: 1.50,
          monthProfit: 15.00,
          yearProfit: 200.11,
          revenueRatio: 0.6,
          profitRatio: 0.5,
          budgetCompletion: 50.0,
          children: [
            { id: 'bu-tfp-1', name: '物业租赁及后勤服务', todayRevenue: 4.50, monthRevenue: 15.00, yearRevenue: 200.00 }
          ]
        }
      ],
      aiInvestment: {
        incomeText: "今日早间全口径投资净收益主要来自票息固收业务拉动，共创收95万元。",
        sourceDetails: ["红利低波ETF", "30年期国债期货", "招商银行（高股息持仓）"],
        lossDetails: ["恒生科技ETF", "中证1000ETF", "科创板权益标的"],
        allocationChange: "红利特质类底仓增持显著，今日早盘净买入红利ETF 2400万元。",
        capitalChange: "固收类用资率今日达 88.5%，仍有一部分申购资金暂存余额，权益类用资温和升至 45.8%。",
        riskAlert: "由于恒指在开盘时低开低走，导致境外资产集中度处于黄色关注区，需注意对冲。",
        summaryParagraph: "今日投资收益主要来自固收类做市与高股息策略。红利ETF和通信ETF拉动主收益。权益仓位较昨日小幅升势，今日已调仓增持红利主力，高频交易略减持中证1000ETF做市仓位以锁定利。提示重点关注由于增持产生的整体权益多头暴露，及债市波动的利差风险。"
      },
      investmentProfits: [
        { category: '权益类', todayProfit: -35.00, monthProfit: 240.00, yearProfit: 2800.00 },
        { category: '固收类', todayProfit: 110.00, monthProfit: 310.00, yearProfit: 4100.00 },
        { category: '做市类', todayProfit: 20.00, monthProfit: 70.00, yearProfit: 900.00 }
      ],
      holdingSizes: [
        { type: '债券', scale: 850000.00, ratio: 68.0 },
        { type: '股票', scale: 225000.00, ratio: 18.0 },
        { type: 'ETF', scale: 125000.00, ratio: 10.0 },
        { type: '现金', scale: 50000.00, ratio: 4.0 }
      ],
      topHoldings: [
        { id: 'th-1', code: '510880.SH', name: '红利ETF', scale: 45000.00, ratio: 3.60, todayPnL: 18.50, cumulativePnL: 320.00 },
        { id: 'th-2', code: '511260.SH', name: '十年国资债ETF', scale: 135000.00, ratio: 10.80, todayPnL: 32.40, cumulativePnL: 1150.00 },
        { id: 'th-3', code: '600036.SH', name: '招商银行', scale: 28000.00, ratio: 2.24, todayPnL: -12.00, cumulativePnL: 450.00 },
        { id: 'th-4', code: '240001.IB', name: '24国债01', scale: 520000.00, ratio: 41.60, todayPnL: 45.00, cumulativePnL: 4800.00 },
        { id: 'th-5', code: '511010.SH', name: '国债买断式ETF', scale: 82000.00, ratio: 6.56, todayPnL: 12.00, cumulativePnL: 620.00 },
        { id: 'th-6', code: '601398.SH', name: '工商银行', scale: 32000.00, ratio: 2.56, todayPnL: 5.50, cumulativePnL: 540.00 }
      ],
      holdingChanges: [
        { id: 'hc-1', code: '510880.SH', name: '红利ETF', changeType: '增持', amount: 2400.00, price: 2.85, notes: '加大红利底仓配置，防御避险' },
        { id: 'hc-2', code: '159841.SZ', name: '绿色电力ETF', changeType: '新增', amount: 800.00, price: 1.02, notes: '顺周期产业结构化建仓' },
        { id: 'hc-3', code: '512100.SH', name: '中证1000ETF', changeType: '减持', amount: -1500.00, price: 1.88, notes: '流动性避险减配，降低高波动权益暴露' },
        { id: 'hc-4', code: '513100.SH', name: '纳指ETF', changeType: '清仓', amount: -650.00, price: 1.45, notes: '外盘技术性调整，高位止盈离场' }
      ],
      capitalUtilizations: [
        { category: '权益类', limit: 500000.00, used: 229000.00, remaining: 271000.00, utilizationRate: 45.8 },
        { category: '固收类', limit: 1000000.00, used: 885000.00, remaining: 115000.00, utilizationRate: 88.5 },
        { category: '做市类', limit: 200000.00, used: 136000.00, remaining: 64000.00, utilizationRate: 68.0 }
      ],
      riskPrompts: [
        { id: 'rp-1', type: '市场风险', status: 'YELLOW', description: '权益暴露敞口微增，若创业板单日盘中跌幅超1.5%将触碰内部黄线警戒。', targetDetails: '中证500/创业板自营仓位', indicator: '在用VaR/限额比率：78.4%' },
        { id: 'rp-2', type: '流动性风险', status: 'GREEN', description: '优质流动性资产(HQLA)储备充足，流动性覆盖率(LCR)保持在245%安全区间。', targetDetails: '公司日间资金头寸', indicator: 'LCR: 245% (监管要求 >= 100%)' },
        { id: 'rp-3', type: '集中度风险', status: 'YELLOW', description: '高股息重仓个股(招商银行、工商银行)单一持仓市值占权益总底仓超22%。', targetDetails: '红利自营个股', indicator: '同类集中度：22.4% (警戒线: 25%)' },
        { id: 'rp-4', type: '股票质押风险', status: 'RED', description: '有一笔客户股票质押标的(华塑控股)合约今日跌破最低履约保障比例(115%)。', targetDetails: '华塑控股质押合约', indicator: '当前履约保障比：108.5% (平仓警报)' }
      ]
    },
    evening: {
      date: '2026-06-03',
      scenario: 'evening',
      overview: {
        todayRevenue: 895.00,
        revenueMonth: 12670.40,
        revenueYear: 149010.10,
        revenueYoY: 13.5,
        revenueMoM: 4.1,
        revenueBudgetRate: 47.1,
        todayProfit: 368.40,
        profitMonth: 4946.80,
        profitYear: 58456.50,
        profitYoY: 9.2,
        profitMoM: 2.4,
        profitBudgetRate: 48.9
      },
      marketOverview: {
        indices: [
          { name: '上证指数', code: '000001.SH', points: 3378.15, changePercent: 0.28, volume: 4156.82, volumeChange: 8.8 },
          { name: '深成指', code: '399001.SZ', points: 11089.72, changePercent: 0.35, volume: 4923.45, volumeChange: 5.9 },
          { name: '创业板', code: '399006.SZ', points: 2178.93, changePercent: 0.86, volume: 2084.37, volumeChange: 14.2 },
          { name: '科创50', code: '000688.SH', points: 1005.28, changePercent: 1.52, volume: 1035.60, volumeChange: 16.1 }
        ],
        totalVolume: 9155.27,
        volumeChangePercent: 8.1,
        marketTrend: '上涨'
      },
      aiOperation: {
        revenueText: "盘后全口径收入录得 895.00 万元，同比增长高达 13.5%。",
        profitText: "今日实现最终利润总额 368.40 万元，较去年同期大增 9.2%。",
        contributors: ["财富管理中心", "天风资管", "上海自营做市和固收"],
        detractors: ["上海证券自营分公司权益业务部分"],
        highlights: [
          "财富管理交易佣金及新发基金申购活跃度破前期峰值，全天单日拉动利润192万元",
          "天风资管通道及主动管理资产利差收益结转顺利"
        ],
        risks: [
          "企业融资项目由于部分周期款延迟结算，导致今日收入回吐5.5万元",
          "两融标的利息及股押质押业务清退加快导致整体生息资产规模下行"
        ],
        summaryParagraph: "今日在收盘后核对最终数据，因下午大盘尾盘拉升，营业收入全天增至同比13.5%，利润总额增长9.2%。今日核心业绩发动机来自财富、天风资管与投行。上海自营权益在收盘前亏损大幅收窄，至亏损25万元。仍需持续关注两融与股票质押坏账计提与坏款核销趋势。"
      },
      operatingUnits: [
        {
          id: 'bu-corp-finance',
          name: '企业融资业务委员会',
          manager: '张建军',
          todayRevenue: 79.50,
          todayProfit: 29.50,
          monthProfit: 514.50,
          yearProfit: 5794.50,
          revenueRatio: 9.8,
          profitRatio: 8.9,
          budgetCompletion: 44.5,
          children: [
            { id: 'bu-cf-1', name: '企业融资项目', todayRevenue: 54.50, monthRevenue: 374.50, yearRevenue: 4194.50 },
            { id: 'bu-cf-2', name: '融资顾问项目', todayRevenue: 25.00, monthRevenue: 140.00, yearRevenue: 1600.00 }
          ]
        },
        {
          id: 'bu-ib',
          name: '投资银行委员会',
          manager: '王晓宇',
          todayRevenue: 120.00,
          todayProfit: 48.00,
          monthProfit: 680.00,
          yearProfit: 7100.00,
          revenueRatio: 13.4,
          profitRatio: 13.0,
          budgetCompletion: 47.3,
          children: [
            { id: 'bu-ib-1', name: 'IPO业务', todayRevenue: 75.00, monthRevenue: 420.00, yearRevenue: 4500.00 },
            { id: 'bu-ib-2', name: '债券承销业务', todayRevenue: 35.00, monthRevenue: 210.00, yearRevenue: 2100.00 },
            { id: 'bu-ib-3', name: '财务顾问业务', todayRevenue: 10.00, monthRevenue: 50.00, yearRevenue: 500.00 }
          ]
        },
        {
          id: 'bu-wealth',
          name: '财富管理中心',
          manager: '刘振东',
          todayRevenue: 430.00,
          todayProfit: 192.00,
          monthProfit: 2147.00,
          yearProfit: 26547.03,
          revenueRatio: 48.0,
          profitRatio: 52.1,
          budgetCompletion: 51.6,
          children: [
            { id: 'bu-w-1', name: '手续费及佣金收入', todayRevenue: 300.00, monthRevenue: 1335.00, yearRevenue: 15615.00 },
            { id: 'bu-w-2', name: '利息净收入', todayRevenue: 100.00, monthRevenue: 685.00, yearRevenue: 8505.00 },
            { id: 'bu-w-3', name: '股票质押收入', todayRevenue: 30.00, monthRevenue: 127.00, yearRevenue: 2427.00 }
          ]
        },
        {
          id: 'bu-proprietary',
          name: '上海证券自营分公司',
          manager: '钱敏行',
          todayRevenue: 110.00,
          todayProfit: -25.00,
          monthProfit: 630.00,
          yearProfit: 7810.00,
          revenueRatio: 12.3,
          profitRatio: -6.8,
          budgetCompletion: 41.3,
          children: [
            { id: 'bu-p-1', name: '权益类', todayRevenue: -25.00, monthRevenue: 250.00, yearRevenue: 2810.00 },
            { id: 'bu-p-2', name: '固收类', todayRevenue: 115.00, monthRevenue: 312.00, yearRevenue: 4102.00 },
            { id: 'bu-p-3', name: '做市类', todayRevenue: 20.00, monthRevenue: 68.00, yearRevenue: 898.00 }
          ]
        },
        {
          id: 'bu-tf-am',
          name: '天风（上海）证券资产管理有限公司',
          manager: '赵元峰',
          todayRevenue: 80.00,
          todayProfit: 45.40,
          monthProfit: 453.90,
          yearProfit: 5203.90,
          revenueRatio: 8.9,
          profitRatio: 12.3,
          budgetCompletion: 49.6,
          children: [
            { id: 'bu-tfam-1', name: '集合资管计划', todayRevenue: 48.00, monthRevenue: 273.00, yearRevenue: 3103.00 },
            { id: 'bu-tfam-2', name: '单一专项及公募', todayRevenue: 32.00, monthRevenue: 180.90, yearRevenue: 2100.90 }
          ]
        },
        {
          id: 'bu-inst-advisor',
          name: '机构投顾总部',
          manager: '杜永强',
          todayRevenue: 48.00,
          todayProfit: 20.00,
          monthProfit: 282.00,
          yearProfit: 3102.00,
          revenueRatio: 5.4,
          profitRatio: 5.4,
          budgetCompletion: 46.0,
          children: [
            { id: 'bu-ia-1', name: '机构通道及分仓', todayRevenue: 32.00, monthRevenue: 192.00, yearRevenue: 2102.00 },
            { id: 'bu-ia-2', name: '基金代销及评价', todayRevenue: 16.00, monthRevenue: 90.00, yearRevenue: 1000.00 }
          ]
        },
        {
          id: 'bu-hainan-research',
          name: '海南研究咨询分公司',
          manager: '李德华',
          todayRevenue: 14.50,
          todayProfit: 3.50,
          monthProfit: 46.30,
          yearProfit: 481.30,
          revenueRatio: 1.6,
          profitRatio: 0.9,
          budgetCompletion: 40.1,
          children: [
            { id: 'bu-hr-1', name: '外部研报购买收入', todayRevenue: 9.00, monthRevenue: 31.00, yearRevenue: 321.00 },
            { id: 'bu-hr-2', name: '会议路演咨询收入', todayRevenue: 5.50, monthRevenue: 15.30, yearRevenue: 160.30 }
          ]
        },
        {
          id: 'bu-headquarters',
          name: '公司总部投资',
          manager: '周宏杰',
          todayRevenue: -2.00,
          todayProfit: -10.00,
          monthProfit: 142.00,
          yearProfit: 1902.06,
          revenueRatio: -0.2,
          profitRatio: -2.7,
          budgetCompletion: 38.1,
          children: [
            { id: 'bu-hq-1', name: '总部资金拆借收益', todayRevenue: 6.00, monthRevenue: 41.00, yearRevenue: 501.00 },
            { id: 'bu-hq-2', name: '股权长期投资损益', todayRevenue: -8.00, monthRevenue: 102.00, yearRevenue: 1401.00 }
          ]
        },
        {
          id: 'bu-tf-intl',
          name: '天风国际证券集团有限公司',
          manager: 'Donald Chen',
          todayRevenue: 50.00,
          todayProfit: 24.00,
          monthProfit: 312.00,
          yearProfit: 3502.00,
          revenueRatio: 5.6,
          profitRatio: 6.5,
          budgetCompletion: 46.2,
          children: [
            { id: 'bu-tfintl-1', name: '境外经纪及通道', todayRevenue: 30.00, monthRevenue: 182.00, yearRevenue: 2102.00 },
            { id: 'bu-tfintl-2', name: '境外资管及投行', todayRevenue: 20.00, monthRevenue: 130.00, yearRevenue: 1400.00 }
          ]
        },
        {
          id: 'bu-tf-rui',
          name: '天风天睿投资有限公司',
          manager: '郑捷',
          todayRevenue: 15.00,
          todayProfit: 8.50,
          monthProfit: 95.00,
          yearProfit: 1100.00,
          revenueRatio: 1.7,
          profitRatio: 2.3,
          budgetCompletion: 42.3,
          children: [
            { id: 'bu-tfr-1', name: '私募股权直投项目', todayRevenue: 15.00, monthRevenue: 95.00, yearRevenue: 1100.00 }
          ]
        },
        {
          id: 'bu-tf-creative',
          name: '天风创新投资有限公司',
          manager: '徐立新',
          todayRevenue: 5.00,
          todayProfit: 3.50,
          monthProfit: 55.00,
          yearProfit: 620.00,
          revenueRatio: 0.6,
          profitRatio: 1.0,
          budgetCompletion: 39.7,
          children: [
            { id: 'bu-tfc-1', name: '另类衍生及股权创投', todayRevenue: 5.00, monthRevenue: 55.00, yearRevenue: 620.00 }
          ]
        },
        {
          id: 'bu-tf-property',
          name: '天风天睿物业管理（武汉）有限公司',
          manager: '孙桂兰',
          todayRevenue: 4.50,
          todayProfit: 1.50,
          monthProfit: 15.00,
          yearProfit: 200.11,
          revenueRatio: 0.5,
          profitRatio: 0.4,
          budgetCompletion: 50.0,
          children: [
            { id: 'bu-tfp-1', name: '物业租赁及后勤服务', todayRevenue: 4.50, monthRevenue: 15.00, yearRevenue: 200.00 }
          ]
        }
      ],
      aiInvestment: {
        incomeText: "今日收盘，全口径投资收益计入 120.00 万元，午后高股息拉升锁利明显。",
        sourceDetails: ["红利ETF", "30年国债", "华电国际股息表现"],
        lossDetails: ["微盘股敞口", "港股生息低评级债"],
        allocationChange: "交易员在午后2点完成了对中证1000ETF的阶段性减仓，清仓部分到期境外ETF。",
        capitalChange: "今日终极用资率方面，固收降至85.2%（因结算回款），权益类保持在46.5%略升。",
        riskAlert: "最终收盘清平，无破界风险，有一项关于华塑控股股票质押违约已安排强平降险程序。",
        summaryParagraph: "今日收盘投资收益录得120万元，收益最大贡献板块依然为稳健靠山的固收类业务，其次为高股息配置。持仓分布较为平衡，国债类与红利低波仓仍占支配比。下午成功减持中证1000ETF锁定一部分前期筹码，纳指ETF高位落袋为安。由于尾盘市场回暖，主要高流动性风险降解为微弱预警阶段。"
      },
      investmentProfits: [
        { category: '权益类', todayProfit: -25.00, monthProfit: 250.00, yearProfit: 2810.00 },
        { category: '固收类', todayProfit: 115.00, monthProfit: 312.00, yearProfit: 4102.00 },
        { category: '做市类', todayProfit: 20.00, monthProfit: 68.00, yearProfit: 898.00 }
      ],
      holdingSizes: [
        { type: '债券', scale: 830000.00, ratio: 67.5 },
        { type: '股票', scale: 228000.00, ratio: 18.5 },
        { type: 'ETF', scale: 111000.00, ratio: 9.0 },
        { type: '现金', scale: 61000.00, ratio: 5.0 }
      ],
      topHoldings: [
        { id: 'th-1', code: '510880.SH', name: '红利ETF', scale: 47400.00, ratio: 3.85, todayPnL: 24.00, cumulativePnL: 325.50 },
        { id: 'th-2', code: '511260.SH', name: '十年国资债ETF', scale: 135000.00, ratio: 10.98, todayPnL: 34.00, cumulativePnL: 1151.60 },
        { id: 'th-3', code: '600036.SH', name: '招商银行', scale: 28000.00, ratio: 2.28, todayPnL: -2.00, cumulativePnL: 460.00 },
        { id: 'th-4', code: '240001.IB', name: '24国债01', scale: 512000.00, ratio: 41.63, todayPnL: 48.00, cumulativePnL: 4803.00 },
        { id: 'th-5', code: '511010.SH', name: '国债买断式ETF', scale: 82000.00, ratio: 6.67, todayPnL: 14.00, cumulativePnL: 622.00 },
        { id: 'th-6', code: '601398.SH', name: '工商银行', scale: 32000.00, ratio: 2.60, todayPnL: 7.20, cumulativePnL: 541.70 }
      ],
      holdingChanges: [
        { id: 'hc-1', code: '510880.SH', name: '红利ETF', changeType: '增持', amount: 2400.00, price: 2.85, notes: '加大红利底仓配置，防御避险' },
        { id: 'hc-2', code: '159841.SZ', name: '绿色电力ETF', changeType: '新增', amount: 800.00, price: 1.02, notes: '顺周期产业结构化建仓' },
        { id: 'hc-3', code: '512100.SH', name: '中证1000ETF', changeType: '减持', amount: -1500.00, price: 1.88, notes: '收盘前降低波动，规避中小创回撤' },
        { id: 'hc-4', code: '513100.SH', name: '纳指ETF', changeType: '清仓', amount: -650.00, price: 1.45, notes: '外盘高位套现，彻底清算变现' }
      ],
      capitalUtilizations: [
        { category: '权益类', limit: 500000.00, used: 232500.00, remaining: 267500.00, utilizationRate: 46.5 },
        { category: '固收类', limit: 1000000.00, used: 852000.00, remaining: 148000.00, utilizationRate: 85.2 },
        { category: '做市类', limit: 200000.00, used: 136000.00, remaining: 64000.00, utilizationRate: 68.0 }
      ],
      riskPrompts: [
        { id: 'rp-1', type: '市场风险', status: 'GREEN', description: '权益多头尾盘大幅减亏，多头净敞口风险已被顺利控制在阈值以内。', targetDetails: '中证500/创业板自营仓位', indicator: '在用VaR/限额比率：61.2%' },
        { id: 'rp-2', type: '流动性风险', status: 'GREEN', description: '日间交收头寸完毕，下午清收多笔短期到期逆回购，资金池备付充足。', targetDetails: '公司日间资金头寸', indicator: 'LCR: 252% (监管要求 >= 100%)' },
        { id: 'rp-3', type: '集中度风险', status: 'YELLOW', description: '高股息重仓个股(招商银行、工商银行)单一持仓市值占权益总底仓约 21.4%。', targetDetails: '红利自营个股', indicator: '同类集中度：21.4% (警戒线: 25%)' },
        { id: 'rp-4', type: '股票质押风险', status: 'YELLOW', description: '违约平仓项目标的“华塑控股”已被司法冻结并进入强行核平指令通道，当前平仓进度正常。', targetDetails: '华塑控股质押合约', indicator: '风险敞口已降至1200万元，追保进行中' }
      ]
    }
  },
  '2026-06-02': {
    morning: {
      date: '2026-06-02',
      scenario: 'morning',
      overview: {
        todayRevenue: 710.20,
        revenueMonth: 11665.80,
        revenueYear: 148005.50,
        revenueYoY: 10.2,
        revenueMoM: 3.1,
        revenueBudgetRate: 45.9,
        todayProfit: 284.10,
        profitMonth: 4522.00,
        profitYear: 58031.90,
        profitYoY: 7.9,
        profitMoM: 1.8,
        profitBudgetRate: 47.9
      },
      aiOperation: {
        revenueText: "今日营业收入录得 710.20 万元，同比增长 10.2%。",
        profitText: "今日预计实现利润总额 284.10 万元，基本符合阶段目标。",
        contributors: ["投资银行委员会", "财富管理中心"],
        detractors: ["海南研究咨询分公司", "天风创新投资有限公司"],
        highlights: ["投行债权项目承销发力，单日增收85万元"],
        risks: ["两融生息资产下降，质押业务坏款压力微弱盘旋"],
        summaryParagraph: "今日预计营业收入同比增长10.2%，利润总额增长7.9%。主要利润创收来自投行债券承销与财富管理交易中枢，自营本日持平。昨日有一笔海南分公司服务出现延宕，稍微影响了外部研报结算期。提示关注资管和代销业务由于中端产品到期所产生的规模赎回变动。"
      },
      operatingUnits: [
        {
          id: 'bu-corp-finance',
          name: '企业融资业务委员会',
          manager: '张建军',
          todayRevenue: 65.00,
          todayProfit: 25.00,
          monthProfit: 485.00,
          yearProfit: 5765.00,
          revenueRatio: 9.2,
          profitRatio: 8.8,
          budgetCompletion: 44.3,
          children: [
            { id: 'bu-cf-1', name: '企业融资项目', todayRevenue: 45.00, monthRevenue: 345.00, yearRevenue: 4165.00 },
            { id: 'bu-cf-2', name: '融资顾问项目', todayRevenue: 20.00, monthRevenue: 140.00, yearRevenue: 1600.00 }
          ]
        },
        {
          id: 'bu-ib',
          name: '投资银行委员会',
          manager: '王晓宇',
          todayRevenue: 135.00,
          todayProfit: 55.00,
          monthProfit: 632.00,
          yearProfit: 7052.00,
          revenueRatio: 19.0,
          profitRatio: 19.4,
          budgetCompletion: 47.0,
          children: [
            { id: 'bu-ib-1', name: 'IPO业务', todayRevenue: 85.00, monthRevenue: 345.00, yearRevenue: 4425.00 },
            { id: 'bu-ib-2', name: '债券承销业务', todayRevenue: 40.00, monthRevenue: 237.00, yearRevenue: 2127.00 },
            { id: 'bu-ib-3', name: '财务顾问业务', todayRevenue: 10.00, monthRevenue: 50.00, yearRevenue: 500.00 }
          ]
        },
        {
          id: 'bu-hainan-research',
          name: '海南研究咨询分公司',
          manager: '李德华',
          todayRevenue: 8.00,
          todayProfit: -1.00,
          monthProfit: 42.80,
          yearProfit: 477.80,
          revenueRatio: 1.1,
          profitRatio: -0.4,
          budgetCompletion: 39.8,
          children: [
            { id: 'bu-hr-1', name: '外部研报购买收入', todayRevenue: 5.00, monthRevenue: 27.80, yearRevenue: 317.80 },
            { id: 'bu-hr-2', name: '会议路演咨询收入', todayRevenue: 3.00, monthRevenue: 15.00, yearRevenue: 160.00 }
          ]
        },
        {
          id: 'bu-wealth',
          name: '财富管理中心',
          manager: '刘振东',
          todayRevenue: 270.00,
          todayProfit: 120.00,
          monthProfit: 1955.00,
          yearProfit: 26355.03,
          revenueRatio: 38.0,
          profitRatio: 42.2,
          budgetCompletion: 51.2,
          children: [
            { id: 'bu-w-1', name: '手续费及佣金收入', todayRevenue: 150.00, monthRevenue: 1035.00, yearRevenue: 15315.00 },
            { id: 'bu-w-2', name: '利息净收入', todayRevenue: 90.00, monthRevenue: 720.00, yearRevenue: 8540.00 },
            { id: 'bu-w-3', name: '股票质押收入', todayRevenue: 30.00, monthRevenue: 200.00, yearRevenue: 2500.00 }
          ]
        },
        {
          id: 'bu-proprietary',
          name: '上海证券自营分公司',
          manager: '钱敏行',
          todayRevenue: 105.00,
          todayProfit: 10.00,
          monthProfit: 655.00,
          yearProfit: 7835.00,
          revenueRatio: 14.8,
          profitRatio: 3.5,
          budgetCompletion: 41.5,
          children: [
            { id: 'bu-p-1', name: '权益类', todayRevenue: -15.00, monthRevenue: 275.00, yearRevenue: 2835.00 },
            { id: 'bu-p-2', name: '固收类', todayRevenue: 100.00, monthRevenue: 310.00, yearRevenue: 4100.00 },
            { id: 'bu-p-3', name: '做市类', todayRevenue: 20.00, monthRevenue: 70.00, yearRevenue: 900.00 }
          ]
        },
        {
          id: 'bu-inst-advisor',
          name: '机构投顾总部',
          manager: '杜永强',
          todayRevenue: 40.00,
          todayProfit: 15.00,
          monthProfit: 262.00,
          yearProfit: 3082.00,
          revenueRatio: 5.6,
          profitRatio: 5.3,
          budgetCompletion: 45.7,
          children: [
            { id: 'bu-ia-1', name: '机构通道及分仓', todayRevenue: 25.00, monthRevenue: 172.00, yearRevenue: 2082.00 },
            { id: 'bu-ia-2', name: '基金代销及评价', todayRevenue: 15.00, monthRevenue: 90.00, yearRevenue: 1000.00 }
          ]
        },
        {
          id: 'bu-headquarters',
          name: '公司总部投资',
          manager: '周宏杰',
          todayRevenue: 5.00,
          todayProfit: -5.00,
          monthProfit: 152.00,
          yearProfit: 1912.06,
          revenueRatio: 0.7,
          profitRatio: -1.8,
          budgetCompletion: 38.3,
          children: [
            { id: 'bu-hq-1', name: '总部资金拆借收益', todayRevenue: 5.00, monthRevenue: 46.00, yearRevenue: 506.00 },
            { id: 'bu-hq-2', name: '股权长期投资损益', todayRevenue: 0.00, monthRevenue: 106.00, yearRevenue: 1406.00 }
          ]
        },
        {
          id: 'bu-tf-am',
          name: '天风（上海）证券资产管理有限公司',
          manager: '赵元峰',
          todayRevenue: 60.00,
          todayProfit: 32.00,
          monthProfit: 408.50,
          yearProfit: 5158.50,
          revenueRatio: 8.4,
          profitRatio: 11.3,
          budgetCompletion: 49.2,
          children: [
            { id: 'bu-tfam-1', name: '集合资管计划', todayRevenue: 35.00, monthRevenue: 228.50, yearRevenue: 3058.50 },
            { id: 'bu-tfam-2', name: '单一专项及公募', todayRevenue: 25.00, monthRevenue: 180.00, yearRevenue: 2100.00 }
          ]
        },
        {
          id: 'bu-tf-intl',
          name: '天风国际证券集团有限公司',
          manager: 'Donald Chen',
          todayRevenue: 50.00,
          todayProfit: 23.00,
          monthProfit: 288.00,
          yearProfit: 3478.00,
          revenueRatio: 7.0,
          profitRatio: 8.1,
          budgetCompletion: 45.9,
          children: [
            { id: 'bu-tfintl-1', name: '境外经纪及通道', todayRevenue: 30.00, monthRevenue: 158.00, yearRevenue: 2078.00 },
            { id: 'bu-tfintl-2', name: '境外资管及投行', todayRevenue: 20.00, monthRevenue: 130.00, yearRevenue: 1400.00 }
          ]
        },
        {
          id: 'bu-tf-rui',
          name: '天风天睿投资有限公司',
          manager: '郑捷',
          todayRevenue: 10.00,
          todayProfit: 5.00,
          monthProfit: 86.50,
          yearProfit: 1091.50,
          revenueRatio: 1.4,
          profitRatio: 1.8,
          budgetCompletion: 42.0,
          children: [
            { id: 'bu-tfr-1', name: '私募股权直投项目', todayRevenue: 10.00, monthRevenue: 86.50, yearRevenue: 1091.50 }
          ]
        },
        {
          id: 'bu-tf-creative',
          name: '天风创新投资有限公司',
          manager: '徐立新',
          todayRevenue: -3.00,
          todayProfit: -5.00,
          monthProfit: 51.50,
          yearProfit: 616.50,
          revenueRatio: -0.4,
          profitRatio: -1.8,
          budgetCompletion: 39.5,
          children: [
            { id: 'bu-tfc-1', name: '另类衍生及股权创投', todayRevenue: -3.00, monthRevenue: 51.50, yearRevenue: 616.50 }
          ]
        },
        {
          id: 'bu-tf-property',
          name: '天风天睿物业管理（武汉）有限公司',
          manager: '孙桂兰',
          todayRevenue: 4.50,
          todayProfit: 1.40,
          monthProfit: 13.50,
          yearProfit: 198.61,
          revenueRatio: 0.6,
          profitRatio: 0.5,
          budgetCompletion: 49.6,
          children: [
            { id: 'bu-tfp-1', name: '物业租赁及后勤服务', todayRevenue: 4.50, monthRevenue: 13.50, yearRevenue: 198.61 }
          ]
        }
      ],
      aiInvestment: {
        incomeText: "昨日全天投资收益大额落袋入账，合计固收业务贡献盈利100万元。",
        sourceDetails: ["30年国资债ETF", "工商银行底仓", "国债套利做市交易"],
        lossDetails: ["沪深300多头头寸部分"],
        allocationChange: "交易组针对宽基沪深300大盘股底仓加固，未进行剧烈降仓调动。",
        capitalChange: "用资额度依然平实：固收用资率高盘至86.0%，权益类低位蛰蓄至43.5%。",
        riskAlert: "集中度处于黄色状态，其余无超高危预警突现，整体安全无虞。",
        summaryParagraph: "今日早间梳理，昨日投资收益平稳达标。主要受益于做市债券业务及国资债套息差。权益持仓昨日未有重大变化，以静态收取高红利指数表现为主。公司总限额充足，权益类总敞口仍有较大释放额。提示关注中美利差和信用债收益率偏离的系统性拐点。"
      },
      investmentProfits: [
        { category: '权益类', todayProfit: -15.00, monthProfit: 275.00, yearProfit: 2835.00 },
        { category: '固收类', todayProfit: 100.00, monthProfit: 310.00, yearProfit: 4100.00 },
        { category: '做市类', todayProfit: 20.00, monthProfit: 70.00, yearProfit: 900.00 }
      ],
      holdingSizes: [
        { type: '债券', scale: 860000.00, ratio: 68.8 },
        { type: '股票', scale: 220000.00, ratio: 17.6 },
        { type: 'ETF', scale: 121000.00, ratio: 9.7 },
        { type: '现金', scale: 49000.00, ratio: 3.9 }
      ],
      topHoldings: [
        { id: 'th-1', code: '510880.SH', name: '红利ETF', scale: 45000.00, ratio: 3.60, todayPnL: 5.40, cumulativePnL: 301.50 },
        { id: 'th-2', code: '511260.SH', name: '十年国资债ETF', scale: 135000.00, ratio: 10.80, todayPnL: 28.00, cumulativePnL: 1117.60 },
        { id: 'th-3', code: '600036.SH', name: '招商银行', scale: 28000.00, ratio: 2.24, todayPnL: -8.00, cumulativePnL: 454.00 },
        { id: 'th-4', code: '240001.IB', name: '24国债01', scale: 520000.00, ratio: 41.60, todayPnL: 40.00, cumulativePnL: 4755.00 },
        { id: 'th-5', code: '511010.SH', name: '国债买断式ETF', scale: 82000.00, ratio: 6.56, todayPnL: 10.00, cumulativePnL: 608.00 },
        { id: 'th-6', code: '601398.SH', name: '工商银行', scale: 32000.00, ratio: 2.56, todayPnL: 4.20, cumulativePnL: 534.50 }
      ],
      holdingChanges: [
        { id: 'hc-1', code: '510880.SH', name: '红利ETF', changeType: '增持', amount: 500.00, price: 2.82, notes: '持续小批量吸收避险标的' },
        { id: 'hc-3', code: '512100.SH', name: '中证1000ETF', changeType: '减持', amount: -600.00, price: 1.85, notes: '套保对冲套利部分减配' }
      ],
      capitalUtilizations: [
        { category: '权益类', limit: 500000.00, used: 217500.00, remaining: 282500.00, utilizationRate: 43.5 },
        { category: '固收类', limit: 1000000.00, used: 860000.00, remaining: 140000.00, utilizationRate: 86.0 },
        { category: '做市类', limit: 200000.00, used: 136000.00, remaining: 64000.00, utilizationRate: 68.0 }
      ],
      riskPrompts: [
        { id: 'rp-1', type: '市场风险', status: 'GREEN', description: '自营股票VaR及Beta偏离在健康区间（25天未出现跌漏极限值）。', targetDetails: '中证500/创业板自营仓位', indicator: '在用VaR/限额比率：58.0%' },
        { id: 'rp-2', type: '流动性风险', status: 'GREEN', description: '日常超纯隔夜放款结算畅通，跨月储备金无折返承压迹象。', targetDetails: '公司日间资金头寸', indicator: 'LCR: 247% (安全)' },
        { id: 'rp-3', type: '集中度风险', status: 'YELLOW', description: '单一高股息及国开、农发债券底仓总和超预告界限。', targetDetails: '红利自营个股', indicator: '集中度：21.0% (关注)' },
        { id: 'rp-4', type: '股票质押风险', status: 'YELLOW', description: '华塑控股质押合约履约保障比约 114.5%，贴近115%警告线，正紧迫追加。', targetDetails: '华塑控股质押合约', indicator: '履约保障比：114.5% (追加追加)' }
      ]
    },
    evening: {
      date: '2026-06-02',
      scenario: 'evening',
      overview: {
        todayRevenue: 810.00,
        revenueMonth: 11765.60,
        revenueYear: 148105.30,
        revenueYoY: 11.2,
        revenueMoM: 3.5,
        revenueBudgetRate: 46.2,
        todayProfit: 320.50,
        profitMonth: 4558.40,
        profitYear: 58068.30,
        profitYoY: 8.2,
        profitMoM: 2.0,
        profitBudgetRate: 48.1
      },
      aiOperation: {
        revenueText: "盘后核算营业收入达 810.00 万元，同比增长 11.2%。",
        profitText: "今日实现营业利润总额 320.50 万元，环比上升 2.0%。",
        contributors: ["财富管理中心", "海南研报清算组", "天风资管"],
        detractors: ["股票质押两融拖累项"],
        highlights: ["资管部门全渠道专户业绩收益提前结转共计45万元"],
        risks: ["两融由于保证金高位预警强平造成短暂利差折价损失"],
        summaryParagraph: "今日在收市阶段，营业收入同比增长11.2%，利润总额增长8.2%。财富管理端与海南分公司的清算顺畅。权益自营全天收复部分黑天，以亏损10万元结转。高位平稳。提示重点关注质押追保情况，今日有一名大客户履约保障比降至114.5%临停强平红界。"
      },
      operatingUnits: [
        {
          id: 'bu-corp-finance',
          name: '企业融资业务委员会',
          manager: '张建军',
          todayRevenue: 65.00,
          todayProfit: 25.00,
          monthProfit: 485.00,
          yearProfit: 5765.00,
          revenueRatio: 8.0,
          profitRatio: 7.8,
          budgetCompletion: 44.3,
          children: [
            { id: 'bu-cf-1', name: '企业融资项目', todayRevenue: 45.00, monthRevenue: 345.00, yearRevenue: 4165.00 },
            { id: 'bu-cf-2', name: '融资顾问项目', todayRevenue: 20.00, monthRevenue: 140.00, yearRevenue: 1600.00 }
          ]
        },
        {
          id: 'bu-ib',
          name: '投资银行委员会',
          manager: '王晓宇',
          todayRevenue: 135.00,
          todayProfit: 55.00,
          monthProfit: 632.00,
          yearProfit: 7052.00,
          revenueRatio: 16.7,
          profitRatio: 17.2,
          budgetCompletion: 47.0,
          children: [
            { id: 'bu-ib-1', name: 'IPO业务', todayRevenue: 85.00, monthRevenue: 345.00, yearRevenue: 4425.00 },
            { id: 'bu-ib-2', name: '债券承销业务', todayRevenue: 40.00, monthRevenue: 237.00, yearRevenue: 2127.00 },
            { id: 'bu-ib-3', name: '财务顾问业务', todayRevenue: 10.00, monthRevenue: 50.00, yearRevenue: 500.00 }
          ]
        },
        {
          id: 'bu-hainan-research',
          name: '海南研究咨询分公司',
          manager: '李德华',
          todayRevenue: 10.00,
          todayProfit: 1.00,
          monthProfit: 44.80,
          yearProfit: 479.80,
          revenueRatio: 1.2,
          profitRatio: 0.3,
          budgetCompletion: 40.0,
          children: [
            { id: 'bu-hr-1', name: '外部研报购买收入', todayRevenue: 6.00, monthRevenue: 28.80, yearRevenue: 318.80 },
            { id: 'bu-hr-2', name: '会议路演咨询收入', todayRevenue: 4.00, monthRevenue: 16.00, yearRevenue: 161.00 }
          ]
        },
        {
          id: 'bu-wealth',
          name: '财富管理中心',
          manager: '刘振东',
          todayRevenue: 330.00,
          todayProfit: 155.00,
          monthProfit: 1990.00,
          yearProfit: 26390.03,
          revenueRatio: 40.7,
          profitRatio: 48.4,
          budgetCompletion: 51.3,
          children: [
            { id: 'bu-w-1', name: '手续费及佣金收入', todayRevenue: 200.00, monthRevenue: 1085.00, yearRevenue: 15365.00 },
            { id: 'bu-w-2', name: '利息净收入', todayRevenue: 100.00, monthRevenue: 710.00, yearRevenue: 8530.00 },
            { id: 'bu-w-3', name: '股票质押收入', todayRevenue: 30.00, monthRevenue: 195.00, yearRevenue: 2495.00 }
          ]
        },
        {
          id: 'bu-proprietary',
          name: '上海证券自营分公司',
          manager: '钱敏行',
          todayRevenue: 110.00,
          todayProfit: -10.00,
          monthProfit: 635.00,
          yearProfit: 7815.00,
          revenueRatio: 13.6,
          profitRatio: -3.1,
          budgetCompletion: 41.4,
          children: [
            { id: 'bu-p-1', name: '权益类', todayRevenue: -10.00, monthRevenue: 255.00, yearRevenue: 2815.00 },
            { id: 'bu-p-2', name: '固收类', todayRevenue: 100.00, monthRevenue: 310.00, yearRevenue: 4100.00 },
            { id: 'bu-p-3', name: '做市类', todayRevenue: 20.00, monthRevenue: 70.00, yearRevenue: 900.00 }
          ]
        },
        {
          id: 'bu-inst-advisor',
          name: '机构投顾总部',
          manager: '杜永强',
          todayRevenue: 42.00,
          todayProfit: 16.00,
          monthProfit: 263.00,
          yearProfit: 3083.00,
          revenueRatio: 5.2,
          profitRatio: 5.0,
          budgetCompletion: 45.8,
          children: [
            { id: 'bu-ia-1', name: '机构通道及分仓', todayRevenue: 26.00, monthRevenue: 173.00, yearRevenue: 2083.00 },
            { id: 'bu-ia-2', name: '基金代销及评价', todayRevenue: 16.00, monthRevenue: 90.00, yearRevenue: 1000.00 }
          ]
        },
        {
          id: 'bu-headquarters',
          name: '公司总部投资',
          manager: '周宏杰',
          todayRevenue: 5.00,
          todayProfit: -5.00,
          monthProfit: 152.00,
          yearProfit: 1912.06,
          revenueRatio: 0.6,
          profitRatio: -1.6,
          budgetCompletion: 38.3,
          children: [
            { id: 'bu-hq-1', name: '总部资金拆借收益', todayRevenue: 5.00, monthRevenue: 46.00, yearRevenue: 506.00 },
            { id: 'bu-hq-2', name: '股权长期投资损益', todayRevenue: 0.00, monthRevenue: 106.00, yearRevenue: 1406.00 }
          ]
        },
        {
          id: 'bu-tf-am',
          name: '天风（上海）证券资产管理有限公司',
          manager: '赵元峰',
          todayRevenue: 75.00,
          todayProfit: 45.00,
          monthProfit: 421.50,
          yearProfit: 5171.50,
          revenueRatio: 9.3,
          profitRatio: 14.0,
          budgetCompletion: 49.3,
          children: [
            { id: 'bu-tfam-1', name: '集合资管计划', todayRevenue: 45.00, monthRevenue: 238.50, yearRevenue: 3068.50 },
            { id: 'bu-tfam-2', name: '单一专项及公募', todayRevenue: 30.00, monthRevenue: 183.00, yearRevenue: 2103.00 }
          ]
        },
        {
          id: 'bu-tf-intl',
          name: '天风国际证券集团有限公司',
          manager: 'Donald Chen',
          todayRevenue: 50.00,
          todayProfit: 23.00,
          monthProfit: 288.00,
          yearProfit: 3478.00,
          revenueRatio: 6.2,
          profitRatio: 7.2,
          budgetCompletion: 45.9,
          children: [
            { id: 'bu-tfintl-1', name: '境外经纪及通道', todayRevenue: 30.00, monthRevenue: 158.00, yearRevenue: 2078.00 },
            { id: 'bu-tfintl-2', name: '境外资管及投行', todayRevenue: 20.00, monthRevenue: 130.00, yearRevenue: 1400.00 }
          ]
        },
        {
          id: 'bu-tf-rui',
          name: '天风天睿投资有限公司',
          manager: '郑捷',
          todayRevenue: 10.00,
          todayProfit: 5.00,
          monthProfit: 86.50,
          yearProfit: 1091.50,
          revenueRatio: 1.2,
          profitRatio: 1.6,
          budgetCompletion: 42.0,
          children: [
            { id: 'bu-tfr-1', name: '私募股权直投项目', todayRevenue: 10.00, monthRevenue: 86.50, yearRevenue: 1091.50 }
          ]
        },
        {
          id: 'bu-tf-creative',
          name: '天风创新投资有限公司',
          manager: '徐立新',
          todayRevenue: -3.00,
          todayProfit: -5.00,
          monthProfit: 51.50,
          yearProfit: 616.50,
          revenueRatio: -0.4,
          profitRatio: -1.6,
          budgetCompletion: 39.5,
          children: [
            { id: 'bu-tfc-1', name: '另类衍生及股权创投', todayRevenue: -3.00, monthRevenue: 51.50, yearRevenue: 616.50 }
          ]
        },
        {
          id: 'bu-tf-property',
          name: '天风天睿物业管理（武汉）有限公司',
          manager: '孙桂兰',
          todayRevenue: 4.50,
          todayProfit: 1.40,
          monthProfit: 13.50,
          yearProfit: 198.61,
          revenueRatio: 0.6,
          profitRatio: 0.4,
          budgetCompletion: 49.6,
          children: [
            { id: 'bu-tfp-1', name: '物业租赁及后勤服务', todayRevenue: 4.50, monthRevenue: 13.50, yearRevenue: 198.61 }
          ]
        }
      ],
      aiInvestment: {
        incomeText: "昨日收盘，投资全口径实结收益 110.00 万元，比日内预期水平稍见盈满。",
        sourceDetails: ["30年国资债ETF", "工商银行", "国债买断做市"],
        lossDetails: ["沪深300指数波动浮亏"],
        allocationChange: "下午交易组按照调仓计划小额置换纳指ETF，锁定盈收落袋。",
        capitalChange: "用资正常，固收最终使用率为 86.0%，权益使用率为 43.5%。",
        riskAlert: "华塑控股质押合约风险等级升为黄色，其余各项无特大破位预警。",
        summaryParagraph: "今日收盘投资收益核销110万元。固收类自营稳定挑大梁，为公司安全盈余提供充分缓冲。持仓上，对长期国债和高股息资产长期锁定不变。今日少量清算增值纳指ETF以补充公司流动资本。整体市场VaR和系统集中指数保持中立偏防，整体态势完全可控。"
      },
      investmentProfits: [
        { category: '权益类', todayProfit: -10.00, monthProfit: 255.00, yearProfit: 2815.00 },
        { category: '固收类', todayProfit: 100.00, monthProfit: 310.00, yearProfit: 4100.00 },
        { category: '做市类', todayProfit: 20.00, monthProfit: 70.00, yearProfit: 900.00 }
      ],
      holdingSizes: [
        { type: '债券', scale: 860000.00, ratio: 68.8 },
        { type: '股票', scale: 220000.00, ratio: 17.6 },
        { type: 'ETF', scale: 121000.00, ratio: 9.7 },
        { type: '现金', scale: 49000.00, ratio: 3.9 }
      ],
      topHoldings: [
        { id: 'th-1', code: '510880.SH', name: '红利ETF', scale: 45000.00, ratio: 3.60, todayPnL: 5.40, cumulativePnL: 301.50 },
        { id: 'th-2', code: '511260.SH', name: '十年国资债ETF', scale: 135000.00, ratio: 10.80, todayPnL: 28.00, cumulativePnL: 1117.60 },
        { id: 'th-3', code: '600036.SH', name: '招商银行', scale: 28000.00, ratio: 2.24, todayPnL: -8.00, cumulativePnL: 454.00 },
        { id: 'th-4', code: '240001.IB', name: '24国债01', scale: 520000.00, ratio: 41.60, todayPnL: 40.00, cumulativePnL: 4755.00 },
        { id: 'th-5', code: '511010.SH', name: '国债买断式ETF', scale: 82000.00, ratio: 6.56, todayPnL: 10.00, cumulativePnL: 608.00 },
        { id: 'th-6', code: '601398.SH', name: '工商银行', scale: 32000.00, ratio: 2.56, todayPnL: 4.20, cumulativePnL: 534.50 }
      ],
      holdingChanges: [
        { id: 'hc-1', code: '510880.SH', name: '红利ETF', changeType: '增持', amount: 500.00, price: 2.82, notes: '顺畅接盘高股息底资产' },
        { id: 'hc-3', code: '512100.SH', name: '中证1000ETF', changeType: '减持', amount: -600.00, price: 1.85, notes: '套期防御做空锁定收益完成' }
      ],
      capitalUtilizations: [
        { category: '权益类', limit: 500000.00, used: 217500.00, remaining: 282500.00, utilizationRate: 43.5 },
        { category: '固收类', limit: 1000000.00, used: 860000.00, remaining: 140000.00, utilizationRate: 86.0 },
        { category: '做市类', limit: 200000.00, used: 136000.00, remaining: 64000.00, utilizationRate: 68.0 }
      ],
      riskPrompts: [
        { id: 'rp-1', type: '市场风险', status: 'GREEN', description: '自营持仓风险偏离值低于系统限值，处于全合规正常状态。', targetDetails: '自营股票多头', indicator: 'VaR/限额比率：58.0%' },
        { id: 'rp-2', type: '流动性风险', status: 'GREEN', description: 'LCR高位在247%，安全网张顶，资金供应毫无吃水隐患。', targetDetails: '公司流动资产', indicator: 'LCR: 247%' },
        { id: 'rp-3', type: '集中度风险', status: 'YELLOW', description: '单一高分红股票仓略显紧凑，整体集中度无触发强断。', targetDetails: '高股息个股', indicator: '同类集中度：21.0%' },
        { id: 'rp-4', type: '股票质押风险', status: 'YELLOW', description: '虽然华塑控股质押合约处于追加保证金过程中，但该大客户资金链已经部分回稳，质押压力略微舒张。', targetDetails: '华塑控股质押合约', indicator: '当前追保正在结转，质押比114.5%（关注）' }
      ]
    }
  }
};
