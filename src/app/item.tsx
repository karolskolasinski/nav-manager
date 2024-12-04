"use client";
import { Item } from "@/app/contracts";
import Image from "next/image";
import React, { useState } from "react";
import { Form } from "@/app/form";

type Props = {
  item: Item;
  isChild?: boolean;
};

export function NavItem(props: Props) {
  const { item, isChild } = props;
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [visibleForms, setVisibleForms] = useState<string[]>([]);
  const [itemList, setItemList] = useState([item] as Item[]);

  function addItem(item: Item) {
    const parsed = Item.safeParse(item);
    if (!parsed.success) {
      alert("Formularz zawiera błędy, popraw błędy i spróbuj jeszcze raz.");
      return;
    }

    setItemList((prev) => [...prev, item]);
    setIsFormVisible(false);
  }

  function removeItem(itemId: string) {
    setItemList((prev) => prev.filter((item) => item.id !== itemId));
  }

  function showForm(itemId: string) {
    setVisibleForms((prev) => [...prev, itemId]);
  }

  function hideForm(itemId: string) {
    setVisibleForms((prev) => prev.filter((formId) => formId !== itemId));
  }

  function addSubItem(data: Item, index: number) {
    const parsed = Item.safeParse(data);
    if (!parsed.success) {
      alert("Formularz zawiera błędy, popraw błędy i spróbuj jeszcze raz.");
      return;
    }

    const item = itemList[index];
    item.subItems.push(data);
    setItemList((prev) => {
      const newItems = [...prev];
      newItems[index] = item;
      return newItems;
    });

    hideForm(itemList[index].id);
  }

  const indentation = isChild ? "pl-[64px]" : "";

  return (
    <div className="w-full max-w-[73rem]">
      {itemList.map((item, index) => (
        <div key={item.id} className={indentation}>
          <div className="py-spacing-2xl px-spacing-3xl flex flex-col md:flex-row ms:items-center gap-spacing-xs bg-white">
            <div className="flex gap-spacing-xs md:flex-1">
              <div className="w-[40px] h-[40px] flex justify-center">
                <Image src="/move.svg" alt="icon" width={25} height={25} />
              </div>

              <div className="flex flex-col flex-1 gap-spacing-sm">
                <div className="font-semibold text-sm">{item.label}</div>
                <div className="text-sm text-text-tertiary-600">{item.url}</div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => removeItem(item.id)}
                className="bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 rounded-l-md flex gap-2 items-center font-semibold border border-solid border-button-secondary-border hover:bg-gray-100"
              >
                Usuń
              </button>

              <button className="bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 flex gap-2 items-center font-semibold border border-solid border-button-secondary-border border-x-0 hover:bg-gray-100">
                Edytuj
              </button>

              <button
                onClick={() => showForm(item.id)}
                className="bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 rounded-r-md flex gap-2 items-center font-semibold border border-solid border-button-secondary-border hover:bg-gray-100"
              >
                Dodaj <span className="hidden md:block">pozycję menu</span>
              </button>
            </div>
          </div>

          {/* for adding sub items */}
          {visibleForms.includes(item.id) && (
            <div className="px-spacing-3xl py-spacing-xl w-full bg-bg-secondary">
              <Form
                onAddItem={(data) => addSubItem(data, index)}
                onAbort={() => hideForm(item.id)}
              />
            </div>
          )}

          {item.subItems.map((subItem) => (
            <NavItem
              key={subItem.id}
              item={subItem}
              isChild={true}
            />
          ))}

          {/* for adding items */}
          {isFormVisible && index === itemList.length - 1 && (
            <div className="px-spacing-3xl py-spacing-xl w-full bg-bg-secondary">
              <Form
                onAddItem={(data) => addItem(data)}
                onAbort={() => setIsFormVisible(false)}
              />
            </div>
          )}

          {index === itemList.length - 1 && !isChild && (
            <div className="px-spacing-3xl py-spacing-xl w-full bg-bg-secondary">
              <button
                onClick={() => setIsFormVisible(true)}
                className="bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 rounded-md flex gap-2 items-center font-semibold border border-solid border-button-secondary-border hover:bg-gray-100"
              >
                Dodaj pozycję menu
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
