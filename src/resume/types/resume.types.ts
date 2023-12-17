type IBaseData = {
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
};

export type ILink = {
  label: string;
  url: string;
};

export type IPersonalData = {
  userName: string;
  title: string;
  professionalSummary?: string;
  email: string;
  phone?: string;
  country?: string;
  city?: string;
  socialLinks?: ILink[];
};

export type IWorkExperience = IBaseData & {
  companyName: string;
  position: string;
  responsibilities?: string[];
};

export type IEducation = IBaseData & {
  school: string;
  degree: string;
};

export type ILanguage = {
  language: string;
  level: string;
};

export type ILanguages = ILanguage[];

export type ISkill = {
  name: string;
  proficiency: string;
};

export type ISkills = ISkill[];

export type IHobby = {
  name: string;
  description?: string;
  link?: string;
};

export type IHobbies = IHobby[];

export type ICertificates = string[];
