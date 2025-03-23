
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
import { EventRecommendations } from './EventRecommendations';
import { Separator } from '@/components/ui/separator';

interface ManageEventSheetProps {
  event: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEventUpdated?: (event: any) => void;
}

export function ManageEventSheet({ event, isOpen, onOpenChange, onEventUpdated }: ManageEventSheetProps) {
  const handleSubmit = (data: any) => {
    console.log('Updated event:', data);
    
    const updatedEvent = {
      ...event,
      ...data
    };
    
    toast.success('Event updated successfully!');
    
    // Notify parent component about the updated event
    if (onEventUpdated) {
      onEventUpdated(updatedEvent);
    }
  };

  // Format the date for the input field (YYYY-MM-DD)
  const formatDateForInput = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      return '';
    }
  };

  // Extract the budget value without the dollar sign
  const formatBudget = (budget: string) => {
    return budget.replace('$', '').replace(',', '');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Manage Event</SheetTitle>
          <SheetDescription>
            Make changes to the event details. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        
        <EventForm 
          defaultValues={{
            name: event.name,
            date: formatDateForInput(event.date),
            time: event.time,
            location: event.location,
            budget: formatBudget(event.budget),
            attendees: String(event.attendees),
            status: event.status,
            description: event.description || '',
          }}
          onSubmit={handleSubmit}
          submitLabel="Update Event"
        />
        
        <Separator className="my-6" />
        
        <EventRecommendations event={event} />
      </SheetContent>
    </Sheet>
  );
}
