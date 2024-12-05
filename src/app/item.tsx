"use client";
import { Item } from "@/app/contracts";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Form } from "@/app/form";

type Props = {
  item: Item;
  isChild?: boolean;
  onRemove: (id: string) => void;
};

export function NavItem(props: Props) {
  const { item, isChild, onRemove } = props;
  const [itemForm, setItemForm] = useState<string | null>(null);
  const [itemList, setItemList] = useState([item] as Item[]);
  const [lastRemovedItemId, setLastRemovedItemId] = useState<string | null>(null);
  const [toEdit, setToEdit] = useState<number | null>(null);

  function addItem(item: Item) {
    const parsed = Item.safeParse(item);
    if (!parsed.success) {
      alert("Formularz zawiera błędy, popraw błędy i spróbuj jeszcze raz.");
      return;
    }

    setItemForm(null);

    // if found id than override
    const index = itemList.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      itemList[index] = item;
      setItemList((prev) => [...prev]);
      setToEdit(null);
      return;
    }

    setItemList((prev) => [...prev, item]);
  }

  function removeItem(itemId: string) {
    setItemList((prev) => prev.filter((item) => item.id !== itemId));
    setLastRemovedItemId(itemId);
  }

  useEffect(() => {
    if (itemList.length === 0 && lastRemovedItemId) {
      onRemove(lastRemovedItemId);
    }
  }, [itemList, lastRemovedItemId]);

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

    setItemForm(null);
  }

  function removeSubItem(itemId: string, subItemId: string) {
    const item = itemList.find((item) => item.id === itemId);
    if (!item) {
      return;
    }

    item.subItems = item.subItems.filter((subItem) => subItem.id !== subItemId);

    setItemList((prev) => {
      const newItems = [...prev];
      const index = newItems.findIndex((item) => item.id === itemId);
      newItems[index] = item;
      return newItems;
    });
  }

  function edit(index: number) {
    setToEdit(index);
    setItemForm("main");
  }

  function showNewItemForm() {
    setToEdit(null);
    setItemForm("main");
  }

  const buttonClass =
    "bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 flex gap-2 items-center font-semibold border border-solid border-button-secondary-border";

  return (
    <div className="w-full max-w-[73rem]">
      {itemList.map((item, index) => (
        <div
          key={item.id}
          {...(isChild && { className: "pl-[64px]" })}
        >
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
                className={`${buttonClass} rounded-l-md hover:bg-gray-100`}
              >
                Usuń
              </button>

              <button
                onClick={() => edit(index)}
                className={`${buttonClass} border-x-0 hover:bg-gray-100`}
              >
                Edytuj
              </button>

              <button
                onClick={() => setItemForm(item.id)}
                className={`${buttonClass} rounded-r-md hover:bg-gray-100`}
              >
                Dodaj <span className="hidden md:block">pozycję menu</span>
              </button>
            </div>
          </div>

          {/* for adding and editing sub items */}
          {itemForm === item.id && (
            <div className="px-spacing-3xl py-spacing-xl w-full bg-bg-secondary">
              <Form
                onAddItem={(data) => addSubItem(data, index)}
                onAbort={() => setItemForm(null)}
              />
            </div>
          )}

          {item.subItems.map((subItem) => (
            <NavItem
              key={subItem.id}
              item={subItem}
              isChild={true}
              onRemove={(subItemId) => removeSubItem(item.id, subItemId)}
            />
          ))}

          {/* for adding and editing main items */}
          {itemForm === "main" && index === itemList.length - 1 && (
            <div className="px-spacing-3xl py-spacing-xl w-full bg-bg-secondary">
              <Form
                onAddItem={(data) => addItem(data)}
                onAbort={() => setItemForm(null)}
                item={toEdit !== null ? itemList[toEdit] : undefined}
              />
            </div>
          )}

          {index === itemList.length - 1 && !isChild && (
            <div className="px-spacing-3xl py-spacing-xl w-full bg-bg-secondary">
              <button
                onClick={() => showNewItemForm()}
                className={`${buttonClass} rounded-md hover:bg-gray-100`}
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
