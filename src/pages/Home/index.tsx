import React, { useRef } from 'react';
import Catalog from '../../components/Catalog';
import CustomDoubleCarousel from '../../components/DoubleCarousel';

const Home: React.FC = () => {
  const catalogRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CustomDoubleCarousel scrollToCatalog={scrollToCatalog} />
      <div ref={catalogRef}>
        <Catalog />
      </div>
    </>
  );
};

export default Home;
