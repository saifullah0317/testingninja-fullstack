"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
export default function Navbar({ selectedRoute, bg }) {
  function highlightRoute(divRoute) {
    if (selectedRoute === divRoute) {
      return "font-bold";
    }
    return "";
  }
  return (
    <nav className={`${bg} fixed w-full z-20 top-0 left-0 right-0 start-0`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/images/logo.png"
            height={60}
            width={60}
            // style={{ borderRadius: "100px" }}
            className="rounded-full"
            alt="logo"
          />
          <span className="text-spurple-300 self-center text-2xl font-semibold swhitespace-nowrap ">
            testingninja
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* <button
            type="button"
            className="text-swhite  font-medium rounded-lg text-sm px-4 py-2 text-center md:bg-spurple-300 bg-spurple-300"
          >
            Get started
          </button> */}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-spurple-300 rounded-lg md:hidden hover:bg-transparent focus:outline-none"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:bg-transparent ">
            <li>
              <Link
                href="/"
                className={`text-lg text-spurple-300 block py-2 px-3 ${highlightRoute(
                  "home"
                )} bg-transparent md:hover:text-spurple-300 md:p-0 `}
                aria-current="page"
                style={
                  selectedRoute === "home"
                    ? { borderBottom: "3px solid currentColor" }
                    : {}
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/exambrowser"
                className={`text-lg text-spurple-300 block py-2 px-3 ${highlightRoute(
                  "exambrowser"
                )} hover:bg-transparent md:hover:bg-transparent md:hover:text-spurple-300 md:p-0 `}
                style={
                  selectedRoute === "exambrowser"
                    ? { borderBottom: "3px solid currentColor" }
                    : {}
                }
              >
                Attempt test
              </Link>
            </li>
            <li>
              <Link
                href="/#second"
                className={`text-lg text-spurple-300 block py-2 px-3 ${highlightRoute(
                  "about"
                )} hover:bg-transparent md:hover:bg-transparent md:hover:text-spurple-300 md:p-0 `}
                style={
                  selectedRoute === "about"
                    ? { borderBottom: "3px solid currentColor" }
                    : {}
                }
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={`text-lg text-spurple-300 block py-2 px-3 ${highlightRoute(
                  "pricing"
                )} hover:bg-transparent md:hover:bg-transparent md:hover:text-spurple-300 md:p-0 `}
                style={
                  selectedRoute === "pricing"
                    ? { borderBottom: "3px solid currentColor" }
                    : {}
                }
              >
                Pricing
              </Link>
            </li>
            <li>
              {/* <a> */}
              <Link
                href="/#contact"
                className={`text-lg text-spurple-300 block py-2 px-3 hover:bg-transparent md:hover:bg-transparent md:hover:text-spurple-300 md:p-0`}
              >
                Contact
              </Link>
              {/* </a> */}
            </li>
            <li>
              <Link
                href="/login"
                className={`text-lg text-spurple-300 block py-2 px-3 ${highlightRoute(
                  "login"
                )} hover:bg-transparent md:hover:bg-transparent md:hover:text-spurple-300 md:p-0 `}
                style={
                  selectedRoute === "login"
                    ? { borderBottom: "3px solid currentColor" }
                    : {}
                }
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className={`text-lg text-spurple-300 block py-2 px-3 ${highlightRoute(
                  "signup"
                )} hover:bg-transparent md:hover:bg-transparent md:hover:text-spurple-300 md:p-0 `}
                style={
                  selectedRoute === "signup"
                    ? { borderBottom: "3px solid currentColor" }
                    : {}
                }
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
