import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventCard } from '@/components/events/EventCard';
import { CreateEventSheet } from '@/components/events/CreateEventSheet';
import { ManageEventSheet } from '@/components/events/ManageEventSheet';
import { Supplier } from '@/types/supplier';
import { mockEvents } from '@/data/mockData';

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

const Events = () => {
  const [events, setEvents] = useState(mockEvents);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isManageEventOpen, setIsManageEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleCreateEvent = (newEvent: Event) => {
    // Ensure the new event has a suppliers array
    const eventWithSuppliers = {
      ...newEvent,
      suppliers: [],
    };
    setEvents([eventWithSuppliers, ...events]);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleManageEvent = (event: Event) => {
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
