import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface HeroSectionProps {
  content: any;
  setContent: (content: any) => void;
  isAdminMode: boolean;
  scrollToSection?: (sectionId: string) => void;
}

const HeroSection = ({ content, setContent, isAdminMode, scrollToSection }: HeroSectionProps) => {

  return (
    <section id="home" className="pt-32 pb-20 px-4 min-h-screen flex items-center tech-pattern relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <div className="flex justify-center items-center">
          <div className="space-y-8 animate-fade-in max-w-4xl text-center">
            {isAdminMode ? (
              <Textarea
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                className="text-5xl lg:text-6xl font-bold leading-tight bg-muted h-32"
              />
            ) : (
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-foreground uppercase tracking-wide">
                {content.heroTitle}
              </h1>
            )}
            
            {isAdminMode ? (
              <Textarea
                value={content.heroSubtitle}
                onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                className="text-xl text-muted-foreground bg-muted"
              />
            ) : (
              <p className="text-xl text-muted-foreground">
                {content.heroSubtitle}
              </p>
            )}
            
            <div className="flex justify-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => scrollToSection?.('services')}
              >
                Наши услуги
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider mt-12" />
    </section>
  );
};

export default HeroSection;