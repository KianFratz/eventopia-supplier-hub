
import React, { useState, useEffect } from 'react';
import { SupplierGrid } from '@/components/suppliers/SupplierGrid';
import { SupplierFilter, FilterOptions } from '@/components/suppliers/SupplierFilter';
import { Supplier } from '@/types/supplier';
import { mockSuppliers } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Suppliers = () => {
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get search query from URL if it exists
  const searchQuery = searchParams.get('q') || '';
  
  const [filters, setFilters] = useState<FilterOptions>({
    search: searchQuery,
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    available: false,
    location: '',
  });

  // Extract categories and locations from suppliers for filter dropdowns
  const categories = Array.from(new Set(mockSuppliers.map(s => s.category)));
  const locations = Array.from(new Set(mockSuppliers.map(s => s.location)));

  // Simulate loading and update search when URL changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuppliers(mockSuppliers);
      setFilteredSuppliers(mockSuppliers);
      setLoading(false);
      
      // Update filters with search query from URL if it exists
      if (searchQuery) {
        setFilters(prev => ({ ...prev, search: searchQuery }));
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Apply filters when they change
  useEffect(() => {
    if (suppliers.length === 0) return;
    
    let filtered = [...suppliers];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        s => s.name.toLowerCase().includes(searchLower) || 
          s.description.toLowerCase().includes(searchLower) ||
          s.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(s => s.category === filters.category);
    }
    
    // Apply price range filter (assuming price is stored as a string with a numeric format)
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      filtered = filtered.filter(s => {
        // Extract the numeric part from the price string (e.g., "$100/hr" → 100)
        const priceValue = parseFloat(s.price.replace(/[^0-9.]/g, ''));
        return priceValue >= filters.priceRange[0] && priceValue <= filters.priceRange[1];
      });
    }
    
    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(s => s.rating >= filters.rating);
    }
    
    // Apply availability filter
    if (filters.available) {
      filtered = filtered.filter(s => s.availability.includes('Available'));
    }
    
    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(s => s.location === filters.location);
    }
    
    setFilteredSuppliers(filtered);
  }, [filters, suppliers]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    
    // Update URL with search query if it exists
    if (newFilters.search) {
      setSearchParams({ q: newFilters.search });
    } else {
      searchParams.delete('q');
      setSearchParams(searchParams);
    }
  };

  // Scroll animation on mount
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "space-y-8 transition-opacity duration-500",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Suppliers</h1>
        <p className="text-muted-foreground">
          Find and manage suppliers for your events.
        </p>
      </div>
      
      <SupplierFilter 
        onFilterChange={handleFilterChange}
        categories={categories}
        locations={locations}
        initialSearch={searchQuery}
      />
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredSuppliers.length}</span> suppliers
          </p>
          
          <div className="flex items-center space-x-2">
            {/* Add sorting options here if needed */}
          </div>
        </div>
        
        <SupplierGrid suppliers={filteredSuppliers} loading={loading} />
      </div>
    </div>
  );
};

export default Suppliers;
