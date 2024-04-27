import { Table } from "antd";
import { useHome } from "./useHome";

const { Column } = Table;

const HomePage = () => {
  const { products, handleDeleteProduct } = useHome();
  return (
    <>
      <Table dataSource={products} rowKey="product_id">
        <Column title="ID" dataIndex="product_id" key="id" />
        <Column title="Nome" dataIndex="name" key="name" />
        <Column title="Descrição" dataIndex="description" key="description" />
        <Column title="Preço" dataIndex="price" key="price" />
        <Column title="Quantidade" dataIndex="qtd" key="qtd" />
        <Column
          title="Ações"
          dataIndex=""
          key="x"
          render={(item) => (
            <a
              key={item.product_id}
              onClick={() => handleDeleteProduct(item.product_id)}
            >
              Deletar
            </a>
          )}
        />
      </Table>
    </>
  );
};

export { HomePage };
