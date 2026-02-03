import { Hero } from './Hero';
import { CategoryCard } from './CategoryCard';
import { categories } from '../data/products';

export function HomePage({ onNavigate, aboutRef, contactRef }) {
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    
    <div>

      {/* HERO */}
      <Hero onShopNow={() => onNavigate('products')} onLearnMore={scrollToAbout}/>

      {/* CATEGORIES */}
      <section className="mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Shop by Category</h2>
          <p className="text-gray-600">
            Find everything your pet needs in one place
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              name={category.name}
              image={category.image}
              onClick={() => onNavigate('products', category.slug)}
            />
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center">
              <div className="w-16 h-16 bg-[#D9C88A] rounded-full flex items-center justify-center mx-auto mb-4">
                🚚
              </div>
              <h3 className="text-xl mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#D9C88A] rounded-full flex items-center justify-center mx-auto mb-4">
                ✨
              </div>
              <h3 className="text-xl mb-2">Quality Products</h3>
              <p className="text-gray-600">Premium pet supplies</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#D9C88A] rounded-full flex items-center justify-center mx-auto mb-4">
                💝
              </div>
              <h3 className="text-xl mb-2">Happy Pets</h3>
              <p className="text-gray-600">Satisfaction guaranteed</p>
            </div>

          </div>
        </div>
      </section>
      {/* ABOUT SECTION */}
      <section ref={aboutRef} className="py-20 bg-white">
        <div className="mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-4xl mb-4">About Vetra Sales</h2>
          <p className="text-gray-600 leading-relaxed">
            Vetra Sales is a modern pet e-commerce platform offering premium
            quality products for pets. Our mission is to make pet care easy,
            affordable, and joyful.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <footer ref={contactRef} className="bg-black text-white py-16">
        <div className="mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl mb-6">Contact Us</h2>

          <p>Email: support@vetrasales.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Bengaluru, India</p>

          <p className="mt-8 text-sm text-gray-400">
            © 2025 Vetra Sales. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
