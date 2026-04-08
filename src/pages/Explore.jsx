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
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

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

    const fetchProducts = async (pageNum = 0) => {
        try {
            setProductsLoading(true);
            const response = await ProductService.getExploreProducts(pageNum);
            const items = Array.isArray(response?.data) ? response.data : [];
            if (pageNum === 0) {
                setProducts(items);
            } else {
                setProducts(prev => [...prev, ...items]);
            }
            setHasMore(items.length >= 20);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setProductsLoading(false);
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage);
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    const filteredCollections = activeCategory === 'All'
        ? (Array.isArray(collections) ? collections : [])
        : (Array.isArray(collections) ? collections : []).filter(c =>
            Array.isArray(c.category) ? c.category.includes(activeCategory) : c.category === activeCategory
        );
    const filteredProducts = activeCategory === 'All'
        ? (Array.isArray(products) ? products : [])
        : (Array.isArray(products) ? products : []).filter(p =>
            Array.isArray(p.category) ? p.category.includes(activeCategory) : p.category === activeCategory
        );

    const displayedCollections = isSearching ? (Array.isArray(searchResults) ? searchResults : []) : filteredCollections;
    const displayedProducts = isSearching ? (Array.isArray(productSearchResults) ? productSearchResults : []) : filteredProducts;

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
                    onClick={() => { setActiveTab('collections'); setSearchQuery(''); setActiveCategory('All'); setPage(0); setProducts([]); setHasMore(true); }}
                >
                    Collections
                </button>
                <button
                    className={`explore-tab ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('products'); setSearchQuery(''); setActiveCategory('All'); setPage(0); setHasMore(true); fetchProducts(0); }}
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

                {activeTab === 'products' && !isSearching && hasMore && !productsLoading && products.length > 0 && (
                    <button className="load-more-btn" onClick={handleLoadMore} style={{ display: 'block', margin: '2rem auto', padding: '0.75rem 2rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}>
                        Load More
                    </button>
                )}
            </div>

            <FloatingActionButton />
        </motion.div>
    );
};

export default Explore;
