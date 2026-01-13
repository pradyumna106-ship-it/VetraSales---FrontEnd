import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button,buttonVariants } from './ui/button';
import { motion } from "framer-motion";
export function Zero({ onSignIn,onSignUp }) {
  const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { x: -50, opacity: 0 },
  show: { x: 0, opacity: 1 },
};
  return (
  <div className="relative w-full bg-gradient-to-br from-[#4B3F1A] via-[#8A7432] to-[#D9C88A] text-white">
      <div className="mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div variants={container} initial="hidden"animate="show" className="space-y-6 text-left">
            <motion.img
              src="..\assets\svgviewer-png-output.png"
              alt="Superman Fly"
              initial={{ x: "-120%", opacity: 1 }}
              animate={{ x: "120%", opacity: 0 }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="w-40 md:w-56 h-auto object-contain rounded-2xl"
            />
            <motion.h1 variants={item} className="text-4xl md:text-6xl text-white-100">
              Welcome to Vetra-Sales
            </motion.h1>
            <motion.p variants={item} className="text-lg md:text-xl opacity-90">
              Premium quality products for your furry friends. From toys to treats, we've got it all!
            </motion.p>
            <motion.div variants={item} className="flex gap-4">
                <Button className="px-8 py-3 rounded-full hover:bg-white/10 transition-colors"  onClick={onSignIn }>
                    SIGN IN
                </Button>
                <Button className="border-2 border-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors" onClick={onSignUp}>
                    SIGN UP
                </Button>
            </motion.div>
          </motion.div>
          <div className="hidden md:block">
            <ImageWithFallback
              src="https://www.akc.org/wp-content/uploads/2017/11/Labrador-Retrievers-three-colors.jpg"
              alt="Pet toys"
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
