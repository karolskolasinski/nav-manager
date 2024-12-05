"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Item } from "@/app/contracts";

type Props = {
  onAddItem: (item: Item) => void;
  onAbort: () => void;
  item?: Item;
};

export function Form(props: Props) {
  const { onAddItem, onAbort, item } = props;
  const [id, setId] = useState(uuidv4());
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (item) {
      setId(item.id);
      setLabel(item.label);
      setUrl(item.url);
    } else {
      setId(uuidv4());
      setLabel("");
      setUrl("");
    }
  }, [item]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAddItem({ id, label, url, children: [] });
      }}
      className="w-full rounded-md max-w-[73rem] py-spacing-2xl px-spacing-3xl bg-white flex flex-col gap-spacing-2xl items-center border border-solid border-border-primary"
    >
      <input type="hidden" name="id" value={id} />

      <div className="w-full flex">
        <div className="w-full flex flex-col gap-[8px]">
          <div className="flex flex-col gap-1">
            <label htmlFor="label" className="text-sm text-text-secondary-700">Nazwa</label>
            <input
              type="text"
              name="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="np. Promocje"
              className="text-text-primary-900 px-4 py-2 border border-solid  border-border-primary rounded-md"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="url" className="text-sm text-text-secondary-700">Link</label>
            <div className="relative">
              <input
                type="url"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Wklej lub wyszukaj"
                className="w-full text-text-primary-900 pl-10 pr-4 py-2 border border-solid  border-border-primary rounded-md"
              />
              <Image
                src="/search.svg"
                alt="icon"
                width={20}
                height={20}
                className="absolute top-1/2 transform -translate-y-1/2 left-spacing-xl"
              />
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            setLabel("");
            setUrl("");
          }}
          className="cursor-pointer w-[40px] h-[40px] flex justify-center ml-spacing-2xl invisible sm:visible"
        >
          <Image
            src="/trash.svg"
            alt="icon"
            width={25}
            height={25}
            className="min-w-[25px]"
          />
        </div>
      </div>

      <div className="flex gap-[8px] self-start">
        <button
          onClick={onAbort}
          className="bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 rounded-md flex gap-2 items-center font-semibold border border-solid border-button-secondary-border hover:bg-gray-100"
        >
          Anuluj
        </button>

        <button
          type="submit"
          className="bg-white h-[40px] text-button-secondary-color-fg text-sm py-1 px-6 rounded-md flex gap-2 items-center font-semibold border border-solid border-button-secondary-color-border hover:bg-violet-50"
        >
          {label !== "" ? "Zapisz" : "Dodaj"}
        </button>
      </div>
    </form>
  );
}
