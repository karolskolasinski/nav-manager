"use client";
import { useState } from "react";
import { NavItem } from "@/app/contrancts";
import Image from "next/image";
import { Form } from "@/app/form";
import { NavItemComponent } from "@/app/item";

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [itemList, setItemList] = useState([] as NavItem[]);

  const addItem = (data: NavItem) => {
    const parsed = NavItem.safeParse(data);
    if (!parsed.success) {
      alert("Formularz zawiera błędy, popraw błędy i spróbuj jeszcze raz.");
      return;
    }

    const newItems: NavItem[] = [...itemList, data];
    setItemList(newItems);
    setIsFormVisible(false);
  };

  const removeItem = (itemId: string) => {
    const newItems = itemList.filter((item) => item.id !== itemId);
    setItemList(newItems);
  };

  return (
    <main className="p-8 flex flex-col gap-8 items-center">
      <div className="w-full rounded-md max-w-[73rem] p-4 bg-bg-secondary flex flex-col gap-spacing-3xl items-center border border-solid border-border-secondary">
        {!itemList.length && emptyListText()}

        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-button-primary-bg h-[40px] text-white text-sm py-1 px-6 rounded-md flex gap-2 items-center font-semibold hover:brightness-110"
        >
          <Image src="/icon.svg" alt="icon" width={19} height={20} />
          Dodaj pozycję menu
        </button>
      </div>

      {isFormVisible && <Form onAddItem={addItem} onAbort={() => setIsFormVisible(false)} />}

      {itemList.map((item) => (
        <NavItemComponent
          key={item.id}
          navItem={item}
          onRemoveItem={(itemId) => removeItem(itemId)}
        />
      ))}
    </main>
  );
}

function emptyListText() {
  return (
    <div className="text-center flex flex-col gap-spacing-xs">
      <div className="font-bold text-text-primary-900">Menu jest puste</div>
      <div className="text-sm text-text-tertiary-600">
        W tym menu nie ma jeszcze żadnych linków.
      </div>
    </div>
  );
}
