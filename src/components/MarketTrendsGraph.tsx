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
  localityID: string;
  Interval: string;
  fromDate: string;
  toDate: string;
  metricTypeId: string;
}

export function MarketTrendsGraph({
  Token,
  localityID,
  Interval,
  fromDate,
  toDate,
  metricTypeId,
}: GraphProps) {
  const [graphData, setGraphData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await axios.post("/api/marketGraph", {
          token: Token,
          localityID: localityID,
          interval: Interval,
          fromDate: fromDate,
          toDate: toDate,
          metricTypeId: metricTypeId,
        });
        const graphResponse = response.data.seriesResponseList;

        console.log("graphResponse", graphResponse);

        const labels =
          graphResponse[0]?.seriesDataList?.map((data: any) => data.dateTime) ||
          [];

        if (labels.length === 0) {
          setErrorMsg("Data is not currently available for this.");
          setGraphData(null);
          return;
        }

        const chartData = {
          labels,
          datasets: [
            {
              label: "Houses",
              data:
                graphResponse[0]?.seriesDataList?.map(
                  (data: any) => data.value
                ) || [],
              borderColor: "rgba(75,192,192,1)",
              fill: false,
            },
            {
              label: "Units",
              data:
                graphResponse[1]?.seriesDataList?.map(
                  (data: any) => data.value
                ) || [],
              borderColor: "rgba(255,99,132,1)",
              fill: false,
            },
          ],
        };

        console.log("chartData", chartData);

        setGraphData(chartData);
        setErrorMsg("");
      } catch (error) {
        console.error("Frontend fetch error:", error);
        setErrorMsg("Failed to fetch graph data.");
      }
    };

    fetchGraphData();
  }, [Token, localityID]);

  if (errorMsg) return <p style={{ color: "blue" }}>{errorMsg}</p>;

  if (!graphData) return <p>Loading graph...</p>;

  return (
    <div>
      <h3 className="text-[#3d3b40]">Median Sale Price Graph</h3>
      <Line data={graphData} />
    </div>
  );
}
