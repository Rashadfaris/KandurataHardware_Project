import React, { useContext, useState, useRef } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay';
import { StoreContext } from '../../context/StoreContext';
import Footer from '../../components/Footer/Footer';

const Home = () => {
    const [category, setCategory] = useState("All");
    const { featuredProducts } = useContext(StoreContext);

    // Ref to scroll to the product section
    const productRef = useRef(null);

    // Function to scroll to the product section
    const scrollToProducts = () => {
        if (productRef.current) {
            productRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Filter products based on the selected category
    const filteredProducts = category === "All"
        ? featuredProducts
        : featuredProducts.filter(product => product.category === category);

    return (
        <div>
            <Header scrollToProducts={scrollToProducts} />
            <ExploreMenu category={category} setCategory={setCategory} />
            <div ref={productRef}> {/* Attach the ref here */}
                <ProductDisplay category={category} products={filteredProducts} />
            </div>
            <Footer />
        </div>
    );
}

export default Home;