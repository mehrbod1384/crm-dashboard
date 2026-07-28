export type CustomerStatus = "NEW" | "CONTACTED" | "NEGOTIATION" | "WON" | "LOST";

export type Customer = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  status: CustomerStatus;
  notes?: string;
  createdAt?: string;
};

export type CustomerFormState = {
  name: string;
  phone: string;
  email: string;
  company: string;
  status: CustomerStatus;
  notes: string;
};
