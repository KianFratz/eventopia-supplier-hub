
import React, { useState } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import { Supplier } from '@/types/supplier';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { mockSuppliers } from '@/data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SupplierSelectorProps {
  selectedSuppliers: Supplier[];
  onAddSupplier: (supplier: Supplier) => void;
  onRemoveSupplier: (supplierId: string) => void;
}

export function SupplierSelector({ 
  selectedSuppliers, 
  onAddSupplier, 
  onRemoveSupplier 
}: SupplierSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Get all unique categories
  const categories = ['all', ...Array.from(new Set(mockSuppliers.map(s => s.category)))];
  
  // Filter suppliers based on search term and category
  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || supplier.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Event Suppliers</h3>
        {selectedSuppliers.length > 0 && (
          <Badge>{selectedSuppliers.length} suppliers</Badge>
        )}
      </div>
      
      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Selected suppliers */}
      {selectedSuppliers.length > 0 ? (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Selected Suppliers:</h4>
          {selectedSuppliers.map((supplier) => (
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
                    onClick={() => onRemoveSupplier(supplier.id)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
      
      {/* Available suppliers */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Available Suppliers:</h4>
        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-1">
          {filteredSuppliers.length > 0 ? (
            filteredSuppliers.map((supplier) => (
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
                      variant="outline" 
                      size="sm"
                      onClick={() => onAddSupplier(supplier)}
                      disabled={selectedSuppliers.some(s => s.id === supplier.id)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="py-8 text-center bg-muted/30 rounded-md">
              <p className="text-muted-foreground">
                No suppliers found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
