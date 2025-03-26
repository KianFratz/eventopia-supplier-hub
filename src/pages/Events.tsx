
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/events/EventCard';
import { CreateEventSheet } from '@/components/events/CreateEventSheet';
import { ManageEventSheet } from '@/components/events/ManageEventSheet';
import { Supplier } from '@/types/supplier';

// Enhanced Event interface with suppliers
export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  budget: string;
  attendees: number;
  status: string;
  description: string;
  suppliers?: Supplier[]; // Add suppliers array
}

// Mock events data
const mockEvents = [
  {
    id: '1',
    name: 'Annual Tech Conference',
    date: '2023-11-15',
    time: '09:00 AM - 05:00 PM',
    location: 'San Francisco, CA',
    budget: '$25,000',
    attendees: 500,
    status: 'Upcoming',
    description: 'Our annual technology conference featuring keynote speakers, workshops, and networking opportunities.',
    suppliers: [], // Initialize empty suppliers array
  },
  {
    id: '2',
    name: 'Product Launch Party',
    date: '2023-12-05',
    time: '07:00 PM - 10:00 PM',
    location: 'New York, NY',
    budget: '$15,000',
    attendees: 200,
    status: 'Planning',
    description: 'Exclusive launch party for our new product line with press, influencers, and key customers.',
    suppliers: [], // Initialize empty suppliers array
  },
  {
    id: '3',
    name: 'Team Building Retreat',
    date: '2024-01-20',
    time: 'All Day',
    location: 'Denver, CO',
    budget: '$10,000',
    attendees: 50,
    status: 'Draft',
    description: 'Company retreat focused on team building activities and strategic planning sessions.',
    suppliers: [], // Initialize empty suppliers array
  },
  {
    id: '4',
    name: 'Customer Appreciation Gala',
    date: '2023-10-10',
    time: '06:30 PM - 11:00 PM',
    location: 'Chicago, IL',
    budget: '$30,000',
    attendees: 300,
    status: 'Completed',
    description: 'Annual formal dinner to recognize and appreciate our top clients and partners.',
    suppliers: [], // Initialize empty suppliers array
  },
];

const Events = () => {
  const [events, setEvents] = useState(mockEvents);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isManageEventOpen, setIsManageEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleCreateEvent = (newEvent: any) => {
    // Ensure the new event has a suppliers array
    const eventWithSuppliers = {
      ...newEvent,
      suppliers: [],
    };
    setEvents([eventWithSuppliers, ...events]);
  };

  const handleUpdateEvent = (updatedEvent: any) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleManageEvent = (event: any) => {
    setSelectedEvent(event);
    setIsManageEventOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Events</h1>
          <p className="text-muted-foreground">
            Create and manage all your events in one place.
          </p>
        </div>
        
        <Button onClick={() => setIsCreateEventOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            onManage={() => handleManageEvent(event)} 
          />
        ))}
      </div>
      
      <CreateEventSheet 
        isOpen={isCreateEventOpen} 
        onOpenChange={setIsCreateEventOpen}
        onEventCreated={handleCreateEvent}
      />
      
      {selectedEvent && (
        <ManageEventSheet 
          event={selectedEvent}
          isOpen={isManageEventOpen} 
          onOpenChange={setIsManageEventOpen}
          onEventUpdated={handleUpdateEvent}
        />
      )}
    </div>
  );
};

export default Events;
