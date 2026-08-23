export interface Certificate {
  certificateId: string;
  name: string;
  course: string;
  program: string;
  issueDate: string;
  certificateType: string;
  issuedBy: string;
  status: "VALID" | "INVALID" | "EXPIRED";
  certificateFile?: string;
}

const certificateFiles: Record<string, string> = {
  "SOCIAPI-INS-2026-001": "/assets/Engr.%20Iraj%20Shahzad.pdf",
  "SOCIAPI-INS-2026-002": "/assets/Abdul%20Wahab.pdf",
  "SOCIAPI-INS-2026-003": "/assets/Danial%20Yousufzai.pdf",
  "SOCIAPI-INS-2026-004": "/assets/Nelum%20Javed.pdf",
  "SOCIAPI-INS-2026-005": "/assets/Umer.pdf",
};

export const certificatesDatabase: Certificate[] = [
  { certificateId: "SOCIAPI-INS-2026-001", name: "Engr. Iraj Shahzad", course: "Instructor", program: "Instructor Cohort 2026", issueDate: "23 August 2026", certificateType: "Instructor Certificate", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SOCIAPI-INS-2026-002", name: "Abdul Wahab", course: "Instructor", program: "Instructor Cohort 2026", issueDate: "23 August 2026", certificateType: "Instructor Certificate", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SOCIAPI-INS-2026-003", name: "Danial Yousufzai", course: "Instructor", program: "Instructor Cohort 2026", issueDate: "23 August 2026", certificateType: "Instructor Certificate", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SOCIAPI-INS-2026-004", name: "Nelum Javed", course: "Instructor", program: "Instructor Cohort 2026", issueDate: "23 August 2026", certificateType: "Instructor Certificate", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SOCIAPI-INS-2026-005", name: "Umer", course: "Instructor", program: "Instructor Cohort 2026", issueDate: "23 August 2026", certificateType: "Instructor Certificate", issuedBy: "Sociapi Society", status: "VALID" },
];

export function findCertificate(certificateId: string): Certificate | undefined {
  const certificate = certificatesDatabase.find((cert) => cert.certificateId.toUpperCase() === certificateId.toUpperCase());
  return certificate ? { ...certificate, certificateFile: certificateFiles[certificate.certificateId] } : undefined;
}
