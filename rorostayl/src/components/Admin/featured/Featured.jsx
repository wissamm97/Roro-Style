import "./featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
const Featured = () => {
  const { orders } = useSelector((state) => state.admin);
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  const todaysOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate.getDate() === currentDay;
  });
  const getLastWeekSales = () => {
    const lastWeekDate = new Date();
    lastWeekDate.setDate(currentDate.getDate() - 7);
    const lastWeekOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= lastWeekDate && orderDate <= currentDate;
    });
    return calculateTotalSales(lastWeekOrders);
  };

  const getLastMonthSales = () => {
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);
    const lastMonthOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getMonth() === lastMonthDate.getMonth() &&
        orderDate.getFullYear() === lastMonthDate.getFullYear()
      );
    });
    return calculateTotalSales(lastMonthOrders);
  };

  const calculateTotalSales = (sales) => {
    let total = 0;
    for (const order of sales) {
      const amount = parseFloat(order.amount);
      if (!isNaN(amount)) {
        total += amount;
      }
    }
    return total;
  };

  const lastWeekSales = getLastWeekSales();
  const lastMonthSales = getLastMonthSales();
  // Calculate the percentage of total sales made today compared to a target value
  const targetValue = 1000; // Set your target value here
  const todaySalesPercentage = (calculateTotalSales(todaysOrders) / targetValue) * 100;
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
        <CircularProgressbar value={todaySalesPercentage} text={`${todaySalesPercentage.toFixed(0)}%`} strokeWidth={5} />
          {/* <CircularProgressbar value={70} text={"70%"} strokeWidth={5} /> */}
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">${todaysOrders > 0 ? todaysOrders : 0}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <div className="resultAmount">${lastWeekSales.toFixed(2)}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <div className="resultAmount">${lastMonthSales.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
