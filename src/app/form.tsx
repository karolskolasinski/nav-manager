"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { NavItem } from "@/app/contracts";

type Props = {
  onAddItem: (navItem: NavItem) => void;
  onAbort: () => void;
};

export function Form(props: Props) {
  const { onAddItem, onAbort } = props;
  const [id] = useState(uuidv4());
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAddItem({ id, label, url, subitems: [] });
      }}
      className="w-full rounded-md max-w-[73rem] py-spacing-2xl px-spacing-3xl bg-white flex flex-col gap-spacing-2xl items-center border border-solid border-border-primary"
    >
      <div className="w-full flex">
        <div className="w-full flex flex-col gap-[8px]">
          <div className="flex flex-col gap-1">
            <label htmlFor="label" className="text-sm text-text-secondary-700">Nazwa</label>
            <input
              type="text"
              name="label"
              defaultValue={label}
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
                defaultValue={url}
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

        <div className="cursor-pointer w-[40px] h-[40px] flex justify-center ml-spacing-2xl">
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
          Dodaj
        </button>
      </div>
    </form>
  );
}
