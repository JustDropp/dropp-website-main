import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Check, Circle, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Auth.css';

const Signup = () => {
    const navigate = useNavigate();
    const { signup, isAuthenticated, error: authError, clearError } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Password Strength State
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        upper: false,
        number: false,
        special: false
    });

    useEffect(() => {
        const pass = formData.password;
        setPasswordCriteria({
            length: pass.length >= 8,
            upper: /[A-Z]/.test(pass),
            number: /[0-9]/.test(pass),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(pass)
        });
    }, [formData.password]);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // Clear errors when component unmounts
    useEffect(() => {
        return () => {
            clearError();
        };
    }, [clearError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear errors when user starts typing
        setError('');
        clearError();
    };

    const validateForm = () => {
        if (!formData.fullName) return 'Full name is required';
        if (!formData.username) return 'Username is required';
        if (!formData.email) return 'Email is required';
        if (!formData.password) return 'Password is required';
        if (!formData.confirmPassword) return 'Please confirm your password';
        if (!formData.dob) return 'Date of birth is required';
        if (!formData.phone) return 'Phone number is required';

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return 'Invalid email format';
        }

        // Password match
        if (formData.password !== formData.confirmPassword) {
            return 'Passwords do not match';
        }

        // Strict Password Validation
        if (!passwordCriteria.length) return 'Password must be at least 8 characters';
        if (!passwordCriteria.upper) return 'Password must contain at least one uppercase letter';
        if (!passwordCriteria.number) return 'Password must contain at least one number';
        if (!passwordCriteria.special) return 'Password must contain at least one special character';

        // Phone validation
        const phoneRegex = /^\+?[\d\s-()]+$/;
        if (!phoneRegex.test(formData.phone)) {
            return 'Invalid phone number format';
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Validation
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...signupData } = formData;
            const result = await signup(signupData);

            if (result.success) {
                setSuccess(true);
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                if (result.error && result.error.toLowerCase().includes('exist')) {
                    setError('User exists please sign in');
                } else {
                    setError(result.error);
                }
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card signup-card">
                <div className="auth-header">
                    <h1>Join <span className="auth-accent">dropp.</span></h1>
                    <p>Create your account to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {success && (
                        <div className="auth-success">
                            Account created successfully! Redirecting to login...
                        </div>
                    )}

                    {(error || authError) && (
                        <div className="auth-error">
                            {error || authError}
                        </div>
                    )}

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                disabled={loading}
                                autoComplete="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="johndoe"
                                disabled={loading}
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            disabled={loading}
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    disabled={loading}
                                    autoComplete="new-password"
                                    style={{ width: '100%' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#666',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: 0
                                    }}
                                >
                                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    disabled={loading}
                                    autoComplete="new-password"
                                    style={{ width: '100%' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#666',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: 0
                                    }}
                                >
                                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Password Strength Indicators */}
                    {/* Modern Modern Password Strength UI */}
                    <div className="password-strength-container">
                        <div className="strength-bar-container">
                            <div className={`strength-bar-segment ${passwordCriteria.length ? 'filled' : ''}`}></div>
                            <div className={`strength-bar-segment ${passwordCriteria.upper ? 'filled' : ''}`}></div>
                            <div className={`strength-bar-segment ${passwordCriteria.number ? 'filled' : ''}`}></div>
                            <div className={`strength-bar-segment ${passwordCriteria.special ? 'filled' : ''}`}></div>
                        </div>

                        <div className="strength-labels">
                            <span className={`strength-pill ${passwordCriteria.length ? 'met' : ''}`}>8+ Chars</span>
                            <span className={`strength-pill ${passwordCriteria.upper ? 'met' : ''}`}>Uppercase</span>
                            <span className={`strength-pill ${passwordCriteria.number ? 'met' : ''}`}>Number</span>
                            <span className={`strength-pill ${passwordCriteria.special ? 'met' : ''}`}>Special</span>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                disabled={loading}
                                max={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1234567890"
                                disabled={loading}
                                autoComplete="tel"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            'Create Account'
                        )}
                    </button>

                    <div className="auth-footer">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="auth-link">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default Signup;
