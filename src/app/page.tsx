"use client";
import { useState } from "react";
import { NavItem } from "@/app/contrancts";
import Image from "next/image";
import { Form } from "@/app/form";

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [itemList, setItemList] = useState([] as NavItem[]);

  const handleShowFormClick = () => setIsFormVisible(true);

  const addItem = (data: NavItem) => {
    const newItems: NavItem[] = [...itemList, data];
    setItemList(newItems);
    setIsFormVisible(false);
  };

  return (
    <main className="p-8 flex flex-col gap-8 items-center">
      <div className="w-full rounded-md max-w-[73rem] p-4 bg-bg-secondary flex flex-col gap-8 items-center border border-solid border-border-secondary">
        {!itemList.length && emptyListText()}

        <button
          onClick={handleShowFormClick}
          className="bg-button-primary-bg h-[40px] text-white text-sm py-1 px-6 rounded-md flex gap-2 items-center font-semibold"
        >
          <Image src="/icon.svg" alt="icon" width={19} height={20} />
          Dodaj pozycję menu
        </button>
      </div>

      {isFormVisible && <Form onAddItem={addItem} />}

      {itemList.map((item) => <div>item</div>)}
    </main>
  );
}

function emptyListText() {
  return (
    <div className="text-center flex flex-col gap-1">
      <div className="font-bold text-text-primary-900">Menu jest puste</div>
      <div className="text-sm text-text-tertiary-600">
        W tym menu nie ma jeszcze żadnych linków.
      </div>
    </div>
  );
}
