class Product {
  name: string;
  description: string;
  price: number;
  qtd: number;
  category_id?: string;
  option_id?: string;

  constructor(
    name: string,
    description: string,
    price: number,
    qtd: number,
    category_id?: string,
    option_id?: string
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.qtd = qtd;
    this.category_id = category_id;
    this.option_id = option_id;
  }
}

export { Product };
