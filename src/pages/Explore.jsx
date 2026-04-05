import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid, Loader, X } from 'lucide-react';
import FloatingActionButton from '../components/FloatingActionButton';
import CollectionService from '../core/services/CollectionService';
import ProductService from '../core/services/ProductService';
import CollectionCard from '../components/CollectionCard';
import ProductCard from '../components/ProductCard';
import { ShimmerCollectionGrid } from '../components/Shimmer';
import { categories } from '../data/mockData';
import '../styles/Explore.css';
import '../styles/Profile.css';

const Explore = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeTab, setActiveTab] = useState('collections');
    const [collections, setCollections] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [productSearchResults, setProductSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetchCollections();
        fetchProducts();
    }, []);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim()) {
                setIsSearching(true);
                setSearchLoading(true);
                try {
                    if (activeTab === 'products') {
                        const productResults = await ProductService.searchProducts(searchQuery);
                        setProductSearchResults(Array.isArray(productResults) ? productResults : []);
                    } else {
                        const results = await CollectionService.searchCollections(searchQuery);
                        setSearchResults(results);
                    }
                } catch (error) {
                    console.error('Search failed:', error);
                    setSearchResults([]);
                    setProductSearchResults([]);
                } finally {
                    setSearchLoading(false);
                }
            } else {
                setIsSearching(false);
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, activeTab]);

    const fetchCollections = async () => {
        try {
            setLoading(true);
            const data = await CollectionService.getExploreCollections();
            setCollections(data);
        } catch (error) {
            console.error('Failed to fetch collections:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            setProductsLoading(true);
            const data = await ProductService.getExploreProducts();
            setProducts(Array.isArray(data) ? data : data?.results || []);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setProductsLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        // TODO: Implement category filtering when backend supports it
    };

    const displayedCollections = isSearching ? (Array.isArray(searchResults) ? searchResults : []) : (Array.isArray(collections) ? collections : []);
    const displayedProducts = isSearching ? (Array.isArray(productSearchResults) ? productSearchResults : []) : (Array.isArray(products) ? products : []);

    return (
        <motion.div
            className="explore-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="explore-header">
                <h1 className="explore-title">Explore <span className="accent">{activeTab === 'collections' ? 'collections.' : 'products.'}</span></h1>

                <div className="explore-search">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Search collections, items or creators..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            className="clear-search-btn"
                            onClick={() => setSearchQuery('')}
                        >
                            <X size={16} />
                        </button>
                    )}
                    {searchLoading && <Loader className="search-spinner" size={18} />}
                </div>
            </div>

            <div className="explore-tabs">
                <button
                    className={`explore-tab ${activeTab === 'collections' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('collections'); setSearchQuery(''); }}
                >
                    Collections
                </button>
                <button
                    className={`explore-tab ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('products'); setSearchQuery(''); }}
                >
                    Products
                </button>
            </div>

            {!isSearching && (
                <div className="category-filters">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}

            <div className="explore-content">
                {isSearching && (
                    <h2 className="search-results-title">
                        {searchLoading ? 'Searching...' : `Search Results (${activeTab === 'products' ? productSearchResults.length : searchResults.length})`}
                    </h2>
                )}

                {(activeTab === 'collections' ? loading : productsLoading) || searchLoading ? (
                    <ShimmerCollectionGrid count={8} />
                ) : activeTab === 'collections' ? (
                    <div className="pinterest-grid">
                        {displayedCollections.map((collection) => (
                            <CollectionCard
                                key={collection._id || collection.id}
                                collection={collection}
                            />
                        ))}
                        {displayedCollections.length === 0 && (
                            <div className="no-results">
                                <Grid size={48} />
                                <p>{isSearching ? `No collections found for "${searchQuery}"` : 'No collections found'}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="pinterest-grid">
                        {displayedProducts.map((product) => (
                            <ProductCard
                                key={product._id || product.id}
                                product={product}
                            />
                        ))}
                        {displayedProducts.length === 0 && (
                            <div className="no-results">
                                <Grid size={48} />
                                <p>{isSearching ? `No products found for "${searchQuery}"` : 'No products found'}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <FloatingActionButton />
        </motion.div>
    );
};

export default Explore;
