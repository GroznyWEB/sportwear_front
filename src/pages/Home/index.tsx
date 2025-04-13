// src/pages/Home.tsx
import React from 'react';
import Footer from '../../components/Footer';
import Catalog from '../../components/Catalog';

const Home: React.FC = () => {

    return (
        <>
            <Catalog />
            <Footer />
        </>
    );
};

export default Home;