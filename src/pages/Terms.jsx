import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';

const sections = [
    {
        title: 'Acceptance of Terms',
        content: 'By accessing or using Dropp, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.',
    },
    {
        title: 'Description of Service',
        content: 'Dropp is a social curation platform that allows users to create collections, share product recommendations, follow creators, and discover items curated by the community.',
    },
    {
        title: 'User Accounts',
        content: 'You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your credentials. You must be at least 13 years of age to use Dropp. Each person may only maintain one account.',
    },
    {
        title: 'User Content',
        content: 'You retain ownership of any content you post on Dropp. By posting content, you grant Dropp a non-exclusive license to display, distribute, and promote your content on the platform. You are solely responsible for the legality and accuracy of your content. Spam, harmful, misleading, or infringing content is prohibited.',
    },
    {
        title: 'Acceptable Use',
        content: 'You agree not to: violate any applicable laws, harass or abuse other users, impersonate any person or entity, upload malware or malicious code, scrape or crawl the platform without permission, or manipulate engagement metrics.',
    },
    {
        title: 'Intellectual Property',
        content: 'The Dropp name, logo, branding, design, and underlying code are the intellectual property of Dropp. You may not copy, modify, or redistribute any part of the platform without prior written consent.',
    },
    {
        title: 'Featured Products',
        content: 'Users may feature their products to increase visibility within the explore feed. Dropp does not endorse, verify, or guarantee any featured products. Product quality and authenticity remain the responsibility of the creator.',
    },
    {
        title: 'Privacy',
        content: 'Your use of Dropp is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal data.',
    },
    {
        title: 'Termination',
        content: 'We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time from the Settings page. Upon deletion, your data will be permanently removed from our servers.',
    },
    {
        title: 'Limitation of Liability',
        content: 'Dropp is provided on an "as is" basis without warranties of any kind. We are not liable for any damages arising from your use of the platform or from third-party products shared by creators.',
    },
    {
        title: 'Changes to Terms',
        content: 'We may update these Terms of Service from time to time. Continued use of the platform after changes are posted constitutes acceptance of the updated terms.',
    },
    {
        title: 'Contact',
        content: 'If you have questions about these terms, please contact us at ondropp.app@gmail.com.',
    },
];

const Terms = () => {
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
                    <h1 className="about-title">Terms of <span className="accent">Service.</span></h1>
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

export default Terms;
