export interface InputCreateProductDTO {
  type: string;
  name: string;
  price: number;
}

export interface OutputCreateProductDTO {
  id: string;
  name: string;
  price: number;
}