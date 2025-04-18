'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Footer from './components/Footer';
import EditButton from './components/EditButton';
import ParallaxSection from './components/ParallaxSection';
import { Loader2 } from "lucide-react";

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

export default function Home() {
  const [content, setContent] = useState<ContentData>({
    hero: {
      title: 'LUXURY LIVING REDEFINED',
      subtitle: 'Experience the epitome of sophistication in the heart of the city',
      backgroundImage: '/default-hero.jpg',
      backgroundVideo: '/intro_video.mp4',
    },
    about: {
      heading: 'A LEGACY OF LUXURY',
      subheading: 'Creating Timeless Experiences',
      description: 'Nestled in the most prestigious location, our development stands as a testament to architectural excellence and luxurious living. Each residence is meticulously crafted to offer unparalleled comfort and sophistication.',
      image: '/about.jpg',
      stats: [
        { value: '45+', label: 'FLOORS' },
        { value: '200', label: 'RESIDENCES' },
        { value: '5★', label: 'AMENITIES' },
        { value: '24/7', label: 'CONCIERGE' },
      ],
    },
    features: [
      {
        title: 'Luxurious Living Spaces',
        description: 'Experience the epitome of comfort and style in our meticulously designed living spaces, where every detail has been carefully considered to create the perfect ambiance.',
        image: '/feature1.jpg',
      },
      {
        title: 'World-Class Amenities',
        description: 'Indulge in our extensive range of amenities, from state-of-the-art fitness centers to serene spa facilities, all designed to enhance your lifestyle.',
        image: '/feature2.jpg',
      },
    ],
    footer: {
      logo: '/omniyat-logo.png',
      tagline: 'THE ART OF ELEVATION',
      description: 'OMNIYAT is a renowned developer of luxurious architectural masterpieces. The Art of Elevation embodies our dedication to imagining the extraordinary and building it into reality.',
      socialLinks: {
        facebook: 'https://facebook.com/omniyat',
        instagram: 'https://instagram.com/omniyat',
        linkedin: 'https://linkedin.com/company/omniyat',
        twitter: 'https://twitter.com/omniyat',
      },
    },
    parallaxSections: [
      {
        title: 'Title 1',
        description: 'Description 1',
        image: '/parallax1.jpg',
      },
      {
        title: 'Title 2',
        description: 'Description 2',
        image: '/parallax2.jpg',
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content');
        const data = await response.json();
        if (data && !data.error) {
          setContent(prev => ({
            ...prev,
            ...data,
            hero: {
              ...prev.hero,
              backgroundImage: data.hero.backgroundImage,
              backgroundVideo: data.hero.backgroundVideo,
            },
          }));

          console.log('data', data);
          console.log('data.hero', data.hero);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (isLoading) {
    return (
      <div style={{ fontFamily: 'Cormorant Garamond' }} className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-gray-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Cormorant Garamond' }}>
      <Header />
      <main>
        <Hero {...content.hero} />
        <About {...content.about} />
        <ParallaxSection
          key={0}
          {...content.parallaxSections[0]}
        />
        <Features 
          heading="EXCEPTIONAL FEATURES"
          subheading="Discover Our Unique Offerings"
          features={content.features} 
        />
        <ParallaxSection
          key={1}
          {...content.parallaxSections[1]}
        />
      </main>
      <Footer content={content.footer} />
      <EditButton />
    </div>
  );
}
