"use client"; // Ensure this line is at the very top
import { Graph } from "@/components/MarketTrendsGraph";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false, // Disable server-side rendering for this component
});
interface ScrapeData {
  breadcrumbs?: { name: string; link: string | null }[];
  heading?: string;
  subheading?: string;
  map?: {
    link: string;
    image: string;
    svg?: string;
  };
  sections?: {
    title: string;
    text: string;
    image?: string;
    graph?: string;
  }[];
  tabs?: {
    title: string;
    content: string;
  }[];
  keyMarketData?: {
    label: string;
    house: string;
    unit: string;
  }[];
  keyDemographics?: {
    label: string;
    value2011: string;
    value2016: string;
  }[];
  yipChartsToken?: string;
  error?: string;
}

export default function VictoriaPoint() {
  const [data, setData] = useState<ScrapeData | null>(null);
  const [address, setAddress] = useState<string | undefined>(undefined); // Add a state to store the address
  const [activeTab, setActiveTab] = useState(0); // 🔥 track which tab is open

  const searchParams = useSearchParams();

  useEffect(() => {
    const addressQuery = searchParams.get("address");
    if (addressQuery) {
      setAddress(addressQuery);
    }
  }, [searchParams]);
  useEffect(() => {
    if (address) {
      // Fetch data from the API with the address once it's set
      fetch(`/api/scrape?address=${address}`)
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch((err) => setData({ error: err.message }));
    }
  }, [address]); // Fetch when address changes

  if (!data) return <p>Loading...</p>;

  console.log("yipChartsToken_Token", data.yipChartsToken);
  const token = data.yipChartsToken || "";

  console.log("yipChartsToken_Token", token);

  return (
    <div className="p-6 space-y-4">
      {/* Breadcrumbs */}
      {data.breadcrumbs && (
        <div className="text-sm text-gray-500 flex gap-2">
          {data.breadcrumbs.map((crumb, idx) => (
            <span key={idx}>
              {crumb.link ? (
                <a href={crumb.link} className="underline">
                  {crumb.name}
                </a>
              ) : (
                crumb.name
              )}
              {idx < data.breadcrumbs!.length - 1 && " › "}
            </span>
          ))}
        </div>
      )}

      {/* Map */}
      {data.heading ? (
        <LeafletMap address={data.heading + " Australia"} />
      ) : (
        "Loading..."
      )}

      <br />
      <br />

      <div className="lg:w-1/2 mx-auto">
        <h1 className="text-2xl font-bold text-[#3d3b40] font-montserrat ">
          {data.heading}
        </h1>
        <p className="text-gray-700 text-[#3d3b40]">{data.subheading}</p>

        {/* Sections */}
        {data.sections?.map((section, idx) => (
          <div key={idx} className="border-b pb-4 mb-4">
            {section.title && (
              <h2 className="text-xl font-semibold text-[#3d3b40]">
                {section.title}
              </h2>
            )}
            {section.text && <p className="text-[#3d3b40]">{section.text}</p>}
            {section.image && (
              <img
                src={section.image}
                alt={section.title}
                className="rounded-md mt-2"
              />
            )}
            {section.graph && (
              <img
                src={section.graph}
                alt={`${section.title} graph`}
                className="rounded-md mt-2"
              />
            )}
          </div>
        ))}

        {/* Tabs */}
        {data.tabs && data.tabs.length > 0 && (
          <div>
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200">
              {data.tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2 -mb-px text-sm font-medium border-b-2 ${
                    activeTab === idx
                      ? "border-[#eb0909] text-[#3d3b40] cursor-default"
                      : "border-transparent text-[#3d3b40] hover:text-gray-700 hover:border-gray-300 cursor-pointer"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4 p-4 border border-[#e5e3e8] rounded-md bg-gray-50 text-[#3d3b40d9]">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: data.tabs[activeTab].content,
                }}
              />
            </div>
          </div>
        )}

        {/* Sections */}
        {data.sections?.map((section, idx) => (
          <div key={idx} className="border-b pb-4 mb-4">
            {section.title && (
              <h2 className="text-xl font-semibold">{section.title}</h2>
            )}
            {section.text && <p className="text-gray-700">{section.text}</p>}
            {section.image && (
              <img
                src={section.image}
                alt={section.title}
                className="rounded-md mt-2"
              />
            )}
            {section.graph && (
              <img
                src={section.graph}
                alt={`${section.title} graph`}
                className="rounded-md mt-2"
              />
            )}
          </div>
        ))}

        {/* Key Market Data Table */}
        {data.keyMarketData && (
          <div className="my-6">
            <h2 className="text-xl font-semibold text-[#3d3b40]">
              Key Market Data
            </h2>
            <table className="min-w-full mt-4 table-auto border-collapse border border-[#E5E3E8]">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Label</th>
                  <th className="border px-4 py-2">House</th>
                  <th className="border px-4 py-2">Unit</th>
                </tr>
              </thead>
              <tbody>
                {data.keyMarketData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">{row.label}</td>
                    <td className="border px-4 py-2">{row.house}</td>
                    <td className="border px-4 py-2">{row.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Key Demographics Table */}
        {data.keyDemographics && (
          <div className="my-6">
            <h2 className="text-xl font-semibold text-[#3d3b40]">
              Key Demographics
            </h2>
            <table className="min-w-full mt-4 table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Label</th>
                  <th className="border px-4 py-2">2011</th>
                  <th className="border px-4 py-2">2016</th>
                </tr>
              </thead>
              <tbody>
                {data.keyDemographics.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">{row.label}</td>
                    <td className="border px-4 py-2">{row.value2011}</td>
                    <td className="border px-4 py-2">{row.value2016}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Graph Token={token} />
      </div>
    </div>
  );
}
