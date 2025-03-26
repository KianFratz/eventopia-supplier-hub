import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CalendarIcon, MapPinIcon, Users2Icon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockEvents } from '@/data/mockData';
import { Event } from '@/pages/Events';
import { Supplier } from '@/types/supplier';

interface AddToEventDialogProps {
  supplier: Supplier;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddToEventDialog({
  supplier,
  isOpen,
  onOpenChange,
}: AddToEventDialogProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch the user's events from an API
    setLoading(true);
    setTimeout(() => {
      // Only get events that are not completed or cancelled
      const activeEvents = mockEvents.filter(
        (event) => !['completed', 'cancelled'].includes(event.status.toLowerCase())
      );
      setEvents(activeEvents);
      setLoading(false);
    }, 500);
  }, []);

  const handleAddToEvent = (eventId: string) => {
    // Find the event in mockEvents
    const eventIndex = mockEvents.findIndex(e => e.id === eventId);
    
    if (eventIndex !== -1) {
      // Check if supplier is already added to this event
      const isSupplierAlreadyAdded = mockEvents[eventIndex].suppliers?.some(
        s => s.id === supplier.id
      );
      
      if (isSupplierAlreadyAdded) {
        toast.info(`${supplier.name} is already added to this event.`);
      } else {
        // Add the supplier to the event
        if (!mockEvents[eventIndex].suppliers) {
          mockEvents[eventIndex].suppliers = [];
        }
        mockEvents[eventIndex].suppliers?.push(supplier);
        
        // Log for debugging
        console.log(`Added supplier ${supplier.id} to event ${eventId}`);
        console.log("Updated event:", mockEvents[eventIndex]);
        
        toast.success(`${supplier.name} has been added to your event!`);
      }
    } else {
      toast.error("Event not found. Please try again.");
    }
    
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Add to Event</AlertDialogTitle>
          <AlertDialogDescription>
            Select which event you'd like to add <strong>{supplier.name}</strong> to:
          </AlertDialogDescription>
        </AlertDialogHeader>

        {loading ? (
          <div className="space-y-4 py-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-muted animate-pulse rounded-md" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="py-8 text-center">
            <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No active events</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
              You don't have any active events. Create a new event to add this supplier to.
            </p>
            <Button 
              className="mt-4" 
              onClick={() => {
                onOpenChange(false);
                // In a real app, we would navigate to the events page
                toast.info("Please create an event first!");
              }}
            >
              Create Event
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
                onClick={() => handleAddToEvent(event.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{event.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {event.status}
                  </span>
                </div>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-3 w-3" />
                    <span>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })} • {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-3 w-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users2Icon className="h-3 w-3" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
