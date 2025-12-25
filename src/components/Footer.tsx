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
    <footer className="bg-gradient-to-t from-card/50 to-transparent py-6 sm:py-8 px-4 glow-border border-t">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            {content.logo && (
              <img src={content.logo} alt="Logo" className="h-16 sm:h-20 w-auto object-contain py-0 px-0" />
            )}
          </div>
          
          {isAdminMode ? (
            <Input
              value={content.footerText}
              onChange={(e) => setContent({ ...content, footerText: e.target.value })}
              className="text-muted-foreground text-xs sm:text-sm bg-transparent border-primary/30 text-center md:text-left"
            />
          ) : (
            <p className="text-muted-foreground text-xs sm:text-sm text-center md:text-left break-words px-2">{content.footerText}</p>
          )}
          
          <button
            onClick={() => setShowAuthDialog(true)}
            className="text-xs text-muted-foreground/50 hover:text-gold transition-colors"
          >
            admin
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;