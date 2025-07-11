import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const ForecastChart = ({ forecastData }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
                AI Demand Forecast
            </h3>
            <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                    Confidence:{" "}
                    <span className="font-medium">
                        {Math.round(forecastData.forecast.confidence * 100)}%
                    </span>
                </div>
                <div
                    className={`text-sm px-2 py-1 rounded-full ${
                        forecastData.forecast.trend === "increasing"
                            ? "bg-green-100 text-green-800"
                            : forecastData.forecast.trend === "decreasing"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                >
                    {forecastData.forecast.trend}
                </div>
            </div>
        </div>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData.historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#2563eb"
                        strokeWidth={2}
                        name="Actual Sales"
                    />
                    <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#dc2626"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Predicted Sales"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
                <strong>Recommendation:</strong>{" "}
                {forecastData.forecast.recommendation}
            </p>
            <p className="text-sm text-blue-600 mt-1">
                Next week predicted demand:{" "}
                <strong>{forecastData.forecast.nextWeekDemand} units</strong>
            </p>
        </div>
    </div>
);

export default ForecastChart;
