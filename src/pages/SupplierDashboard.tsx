
import React from 'react';
import { 
  Users, 
  Star, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ShoppingBag,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/StatCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockSuppliers } from '@/data/mockData';
import { Supplier } from '@/types/supplier';
import { VerificationDialog } from '@/components/suppliers/VerificationDialog';

// Mock supplier for demo purposes
const currentSupplier: Supplier = mockSuppliers[0];

const SupplierDashboard = () => {
  const [verified, setVerified] = React.useState(currentSupplier.verified || false);

  // Mock stats for the supplier
  const stats = {
    views: 1247,
    inquiries: 35,
    bookings: 8,
    revenue: 12500,
    avgRating: currentSupplier.rating
  };

  // Mock upcoming bookings for the supplier
  const upcomingBookings = [
    { id: 1, eventName: 'Corporate Anniversary', date: 'May 10, 2025', client: 'Acme Corp', status: 'confirmed' },
    { id: 2, eventName: 'Tech Conference', date: 'May 17, 2025', client: 'TechStart Inc.', status: 'pending' },
    { id: 3, eventName: 'Wedding Reception', date: 'May 24, 2025', client: 'Johnson Family', status: 'confirmed' }
  ];

  // Mock recent reviews for the supplier
  const recentReviews = [
    { id: 1, author: 'Emma Thompson', date: '1 week ago', rating: 5, comment: 'Exceptional service and quality!' },
    { id: 2, author: 'David Chen', date: '2 weeks ago', rating: 4, comment: 'Great work, would recommend.' },
    { id: 3, author: 'Sophia Rodriguez', date: '3 weeks ago', rating: 5, comment: 'Exceeded our expectations!' }
  ];

  const handleSuccessfulVerification = () => {
    setVerified(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Supplier Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your supplier profile, bookings, and analytics.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button>
            <Eye className="mr-1 h-4 w-4" />
            View Public Profile
          </Button>
          {!verified && (
            <VerificationDialog 
              supplierId={currentSupplier.id} 
              supplierName={currentSupplier.name}
              trigger={
                <Button variant="outline">
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  Verify Account
                </Button>
              }
            />
          )}
          {verified && (
            <Badge variant="outline" className="bg-emerald-500/90 text-white border-emerald-600 flex items-center h-10 px-4">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              <span>Verified Supplier</span>
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Profile Views" 
          value={stats.views} 
          icon={<Eye className="h-5 w-5" />}
          trend={12}
          trendColor="positive"
        />
        <StatCard 
          title="Inquiries" 
          value={stats.inquiries} 
          icon={<Users className="h-5 w-5" />}
          trend={5}
          trendColor="positive"
        />
        <StatCard 
          title="Bookings" 
          value={stats.bookings} 
          icon={<Calendar className="h-5 w-5" />}
          trend={2}
          trendColor="positive"
        />
        <StatCard 
          title="Revenue" 
          value={`$${stats.revenue.toLocaleString()}`} 
          icon={<DollarSign className="h-5 w-5" />}
          trend={15}
          trendColor="positive"
        />
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">Upcoming Bookings</TabsTrigger>
          <TabsTrigger value="reviews">Recent Reviews</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full p-2 bg-primary/10 text-primary">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.eventName}</p>
                        <p className="text-sm text-muted-foreground">{booking.date} • {booking.client}</p>
                      </div>
                    </div>
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                  </div>
                ))}
                {upcomingBookings.length === 0 && (
                  <div className="text-center py-8">
                    <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No upcoming bookings</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-medium text-primary">
                            {review.author.split(' ').map(name => name[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{review.author}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-muted'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
                {recentReviews.length === 0 && (
                  <div className="text-center py-8">
                    <Star className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No reviews yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(currentSupplier.services || currentSupplier.tags || []).map((service, index) => (
                  <div key={index} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full p-2 bg-primary/10 text-primary">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{service}</p>
                        <p className="text-sm text-muted-foreground">{currentSupplier.price}</p>
                      </div>
                    </div>
                    <Badge>{currentSupplier.availability}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplierDashboard;
