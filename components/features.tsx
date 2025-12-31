"use client";

import { motion } from "motion/react";
import Image from "next/image";

// Image wrapper with text overlay
const FeatureImage = ({
  src,
  alt,
  label,
  description,
}: {
  src: string;
  alt: string;
  label: string;
  description: string;
}) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/90" />

      <div className="absolute bottom-3 left-3 z-10 space-y-1">
        <p className="text-base font-medium text-white">{label}</p>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-10 text-3xl font-medium"
      >
        features
      </motion.h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="md:col-span-2"
        >
          <FeatureCard
            component={
              <FeatureImage
                src="/product/open.png"
                alt="open source"
                label="open source"
                description="fully open, editable, and community owned."
              />
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:col-span-3"
        >
          <FeatureCard
            component={
              <FeatureImage
                src="/product/customize.png"
                alt="customize"
                label="customize"
                description="easy to customize and modify."
              />
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="md:col-span-3"
        >
          <FeatureCard
            component={
              <FeatureImage
                src="/product/svg.png"
                alt="feel the svg"
                label="feel the svg"
                description="motion-first icons with intent, not decoration."
              />
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="md:col-span-2"
        >
          <FeatureCard
            component={
              <FeatureImage
                src="/product/motion.png"
                alt="motion first"
                label="motion first"
                description="every icon is designed with motion as a feature, not an afterthought."
              />
            }
          />
        </motion.div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  component: React.ReactNode;
}

const FeatureCard = ({ component }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group border-border bg-card relative flex h-[400px] flex-col overflow-hidden rounded-2xl border"
    >
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="from-primary/10 absolute inset-0 bg-linear-to-br via-transparent to-transparent" />
      </div>

      {/* image with text overlay */}
      {component}
    </motion.div>
  );
};

export default Features;
