"use client";
import { useState } from "react";
import Menu from "@/app/menu";

export default function Home() {
  const [menuList, setMenuList] = useState(["default"] as string[]);

  function addMenu(id: string) {
    setMenuList((prev) => [...prev, id]);
  }

  function removeMenu(id: string) {
    setMenuList((prev) => prev.filter((menu) => menu !== id));
  }

  return (
    <main className="p-8 flex flex-col gap-8 items-center">
      {menuList.map((id) => (
        <Menu
          key={id}
          id={id}
          onAddMenu={(id) => addMenu(id)}
          onRemoveMenu={(id) => removeMenu(id)}
        />
      )).reverse()}
    </main>
  );
}
