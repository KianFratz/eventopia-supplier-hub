import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Analytics = () => {
  // Sample data for the charts
  const supplierPerformanceData = [
    { name: 'Jan', rating: 4.2, onTime: 92, price: 85 },
    { name: 'Feb', rating: 4.3, onTime: 95, price: 82 },
    { name: 'Mar', rating: 4.5, onTime: 97, price: 89 },
    { name: 'Apr', rating: 4.6, onTime: 98, price: 92 },
    { name: 'May', rating: 4.7, onTime: 96, price: 90 },
    { name: 'Jun', rating: 4.8, onTime: 97, price: 93 },
  ];

  const budgetAllocationData = [
    { name: 'Catering', value: 35 },
    { name: 'Venue', value: 25 },
    { name: 'Decoration', value: 15 },
    { name: 'Entertainment', value: 10 },
    { name: 'Photography', value: 8 },
    { name: 'Printing', value: 7 },
  ];

  const categoryComparisonData = [
    { name: 'Catering', average: 4.6, best: 4.9, worst: 4.1 },
    { name: 'Decor', average: 4.7, best: 5.0, worst: 4.2 },
    { name: 'Audio', average: 4.5, best: 4.8, worst: 4.0 },
    { name: 'Venue', average: 4.8, best: 5.0, worst: 4.5 },
    { name: 'Transport', average: 4.3, best: 4.7, worst: 3.8 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF', '#4BC0C0'];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Track performance and gain insights to make informed decisions.
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <Tabs defaultValue="performance" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="performance">Supplier Performance</TabsTrigger>
              <TabsTrigger value="budget">Budget Analysis</TabsTrigger>
              <TabsTrigger value="categories">Category Comparison</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <Select defaultValue="6months">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Rating Trends</CardTitle>
                  <CardDescription>Average rating over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={supplierPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[3.5, 5]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="rating" 
                          name="Avg. Rating" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>On-time delivery & price competitiveness</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={supplierPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="onTime" name="On-Time %" fill="#4BC0C0" />
                        <Bar dataKey="price" name="Price Competitiveness" fill="#A259FF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="budget">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Allocation</CardTitle>
                  <CardDescription>How your event budget is distributed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={budgetAllocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {budgetAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Budget Utilization</CardTitle>
                  <CardDescription>Actual spending vs. planned budget</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Event 1', planned: 10000, actual: 9500 },
                          { name: 'Event 2', planned: 8000, actual: 8200 },
                          { name: 'Event 3', planned: 12000, actual: 11800 },
                          { name: 'Event 4', planned: 15000, actual: 14200 },
                          { name: 'Event 5', planned: 7000, actual: 7500 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="planned" name="Planned Budget" fill="#8884d8" />
                        <Bar dataKey="actual" name="Actual Spending" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="categories">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Categories Comparison</CardTitle>
                  <CardDescription>Average ratings across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[3.5, 5]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="average" name="Average Rating" fill="#8884d8" />
                        <Bar dataKey="best" name="Best Supplier" fill="#82ca9d" />
                        <Bar dataKey="worst" name="Lowest Rated" fill="#ff7e67" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Distribution</CardTitle>
                  <CardDescription>Number of suppliers by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Catering', value: 24 },
                            { name: 'Decor', value: 18 },
                            { name: 'Audio/Visual', value: 14 },
                            { name: 'Venue', value: 12 },
                            { name: 'Transportation', value: 10 },
                            { name: 'Photography', value: 8 },
                            { name: 'Printing', value: 5 },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {budgetAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
