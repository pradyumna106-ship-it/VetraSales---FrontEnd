import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button,buttonVariants } from './ui/button';
export function Hero({ onShopNow,onLearnMore }) {
  return (
    <div className="relative bg-gradient-to-br from-[#4B3F1A] via-[#8A7432] to-[#D9C88A] text-white overflow-hidden">
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
              src="https://www.tatesofsussex.co.uk/wp-content/uploads/fly-images/13950/Pets-Aquatics-3200x800.jpg"
              alt="Pet toys"
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
