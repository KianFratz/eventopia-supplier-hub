
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Supplier } from '@/types/supplier';

interface RecommendationCardProps {
  supplier: Supplier;
  reason: string;
}

export const RecommendationCard = ({ supplier, reason }: RecommendationCardProps) => {
  const navigate = useNavigate();
  
  const handleViewSupplier = () => {
    navigate(`/suppliers/${supplier.id}`);
  };
  
  return (
    <Card className="overflow-hidden transition-all hover-lift">
      <div className="relative">
        <img 
          src={supplier.image} 
          alt={supplier.name} 
          className="h-36 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground">
            Recommended
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/30 backdrop-blur-sm text-white px-2 py-0.5 rounded-md">
          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
          <span className="text-xs font-medium">{supplier.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-base">{supplier.name}</h3>
          <p className="text-xs text-muted-foreground">{supplier.category} • {supplier.location}</p>
          <p className="text-sm">{reason}</p>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-between mt-2"
            onClick={handleViewSupplier}
          >
            <span>View Supplier</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
