
import React, { useState } from 'react';
import { toast } from 'sonner';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { EventForm } from './EventForm';
import { SupplierSelector } from './SupplierSelector';
import { EventRecommendations } from './EventRecommendations';
import { Supplier } from '@/types/supplier';

interface CreateEventSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreated?: (event: any) => void;
}

export function CreateEventSheet({ isOpen, onOpenChange, onEventCreated }: CreateEventSheetProps) {
  const [selectedSuppliers, setSelectedSuppliers] = useState<Supplier[]>([]);
  const [eventData, setEventData] = useState<any>(null);

  const handleSubmit = (data: any) => {
    console.log('New event:', data);
    
    // Generate a fake ID
    const newEvent = {
      ...data,
      id: `event-${Math.random().toString(36).substring(2, 9)}`,
      status: data.status || 'Upcoming',
      suppliers: selectedSuppliers, // Add selected suppliers to the new event
    };
    
    toast.success('Event created successfully!');
    onOpenChange(false);
    
    // Notify parent component about the new event
    if (onEventCreated) {
      onEventCreated(newEvent);
    }

    // Reset selected suppliers after creating the event
    setSelectedSuppliers([]);
    setEventData(null);
  };

  // Function to handle form data changes to show recommendations
  const handleFormChange = (data: any) => {
    // Only update if we have enough data to make recommendations
    if (data.name || data.description || data.type) {
      setEventData(data);
    }
  };

  // Function to add a supplier to the selection
  const handleAddSupplier = (supplier: Supplier) => {
    if (!selectedSuppliers.some(s => s.id === supplier.id)) {
      setSelectedSuppliers([...selectedSuppliers, supplier]);
      toast.success(`${supplier.name} added to event`);
    }
  };

  // Function to remove a supplier from the selection
  const handleRemoveSupplier = (supplierId: string) => {
    setSelectedSuppliers(selectedSuppliers.filter(s => s.id !== supplierId));
    toast.success("Supplier removed from event");
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
          onChange={handleFormChange}
        />
        
        <Separator className="my-6" />
        
        <SupplierSelector 
          selectedSuppliers={selectedSuppliers}
          onAddSupplier={handleAddSupplier}
          onRemoveSupplier={handleRemoveSupplier}
        />

        {eventData && (
          <>
            <Separator className="my-6" />
            <EventRecommendations event={eventData} />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
