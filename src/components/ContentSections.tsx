import HeroSection from './sections/HeroSection';
import AboutServicesSection from './sections/AboutServicesSection';
import PortfolioCasesSection from './sections/PortfolioCasesSection';
import BlogContactsSection from './sections/BlogContactsSection';

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
      <HeroSection
        content={content}
        setContent={setContent}
        isAdminMode={isAdminMode}
      />

      <AboutServicesSection
        content={content}
        setContent={setContent}
        isAdminMode={isAdminMode}
        updateItem={updateItem}
        removeItem={removeItem}
        addItem={addItem}
        iconOptions={iconOptions}
      />

      <PortfolioCasesSection
        content={content}
        setContent={setContent}
        isAdminMode={isAdminMode}
        updateItem={updateItem}
        removeItem={removeItem}
        addItem={addItem}
      />

      <BlogContactsSection
        content={content}
        setContent={setContent}
        isAdminMode={isAdminMode}
        updateItem={updateItem}
        removeItem={removeItem}
        addItem={addItem}
        iconOptions={iconOptions}
      />
    </>
  );
};

export default ContentSections;
