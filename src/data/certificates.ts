import linkedinTooba from "./Certificates/LinkedIn & Personal Branding/Tooba Mumtaz.pdf";
import linkedinHaris from "./Certificates/LinkedIn & Personal Branding/Muhammad Haris.pdf";
import linkedinMudassir from "./Certificates/LinkedIn & Personal Branding/Muhammad Mudasir.pdf";
import linkedinZuhair from "./Certificates/LinkedIn & Personal Branding/Muhammad Zuhair Zeb.pdf";
import digitalWajida from "./Certificates/Earn with digital skills/Wajida Haneef.pdf";
import digitalMoeed from "./Certificates/Earn with digital skills/Mooed Asad.pdf";
import ieltsHashmat from "./Certificates/Ielts/Hashmat Ali.pdf";
import ieltsMisbah from "./Certificates/Ielts/Misbah Ullah.pdf";
import ieltsChandni from "./Certificates/Ielts/Chandni Karim.pdf";
import ieltsFahad from "./Certificates/Ielts/Muhammad Fahad Ali.pdf";
import aiWajida from "./Certificates/AI & Tools/Wajida Haneef.pdf";
import aiAitzaz from "./Certificates/AI & Tools/Aitzaz Ahmad.pdf";
import aiAnita from "./Certificates/AI & Tools/Anita.pdf";
import aiAbbas from "./Certificates/AI & Tools/Muhammad Abbas.pdf";
import aiMujahid from "./Certificates/AI & Tools/Mujahid Nawaz.pdf";

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
  "SL-002": linkedinTooba,
  "SL-027": linkedinHaris,
  "SL-040": "/assets/Mudasssir.pdf",
  "SL-041": "/assets/ShahZeb.pdf",
  "SD-025": digitalWajida,
  "SD-031": "/assets/Moeed.pdf",
  "SP-001": ieltsHashmat,
  "SI-015": ieltsMisbah,
  "SI-017": ieltsChandni,
  "SI-026": ieltsFahad,
  "SA-010": aiWajida,
  "SA-011": aiAitzaz,
  "SA-042": aiAnita,
  "SA-034": "/assets/Shahid%20Nawaz.pdf",
  "SA-037": aiAbbas,
  "SA-038": aiMujahid,
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
