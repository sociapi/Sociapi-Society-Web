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
  "SL-002": "/assets/Certificates/LinkedIn & Personal Branding/Tooba Mumtaz.pdf",
  "SL-027": "/assets/Certificates/LinkedIn & Personal Branding/Muhammad Haris.pdf",
  "SL-040": "/assets/Certificates/LinkedIn & Personal Branding/Muhammad Mudasir.pdf",
  "SL-041": "/assets/Certificates/LinkedIn & Personal Branding/Muhammad Zuhair Zeb.pdf",

  "SD-025": "/assets/Certificates/Earn%20with%20digital%20skills/Wajida%20Haneef.pdf",
  "SD-030": "/assets/Certificates/Earn%20with%20digital%20skills/certificate%20sh%20(1).pdf",
  "SD-031": "/assets/Certificates/Earn%20with%20digital%20skills/Mooed.pdf",

  "SP-001": "/assets/Certificates/Ielts/Hashmat%20Ali.pdf",
  "SI-015": "/assets/Certificates/Ielts/Misbah%20Ullah.pdf",
  "SI-017": "/assets/Certificates/Ielts/Chandni%20Karim.pdf",
  "SI-026": "/assets/Certificates/Ielts/Muhammad%20Fahad%20Ali.pdf",

  "SA-010": "/assets/Certificates/AI%20&%20Tools/Wajida%20Haneef.pdf",
  "SA-011": "/assets/Certificates/AI%20&%20Tools/Aitzaz%20Ahmad.pdf",
  "SA-042": "/assets/Certificates/AI%20&%20Tools/Anita.pdf",
  "SA-034": "/assets/Certificates/AI%20&%20Tools/Shahid%20Nawaz.pdf",
  "SA-037": "/assets/Certificates/AI%20&%20Tools/Muhammad%20Abbas.pdf",
  "SA-038": "/assets/Certificates/AI%20&%20Tools/Mujahid%20Nawaz.pdf",
  "SA-012": "/assets/Certificates/AI%20&%20Tools/Umer.pdf",
  "SA-039": "/assets/Certificates/AI%20&%20Tools/ShahZeb.pdf",
  "SA-046": "/assets/Certificates/AI%20&%20Tools/Mudasssir%20046.pdf",

  "SOCIAPI-INS-2026-001": "/assets/Engr.%20Iraj%20Shahzad.pdf",
  "SOCIAPI-INS-2026-002": "/assets/Abdul%20Wahab.pdf",
  "SOCIAPI-INS-2026-003": "/assets/Danial%20Yousufzai.pdf",
  "SOCIAPI-INS-2026-004": "/assets/Nelum%20Javed.pdf",
  "SOCIAPI-INS-2026-005": "/assets/Umer.pdf",
};

export const certificatesDatabase: Certificate[] = [
  { certificateId: "SL-002", name: "Tooba Mumtaz", course: "LinkedIn & Personal Branding", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SL-027", name: "Muhammad Haris", course: "LinkedIn & Personal Branding", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SL-040", name: "Muhammad Mudassir", course: "LinkedIn & Personal Branding", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SL-041", name: "Muhammad Zuhair Zeb", course: "LinkedIn & Personal Branding", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },

  { certificateId: "SD-025", name: "Wajida Haneef", course: "Earn With Digital Skills", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SD-030", name: "Shamila", course: "Earn With Digital Skills", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SD-031", name: "Moeed Asad", course: "Earn With Digital Skills", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },

  { certificateId: "SP-001", name: "Hashmat Ali", course: "IELTS Preparation", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SI-015", name: "Misbah Ullah", course: "IELTS Preparation", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SI-017", name: "Chandni Karim", course: "IELTS Preparation", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SI-026", name: "Muhammad Fahad Ali", course: "IELTS Preparation", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },

  { certificateId: "SA-010", name: "Wajida Haneef", course: "AI & Tools", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SA-011", name: "Aitzaz Ahmad", course: "AI & Tools", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SA-042", name: "Anita", course: "AI & Tools", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SA-034", name: "Sahid Nawaz", course: "AI & Tools", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SA-037", name: "Muhammad Abbas", course: "AI & Tools", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SA-038", name: "Mujahid Nawaz", course: "AI & Tools", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SA-012", name: "Umer Farooq", course: "AI & Tools", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SA-039", name: "Muhammad ShahZeb", course: "AI & Tools", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },
  { certificateId: "SA-046", name: "Muhammad Mudassir", course: "AI & Tools", program: "06 Week Summer Boot Camp", issueDate: "23 August 2026", certificateType: "Course Completion", issuedBy: "Sociapi Society", status: "VALID" },

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
