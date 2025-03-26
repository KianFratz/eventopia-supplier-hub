
import React, { useState, useEffect } from 'react';
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
import { SupplierSelector } from './SupplierSelector';
import { Event } from '@/pages/Events';
import { Supplier } from '@/types/supplier';

interface ManageEventSheetProps {
  event: Event;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEventUpdated?: (event: Event) => void;
}

export function ManageEventSheet({ event, isOpen, onOpenChange, onEventUpdated }: ManageEventSheetProps) {
  const [selectedSuppliers, setSelectedSuppliers] = useState<Supplier[]>(event.suppliers || []);

  // Update selectedSuppliers when event changes
  useEffect(() => {
    setSelectedSuppliers(event.suppliers || []);
  }, [event]);

  const handleSubmit = (data: any) => {
    console.log('Updated event:', data);
    
    const updatedEvent = {
      ...event,
      ...data,
      suppliers: selectedSuppliers, // Use the current state of selectedSuppliers
    };
    
    toast.success('Event updated successfully!');
    
    // Notify parent component about the updated event
    if (onEventUpdated) {
      onEventUpdated(updatedEvent);
    }
  };

  // Function to add a supplier to the selection
  const handleAddSupplier = (supplier: Supplier) => {
    if (!selectedSuppliers.some(s => s.id === supplier.id)) {
      const newSelectedSuppliers = [...selectedSuppliers, supplier];
      setSelectedSuppliers(newSelectedSuppliers);
      toast.success(`${supplier.name} added to event`);
    }
  };

  // Function to remove a supplier from the selection
  const handleRemoveSupplier = (supplierId: string) => {
    setSelectedSuppliers(selectedSuppliers.filter(s => s.id !== supplierId));
    toast.success("Supplier removed from event");
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
        
        <SupplierSelector
          selectedSuppliers={selectedSuppliers}
          onAddSupplier={handleAddSupplier}
          onRemoveSupplier={handleRemoveSupplier}
        />
        
        <Separator className="my-6" />
        
        <EventRecommendations event={event} />
      </SheetContent>
    </Sheet>
  );
}
