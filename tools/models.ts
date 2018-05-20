export interface File {
  name: string;
  path: string;
}

export interface Category {
  [key: string]: Array<File>;
}

export interface ChecklistFrontMatter {
  title: string;
  summary?: string;
  description?: string;
  short_description?: string;
}

export interface FrontMatter {
  data: ChecklistFrontMatter;
  content: string;
}
