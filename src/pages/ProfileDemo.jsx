import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Link as LinkIcon, Grid } from 'lucide-react';
import { getUserByUsername } from '../data/mockData';

const ProfileDemo = () => {
    const { username } = useParams();
    const user = getUserByUsername(username);
    const collections = user?.collections || [];

    if (!user) return <div className="text-center p-10">User not found</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: 'var(--spacing-lg) 0' }}
        >
            <div className="container" style={{ maxWidth: '900px' }}>
                {/* Profile Header */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: 'var(--spacing-xl)',
                    marginTop: 'var(--spacing-lg)'
                }}>
                    <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        src={user.avatar}
                        alt={user.name}
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            marginBottom: 'var(--spacing-md)',
                            border: '3px solid var(--border-color)'
                        }}
                    />
                    <h1 style={{
                        fontSize: '2rem',
                        marginBottom: 'var(--spacing-xs)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '700',
                        letterSpacing: '-0.03em',
                    }}>{user.name}</h1>
                    <p style={{
                        color: 'var(--accent-blue)',
                        marginBottom: 'var(--spacing-sm)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '500',
                    }}>@{user.username}</p>
                    <p style={{ maxWidth: '500px', marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{user.bio}</p>

                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-md)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={16} /> {user.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <LinkIcon size={16} /> <a href="#" style={{ textDecoration: 'underline', color: 'var(--accent-blue)' }}>{user.website}</a>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-lg)',
                        marginTop: 'var(--spacing-md)',
                        borderTop: '1px solid var(--border-color)',
                        paddingTop: 'var(--spacing-md)'
                    }}>
                        <div className="text-center">
                            <div style={{ fontWeight: '700', fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>{user.followers}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-display)' }}>Followers</div>
                        </div>
                        <div className="text-center">
                            <div style={{ fontWeight: '700', fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>{user.following}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-display)' }}>Following</div>
                        </div>
                    </div>
                </div>

                {/* Collections Grid */}
                <h2 style={{
                    marginBottom: 'var(--spacing-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: '700',
                    letterSpacing: '-0.02em',
                }}>
                    <Grid size={24} /> Collections
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: 'var(--spacing-md)'
                }}>
                    {collections.map((collection) => (
                        <Link to={`/c/${collection.id}`} key={collection.id}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="glass-panel"
                                style={{
                                    borderRadius: 'var(--radius-lg)',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    height: '100%'
                                }}
                            >
                                <div style={{ height: '250px', overflow: 'hidden' }}>
                                    <img
                                        src={collection.image}
                                        alt={collection.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                        className="hover-scale"
                                    />
                                </div>
                                <div style={{ padding: 'var(--spacing-sm)' }}>
                                    <h3 style={{ fontSize: '1.125rem', marginBottom: '4px', fontFamily: 'var(--font-display)', fontWeight: '600' }}>{collection.title}</h3>
                                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{collection.items} items</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileDemo;
