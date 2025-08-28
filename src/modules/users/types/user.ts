import { Address } from "./address";

type CreateUserDTO = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: Address;
};

type UpdateUserDTO = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: Address;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address_id: string;
};

export type { User, CreateUserDTO, UpdateUserDTO };
