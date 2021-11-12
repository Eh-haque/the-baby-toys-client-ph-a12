import React from 'react';
import Header from '../Shared/Header/Header';
import Banner from './Banner/Banner';
import Products from './Services/Services';
import Reviews from './Reviews/Reviews';
import Footer from '../Shared/Footer/Footer'
import About from './About/About';

const Home = () => {
    return (
        <div>
            <Header />
            <Banner />
            <Products />
            <Reviews />
            <About />
            <Footer />
        </div>
    );
};

export default Home;