
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  DollarSign,
  CheckCircle2,
  Clock,
  Share2,
  Heart
} from 'lucide-react';
import { mockSuppliers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { Supplier } from '@/types/supplier';

const SupplierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading from an API
    setLoading(true);
    setTimeout(() => {
      const foundSupplier = mockSuppliers.find(s => s.id === id);
      setSupplier(foundSupplier || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
          <div className="h-6 bg-muted animate-pulse rounded-md w-1/3 ml-4"></div>
        </div>
        <div className="aspect-video w-full bg-muted rounded-lg animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-8 bg-muted animate-pulse rounded-md w-2/3"></div>
          <div className="h-4 bg-muted animate-pulse rounded-md w-1/2"></div>
          <div className="h-4 bg-muted animate-pulse rounded-md w-full"></div>
          <div className="h-4 bg-muted animate-pulse rounded-md w-full"></div>
        </div>
      </div>
    );
  }

  if (!supplier) {
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
        <h3 className="text-xl font-medium">Supplier Not Found</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          We couldn't find the supplier you're looking for.
        </p>
        <Button onClick={() => navigate('/suppliers')} className="mt-4">
          Back to Suppliers
        </Button>
      </div>
    );
  }

  const handleContactClick = () => {
    toast({
      title: "Contact Information",
      description: `You can reach ${supplier.name} at ${supplier.contact.email} or ${supplier.contact.phone}`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => navigate('/suppliers')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Supplier Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="aspect-[21/9] w-full relative overflow-hidden rounded-t-lg">
              <img 
                src={supplier.image} 
                alt={supplier.name} 
                className="object-cover w-full h-full"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold">{supplier.name}</h2>
                    <Badge>{supplier.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{supplier.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span>{supplier.rating.toFixed(1)} ({supplier.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleContactClick}>Contact Supplier</Button>
                  <Button variant="outline">Add to Event</Button>
                </div>
              </div>

              <Separator className="my-6" />

              <Tabs defaultValue="about">
                <TabsList className="mb-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">{supplier.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {supplier.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="services" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Offered Services</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead>Pricing</TableHead>
                          <TableHead>Availability</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(supplier.services || supplier.tags).map((service, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{service}</TableCell>
                            <TableCell>{supplier.price}</TableCell>
                            <TableCell>{supplier.availability}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Reviews</h3>
                    <Badge className="text-xl px-3 py-1">
                      <Star className="h-4 w-4 mr-1 text-amber-500 fill-amber-500" />
                      {supplier.rating.toFixed(1)}
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="font-medium text-primary">
                                  {['JD', 'SM', 'AK'][i]}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">
                                  {['John Doe', 'Sarah Mitchell', 'Alex Kim'][i]}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {['2 months ago', '1 week ago', '3 days ago'][i]}
                                </p>
                              </div>
                            </div>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <Star 
                                  key={j} 
                                  className={`h-4 w-4 ${j < 5-i ? 'text-amber-500 fill-amber-500' : 'text-muted'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-3 text-sm">
                            {[
                              "Great service and very professional. Would highly recommend for any corporate event.",
                              "The quality was excellent but delivery was a bit late. Overall still satisfied with the service.",
                              "Exceeded all expectations. Communication was clear and they were very accommodating to our last-minute changes."
                            ][i]}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{supplier.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{supplier.contact.phone}</p>
                  </div>
                </div>
                {supplier.contact.website && (
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Website</p>
                      <p className="text-sm text-muted-foreground">{supplier.contact.website}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Booking Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Pricing</p>
                    <p className="text-sm text-muted-foreground">{supplier.price}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Availability</p>
                    <p className="text-sm text-muted-foreground">{supplier.availability}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Typical Response Time</p>
                    <p className="text-sm text-muted-foreground">Within 24 hours</p>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6">Book Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetail;
