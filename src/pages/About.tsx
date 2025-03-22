
import React from 'react';
import { Recycle, Leaf, Info, AlertCircle, Droplet, BarChart3 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-2/3 h-full bg-gradient-to-b from-sage-100/10 to-transparent rounded-full blur-3xl transform rotate-12 opacity-50" />
            <div className="absolute -bottom-1/4 -left-1/4 w-2/3 h-full bg-gradient-to-t from-primary/5 to-transparent rounded-full blur-3xl transform -rotate-12 opacity-30" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
                About WasteWise
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
                Our Mission for a <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-600">Sustainable Future</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                Learn about our vision, technology, and how we're helping to create a more sustainable world through waste education.
              </p>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  WasteWise was born from a simple observation: most people want to recycle correctly, but often don't know how. The complexity of recycling systems and the lack of clear information leads to contamination in recycling streams and valuable materials ending up in landfills.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our team of environmental scientists, AI specialists, and developers came together with a shared mission: to make waste classification accessible to everyone and provide clear, actionable recycling information.
                </p>
                <p className="text-muted-foreground">
                  Using advanced machine learning models trained on thousands of waste images, we've created a tool that can identify various types of waste and provide specific disposal guidelines based on material composition.
                </p>
              </div>
              
              <div className="glass-card p-6 animate-scale-up">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-sage-400/20 flex items-center justify-center">
                    <Leaf className="h-16 w-16 text-primary/40 animate-float" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Founded</h4>
                    <p className="text-2xl font-bold">2023</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Materials Classified</h4>
                    <p className="text-2xl font-bold">50+</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm mb-1">AI Accuracy</h4>
                    <p className="text-2xl font-bold">94%</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Users Helped</h4>
                    <p className="text-2xl font-bold">25K+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                WasteWise uses advanced machine learning to accurately classify waste materials
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="p-6 border border-border bg-card hover:border-primary/20 transition-colors animate-scale-up">
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Machine Learning Model</h3>
                <p className="text-muted-foreground mb-4">
                  Our model is trained on a diverse dataset of waste images, learning to recognize materials by their visual characteristics.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                    <span>Convolutional Neural Networks</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                    <span>Transfer Learning Architecture</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                    <span>Continuous Model Training</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 border border-border bg-card hover:border-primary/20 transition-colors animate-scale-up" style={{ animationDelay: '100ms' }}>
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Waste Classification</h3>
                <p className="text-muted-foreground mb-4">
                  Our system identifies multiple waste types with high accuracy, providing detailed information about each material.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                    <span>50+ Material Categories</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                    <span>Recyclability Assessment</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                    <span>Material Composition Analysis</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6 border border-border bg-card hover:border-primary/20 transition-colors animate-scale-up" style={{ animationDelay: '200ms' }}>
                <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                  <Recycle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Recycling Information</h3>
                <p className="text-muted-foreground mb-4">
                  We provide detailed recycling instructions and environmental impact information for each waste type.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                    <span>Specific Disposal Guidelines</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                    <span>Environmental Impact Data</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                    <span>Sustainable Alternatives</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Educational Resources */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Waste Reduction Tips</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Small changes in daily habits can make a big difference in reducing waste
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Leaf className="h-6 w-6 text-primary" />,
                  title: 'Refuse Single-Use Items',
                  content: 'Decline plastic straws, bags, and other disposable items. Bring your own reusable alternatives like shopping bags, water bottles, and coffee cups.'
                },
                {
                  icon: <Recycle className="h-6 w-6 text-primary" />,
                  title: 'Buy in Bulk',
                  content: 'Purchase food and household items in bulk to reduce packaging waste. Bring your own containers to stores that offer bulk options.'
                },
                {
                  icon: <AlertCircle className="h-6 w-6 text-primary" />,
                  title: 'Compost Organic Waste',
                  content: 'Start a compost bin for food scraps and yard waste. Composting reduces methane emissions from landfills and creates nutrient-rich soil.'
                },
                {
                  icon: <Droplet className="h-6 w-6 text-primary" />,
                  title: 'Choose Sustainable Materials',
                  content: 'Opt for products made from sustainable, recyclable, or biodegradable materials. Look for minimal packaging and recycled content.'
                }
              ].map((tip, index) => (
                <div key={index} className="glass-card p-6 animate-scale-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl mr-4">
                      {tip.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{tip.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{tip.content}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-semibold mb-6">Did You Know?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  '91% of plastic is not recycled, despite being recyclable.',
                  'The average American produces about 4.9 pounds of waste per day.',
                  'Recycling one aluminum can saves enough energy to run a TV for 3 hours.'
                ].map((fact, index) => (
                  <div key={index} className="p-6 bg-muted rounded-lg animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                    <p className="text-center">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Common questions about waste classification and recycling
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: 'How accurate is the waste classification?',
                  answer: 'Our AI model achieves an average accuracy of 94% across all waste categories. The accuracy varies by material type, with common items like plastic bottles and aluminum cans having the highest recognition rates.'
                },
                {
                  question: 'What types of waste can the system identify?',
                  answer: 'The system can identify over 50 different types of waste materials, including various plastics (PET, HDPE, PVC, etc.), metals, paper, glass, organic waste, e-waste, and hazardous materials.'
                },
                {
                  question: 'Why does recycling correctly matter?',
                  answer: 'Recycling contamination occurs when non-recyclable items are placed in recycling bins. This can cause entire batches of recyclable materials to be rejected and sent to landfills, wasting resources and increasing processing costs.'
                },
                {
                  question: 'Does recycling actually make a difference?',
                  answer: 'Yes! Recycling conserves natural resources, saves energy, reduces landfill waste, prevents pollution, and creates jobs. For example, recycling aluminum uses 95% less energy than producing it from raw materials.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-background rounded-lg border border-border p-6 animate-scale-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <h4 className="text-lg font-medium mb-2">{faq.question}</h4>
                  <Separator className="my-2" />
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
