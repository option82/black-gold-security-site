import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import ArticleImageEditor from '@/components/ArticleImageEditor';

interface BlogContactsSectionProps {
  content: any;
  setContent: (content: any) => void;
  isAdminMode: boolean;
  updateItem: (section: string, index: number, field: string, value: any) => void;
  removeItem: (section: string, index: number) => void;
  addItem: (section: string) => void;
  iconOptions: string[];
}

const BlogContactsSection = ({
  content,
  setContent,
  isAdminMode,
  updateItem,
  removeItem,
  addItem,
  iconOptions,
}: BlogContactsSectionProps) => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showArticleDialog, setShowArticleDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setShowArticleDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/e8762d55-c19f-4166-bef2-57db3c6eb8a5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Заявка успешно отправлена!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(result.error || 'Ошибка при отправке');
      }
    } catch (error) {
      toast.error('Ошибка при отправке заявки');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="blog" className="py-20 px-4 bg-gradient-to-b from-transparent via-card/30 to-transparent tech-pattern">
        <div className="container mx-auto">
          <div className="section-backdrop">
          {isAdminMode ? (
            <Input
              value={content.blogTitle}
              onChange={(e) => setContent({ ...content, blogTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-16 text-foreground uppercase tracking-wider">{content.blogTitle}</h2>
          )}
          
          <div className="grid md:grid-cols-3 gap-8">
            {content.blogPosts.map((post: any, index: number) => (
              <Card 
                key={index} 
                className="p-6 cyber-card hover:shadow-[0_0_40px_rgba(244,208,63,0.2)] transition-all cursor-pointer relative group"
                onClick={() => !isAdminMode && handlePostClick(post)}
              >
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
                  <div className="text-sm text-gold mb-2 uppercase tracking-wide">{post.category}</div>
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
                
                {isAdminMode && (
                  <div className="mt-4">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePostClick(post);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <Icon name="Edit" size={14} className="mr-2" />
                      Редактировать статью
                    </Button>
                  </div>
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
        </div>
        <div className="section-divider mt-12" />
      </section>

      <section id="contacts" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-blue-900/5 pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <div className="section-backdrop">
          {isAdminMode ? (
            <Input
              value={content.contactsTitle}
              onChange={(e) => setContent({ ...content, contactsTitle: e.target.value })}
              className="text-4xl font-bold text-center mb-16 bg-transparent border-primary/30"
            />
          ) : (
            <h2 className="text-4xl font-bold text-center mb-16 text-foreground uppercase tracking-wider">{content.contactsTitle}</h2>
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
                    <Icon name={contact.icon as any} className="text-gold flex-shrink-0" size={24} />
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
            
            <Card className="p-6 cyber-card">
              <h3 className="text-xl font-bold mb-4 text-gold">Напишите нам</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input 
                  placeholder="Ваше имя" 
                  className="bg-muted" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input 
                  placeholder="Email" 
                  type="email"
                  className="bg-muted" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input 
                  placeholder="Телефон" 
                  type="tel"
                  className="bg-muted" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
                <Textarea 
                  placeholder="Сообщение" 
                  className="bg-muted" 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full gold-gradient text-background font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </Button>
              </form>
            </Card>
          </div>
          </div>
        </div>
        <div className="section-divider mt-12" />
      </section>

      <Dialog open={showArticleDialog} onOpenChange={setShowArticleDialog}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto cyber-card">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gold mb-2">{selectedPost?.title}</DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="text-gold uppercase tracking-wide">{selectedPost?.category}</span>
              <span>{selectedPost?.date}</span>
            </div>
          </DialogHeader>
          <div className="mt-4 space-y-6">
            {isAdminMode ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Текст статьи</label>
                  <Textarea
                    value={selectedPost?.content || ''}
                    onChange={(e) => {
                      const postIndex = content.blogPosts.findIndex((p: any) => p === selectedPost);
                      if (postIndex !== -1) {
                        updateItem('blogPosts', postIndex, 'content', e.target.value);
                        setSelectedPost({ ...selectedPost, content: e.target.value });
                      }
                    }}
                    className="min-h-[200px] bg-muted"
                    placeholder="Текст статьи..."
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Изображения статьи</label>
                  <ArticleImageEditor
                    images={selectedPost?.images || []}
                    onImagesChange={(images) => {
                      const postIndex = content.blogPosts.findIndex((p: any) => p === selectedPost);
                      if (postIndex !== -1) {
                        updateItem('blogPosts', postIndex, 'images', images);
                        setSelectedPost({ ...selectedPost, images });
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedPost?.content || 'Содержимое статьи не добавлено'}
                </div>
                
                {selectedPost?.images && selectedPost.images.length > 0 && (
                  <div className="space-y-4">
                    {selectedPost.images.map((image: any) => (
                      <div key={image.id} className={`${
                        image.position === 'left' ? 'text-left' : 
                        image.position === 'right' ? 'text-right' : 'text-center'
                      }`}>
                        <img 
                          src={image.src} 
                          alt="Article" 
                          className="rounded inline-block"
                          style={{ width: `${image.width}%`, maxWidth: '100%' }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BlogContactsSection;