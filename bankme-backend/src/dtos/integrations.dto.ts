export type PayableDTO = {
  id?: number;
  value: number;
  emissionDate: Date;
  assignor: number;
};

export type AssignorDTO = {
  id?: number;
  document: string;
  phone: string;
  email: string;
  name: string;
};
