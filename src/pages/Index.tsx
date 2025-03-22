
import React, { useState } from 'react';
import { Recycle, Leaf, Trash2, Upload } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import WasteClassifier from '@/components/WasteClassifier';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-2/3 h-full bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-50" />
            <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-full bg-gradient-to-t from-sage-100/10 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-30" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
                AI-Powered Waste Classification
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
                Classify Your Waste, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">Save the Planet</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                Upload an image of waste and get instant classification, recycling instructions, and sustainability tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Upload Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Our AI model analyzes your waste images to provide accurate classification and recycling guidance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: <Upload className="h-6 w-6 text-primary" />,
                  title: 'Upload Image',
                  description: 'Take a photo or upload an image of waste you want to classify'
                },
                {
                  icon: <Recycle className="h-6 w-6 text-primary" />,
                  title: 'Get Classification',
                  description: 'Our AI analyzes the image and identifies the waste type and recyclability'
                },
                {
                  icon: <Leaf className="h-6 w-6 text-primary" />,
                  title: 'Take Action',
                  description: 'Learn how to properly dispose of or recycle the waste'
                }
              ].map((step, index) => (
                <Card key={index} className="p-6 border border-border hover:border-primary/20 transition-colors bg-card hover:shadow-md animate-scale-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              ))}
            </div>
            
            <div className="glass-card py-10 px-6 md:p-10">
              <h3 className="text-2xl font-semibold text-center mb-8">Upload Your Waste Image</h3>
              <ImageUploader onImageUpload={handleImageUpload} />
              <WasteClassifier imageFile={uploadedImage} />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Use WasteWise?</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Our platform combines AI-powered waste classification with educational resources to help you make environmentally responsible decisions
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Accurate Classification',
                  description: 'Our AI model is trained on thousands of waste images for precise identification',
                  icon: <Recycle className="h-6 w-6 text-primary" />
                },
                {
                  title: 'Educational Resources',
                  description: 'Learn about proper waste disposal methods and environmental impact',
                  icon: <Leaf className="h-6 w-6 text-primary" />
                },
                {
                  title: 'Easy to Use',
                  description: 'Simple and intuitive interface for quick waste classification',
                  icon: <Upload className="h-6 w-6 text-primary" />
                },
                {
                  title: 'Sustainability Tips',
                  description: 'Get practical advice on reducing waste and living more sustainably',
                  icon: <Leaf className="h-6 w-6 text-primary" />
                },
                {
                  title: 'Always Improving',
                  description: 'Our AI model continuously learns and improves with each classification',
                  icon: <Recycle className="h-6 w-6 text-primary" />
                },
                {
                  title: 'Reduce Contamination',
                  description: 'Help reduce recycling contamination by properly sorting your waste',
                  icon: <Trash2 className="h-6 w-6 text-primary" />
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex p-6 bg-background rounded-xl border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-md animate-scale-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mr-4 flex-shrink-0">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-10 relative overflow-hidden">
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-2/3 h-full bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl transform rotate-12 opacity-50" />
              </div>
              
              <div className="relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Start classifying your waste today and join the movement toward a cleaner, more sustainable future.
                  </p>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
