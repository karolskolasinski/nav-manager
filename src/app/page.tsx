"use client";
import { useState } from "react";
import { Item } from "@/app/contracts";
import Image from "next/image";
import { Form } from "@/app/form";
import { NavItem } from "@/app/item";

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [item, setMenuList] = useState<Item | null>(null);

  function addMenu(item: Item) {
    const parsed = Item.safeParse(item);
    if (!parsed.success) {
      alert("Formularz zawiera błędy, popraw błędy i spróbuj jeszcze raz.");
      return;
    }
    setMenuList(item);
    setIsFormVisible(false);
  }

  function removeMenu() {
    setMenuList(null);
  }

  return (
    <main className="p-8 flex flex-col gap-8 items-center">
      <div className="w-full max-w-[73rem] rounded-md bg-bg-secondary flex flex-col p-4 gap-spacing-3xl items-center border border-solid border-border-secondary">
        <div className="text-center flex flex-col gap-spacing-xs">
          <div className="font-bold text-text-primary-900">Menu jest puste</div>
          <div className="text-sm text-text-tertiary-600">
            W tym menu nie ma jeszcze żadnych linków.
          </div>
        </div>

        {!isFormVisible && (
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-button-primary-bg h-[40px] text-white text-sm py-1 px-6 rounded-md flex gap-2 items-center font-semibold hover:brightness-110"
          >
            <Image src="/icon.svg" alt="icon" width={19} height={20} />
            Dodaj pozycję menu
          </button>
        )}

        {isFormVisible && <Form onAddItem={addMenu} onAbort={() => setIsFormVisible(false)} />}
      </div>

      {item !== null && <NavItem item={item} onRemove={removeMenu} />}
    </main>
  );
}
