
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
}

export function CreateEventSheet({ isOpen, onOpenChange }: CreateEventSheetProps) {
  const handleSubmit = (data: any) => {
    console.log('New event:', data);
    toast.success('Event created successfully!');
    onOpenChange(false);
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
