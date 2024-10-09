"use client";

import { useState } from "react";

export default function NewItem() {
  const [count, setCount] = useState(1);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 bg-opacity-80 p-20 rounded-xl shadow-2xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-white">{count}</h1>
        <div className="flex justify-center space-x-4">
          <button
            onClick={decrement}
            disabled={count === 1}
            className={`bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 ${
              count === 1 ? "bg-gray-400 hover:bg-gray-400" : ""
            }`}
          >
            Decrement
          </button>
          <button
            onClick={increment}
            disabled={count === 20}
            className={`bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 ${
              count === 20 ? " bg-gray-400 hover:bg-gray-400" : ""
            }`}
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
}
