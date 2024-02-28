import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import logo from "../images/c7bfba41e5c04691b076b125231388d4__1_-removebg-preview.png";
import ScrollToTop from "react-scroll-to-top";

export function Footer() {
  return (
    <footer className="bg-[#f0e0d0] md:pt-14">
      <ScrollToTop
        smooth
        color="#994B00"
        className="bg-gray-100 transition-all duration-300 hover:bg-[#994b002a] shadow-lg shadow-gray-400"
        width="40"
      />

      <div className="z-20 mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 ">
        <div className="md:flex  md:justify-between">
          <div className="mb-6 md:mb-10">
            <div className="items-center  md:w-4/5">
              <img src={logo} className="-mt-16" alt="Halahomes Logo" />
              <p className="text-center md:text-left text-gray-500 -mt-5">
                When entering the housing market, the real estate sector offers
                a wide array of choices.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-lg font-semibold text-gray-900 ">
                Menu
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Our Community
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Our Value
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg font-semibold text-gray-900 ">
                Services
              </h2>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline ">
                    Terms and Conditions
                  </a>
                </li>

                <li className="mb-4">
                  <a href="#" className="hover:underline ">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Open Library
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-left md:block">
              <h2 className="hidden md:block md:ml-10 mb-6 text-lg font-semibold text-gray-900 ">
                Let's Connect
              </h2>
              <div className="pl-10  text-gray-500">
                Email:info@urbanhomes.ca
              </div>
              <div className="ml-10 justify-between pt-5 flex">
                <a
                  href="#"
                  className="text-[#f0e0d0] mr-4 p-3 bg-[#994B00] rounded-full transition duration-300 ease-out hover:text-[#994B00] hover:bg-opacity-25"
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 8 19"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Facebook page</span>
                </a>

                <a
                  href="mailto:info@urbanhomes.ca"
                  class="text-[#f0e0d0] mr-4 p-3 bg-[#994B00] rounded-full transition duration-300 ease-out hover:text-[#994B00]  hover:bg-opacity-25 ms-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#!"
                  class="text-[#f0e0d0] mr-4 p-3 bg-[#994B00] rounded-full transition duration-300 ease-out hover:text-[#994B00]  hover:bg-opacity-25 ms-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-[#994B00] sm: flex items-center justify-center sm:pl-6 py-4">
        <span className="text-sm text-center text-white sm:text-center ">
          Copyright @ Urban Homes
        </span>
        {/* <span className="text-sm text-slate-300 sm:text-center ">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved. </span> */}
      </div>
    </footer>
  );
}

export default Footer;
