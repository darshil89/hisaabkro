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
  id?: string;
  userId?: string;
  name: string;
  totalAmount: number;
  splitMethod: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type Splits = Split[];

export type Friends = Friend[];
