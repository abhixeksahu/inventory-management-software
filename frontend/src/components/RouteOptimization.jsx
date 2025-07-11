import React from "react";
import { MapPin } from "../icons";

const RouteOptimization = ({ routeData }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Route Optimization
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <h4 className="font-medium text-gray-900 mb-3">
                    Optimized Routes
                </h4>
                <div className="space-y-3">
                    {routeData.routes.map((route) => (
                        <div
                            key={route.id}
                            className="p-4 border border-gray-200 rounded-lg"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 text-blue-600 mr-2" />
                                    <span className="text-sm font-medium">
                                        {route.from} → {route.to}
                                    </span>
                                </div>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                    Optimized
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                                <div>Distance: {route.distance}</div>
                                <div>Time: {route.estimatedTime}</div>
                                <div>Cost: ${route.fuelCost}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-medium text-gray-900 mb-3">
                    Optimization Summary
                </h4>
                <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-green-800">
                                Total Distance
                            </span>
                            <span className="font-medium text-green-900">
                                {routeData.optimizationSummary.totalDistance}
                            </span>
                        </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-800">
                                Total Time
                            </span>
                            <span className="font-medium text-blue-900">
                                {routeData.optimizationSummary.totalTime}
                            </span>
                        </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-purple-800">
                                CO₂ Reduction
                            </span>
                            <span className="font-medium text-purple-900">
                                {routeData.optimizationSummary.co2Reduction}
                            </span>
                        </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-yellow-800">
                                Time Saved
                            </span>
                            <span className="font-medium text-yellow-900">
                                {routeData.optimizationSummary.timesSaved}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default RouteOptimization;
