import { BankAccount } from "./bankAccount-response.model";

export interface UserResponse {
    message: string;
    code: number;
      cuentasBancarias: BankAccount[];
  }