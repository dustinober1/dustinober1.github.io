'use client';

import React, { useState } from 'react';
import styles from './contact.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <main>
            <section className="hero" style={{ padding: "6rem 0 3rem" }}>
                <div className="container">
                    <h1>Get in Touch</h1>
                    <p>
                        Have a question, project idea, or just want to say hello? I'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="container" style={{ maxWidth: '800px', marginBottom: '4rem' }}>
                <div className={styles.formCard}>

                    {status === 'success' ? (
                        <div className={styles.successState}>
                            <div className={styles.successIcon}>✨</div>
                            <h3 className={styles.successTitle}>Message Sent!</h3>
                            <p className={styles.successMessage}>
                                Thanks for reaching out. I'll get back to you as soon as possible.
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className={styles.submitBtn}
                                style={{ width: 'auto', padding: '0.8rem 2rem' }}
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name" className={styles.label}>
                                        Name <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.label}>
                                        Email <span className={styles.required}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label htmlFor="subject" className={styles.label}>
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder="Project Inquiry"
                                    />
                                </div>

                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label htmlFor="message" className={styles.label}>
                                        Message <span className={styles.required}>*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={styles.textarea}
                                        placeholder="Tell me about your project..."
                                    ></textarea>
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className={styles.errorMessage}>
                                    {errorMessage}
                                </div>
                            )}

                            <div style={{ marginTop: '1.5rem' }}>
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className={styles.submitBtn}
                                >
                                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
}
