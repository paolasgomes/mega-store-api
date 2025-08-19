type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date | number;
  updated_at: Date | number | null;
};

export type { User };
