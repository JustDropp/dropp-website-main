import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const sections = [
    {
        title: 'Information We Collect',
        content: 'We collect information you provide directly: account details (name, email, username, phone, date of birth), profile data (bio, profile picture, gender, interests), and content you create (collections, products, likes). We also automatically collect usage data such as views and engagement metrics, and basic device information (browser type, IP address) for security purposes.',
    },
    {
        title: 'How We Use Your Information',
        content: 'We use your information to provide and improve the Dropp platform, personalize your feed based on your interests and engagement, send important account notifications such as login alerts and email verification, display your public content to other users, and generate aggregated analytics to improve platform performance.',
    },
    {
        title: 'Information Sharing',
        content: 'We do not sell your personal data. We may share information with trusted service providers who help us operate the platform (such as Cloudinary for media hosting and email delivery services), with law enforcement when required by law, and in aggregated, anonymized form for analytics and research purposes.',
    },
    {
        title: 'Data Security',
        content: 'We take reasonable measures to protect your data. Passwords are hashed using bcrypt encryption. Login alerts are sent via email to notify you of new sign-ins. We use JWT-based authentication and all data is transmitted over HTTPS encryption.',
    },
    {
        title: 'Your Rights',
        content: 'You can access your personal data through your profile at any time. You may update or correct your information in the Edit Profile section. You can permanently delete your account from the Settings page — this action is irreversible. Data export functionality is planned for a future release.',
    },
    {
        title: 'Cookies & Storage',
        content: 'We use browser localStorage to store your authentication token for a seamless login experience. We do not use third-party tracking cookies. Vercel Analytics is used for anonymous, aggregated page view statistics only.',
    },
    {
        title: "Children's Privacy",
        content: 'Dropp is not intended for children under 13 years of age. We do not knowingly collect personal information from minors. If we discover that a child under 13 has created an account, we will take steps to delete it promptly.',
    },
    {
        title: 'Changes to This Policy',
        content: 'We may update this Privacy Policy from time to time. We encourage you to review this page periodically for any changes. Continued use of Dropp after changes are posted constitutes acceptance of the updated policy.',
    },
    {
        title: 'Contact Us',
        content: 'If you have any questions or concerns about this Privacy Policy, please contact us at ondropp.app@gmail.com.',
    },
];

const Privacy = () => {
    return (
        <motion.div
            className="about-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="about-container">
                <div className="about-hero">
                    <h1 className="about-title">Privacy <span className="accent">Policy.</span></h1>
                    <p className="about-subtitle">Last updated — April 2026</p>
                </div>

                {sections.map((section, i) => (
                    <motion.section
                        key={i}
                        className="about-section"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                    >
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            fontFamily: 'var(--font-display)',
                            color: 'var(--text-primary)',
                            marginBottom: 'var(--spacing-sm)',
                            letterSpacing: '-0.02em',
                        }}>
                            {i + 1}. {section.title}
                        </h3>
                        <p className="section-content" style={{ textAlign: 'left' }}>
                            {section.content}
                        </p>
                    </motion.section>
                ))}
            </div>
        </motion.div>
    );
};

export default Privacy;
