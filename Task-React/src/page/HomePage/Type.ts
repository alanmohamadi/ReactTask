export type Step = "closed" | "select" | "manual" | "success";

export interface CardFormData {
  cardNumber: string; 
  expiryMonth: string; 
  expiryYear: string; 
  cvv: string;
  saveCard: boolean;
}

export interface BankOption {
  id: string;
  name: string;
  tag: string;
  color: string;
}

export const BANKS: BankOption[] = [
  { id: "bajaj", name: "Bajaj Finance", tag: "B", color: "#1E4FD9" },
  { id: "bob", name: "BOB Bank", tag: "b", color: "#E8541E" },
  { id: "canara", name: "Canara Bank", tag: "C", color: "#12312B" },
  { id: "hdfc", name: "HDFC Bank", tag: "H", color: "#B21F2D" },
  { id: "icici", name: "ICICI Bank", tag: "I", color: "#B21F2D" },
];