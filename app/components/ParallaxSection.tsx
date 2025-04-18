'use client';

import { motion } from 'framer-motion';

interface ParallaxSectionProps {
  image: string;
  title: string;
  description: string;
}

export default function ParallaxSection({ image, title, description }: ParallaxSectionProps) {
  return (
    <section className="relative h-[80vh] overflow-hidden mb-10">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      <div className="relative h-full flex items-end z-10">
        <div className="container mx-auto p-8 md:p-16 text-white">
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-3xl md:text-4xl font-light mb-4 tracking-wide"
          >
            {title}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            className="text-lg md:text-xl leading-relaxed max-w-3xl"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
} 