class Product {
  name: string;
  description: string;
  price: number;
  qtd: number;

  constructor(name: string, description: string, price: number, qtd: number) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.qtd = qtd;
  }
}

export { Product };
