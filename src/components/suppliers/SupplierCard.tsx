
import React from 'react';
import { Star, MapPin, Clock, DollarSign, ClipboardCheck, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Supplier } from '@/types/supplier';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { VerificationDialog } from './VerificationDialog';

interface SupplierCardProps {
  supplier: Supplier;
  featured?: boolean;
}

export const SupplierCard = ({ supplier, featured = false }: SupplierCardProps) => {
  const navigate = useNavigate();
  const { 
    id, 
    name, 
    category, 
    image, 
    rating, 
    location, 
    price, 
    availability,
    tags,
    verified
  } = supplier;

  const handleViewProfile = () => {
    navigate(`/suppliers/${id}`);
  };

  return (
    <div 
      className={cn(
        "group relative bg-card rounded-xl overflow-hidden border border-border transition-all hover-lift",
        featured && "ring-2 ring-primary/20"
      )}
    >
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground">Featured</Badge>
        </div>
      )}
      
      <div className="aspect-[16/9] w-full relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        <div className="absolute bottom-3 left-3 flex items-center space-x-1">
          <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium text-white">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        {verified && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="outline" className="bg-emerald-500/90 text-white border-emerald-600 flex items-center">
              <Check className="h-3 w-3 mr-1" />
              <span className="text-xs">Verified</span>
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-medium text-base text-card-foreground line-clamp-1">{name}</h3>
          <div className="flex items-center text-xs text-muted-foreground space-x-2">
            <span className="inline-flex items-center">
              <MapPin className="mr-1 h-3 w-3" />
              {location}
            </span>
            <span>•</span>
            <span>{category}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium">{price}</span>
          </div>
          <div className="flex items-center text-xs">
            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">{availability}</span>
          </div>
        </div>
        
        <div className="pt-1 space-y-2">
          <Button variant="default" size="sm" className="w-full" onClick={handleViewProfile}>
            View Profile
          </Button>
          
          {!verified && (
            <VerificationDialog supplierId={id} supplierName={name} />
          )}
        </div>
      </div>
    </div>
  );
};
