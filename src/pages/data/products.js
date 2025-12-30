import { getAllProducts } from "../services/productService";
export const products = getAllProducts();

export const categories = [
  {
    name: 'Food',
    slug: 'food',
    image: 'https://images.unsplash.com/photo-1598134493179-51332e56807f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBmb29kJTIwYm93bHxlbnwxfHx8fDE3NjU5Nzk2NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Toys',
    slug: 'toys',
    image: 'https://images.unsplash.com/photo-1589924749359-9697080c3577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjB0b3lzfGVufDF8fHx8MTc2NTk2Mzg3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1667716705760-233650f8f3fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBjb2xsYXJ8ZW58MXx8fHwxNzY1OTk4NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Treats',
    slug: 'treats',
    image: 'https://images.unsplash.com/photo-1588829009249-58d2fa22041b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBib25lJTIwdG95fGVufDF8fHx8MTc2NTk2MTQzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    name: 'Beds',
    slug: 'beds',
    image: 'https://images.unsplash.com/photo-1581888227599-779811939961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBiZWR8ZW58MXx8fHwxNzY1OTQ4MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];