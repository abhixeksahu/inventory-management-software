import React from "react";
import { AlertCircle, ThermometerSun } from "../icons";

const ColdChainMonitor = ({ coldChainData }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cold Chain Monitoring
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coldChainData.trucks.map((truck) => (
                <div
                    key={truck.id}
                    className={`p-4 rounded-lg border-2 ${
                        truck.status === "active"
                            ? "border-green-200 bg-green-50"
                            : truck.status === "warning"
                            ? "border-yellow-200 bg-yellow-50"
                            : "border-red-200 bg-red-50"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                            {truck.name}
                        </h4>
                        <ThermometerSun
                            className={`w-5 h-5 ${
                                truck.status === "active"
                                    ? "text-green-600"
                                    : truck.status === "warning"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                            }`}
                        />
                    </div>
                    <div className="space-y-1 text-sm">
                        <p className="text-gray-600">Route: {truck.route}</p>
                        <p className="text-gray-600">
                            Current Temp:{" "}
                            <span className="font-medium">
                                {truck.currentTemp}°C
                            </span>
                        </p>
                        <p className="text-gray-600">
                            Target Temp:{" "}
                            <span className="font-medium">
                                {truck.targetTemp}°C
                            </span>
                        </p>
                        <p className="text-gray-600">
                            Cargo: {truck.cargo.join(", ")}
                        </p>
                    </div>
                    {truck.status !== "active" && (
                        <div className="mt-2 p-2 bg-white rounded text-xs">
                            <AlertCircle className="w-4 h-4 inline mr-1" />
                            {truck.status === "critical"
                                ? "Temperature Critical!"
                                : "Temperature Warning"}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);

export default ColdChainMonitor;
