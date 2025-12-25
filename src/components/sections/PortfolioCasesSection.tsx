import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ImageUpload from '@/components/ImageUpload';

interface PortfolioCasesSectionProps {
  content: any;
  setContent: (content: any) => void;
  isAdminMode: boolean;
  updateItem: (section: string, index: number, field: string, value: any) => void;
  removeItem: (section: string, index: number) => void;
  addItem: (section: string) => void;
}

const PortfolioCasesSection = ({
  content,
  setContent,
  isAdminMode,
  updateItem,
  removeItem,
  addItem,
}: PortfolioCasesSectionProps) => {
  return (
    <>
      <section id="portfolio" className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-transparent via-card/30 to-transparent tech-pattern">
        <div className="container mx-auto max-w-7xl">
          <div className="section-backdrop">
          {isAdminMode ? (
            <Input
              value={content.portfolioTitle}
              onChange={(e) => setContent({ ...content, portfolioTitle: e.target.value })}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 text-foreground uppercase tracking-wider break-words px-2">{content.portfolioTitle}</h2>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {content.portfolio.map((item: any, index: number) => (
              <Card key={index} className="p-4 sm:p-6 cyber-card hover:shadow-[0_0_40px_rgba(244,208,63,0.2)] transition-all relative group flex flex-col">
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('portfolio', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 z-10"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                
                {item.image && !isAdminMode && (
                  <div className="mb-4">
                    <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded" />
                  </div>
                )}
                
                {isAdminMode && (
                  <div className="mb-4">
                    <ImageUpload
                      currentImage={item.image}
                      onImageUpload={(base64) => updateItem('portfolio', index, 'image', base64)}
                      label="Добавить изображение"
                    />
                  </div>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={item.result}
                    onChange={(e) => updateItem('portfolio', index, 'result', e.target.value)}
                    className="text-2xl sm:text-3xl font-bold text-primary mb-3 lg:mb-4 bg-transparent border-primary/30"
                  />
                ) : (
                  <div className="text-2xl sm:text-3xl font-bold text-gold mb-3 lg:mb-4">{item.result}</div>
                )}
                
                {isAdminMode ? (
                  <Input
                    value={item.title}
                    onChange={(e) => updateItem('portfolio', index, 'title', e.target.value)}
                    className="text-lg sm:text-xl font-bold mb-3 bg-transparent border-primary/30"
                  />
                ) : (
                  <h3 className="text-lg sm:text-xl font-bold mb-3 break-words">{item.title}</h3>
                )}
                
                {isAdminMode ? (
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateItem('portfolio', index, 'description', e.target.value)}
                    className="text-sm sm:text-base text-muted-foreground bg-muted flex-1"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-muted-foreground flex-1 break-words">{item.description}</p>
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
        </div>
        <div className="section-divider mt-12" />
      </section>

      <section id="cases" className="py-12 sm:py-16 lg:py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-blue-900/5 pointer-events-none" />
        <div className="container mx-auto relative z-10 max-w-7xl">
          <div className="section-backdrop">
          {isAdminMode ? (
            <Input
              value={content.casesTitle}
              onChange={(e) => setContent({ ...content, casesTitle: e.target.value })}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-16 text-foreground uppercase tracking-wider break-words px-2">{content.casesTitle}</h2>
          )}
          
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
            {content.cases.map((caseItem: any, index: number) => (
              <Card key={index} className="p-4 sm:p-6 lg:p-8 cyber-card hover:shadow-[0_0_40px_rgba(244,208,63,0.2)] transition-all relative group">
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('cases', index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500"
                  >
                    <Icon name="Trash2" size={16} />
                  </button>
                )}
                
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Icon name="CheckCircle" className="text-gold flex-shrink-0" size={24} />
                  <div className="flex-1">
                    {isAdminMode ? (
                      <Input
                        value={caseItem.title}
                        onChange={(e) => updateItem('cases', index, 'title', e.target.value)}
                        className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 bg-transparent border-primary/30"
                      />
                    ) : (
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 break-words">{caseItem.title}</h3>
                    )}
                    
                    {isAdminMode ? (
                      <Textarea
                        value={caseItem.description}
                        onChange={(e) => updateItem('cases', index, 'description', e.target.value)}
                        className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 bg-muted"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 break-words">{caseItem.description}</p>
                    )}
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
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
                          <span className="text-gold font-semibold">{caseItem.duration}</span>
                          <span className="text-gold font-semibold">{caseItem.result}</span>
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
        </div>
        <div className="section-divider mt-12" />
      </section>
    </>
  );
};

export default PortfolioCasesSection;