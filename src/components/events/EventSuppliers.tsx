
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Event } from '@/pages/Events';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { mockEvents } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface EventSuppliersProps {
  event: Event;
}

export function EventSuppliers({ event }: EventSuppliersProps) {
  const suppliers = event.suppliers || [];
  
  const handleRemoveSupplier = (supplierId: string) => {
    // Find the event in mockEvents
    const eventIndex = mockEvents.findIndex(e => e.id === event.id);
    
    if (eventIndex !== -1 && mockEvents[eventIndex].suppliers) {
      // Remove the supplier
      mockEvents[eventIndex].suppliers = mockEvents[eventIndex].suppliers?.filter(
        s => s.id !== supplierId
      );
      
      toast.success("Supplier removed from event");
    }
  };
  
  if (suppliers.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Event Suppliers</h3>
        </div>
        
        <div className="py-8 text-center bg-muted/30 rounded-md">
          <p className="text-muted-foreground">
            No suppliers added to this event yet.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Browse suppliers and add them to your event.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Event Suppliers</h3>
        <Badge>{suppliers.length} suppliers</Badge>
      </div>
      
      <div className="space-y-3">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={supplier.image} alt={supplier.name} />
                    <AvatarFallback>{supplier.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{supplier.name}</p>
                    <p className="text-xs text-muted-foreground">{supplier.category}</p>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveSupplier(supplier.id)}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
