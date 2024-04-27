import { useEffect, useState } from "react";
import { api } from "../../service/api";

interface IProductsTableData {
  product_id: string;
  name: string;
  description: string;
  price: number;
  qtd: number;
}

const useHome = () => {
  const [products, setProducts] = useState<IProductsTableData[]>();

  const getProducts = async () => {
    const result = await api.get("/products");
    setProducts(() => result.data.products);
  };
  useEffect(() => {
    (async () => {
      await getProducts();
    })();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    await api.delete(`/products/${id}`);
    await getProducts();
  };

  return {
    products,
    handleDeleteProduct,
  };
};

export type { IProductsTableData };

export { useHome };
