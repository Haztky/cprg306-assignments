"use client";

import { useState, useEffect } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { getItems } from "../_services/shopping-list-service";
import { addItem } from "../_services/shopping-list-service";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
  const { user } = useUserAuth();
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      if (user?.uid) {
        try {
          const itemsData = await getItems(user.uid);
          console.log("Loaded items: ", itemsData);
          setItems(itemsData);
        } catch (error) {
          console.error("Error loading items: ", error);
        }
      }
    };

    loadItems();
  }, [user]);

  const handleItemSelect = (itemName) => {
    const cleanedItemName = itemName
      .split(",")[0]
      .trim()
      .replace(/[^\w\s]/gi, "");
    setSelectedItemName(cleanedItemName);
  };

  const handleAddItem = async (newItem) => {
    if (!user?.uid) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const newItemId = await addItem(user.uid, newItem);
      const updatedItem = { ...newItem, id: newItemId };
      console.log("New item added: ", updatedItem);
      setItems((prevItems) => [...prevItems, updatedItem]);
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col sm:flex-row">
      <div className="flex-1 sm:w-2/3 p-4">
        <h1 className="text-4xl p-4 font-bold text-center text-transparent bg-clip-text bg-gray-200 rounded-lg">
          Shopping List
        </h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect} />
      </div>

      <div className="flex-1 sm:w-1/3 p-4 ml-4">
        {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
      </div>
    </main>
  );
}
