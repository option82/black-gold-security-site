import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContentSectionsProps {
  content: any;
  setContent: (content: any) => void;
  isAdminMode: boolean;
  updateItem: (section: string, index: number, field: string, value: any) => void;
  removeItem: (section: string, index: number) => void;
  addItem: (section: string) => void;
  iconOptions: string[];
}

const ContentSections = ({
  content,
  setContent,
  isAdminMode,
  updateItem,
  removeItem,
  addItem,
  iconOptions,
}: ContentSectionsProps) => {
  return (
    <>
      <section id="home" className="pt-32 pb-20 px-4 min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              {isAdminMode ? (
                <Textarea
                  value={content.heroTitle}
                  onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                  className="text-5xl lg:text-6xl font-bold leading-tight bg-muted h-32"
                />
              ) : (
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
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
          {isAdminMode ? (
            <Input
              value={content.aboutTitle}
              onChange={(e) => setContent({ ...content, aboutTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-16">{content.aboutTitle}</h2>
          )}
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {content.aboutStats.map((stat: any, index: number) => (
              <Card key={index} className="p-8 text-center bg-background border-primary/20 hover:border-primary transition-all relative group">
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('aboutStats', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 text-sm"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                {isAdminMode ? (
                  <Input
                    value={stat.value}
                    onChange={(e) => updateItem('aboutStats', index, 'value', e.target.value)}
                    className="text-5xl font-bold text-primary mb-4 text-center bg-transparent border-primary/30"
                  />
                ) : (
                  <div className="text-5xl font-bold text-primary mb-4">{stat.value}</div>
                )}
                {isAdminMode ? (
                  <Input
                    value={stat.label}
                    onChange={(e) => updateItem('aboutStats', index, 'label', e.target.value)}
                    className="text-xl text-muted-foreground text-center bg-transparent border-primary/30"
                  />
                ) : (
                  <p className="text-xl text-muted-foreground">{stat.label}</p>
                )}
              </Card>
            ))}
          </div>
          
          {isAdminMode && (
            <div className="text-center mb-8">
              <Button onClick={() => addItem('aboutStats')} variant="outline">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить показатель
              </Button>
            </div>
          )}
          
          {isAdminMode ? (
            <Textarea
              value={content.aboutDescription}
              onChange={(e) => setContent({ ...content, aboutDescription: e.target.value })}
              className="text-lg text-center text-muted-foreground max-w-3xl mx-auto bg-muted"
            />
          ) : (
            <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
              {content.aboutDescription}
            </p>
          )}
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          {isAdminMode ? (
            <Input
              value={content.servicesTitle}
              onChange={(e) => setContent({ ...content, servicesTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-4 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-4">{content.servicesTitle}</h2>
          )}
          
          {isAdminMode ? (
            <Input
              value={content.servicesSubtitle}
              onChange={(e) => setContent({ ...content, servicesSubtitle: e.target.value })}
              className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto bg-transparent border-primary/30"
            />
          ) : (
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              {content.servicesSubtitle}
            </p>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.map((service: any, index: number) => (
              <Card
                key={index}
                className="p-6 bg-card border-primary/20 hover:border-primary transition-all hover:scale-105 duration-300 relative group"
              >
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('services', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 z-10"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                
                {isAdminMode ? (
                  <Select
                    value={service.icon}
                    onValueChange={(value) => updateItem('services', index, 'icon', value)}
                  >
                    <SelectTrigger className="w-full mb-4">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          <div className="flex items-center">
                            <Icon name={icon as any} size={20} className="mr-2" />
                            {icon}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Icon name={service.icon as any} className="text-primary mb-4" size={40} />
                )}
                
                {isAdminMode ? (
                  <Input
                    value={service.title}
                    onChange={(e) => updateItem('services', index, 'title', e.target.value)}
                    className="text-xl font-bold mb-3 bg-transparent border-primary/30"
                  />
                ) : (
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                )}
                
                {isAdminMode ? (
                  <Textarea
                    value={service.description}
                    onChange={(e) => updateItem('services', index, 'description', e.target.value)}
                    className="text-muted-foreground bg-muted"
                  />
                ) : (
                  <p className="text-muted-foreground">{service.description}</p>
                )}
              </Card>
            ))}
          </div>
          
          {isAdminMode && (
            <div className="text-center mt-8">
              <Button onClick={() => addItem('services')} variant="outline">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить услугу
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="portfolio" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          {isAdminMode ? (
            <Input
              value={content.portfolioTitle}
              onChange={(e) => setContent({ ...content, portfolioTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-16">{content.portfolioTitle}</h2>
          )}
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.portfolio.map((item: any, index: number) => (
              <Card key={index} className="p-6 bg-background border-primary/20 relative group">
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('portfolio', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={item.result}
                    onChange={(e) => updateItem('portfolio', index, 'result', e.target.value)}
                    className="text-3xl font-bold text-primary mb-4 bg-transparent border-primary/30"
                  />
                ) : (
                  <div className="text-3xl font-bold text-primary mb-4">{item.result}</div>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={item.title}
                    onChange={(e) => updateItem('portfolio', index, 'title', e.target.value)}
                    className="text-xl font-bold mb-3 bg-transparent border-primary/30"
                  />
                ) : (
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                )}
                
                {isAdminMode ? (
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateItem('portfolio', index, 'description', e.target.value)}
                    className="text-muted-foreground bg-muted"
                  />
                ) : (
                  <p className="text-muted-foreground">{item.description}</p>
                )}
              </Card>
            ))}
          </div>
          
          {isAdminMode && (
            <div className="text-center mt-8">
              <Button onClick={() => addItem('portfolio')} variant="outline">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить проект
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="cases" className="py-20 px-4">
        <div className="container mx-auto">
          {isAdminMode ? (
            <Input
              value={content.casesTitle}
              onChange={(e) => setContent({ ...content, casesTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-16">{content.casesTitle}</h2>
          )}
          
          <div className="max-w-4xl mx-auto space-y-8">
            {content.cases.map((caseItem: any, index: number) => (
              <Card key={index} className="p-8 bg-card border-primary/20 relative group">
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('cases', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                
                <div className="flex items-start space-x-4">
                  <Icon name="CheckCircle" className="text-primary flex-shrink-0" size={32} />
                  <div className="flex-1">
                    {isAdminMode ? (
                      <Input
                        value={caseItem.title}
                        onChange={(e) => updateItem('cases', index, 'title', e.target.value)}
                        className="text-2xl font-bold mb-3 bg-transparent border-primary/30"
                      />
                    ) : (
                      <h3 className="text-2xl font-bold mb-3">{caseItem.title}</h3>
                    )}
                    
                    {isAdminMode ? (
                      <Textarea
                        value={caseItem.description}
                        onChange={(e) => updateItem('cases', index, 'description', e.target.value)}
                        className="text-muted-foreground mb-4 bg-muted"
                      />
                    ) : (
                      <p className="text-muted-foreground mb-4">{caseItem.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm">
                      {isAdminMode ? (
                        <>
                          <Input
                            value={caseItem.duration}
                            onChange={(e) => updateItem('cases', index, 'duration', e.target.value)}
                            className="text-primary font-semibold bg-transparent border-primary/30"
                          />
                          <Input
                            value={caseItem.result}
                            onChange={(e) => updateItem('cases', index, 'result', e.target.value)}
                            className="text-primary font-semibold bg-transparent border-primary/30"
                          />
                        </>
                      ) : (
                        <>
                          <span className="text-primary font-semibold">{caseItem.duration}</span>
                          <span className="text-primary font-semibold">{caseItem.result}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {isAdminMode && (
            <div className="text-center mt-8">
              <Button onClick={() => addItem('cases')} variant="outline">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить кейс
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="blog" className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          {isAdminMode ? (
            <Input
              value={content.blogTitle}
              onChange={(e) => setContent({ ...content, blogTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-16">{content.blogTitle}</h2>
          )}
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.blogPosts.map((post: any, index: number) => (
              <Card key={index} className="p-6 bg-background border-primary/20 hover:border-primary transition-all cursor-pointer relative group">
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('blogPosts', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={post.category}
                    onChange={(e) => updateItem('blogPosts', index, 'category', e.target.value)}
                    className="text-sm text-primary mb-2 bg-transparent border-primary/30"
                  />
                ) : (
                  <div className="text-sm text-primary mb-2">{post.category}</div>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={post.title}
                    onChange={(e) => updateItem('blogPosts', index, 'title', e.target.value)}
                    className="text-xl font-bold mb-3 bg-transparent border-primary/30"
                  />
                ) : (
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={post.date}
                    onChange={(e) => updateItem('blogPosts', index, 'date', e.target.value)}
                    className="text-sm text-muted-foreground bg-transparent border-primary/30"
                  />
                ) : (
                  <div className="text-sm text-muted-foreground">{post.date}</div>
                )}
              </Card>
            ))}
          </div>
          
          {isAdminMode && (
            <div className="text-center mt-8">
              <Button onClick={() => addItem('blogPosts')} variant="outline">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить статью
              </Button>
            </div>
          )}
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto">
          {isAdminMode ? (
            <Input
              value={content.contactsTitle}
              onChange={(e) => setContent({ ...content, contactsTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-16">{content.contactsTitle}</h2>
          )}
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              {content.contacts.map((contact: any, index: number) => (
                <div key={index} className="flex items-start space-x-4 relative group">
                  {isAdminMode && (
                    <button
                      onClick={() => removeItem('contacts', index)}
                      className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 text-red-500 z-10"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  )}
                  
                  {isAdminMode ? (
                    <Select
                      value={contact.icon}
                      onValueChange={(value) => updateItem('contacts', index, 'icon', value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            <Icon name={icon as any} size={20} />
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Icon name={contact.icon as any} className="text-primary flex-shrink-0" size={24} />
                  )}
                  
                  <div className="flex-1">
                    {isAdminMode ? (
                      <Input
                        value={contact.title}
                        onChange={(e) => updateItem('contacts', index, 'title', e.target.value)}
                        className="font-bold mb-1 bg-transparent border-primary/30"
                      />
                    ) : (
                      <h3 className="font-bold mb-1">{contact.title}</h3>
                    )}
                    
                    {isAdminMode ? (
                      <Input
                        value={contact.value}
                        onChange={(e) => updateItem('contacts', index, 'value', e.target.value)}
                        className="text-muted-foreground bg-transparent border-primary/30"
                      />
                    ) : (
                      <p className="text-muted-foreground">{contact.value}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {isAdminMode && (
                <Button onClick={() => addItem('contacts')} variant="outline" size="sm">
                  <Icon name="Plus" className="mr-2" size={16} />
                  Добавить контакт
                </Button>
              )}
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
    </>
  );
};

export default ContentSections;
