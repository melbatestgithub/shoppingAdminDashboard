import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState, useEffect, useMemo } from "react";
import { userRequest } from "../../requestMethods";
export default function Home() {
  const month = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Augest",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  const [users, setUserStats] = useState([]);
  useEffect(() => {
    getUserStat();
  }, []);

  const getUserStat = async () => {
    try {
      const res = await userRequest.get("/users/stats");
      const stat = res.data;
      stat.map((item) =>
        setUserStats((p) => [
          ...p,
          { name: month[item._id - 1], "Active User": item.total },
        ])
      );
    } catch (error) {
      console.log("unable to fetch user stat");
    }
  };

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={users} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
