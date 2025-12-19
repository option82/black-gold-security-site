import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import ContentSections from '@/components/ContentSections';
import Footer from '@/components/Footer';
import AdminPanel from '@/components/AdminPanel';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authPassword, setAuthPassword] = useState('');

  const [content, setContent] = useState({
    logo: '',
    companyName: 'SECURITY PRO',
    heroTitle: 'Защита вашего бизнеса — наша профессия',
    heroSubtitle: 'Комплексные решения по аутсорсингу службы безопасности для компаний любого масштаба',
    aboutTitle: 'О компании',
    aboutDescription: 'Мы специализируемся на аутсорсинге служб безопасности для крупных и средних компаний. Наша команда экспертов с опытом работы в правоохранительных органах обеспечивает максимальную защиту вашего бизнеса от всех видов угроз.',
    aboutStats: [
      { value: '15+', label: 'лет опыта' },
      { value: '300+', label: 'довольных клиентов' },
      { value: '98%', label: 'успешных проектов' },
    ],
    servicesTitle: 'Наши услуги',
    servicesSubtitle: 'Комплексные решения для защиты вашего бизнеса',
    services: [
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
    ],
    portfolioTitle: 'Портфолио',
    portfolio: [
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
    ],
    casesTitle: 'Успешные кейсы',
    cases: [
      {
        title: 'Металлургический комбинат',
        description: 'Проведена комплексная проверка системы закупок. Выявлены 8 схем необоснованного завышения стоимости ТМЦ. Экономия бюджета составила 67 млн рублей за год.',
        duration: 'Срок: 3 месяца',
        result: 'Результат: 67 млн ₽',
      },
      {
        title: 'Торговая сеть',
        description: 'Внедрена система контроля персонала и DLP-решение. Предотвращена утечка коммерческой тайны. Выявлены 3 случая промышленного шпионажа.',
        duration: 'Срок: 2 месяца',
        result: '3 выявленных случая',
      },
    ],
    blogTitle: 'Экспертный блог',
    blogPosts: [
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
    ],
    contactsTitle: 'Контакты',
    contacts: [
      { icon: 'MapPin', title: 'Адрес', value: 'г. Москва, ул. Тверская, д. 1' },
      { icon: 'Phone', title: 'Телефон', value: '+7 (495) 123-45-67' },
      { icon: 'Mail', title: 'Email', value: 'info@securitypro.ru' },
    ],
    footerText: '© 2024 Security Pro. Все права защищены.',
    menuItems: [
      { id: 'home', label: 'Главная' },
      { id: 'about', label: 'О компании' },
      { id: 'services', label: 'Услуги' },
      { id: 'portfolio', label: 'Портфолио' },
      { id: 'cases', label: 'Кейсы' },
      { id: 'blog', label: 'Блог' },
      { id: 'contacts', label: 'Контакты' },
    ],
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent({ ...content, logo: reader.result as string });
        toast.success('Логотип загружен');
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = (section: string) => {
    const newContent = { ...content };
    
    if (section === 'aboutStats') {
      newContent.aboutStats.push({ value: '0', label: 'Новый показатель' });
    } else if (section === 'services') {
      newContent.services.push({ title: 'Новая услуга', description: 'Описание услуги', icon: 'Shield' });
    } else if (section === 'portfolio') {
      newContent.portfolio.push({ title: 'Новый проект', description: 'Описание проекта', result: '0' });
    } else if (section === 'cases') {
      newContent.cases.push({ title: 'Новый кейс', description: 'Описание кейса', duration: 'Срок:', result: 'Результат:' });
    } else if (section === 'blogPosts') {
      newContent.blogPosts.push({ title: 'Новая статья', date: new Date().toLocaleDateString('ru-RU'), category: 'Категория' });
    } else if (section === 'contacts') {
      newContent.contacts.push({ icon: 'Mail', title: 'Новый контакт', value: 'Значение' });
    } else if (section === 'menuItems') {
      newContent.menuItems.push({ id: 'new-section', label: 'Новый раздел' });
    }
    
    setContent(newContent);
    toast.success('Блок добавлен');
  };

  const removeItem = (section: string, index: number) => {
    const newContent = { ...content };
    (newContent as any)[section].splice(index, 1);
    setContent(newContent);
    toast.success('Блок удален');
  };

  const updateItem = (section: string, index: number, field: string, value: any) => {
    const newContent = { ...content };
    (newContent as any)[section][index][field] = value;
    setContent(newContent);
  };

  const iconOptions = ['Shield', 'SearchCheck', 'UserCheck', 'FileText', 'DollarSign', 'Scale', 'Lock', 'Eye', 'TrendingUp', 'Award', 'CheckCircle', 'MapPin', 'Phone', 'Mail', 'Globe'];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        isScrolled={isScrolled}
        content={content}
        setContent={setContent}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isAdminMode={isAdminMode}
        handleLogoUpload={handleLogoUpload}
        removeItem={removeItem}
        addItem={addItem}
      />

      <ContentSections
        content={content}
        setContent={setContent}
        isAdminMode={isAdminMode}
        updateItem={updateItem}
        removeItem={removeItem}
        addItem={addItem}
        iconOptions={iconOptions}
      />

      <Footer
        content={content}
        setContent={setContent}
        isAdminMode={isAdminMode}
        setShowAuthDialog={setShowAuthDialog}
      />

      <AdminPanel
        showAuthDialog={showAuthDialog}
        setShowAuthDialog={setShowAuthDialog}
        authPassword={authPassword}
        setAuthPassword={setAuthPassword}
        handleAuth={handleAuth}
        isAdminMode={isAdminMode}
        setIsAdminMode={setIsAdminMode}
      />
    </div>
  );
};

export default Index;
