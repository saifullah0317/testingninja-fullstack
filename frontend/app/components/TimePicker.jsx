import React from "react";
import { useState } from "react";
export default function TimePicker({ setTime }) {
  const [selectedHour, setSelectedHour] = useState();
  const [selectedMinute, setSelectedMinute] = useState();
  function calculateMinutes() {
    return (Number(selectedHour) * 60) + Number(selectedMinute);
  }
  return (
    <div className="flex flex-row items-center justify-start space-x-2">
      <input
        type="number"
        min={0}
        max={23}
        value={selectedHour}
        onChange={(e) => {
          setSelectedHour(e.target.value);
          if (selectedHour && selectedMinute) {
            setTime(calculateMinutes());
            console.log("Time selected as:", calculateMinutes());
          }
        }}
        placeholder="hours"
        className="w-28 rounded-lg border border-swhite text-spurple-300"
      />
      <span>:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={selectedMinute}
        onChange={(e) => {
          setSelectedMinute(e.target.value);
          if (selectedHour && selectedMinute) {
            setTime(calculateMinutes());
            console.log("Time selected as:", calculateMinutes());
          }
        }}
        placeholder="minutes"
        className="w-28 rounded-lg border border-swhite text-spurple-300"
      />
    </div>
  );
}
