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

      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg"
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Profile
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="dashboard-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
            >
              Dashboard
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="settings-tab"
              data-tabs-target="#settings"
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected="false"
            >
              Settings
            </button>
          </li>
          <li role="presentation">
            <button
              className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              id="contacts-tab"
              data-tabs-target="#contacts"
              type="button"
              role="tab"
              aria-controls="contacts"
              aria-selected="false"
            >
              Contacts
            </button>
          </li>
        </ul>
      </div>
      <div id="default-tab-content">
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Profile tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classNamees to control the
            content visibility and styling.
          </p>
        </div>
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Dashboard tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classNamees to control the
            content visibility and styling.
          </p>
        </div>
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="settings"
          role="tabpanel"
          aria-labelledby="settings-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Settings tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classNamees to control the
            content visibility and styling.
          </p>
        </div>
        <div
          className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          id="contacts"
          role="tabpanel"
          aria-labelledby="contacts-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{" "}
            <strong className="font-medium text-gray-800 dark:text-white">
              Contacts tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classNamees to control the
            content visibility and styling.
          </p>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
