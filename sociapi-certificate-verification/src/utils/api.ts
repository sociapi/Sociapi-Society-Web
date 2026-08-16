export const fetchCertificates = async (): Promise<Certificate[]> => {
    const response = await fetch('/path/to/certificates.json');
    if (!response.ok) {
        throw new Error('Failed to fetch certificates');
    }
    return response.json();
};

export const verifyCertificate = (certificateId: string, certificates: Certificate[]): boolean => {
    return certificates.some(certificate => certificate.id === certificateId);
};

interface Certificate {
    id: string;
    name: string;
    issuedDate: string;
    validUntil: string;
}