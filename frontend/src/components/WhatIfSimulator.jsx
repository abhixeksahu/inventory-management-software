import React, { useState } from "react";

const API_BASE = "http://localhost:5000"; // Adjust if needed

const WhatIfSimulator = () => {
    const [selectedProduct, setSelectedProduct] = useState("1");
    const [demandChange, setDemandChange] = useState(0);
    const [simulationResult, setSimulationResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const runSimulation = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${API_BASE}/api/simulator/demand-change`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        productId: selectedProduct,
                        demandChange: demandChange,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`Simulation failed: ${response.statusText}`);
            }

            const data = await response.json();

            // Use backend response fields directly
            setSimulationResult({
                scenario: data.scenario,
                currentStock: data.currentStock,
                projectedDemand: data.projectedDemand,
                stockDeficit: data.stockDeficit,
                recommendedAction: data.recommendedAction,
                estimatedCost: data.estimatedCost,
                riskLevel: data.riskLevel,
            });
        } catch (err) {
            setError(err.message || "Unknown error");
            setSimulationResult(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What-If Simulator
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product
                            </label>
                            <select
                                value={selectedProduct}
                                onChange={(e) =>
                                    setSelectedProduct(e.target.value)
                                }
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="1">iPhone 15</option>
                                <option value="2">Samsung Galaxy S24</option>
                                <option value="3">MacBook Pro</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Demand Change: {demandChange}%
                            </label>
                            <input
                                type="range"
                                min="-50"
                                max="100"
                                value={demandChange}
                                onChange={(e) =>
                                    setDemandChange(parseInt(e.target.value))
                                }
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>-50%</span>
                                <span>0%</span>
                                <span>+100%</span>
                            </div>
                        </div>
                        <button
                            onClick={runSimulation}
                            disabled={loading}
                            className={`w-full py-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                loading
                                    ? "bg-blue-300 cursor-not-allowed text-white"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                        >
                            {loading
                                ? "Running Simulation..."
                                : "Run Simulation"}
                        </button>
                        {error && (
                            <p className="text-red-600 mt-2 text-sm">{error}</p>
                        )}
                    </div>
                </div>
                <div>
                    {simulationResult && (
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-2">
                                    Simulation Results
                                </h4>
                                <p className="italic text-sm text-gray-700 mb-2">
                                    {simulationResult.scenario}
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Current Stock:</span>
                                        <span className="font-medium">
                                            {simulationResult.currentStock}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Projected Demand:</span>
                                        <span className="font-medium">
                                            {simulationResult.projectedDemand}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Stock Deficit:</span>
                                        <span className="font-medium text-red-600">
                                            {simulationResult.stockDeficit}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Risk Level:</span>
                                        <span
                                            className={`font-medium ${
                                                simulationResult.riskLevel ===
                                                "HIGH"
                                                    ? "text-red-600"
                                                    : simulationResult.riskLevel ===
                                                      "MEDIUM"
                                                    ? "text-yellow-600"
                                                    : "text-green-600"
                                            }`}
                                        >
                                            {simulationResult.riskLevel}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-medium text-blue-900 mb-2">
                                    Recommendation
                                </h4>
                                <p className="text-sm text-blue-800">
                                    {simulationResult.recommendedAction}
                                </p>
                                {simulationResult.estimatedCost > 0 && (
                                    <p className="text-sm text-blue-600 mt-2">
                                        Estimated Cost: $
                                        {simulationResult.estimatedCost.toFixed(
                                            2
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WhatIfSimulator;
