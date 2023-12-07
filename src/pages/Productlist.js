import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  // {
  //   title: "Color",
  //   dataIndex: "color",
  // },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();

  const [deleteModal, setDeleteModal] = useState("");

  const onGetData = () => {
    dispatch(getProducts());
  };

  const onDelete = async () => {
    const res = await dispatch(deleteProduct(deleteModal));
    if (res) {
      toast.success("Product Deleted Successfully");
      onGetData();
      setDeleteModal("");
    }
  };

  useEffect(() => {
    onGetData();
  }, []);

  const productState = useSelector((state) => state.product.products);
  const data1 = [];

  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `${productState[i].price}`,
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <div
            className="ms-3 fs-3 text-danger"
            onClick={() => setDeleteModal(productState[i]._id)}
          >
            <AiFillDelete />
          </div>
        </>
      ),
    });
  }
  console.log(data1);
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <Modal
        open={deleteModal}
        onOk={onDelete}
        onCancel={() => setDeleteModal("")}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
    </div>
  );
};

export default Productlist;
