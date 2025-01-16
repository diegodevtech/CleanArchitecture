type Product = {
  id: string;
  name: string;
  price: number;
}

export interface InputListProductDTO {}

export interface OutputListProductDTO {
  products: Product[];
}