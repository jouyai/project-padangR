import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left space-y-6"
        >
          <h1 className="text-4xl font-bold text-gray-800">
            Discover Your Next Style
          </h1>
          <p className="text-gray-600 max-w-md">
            Explore the latest collections of fashion and accessories just for
            you.
          </p>
          <Link
            to="/products"
            className="btn btn-primary px-6 py-2 text-white font-semibold"
          >
            Start Shopping
          </Link>
        </motion.div>

        {/* Image */}
        <motion.img
          src="/images/herobanner.jpg"
          alt="Fashion Hero"
          className="w-full md:w-1/2 rounded-lg shadow-md object-cover max-h-[400px]"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </div>
    </section>
  );
};

export default HeroBanner;
