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

export type Split = {
  name: string;
  amount: number;
  type: string;
}

export type Splits = Split[];

export type Friends = Friend[];
