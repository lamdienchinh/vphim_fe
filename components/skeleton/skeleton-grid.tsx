import React from "react";

interface SkeletonGridProps {
  count: number; // Số lượng card skeleton
  className?: string;
}

const SkeletonGrid: React.FC<SkeletonGridProps> = ({
  count,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-full bg-gray-200 rounded-lg shadow-md animate-pulse"
        >
          <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
