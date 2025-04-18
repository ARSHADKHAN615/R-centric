'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface CloudinaryUploadWidgetInfo {
  secure_url: string;
}

interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    backgroundVideo?: string;
  };
  about: {
    heading: string;
    subheading: string;
    description: string;
    image: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  parallaxSections: Array<{
    image: string;
    title: string;
    description: string;
  }>;
  features: Array<{
    title: string;
    description: string;
    image: string;
  }>;
  footer: {
    logo: string;
    tagline: string;
    description: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      linkedin: string;
      twitter: string;
    };
  };
}

const defaultContent: ContentData = {
  hero: {
    title: 'LUXURY LIVING REDEFINED',
    subtitle: 'Experience the epitome of sophistication in the heart of the city',
    backgroundImage: '/default-hero.jpg',
    backgroundVideo: '/intro_video.mp4',
  },
  about: {
    heading: 'A LEGACY OF LUXURY',
    subheading: 'Creating Timeless Experiences',
    description: 'Nestled in the most prestigious location, our development stands as a testament to architectural excellence and luxurious living.',
    image: '/about.jpg',
    stats: [
      { value: '45+', label: 'FLOORS' },
      { value: '200', label: 'RESIDENCES' },
      { value: '5★', label: 'AMENITIES' },
      { value: '24/7', label: 'CONCIERGE' },
    ],
  },
  parallaxSections: [
    {
      image: '/parallax1.jpg',
      title: 'LUXURIOUS INTERIORS',
      description: 'Step into a world where every detail has been meticulously crafted to create an atmosphere of unparalleled luxury and sophistication.',
    },
    {
      image: '/parallax2.jpg',
      title: 'PANORAMIC VIEWS',
      description: 'Experience breathtaking vistas that stretch as far as the eye can see, offering a daily reminder of the extraordinary life that awaits.',
    }
  ],
  features: [
    {
      title: 'Luxurious Living Spaces',
      description: 'Experience the epitome of comfort and style in our meticulously designed living spaces.',
      image: '/feature1.jpg',
    },
    {
      title: 'World-Class Amenities',
      description: 'Indulge in our extensive range of amenities, from state-of-the-art fitness centers to serene spa facilities.',
      image: '/feature2.jpg',
    },
  ],
  footer: {
    logo: '/logo.png',
    tagline: 'Experience Luxury Living',
    description: 'Nestled in the most prestigious location, our development stands as a testament to architectural excellence and luxurious living.',
    socialLinks: {
      facebook: 'https://facebook.com/luxuryliving',
      instagram: 'https://instagram.com/luxuryliving',
      linkedin: 'https://linkedin.com/company/luxuryliving',
      twitter: 'https://twitter.com/luxuryliving',
    },
  },
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content');
        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }
        const data = await response.json();
        setContent({
          ...defaultContent,
          ...data,
          parallaxSections: data.parallaxSections || defaultContent.parallaxSections,
          features: data.features || defaultContent.features,
          hero: {
            ...defaultContent.hero,
            ...(data.hero || {}),
          },
          about: {
            ...defaultContent.about,
            ...(data.about || {}),
          },
          footer: {
            ...defaultContent.footer,
            ...(data.footer || {}),
          },
        });
      } catch (error) {
        console.error('Error fetching content:', error);
        toast.error('Failed to fetch content. Using default content.');
        setContent(defaultContent);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save content');
      }
      
      toast.success('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-8 font-inter">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-light">Content Management</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" onClick={() => window.open('/', '_blank')} className="flex items-center">
            <ExternalLink className="mr-2 h-4 w-4" />
            Go to Site
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 gap-4 h-full">
          <TabsTrigger value="hero" className="text-xs sm:text-sm">Hero</TabsTrigger>
          <TabsTrigger value="about" className="text-xs sm:text-sm">About</TabsTrigger>
          <TabsTrigger value="parallax" className="text-xs sm:text-sm">Parallax</TabsTrigger>
          <TabsTrigger value="features" className="text-xs sm:text-sm">Features</TabsTrigger>
          <TabsTrigger value="footer" className="text-xs sm:text-sm">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Manage your hero section content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={content.hero.title}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, title: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subtitle</label>
                <Input
                  value={content.hero.subtitle}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, subtitle: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Background Image</label>
                <div className="flex flex-col gap-4">
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                    onSuccess={(result) => {
                      const info = result.info as CloudinaryUploadWidgetInfo;
                      setContent(prevContent => ({
                        ...prevContent,
                        hero: {
                          ...prevContent.hero,
                          backgroundImage: info.secure_url
                        }
                      }));
                    }}
                  >
                    {({ open }) => (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => open()}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    )}
                  </CldUploadWidget>
                  {content.hero.backgroundImage && (
                    <div className="relative h-32 w-full overflow-hidden rounded-lg border">
                      <Image
                        src={content.hero.backgroundImage}
                        alt="Background preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Background Video (optional)</label>
                <div className="flex flex-col gap-4">
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                    options={{
                      resourceType: "video",
                      sources: ["local"],
                      maxFiles: 1,
                      clientAllowedFormats: ["mp4", "mov", "webm"],
                    }}
                    onSuccess={(result) => {
                      const info = result.info as CloudinaryUploadWidgetInfo;
                      setContent(prevContent => ({
                        ...prevContent,
                        hero: { 
                          ...prevContent.hero, 
                          backgroundVideo: info.secure_url 
                        }
                      }));
                    }}
                  >
                    {({ open }) => (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => open()}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Video
                      </Button>
                    )}
                  </CldUploadWidget>
                  {content.hero.backgroundVideo && (
                    <div className="relative h-32 w-full overflow-hidden rounded-lg border">
                      <video
                        src={content.hero.backgroundVideo}
                        className="w-full h-full object-cover"
                        controls
                        muted
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
              <CardDescription>Manage your about section content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Heading</label>
                <Input
                  value={content.about.heading}
                  onChange={(e) => setContent({
                    ...content,
                    about: { ...content.about, heading: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subheading</label>
                <Input
                  value={content.about.subheading}
                  onChange={(e) => setContent({
                    ...content,
                    about: { ...content.about, subheading: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={content.about.description}
                  onChange={(e) => setContent({
                    ...content,
                    about: { ...content.about, description: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image</label>
                <div className="flex flex-col gap-4">
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                    onSuccess={(result) => {
                      const info = result.info as CloudinaryUploadWidgetInfo;
                      setContent(prevContent => ({
                        ...prevContent,
                        about: { 
                          ...prevContent.about, 
                          image: info.secure_url 
                        }
                      }));
                    }}
                  >
                    {({ open }) => (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => open()}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    )}
                  </CldUploadWidget>
                  {content.about.image && (
                    <div className="relative h-32 w-full overflow-hidden rounded-lg border">
                      <Image
                        src={content.about.image}
                        alt="About section preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stats</label>
                {content.about.stats.map((stat, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <Input
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...content.about.stats];
                        newStats[index] = { ...stat, value: e.target.value };
                        setContent({
                          ...content,
                          about: { ...content.about, stats: newStats }
                        });
                      }}
                      placeholder="Value"
                    />
                    <Input
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...content.about.stats];
                        newStats[index] = { ...stat, label: e.target.value };
                        setContent({
                          ...content,
                          about: { ...content.about, stats: newStats }
                        });
                      }}
                      placeholder="Label"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parallax">
          <Card>
            <CardHeader>
              <CardTitle>Parallax Sections</CardTitle>
              <CardDescription>Manage your parallax sections content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.parallaxSections.map((section, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={section.title}
                      onChange={(e) => {
                        const newSections = [...content.parallaxSections];
                        newSections[index] = { ...section, title: e.target.value };
                        setContent({
                          ...content,
                          parallaxSections: newSections
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={section.description}
                      onChange={(e) => {
                        const newSections = [...content.parallaxSections];
                        newSections[index] = { ...section, description: e.target.value };
                        setContent({
                          ...content,
                          parallaxSections: newSections
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Background Image</label>
                    <div className="flex flex-col gap-4">
                      <CldUploadWidget
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                        onSuccess={(result) => {
                          const info = result.info as CloudinaryUploadWidgetInfo;
                          setContent(prevContent => {
                            const updatedSections = [...prevContent.parallaxSections];
                            updatedSections[index] = {
                              ...updatedSections[index],
                              image: info.secure_url
                            };
                            return {
                              ...prevContent,
                              parallaxSections: updatedSections
                            };
                          });
                        }}
                      >
                        {({ open }) => (
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => open()}
                            className="w-full"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </Button>
                        )}
                      </CldUploadWidget>
                      {section.image && (
                        <div className="relative h-32 w-full overflow-hidden rounded-lg border">
                          <Image
                            src={section.image}
                            alt={`Parallax section ${index + 1} preview`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Features Section</CardTitle>
              <CardDescription>Manage your features section content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.features.map((feature, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Feature {index + 1}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const newFeatures = content.features.filter((_, i) => i !== index);
                        setContent({
                          ...content,
                          features: newFeatures
                        });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={feature.title}
                      onChange={(e) => {
                        const newFeatures = [...content.features];
                        newFeatures[index] = { ...feature, title: e.target.value };
                        setContent({
                          ...content,
                          features: newFeatures
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={feature.description}
                      onChange={(e) => {
                        const newFeatures = [...content.features];
                        newFeatures[index] = { ...feature, description: e.target.value };
                        setContent({
                          ...content,
                          features: newFeatures
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Image</label>
                    <div className="flex flex-col gap-4">
                      <CldUploadWidget
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                        onSuccess={(result) => {
                          const info = result.info as CloudinaryUploadWidgetInfo;
                          setContent(prevContent => {
                            const updatedFeatures = [...prevContent.features];
                            updatedFeatures[index] = {
                              ...updatedFeatures[index],
                              image: info.secure_url
                            };
                            return {
                              ...prevContent,
                              features: updatedFeatures
                            };
                          });
                        }}
                      >
                        {({ open }) => (
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => open()}
                            className="w-full"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Image
                          </Button>
                        )}
                      </CldUploadWidget>
                      {feature.image && (
                        <div className="relative h-32 w-full overflow-hidden rounded-lg border">
                          <Image
                            src={feature.image}
                            alt={`Feature ${index + 1} preview`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <Button
                onClick={() => setContent({
                  ...content,
                  features: [
                    ...content.features,
                    {
                      title: '',
                      description: '',
                      image: '',
                    }
                  ]
                })}
              >
                Add Feature
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>Footer Section</CardTitle>
              <CardDescription>Manage your footer content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Logo</label>
                <div className="flex flex-col gap-4">
                  <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                    onSuccess={(result) => {
                      const info = result.info as CloudinaryUploadWidgetInfo;
                      setContent(prevContent => ({
                        ...prevContent,
                        footer: { 
                          ...prevContent.footer, 
                          logo: info.secure_url 
                        }
                      }));
                    }}
                  >
                    {({ open }) => (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => open()}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                    )}
                  </CldUploadWidget>
                  {content.footer.logo && (
                    <div className="relative h-20 w-40 mx-auto overflow-hidden rounded-lg border">
                      <Image
                        src={content.footer.logo}
                        alt="Logo preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tagline</label>
                <Input
                  value={content.footer.tagline}
                  onChange={(e) => setContent({
                    ...content,
                    footer: { ...content.footer, tagline: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={content.footer.description}
                  onChange={(e) => setContent({
                    ...content,
                    footer: { ...content.footer, description: e.target.value }
                  })}
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium">Social Links</label>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500">Facebook URL</label>
                    <Input
                      value={content.footer.socialLinks.facebook}
                      onChange={(e) => setContent({
                        ...content,
                        footer: {
                          ...content.footer,
                          socialLinks: { ...content.footer.socialLinks, facebook: e.target.value }
                        }
                      })}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500">Instagram URL</label>
                    <Input
                      value={content.footer.socialLinks.instagram}
                      onChange={(e) => setContent({
                        ...content,
                        footer: {
                          ...content.footer,
                          socialLinks: { ...content.footer.socialLinks, instagram: e.target.value }
                        }
                      })}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500">LinkedIn URL</label>
                    <Input
                      value={content.footer.socialLinks.linkedin}
                      onChange={(e) => setContent({
                        ...content,
                        footer: {
                          ...content.footer,
                          socialLinks: { ...content.footer.socialLinks, linkedin: e.target.value }
                        }
                      })}
                      placeholder="https://linkedin.com/company/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500">Twitter URL</label>
                    <Input
                      value={content.footer.socialLinks.twitter}
                      onChange={(e) => setContent({
                        ...content,
                        footer: {
                          ...content.footer,
                          socialLinks: { ...content.footer.socialLinks, twitter: e.target.value }
                        }
                      })}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 