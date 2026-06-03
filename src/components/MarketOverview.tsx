/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { MarketOverview as MarketOverviewType } from '../types';

interface MarketOverviewProps {
  marketOverview: MarketOverviewType;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ marketOverview }) => {
  const getTrendColor = (percent: number) => {
    if (percent > 0) return 'text-[#ED6C3D]';
    if (percent < 0) return 'text-[#ECB66D]';
    return 'text-[#6B7280]';
  };

  const getTrendIcon = (percent: number) => {
    if (percent > 0) return <TrendingUp className="h-3 w-3" />;
    if (percent < 0) return <TrendingDown className="h-3 w-3" />;
    return null;
  };

  const getVolumeColor = (change: number) => {
    if (change > 0) return 'text-[#ED6C3D]';
    if (change < 0) return 'text-[#ECB66D]';
    return 'text-[#6B7280]';
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5E7EB] rounded-3xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.015)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#6287EE]" />
          <h3 className="text-[16px] font-bold text-[#1F2937]">T-1日大盘行情</h3>
        </div>
        <div className="flex items-center gap-3 text-[14px]">
          <span className="text-[#6B7280]">沪深总成交:</span>
          <span className="font-mono font-bold text-[#1F2937]">{marketOverview.totalVolume.toLocaleString()} 亿</span>
          <span className={`font-mono ${getVolumeColor(marketOverview.volumeChangePercent)}`}>
            {marketOverview.volumeChangePercent > 0 ? '+' : ''}{marketOverview.volumeChangePercent}%
          </span>
        </div>
      </div>

      {/* Index Grid */}
      <div className="grid grid-cols-4 gap-4">
        {marketOverview.indices.map((index) => (
          <div key={index.code} className="bg-[#F7F9FC] rounded-xl p-3 border border-[#E5E7EB]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[14px] text-[#6B7280] font-medium">{index.name}</span>
              <span className={`flex items-center gap-0.5 ${getTrendColor(index.changePercent)}`}>
                {getTrendIcon(index.changePercent)}
              </span>
            </div>
            <div className="font-mono font-bold text-[18px] text-[#1F2937] mb-1">
              {index.points.toFixed(2)}
            </div>
            <div className={`font-mono text-[14px] font-semibold ${getTrendColor(index.changePercent)}`}>
              {index.changePercent > 0 ? '+' : ''}{index.changePercent}%
            </div>
            <div className="mt-1 text-[12px] text-[#6B7280]">
              成交 {index.volume.toLocaleString()} 亿
            </div>
          </div>
        ))}
      </div>

      {/* Market Trend Tag */}
      <div className="mt-4 flex items-center justify-end gap-2">
        <span className="text-[14px] text-[#6B7280]">市场趋势:</span>
        <span className={`px-3 py-1 rounded-full text-[14px] font-semibold ${
          marketOverview.marketTrend === '上涨' ? 'bg-[#ED6C3D]/10 text-[#ED6C3D]' :
          marketOverview.marketTrend === '下跌' ? 'bg-[#ECB66D]/10 text-[#ECB66D]' :
          'bg-[#ECB66D]/10 text-[#ECB66D]'
        }`}>
          {marketOverview.marketTrend}
        </span>
      </div>
    </div>
  );
};