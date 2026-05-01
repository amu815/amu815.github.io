export type EducationKind = "highschool" | "bachelor" | "master" | "doctoral";

export type EducationEntry = {
  id: string;
  kind: EducationKind;
  enrolled: string;
  graduated?: string;
  ongoing?: boolean;
  planned?: boolean;
  schoolEn: string;
  schoolJa: string;
  departmentEn?: string;
  departmentJa?: string;
  href?: string;
};

export const education: EducationEntry[] = [
  {
    id: "kyushu-doctoral",
    kind: "doctoral",
    enrolled: "2027-04-01",
    planned: true,
    schoolEn: "Kyushu University, Graduate School (Doctoral Program)",
    schoolJa: "九州大学 大学院 博士課程",
    departmentEn:
      "Department of Advanced Information Technology, Information Science and Electrical Engineering (ISEE)",
    departmentJa: "システム情報科学府 情報理工学専攻",
    href: "https://www.isee.kyushu-u.ac.jp/",
  },
  {
    id: "kyushu-master",
    kind: "master",
    enrolled: "2025-04-01",
    ongoing: true,
    schoolEn: "Kyushu University, Graduate School",
    schoolJa: "九州大学 大学院",
    departmentEn:
      "Department of Advanced Information Technology, Information Science and Electrical Engineering (ISEE)",
    departmentJa: "システム情報科学府 情報理工学専攻",
    href: "https://www.isee.kyushu-u.ac.jp/",
  },
  {
    id: "yamaguchi-bachelor",
    kind: "bachelor",
    enrolled: "2021-04-01",
    graduated: "2025-03-31",
    schoolEn: "Yamaguchi University, Faculty of Engineering",
    schoolJa: "山口大学 工学部",
    departmentEn: "Department of Computer Science and Systems Engineering",
    departmentJa: "知能情報工学科",
    href: "https://www.csse.yamaguchi-u.ac.jp/",
  },
  {
    id: "funairi-highschool",
    kind: "highschool",
    enrolled: "2018-04-01",
    graduated: "2021-03-31",
    schoolEn: "Hiroshima Municipal Funairi High School",
    schoolJa: "広島市立舟入高等学校",
    departmentEn: "General Course",
    departmentJa: "普通科",
    href: "https://www.funairi-h.edu.city.hiroshima.jp/",
  },
];
