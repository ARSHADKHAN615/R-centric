export interface ContentData {
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
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
  parallaxSections: Array<{
    title: string;
    description: string;
    image: string;
  }>;
}

export interface ContentDocument extends ContentData {
  _id: string;
} 