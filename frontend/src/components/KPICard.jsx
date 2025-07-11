import React from 'react';

const KPICard = ({ title, value, unit, icon: Icon, trend, color = "blue" }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">
          {value}{unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
        </p>
        {trend && (
          <p className={`text-sm ${trend.includes('↑') ? 'text-green-600' : trend.includes('↓') ? 'text-red-600' : 'text-gray-600'}`}>
            {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-full bg-${color}-100`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
    </div>
  </div>
);

export default KPICard;
