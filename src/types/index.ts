export type Gender = 'Male' | 'Female' | 'Other';

export interface User {
  fullName: string;
  email: string;
  gender: Gender;
  mobile: string;
  address: string;
  city: string;
  password: string;
}

export interface ImageItem {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export type FilterType = 'ALL' | 'A-M' | 'N-Z';