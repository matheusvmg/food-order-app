class Order {
  tablenumber: string;
  cellphone: string;
  total_price: number;
  status: string;
  product_id?: string;
  observation?: string;

  constructor(
    tablenumber: string,
    cellphone: string,
    total_price: number,
    status: string,
    product_id?: string,
    observation?: string
  ) {
    this.tablenumber = tablenumber;
    this.cellphone = cellphone;
    this.total_price = total_price;
    this.status = status;
    this.product_id = product_id;
    this.observation = observation;
  }
}

export { Order };
