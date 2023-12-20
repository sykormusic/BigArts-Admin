import React, { useEffect } from "react";
import { Table, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Status",
    dataIndex: "status",
    width: "20%",
  },

  // {
  //   title: "Action",
  //   dataIndex: "action",
  // },
];

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const onUpdateOrderStatus = async (id, val) => {
    const res = await dispatch(
      updateOrderStatus({
        id: id,
        status: val,
      })
    );
    if (res?.payload?._id) {
      toast.success("Order Status Updated Successfully");
    }
  };

  const orderState = useSelector((state) => state.auth.orders);

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].orderby.firstname,
      product: <Link to={`/admin/order/${orderState[i]._id}`}>View Order</Link>,
      amount: orderState[i].paymentIntent.amount,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      status: (
        <Select
          style={{
            width: "100%",
          }}
          defaultValue={orderState[i]?.orderStatus}
          options={[
            "Not Processed",
            "Cash on Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered",
          ].map((status, i) => ({
            value: status,
            label: status,
          }))}
          onChange={(val) => onUpdateOrderStatus(orderState[i]._id, val)}
        />
      ),
      action: (
        <>
          <Link to="/" className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;
