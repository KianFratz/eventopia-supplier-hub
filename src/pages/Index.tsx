import React from 'react';
import { Users, Calendar, Star, TrendingUp, DollarSign, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecommendationCard } from '@/components/dashboard/RecommendationCard';
import { mockSuppliers } from '@/data/mockData';

const Dashboard = () => {
  // Take a few suppliers for recommendations
  const recommendedSuppliers = mockSuppliers
    .filter(s => s.rating >= 4.5)
    .slice(0, 3);
  
  const recommendationReasons = [
    "Perfect match for your upcoming corporate event based on your preferences",
    "Highly rated by event planners with similar taste to yours",
    "Great pricing and availability that matches your upcoming events"
  ];
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your event planning hub.</p>
        </div>
        <Button>
          Create New Event
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Suppliers" 
          value={124} 
          icon={<Users className="h-5 w-5" />}
          trend={8}
          trendColor="positive"
        />
        <StatCard 
          title="Upcoming Events" 
          value={5} 
          icon={<Calendar className="h-5 w-5" />}
          trend={2}
          trendColor="positive"
        />
        <StatCard 
          title="Top Rated Suppliers" 
          value={36} 
          icon={<Star className="h-5 w-5" />}
          trend={12}
          trendColor="positive"
        />
        <StatCard 
          title="Budget Utilization" 
          value="78%" 
          icon={<DollarSign className="h-5 w-5" />}
          trend={-3}
          trendColor="negative"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <Card className="overflow-hidden">
              <div className="divide-y divide-border">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-4 flex items-center space-x-4 transition-colors hover:bg-muted/50">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      {i % 3 === 0 ? (
                        <Calendar className="h-4 w-4" />
                      ) : i % 3 === 1 ? (
                        <Users className="h-4 w-4" /> 
                      ) : (
                        <Star className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        {i % 3 === 0 ? 
                          'New event "Annual Conference" created' : 
                          i % 3 === 1 ? 
                          'Added "Premium Catering Co." to suppliers' : 
                          'Reviewed "Sound Solutions" with 5 stars'}
                      </p>
                      <p className="text-xs text-muted-foreground">{i} hour{i !== 1 ? 's' : ''} ago</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <Button variant="ghost" size="sm">View Calendar</Button>
            </div>
            <Card className="overflow-hidden">
              <div className="divide-y divide-border">
                {[
                  { name: 'Marketing Launch Party', date: 'May 15, 2023', suppliers: 4 },
                  { name: 'Quarterly Team Meetup', date: 'June 3, 2023', suppliers: 2 },
                  { name: 'Client Appreciation Dinner', date: 'June 12, 2023', suppliers: 3 }
                ].map((event, i) => (
                  <div key={i} className="p-4 flex items-center space-x-4 transition-colors hover:bg-muted/50">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{event.name}</p>
                      <p className="text-xs text-muted-foreground">{event.date} • {event.suppliers} suppliers</p>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recommended for You</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {recommendedSuppliers.map((supplier, i) => (
              <RecommendationCard 
                key={supplier.id}
                supplier={supplier}
                reason={recommendationReasons[i]}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Top Rated Suppliers</h2>
          <Button variant="ghost" size="sm">View All Suppliers</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockSuppliers
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4)
            .map((supplier) => (
              <Card key={supplier.id} className="overflow-hidden hover-lift">
                <div className="aspect-video relative">
                  <img 
                    src={supplier.image} 
                    alt={supplier.name} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/50 text-white px-2 py-0.5 rounded-md">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-medium">{supplier.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm">{supplier.name}</h3>
                  <p className="text-xs text-muted-foreground">{supplier.category}</p>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
