import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from '@/components/ImageUpload';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import SortableCard from '@/components/SortableCard';

interface AboutServicesSectionProps {
  content: any;
  setContent: (content: any) => void;
  isAdminMode: boolean;
  updateItem: (section: string, index: number, field: string, value: any) => void;
  removeItem: (section: string, index: number) => void;
  addItem: (section: string) => void;
  iconOptions: string[];
}

const AboutServicesSection = ({
  content,
  setContent,
  isAdminMode,
  updateItem,
  removeItem,
  addItem,
  iconOptions,
}: AboutServicesSectionProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent, section: string) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = content[section].findIndex((item: any, idx: number) => `${section}-${idx}` === active.id);
      const newIndex = content[section].findIndex((item: any, idx: number) => `${section}-${idx}` === over.id);
      
      const newItems = arrayMove(content[section], oldIndex, newIndex);
      setContent({ ...content, [section]: newItems });
    }
  };

  return (
    <>
      <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 from-transparent via-card/30 to-transparent tech-pattern bg-transparent">
        <div className="container mx-auto max-w-7xl">
          <div className="section-backdrop">
          {isAdminMode ? (
            <Input
              value={content.aboutTitle}
              onChange={(e) => setContent({ ...content, aboutTitle: e.target.value })}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 text-foreground uppercase tracking-wider break-words px-2">{content.aboutTitle}</h2>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 lg:mb-16">
            {content.aboutStats.map((stat: any, index: number) => (
              <Card key={index} className="p-6 sm:p-8 text-center cyber-card hover:shadow-[0_0_40px_rgba(244,208,63,0.2)] transition-all relative group">
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
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3 lg:mb-4 text-center bg-transparent border-primary/30"
                  />
                ) : (
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gold mb-3 lg:mb-4">{stat.value}</div>
                )}
                {isAdminMode ? (
                  <Input
                    value={stat.label}
                    onChange={(e) => updateItem('aboutStats', index, 'label', e.target.value)}
                    className="text-base sm:text-lg lg:text-xl text-muted-foreground text-center bg-transparent border-primary/30"
                  />
                ) : (
                  <p className="text-base sm:text-lg lg:text-xl text-muted-foreground break-words">{stat.label}</p>
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
              className="text-base sm:text-lg text-center text-muted-foreground max-w-3xl mx-auto bg-muted px-2"
            />
          ) : (
            <p className="text-base sm:text-lg text-center text-muted-foreground max-w-3xl mx-auto break-words px-2">
              {content.aboutDescription}
            </p>
          )}
          </div>
        </div>
      </section>

      <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-radial from-blue-950/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto relative z-10 max-w-7xl">
          <div className="section-backdrop">
          {isAdminMode ? (
            <Input
              value={content.servicesTitle}
              onChange={(e) => setContent({ ...content, servicesTitle: e.target.value })}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 lg:mb-4 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-3 lg:mb-4 text-foreground uppercase tracking-wider break-words px-2">{content.servicesTitle}</h2>
          )}
          
          {isAdminMode ? (
            <Input
              value={content.servicesSubtitle}
              onChange={(e) => setContent({ ...content, servicesSubtitle: e.target.value })}
              className="text-center text-muted-foreground mb-8 lg:mb-16 max-w-2xl mx-auto bg-transparent border-primary/30"
            />
          ) : (
            <p className="text-sm sm:text-base text-center text-muted-foreground mb-8 lg:mb-16 max-w-2xl mx-auto break-words px-2">
              {content.servicesSubtitle}
            </p>
          )}
          
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(e) => handleDragEnd(e, 'services')}
          >
            <SortableContext
              items={content.services.map((_: any, idx: number) => `services-${idx}`)}
              strategy={rectSortingStrategy}
              disabled={!isAdminMode}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {content.services.map((service: any, index: number) => (
                  <SortableCard key={`services-${index}`} id={`services-${index}`} disabled={!isAdminMode}>
                    <Card className={`p-4 sm:p-6 cyber-card hover:shadow-[0_0_40px_rgba(244,208,63,0.2)] transition-all relative group ${isAdminMode ? 'cursor-move' : 'hover:scale-105 duration-300'}`}>
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('services', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 z-10"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                
                {isAdminMode ? (
                  <div className="mb-4 space-y-2">
                    <ImageUpload
                      currentImage={service.image}
                      onImageUpload={(base64) => updateItem('services', index, 'image', base64)}
                      label="Иконка/Изображение"
                      showPreview={false}
                    />
                    <Select
                      value={service.icon}
                      onValueChange={(value) => updateItem('services', index, 'icon', value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Или выберите иконку" />
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
                  </div>
                ) : (
                  <div className="mb-4 flex justify-center">
                    {service.image ? (
                      <img src={service.image} alt={service.title} className="w-16 h-16 object-contain" />
                    ) : (
                      <Icon name={service.icon as any} className="text-gold" size={48} />
                    )}
                  </div>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={service.title}
                    onChange={(e) => updateItem('services', index, 'title', e.target.value)}
                    className="text-lg sm:text-xl font-bold mb-3 bg-transparent border-primary/30"
                  />
                ) : (
                  <h3 className="text-lg sm:text-xl font-bold mb-3 break-words">{service.title}</h3>
                )}
                
                {isAdminMode ? (
                  <Textarea
                    value={service.description}
                    onChange={(e) => updateItem('services', index, 'description', e.target.value)}
                    className="text-sm sm:text-base text-muted-foreground bg-muted"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-muted-foreground break-words">{service.description}</p>
                )}
                    </Card>
                  </SortableCard>
                ))}
              </div>
            </SortableContext>
          </DndContext>
          
          {isAdminMode && (
            <div className="text-center mt-8">
              <Button onClick={() => addItem('services')} variant="outline">
                <Icon name="Plus" className="mr-2" size={16} />
                Добавить услугу
              </Button>
            </div>
          )}
          </div>
        </div>
        <div className="section-divider mt-12" />
      </section>
    </>
  );
};

export default AboutServicesSection;