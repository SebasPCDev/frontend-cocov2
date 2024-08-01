interface IResponseRequest {
  id: string | undefined ;
  name: string | null;
  lastname: string | null;
  phone: string | null;
  email: string | null;
  dateCreated: string | null;
  identification: string | null;
  position: string | null;
  companyName: string | null;
  companyEmail: string | null;
  companyPhone: string | null;
  quantityBeneficiaries: number | null;
  businessSector: string | null;
  size: number | null;
  address: string | null;
  website: string | null;
  open: string | null;
  close: string | null;
  capacity: number | null;
  message: string | null;
  status: string | null;
  observation: string | null;
  type: string | null | undefined;
}

export default IResponseRequest;
