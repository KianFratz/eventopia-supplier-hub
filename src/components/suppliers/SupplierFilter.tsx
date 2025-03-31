import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type FilterOptions = {
  search: string;
  category: string;
  priceRange: [number, number];
  rating: number;
  available: boolean;
  location: string;
};

interface SupplierFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  categories: string[];
  locations: string[];
  initialSearch?: string;
}

export const SupplierFilter = ({ onFilterChange, categories, locations, initialSearch = '' }: SupplierFilterProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: initialSearch,
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    available: false,
    location: '',
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    if (initialSearch) {
      setFilters(prev => ({ ...prev, search: initialSearch }));
      
      const updatedActiveFilters = [...activeFilters];
      const filterIndex = updatedActiveFilters.findIndex(filter => filter.startsWith('search:'));
      
      if (filterIndex > -1) {
        updatedActiveFilters[filterIndex] = `search:${initialSearch}`;
      } else {
        updatedActiveFilters.push(`search:${initialSearch}`);
      }
      
      setActiveFilters(updatedActiveFilters);
    }
  }, [initialSearch]);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const updatedActiveFilters = [...activeFilters];
    const filterIndex = updatedActiveFilters.findIndex(filter => filter.startsWith(`${key}:`));
    
    if (filterIndex > -1) {
      if (!value || (Array.isArray(value) && value[0] === 0 && value[1] === 1000)) {
        updatedActiveFilters.splice(filterIndex, 1);
      } else {
        let displayValue = value;
        if (key === 'priceRange') {
          displayValue = `$${value[0]}-$${value[1]}`;
        } else if (key === 'rating') {
          displayValue = `${value}+ Stars`;
        } else if (key === 'available' && value) {
          displayValue = 'Available Now';
        }
        updatedActiveFilters[filterIndex] = `${key}:${displayValue}`;
      }
    } else if (value && !(key === 'priceRange' && value[0] === 0 && value[1] === 1000)) {
      let displayValue = value;
      if (key === 'priceRange') {
        displayValue = `$${value[0]}-$${value[1]}`;
      } else if (key === 'rating') {
        displayValue = `${value}+ Stars`;
      } else if (key === 'available' && value) {
        displayValue = 'Available Now';
      }
      updatedActiveFilters.push(`${key}:${displayValue}`);
    }
    
    setActiveFilters(updatedActiveFilters);
    onFilterChange(newFilters);
  };

  const removeFilter = (filter: string) => {
    const [key, _] = filter.split(':');
    const activeKey = key as keyof FilterOptions;
    
    let resetValue: any;
    switch (activeKey) {
      case 'search':
      case 'category':
      case 'location':
        resetValue = '';
        break;
      case 'priceRange':
        resetValue = [0, 1000];
        break;
      case 'rating':
        resetValue = 0;
        break;
      case 'available':
        resetValue = false;
        break;
      default:
        resetValue = '';
    }
    
    handleFilterChange(activeKey, resetValue);
  };

  const clearAllFilters = () => {
    const resetFilters: FilterOptions = {
      search: '',
      category: '',
      priceRange: [0, 1000],
      rating: 0,
      available: false,
      location: '',
    };
    setFilters(resetFilters);
    setActiveFilters([]);
    onFilterChange(resetFilters);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search suppliers..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <Select 
            value={filters.category} 
            onValueChange={(value) => handleFilterChange('category', value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex space-x-1">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {activeFilters.length > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-medium text-sm">Filter Suppliers</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="price-range">Price Range</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">${filters.priceRange[0]}</span>
                    <Slider
                      id="price-range"
                      min={0}
                      max={1000}
                      step={50}
                      value={[filters.priceRange[0], filters.priceRange[1]]}
                      onValueChange={(value) => handleFilterChange('priceRange', value)}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground">${filters.priceRange[1]}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rating">Minimum Rating</Label>
                  <Select 
                    value={filters.rating.toString()} 
                    onValueChange={(value) => handleFilterChange('rating', parseInt(value))}
                  >
                    <SelectTrigger id="rating">
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select 
                    value={filters.location} 
                    onValueChange={(value) => handleFilterChange('location', value)}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Any Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Location</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={filters.available}
                    onCheckedChange={(checked) => handleFilterChange('available', checked)}
                  />
                  <Label htmlFor="available">Available Now</Label>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={clearAllFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {activeFilters.map((filter) => (
            <Badge 
              key={filter} 
              variant="secondary"
              className="flex items-center space-x-1 pl-2"
            >
              <span>{filter.split(':')[1]}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={() => removeFilter(filter)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs"
            onClick={clearAllFilters}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};
