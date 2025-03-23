
import { Supplier } from '@/types/supplier';

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  budget: string;
  attendees: number;
  status: string;
  description?: string;
  type?: string;
}

interface RecommendationResult {
  supplier: Supplier;
  matchScore: number;
  reason: string;
}

/**
 * AI-powered recommendation engine that matches events with suppliers
 * based on event details, budget constraints, and supplier capabilities
 */
export const recommendSuppliers = (
  event: Event,
  suppliers: Supplier[],
  limit: number = 3
): RecommendationResult[] => {
  // Extract event details for matching
  const budget = parseBudget(event.budget);
  const attendees = event.attendees;
  const location = event.location;
  const eventDescription = event.description?.toLowerCase() || '';
  const eventName = event.name.toLowerCase();
  
  // Calculate relevance scores for each supplier
  const scoredSuppliers = suppliers.map(supplier => {
    // Start with a base score
    let score = 0;
    let matchReasons: string[] = [];
    
    // Budget alignment (higher score if supplier's price fits within the budget)
    const supplierPrice = parsePrice(supplier.price);
    if (supplierPrice <= budget) {
      score += 20;
      matchReasons.push("Within budget");
    } else if (supplierPrice <= budget * 1.2) {
      // Slightly over budget but still reasonable
      score += 10;
      matchReasons.push("Slightly above budget but offers good value");
    }
    
    // Location match
    if (supplier.location.includes(location) || location.includes(supplier.location.split(',')[0])) {
      score += 15;
      matchReasons.push("Location match");
    }
    
    // Rating boost
    score += supplier.rating * 5;
    if (supplier.rating >= 4.7) {
      matchReasons.push("Highly rated service");
    }
    
    // Category relevance based on event description and name
    const relevantCategories = determineRelevantCategories(eventName, eventDescription);
    if (relevantCategories.includes(supplier.category)) {
      score += 25;
      matchReasons.push(`Perfect for ${event.type || 'this type of event'}`);
    }
    
    // Keyword matches in the description or tags
    const keywordsFromEvent = extractKeywords(eventName, eventDescription);
    const supplierKeywords = [...supplier.tags, ...supplier.description.toLowerCase().split(' ')];
    
    const keywordMatches = keywordsFromEvent.filter(keyword => 
      supplierKeywords.some(tag => tag.toLowerCase().includes(keyword))
    );
    
    score += keywordMatches.length * 5;
    if (keywordMatches.length > 0) {
      matchReasons.push("Matches your event needs");
    }
    
    // Capacity consideration (for venues and catering)
    if (['Venue', 'Catering'].includes(supplier.category)) {
      // Assume larger suppliers can handle more attendees
      const canHandleCapacity = supplier.price.includes('$') && supplierPrice > (attendees * 10);
      if (canHandleCapacity) {
        score += 15;
        matchReasons.push("Can accommodate your guest count");
      }
    }
    
    // Generate a personalized reason for the recommendation
    const primaryReason = matchReasons.length > 0 
      ? matchReasons[0] 
      : `Recommended ${supplier.category} service`;
    
    const secondaryReason = matchReasons.length > 1
      ? ` and ${matchReasons[1].toLowerCase()}`
      : '';
    
    const reason = `${primaryReason}${secondaryReason}. ${supplier.rating.toFixed(1)}/5 stars from ${supplier.reviews} reviews.`;
    
    return {
      supplier,
      matchScore: score,
      reason
    };
  });
  
  // Sort by score (highest first) and take the top results
  return scoredSuppliers
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
};

/**
 * Extracts keywords from event name and description
 */
const extractKeywords = (name: string, description: string): string[] => {
  const combined = `${name} ${description}`.toLowerCase();
  
  // Common event types
  const eventTypes = ['wedding', 'corporate', 'conference', 'birthday', 'gala', 
    'celebration', 'meeting', 'party', 'workshop', 'seminar'];
  
  // Common supplier needs
  const supplierKeywords = ['catering', 'food', 'decor', 'decoration', 'audio', 
    'visual', 'sound', 'video', 'lighting', 'venue', 'location', 'transportation',
    'photography', 'printing', 'staffing', 'entertainment', 'music', 'flowers'];
  
  // Extract all matching keywords
  const keywords = [...eventTypes, ...supplierKeywords].filter(keyword => 
    combined.includes(keyword)
  );
  
  // Add some default keywords if none matched
  if (keywords.length === 0) {
    keywords.push('event', 'professional');
  }
  
  return keywords;
};

/**
 * Determines relevant supplier categories based on event details
 */
const determineRelevantCategories = (name: string, description: string): string[] => {
  const combined = `${name} ${description}`.toLowerCase();
  const categories = [];
  
  // Map common event needs to supplier categories
  if (combined.includes('food') || combined.includes('meal') || combined.includes('dinner') || combined.includes('lunch')) {
    categories.push('Catering');
  }
  
  if (combined.includes('decor') || combined.includes('decoration') || combined.includes('design') || combined.includes('flowers')) {
    categories.push('Decor');
  }
  
  if (combined.includes('sound') || combined.includes('audio') || combined.includes('music') || 
      combined.includes('lighting') || combined.includes('visual') || combined.includes('video')) {
    categories.push('Audio/Visual');
  }
  
  if (combined.includes('venue') || combined.includes('location') || combined.includes('space') || combined.includes('hall')) {
    categories.push('Venue');
  }
  
  if (combined.includes('transport') || combined.includes('travel') || combined.includes('car')) {
    categories.push('Transportation');
  }
  
  if (combined.includes('photo') || combined.includes('picture') || combined.includes('image')) {
    categories.push('Photography');
  }
  
  if (combined.includes('print') || combined.includes('material') || combined.includes('banner') || combined.includes('program')) {
    categories.push('Printing');
  }
  
  if (combined.includes('staff') || combined.includes('personnel') || combined.includes('waiter') || combined.includes('service')) {
    categories.push('Staffing');
  }
  
  // Default to common categories if none detected
  if (categories.length === 0) {
    categories.push('Catering', 'Venue', 'Decor', 'Audio/Visual');
  }
  
  return categories;
};

/**
 * Parses a budget string to a numeric value
 */
const parseBudget = (budgetString: string): number => {
  const numericValue = parseFloat(budgetString.replace(/[^0-9.]/g, ''));
  return isNaN(numericValue) ? 5000 : numericValue; // Default to 5000 if parsing fails
};

/**
 * Parses a price string to a numeric value
 */
const parsePrice = (priceString: string): number => {
  // Handle price ranges (e.g., "$1,000-$5,000")
  if (priceString.includes('-')) {
    const [min, max] = priceString.split('-');
    // Use the average of min and max
    return (parseBudget(min) + parseBudget(max)) / 2;
  }
  
  // Handle per-person pricing (e.g., "$85/person")
  if (priceString.includes('/person')) {
    const basePrice = parseFloat(priceString.replace(/[^0-9.]/g, ''));
    return basePrice * 100; // Assume 100 people as a baseline
  }
  
  // Handle hourly pricing (e.g., "$120/hour")
  if (priceString.includes('/hour')) {
    const hourlyRate = parseFloat(priceString.replace(/[^0-9.]/g, ''));
    return hourlyRate * 8; // Assume 8 hours as a typical event duration
  }
  
  // Default case: just extract the number
  return parseFloat(priceString.replace(/[^0-9.]/g, ''));
};
