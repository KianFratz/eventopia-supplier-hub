
import React from 'react';
import { SupplierCard } from './SupplierCard';
import { Supplier } from '@/types/supplier';

interface SupplierGridProps {
  suppliers: Supplier[];
  loading?: boolean;
}

export const SupplierGrid = ({ suppliers, loading = false }: SupplierGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-card animate-pulse rounded-xl overflow-hidden border border-border">
            <div className="aspect-[16/9] w-full bg-muted"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-muted rounded-md w-3/4"></div>
              <div className="h-4 bg-muted rounded-md w-1/2"></div>
              <div className="flex space-x-2">
                <div className="h-6 bg-muted rounded-md w-16"></div>
                <div className="h-6 bg-muted rounded-md w-16"></div>
              </div>
              <div className="h-8 bg-muted rounded-md w-full mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (suppliers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-muted rounded-full p-6 mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-muted-foreground h-8 w-8"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
        <h3 className="text-xl font-medium">No suppliers found</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          We couldn't find any suppliers matching your criteria. 
          Try adjusting your filters or search for something else.
        </p>
      </div>
    );
  }

  // Feature the first supplier
  const [featuredSupplier, ...otherSuppliers] = suppliers;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {suppliers.map((supplier, index) => (
        <SupplierCard 
          key={supplier.id} 
          supplier={supplier} 
          featured={index === 0} 
        />
      ))}
    </div>
  );
};
