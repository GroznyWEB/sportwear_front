// src/pages/Home.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Catalog from '../../components/Catalog';
import styles from './Home.module.scss'
// import FeedbackModal from '../../components/FeedbackModal';

const Home: React.FC = () => {
    // const products = useSelector((state: RootState) => state.products);

    return (
        <>
            <Header />
            <Catalog />
            <Footer />
        </>
    );
};

export default Home;