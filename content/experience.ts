export type Internship = {
  id: string;
  companyEn: string;
  companyJa: string;
  start: string;
  end: string;
  days: number;
  href: string;
};

export const internships: Internship[] = [
  {
    id: "nec",
    companyEn: "NEC",
    companyJa: "NEC",
    start: "2025-09-01",
    end: "2025-09-05",
    days: 5,
    href: "https://www.nec.com/",
  },
  {
    id: "sony-global-solutions",
    companyEn: "Sony Global Solutions",
    companyJa: "ソニーグローバルソリューションズ",
    start: "2025-09-09",
    end: "2025-09-09",
    days: 1,
    href: "https://www.sonyglobalsolutions.com/",
  },
  {
    id: "obic",
    companyEn: "OBIC",
    companyJa: "オービック",
    start: "2025-09-18",
    end: "2025-09-18",
    days: 1,
    href: "https://www.obic.co.jp/",
  },
];
