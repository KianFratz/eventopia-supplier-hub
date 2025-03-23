
import React from 'react';
import { toast } from 'sonner';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from '@/components/ui/sheet';
import { EventForm } from './EventForm';

interface CreateEventSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreated?: (event: any) => void;
}

export function CreateEventSheet({ isOpen, onOpenChange, onEventCreated }: CreateEventSheetProps) {
  const handleSubmit = (data: any) => {
    console.log('New event:', data);
    
    // Generate a fake ID
    const newEvent = {
      ...data,
      id: `event-${Math.random().toString(36).substring(2, 9)}`,
      status: data.status || 'Upcoming'
    };
    
    toast.success('Event created successfully!');
    onOpenChange(false);
    
    // Notify parent component about the new event
    if (onEventCreated) {
      onEventCreated(newEvent);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Create New Event</SheetTitle>
          <SheetDescription>
            Add the details for your new event. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        
        <EventForm 
          onSubmit={handleSubmit}
          submitLabel="Create Event"
        />
      </SheetContent>
    </Sheet>
  );
}
