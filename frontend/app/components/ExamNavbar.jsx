"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
export default function ExamNavbar(props) {
  // console.log("time from navbar: ",time)
  return (
    <nav className='bg-swhite shadow-xl fixed w-full z-20 top-0 left-0 right-0 start-0'>
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
        {/* <div className={props.time?"text-sgray-500 text-lg":"hidden"}>
          <span>{Math.floor(props.time/3600)>0?Math.floor(props.time/3600)+' : ':''}{Math.floor((props.time%3600)/60)+' : '}{props.time%60}</span>
        </div> */}
        <button className={props.submitResponse?"px-5 py-2 bg-spurple-300 text-swhite rounded-lg":'hidden'} onClick={props.submitResponse}>
          Submit Exam
        </button>
      </div>
    </nav>
  );
}
