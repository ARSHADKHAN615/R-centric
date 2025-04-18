import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

interface ContentDocument {
  _id: string;
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
}

const defaultContent: Omit<ContentDocument, '_id'> = {
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
};

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const content = await request.json();

    console.log(content);
    await db.collection<ContentDocument>('content').updateOne(
      { _id: 'landing_page' },
      { 
        $set: {
          ...content,
          _id: 'landing_page'
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection<ContentDocument>('content').findOne(
      { _id: 'landing_page' }
    );

    console.log(content);
    return NextResponse.json(content || {
      _id: 'landing_page',
      ...defaultContent
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
} 