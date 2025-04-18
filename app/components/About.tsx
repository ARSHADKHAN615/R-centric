'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AboutProps {
  heading: string;
  subheading: string;
  description: string;
  image: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export default function About({ heading, subheading, description, image, stats }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-beige-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false }}
                className="text-4xl font-light tracking-wide mb-4"
              >
                {heading}
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 120 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: false }}
                className="w-24 h-px bg-beige-800"
              />
            </div>
            
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: false }}
              className="text-2xl font-light text-beige-800"
            >
              {subheading}
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: false }}
              className="text-lg leading-relaxed text-gray-600"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: false }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-light text-beige-800 mb-2">{stat.value}</div>
                  <div className="text-sm tracking-wider text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="relative h-[600px] w-full overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              viewport={{ once: false }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt="About"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 