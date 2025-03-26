
import React, { useState, useEffect } from 'react';
import { Supplier } from '@/types/supplier';
import { RecommendationCard } from '@/components/dashboard/RecommendationCard';
import { recommendSuppliers } from '@/utils/recommendationEngine';
import { mockSuppliers } from '@/data/mockData';

interface EventRecommendationsProps {
  event: any;
}

export const EventRecommendations = ({ event }: EventRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<{ supplier: Supplier, reason: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only process if we have enough data
    if (!event || (!event.name && !event.description && !event.type)) {
      setRecommendations([]);
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    const timer = setTimeout(() => {
      // Ensure event has minimal required properties for recommendation engine
      const eventData = {
        id: event.id || 'temp-id',
        name: event.name || '',
        date: event.date || new Date().toISOString().split('T')[0],
        time: event.time || '12:00',
        location: event.location || '',
        budget: event.budget || '1000',
        attendees: event.attendees || 50,
        status: event.status || 'Draft',
        description: event.description || '',
        type: event.type || ''
      };
      
      // Get recommendations from our engine
      const results = recommendSuppliers(eventData, mockSuppliers, 3);
      
      // Format for display
      setRecommendations(
        results.map(result => ({
          supplier: result.supplier,
          reason: result.reason
        }))
      );
      
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [event]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Finding perfect suppliers...</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="h-64 rounded-md bg-gray-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="py-4">
        <p className="text-muted-foreground">Add more event details to see supplier recommendations.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Recommended Suppliers</h3>
        <p className="text-sm text-muted-foreground">AI-matched for this event</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((item) => (
          <RecommendationCard 
            key={item.supplier.id} 
            supplier={item.supplier} 
            reason={item.reason} 
          />
        ))}
      </div>
    </div>
  );
};
