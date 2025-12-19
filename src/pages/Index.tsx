import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authPassword, setAuthPassword] = useState('');
  const [editingContent, setEditingContent] = useState<any>({
    heroTitle: 'Защита вашего бизнеса — наша профессия',
    heroSubtitle: 'Комплексные решения по аутсорсингу службы безопасности для компаний любого масштаба',
    aboutYears: '15+',
    aboutClients: '300+',
    aboutSuccess: '98%',
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'services', 'portfolio', 'cases', 'blog', 'contacts'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleAuth = () => {
    if (authPassword === 'admin123') {
      setIsAdminMode(true);
      setShowAuthDialog(false);
      toast.success('Вы вошли в режим администратора');
    } else {
      toast.error('Неверный пароль');
    }
  };

  const menuItems = [
    { id: 'home', label: 'Главная' },
    { id: 'about', label: 'О компании' },
    { id: 'services', label: 'Услуги' },
    { id: 'portfolio', label: 'Портфолио' },
    { id: 'cases', label: 'Кейсы' },
    { id: 'blog', label: 'Блог' },
    { id: 'contacts', label: 'Контакты' },
  ];

  const services = [
    {
      title: 'Проверка контрагентов',
      description: 'Комплексная или выборочная проверка: анализ благонадежности, финансовой документации, кредитной истории, установление бенефициаров',
      icon: 'SearchCheck',
    },
    {
      title: 'Проверка кандидатов',
      description: 'Тщательная проверка при приеме на работу для минимизации рисков',
      icon: 'UserCheck',
    },
    {
      title: 'Аналитические материалы',
      description: 'Подготовка информационно-аналитических материалов по запросу клиента',
      icon: 'FileText',
    },
    {
      title: 'Финансовый аудит',
      description: 'Анализ и решение вопросов, связанных с безопасностью предприятия',
      icon: 'DollarSign',
    },
    {
      title: 'Защита информации',
      description: 'Контроль коммерческой тайны. DLP, SIEM, антивирусные комплексы',
      icon: 'Shield',
    },
    {
      title: 'Антикоррупционная политика',
      description: 'Разработка и реализация, выявление внутрикорпоративных злоупотреблений',
      icon: 'Scale',
    },
  ];

  const portfolioItems = [
    {
      title: 'Крупный производственный холдинг',
      description: 'Выявили схему хищений на сумму 45 млн руб. Взыскано 100% ущерба',
      result: '45 млн ₽',
    },
    {
      title: 'Строительная компания',
      description: 'Проверка объемов работ подрядчиков. Предотвращено завышение стоимости на 28 млн руб',
      result: '28 млн ₽',
    },
    {
      title: 'Логистическая компания',
      description: 'Комплексная проверка 150 контрагентов. Исключены 12 недобросовестных партнеров',
      result: '150 проверок',
    },
  ];

  const blogPosts = [
    {
      title: 'Как проверить контрагента перед заключением сделки',
      date: '15 декабря 2024',
      category: 'Безопасность бизнеса',
    },
    {
      title: 'DLP-системы: зачем они нужны вашему бизнесу',
      date: '10 декабря 2024',
      category: 'Защита информации',
    },
    {
      title: 'Признаки недобросовестного подрядчика',
      date: '5 декабря 2024',
      category: 'Аудит',
    },
  ];

  const EditableText = ({ value, field, multiline = false }: any) => {
    if (!isAdminMode) return <>{value}</>;
    
    return multiline ? (
      <Textarea
        value={value}
        onChange={(e) => setEditingContent({ ...editingContent, [field]: e.target.value })}
        className="bg-muted text-foreground"
      />
    ) : (
      <Input
        value={value}
        onChange={(e) => setEditingContent({ ...editingContent, [field]: e.target.value })}
        className="bg-muted text-foreground"
      />
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" className="text-primary" size={32} />
              <span className="text-xl font-bold text-primary">SECURITY PRO</span>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button className="hidden lg:inline-flex gold-gradient text-background font-semibold">
                Бесплатная консультация
              </Button>
              
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Icon name="Menu" size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-card">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`text-left text-lg font-medium transition-colors hover:text-primary ${
                          activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                    <Button className="gold-gradient text-background font-semibold">
                      Бесплатная консультация
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <section id="home" className="pt-32 pb-20 px-4 min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                {isAdminMode ? (
                  <EditableText value={editingContent.heroTitle} field="heroTitle" multiline />
                ) : (
                  editingContent.heroTitle
                )}
              </h1>
              <p className="text-xl text-muted-foreground">
                {isAdminMode ? (
                  <EditableText value={editingContent.heroSubtitle} field="heroSubtitle" multiline />
                ) : (
                  editingContent.heroSubtitle
                )}
              </p>
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
            
            <Card className="p-8 bg-card border-primary/20 shadow-2xl animate-fade-in">
              <h3 className="text-2xl font-bold mb-6 text-primary">Запишитесь на консультацию</h3>
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

      <section id="about" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">О компании</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center bg-background border-primary/20 hover:border-primary transition-all">
              <div className="text-5xl font-bold text-primary mb-4">
                {isAdminMode ? (
                  <EditableText value={editingContent.aboutYears} field="aboutYears" />
                ) : (
                  editingContent.aboutYears
                )}
              </div>
              <p className="text-xl text-muted-foreground">лет опыта</p>
            </Card>
            <Card className="p-8 text-center bg-background border-primary/20 hover:border-primary transition-all">
              <div className="text-5xl font-bold text-primary mb-4">
                {isAdminMode ? (
                  <EditableText value={editingContent.aboutClients} field="aboutClients" />
                ) : (
                  editingContent.aboutClients
                )}
              </div>
              <p className="text-xl text-muted-foreground">довольных клиентов</p>
            </Card>
            <Card className="p-8 text-center bg-background border-primary/20 hover:border-primary transition-all">
              <div className="text-5xl font-bold text-primary mb-4">
                {isAdminMode ? (
                  <EditableText value={editingContent.aboutSuccess} field="aboutSuccess" />
                ) : (
                  editingContent.aboutSuccess
                )}
              </div>
              <p className="text-xl text-muted-foreground">успешных проектов</p>
            </Card>
          </div>
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
            Мы специализируемся на аутсорсинге служб безопасности для крупных и средних компаний.
            Наша команда экспертов с опытом работы в правоохранительных органах обеспечивает
            максимальную защиту вашего бизнеса от всех видов угроз.
          </p>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Комплексные решения для защиты вашего бизнеса
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-6 bg-card border-primary/20 hover:border-primary transition-all hover:scale-105 duration-300"
              >
                <Icon name={service.icon as any} className="text-primary mb-4" size={40} />
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Портфолио</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <Card key={index} className="p-6 bg-background border-primary/20">
                <div className="text-3xl font-bold text-primary mb-4">{item.result}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Успешные кейсы</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="p-8 bg-card border-primary/20">
              <div className="flex items-start space-x-4">
                <Icon name="CheckCircle" className="text-primary flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Металлургический комбинат</h3>
                  <p className="text-muted-foreground mb-4">
                    Проведена комплексная проверка системы закупок. Выявлены 8 схем необоснованного
                    завышения стоимости ТМЦ. Экономия бюджета составила 67 млн рублей за год.
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-primary font-semibold">Срок: 3 месяца</span>
                    <span className="text-primary font-semibold">Результат: 67 млн ₽</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-8 bg-card border-primary/20">
              <div className="flex items-start space-x-4">
                <Icon name="CheckCircle" className="text-primary flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Торговая сеть</h3>
                  <p className="text-muted-foreground mb-4">
                    Внедрена система контроля персонала и DLP-решение. Предотвращена утечка
                    коммерческой тайны. Выявлены 3 случая промышленного шпионажа.
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-primary font-semibold">Срок: 2 месяца</span>
                    <span className="text-primary font-semibold">3 выявленных случая</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Экспертный блог</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="p-6 bg-background border-primary/20 hover:border-primary transition-all cursor-pointer">
                <div className="text-sm text-primary mb-2">{post.category}</div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <div className="text-sm text-muted-foreground">{post.date}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Icon name="MapPin" className="text-primary flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold mb-1">Адрес</h3>
                  <p className="text-muted-foreground">г. Москва, ул. Тверская, д. 1</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Icon name="Phone" className="text-primary flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold mb-1">Телефон</h3>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Icon name="Mail" className="text-primary flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <p className="text-muted-foreground">info@securitypro.ru</p>
                </div>
              </div>
            </div>
            <Card className="p-6 bg-card border-primary/20">
              <h3 className="text-xl font-bold mb-4">Напишите нам</h3>
              <form className="space-y-4">
                <Input placeholder="Ваше имя" className="bg-muted" />
                <Input placeholder="Email" className="bg-muted" />
                <Textarea placeholder="Сообщение" className="bg-muted" />
                <Button className="w-full gold-gradient text-background font-semibold">
                  Отправить
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-card py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Icon name="Shield" className="text-primary" size={24} />
              <span className="text-lg font-bold text-primary">SECURITY PRO</span>
            </div>
            <p className="text-muted-foreground text-sm">© 2024 Security Pro. Все права защищены.</p>
            <button
              onClick={() => setShowAuthDialog(true)}
              className="text-xs text-muted-foreground/50 hover:text-primary transition-colors mt-4 md:mt-0"
            >
              admin
            </button>
          </div>
        </div>
      </footer>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Вход в админ-панель</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                className="bg-muted"
              />
            </div>
            <Button onClick={handleAuth} className="w-full gold-gradient text-background font-semibold">
              Войти
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {isAdminMode && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="p-4 bg-primary text-background">
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} />
              <span className="font-semibold">Режим редактирования</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsAdminMode(false)}
                className="ml-4"
              >
                Выйти
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
