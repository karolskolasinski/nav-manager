"use client";
import { useState } from "react";
import { NavItem } from "@/app/contrancts";

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [items, setItems] = useState([] as NavItem[]);

  const handleShowFormClick = () => setIsFormVisible(true);

  const addItem = (data: NavItem) => {
    const newItems: NavItem[] = [...items, data];
    setItems(newItems);
    setIsFormVisible(false);
  };

  return (
    <>
      {items.map((item) => <div>item</div>)}
    </>
  );
}
