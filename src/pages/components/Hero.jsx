import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button,buttonVariants } from './ui/button';
export function Hero({ onShopNow,onLearnMore }) {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white overflow-hidden">
      <div className="mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl">
              Everything Your Pet Needs
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Premium quality products for your furry friends. From toys to treats, we've got it all!
            </p>
            <div className="flex gap-4">
              <Button
                onClick={onShopNow}
                className="bg-white text-purple-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Button>
              <Button className="border-2 border-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors" onClick={onLearnMore}>
                Learn More
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1589924749359-9697080c3577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjB0b3lzfGVufDF8fHx8MTc2NTk2Mzg3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Pet toys"
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
