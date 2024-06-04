import React from "react";

export default function Message({ type, message }) {
  return (
    <div className={type ? "" : "hidden "}>
      <div
        className={
          (type == "Info"
            ? " bg-sblue-100"
            : type == "Error"
            ? " bg-red-200"
            : " bg-green-200") + " rounded-lg w-full p-3 "
        }
      >
        <span
          className={
            type == "Info"
              ? "text-sblue-200"
              : type == "Error"
              ? "text-red-900"
              : "text-green-800"
          }
        >
          <span className="font-medium">{type}!</span>
          {" " + message}
        </span>
      </div>
    </div>
  );
}
