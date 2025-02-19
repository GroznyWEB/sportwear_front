// src/pages/Home.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Catalog from '../../components/Catalog';
import styles from './Home.module.scss'

const Home: React.FC = () => {
    // const products = useSelector((state: RootState) => state.products);

    return (
        <>
            <Header />
            <Container className={styles.container}>
                <Catalog />
            </Container>
            <Footer />
        </>
    );
};

export default Home;