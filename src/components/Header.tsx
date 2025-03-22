
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="w-full py-4 px-6 md:px-10 sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border animate-slide-down">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <Leaf className="h-5 w-5 text-primary animate-float" />
          </div>
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-700">WasteWise</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8 items-center">
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' }
          ].map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              className={`relative text-sm font-medium transition-colors duration-300 
                ${location.pathname === item.path ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}
                after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:origin-bottom-right 
                after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 hover:after:origin-bottom-left
                ${location.pathname === item.path ? 'after:scale-x-100' : ''}
              `}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex md:hidden">
          {/* Mobile menu button would go here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
