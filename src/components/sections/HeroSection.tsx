import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';

interface HeroSectionProps {
  content: any;
  setContent: (content: any) => void;
  isAdminMode: boolean;
}

const HeroSection = ({ content, setContent, isAdminMode }: HeroSectionProps) => {
  return (
    <section id="home" className="pt-32 pb-20 px-4 min-h-screen flex items-center tech-pattern relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-blue-900/10 pointer-events-none" />
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            {isAdminMode ? (
              <Textarea
                value={content.heroTitle}
                onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                className="text-5xl lg:text-6xl font-bold leading-tight bg-muted h-32"
              />
            ) : (
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gold uppercase tracking-wide">
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
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gold-gradient text-background font-semibold text-lg">
                Получить консультацию
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Наши услуги
              </Button>
            </div>
          </div>
          
          <Card className="p-8 cyber-card shadow-2xl animate-fade-in backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-gold">Запишитесь на консультацию</h3>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Ваше имя" className="bg-muted" />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" placeholder="+7 (___) ___-__-__" className="bg-muted" />
              </div>
              <div>
                <Label htmlFor="message">Сообщение</Label>
                <Textarea id="message" placeholder="Опишите вашу задачу" className="bg-muted" />
              </div>
              <Button className="w-full gold-gradient text-background font-semibold">
                Отправить заявку
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;