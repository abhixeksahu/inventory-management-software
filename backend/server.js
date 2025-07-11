const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database - In production, this would be a real database
let mockDatabase = {
  stores: [
    { id: 1, name: "Downtown Store", address: "123 Main St", lat: 40.7128, lng: -74.0060 },
    { id: 2, name: "Mall Branch", address: "456 Mall Ave", lat: 40.7589, lng: -73.9851 },
    { id: 3, name: "Suburb Store", address: "789 Oak St", lat: 40.6892, lng: -74.0445 },
    { id: 4, name: "Warehouse A", address: "101 Industrial Blvd", lat: 40.7505, lng: -73.9934 }
  ],
  
  products: [
    { id: 1, name: "iPhone 15", category: "Electronics", price: 999, minStock: 10, maxStock: 100 },
    { id: 2, name: "Samsung Galaxy S24", category: "Electronics", price: 899, minStock: 8, maxStock: 80 },
    { id: 3, name: "MacBook Pro", category: "Electronics", price: 1999, minStock: 5, maxStock: 50 },
    { id: 4, name: "Organic Milk", category: "Food", price: 4.99, minStock: 50, maxStock: 200, coldChain: true },
    { id: 5, name: "Frozen Pizza", category: "Food", price: 8.99, minStock: 30, maxStock: 150, coldChain: true },
    { id: 6, name: "Insulin Pen", category: "Pharma", price: 89.99, minStock: 20, maxStock: 100, coldChain: true },
    { id: 7, name: "Pain Relief Tablets", category: "Pharma", price: 12.99, minStock: 100, maxStock: 500 },
    { id: 8, name: "Wireless Headphones", category: "Electronics", price: 199, minStock: 15, maxStock: 75 }
  ],

  inventory: [
    // Store 1
    { productId: 1, storeId: 1, currentStock: 25, lastUpdated: new Date('2024-07-10') },
    { productId: 2, storeId: 1, currentStock: 5, lastUpdated: new Date('2024-07-10') }, // Low stock
    { productId: 3, storeId: 1, currentStock: 12, lastUpdated: new Date('2024-07-10') },
    { productId: 4, storeId: 1, currentStock: 45, lastUpdated: new Date('2024-07-10') }, // Low stock
    { productId: 5, storeId: 1, currentStock: 80, lastUpdated: new Date('2024-07-10') },
    { productId: 6, storeId: 1, currentStock: 15, lastUpdated: new Date('2024-07-10') },
    { productId: 7, storeId: 1, currentStock: 150, lastUpdated: new Date('2024-07-10') },
    { productId: 8, storeId: 1, currentStock: 30, lastUpdated: new Date('2024-07-10') },
    
    // Store 2
    { productId: 1, storeId: 2, currentStock: 15, lastUpdated: new Date('2024-07-10') },
    { productId: 2, storeId: 2, currentStock: 20, lastUpdated: new Date('2024-07-10') },
    { productId: 3, storeId: 2, currentStock: 8, lastUpdated: new Date('2024-07-10') },
    { productId: 4, storeId: 2, currentStock: 120, lastUpdated: new Date('2024-07-10') },
    { productId: 5, storeId: 2, currentStock: 25, lastUpdated: new Date('2024-07-10') }, // Low stock
    { productId: 6, storeId: 2, currentStock: 35, lastUpdated: new Date('2024-07-10') },
    { productId: 7, storeId: 2, currentStock: 200, lastUpdated: new Date('2024-07-10') },
    { productId: 8, storeId: 2, currentStock: 10, lastUpdated: new Date('2024-07-10') }, // Low stock
    
    // Store 3
    { productId: 1, storeId: 3, currentStock: 40, lastUpdated: new Date('2024-07-10') },
    { productId: 2, storeId: 3, currentStock: 35, lastUpdated: new Date('2024-07-10') },
    { productId: 3, storeId: 3, currentStock: 18, lastUpdated: new Date('2024-07-10') },
    { productId: 4, storeId: 3, currentStock: 30, lastUpdated: new Date('2024-07-10') }, // Low stock
    { productId: 5, storeId: 3, currentStock: 95, lastUpdated: new Date('2024-07-10') },
    { productId: 6, storeId: 3, currentStock: 8, lastUpdated: new Date('2024-07-10') }, // Low stock
    { productId: 7, storeId: 3, currentStock: 300, lastUpdated: new Date('2024-07-10') },
    { productId: 8, storeId: 3, currentStock: 25, lastUpdated: new Date('2024-07-10') }
  ],

  salesHistory: [
    // Last 30 days of sales data for forecasting
    { productId: 1, date: '2024-06-15', quantity: 8, storeId: 1 },
    { productId: 1, date: '2024-06-20', quantity: 12, storeId: 1 },
    { productId: 1, date: '2024-06-25', quantity: 15, storeId: 1 },
    { productId: 1, date: '2024-07-01', quantity: 18, storeId: 1 },
    { productId: 1, date: '2024-07-05', quantity: 22, storeId: 1 },
    { productId: 1, date: '2024-07-10', quantity: 25, storeId: 1 },
    // Add more sales data for other products...
  ],

  deliveryTrucks: [
    { 
      id: 1, 
      name: "Truck Alpha", 
      currentTemp: 2.5, 
      targetTemp: 2.0, 
      status: "active", 
      route: "Store 1 → Store 2",
      lat: 40.7300,
      lng: -74.0200,
      cargo: ["Organic Milk", "Frozen Pizza"]
    },
    { 
      id: 2, 
      name: "Truck Beta", 
      currentTemp: 8.5, 
      targetTemp: 5.0, 
      status: "warning", 
      route: "Warehouse A → Store 3",
      lat: 40.7100,
      lng: -73.9900,
      cargo: ["Insulin Pen", "Organic Milk"]
    },
    { 
      id: 3, 
      name: "Truck Gamma", 
      currentTemp: 15.2, 
      targetTemp: 2.0, 
      status: "critical", 
      route: "Store 2 → Store 3",
      lat: 40.7650,
      lng: -73.9800,
      cargo: ["Frozen Pizza", "Organic Milk"]
    }
  ]
};

// Helper function to get stock status
function getStockStatus(currentStock, minStock, maxStock) {
  if (currentStock <= minStock) return 'LOW';
  if (currentStock >= maxStock) return 'OVERSTOCK';
  return 'OK';
}

// Helper function for AI demand forecasting
function generateDemandForecast(productId, salesHistory) {
  const productSales = salesHistory.filter(sale => sale.productId === productId);
  
  if (productSales.length === 0) {
    return {
      nextWeekDemand: 10,
      confidence: 0.5,
      trend: 'stable',
      recommendation: 'Monitor sales patterns'
    };
  }

  // Simple trend analysis
  const recent = productSales.slice(-3);
  const older = productSales.slice(-6, -3);
  
  const recentAvg = recent.reduce((sum, sale) => sum + sale.quantity, 0) / recent.length;
  const olderAvg = older.length > 0 ? older.reduce((sum, sale) => sum + sale.quantity, 0) / older.length : recentAvg;
  
  const trendRate = (recentAvg - olderAvg) / olderAvg;
  
  let trend = 'stable';
  let nextWeekDemand = Math.round(recentAvg * 1.1); // Base prediction
  
  if (trendRate > 0.1) {
    trend = 'increasing';
    nextWeekDemand = Math.round(recentAvg * 1.3);
  } else if (trendRate < -0.1) {
    trend = 'decreasing';
    nextWeekDemand = Math.round(recentAvg * 0.8);
  }

  return {
    nextWeekDemand,
    confidence: Math.min(0.95, 0.6 + (productSales.length * 0.05)),
    trend,
    recommendation: trend === 'increasing' ? 'Increase stock order' : 
                   trend === 'decreasing' ? 'Reduce stock order' : 'Maintain current levels'
  };
}

// API Routes

// 1. Dashboard KPIs
app.get('/api/dashboard/kpis', (req, res) => {
  const totalSKUs = mockDatabase.products.length;
  const totalStores = mockDatabase.stores.length;
  
  // Calculate products below threshold
  const lowStockCount = mockDatabase.inventory.filter(inv => {
    const product = mockDatabase.products.find(p => p.id === inv.productId);
    return inv.currentStock <= product.minStock;
  }).length;
  
  // Mock forecast accuracy
  const forecastAccuracy = 87.5;
  
  // Mock CO2 savings from route optimization
  const co2Saved = 245.7;
  
  // Calculate stock turnover (mock)
  const stockTurnover = 12.3;
  
  res.json({
    totalSKUs,
    totalStores,
    lowStockCount,
    forecastAccuracy,
    co2Saved,
    stockTurnover,
    totalRevenue: 125000,
    fulfillmentRate: 94.2
  });
});

// 2. Inventory Management
app.get('/api/inventory', (req, res) => {
  const { storeId } = req.query;
  
  let inventoryData = mockDatabase.inventory.map(inv => {
    const product = mockDatabase.products.find(p => p.id === inv.productId);
    const store = mockDatabase.stores.find(s => s.id === inv.storeId);
    
    return {
      ...inv,
      productName: product.name,
      category: product.category,
      price: product.price,
      storeName: store.name,
      minStock: product.minStock,
      maxStock: product.maxStock,
      status: getStockStatus(inv.currentStock, product.minStock, product.maxStock),
      restockAmount: product.minStock - inv.currentStock > 0 ? 
                    Math.max(0, product.maxStock - inv.currentStock) : 0
    };
  });
  
  if (storeId) {
    inventoryData = inventoryData.filter(inv => inv.storeId === parseInt(storeId));
  }
  
  res.json(inventoryData);
});

// 3. Low Stock Alerts
app.get('/api/alerts/low-stock', (req, res) => {
  const lowStockItems = mockDatabase.inventory.filter(inv => {
    const product = mockDatabase.products.find(p => p.id === inv.productId);
    return inv.currentStock <= product.minStock;
  }).map(inv => {
    const product = mockDatabase.products.find(p => p.id === inv.productId);
    const store = mockDatabase.stores.find(s => s.id === inv.storeId);
    
    return {
      ...inv,
      productName: product.name,
      storeName: store.name,
      minStock: product.minStock,
      suggestedRestock: product.maxStock - inv.currentStock,
      urgency: inv.currentStock === 0 ? 'CRITICAL' : 
               inv.currentStock <= product.minStock * 0.5 ? 'HIGH' : 'MEDIUM'
    };
  });
  
  res.json(lowStockItems);
});

// 4. AI Demand Forecasting
app.get('/api/forecast/:productId', (req, res) => {
  const { productId } = req.params;
  const product = mockDatabase.products.find(p => p.id === parseInt(productId));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const forecast = generateDemandForecast(parseInt(productId), mockDatabase.salesHistory);
  
  // Generate historical data for chart
  const historicalData = [
    { date: '2024-06-15', actual: 8, predicted: null },
    { date: '2024-06-20', actual: 12, predicted: null },
    { date: '2024-06-25', actual: 15, predicted: null },
    { date: '2024-07-01', actual: 18, predicted: null },
    { date: '2024-07-05', actual: 22, predicted: null },
    { date: '2024-07-10', actual: 25, predicted: null },
    { date: '2024-07-15', actual: null, predicted: forecast.nextWeekDemand },
    { date: '2024-07-20', actual: null, predicted: Math.round(forecast.nextWeekDemand * 1.05) },
    { date: '2024-07-25', actual: null, predicted: Math.round(forecast.nextWeekDemand * 1.1) }
  ];
  
  res.json({
    productId: parseInt(productId),
    productName: product.name,
    forecast,
    historicalData
  });
});

// 5. Route Optimization
app.get('/api/routes/optimize', (req, res) => {
  const { from, to } = req.query;
  
  // Mock route optimization
  const routes = [
    {
      id: 1,
      from: "Warehouse A",
      to: "Downtown Store",
      distance: "12.5 km",
      estimatedTime: "25 minutes",
      fuelCost: 8.50,
      optimized: true,
      waypoints: [
        { lat: 40.7505, lng: -73.9934, name: "Warehouse A" },
        { lat: 40.7400, lng: -74.0100, name: "Checkpoint 1" },
        { lat: 40.7128, lng: -74.0060, name: "Downtown Store" }
      ]
    },
    {
      id: 2,
      from: "Downtown Store",
      to: "Mall Branch",
      distance: "8.3 km",
      estimatedTime: "18 minutes",
      fuelCost: 6.20,
      optimized: true,
      waypoints: [
        { lat: 40.7128, lng: -74.0060, name: "Downtown Store" },
        { lat: 40.7350, lng: -73.9950, name: "Checkpoint 2" },
        { lat: 40.7589, lng: -73.9851, name: "Mall Branch" }
      ]
    }
  ];
  
  const optimizationSummary = {
    totalDistance: "20.8 km",
    totalTime: "43 minutes",
    totalFuelCost: 14.70,
    co2Reduction: "23.5 kg",
    timesSaved: "12 minutes"
  };
  
  res.json({
    routes,
    optimizationSummary,
    alternativeRoutes: []
  });
});

// 6. Cold Chain Monitoring
app.get('/api/cold-chain/alerts', (req, res) => {
  const alerts = mockDatabase.deliveryTrucks.filter(truck => truck.status !== 'active').map(truck => ({
    truckId: truck.id,
    truckName: truck.name,
    currentTemp: truck.currentTemp,
    targetTemp: truck.targetTemp,
    status: truck.status,
    route: truck.route,
    cargo: truck.cargo,
    alertType: truck.status === 'critical' ? 'TEMPERATURE_CRITICAL' : 'TEMPERATURE_WARNING',
    message: truck.status === 'critical' ? 
             `Critical: Temperature ${truck.currentTemp}°C exceeds safe range` :
             `Warning: Temperature ${truck.currentTemp}°C above target`,
    timestamp: new Date(),
    lat: truck.lat,
    lng: truck.lng
  }));
  
  res.json(alerts);
});

// 7. Cold Chain Real-time Status
app.get('/api/cold-chain/status', (req, res) => {
  res.json({
    trucks: mockDatabase.deliveryTrucks,
    summary: {
      totalTrucks: mockDatabase.deliveryTrucks.length,
      activeAlerts: mockDatabase.deliveryTrucks.filter(t => t.status !== 'active').length,
      criticalAlerts: mockDatabase.deliveryTrucks.filter(t => t.status === 'critical').length,
      avgTemperature: mockDatabase.deliveryTrucks.reduce((sum, t) => sum + t.currentTemp, 0) / mockDatabase.deliveryTrucks.length
    }
  });
});

// 8. Analytics & KPIs
app.get('/api/analytics/performance', (req, res) => {
  const performanceData = {
    stockTurnover: {
      current: 12.3,
      target: 15.0,
      trend: 'improving'
    },
    fulfillmentRate: {
      current: 94.2,
      target: 97.0,
      trend: 'stable'
    },
    deliveryPerformance: {
      onTimeDelivery: 89.5,
      avgDeliveryTime: 2.3,
      customerSatisfaction: 4.2
    },
    costOptimization: {
      routingEfficiency: 87.5,
      fuelSavings: 245.7,
      warehouseCosts: 15600
    }
  };
  
  res.json(performanceData);
});

// 9. What-if Simulator
app.post('/api/simulator/demand-change', (req, res) => {
  const { productId, demandChange, timeframe } = req.body;
  
  const product = mockDatabase.products.find(p => p.id === parseInt(productId));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const currentInventory = mockDatabase.inventory.filter(inv => inv.productId === parseInt(productId));
  const totalCurrentStock = currentInventory.reduce((sum, inv) => sum + inv.currentStock, 0);
  
  const projectedDemand = Math.round(totalCurrentStock * (1 + demandChange / 100));
  const stockDeficit = Math.max(0, projectedDemand - totalCurrentStock);
  
  const simulation = {
    scenario: `${demandChange > 0 ? 'Increase' : 'Decrease'} demand by ${Math.abs(demandChange)}%`,
    currentStock: totalCurrentStock,
    projectedDemand,
    stockDeficit,
    recommendedAction: stockDeficit > 0 ? 
                      `Order ${stockDeficit} units immediately` : 
                      'Current stock sufficient',
    estimatedCost: stockDeficit * product.price * 0.7, // Wholesale cost
    riskLevel: stockDeficit > totalCurrentStock * 0.5 ? 'HIGH' : 
               stockDeficit > 0 ? 'MEDIUM' : 'LOW'
  };
  
  res.json(simulation);
});

// 10. Stores and Products endpoints
app.get('/api/stores', (req, res) => {
  res.json(mockDatabase.stores);
});

app.get('/api/products', (req, res) => {
  res.json(mockDatabase.products);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`SupplyWise Backend running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`- GET /api/dashboard/kpis`);
  console.log(`- GET /api/inventory`);
  console.log(`- GET /api/alerts/low-stock`);
  console.log(`- GET /api/forecast/:productId`);
  console.log(`- GET /api/routes/optimize`);
  console.log(`- GET /api/cold-chain/alerts`);
  console.log(`- GET /api/cold-chain/status`);
  console.log(`- GET /api/analytics/performance`);
  console.log(`- POST /api/simulator/demand-change`);
  console.log(`- GET /api/stores`);
  console.log(`- GET /api/products`);
});

module.exports = app;