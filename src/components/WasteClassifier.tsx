
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

  // Simple hash function to get a consistent "random" number from a string
  const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Get a simulated waste type based on the image name/size
  const getSimulatedWasteType = (file: File): ClassificationResult => {
    // Use file name and size as seeds for deterministic "random" classification
    const hashValue = simpleHash(file.name + file.size.toString());
    
    // Define several waste types
    const wasteTypes = [
      {
        type: 'Plastic Bottle (PET)',
        confidence: 85 + (hashValue % 15),
        recyclable: true,
        origin: 'Household',
        instructions: 'Remove cap and label, rinse, and place in recycling bin.',
        tips: [
          'PET plastic can be recycled into new bottles, clothing, and more.',
          'Recycling one plastic bottle saves enough energy to power a 60W light bulb for 6 hours.',
          'Consider using a reusable water bottle instead of single-use plastics.'
        ]
      },
      {
        type: 'Cardboard',
        confidence: 88 + (hashValue % 12),
        recyclable: true,
        origin: 'Packaging',
        instructions: 'Flatten cardboard boxes and remove any tape or labels before recycling.',
        tips: [
          'Cardboard can be recycled up to 7 times before the fibers become too short.',
          'Recycling cardboard uses 75% less energy than making new cardboard.',
          'Keep cardboard dry to maintain its recyclability.'
        ]
      },
      {
        type: 'Glass Bottle',
        confidence: 91 + (hashValue % 9),
        recyclable: true,
        origin: 'Household',
        instructions: 'Rinse thoroughly and remove caps or corks before recycling.',
        tips: [
          'Glass is 100% recyclable and can be recycled endlessly without loss of quality.',
          'Recycling glass reduces related air pollution by 20% and water pollution by 50%.',
          'Different colored glass needs to be sorted separately for recycling.'
        ]
      },
      {
        type: 'Food Waste',
        confidence: 87 + (hashValue % 13),
        recyclable: true,
        origin: 'Kitchen',
        instructions: 'Compost food scraps to create nutrient-rich soil for plants.',
        tips: [
          'Food waste in landfills produces methane, a potent greenhouse gas.',
          'Composting food waste can reduce your household waste by up to 30%.',
          'Home composting reduces the need for chemical fertilizers in your garden.'
        ]
      },
      {
        type: 'Aluminum Can',
        confidence: 93 + (hashValue % 7),
        recyclable: true,
        origin: 'Beverage',
        instructions: 'Rinse cans and crush them (optional) to save space in your recycling bin.',
        tips: [
          'Recycling aluminum saves 95% of the energy needed to make aluminum from raw materials.',
          'An aluminum can can be recycled and back on the shelf in just 60 days.',
          'Aluminum can be recycled infinitely without losing quality.'
        ]
      },
      {
        type: 'Plastic Bag',
        confidence: 79 + (hashValue % 15),
        recyclable: false,
        origin: 'Shopping',
        instructions: 'Most curbside programs don\'t accept plastic bags. Return to grocery stores with bag recycling programs.',
        tips: [
          'Plastic bags can take 500-1,000 years to decompose in landfills.',
          'Reusable shopping bags are a more sustainable alternative.',
          'When recycled properly, plastic bags can be made into composite lumber for decking.'
        ]
      },
      {
        type: 'Electronic Waste',
        confidence: 89 + (hashValue % 11),
        recyclable: false,
        origin: 'Consumer Electronics',
        instructions: 'Take to an e-waste recycling center or retailer with an electronics recycling program.',
        tips: [
          'E-waste contains toxic materials that can leach into soil and water if landfilled.',
          'Many components in electronics can be recovered and reused.',
          'Some retailers offer trade-in programs for old electronics.'
        ]
      }
    ];
    
    // Select a waste type based on the hash
    return wasteTypes[hashValue % wasteTypes.length];
  };

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
        
        // Get a varied result based on image file
        const simulatedResult = getSimulatedWasteType(imageFile);
        
        setResult(simulatedResult);
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
                  {result.recyclable 
                    ? `Most curbside recycling programs accept ${result.type.split(' ')[0].toLowerCase()} waste. Check local guidelines for specific requirements.`
                    : `${result.type} typically requires special handling. Check with your local waste management authority for proper disposal methods.`}
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
                  content={result.recyclable 
                    ? `When recycled properly, ${result.type.split(' ')[0].toLowerCase()} materials can significantly reduce landfill waste and conserve natural resources.`
                    : `${result.type} can take hundreds of years to decompose in landfills and may leach harmful substances into soil and water.`}
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
