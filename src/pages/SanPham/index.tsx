import React, { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  message,
  Space,
} from 'antd';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const SanPham: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 },
    { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 },
    { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 },
    { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 },
    { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },
  ]);

  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [form] = Form.useForm();

  const onAdd = (values: any) => {
    const newProduct: Product = {
      id: Date.now(),
      name: values.name,
      price: values.price,
      quantity: values.quantity,
    };

    setProducts([...products, newProduct]);
    message.success('Thêm sản phẩm thành công');
    form.resetFields();
    setVisible(false);
  };

  const onDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    message.success('Xóa sản phẩm thành công');
  };

  const dataShow = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );


  const columns = [
    {
      title: 'STT',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (v: number) => v.toLocaleString('vi-VN') + ' ₫',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Thao tác',
      render: (_: any, record: Product) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa sản phẩm này không?"
          onConfirm={() => onDelete(record.id)}
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý sản phẩm</h2>

      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Tìm theo tên sản phẩm"
          allowClear
          onChange={e => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={() => setVisible(true)}>
          Thêm sản phẩm
        </Button>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataShow}
        bordered
      />

      <Modal
        title="Thêm sản phẩm"
        visible={visible}    
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onAdd}>
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              { required: true, message: 'Vui lòng nhập giá' },
              { type: 'number', min: 1, message: 'Giá phải là số dương' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng' },
              { type: 'number', min: 1, message: 'Số lượng phải là số nguyên dương' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Thêm
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default SanPham;
