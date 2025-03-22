
import React from 'react';
import { Recycle, Home, Leaf, AlertCircle } from 'lucide-react';

interface InfoCardProps {
  title: string;
  content: string;
  icon: 'recycle' | 'home' | 'leaf' | 'alert';
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'recycle':
        return <Recycle className="h-5 w-5 text-teal-600" />;
      case 'home':
        return <Home className="h-5 w-5 text-sage-600" />;
      case 'leaf':
        return <Leaf className="h-5 w-5 text-green-600" />;
      case 'alert':
      default:
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
    }
  };

  return (
    <div className="flex p-4 border border-border rounded-lg overflow-hidden hover:border-primary/30 transition-colors duration-300">
      <div className="mr-4 mt-1">
        <div className="p-2 bg-primary/10 rounded-lg">
          {getIcon()}
        </div>
      </div>
      <div>
        <h4 className="font-medium text-sm mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>
    </div>
  );
};

export default InfoCard;
