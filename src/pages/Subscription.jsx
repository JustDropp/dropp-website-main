import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Check, X, Sparkles, Zap, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import '../styles/Subscription.css';

const plans = [
    {
        id: 'free',
        label: 'FREE',
        price: '₹0',
        period: '/month',
        icon: Sparkles,
        description: 'Everything you need to start. Build your dropp collection and earn — no upfront cost.',
        features: [
            { text: 'Unlimited collections', included: true },
            { text: '10 products per collection', included: true },
            { text: 'Free user account', included: true },
            { text: 'Verified badge', included: false },
            { text: 'Analytics', included: false },
            { text: "Creator's portfolio", included: false },
            { text: 'Profile visits', included: false },
            { text: 'AI powered insights', included: false },
            { text: 'Engagement', included: false },
        ],
        btnLabel: 'Join for free',
        btnVariant: 'outline',
    },
    {
        id: 'lite',
        label: 'LITE',
        price: '₹299',
        period: '/month',
        icon: Zap,
        popular: true,
        description: 'For creators ready to grow. More collections, more products, more reach.',
        features: [
            { text: 'Unlimited collections', included: true },
            { text: '30 products per collection', included: true },
            { text: 'Verified badge', included: true },
            { text: 'Basic Analytics', included: true },
            { text: "Creator's portfolio (Lite)", included: true },
            { text: 'Last 10 profile visits', included: true },
            { text: 'AI powered insights', included: true },
            { text: 'Priority support', included: true },
            { text: 'Engagement', included: false },
            { text: 'Early access', included: false },
        ],
        btnLabel: 'Upgrade to Lite',
        btnVariant: 'primary',
    },
    {
        id: 'pro',
        label: 'PRO',
        price: '₹499',
        period: '/month',
        icon: Crown,
        description: 'For creators who mean business. Full portfolio, advanced analytics, and priority on brand deals.',
        features: [
            { text: 'Unlimited collections', included: true },
            { text: 'Unlimited products', included: true },
            { text: 'Verified badge', included: true },
            { text: 'Advanced Analytics', included: true },
            { text: "Creator's portfolio (Pro)", included: true },
            { text: 'Unlimited profile visits', included: true },
            { text: 'AI powered insights', included: true },
            { text: 'Engagement', included: true },
            { text: 'Priority support', included: true },
            { text: 'Early access to beta features', included: true },
        ],
        btnLabel: 'Join Pro',
        btnVariant: 'deep',
    },
];

const comparisonFeatures = [
    { label: 'Collections', free: 'Unlimited', lite: 'Unlimited', pro: 'Unlimited' },
    { label: 'Products per collection', free: '10', lite: '30', pro: 'Unlimited' },
    { label: 'Verified badge', free: false, lite: true, pro: true },
    { label: 'Analytics', free: false, lite: 'Basic', pro: 'Advanced' },
    { label: "Creator's portfolio", free: false, lite: 'Lite', pro: 'Pro' },
    { label: 'Profile visits', free: false, lite: '10', pro: 'Unlimited' },
    { label: 'AI powered insights', free: false, lite: true, pro: true },
    { label: 'Engagement', free: false, lite: false, pro: true },
    { label: 'Priority support', free: false, lite: true, pro: true },
    { label: 'Early access', free: false, lite: false, pro: true },
];

const faqs = [
    {
        q: 'Can I cancel anytime?',
        a: 'Yes! You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of the current billing period.',
    },
    {
        q: 'How does billing work?',
        a: "You'll be billed monthly on the date you subscribe. We'll send you a reminder before each billing cycle so there are no surprises.",
    },
    {
        q: 'What payment methods do you accept?',
        a: 'We accept UPI, credit/debit cards, net banking, and popular wallets through our payment partner Razorpay.',
    },
];

const FeatureItem = ({ text, included, isPopular }) => (
    <li className={`sub-feature-item ${!included ? 'sub-feature-item--disabled' : ''}`}>
        <span className={`sub-feature-icon ${included ? 'sub-feature-icon--check' : 'sub-feature-icon--x'}`}>
            {included
                ? <Check size={14} strokeWidth={3} />
                : <X size={14} strokeWidth={3} />
            }
        </span>
        <span className={`sub-feature-text ${isPopular && included ? 'sub-feature-text--light' : ''} ${isPopular && !included ? 'sub-feature-text--muted-light' : ''}`}>
            {text}
        </span>
    </li>
);

const ComparisonCell = ({ value }) => {
    if (value === true) return <Check size={16} strokeWidth={2.5} className="sub-compare-check" />;
    if (value === false) return <X size={16} strokeWidth={2.5} className="sub-compare-x" />;
    return <span className="sub-compare-text">{value}</span>;
};

const FaqItem = ({ faq, isOpen, onToggle }) => (
    <div className={`sub-faq-item ${isOpen ? 'sub-faq-item--open' : ''}`}>
        <button className="sub-faq-q" onClick={onToggle}>
            <span>{faq.q}</span>
            <ChevronDown size={18} strokeWidth={2} className="sub-faq-chevron" />
        </button>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    className="sub-faq-a-wrap"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="sub-faq-a">{faq.a}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const Subscription = () => {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({ visible: false, message: '' });
    const [openFaq, setOpenFaq] = useState(null);

    const handleUpgrade = () => {
        setSnackbar({
            visible: true,
            message: "Subscription coming soon! We'll notify you when it's available.",
        });
    };

    return (
        <motion.div
            className="subscription-page"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
        >
            {/* Hero */}
            <div className="sub-hero">
                <div className="sub-hero-mesh" aria-hidden />
                <div className="sub-hero-glow" aria-hidden />
                <motion.div
                    className="sub-hero-inner"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.45 }}
                >
                    <span className="sub-hero-pill">
                        <Crown size={14} strokeWidth={2.2} />
                        Plans & Pricing
                    </span>
                    <h1 className="sub-hero-title">Unlock Your Full Potential</h1>
                    <p className="sub-hero-sub">
                        Choose a plan that fits your creative journey
                    </p>
                </motion.div>
            </div>

            {/* Pricing Cards */}
            <section className="sub-plans">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.id}
                        className={`sub-plan-card ${plan.popular ? 'sub-plan-card--popular' : ''}`}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {plan.popular && <span className="sub-plan-badge">Best choice</span>}

                        <div className="sub-plan-header">
                            <div className={`sub-plan-icon ${plan.popular ? 'sub-plan-icon--popular' : ''}`}>
                                {React.createElement(plan.icon, { size: 20, strokeWidth: 2 })}
                            </div>
                            <h2 className="sub-plan-label">{plan.label}</h2>
                        </div>

                        <div className="sub-plan-pricing">
                            <span className="sub-plan-currency">₹</span>
                            <span className="sub-plan-price">{plan.price.replace('₹', '')}</span>
                            <span className="sub-plan-period">{plan.period}</span>
                        </div>

                        <p className="sub-plan-description">{plan.description}</p>

                        <div className="sub-plan-divider" />

                        <ul className="sub-plan-features">
                            {plan.features.map((feat) => (
                                <FeatureItem
                                    key={feat.text}
                                    text={feat.text}
                                    included={feat.included}
                                    isPopular={plan.popular}
                                />
                            ))}
                        </ul>

                        <button
                            className={`sub-plan-btn sub-plan-btn--${plan.btnVariant}`}
                            onClick={handleUpgrade}
                        >
                            {plan.btnLabel}
                        </button>
                    </motion.div>
                ))}
            </section>

            {/* Feature Comparison Table */}
            <section className="sub-compare">
                <h2 className="sub-section-title">Feature Comparison</h2>
                <div className="sub-compare-table-wrap">
                    <table className="sub-compare-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Free</th>
                                <th>Lite</th>
                                <th>Pro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonFeatures.map((row) => (
                                <tr key={row.label}>
                                    <td>{row.label}</td>
                                    <td><ComparisonCell value={row.free} /></td>
                                    <td><ComparisonCell value={row.lite} /></td>
                                    <td><ComparisonCell value={row.pro} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* FAQ */}
            <section className="sub-faq">
                <h2 className="sub-section-title">Frequently Asked Questions</h2>
                {faqs.map((faq, i) => (
                    <FaqItem
                        key={i}
                        faq={faq}
                        isOpen={openFaq === i}
                        onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                    />
                ))}
            </section>

            <Snackbar
                message={snackbar.message}
                type="info"
                isVisible={snackbar.visible}
                onClose={() => setSnackbar({ visible: false, message: '' })}
            />
        </motion.div>
    );
};

export default Subscription;
