
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Event name is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  time: z.string().min(1, { message: 'Time is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  budget: z.string().min(1, { message: 'Budget is required' }),
  attendees: z.string().min(1, { message: 'Number of attendees is required' }),
  status: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  defaultValues?: Partial<FormValues>;
  onSubmit: (values: FormValues) => void;
  submitLabel?: string;
  onChange?: (values: FormValues) => void;
}

export function EventForm({ 
  defaultValues, 
  onSubmit, 
  submitLabel = 'Save',
  onChange
}: EventFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      date: '',
      time: '',
      location: '',
      budget: '',
      attendees: '',
      status: 'Upcoming',
      description: '',
      type: 'Corporate',
      ...defaultValues,
    },
  });

  // Watch for form changes to provide recommendations
  const watchedValues = form.watch();
  
  useEffect(() => {
    if (onChange) {
      onChange(watchedValues);
    }
  }, [watchedValues, onChange]);

  const onFormSubmit = (data: FormValues) => {
    // Format the data before submitting
    const formattedData = {
      ...data,
      budget: data.budget.startsWith('$') ? data.budget : `$${data.budget}`,
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Event Name</Label>
          <Input id="name" type="text" placeholder="Event Name" {...form.register('name')} />
          {form.formState.errors.name && (
            <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" type="text" placeholder="Location" {...form.register('location')} />
          {form.formState.errors.location && (
            <p className="text-sm text-destructive mt-1">{form.formState.errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !form.getValues('date') && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {form.getValues('date') ? (
                  format(new Date(form.getValues('date')), 'MMMM dd, yyyy')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto" align="center" side="bottom">
              <Calendar
                mode="single"
                selected={form.getValues('date') ? new Date(form.getValues('date')) : undefined}
                onSelect={(date) => {
                  if (date) {
                    form.setValue('date', format(date, 'yyyy-MM-dd'));
                  }
                }}
                disabled={(date) =>
                  date < new Date()
                }
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          {form.formState.errors.date && (
            <p className="text-sm text-destructive mt-1">{form.formState.errors.date.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input id="time" type="time" placeholder="Time" {...form.register('time')} />
          {form.formState.errors.time && (
            <p className="text-sm text-destructive mt-1">{form.formState.errors.time.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="attendees">Attendees</Label>
          <Input id="attendees" type="number" placeholder="Number of Attendees" {...form.register('attendees')} />
          {form.formState.errors.attendees && (
            <p className="text-sm text-destructive mt-1">{form.formState.errors.attendees.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="budget">Budget</Label>
          <Input id="budget" type="text" placeholder="Budget" {...form.register('budget')} />
          {form.formState.errors.budget && (
            <p className="text-sm text-destructive mt-1">{form.formState.errors.budget.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select defaultValue="Upcoming" disabled>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <Select defaultValue={form.getValues('type')} onValueChange={(value) => form.setValue('type', value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Corporate">Corporate</SelectItem>
            <SelectItem value="Wedding">Wedding</SelectItem>
            <SelectItem value="Conference">Conference</SelectItem>
            <SelectItem value="Party">Party</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Event Description" {...form.register('description')} />
      </div>

      <Button type="submit">{submitLabel}</Button>
    </form>
  );
}
