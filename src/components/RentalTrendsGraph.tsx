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

// Register chart.js modules
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
  Token: string;
}

export function RentalTrendsGraph({ Token }: GraphProps) {
  const [graphData, setGraphData] = useState<any>(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await axios.post("/api/rentalGraph", { token: Token });
        const graphResponse = response.data.seriesResponseList;

        console.log("graphResponse", graphResponse);

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
      } catch (error) {
        console.error("Frontend fetch error:", error);
      }
    };

    fetchGraphData();
  }, [Token]);

  if (!graphData) return <p>Loading graph...</p>;

  return (
    <div>
      <h3 className="text-[#3d3b40]">Median Sale Price Graph</h3>
      <Line data={graphData} />
    </div>
  );
}
