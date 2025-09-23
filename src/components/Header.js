import React from "react";

export function Header(props) {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-[#e5e3e8]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div>
              <h3>MENU</h3>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-blue-600 font-bold text-xl">
                  <img
                    src={"/Logo.png"}
                    alt="Logo"
                    className="h-[50px] w-[250px]"
                  />
                </span>
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
    </>
  );
}
