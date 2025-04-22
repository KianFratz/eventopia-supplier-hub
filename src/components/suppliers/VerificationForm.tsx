
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { ClipboardCheck, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const verificationFormSchema = z.object({
  businessName: z.string().min(2, { message: "Business name is required" }),
  businessAddress: z.string().min(5, { message: "Business address is required" }),
  taxId: z.string().min(5, { message: "Tax ID is required" }),
  licenseNumber: z.string().optional(),
  contactPerson: z.string().min(2, { message: "Contact person name is required" }),
  contactEmail: z.string().email({ message: "Valid email is required" }),
  contactPhone: z.string().min(10, { message: "Valid phone number is required" }),
  additionalInfo: z.string().optional(),
  agreeToTerms: z.boolean({
    required_error: "You must agree to the terms and conditions",
  }).refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type VerificationFormValues = z.infer<typeof verificationFormSchema>;

interface VerificationFormProps {
  supplierId: string;
  supplierName: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function VerificationForm({ supplierId, supplierName, onSuccess, onCancel }: VerificationFormProps) {
  const { toast } = useToast();
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      businessName: supplierName,
      businessAddress: '',
      taxId: '',
      licenseNumber: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      additionalInfo: '',
      agreeToTerms: false,
    },
  });

  function onSubmit(values: VerificationFormValues) {
    // In a real application, this would send data to a backend
    console.log('Verification request submitted:', {
      ...values,
      supplierId,
      supplierName,
      documents: [],
      status: 'pending',
      submittedAt: new Date().toISOString(),
    });

    toast({
      title: "Verification request submitted",
      description: "Your verification request has been sent to the administration for review.",
      duration: 5000,
    });

    if (onSuccess) {
      onSuccess();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary mb-2">
            <ClipboardCheck className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Supplier Verification Request</h3>
          </div>
          
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="businessAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="taxId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax ID / Business Registration Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Number (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any additional information that may help with verification" 
                    className="min-h-24"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="bg-muted/50 p-4 rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-medium text-sm">Document Upload</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Upload documents to verify your business credentials (business license, tax registration, etc.)
            </p>
            
            <div className="border border-dashed border-border rounded-md p-6 text-center bg-background">
              <div className="flex flex-col items-center justify-center space-y-2">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Drop files or click to upload</p>
                  <p className="text-xs text-muted-foreground">
                    Support for PDF, JPG, PNG (up to 5MB each)
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Select Files
                </Button>
              </div>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-primary/5">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal">
                    I confirm that all information provided is accurate and authentic. I understand that submitting false information may result in rejection of verification.
                  </FormLabel>
                  <FormDescription className="text-xs">
                    By submitting this form, you agree to our verification process and terms of service.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="mr-1 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit">
            <ClipboardCheck className="mr-1 h-4 w-4" />
            Submit for Verification
          </Button>
        </div>
      </form>
    </Form>
  );
}
