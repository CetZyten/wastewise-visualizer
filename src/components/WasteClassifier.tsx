
import React, { useState } from 'react';
import { Recycle, Clock, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import InfoCard from './InfoCard';

export interface ClassificationResult {
  type: string;
  confidence: number;
  recyclable: boolean;
  origin: string;
  instructions: string;
  tips: string[];
}

interface WasteClassifierProps {
  imageFile: File | null;
}

const WasteClassifier: React.FC<WasteClassifierProps> = ({ imageFile }) => {
  const [isClassifying, setIsClassifying] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [progressValue, setProgressValue] = useState(0);

  // Simulated classification for demo purposes
  React.useEffect(() => {
    if (imageFile) {
      setIsClassifying(true);
      setProgressValue(0);
      setResult(null);
      
      // Simulate progress
      const interval = setInterval(() => {
        setProgressValue(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      
      // Simulate API call delay
      setTimeout(() => {
        clearInterval(interval);
        setProgressValue(100);
        
        // Mock result - in a real app, this would come from a machine learning model
        const mockResult: ClassificationResult = {
          type: 'Plastic Bottle (PET)',
          confidence: 94.5,
          recyclable: true,
          origin: 'Household',
          instructions: 'Remove cap and label, rinse, and place in recycling bin.',
          tips: [
            'PET plastic can be recycled into new bottles, clothing, and more.',
            'Recycling one plastic bottle saves enough energy to power a 60W light bulb for 6 hours.',
            'Consider using a reusable water bottle instead of single-use plastics.'
          ]
        };
        
        setResult(mockResult);
        setIsClassifying(false);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [imageFile]);

  if (!imageFile) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 animate-slide-up">
      {isClassifying ? (
        <div className="glass-card p-8 text-center animate-fade-in">
          <h3 className="text-xl font-semibold mb-4">Analyzing your waste...</h3>
          <Progress value={progressValue} className="h-2 mb-4" />
          <p className="text-sm text-muted-foreground">
            Our AI is identifying the material and providing recycling information
          </p>
        </div>
      ) : result ? (
        <div className="glass-card overflow-hidden animate-scale-up">
          <div className="p-6 bg-gradient-to-r from-primary/10 to-transparent border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{result.type}</h2>
              <div className="flex items-center space-x-2 px-3 py-1 bg-background rounded-full text-sm">
                <div 
                  className={`w-3 h-3 rounded-full ${result.recyclable ? 'bg-green-500' : 'bg-orange-500'} animate-pulse-slow`}
                />
                <span>{result.recyclable ? 'Recyclable' : 'Non-Recyclable'}</span>
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <span className="font-medium">Confidence:</span>
              <div className="ml-2 w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${result.confidence > 90 ? 'bg-green-500' : result.confidence > 70 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
              <span className="ml-2">{result.confidence.toFixed(1)}%</span>
            </div>
          </div>
          
          <Tabs defaultValue="instructions" className="p-6">
            <TabsList className="mb-4">
              <TabsTrigger value="instructions" className="flex items-center">
                <Recycle className="h-4 w-4 mr-2" />
                Recycling
              </TabsTrigger>
              <TabsTrigger value="info" className="flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Details
              </TabsTrigger>
              <TabsTrigger value="tips" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Tips
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="instructions" className="space-y-4">
              <InfoCard 
                title="Recycling Instructions"
                content={result.instructions}
                icon="recycle"
              />
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Where to Recycle</h4>
                <p className="text-sm">
                  Most curbside recycling programs accept PET plastic. Look for recycling symbol ♳ on the bottom of the bottle.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="info">
              <div className="space-y-4">
                <InfoCard 
                  title="Material Origin"
                  content={result.origin}
                  icon="home"
                />
                <InfoCard 
                  title="Environmental Impact"
                  content="Plastic bottles take up to 450 years to decompose in the environment. They can leach chemicals into soil and water, and often end up in oceans where they harm marine life."
                  icon="leaf"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="tips">
              <div className="space-y-4">
                {result.tips.map((tip, index) => (
                  <div key={index} className="flex items-start p-4 border border-border rounded-lg">
                    <div className="text-primary mt-1 mr-4 flex-shrink-0">
                      <div className="w-6 h-6 flex items-center justify-center bg-primary/10 rounded-full">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : null}
    </div>
  );
};

export default WasteClassifier;
