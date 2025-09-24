// src/pages/api/market-trends.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = req.body; // frontend sends the token
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

    const response = await axios.post(
      "https://api.corelogic.asia/statistics/v1/statistics.json",
      data,
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json;charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("API Error", error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
}
