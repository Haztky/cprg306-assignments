"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };
  return (
    <main className="p-4 bg-zinc-950">
      <h1 className="text-4xl p-4 font-bold text-center text-transparent bg-clip-text bg-gray-200 rounded-lg">
        Shopping List
      </h1>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
}
