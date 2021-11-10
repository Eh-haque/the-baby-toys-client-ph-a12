import React from 'react';
import Header from '../Shared/Header/Header';
import Banner from './Banner/Banner';
import Products from './Services/Services';
import Reviews from './Reviews/Reviews';
import Footer from '../Shared/Footer/Footer'

const Home = () => {
    return (
        <div>
            <Header/>
            <Banner/>
            <Products/>
            <Reviews/>
            <Footer/>
        </div>
    );
};

export default Home;