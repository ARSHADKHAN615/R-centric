'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
  content: {
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
}

export default function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-white py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
            className="mb-8"
          >
            <Image
              src={content.logo || "/omniyat-logo.png"}
              alt="Omniyat"
              width={200}
              height={60}
              className="mx-auto"
            />
          </motion.div>

          {/* Tagline */}
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false }}
            className="text-3xl md:text-4xl font-light mb-6 tracking-wide"
          >
            {content.tagline || "THE ART OF ELEVATION"}
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: false }}
            className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            {content.description || "OMNIYAT is a renowned developer of luxurious architectural masterpieces. The Art of Elevation embodies our dedication to imagining the extraordinary and building it into reality."}
          </motion.p>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: false }}
            className="flex justify-center space-x-6"
          >
            {content.socialLinks?.facebook && (
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Link href={content.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <Facebook className="w-6 h-6" />
                </Link>
              </motion.div>
            )}
            {content.socialLinks?.instagram && (
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Link href={content.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <Instagram className="w-6 h-6" />
                </Link>
              </motion.div>
            )}
            {content.socialLinks?.linkedin && (
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Link href={content.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <Linkedin className="w-6 h-6" />
                </Link>
              </motion.div>
            )}
            {content.socialLinks?.twitter && (
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Link href={content.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <Twitter className="w-6 h-6" />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
} 