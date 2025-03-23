
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-primary/20 rounded-full animate-pulse [animation-delay:0.3s]"></div>
            <div className="absolute inset-4 bg-primary/30 rounded-full animate-pulse [animation-delay:0.5s]"></div>
            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-primary">
              404
            </span>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight">Page Not Found</h1>
          <p className="text-muted-foreground">
            We couldn't find the page you were looking for. 
            It might have been removed, renamed, or didn't exist in the first place.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/">
              Return to Dashboard
            </Link>
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p>Path: {location.pathname}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
