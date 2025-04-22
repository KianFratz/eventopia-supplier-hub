
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ClipboardCheck } from 'lucide-react';
import { VerificationForm } from './VerificationForm';

interface VerificationDialogProps {
  supplierId: string;
  supplierName: string;
  trigger?: React.ReactNode;
}

export function VerificationDialog({ 
  supplierId, 
  supplierName, 
  trigger 
}: VerificationDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" variant="outline" className="w-full">
            <ClipboardCheck className="mr-1 h-4 w-4" />
            Verify Supplier
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Supplier Verification</DialogTitle>
          <DialogDescription>
            Submit your business information for verification to get a verified badge on your profile.
          </DialogDescription>
        </DialogHeader>
        <VerificationForm 
          supplierId={supplierId} 
          supplierName={supplierName} 
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
