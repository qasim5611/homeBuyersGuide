import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const payload = {
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

    const res = await fetch(
      "https://api.corelogic.asia/statistics/v1/statistics.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      throw new Error(`CoreLogic API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
