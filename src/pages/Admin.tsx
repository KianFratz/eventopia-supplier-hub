
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Calendar, DollarSign, Star } from 'lucide-react';
import { mockSuppliers } from '@/data/mockData';
import { mockOffers } from './Offers';  // Use relative import
import { StatCard } from '@/components/dashboard/StatCard';
import { Badge } from '@/components/ui/badge';

const Admin = () => {
  const totalSuppliers = mockSuppliers.length;
  const pendingVerifications = mockSuppliers.filter(s => !s.verified).length;
  const totalOffers = mockOffers.length;
  const pendingOffers = mockOffers.filter(o => o.status === 'pending').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your platform's suppliers, events, and offers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Suppliers" 
          value={totalSuppliers} 
          icon={<Users className="h-5 w-5" />}
          description={`${pendingVerifications} pending verifications`}
        />
        <StatCard 
          title="Active Events" 
          value={15} 
          icon={<Calendar className="h-5 w-5" />}
          description="3 events this week"
        />
        <StatCard 
          title="Total Revenue" 
          value="$12,450" 
          icon={<DollarSign className="h-5 w-5" />}
          description="+8% from last month"
        />
        <StatCard 
          title="Platform Rating" 
          value="4.8" 
          icon={<Star className="h-5 w-5" />}
          description="Based on 156 reviews"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Supplier Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSuppliers.slice(0, 5).map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.category}</TableCell>
                    <TableCell>
                      <Badge variant={supplier.verified ? "default" : "secondary"}>
                        {supplier.verified ? "Verified" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Review</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOffers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell>{offer.eventName}</TableCell>
                    <TableCell>{offer.supplierName}</TableCell>
                    <TableCell>${offer.amount}</TableCell>
                    <TableCell>
                      <Badge variant={
                        offer.status === 'pending' ? 'secondary' :
                        offer.status === 'approved' ? 'default' :
                        offer.status === 'paid' ? 'default' : 'destructive'
                      }>
                        {offer.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
