"use client"; // Add this line at the very top

import { useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic"; // Import dynamic
// Sample array of addresses (ArrayCodes)
import ArrayCodes from "../utils/AllAustralianCodes";
import Link from "next/link";
// Dynamically import Autocomplete with ssr: false to ensure it is only rendered on the client side
// const Autocomplete = dynamic(() => import("@mui/material/Autocomplete"), {
//   ssr: false,
// });
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";
const TextField = dynamic(() => import("@mui/material/TextField"), {
  ssr: false,
});
const Chip = dynamic(() => import("@mui/material/Chip"), { ssr: false });
const Stack = dynamic(() => import("@mui/material/Stack"), { ssr: false });

// Function to convert address to URL format
const formatAddressToUrl = (address: string) => {
  const regex = /([\w\s]+),\s([A-Za-z]+)\s(\d{4})/; // Matches address format
  const match = address.match(regex);

  if (match) {
    const [_, name, state, postcode] = match;
    const formattedName = name.trim().toLowerCase().replace(/\s+/g, "-");
    const formattedState = state.toLowerCase();
    return `${formattedState}/${postcode}-${formattedName}`;
  }
  return ""; // Return empty string if format doesn't match
};

export default function Home() {
  const filterOptions = createFilterOptions<string>({
    limit: 50, // show max 50 results
  });

  const [activeTab, setActiveTab] = useState("buy");
  const [activeExploreTab, setActiveExploreTab] = useState("buying");
  const [maplist, setmaplist] = useState<{ raw: string; formatted: string }[]>(
    []
  );
  const [searchBtnClicked, setSearchBtnClicked] = useState(false);

  // Handles change in selected items in the Autocomplete
  const onChangeHandlerMap = (value: string[]) => {
    const newMapList = value.map((address) => ({
      raw: address, // Store raw address
      formatted: formatAddressToUrl(address), // Store formatted address
    }));
    setmaplist(newMapList);
    setSearchBtnClicked(false);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    let obj = { maplist };
    console.log("obj", obj);
    setSearchBtnClicked(true); // Trigger the display of results after search
  };

  // Convert all addresses in ArrayCodes to the desired format for options in Autocomplete
  const top100Films = ArrayCodes.map((address) => ({
    title: formatAddressToUrl(address), // Transform the address into a URL-friendly format
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Real Estate Australia</title>
        <meta name="description" content="Find properties to call home" />
      </Head>

      {/* Hero Section with Search */}
      <div className="bg-custom-pic py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Properties to call home
            </h1>

            {/* Search Box */}
            <div className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto items-center justify-center">
              <Stack spacing={3} sx={{ width: "60%" }}>
                <Autocomplete
                  sx={{ color: "black", backgroundColor: "white" }}
                  multiple
                  id="tags-filled"
                  options={ArrayCodes}
                  filterOptions={filterOptions}
                  freeSolo
                  onChange={(event, value) => onChangeHandlerMap(value)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        sx={{ color: "black" }}
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      sx={{ color: "black" }}
                      {...params}
                      variant="filled"
                      label="Search Australian States"
                      name="list"
                    />
                  )}
                />
              </Stack>

              <button
                onClick={onSubmit}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 cursor-pointer"
              >
                Search
              </button>
            </div>

            {/* Search Options */}
            <div className="mt-4 text-white text-sm">
              <a href="#" className="hover:underline">
                Advanced Search
              </a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:underline">
                Search by Map
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            {/* {searchBtnClicked === true ? ( */}
            {searchBtnClicked && maplist.length > 0 && (
              <>
                {maplist.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200"
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <svg
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Get estimated property At {item.raw}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Get a free property report with estimated price range,
                        local sales data, and more.
                      </p>
                      <Link
                        href={{
                          pathname: "/homeBuyerGuide", // Define the page you want to navigate to
                          query: { address: item.formatted }, // Pass the formatted address as a query parameter
                        }}
                      >
                        Get a realEstimate →
                      </Link>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Get estimated property prices with a realEstimate
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Get a free property report with estimated price range, local sales
            data, and more.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Get a realEstimate →
          </a>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Need help with a mortgage?
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Calculate your borrowing power and get pre-approved for a home loan.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Calculate repayments →
          </a>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Explore suburb profiles
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Discover local market data, demographics, and lifestyle information.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            Research suburbs →
          </a>
        </div>
      </div> */}
    </div>
  );
}
