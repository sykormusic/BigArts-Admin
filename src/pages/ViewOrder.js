import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import {
  getOrderById,
  getOrderByUser,
  getOrders,
} from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },

  // {
  //   title: "Action",
  //   dataIndex: "action",
  // },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  console.log("🚀 ~ file: ViewOrder.js:49 ~ ViewOrder ~ data:", data);

  useEffect(() => {
    dispatch(getOrderById(orderId)).then((res) => {
      setData(res.payload);
    });
  }, []);

  const products = data?.products || [];

  const data1 = [];
  for (let i = 0; i < products.length; i++) {
    data1.push({
      key: i + 1,
      name: products[i].product.title,
      brand: products[i].product.brand,
      count: products[i].count,
      amount: products[i].product.price,
      action: (
        <>
          {/* <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link> */}
          {/* <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link> */}
        </>
      ),
    });
  }

  const orderAddress = [
    data.paymentAddress?.address,
    data.paymentAddress?.ward,
    data.paymentAddress?.district,
    data.paymentAddress?.state,
  ]
    .filter(Boolean)
    .join(", ");

  const orderByInfo = data.paymentInfo
    ? [
        `${data.paymentInfo?.firstName} ${data.paymentInfo?.lastName}`,
        data.paymentInfo?.mobile,
      ]
        .filter(Boolean)
        .join(", ")
    : null;

  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <p>
          Date ordered: <b>{data?.createdAt}</b>
        </p>
        <p>
          Status: <b>{data?.orderStatus}</b>
        </p>
        <p>
          Address: <b>{orderAddress}</b>
        </p>
        <p>
          Order By: <b>{orderByInfo}</b>
        </p>

        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
