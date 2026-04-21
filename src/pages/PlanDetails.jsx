import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, Crown, Zap, Calendar, CreditCard, 
    History, CheckCircle2, AlertCircle, ExternalLink 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserService from '../core/services/UserService';
import '../styles/Settings.css';

const PlanDetails = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    // Mock transaction history - in real app, fetch from backend
    const [transactions] = useState([
        { id: 'TXN_001', date: '2024-03-20', amount: '₹499', status: 'Success', plan: 'Pro' },
        { id: 'TXN_002', date: '2024-02-20', amount: '₹499', status: 'Success', plan: 'Pro' },
    ]);

    const planConfig = {
        lite: {
            icon: Zap,
            color: '#F0057A',
            label: 'LITE',
            features: ['30 products per collection', 'Verified badge', 'Basic Analytics', 'Last 10 profile visits']
        },
        pro: {
            icon: Crown,
            color: '#FFD700',
            label: 'PRO',
            features: ['Unlimited products', 'Verified badge', 'Advanced Analytics', 'Unlimited profile visits', 'Priority support']
        }
    };

    const currentPlan = user?.plan && planConfig[user.plan.toLowerCase()] ? planConfig[user.plan.toLowerCase()] : null;

    if (!currentPlan && user?.plan !== 'free') {
        // Fallback for loading or unexpected state
        return <div className="settings-page">Loading...</div>;
    }

    return (
        <motion.div 
            className="settings-page"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <div className="settings-container">
                <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button 
                        onClick={() => navigate('/settings')}
                        className="profile-back-btn"
                        style={{ position: 'static', margin: 0 }}
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <h1 className="settings-title" style={{ margin: 0 }}>Plan Details</h1>
                </header>

                {/* Current Plan Card */}
                <section className="settings-section" style={{ 
                    background: `linear-gradient(135deg, ${currentPlan?.color}11 0%, transparent 100%)`,
                    border: `1px solid ${currentPlan?.color}33`
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                            <span style={{ 
                                color: currentPlan?.color, 
                                fontWeight: 800, 
                                fontSize: '0.75rem', 
                                letterSpacing: '0.1em',
                                backgroundColor: `${currentPlan?.color}22`,
                                padding: '4px 12px',
                                borderRadius: '12px',
                                display: 'inline-block',
                                marginBottom: '0.5rem'
                            }}>
                                CURRENT ACTIVE PLAN
                            </span>
                            <h2 style={{ fontSize: '2.5rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                {currentPlan?.label}
                                {React.createElement(currentPlan?.icon || Zap, { size: 32, color: currentPlan?.color })}
                            </h2>
                        </div>
                        <button 
                            className="settings-btn" 
                            onClick={() => navigate('/subscription')}
                            style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                        >
                            Change Plan
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <div style={{ color: currentPlan?.color }}><Calendar size={20} /></div>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Billing Cycle</p>
                                <p style={{ fontWeight: 600, margin: 0 }}>Monthly</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <div style={{ color: currentPlan?.color }}><CreditCard size={20} /></div>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0 }}>Payment Method</p>
                                <p style={{ fontWeight: 600, margin: 0 }}>Razorpay Subscription</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Included */}
                <section className="settings-section">
                    <h2 className="section-title">Included Features</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                        {currentPlan?.features.map((feature, i) => (
                            <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                                <CheckCircle2 size={18} color={currentPlan?.color} />
                                <span style={{ fontSize: '0.9rem' }}>{feature}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Transaction History */}
                <section className="settings-section">
                    <h2 className="section-title">
                        <History size={20} />
                        Transaction History
                    </h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>Date</th>
                                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>Transaction ID</th>
                                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>Plan</th>
                                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>Amount</th>
                                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-secondary)' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '1rem 0.5rem' }}>{tx.date}</td>
                                        <td style={{ padding: '1rem 0.5rem', fontFamily: 'monospace' }}>{tx.id}</td>
                                        <td style={{ padding: '1rem 0.5rem' }}>{tx.plan}</td>
                                        <td style={{ padding: '1rem 0.5rem', fontWeight: 600 }}>{tx.amount}</td>
                                        <td style={{ padding: '1rem 0.5rem' }}>
                                            <span style={{ 
                                                color: '#059669', 
                                                backgroundColor: 'rgba(5, 150, 105, 0.1)', 
                                                padding: '2px 8px', 
                                                borderRadius: '4px',
                                                fontSize: '0.75rem',
                                                fontWeight: 600
                                            }}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    <p>For billing support or to cancel your subscription, please contact 
                        <a href="mailto:ondropp.app@gmail.com" style={{ color: 'var(--color-accent)', marginLeft: '4px', textDecoration: 'none' }}>
                            ondropp.app@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default PlanDetails;
