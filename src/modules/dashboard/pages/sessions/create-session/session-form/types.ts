export type SessionFormData = {
  name: string;
  categories: {
    name: string;
    description: string;
    nominees: string[];
  }[];
};
