
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: number;
  trendColor?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendColor = 'neutral',
  className,
}: StatCardProps) => {
  return (
    <div className={cn(
      "bg-card rounded-xl border border-border p-6 transition-all hover-lift",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="rounded-full p-2 bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
      
      {trend !== undefined && (
        <div className="mt-4 flex items-center space-x-1">
          <span className={cn(
            "inline-flex items-center text-xs font-medium",
            trendColor === 'positive' && "text-emerald-500",
            trendColor === 'negative' && "text-red-500",
            trendColor === 'neutral' && "text-muted-foreground"
          )}>
            {trend > 0 ? (
              <svg className="mr-1 h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L18 10M18 10H6M18 10V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : trend < 0 ? (
              <svg className="mr-1 h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20L18 14M18 14H6M18 14V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg className="mr-1 h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {Math.abs(trend)}% from last month
          </span>
        </div>
      )}
    </div>
  );
};
