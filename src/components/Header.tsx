
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Menu, X, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <header className="w-full py-4 px-6 sticky top-0 bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {isAuthPage ? (
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={goBack}
              className="mr-2 hover:bg-background hover:text-primary"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <span className="text-lg font-medium">Back to Home</span>
          </div>
        ) : (
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Leaf className="h-5 w-5 text-primary animate-float" />
            </div>
            <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-700">EcoSort</span>
          </Link>
        )}
        
        <nav className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-foreground hover:text-primary transition-colors duration-300">
            Home
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors duration-300">
            About
          </Link>
          <div className="ml-2">
            <ThemeToggle />
          </div>
          {user ? (
            <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
          ) : (
            <Button onClick={() => navigate('/auth')} variant="default">Sign In</Button>
          )}
        </nav>
        
        {isMobile && (
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Menu"
              onClick={toggleMenu}
              className="md:hidden hover:bg-background hover:text-primary"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        )}
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-background pt-16 p-6 z-40 animate-fade-in md:hidden overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-lg py-3 px-4 hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-lg py-3 px-4 hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {user ? (
              <Button onClick={handleSignOut} variant="outline" className="mt-4">Sign Out</Button>
            ) : (
              <Button 
                onClick={() => {
                  navigate('/auth');
                  setIsMenuOpen(false);
                }} 
                variant="default" 
                className="mt-4"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
