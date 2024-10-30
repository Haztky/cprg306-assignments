"use client";
import React, { useState } from "react";
import Item from "./item";

export default function ItemList({ items }) {
  const [sortBy, setSortBy] = useState("name");
  const [groupByCategory, setGroupByCategory] = useState(false);
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });
  const groupedItems = sortedItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedItems).sort();

  return (
    <div>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => {
            setSortBy("name");
            setGroupByCategory(false);
          }}
          className={`rounded-md text-white px-4 py-2 mr-2 ${
            sortBy === "name" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => {
            setSortBy("category");
            setGroupByCategory(false);
          }}
          className={`rounded-md text-white px-4 py-2 mr-2 ${
            sortBy === "category" ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Sort by Category
        </button>
        <button
          onClick={() => {
            setGroupByCategory(true);
            setSortBy(null);
          }}
          className={`rounded-md text-white px-4 py-2 ${
            groupByCategory ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          Group by Category
        </button>
      </div>
      <ul className="m-6">
        {groupByCategory
          ? sortedCategories.map((category) => (
              <li key={category}>
                <h2 className="font-bold capitalize">{category}</h2>
                {groupedItems[category].map((item) => (
                  <Item key={item.id} {...item} />
                ))}
              </li>
            ))
          : sortedItems.map((item) => <Item key={item.id} {...item} />)}
      </ul>
    </div>
  );
}
