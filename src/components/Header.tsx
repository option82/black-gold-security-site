import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  isScrolled: boolean;
  content: any;
  setContent: (content: any) => void;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isAdminMode: boolean;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeItem: (section: string, index: number) => void;
  addItem: (section: string) => void;
}

const Header = ({
  isScrolled,
  content,
  setContent,
  activeSection,
  scrollToSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  isAdminMode,
  handleLogoUpload,
  removeItem,
  addItem,
}: HeaderProps) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-lg glow-border' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center relative group">
            {content.logo ? (
              <img src={content.logo} alt="Logo" className="h-20 my50 mx-50object-contain py-0 px-0 object-contain" />
            ) : (
              <Icon name="Shield" className="text-primary" size={32} />
            )}
            {isAdminMode && (
              <div className="absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity z-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer text-xs bg-primary text-background px-2 py-1 rounded">
                  Изменить логотип
                </label>
              </div>
            )}
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {content.menuItems.map((item: any, index: number) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-xs font-medium transition-colors hover:text-gold uppercase tracking-wide ${
                    activeSection === item.id ? 'text-gold' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
                {isAdminMode && (
                  <button
                    onClick={() => removeItem('menuItems', index)}
                    className="absolute -top-6 right-0 opacity-0 group-hover:opacity-100 text-xs text-red-500"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            {isAdminMode && (
              <Button size="sm" variant="outline" onClick={() => addItem('menuItems')}>
                <Icon name="Plus" size={16} />
              </Button>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Button size="sm" className="hidden lg:inline-flex gold-gradient text-background font-semibold">
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
                  {content.menuItems.map((item: any) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-lg font-medium transition-colors hover:text-gold uppercase tracking-wide ${
                        activeSection === item.id ? 'text-gold' : 'text-muted-foreground'
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
  );
};

export default Header;