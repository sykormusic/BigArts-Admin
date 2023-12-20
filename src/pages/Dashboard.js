import { Column } from "@ant-design/plots";
import React, { useEffect, useState } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { renderMoney } from "../utils/function";
import {
  getMonthlyData,
  getTotalOrderData,
  getYearlyData,
} from "../features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { monthlyData: monthlyDataState, totalOrderData = {} } = useSelector(
    (state) => state.auth
  );
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setMonthlySales] = useState([]);
  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
    dispatch(getTotalOrderData());
  }, []);

  console.log(monthlyDataState);

  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
    }
    setDataMonthly(data);
    setMonthlySales(monthlyOrderCount);
  }, [monthlyDataState]);

  //   const orderState = useSelector((state) => state.auth.orders);
  // };
  // const Dashboard2 = () => {
  //   const dispatch = useDispatch();

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between gap-3 align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Sold</p>
            <h4 className="mb-0 sub-title">{totalOrderData.count}</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between gap-3 align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total</p>
            <h4 className="mb-0 sub-title">
              {renderMoney(totalOrderData.total)}
            </h4>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-5 title">Sales Statics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
