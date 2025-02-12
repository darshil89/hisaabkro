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
  email?: string;
  id?: string;
  userId?: string;
};

export type Split = {
  id?: string;
  userId?: string;
  name: string;
  splitStatus?: boolean;
  totalAmount: number;
  splitMethod: string;
  createdAt?: Date;
  updatedAt?: Date;
  SplitMember?: SplitMember[];
}

export type SplitMember = {
  name: string;
  email?: string;
  amount: number;
}

export type Splits = Split[];

export type Friends = Friend[];
