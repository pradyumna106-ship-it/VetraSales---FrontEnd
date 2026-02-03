import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
export function CategoryCard({ name, image, onClick }) {
  return (
    <Button
  onClick={onClick}
  className="group relative w-80 h-90 aspect-square overflow-hidden rounded-2xl hover:shadow-xl transition-all duration-300 p-0"
>
  <ImageWithFallback
    src={image}
    alt={name}
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
  />

  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

  <div className="absolute bottom-0 left-0 right-0 p-6">
    <h3 className="text-white text-2xl font-semibold">{name}</h3>
  </div>
</Button>

  );
}
