import React from "react";
import styles from "./Chart.module.css";
import { Line, Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { selectData, selectDailyData, selectCountry } from "../covidSlice";

const Chart = () => {
  // sliceで作成したdataを使用するための準備
  const data = useSelector(selectData);
  const dailyData = useSelector(selectDailyData);
  const country = useSelector(selectCountry);

  //   Barチャートの生成
  const barChart = data && (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "#008080",
              "rgba(0, 0, 255, 0.5)",
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        // グラフのタイトル
        title: { display: true },
        text: `Latest status in ${country}`,
      }}
    />
  );

  //   lineチャートの生成
  //   dailyDataが存在する時のみ表示
  const lineChart = dailyData[0] && (
    <Line
      data={{
        labels: dailyData.map(({ reportDate }) => reportDate),
        datasets: [
          {
            data: dailyData.map((data) => data.confirmed.total),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map((data) => data.deaths.total),
            label: "Deaths",
            borderColor: "#ff3370",
            fill: true,
          },
        ],
      }}
    />
  );
  return (
    <div className={styles.container}>
      {country.length ? barChart : lineChart}
    </div>
  );
};

export default Chart;
