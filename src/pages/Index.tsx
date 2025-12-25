import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import ContentSections from "@/components/ContentSections";
import Footer from "@/components/Footer";
import AdminPanel from "@/components/AdminPanel";
import { saveContent, loadContent } from "@/lib/storage";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authPassword, setAuthPassword] = useState("");

  const [content, setContent] = useState({
    logo: "https://github.com/option82/black-gold-security-site/blob/main/photo_2025-12-18_16-02-54.png?raw=true",
    companyName: "",
    heroTitle: "Защита вашего бизнеса — наша профессия",
    heroSubtitle:
      "Комплексные решения по аутсорсингу службы безопасности для компаний любого масштаба",
    heroImage: "",
    heroImageSize: 400,
    aboutTitle: "О компании",
    aboutDescription:
      "Мы специализируемся на аутсорсинге служб безопасности для крупных и средних компаний. Наша команда экспертов с опытом работы в правоохранительных органах обеспечивает максимальную защиту вашего бизнеса от всех видов угроз.",
    aboutStats: [
      { value: "15+", label: "лет опыта" },
      { value: "300+", label: "довольных клиентов" },
      { value: "98%", label: "успешных проектов" },
    ],
    servicesTitle: "Наши услуги",
    servicesSubtitle: "Комплексные решения для защиты вашего бизнеса",
    services: [
      {
        title: "Проверка контрагентов",
        description:
          "Комплексная или выборочная проверка: анализ благонадежности, финансовой документации, кредитной истории, установление бенефициаров",
        icon: "SearchCheck",
        image: "",
      },
      {
        title: "Проверка кандидатов",
        description:
          "Тщательная проверка при приеме на работу для минимизации рисков",
        icon: "UserCheck",
        image: "",
      },
      {
        title: "Аналитические материалы",
        description:
          "Подготовка информационно-аналитических материалов по запросу клиента",
        icon: "FileText",
        image: "",
      },
      {
        title: "Финансовый аудит",
        description:
          "Анализ и решение вопросов, связанных с безопасностью предприятия",
        icon: "DollarSign",
        image: "",
      },
      {
        title: "Защита информации",
        description:
          "Контроль коммерческой тайны. DLP, SIEM, антивирусные комплексы",
        icon: "Shield",
        image: "",
      },
      {
        title: "Антикоррупционная политика",
        description:
          "Разработка и реализация, выявление внутрикорпоративных злоупотреблений",
        icon: "Scale",
        image: "",
      },
    ],
    portfolioTitle: "Портфолио",
    portfolio: [
      {
        title: "Крупный производственный холдинг",
        description:
          "Выявили схему хищений на сумму 45 млн руб. Взыскано 100% ущерба",
        result: "45 млн ₽",
        image: "",
      },
      {
        title: "Строительная компания",
        description:
          "Проверка объемов работ подрядчиков. Предотвращено завышение стоимости на 28 млн руб",
        result: "28 млн ₽",
        image: "",
      },
      {
        title: "Логистическая компания",
        description:
          "Комплексная проверка 150 контрагентов. Исключены 12 недобросовестных партнеров",
        result: "150 проверок",
        image: "",
      },
    ],
    casesTitle: "Успешные кейсы",
    cases: [
      {
        title: "Металлургический комбинат",
        description:
          "Проведена комплексная проверка системы закупок. Выявлены 8 схем необоснованного завышения стоимости ТМЦ. Экономия бюджета составила 67 млн рублей за год.",
        duration: "Срок: 3 месяца",
        result: "Результат: 67 млн ₽",
      },
      {
        title: "Торговая сеть",
        description:
          "Внедрена система контроля персонала и DLP-решение. Предотвращена утечка коммерческой тайны. Выявлены 3 случая промышленного шпионажа.",
        duration: "Срок: 2 месяца",
        result: "3 выявленных случая",
      },
    ],
    blogTitle: "Экспертный блог",
    blogPosts: [
      {
        title: "Как проверить контрагента перед заключением сделки",
        date: "15 декабря 2024",
        category: "Безопасность бизнеса",
        content:
          "Проверка контрагента — обязательный этап перед заключением любой сделки. В статье мы рассмотрим основные шаги: проверка регистрационных данных, анализ финансовой отчетности, изучение репутации и судебных дел. Это позволит избежать финансовых потерь и репутационных рисков.",
        images: [],
      },
      {
        title: "DLP-системы: зачем они нужны вашему бизнесу",
        date: "10 декабря 2024",
        category: "Защита информации",
        content:
          "DLP (Data Loss Prevention) — это система предотвращения утечки конфиденциальной информации. Она контролирует передачу данных через email, мессенджеры, USB-носители. Внедрение DLP позволяет защитить коммерческую тайну и предотвратить промышленный шпионаж.",
        images: [],
      },
      {
        title: "Признаки недобросовестного подрядчика",
        date: "5 декабря 2024",
        category: "Аудит",
        content:
          "Недобросовестные подрядчики могут нанести серьезный ущерб бизнесу. Основные признаки: завышение стоимости работ, нарушение сроков, плохое качество выполнения, отсутствие документов. Профессиональный аудит поможет выявить проблемы на ранней стадии.",
        images: [],
      },
    ],
    contactsTitle: "Контакты",
    contacts: [
      { icon: "MapPin", title: "Адрес", value: "г.Новокузнецк" },
      { icon: "Phone", title: "Телефон", value: "+7 983 252 3222" },
      { icon: "Mail", title: "Email", value: " info@zaschitabusinessa.ru " },
    ],
    footerText: "© 2026 Защита Бизнеса. Все права защищены.",
    menuItems: [
      { id: "home", label: "Главная" },
      { id: "about", label: "О компании" },
      { id: "services", label: "Услуги" },
      { id: "portfolio", label: "Портфолио" },
      { id: "cases", label: "Кейсы" },
      { id: "blog", label: "Блог" },
      { id: "contacts", label: "Контакты" },
    ],
  });

  const loadStoredContent = useCallback(async () => {
    try {
      const stored = await loadContent();
      if (stored) {
        setContent(prev => ({
          ...prev,
          ...(stored.logo && { logo: stored.logo }),
          ...(stored.hero && { 
            heroTitle: stored.hero.title, 
            heroSubtitle: stored.hero.subtitle,
            heroImage: stored.hero.image,
            heroImageSize: stored.hero.imageSize
          }),
          ...(stored.services && { 
            servicesTitle: stored.services.title,
            servicesSubtitle: stored.services.subtitle,
            services: stored.services.items 
          }),
          ...(stored.blog && { 
            blogTitle: stored.blog.title,
            blogPosts: stored.blog.posts 
          }),
          ...(stored.about && { 
            aboutTitle: stored.about.title, 
            aboutDescription: stored.about.description, 
            aboutStats: stored.about.stats 
          }),
          ...(stored.portfolio && { portfolioTitle: stored.portfolio.title, portfolio: stored.portfolio.items }),
          ...(stored.cases && { casesTitle: stored.cases.title, cases: stored.cases.items }),
          ...(stored.contacts && { 
            contactsTitle: stored.contacts.title, 
            contacts: stored.contacts.contacts 
          }),
          ...(stored.footer && { footerText: stored.footer.text })
        }));
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }, []);

  useEffect(() => {
    loadStoredContent();
  }, [loadStoredContent]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        await saveContent({
          logo: content.logo,
          hero: { 
            title: content.heroTitle, 
            subtitle: content.heroSubtitle,
            image: content.heroImage,
            imageSize: content.heroImageSize
          },
          services: {
            title: content.servicesTitle,
            subtitle: content.servicesSubtitle,
            items: content.services
          },
          blog: {
            title: content.blogTitle,
            posts: content.blogPosts
          },
          about: { title: content.aboutTitle, description: content.aboutDescription, stats: content.aboutStats },
          portfolio: { title: content.portfolioTitle, items: content.portfolio },
          cases: { title: content.casesTitle, items: content.cases },
          contacts: { title: content.contactsTitle, contacts: content.contacts },
          footer: { text: content.footerText }
        });
      } catch (error) {
        console.error('Error auto-saving content:', error);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = [
        "home",
        "about",
        "services",
        "portfolio",
        "cases",
        "blog",
        "contacts",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleAuth = () => {
    if (authPassword === "Adminzachitabusinessa!QAZ") {
      setIsAdminMode(true);
      setShowAuthDialog(false);
      toast.success("Вы вошли в режим администратора");
    } else {
      toast.error("Неверный пароль");
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent({ ...content, logo: reader.result as string });
        toast.success("Логотип загружен");
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = useCallback((section: string) => {
    setContent(prev => {
      const newContent = { ...prev };

      if (section === "aboutStats") {
        newContent.aboutStats.push({ value: "0", label: "Новый показатель" });
      } else if (section === "services") {
        newContent.services.push({
          title: "Новая услуга",
          description: "Описание услуги",
          icon: "Shield",
          image: "",
        });
      } else if (section === "portfolio") {
        newContent.portfolio.push({
          title: "Новый проект",
          description: "Описание проекта",
          result: "0",
          image: "",
        });
      } else if (section === "cases") {
        newContent.cases.push({
          title: "Новый кейс",
          description: "Описание кейса",
          duration: "Срок:",
          result: "Результат:",
        });
      } else if (section === "blogPosts") {
        newContent.blogPosts.push({
          title: "Новая статья",
          date: new Date().toLocaleDateString("ru-RU"),
          category: "Категория",
          content: "Содержимое статьи...",
          images: [],
        });
      } else if (section === "contacts") {
        newContent.contacts.push({
          icon: "Mail",
          title: "Новый контакт",
          value: "Значение",
        });
      } else if (section === "menuItems") {
        newContent.menuItems.push({ id: "new-section", label: "Новый раздел" });
      }

      return newContent;
    });
    toast.success("Блок добавлен");
  }, []);

  const removeItem = useCallback((section: string, index: number) => {
    setContent(prev => {
      const newContent = { ...prev };
      (newContent as any)[section].splice(index, 1);
      return newContent;
    });
    toast.success("Блок удален");
  }, []);

  const updateItem = useCallback((
    section: string,
    index: number,
    field: string,
    value: any,
  ) => {
    setContent(prev => {
      const newContent = { ...prev };
      (newContent as any)[section][index][field] = value;
      return newContent;
    });
  }, []);

  const iconOptions = [
    "Shield",
    "SearchCheck",
    "UserCheck",
    "FileText",
    "DollarSign",
    "Scale",
    "Lock",
    "Eye",
    "TrendingUp",
    "Award",
    "CheckCircle",
    "MapPin",
    "Phone",
    "Mail",
    "Globe",
  ];

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
        scrollToSection={scrollToSection}
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