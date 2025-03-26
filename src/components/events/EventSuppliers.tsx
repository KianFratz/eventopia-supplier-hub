
import React from 'react';
import { Event } from '@/pages/Events';
import { SupplierSelector } from './SupplierSelector';
import { mockEvents } from '@/data/mockData';
import { Supplier } from '@/types/supplier';

interface EventSuppliersProps {
  event: Event;
}

export function EventSuppliers({ event }: EventSuppliersProps) {
  const suppliers = event.suppliers || [];
  
  const handleAddSupplier = (supplier: Supplier) => {
    // Find the event in mockEvents
    const eventIndex = mockEvents.findIndex(e => e.id === event.id);
    
    if (eventIndex !== -1) {
      // Initialize suppliers array if needed
      if (!mockEvents[eventIndex].suppliers) {
        mockEvents[eventIndex].suppliers = [];
      }
      
      // Add the supplier if not already added
      if (!mockEvents[eventIndex].suppliers?.some(s => s.id === supplier.id)) {
        mockEvents[eventIndex].suppliers?.push(supplier);
      }
    }
  };
  
  const handleRemoveSupplier = (supplierId: string) => {
    // Find the event in mockEvents
    const eventIndex = mockEvents.findIndex(e => e.id === event.id);
    
    if (eventIndex !== -1 && mockEvents[eventIndex].suppliers) {
      // Remove the supplier
      mockEvents[eventIndex].suppliers = mockEvents[eventIndex].suppliers?.filter(
        s => s.id !== supplierId
      );
    }
  };
  
  return (
    <SupplierSelector
      selectedSuppliers={suppliers}
      onAddSupplier={handleAddSupplier}
      onRemoveSupplier={handleRemoveSupplier}
    />
  );
}
