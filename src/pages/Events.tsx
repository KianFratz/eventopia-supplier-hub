
import React from 'react';
import { PlusCircle, Calendar, Users, Clock, DollarSign, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Events = () => {
  const upcomingEvents = [
    {
      id: '1',
      name: 'Annual Corporate Conference',
      date: 'May 15, 2023',
      time: '9:00 AM - 5:00 PM',
      location: 'Grand Hotel, New York',
      budget: '$15,000',
      attendees: 200,
      status: 'Planning',
      progress: 65,
      supplierCount: 5,
    },
    {
      id: '2',
      name: 'Product Launch Party',
      date: 'June 3, 2023',
      time: '7:00 PM - 10:00 PM',
      location: 'Tech Hub, San Francisco',
      budget: '$8,500',
      attendees: 80,
      status: 'Confirmed',
      progress: 85,
      supplierCount: 4,
    },
    {
      id: '3',
      name: 'Client Appreciation Gala',
      date: 'June 22, 2023',
      time: '6:30 PM - 11:00 PM',
      location: 'Riverside Venue, Chicago',
      budget: '$12,000',
      attendees: 120,
      status: 'Planning',
      progress: 40,
      supplierCount: 6,
    },
  ];

  const pastEvents = [
    {
      id: '4',
      name: 'Team Building Retreat',
      date: 'April 10, 2023',
      time: '10:00 AM - 4:00 PM',
      location: 'Mountain Lodge, Denver',
      budget: '$5,000',
      attendees: 35,
      status: 'Completed',
      progress: 100,
      supplierCount: 3,
    },
    {
      id: '5',
      name: 'Quarterly Stakeholder Meeting',
      date: 'March 25, 2023',
      time: '1:00 PM - 4:00 PM',
      location: 'Company HQ, Boston',
      budget: '$2,500',
      attendees: 50,
      status: 'Completed',
      progress: 100,
      supplierCount: 2,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Confirmed':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Completed':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const EventCard = ({ event }: { event: any }) => (
    <Card className="overflow-hidden hover-lift">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{event.name}</CardTitle>
            <CardDescription>{event.date}</CardDescription>
          </div>
          <Badge className={getStatusColor(event.status)}>
            {event.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              <span>{event.attendees} Attendees</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Budget: {event.budget}</span>
            </div>
          </div>
          
          {event.status !== 'Completed' && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Planning Progress</span>
                <span className="font-medium">{event.progress}%</span>
              </div>
              <Progress value={event.progress} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 pt-3">
        <div className="flex justify-between items-center w-full">
          <span className="text-xs text-muted-foreground">
            {event.supplierCount} suppliers assigned
          </span>
          <Button variant="outline" size="sm">Manage Event</Button>
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Events</h1>
          <p className="text-muted-foreground">
            Plan and manage your upcoming events.
          </p>
        </div>
        <Button className="sm:self-end">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Event
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Events;
