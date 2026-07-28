export type CustomerStatus = "NEW" | "CONTACTED" | "NEGOTIATION" | "WON" | "LOST";

export type Customer = {
  _id: string;
  name: string;
  phone: string;
  status: CustomerStatus;
  createdAt?: string;
};
