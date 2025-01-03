import { motion } from "framer-motion";

const MovieLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center fixed inset-0 z-10 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-90" />

      <motion.div
        className="relative z-10 text-primary text-4xl font-bold tracking-widest"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        CINEMATIC
      </motion.div>

      <motion.div
        className="absolute inset-0"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      >
        <div className="h-full w-1/3 bg-gradient-to-b from-transparent via-white to-transparent opacity-20 blur-md"></div>
      </motion.div>
    </div>
  );
};

export default MovieLoading;
