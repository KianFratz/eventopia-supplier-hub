

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, XIcon, CreditCard, Banknote } from "lucide-react";
import { toast } from 'sonner';
import { Offer, PaymentMethod } from "@/types/offer";
import { mockEvents } from '@/data/mockData'; // For updating event suppliers

export const mockOffers: Offer[] = [
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
    amount: 6800,
    status: "pending",
    createdAt: "2024-04-24",
    description: "Complete sound system setup with professional DJ services"
  }
];

// Plan dialog lets the planner pick a plan type based on the offer amount
const PlanDialog = ({
  offer,
  open,
  onClose,
  onChoosePlan
}: {
  offer: Offer,
  open: boolean,
  onClose: () => void,
  onChoosePlan: (planType: "basic" | "premium") => void
}) => {
  const [selectedPlan, setSelectedPlan] = React.useState<"basic" | "premium">(offer.amount >= 5000 ? "premium" : "basic");
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose Plan Type</DialogTitle>
          <DialogDescription>
            Select the plan for this offer
          </DialogDescription>
        </DialogHeader>
        <RadioGroup
          value={selectedPlan}
          onValueChange={(v) => setSelectedPlan(v as "basic" | "premium")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="basic" id="plan-basic" disabled={offer.amount >= 5000} />
            <Label htmlFor="plan-basic">
              Basic (Less than $5,000) &nbsp;
              <span className="text-xs text-muted-foreground">Pay after service</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="premium" id="plan-premium" disabled={offer.amount < 5000} />
            <Label htmlFor="plan-premium">
              Premium (≥ $5,000) &nbsp;
              <span className="text-xs text-muted-foreground">Deposit 50% to confirm</span>
            </Label>
          </div>
        </RadioGroup>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              onChoosePlan(selectedPlan);
              onClose();
            }}
            disabled={
              (selectedPlan === "basic" && offer.amount >= 5000) ||
              (selectedPlan === "premium" && offer.amount < 5000)
            }
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Payment dialog for premium (50% deposit)
const PaymentDialog = ({
  offer,
  open,
  onClose,
  onPaid
}: {
  offer: Offer,
  open: boolean,
  onClose: () => void,
  onPaid: () => void
}) => {
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('credit_card');
  const deposit = Math.ceil(offer.amount / 2);

  const handlePayment = () => {
    toast.success(`Paid $${deposit} deposit. Proceed to contract.`);
    onPaid();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit Payment</DialogTitle>
          <DialogDescription>
            Pay 50% deposit (${deposit}) to confirm booking with {offer.supplierName}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <RadioGroup value={paymentMethod} onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="credit_card" id="credit_card" />
              <Label htmlFor="credit_card"><CreditCard className="inline mr-1 w-4 h-4" />Credit Card</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank_transfer" id="bank_transfer" />
              <Label htmlFor="bank_transfer"><Banknote className="inline mr-1 w-4 h-4" />Bank Transfer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">PayPal</Label>
            </div>
          </RadioGroup>
          <Alert>
            <AlertDescription>
              Deposit required: <b>${deposit}</b>
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handlePayment}>Pay Deposit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// After contract, supplier is added to event.supplier
function addSupplierToEvent(offer: Offer) {
  const event = mockEvents.find(e => e.id === offer.eventId);
  if (!event) return;
  if (!event.suppliers) event.suppliers = [];
  if (!event.suppliers.some(s => s.id === offer.supplierId)) {
    event.suppliers.push({
      id: offer.supplierId,
      name: offer.supplierName,
      category: "", // You may want to add more info if you have it
      description: "",
      image: "",
      rating: 0,
      reviews: 0,
      location: "",
      price: "", 
      availability: "",
      tags: [],
      contact: {
        email: "",
        phone: "",
      },
      services: offer.services,
      verified: false
    });
  }
}

const OfferCard = ({ offer }: { offer: Offer }) => {
  const [showPlanDialog, setShowPlanDialog] = React.useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = React.useState(false);

  const handleApprove = () => {
    setShowPlanDialog(true);
  };

  const handleChoosePlan = (planType: "basic" | "premium") => {
    if (planType === "premium") {
      setShowPaymentDialog(true);
    } else {
      // For basic: show contract confirmation only
      toast.success('Supplier approved! Pay after service is delivered.');
      addSupplierToEvent(offer);
      // You might want to update the offer status here in a real app.
      toast.info("Supplier added to event.");
    }
  };

  const handleContract = () => {
    toast.success("Contract generated and supplier added to event!");
    addSupplierToEvent(offer);
    // You might want to update the offer status here in a real app.
  };

  const handleReject = () => {
    toast.success('Offer rejected successfully');
  };

  // Badge color (no 'success' status)
  let badgeVariant: "secondary" | "default" | "destructive" = 
    offer.status === 'pending' ? 'secondary' :
    offer.status === 'approved' ? 'default' :
    offer.status === 'paid' ? 'default' : 'destructive';

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{offer.supplierName}</CardTitle>
            <CardDescription>{offer.eventName}</CardDescription>
          </div>
          <Badge variant={badgeVariant}>
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
          <Button onClick={handleApprove} className="flex-1">
            <Check className="mr-2 h-4 w-4" />
            Approve
          </Button>
          <PlanDialog
            offer={offer}
            open={showPlanDialog}
            onClose={() => setShowPlanDialog(false)}
            onChoosePlan={handleChoosePlan}
          />
          <PaymentDialog
            offer={offer}
            open={showPaymentDialog}
            onClose={() => setShowPaymentDialog(false)}
            onPaid={handleContract}
          />
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

