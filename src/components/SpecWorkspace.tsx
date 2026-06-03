/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layers, Compass, HelpCircle, Layout, ShieldAlert, Cpu, Sparkles, Code, FileText, CheckCircle2 } from 'lucide-react';

export const SpecWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'wireframe' | 'specs' | 'logic' | 'scenes'>('architecture');

  return (
    <div className="bg-[#0b0e14] border border-[#2a303f] rounded p-6 text-white min-h-[600px] select-none">
      
      {/* HEADER SPECS */}
      <div className="border-b border-[#202735] pb-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold tracking-wider text-gray-100 flex items-center gap-2">
            <Layers className="h-5 w-5 text-bg-[#886CE6]" />
            <span>《证券公司总裁每日经营实况》专业设计方案与交付规范书</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            本规范作为董事长、总裁及经营班子晨会看盘系统的产品决策、交互模式与架构交付规范。
          </p>
        </div>
        <div className="flex bg-[#161b26] border border-[#242c3a] rounded p-0.5 text-xs">
          <span className="px-2 py-1 text-gray-500 font-mono">文号: TFC-SPEC-2026-06</span>
        </div>
      </div>

      {/* SPEC NAVIGATION SUB-TABS */}
      <div className="flex flex-wrap gap-1.5 mb-6 border-b border-[#1b212e] pb-3 text-xs">
        {[
          { id: 'architecture', label: '1. 页面信息架构与布局规划', icon: Compass },
          { id: 'wireframe', label: '2. 高保真系统线框大底图', icon: Layout },
          { id: 'specs', label: '3. 金融级UI视觉组件规范', icon: Code },
          { id: 'logic', label: '4. 经营自营联动与AI策略', icon: Cpu },
          { id: 'scenes', label: '5. 晨会与盘后双场景特制', icon: ShieldAlert },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded transition-all flex items-center gap-1.5 font-semibold ${
                activeTab === tab.id
                  ? 'bg-[#6287EE]/20 text-[#6287EE] border border-[#6287EE]/40'
                  : 'bg-[#121620] text-gray-400 hover:text-white hover:bg-[#1a2131]'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT 1: ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <div className="space-y-6 text-xs text-gray-300 leading-relaxed">
          <div className="bg-[#121620] p-4 rounded border border-[#232a3b]">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-1.5 text-bg-[#886CE6]">
              <span>●</span> 页面信息架构图 (Information Architecture)
            </h3>
            <p className="text-[16px] text-gray-400 mb-4">
              本系统采用极致扁平的信息穿透设计。数据源自清算中心、估值中心和风控中台，经由 AI 经营和投资归因引擎（Factor Attribution），垂直归集展示：
            </p>

            {/* SVG visual block diagram representing IA */}
            <div className="p-4 bg-[#080b11] border border-[#1b212f] rounded font-mono text-[14px] space-y-3 text-gray-400">
              <div className="flex justify-center">
                <div className="bg-[#1k2132] text-[#CCA96F] border border-bg-[#ECB66D]/30 p-2 rounded text-center w-80 shadow">
                  <strong>[数据底层] 券商统一数据仓库 / 估值体系 / 风控引擎</strong>
                  <div className="text-[12px] text-gray-500 mt-1">L0 - 财务明细、日夜终清账、两融风控指标</div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="h-4 w-[1px] bg-gray-600 animate-pulse"></div>
              </div>
              <div className="flex justify-center gap-4">
                <div className="bg-indigo-950/20 border border-indigo-500/20 text-indigo-300 p-2 rounded text-center w-48">
                  <strong>⭐ [AI经营摘要引擎]</strong>
                  <span className="text-[12px] block text-gray-500 mt-1">LLM因子总结 (150字以内)</span>
                </div>
                <div className="bg-[#456AE5]/20 border border-[#6287EE]/20 text-[#6287EE] p-2 rounded text-center w-48">
                  <strong>⭐ [AI投资归因引擎]</strong>
                  <span className="text-[12px] block text-gray-500 mt-1">持仓异动、用资与敞口VaR</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="h-4 w-[1px] bg-gray-600"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111624] border border-[#232c41] p-3 rounded">
                  <div className="text-gray-100 font-bold mb-1.5">[核心二 L2] 经营实况面板</div>
                  <ul className="list-disc pl-3 text-[14px] space-y-1 text-gray-400">
                    <li>总收入与利润(当日 / 当月 / 当年维度)</li>
                    <li>同环比、预算完成达成进度(11.2亿目标)</li>
                    <li><strong>12大一二级责任单元明细看板</strong> (可穿透展开)</li>
                    <li>手续费佣金、长期投资、子公司股权穿透构成</li>
                  </ul>
                </div>
                <div className="bg-[#111624] border border-[#232c41] p-3 rounded">
                  <div className="text-gray-100 font-bold mb-1.5">[核心四 L3] 投资情况面板</div>
                  <ul className="list-disc pl-3 text-[14px] space-y-1 text-gray-400">
                    <li>资金批复总额度与用资率 (权益/固收/做市限制)</li>
                    <li>持仓大类市值(债券/股票/ETF/现金)与占比</li>
                    <li>TOP重仓自营头寸实时估值与双向盈亏追踪</li>
                    <li><strong>四防合规风险哨兵</strong> (红/黄/绿触点响应平仓)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#121620] p-4 rounded border border-[#232a3b]">
              <h4 className="text-xs font-bold text-white mb-2 uppercase text-bg-[#886CE6]">
                ● 栅格与布局规划
              </h4>
              <p className="text-[16px] text-gray-400 mb-2">
                为契合证券公司总裁晨会及个人PC、会议室投屏场景，系统采用<strong>三栏融合弹性栅格布局 (1920px 黄金适配宽度)</strong>：
              </p>
              <ul className="list-decimal pl-4 space-y-1 text-gray-400 text-[16px]">
                <li><strong>顶部控制带 (Height: 64px)</strong>: 全局日期(T/T-1)与前移5分钟晨会/收市经营大场景。</li>
                <li><strong>AI 双核摘要板 (Height: 自适应)</strong>: 左右对称分栏，分别对口核心经营与投资因子的秒生成，实现5分钟决策。</li>
                <li><strong>左侧主干栏 (宽度 55%)</strong>: 12大合并责任中心财务透视长表。</li>
                <li><strong>右侧资产栏 (宽度 45%)</strong>: 包含重仓收益构成、资产配资杠杆比例、交易动态以及4个风控红绿信号灯。</li>
              </ul>
            </div>

            <div className="bg-[#121620] p-4 rounded border border-[#232a3b]">
              <h4 className="text-xs font-bold text-white mb-2 uppercase text-bg-[#886CE6]">
                ● 高性能与低延迟数据架构
              </h4>
              <p className="text-[16px] text-gray-400">
                为了规避传统敏捷驾驶舱华而不实的多级图表加载延迟，本终端核心采用：
              </p>
              <ul className="list-disc pl-4 mt-2 space-y-1 text-[16px] text-gray-400">
                <li><strong>直达穿透设计</strong>：砍掉所有复杂交互遮罩，核心数据一屏直达。</li>
                <li><strong>预算里程碑红绿分级</strong>：根据45%-50%的进度红黄绿梯度警示。</li>
                <li><strong>静态与动态分级传输</strong>：大类仓位、历史累加离线同步，交易异动、合规触发线秒级实时响应。</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: WIREFRAME */}
      {activeTab === 'wireframe' && (
        <div className="space-y-4 text-xs text-gray-300">
          <div className="bg-[#121620] p-4 rounded border border-[#232a3b]">
            <h3 className="text-sm font-bold text-white mb-3 text-bg-[#886CE6]">
              页面高保真线框布局大底图 (Wireframe Layout Map)
            </h3>
            <p className="text-[16px] text-gray-400 mb-3">
              下面展现了本产品如何在一整屏(无须深度向下滚动)完成集团级财务与投资全核算的数据排版。
            </p>

            <div className="border border-[#2a303f] bg-[#090c12] p-4 rounded font-mono text-[12px] text-gray-400 leading-normal overflow-x-auto select-text">
{`+------------------------------------------------------------------------------------------------------------------------------------------------------+
| [HEADER COMPANY TITLE] 证券公司总裁每日经营实况                                                                  [北京时间] 2026-06-03 08:30:15 CST  |
| 快捷过滤：[06-03今天 (T日)]  [06-02昨天 (T-1)]    场景转换：[⚡ 08:30 晨会看盘场景]  [🌙 17:00 盘后经营场景]    工作台：[■ 数字化终端]  [□ 产品规范书]   |
+------------------------------------------------------------------------------------------------------------------------------------------------------+
| [AI经营分析与每日简报 (Module 1)]                                                     | [AI投资分析与组合研判 (Module 3)]                                                    |
| > 今日营业收入同增12%，利润同增8.5%。重点贡献财富、天风资管、投资。                     | > 今日收益主要来自固收自营；红利ETF贡献主利润。权益持仓温和。                          |
| > [亮点]: 财富手续费拉动。[风险]: 股票质押利息承压。 (控制在150字内)                  | > 今日增持红利ETF+绿色电力，清仓纳指高位。提示权益VaR偏角。 (控制千字内)             |
| Contributors: [财富管理中心] [天风资管] [投资银行委员会]                               | Core Assets: [★红利ETF] [★十年国债]                                                    |
+------------------------------------------------------------------------------------------------------------------------------------------------------+
| [L2. 集团多维经营责任实况报报表 (Module 2)]                                           | [L3. 投资收益情况核算 & 会计归结 (Module 4-A)]                                        |
| [指标] 营收当日: 785万 (MTD: 1256万)  | 利润当日: 312万 (完成率: 48.2%)                | 资产类别    当日收益(万)    当月累计(万)    当年累计(亿)      状态                |
| +----------------------------------------------------------------------------------+ | 权益类自营     -35.00        +240.00         +28.00         当日回撤              |
| | 经营责任单元 / 主管      | 今日收入 | 今日利润 | MTD利润 | YTD利润 | 收入比 | 预算进度   | | 固收类自营    +110.00        +310.00         +41.00         领红创富              |
| +--------------------------+----------+----------+---------+---------+--------+------------+ | 做市类自营     +20.00         +70.00          +9.00         平盘静默              |
| | > 企业融资委    [张建军] |    85.0  |    35.0  |   520.0 |  5800.0 |  10.8% | [====== ] | +---------------------------------------------------------------------+
| | > 投资银行委    [王晓宇] |   120.0  |    48.0  |   680.0 |  7100.0 |  15.3% | [====== ] | | [L3-B. 集团底层组合持仓大类分布监控 (Module 4-B)]                     |
| | > 财富管理中心  [刘振东] |   310.0  |   145.0  |  2100.0 | 26500.0 |  39.5% | [=======] | | 债券 (68%) [====================        ]  股票 (18.5%) [======       ] |
| |   - 佣金手续费及专案构成 |   185.0  |     --   |  1220.0 | 15500.0 |  - - % | (子系拆表) | | ETF  (10%) [===                         ]  现金 (3.9%)  [=             ] |
| | > 上海自营分所  [钱敏行] |    95.0  |   -35.0  |   620.0 |  7800.0 |  12.1% | [=====  ] | +---------------------------------------------------------------------+
| |   [双向联动透视: 👈 此业务直接下穿关联右侧自营持仓及风险哨兵拦截，支持即时强平]    | | [持仓大类异动与大宗变动监测]      | [合规风控哨兵四大风险检测哨]                     |
| | > 机构投顾总部  [杜永强] |    45.4  |    18.0  |   280.0 |  3100.0 |   5.8% | [====== ] | | [增持] 红利ETF    +2400万         | 1. 市场风险：[YELLOW] VaR处于警戒            |
| | > 天风资管公司  [赵元峰] |    75.0  |    41.5  |   450.0 |  5200.0 |   9.5% | [====== ] | | [新增] 绿电ETF     +800万         | 2. 流动风险：[GREEN]  备付金充足               |
| | > 天风国际证券  [Donald] |    48.0  |    22.0  |   310.0 |  3500.0 |   6.1% | [====== ] | | [减持] 中证100ET  -1500万         | 3. 集中风险：[YELLOW] 红利集中配置超22%       |
| | > 其他创投子公司四家     |    24.5  |    13.5  |   165.0 |  1920.0 |   3.1% | [=====  ] | | [清仓] 纳指ETF     -650万         | 4. 股押风险：[RED]    华塑扣保障比跌破115%!     |
| +--------------------------+----------+----------+---------+---------+--------+------------+ |                                   | Action: [⚡ 启动强平扣款]  [🔔 发起强平催保]     |
+------------------------------------------------------------------------------------------------------------------------------------------------------+`}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: DESIGN SYSTEM */}
      {activeTab === 'specs' && (
        <div className="space-y-4 text-xs text-gray-300">
          <div className="bg-[#121620] p-4 rounded border border-[#232a3b]">
            <h3 className="text-sm font-bold text-white mb-3 text-bg-[#886CE6]">
              金融级 UI 视觉色彩与交互规范 (Bloomberg / Wind Core UI Specs)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-200 mb-2">1. 色彩规范体系 (Color Palette)</h4>
                <div className="space-y-2 text-[16px]">
                  <div className="flex items-center justify-between p-1.5 bg-[#0b0e14] border border-[#2a303f] rounded">
                    <span className="flex items-center gap-1.5 font-bold">
                      <span className="h-4 w-4 rounded bg-[#0b0e14] border border-[#202735]"></span>
                      炭黑色 (Carbon Black) <code>#0b0e14</code>
                    </span>
                    <span className="text-gray-500">主背景 / 大底</span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 bg-[#0d1117] border border-[#2a303f] rounded">
                    <span className="flex items-center gap-1.5 font-bold">
                      <span className="h-4 w-4 rounded bg-[#0d1117] border border-[#202735]"></span>
                      瓦灰色 (Slate Gray) <code>#0d1117</code>
                    </span>
                    <span className="text-gray-500">报表容器底色</span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 bg-[#ff4d4f]/15 border border-[#ff4d4f]/20 rounded">
                    <span className="flex items-center gap-1.5 font-bold text-[#ff4d4f]">
                      <span className="h-4 w-4 rounded bg-[#ff4d4f]"></span>
                      证券红 (Rise Red) <code>#ff4d4f</code>
                    </span>
                    <span className="text-text-[#ED6C3D]">华资市场赚钱 / 溢价 (🔴)</span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 bg-[#52c41a]/15 border border-[#52c41a]/20 rounded">
                    <span className="flex items-center gap-1.5 font-bold text-[#52c41a]">
                      <span className="h-4 w-4 rounded bg-[#52c41a]"></span>
                      证券绿 (Loss Green) <code>#52c41a</code>
                    </span>
                    <span className="text-green-400">回撤 / 亏损 / 拖累 (🟢)</span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 bg-[#ECB66D]/10 border border-[#ECB66D]/20 rounded">
                    <span className="flex items-center gap-1.5 font-bold text-[#ECB66D]">
                      <span className="h-4 w-4 rounded bg-[#fda92d]"></span>
                      监控黄 (Alert Amber) <code>#fda92d</code>
                    </span>
                    <span className="text-[#CCA96F]">风控警戒 / 预算进度</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-200 mb-2">2. 字体与排版梯度 (Typography)</h4>
                <ul className="space-y-2 text-[16px] text-gray-400">
                  <li>
                    <strong className="text-gray-200">主功能字族 (Sans-serif)</strong>: <code>"Inter", "Noto Sans SC"</code>. 
                    <br />用于控制台标题、责任人员标签、风控摘要段落，追求扁平干净。
                  </li>
                  <li>
                    <strong className="text-gray-200">报表数码字族 (Monospace)</strong>: <code>"JetBrains Mono", ui-monospace</code>. 
                    <br />用于所有金融流水、今日营收、两融合约追价、VaR百分比。字符等宽确保列向数字完全对齐，坚决防视线疲劳错漏。
                  </li>
                  <li>
                    <strong className="text-gray-200">极致扁平无边框理念</strong>: 
                    <br />舍弃无谓的圆环图、酷炫3D柱状图等无业务深度的废图。使用纯粹的“财务表格”、“一维度叠色进度条”和“合规方框”，确保数据一眼穿透，不浪费总裁在晨会中的1秒注意力。
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: LOGIC */}
      {activeTab === 'logic' && (
        <div className="space-y-4 text-xs text-gray-300">
          <div className="bg-[#121620] p-4 rounded border border-[#232a3b]">
            <h3 className="text-sm font-bold text-white mb-2 text-bg-[#886CE6]">
              数据联动逻辑与 AI 生成机制说明
            </h3>
            <p className="text-[16px] text-gray-400 mb-3">
              在总裁经营晨报终端中，<strong>“经营实战”与“投资组合”并非孤岛</strong>。多处资产配置变化、头寸估值会自动通过会计归纳公式动态作用于集团报表的自营创收条线。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#1e2535] bg-[#0c1018] p-3 rounded h-[140px] flex flex-col justify-between">
                <div>
                  <strong className="text-gray-200 text-xs block mb-1">🔗 联动推导 1: 创收利润结转</strong>
                  <p className="text-[14px] text-gray-400 leading-relaxed">
                    右侧
                    <strong>“自营重仓标的当日盈亏总和”</strong>
                    加总后，经由后台清算：
                  </p>
                  <p className="font-mono text-[14px] bg-[#121620] p-1 border border-[#6287EE]/20 text-[#6287EE] rounded mt-1.5">
                    上海证券自营.权益今日收入 = ∑(标的.今日盈亏 × 标的持仓系数) - 头寸融资利息成本
                  </p>
                </div>
                <div className="text-[12px] text-[#ff4d4f] italic">
                  * 示例：今日红利ETF、国债大涨，上海证券自营分司当日利润结平大幅回暖，由早估 -35万升至 -25万。
                </div>
              </div>

              <div className="border border-[#1e2535] bg-[#0c1018] p-3 rounded h-[140px] flex flex-col justify-between">
                <div>
                  <strong className="text-gray-200 text-xs block mb-1">🤖 联动推导 2: AI 量化归解生成算法</strong>
                  <p className="text-[14px] text-gray-400 leading-relaxed">
                    AI 经营/投资摘要不是静态死文，而是通过大语言模型调用获取 12 大单元财数变量后，实行<strong>约束模板秒级整合</strong>：
                  </p>
                  <p className="font-mono text-[14px] bg-[#121620] p-1 border border-bg-[#886CE6]/20 text-border-[#886CE6] rounded mt-1.5">
                    "今日预计营收同比增长 [revenueYoY]%，利润增长 [profitYoY]%，核心引擎来自 [contributors]，受 [detractors] 影响..."
                  </p>
                </div>
                <div className="text-[12px] text-[#fda92d] italic">
                  * 示例：确保整体分析大白话，不掺杂废话，控制在 150 字内以便总裁晨会 5 秒一目了然。
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 5: SCENARIOS */}
      {activeTab === 'scenes' && (
        <div className="space-y-4 text-xs text-gray-300">
          <div className="bg-[#121620] p-4 rounded border border-[#232a3b]">
            <h3 className="text-sm font-bold text-white mb-2 text-bg-[#886CE6]">
              晨会研研判(08:30) 与 盘后经营(17:00) 双场景设计逻辑
            </h3>
            <p className="text-[16px] text-gray-400 mb-3.5">
              作为高管，早晨晨会需要的是<strong>防错、控险、发现异动敞口</strong>；下午收市需要的是<strong>清算业绩、检查预算进度、审核调仓履约</strong>：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#161a25] border-l-4 border-bg-[#ECB66D] p-3.5 rounded-r">
                <div className="font-bold text-[#CCA96F] text-xs flex items-center gap-1 mb-1.5">
                  <span>⚡</span> 场景一：08:30 总裁晨看盘场景 (控风险、定决策)
                </div>
                <ul className="list-disc pl-3 text-[14px] space-y-1.5 text-gray-300">
                  <li><strong>核心痛点</strong>：大盘即将开盘，昨天晚间有哪些仓位踩雷？两融和股票质押客户履约比有没有破警戒线的？</li>
                  <li><strong>界面优化体系</strong>：风控预警哨位放置最高优先级。对于华塑控股跌破115%履约保障线红警极目突出。</li>
                  <li><strong>AI摘要特征</strong>：偏向于风险预告，提醒总裁由于今天大比例配置红利造成防守性资产VaR敞口偏斜，指导今日两融大宗交易调配。</li>
                </ul>
              </div>

              <div className="bg-[#121927] border-l-4 border-#6287EE p-3.5 rounded-r">
                <div className="font-bold text-#6287EE text-xs flex items-center gap-1 mb-1.5">
                  <span>🌙</span> 场景二：17:00 盘后经营分析场景 (看利润、核结转)
                </div>
                <ul className="list-disc pl-3 text-[14px] space-y-1.5 text-gray-300">
                  <li><strong>核心痛点</strong>：今天结算下来赚了多少真银？哪个兄弟业务部门拖了后腿？子公司的业绩有没有结账入账？今日调仓是否顺利清算完结？</li>
                  <li><strong>界面优化体系</strong>：上海自营、财富管理、海南咨询在收市后完成全合并并账，各子孙小二级分类佣金手续费细节精准亮眼。</li>
                  <li><strong>AI摘要特征</strong>：业绩全归因。指出最终全天营收同比增长13.5%，确认强行平仓违约和催保客户的资产保全落实状态。</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-[#11141e] border border-green-600/20 text-[#52c41a] p-3 rounded flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>本说明书已随 v1.8 PRO 金融数字底座一并结案。董事长、总裁与经营班子点击右上角工作台按钮，可直接体验全部双模经营原型！</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
