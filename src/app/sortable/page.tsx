"use client";
import React, { useState } from "react";
import {
  SimpleTreeItemWrapper,
  SortableTree,
  TreeItemComponentProps,
  TreeItems,
} from "dnd-kit-sortable-tree";
import _ from "lodash";
import { Item } from "@/app/sortable/contracts";
import Image from "next/image";

export default function App() {
  const [items, setItems] = useState<TreeItems<Item>>(initialViableMinimalData);

  const handleAdd = (mm: string) => {
    console.log(mm);
  };

  return (
    <main className="p-8 w-full max-w-[73rem]">
      <SortableTree
        items={items}
        onItemsChanged={setItems}
        TreeItemComponent={(props) => <TreeItem {...props} onAdd={handleAdd} />}
      />
    </main>
  );
}

interface ExtendedTreeItemProps extends TreeItemComponentProps<Item> {
  onAdd: (parentId: string) => void;
}

const TreeItem = React.forwardRef<HTMLDivElement, ExtendedTreeItemProps>(
  (props, ref) => {
    const { item, onAdd } = props;
    const cleanProps = _.omit(props, ["onAdd"]);

    const buttonClass =
      "bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 flex gap-2 items-center font-semibold border border-solid border-button-secondary-border";

    return (
      <div className="w-full">
        <SimpleTreeItemWrapper
          {...cleanProps}
          ref={ref}
          showDragHandle={false}
          indentationWidth={64}
        >
          <div className="w-full py-spacing-2xl px-spacing-3xl flex flex-row ms:items-center gap-spacing-xs bg-white items-center">
            <div className="w-[40px] h-[40px] flex justify-center">
              <Image src="/move.svg" alt="icon" width={25} height={25} />
            </div>

            <div className="flex flex-col flex-1 gap-spacing-sm">
              <div className="font-semibold text-sm">{item.label}</div>
              <div className="text-sm text-text-tertiary-600">{item.url}</div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => console.log(item.id)}
                className={`${buttonClass} rounded-l-md hover:bg-gray-100`}
              >
                Usuń
              </button>

              <button
                onClick={() => console.log(item.id)}
                className={`${buttonClass} border-x-0 hover:bg-gray-100`}
              >
                Edytuj
              </button>

              <button
                onClick={() => console.log(item.id)}
                className={`${buttonClass} rounded-r-md hover:bg-gray-100`}
              >
                Dodaj <span className="hidden md:block">pozycję menu</span>
              </button>
            </div>

            {/*<button*/}
            {/*  className="bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 flex gap-2 items-center font-semibold border border-solid border-button-secondary-border"*/}
            {/*  onClick={() => onAdd("item.id")}*/}
            {/*>*/}
            {/*  Dodaj*/}
            {/*</button>*/}
          </div>
        </SimpleTreeItemWrapper>
      </div>
    );
  },
);

const initialViableMinimalData: TreeItems<Item> = [
  {
    id: 1,
    label: "111",
    url: "https://example.com",
    children: [
      { id: 4, label: "222", url: "http://example.com", children: [] },
      { id: 5, label: "3333", url: "https://localhost:8080", children: [] },
    ],
  },
];
