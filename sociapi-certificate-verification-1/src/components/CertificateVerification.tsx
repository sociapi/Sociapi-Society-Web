import React, { useState, useEffect } from 'react';
import styles from '../styles/CertificateVerification.module.css';
import { fetchCertificates, verifyCertificate } from '../utils/api';

const CertificateVerification: React.FC = () => {
    const [certificateId, setCertificateId] = useState('');
    const [verificationResult, setVerificationResult] = useState<string | null>(null);
    const [certificates, setCertificates] = useState<any[]>([]);

    useEffect(() => {
        const loadCertificates = async () => {
            const data = await fetchCertificates();
            setCertificates(data);
        };
        loadCertificates();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCertificateId(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValid = await verifyCertificate(certificateId, certificates);
        setVerificationResult(isValid ? 'Valid Certificate' : 'Invalid Certificate');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Certificate Verification</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={certificateId}
                    onChange={handleInputChange}
                    placeholder="Enter Certificate ID"
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.button}>Verify</button>
            </form>
            {verificationResult && (
                <div className={styles.result}>
                    <p>{verificationResult}</p>
                </div>
            )}
        </div>
    );
};

export default CertificateVerification;