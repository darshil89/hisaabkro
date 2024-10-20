export type User = {
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  id: string;
  number?: string;
};

// type fro friend array

export type Friend = {
  name: string;
  email: string;
  id: string;
  userId: string;
};

export type Friends = Friend[];
