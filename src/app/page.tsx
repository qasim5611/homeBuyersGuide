"use client"; // Add this line at the very top
// pages/index.js
import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [activeTab, setActiveTab] = useState("buy");
  const [activeExploreTab, setActiveExploreTab] = useState("buying");

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Real Estate Australia</title>
        <meta name="description" content="Find properties to call home" />
      </Head>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-blue-600 font-bold text-xl">
                  <img
                    src={"/logo.png"}
                    alt="Logo"
                    // className="h-[50px] w-[250px]"
                  />
                </span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Buy
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Rent
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sold
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    New Homes
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Find Agents
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Lifestyle
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    News
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button className="bg-gray-200 p-1 rounded-full text-gray-700 hover:text-gray-900 focus:outline-none">
                  <span className="sr-only">Sign In</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Search */}
      <div className="bg-custom-pic py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Properties to call home
            </h1>

            {/* Search Tabs */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    activeTab === "buy"
                      ? "bg-white text-blue-600"
                      : "bg-blue-500 text-white hover:bg-blue-400"
                  }`}
                  onClick={() => setActiveTab("buy")}
                >
                  Buy
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "rent"
                      ? "bg-white text-blue-600"
                      : "bg-blue-500 text-white hover:bg-blue-400"
                  }`}
                  onClick={() => setActiveTab("rent")}
                >
                  Rent
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "sold"
                      ? "bg-white text-blue-600"
                      : "bg-blue-500 text-white hover:bg-blue-400"
                  }`}
                  onClick={() => setActiveTab("sold")}
                >
                  Sold
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    activeTab === "new"
                      ? "bg-white text-blue-600"
                      : "bg-blue-500 text-white hover:bg-blue-400"
                  }`}
                  onClick={() => setActiveTab("new")}
                >
                  New Homes
                </button>
              </div>
            </div>

            {/* Search Box */}
            <div className="flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
              <div className="flex-grow">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="Enter a suburb, postcode, or address"
                />
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
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
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Explore all things property
          </h2>

          {/* Explore Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeExploreTab === "buying"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } border border-gray-200`}
                onClick={() => setActiveExploreTab("buying")}
              >
                Buying
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  activeExploreTab === "renting"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } border-t border-b border-gray-200`}
                onClick={() => setActiveExploreTab("renting")}
              >
                Renting
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  activeExploreTab === "selling"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } border-t border-b border-gray-200`}
                onClick={() => setActiveExploreTab("selling")}
              >
                Selling
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeExploreTab === "investing"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } border border-gray-200`}
                onClick={() => setActiveExploreTab("investing")}
              >
                Investing
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Get estimated property prices with a realEstimate
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Get a free property report with estimated price range, local
                sales data, and more.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Get a realEstimate →
              </a>
            </div>

            {/* Card 2 */}
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Need help with a mortgage?
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Calculate your borrowing power and get pre-approved for a home
                loan.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Calculate repayments →
              </a>
            </div>

            {/* Card 3 */}
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Explore suburb profiles
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Discover local market data, demographics, and lifestyle
                information.
              </p>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Research suburbs →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm">
              © 2025 homebuyerguide.com.au Pty Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
