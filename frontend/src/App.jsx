import React, { useState, useEffect } from "react";
import KPICard from "./components/KPICard";
import InventoryTable from "./components/InventoryTable";
import ForecastChart from "./components/ForecastChart";
import ColdChainMonitor from "./components/ColdChainMonitor";
import RouteOptimization from "./components/RouteOptimization";
import WhatIfSimulator from "./components/WhatIfSimulator";
import {
    Activity,
    Package,
    TrendingUp,
    ThermometerSun,
    MapPin,
    AlertCircle,
    Clock,
} from "./icons";

const SupplyWiseApp = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [kpis, setKpis] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [forecastData, setForecastData] = useState(null);
    const [coldChainData, setColdChainData] = useState(null);
    const [routeData, setRouteData] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_BASE = "http://localhost:5000"; // Backend server URL

    // Fetch functions for backend endpoints
    async function getDashboardKPIs() {
        const res = await fetch(`${API_BASE}/api/dashboard/kpis`);
        if (!res.ok) throw new Error("Failed to fetch KPIs");
        return res.json();
    }

    async function getInventory() {
        const res = await fetch(`${API_BASE}/api/inventory`);
        if (!res.ok) throw new Error("Failed to fetch Inventory");
        return res.json();
    }

    async function getForecast(productId) {
        const res = await fetch(`${API_BASE}/api/forecast/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch Forecast");
        return res.json();
    }

    async function getColdChainStatus() {
        const res = await fetch(`${API_BASE}/api/cold-chain/status`);
        if (!res.ok) throw new Error("Failed to fetch Cold Chain Status");
        return res.json();
    }

    async function getRouteOptimization() {
        const res = await fetch(`${API_BASE}/api/routes/optimize`);
        if (!res.ok) throw new Error("Failed to fetch Route Optimization");
        return res.json();
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    kpisData,
                    inventoryData,
                    forecastResult,
                    coldChainResult,
                    routeResult,
                ] = await Promise.all([
                    getDashboardKPIs(),
                    getInventory(),
                    getForecast(1), // pass productId = 1 or selected product id
                    getColdChainStatus(),
                    getRouteOptimization(),
                ]);

                setKpis(kpisData);
                setInventory(inventoryData);
                setForecastData(forecastResult);
                setColdChainData(coldChainResult);
                setRouteData(routeResult);
                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const tabs = [
        { id: "dashboard", name: "Dashboard", icon: Activity },
        { id: "inventory", name: "Inventory", icon: Package },
        { id: "forecast", name: "AI Forecast", icon: TrendingUp },
        { id: "coldchain", name: "Cold Chain", icon: ThermometerSun },
        { id: "routes", name: "Routes", icon: MapPin },
        { id: "simulator", name: "What-If", icon: Activity },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">
                        Loading SupplyWise Dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Package className="w-8 h-8 text-blue-600 mr-3" />
                            <h1 className="text-xl font-bold text-gray-900">
                                SupplyWise
                            </h1>
                            <span className="ml-2 text-sm text-gray-500">
                                Smart Supply Chain Optimization
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-1" />
                                Last updated: {new Date().toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 ${
                                        activeTab === tab.id
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {tab.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === "dashboard" && (
                    <div className="space-y-6">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <KPICard
                                title="Total SKUs"
                                value={kpis.totalSKUs}
                                icon={Package}
                                color="blue"
                            />
                            <KPICard
                                title="Low Stock Alerts"
                                value={kpis.lowStockCount}
                                icon={AlertCircle}
                                color="red"
                                trend="↑ 2 from yesterday"
                            />
                            <KPICard
                                title="Forecast Accuracy"
                                value={kpis.forecastAccuracy}
                                unit="%"
                                icon={TrendingUp}
                                color="green"
                                trend="↑ 3.2% this week"
                            />
                            <KPICard
                                title="CO₂ Saved"
                                value={kpis.co2Saved}
                                unit="kg"
                                icon={Activity}
                                color="purple"
                                trend="↑ 12% this month"
                            />
                        </div>

                        {/* Revenue and Performance */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Revenue Overview
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Total Revenue
                                        </span>
                                        <span className="text-2xl font-bold text-green-600">
                                            $
                                            {kpis.totalRevenue.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Fulfillment Rate
                                        </span>
                                        <span className="text-xl font-semibold text-blue-600">
                                            {kpis.fulfillmentRate}%
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Stock Turnover
                                        </span>
                                        <span className="text-xl font-semibold text-purple-600">
                                            {kpis.stockTurnover}x
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Quick Actions
                                </h3>
                                <div className="space-y-3">
                                    <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                                        View Critical Alerts (
                                        {kpis.lowStockCount})
                                    </button>
                                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                                        Generate Restock Orders
                                    </button>
                                    <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                                        Optimize Routes
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Inventory Overview */}
                        <InventoryTable inventory={inventory.slice(0, 5)} />
                    </div>
                )}

                {activeTab === "inventory" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Inventory Management
                            </h2>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                Export Report
                            </button>
                        </div>
                        <InventoryTable inventory={inventory} />
                    </div>
                )}

                {activeTab === "forecast" && forecastData && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                AI Demand Forecasting
                            </h2>
                            <select className="border border-gray-300 rounded-md px-3 py-2">
                                <option>iPhone 15</option>
                                <option>Samsung Galaxy S24</option>
                                <option>MacBook Pro</option>
                            </select>
                        </div>
                        <ForecastChart forecastData={forecastData} />
                    </div>
                )}

                {activeTab === "coldchain" && coldChainData && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Cold Chain Monitoring
                            </h2>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                    Active Alerts:{" "}
                                    <span className="font-semibold text-red-600">
                                        {coldChainData.summary.activeAlerts}
                                    </span>
                                </span>
                                <span className="text-sm text-gray-600">
                                    Avg Temp:{" "}
                                    <span className="font-semibold">
                                        {coldChainData.summary.avgTemperature.toFixed(
                                            1
                                        )}
                                        °C
                                    </span>
                                </span>
                            </div>
                        </div>
                        <ColdChainMonitor coldChainData={coldChainData} />
                    </div>
                )}

                {activeTab === "routes" && routeData && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Route Optimization
                            </h2>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                                Optimize All Routes
                            </button>
                        </div>
                        <RouteOptimization routeData={routeData} />
                    </div>
                )}

                {activeTab === "simulator" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                What-If Scenario Simulator
                            </h2>
                            <span className="text-sm text-gray-600">
                                Test demand changes and see impact
                            </span>
                        </div>
                        <WhatIfSimulator />
                    </div>
                )}
            </main>
        </div>
    );
};

export default SupplyWiseApp;
