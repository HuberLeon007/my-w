'use client';

import { motion } from 'framer-motion';

// Skeleton Animation
const SkeletonPulse = ({ className = "" }) => (
  <motion.div
    className={`bg-white/20 rounded-lg ${className}`}
    animate={{
      opacity: [0.4, 0.8, 0.4],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Forecast Card Skeleton
export const ForecastCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl"
  >
    {/* Day Header Skeleton */}
    <div className="text-center mb-4">
      <SkeletonPulse className="w-20 h-6 rounded-lg mx-auto mb-2" />
      <SkeletonPulse className="w-16 h-4 rounded-lg mx-auto" />
    </div>

    {/* Weather Icon & Temperature Skeleton */}
    <div className="text-center mb-6">
      <SkeletonPulse className="w-16 h-16 rounded-full mx-auto mb-2" />
      <div className="flex justify-center items-center gap-2 mb-2">
        <SkeletonPulse className="w-12 h-8 rounded-lg" />
        <SkeletonPulse className="w-8 h-6 rounded-lg" />
      </div>
      <SkeletonPulse className="w-24 h-4 rounded-lg mx-auto" />
    </div>

    {/* Weather Details Skeleton */}
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SkeletonPulse className="w-4 h-4 rounded-full" />
            <SkeletonPulse className="w-12 h-4 rounded-lg" />
          </div>
          <SkeletonPulse className="w-10 h-4 rounded-lg" />
        </div>
      ))}
    </div>
  </motion.div>
);

export default SkeletonPulse;