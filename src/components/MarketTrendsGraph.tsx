import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphProps {
  Token: string; // Specify the type of Token (string)
}
export function Graph(Token: GraphProps) {
  // const [graphData, setGraphData] = useState < any > null;
  const [graphData, setGraphData] = useState<any>({ labels: [], datasets: [] });

  useEffect(() => {
    const data = {
      seriesRequestList: [
        {
          interval: 12,
          fromDate: "2015-01-01",
          toDate: "2025-12-31",
          locationId: "9167",
          locationTypeId: 8,
          metricTypeId: 21,
          propertyTypeId: 1,
        },
        {
          interval: 12,
          fromDate: "2015-01-01",
          toDate: "2025-12-31",
          locationId: "9167",
          locationTypeId: 8,
          metricTypeId: 21,
          propertyTypeId: 2,
        },
      ],
    };
    console.log("Token at Graphs", Token.Token);
    const config = {
      method: "post",
      url: "https://api.corelogic.asia/statistics/v1/statistics.json",
      headers: {
        accept: "application/json",
        // "accept-encoding": "gzip, deflate, br, zstd",
        "content-type": "application/json;charset=UTF-8",
        authorization: `Bearer ${Token.Token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        // Process the response data into the format needed for the chart
        const graphResponse = response.data.seriesResponseList;
        const chartData = {
          labels: graphResponse[0].seriesDataList.map(
            (data: any) => data.dateTime
          ),
          datasets: [
            {
              label: "Houses",
              data: graphResponse[0].seriesDataList.map(
                (data: any) => data.value
              ),
              borderColor: "rgba(75,192,192,1)",
              fill: false,
            },
            {
              label: "Units",
              data: graphResponse[1].seriesDataList.map(
                (data: any) => data.value
              ),
              borderColor: "rgba(255,99,132,1)",
              fill: false,
            },
          ],
        };
        setGraphData(chartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!graphData) return <p>Loading graph...</p>;

  return (
    <div>
      <h3>Median Sale Price Graph</h3>
      <Line data={graphData} />
    </div>
  );
}
