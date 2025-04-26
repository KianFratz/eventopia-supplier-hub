
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, XIcon } from "lucide-react";
import { toast } from 'sonner';

const mockOffers = [
  {
    id: "1",
    supplierId: "s1",
    supplierName: "Elite Catering",
    eventId: "e1",
    eventName: "Corporate Summit 2024",
    services: ["Catering", "Setup", "Cleanup"],
    amount: 2500,
    status: "pending",
    createdAt: "2024-04-25",
    description: "Full catering service for 100 people including setup and cleanup"
  },
  {
    id: "2",
    supplierId: "s2",
    supplierName: "Sound Masters",
    eventId: "e2",
    eventName: "Tech Conference",
    services: ["Sound System", "DJ", "Equipment Setup"],
    amount: 1800,
    status: "approved",
    createdAt: "2024-04-24",
    description: "Complete sound system setup with professional DJ services"
  }
] as const;

const PaymentDialog = ({ offer, onClose }: { offer: typeof mockOffers[0], onClose: () => void }) => {
  const [paymentMethod, setPaymentMethod] = React.useState<'credit_card' | 'bank_transfer' | 'paypal'>('credit_card');

  const handlePayment = () => {
    toast.success('Payment processed successfully!');
    onClose();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogDescription>
          Choose how you would like to pay {offer.supplierName}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="credit_card" id="credit_card" />
            <Label htmlFor="credit_card">Credit Card</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bank_transfer" id="bank_transfer" />
            <Label htmlFor="bank_transfer">Bank Transfer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal">PayPal</Label>
          </div>
        </RadioGroup>
        <Alert>
          <AlertDescription>
            Total amount to pay: ${offer.amount}
          </AlertDescription>
        </Alert>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handlePayment}>Process Payment</Button>
      </DialogFooter>
    </DialogContent>
  );
};

const OfferCard = ({ offer }: { offer: typeof mockOffers[0] }) => {
  const [showPayment, setShowPayment] = React.useState(false);

  const handleApprove = () => {
    setShowPayment(true);
  };

  const handleReject = () => {
    toast.success('Offer rejected successfully');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{offer.supplierName}</CardTitle>
            <CardDescription>{offer.eventName}</CardDescription>
          </div>
          <Badge variant={
            offer.status === 'pending' ? 'secondary' :
            offer.status === 'approved' ? 'success' :
            offer.status === 'paid' ? 'default' : 'destructive'
          }>
            {offer.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Services Offered:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {offer.services.map((service) => (
                <Badge key={service} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium">Description:</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {offer.description}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Amount:</h4>
            <p className="text-lg font-bold">${offer.amount}</p>
          </div>
        </div>
      </CardContent>
      {offer.status === 'pending' && (
        <CardFooter className="gap-2">
          <Dialog open={showPayment} onOpenChange={setShowPayment}>
            <Button onClick={handleApprove} className="flex-1">
              <Check className="mr-2 h-4 w-4" />
              Approve & Pay
            </Button>
            <PaymentDialog offer={offer} onClose={() => setShowPayment(false)} />
          </Dialog>
          <Button variant="destructive" onClick={handleReject} className="flex-1">
            <XIcon className="mr-2 h-4 w-4" />
            Reject
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

const Offers = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Supplier Offers</h1>
        <p className="text-muted-foreground">
          Review and manage offers from your event suppliers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default Offers;
