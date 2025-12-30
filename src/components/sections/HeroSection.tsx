import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import ImageUpload from '@/components/ImageUpload';
import { useState } from 'react';

interface HeroSectionProps {
  content: any;
  setContent: (content: any) => void;
  isAdminMode: boolean;
  scrollToSection?: (sectionId: string) => void;
}

const HeroSection = ({ content, setContent, isAdminMode, scrollToSection }: HeroSectionProps) => {
  const [imageSize, setImageSize] = useState(100);
  const heroImage = content.heroImage || "https://cdn.poehali.dev/files/d68bde62-f59d-4e2f-8908-50f4a9fe6701.jpg";
  const heroImageSize = content.heroImageSize || 100;

  return (
    <section id="home" className="sm:py-16 lg:py-20 px-4 from-transparent via-card/30 to-transparent tech-pattern bg-[#000000] my-[130px] py-[52px]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="section-backdrop">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 animate-fade-in">
            {isAdminMode ? (
              <Textarea
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight bg-muted h-32"
              />
            ) : (
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground uppercase tracking-wide break-words">
                {content.heroTitle}
              </h1>
            )}
            
            {isAdminMode ? (
              <Textarea
                value={content.heroSubtitle}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                className="text-lg lg:text-xl text-muted-foreground bg-muted"
              />
            ) : (
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground break-words">
                {content.heroSubtitle}
              </p>
            )}
            
            <div>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
                onClick={() => scrollToSection?.('services')}
              >
                Наши услуги
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end animate-fade-in mt-8 lg:mt-0">
            <div className="relative w-full max-w-sm lg:max-w-md">
              {isAdminMode && (
                <div className="mb-4 space-y-4 p-4 bg-card/50 rounded-lg backdrop-blur">
                  <ImageUpload
                    currentImage={heroImage}
                    onImageUpload={(base64) => setContent({ ...content, heroImage: base64 })}
                    label="Изменить изображение"
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Размер изображения: {heroImageSize}%</label>
                    <Slider
                      value={[heroImageSize]}
                      onValueChange={(value) => setContent({ ...content, heroImageSize: value[0] })}
                      min={30}
                      max={150}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
              <div 
                className="aspect-square mx-auto transition-all duration-300" 
                style={{ width: `${heroImageSize}%` }}
              >
                <img 
                  src={heroImage}
                  alt="Защита бизнеса"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="section-divider mt-12" />
    </section>
  );
};

export default HeroSection;