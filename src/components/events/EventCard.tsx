
import React from 'react';
import { CalendarIcon, MapPinIcon, Users2Icon, BadgeDollarSignIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Status badge colors
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
    case 'planning':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
    case 'draft':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    case 'completed':
      return 'bg-green-100 text-green-800 hover:bg-green-100';
    case 'cancelled':
      return 'bg-red-100 text-red-800 hover:bg-red-100';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
  }
};

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  budget: string;
  attendees: number;
  status: string;
  description: string;
}

interface EventCardProps {
  event: Event;
  onManage: () => void;
}

export function EventCard({ event, onManage }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{event.name}</CardTitle>
          <Badge className={`${getStatusColor(event.status)}`}>
            {event.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>{formatDate(event.date)} • {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeDollarSignIcon className="h-4 w-4 text-muted-foreground" />
            <span>{event.budget}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users2Icon className="h-4 w-4 text-muted-foreground" />
            <span>{event.attendees} attendees</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onManage} variant="secondary" className="w-full">
          Manage Event
        </Button>
      </CardFooter>
    </Card>
  );
}
