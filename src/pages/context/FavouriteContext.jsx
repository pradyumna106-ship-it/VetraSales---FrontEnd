import { createContext, useContext, useState } from 'react';

const FavouriteContext = createContext();

export function FavouriteProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (product) => {
    setFavourites((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const isFavourite = (id) => {
    return favourites.some((p) => p.id === id);
  };

  return (
    <FavouriteContext.Provider
      value={{ favourites, toggleFavourite, isFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}

export const useFavourite = () => useContext(FavouriteContext);
