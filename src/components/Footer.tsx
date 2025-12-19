import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface FooterProps {
  content: any;
  setContent: (content: any) => void;
  isAdminMode: boolean;
  setShowAuthDialog: (show: boolean) => void;
}

const Footer = ({ content, setContent, isAdminMode, setShowAuthDialog }: FooterProps) => {
  return (
    <footer className="bg-card py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            {content.logo ? (
              <img src={content.logo} alt="Logo" className="h-6 w-6 object-contain" />
            ) : (
              <Icon name="Shield" className="text-primary" size={24} />
            )}
            <span className="text-lg font-bold text-primary">{content.companyName}</span>
          </div>
          
          {isAdminMode ? (
            <Input
              value={content.footerText}
              onChange={(e) => setContent({ ...content, footerText: e.target.value })}
              className="text-muted-foreground text-sm bg-transparent border-primary/30 mb-4 md:mb-0"
            />
          ) : (
            <p className="text-muted-foreground text-sm">{content.footerText}</p>
          )}
          
          <button
            onClick={() => setShowAuthDialog(true)}
            className="text-xs text-muted-foreground/50 hover:text-primary transition-colors mt-4 md:mt-0"
          >
            admin
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
