"use client";
import { useState } from "react";
import { NavItem } from "@/app/contracts";
import Image from "next/image";
import { Form } from "@/app/form";
import { Item } from "@/app/item";
import { v4 as uuidv4 } from "uuid";

type Props = {
  id: string;
  onAddMenu: (id: string) => void;
  onRemoveMenu: (id: string) => void;
};

export default function Menu(props: Props) {
  const { id, onAddMenu, onRemoveMenu } = props;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [itemList, setItemList] = useState([] as NavItem[]);

  function addItem(navItem: NavItem) {
    const parsed = NavItem.safeParse(navItem);
    if (!parsed.success) {
      alert("Formularz zawiera błędy, popraw błędy i spróbuj jeszcze raz.");
      return;
    }

    setItemList((prev) => [...prev, navItem]);
    setIsFormVisible(false);
    if (itemList.length === 0) {
      onAddMenu(uuidv4());
    }
  }

  function removeItem(itemId: string) {
    setItemList((prev) => prev.filter((item) => item.id !== itemId));
    onRemoveMenu(itemId);
  }

  const sectionClass = itemList.length ? "" : "p-4 gap-spacing-3xl";
  const btnClass = itemList.length
    ? "bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 rounded-md flex gap-2 items-center font-semibold border border-solid border-button-secondary-border hover:bg-gray-100"
    : "bg-button-primary-bg h-[40px] text-white text-sm py-1 px-6 rounded-md flex gap-2 items-center font-semibold hover:brightness-110";
  const btnWrapperClass = itemList.length ? "p-spacing-3xl justify-start" : "justify-center";

  return (
    <section
      className={`w-full rounded-md max-w-[73rem] bg-bg-secondary flex flex-col ${sectionClass} items-center border border-solid border-border-secondary`}
    >
      {itemList.map((item) => <Item key={item.id} navItem={item} onRemoveItem={removeItem} />)}

      {!itemList.length && (
        <div className="text-center flex flex-col gap-spacing-xs">
          <div className="font-bold text-text-primary-900">Menu jest puste</div>
          <div className="text-sm text-text-tertiary-600">
            W tym menu nie ma jeszcze żadnych linków.
          </div>
        </div>
      )}

      <div className={`w-full flex ${btnWrapperClass}`}>
        {!isFormVisible && (
          <button onClick={() => setIsFormVisible(true)} className={btnClass}>
            {!itemList.length && <Image src="/icon.svg" alt="icon" width={19} height={20} />}
            Dodaj pozycję menu
          </button>
        )}

        {isFormVisible && <Form onAddItem={addItem} onAbort={() => setIsFormVisible(false)} />}
      </div>
    </section>
  );
}
