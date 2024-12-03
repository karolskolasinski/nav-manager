import { NavItem } from "@/app/contrancts";
import Image from "next/image";

export function NavItemComponent(props: { navItem: NavItem }) {
  const { navItem } = props;

  return (
    <div className="w-full rounded-md max-w-[73rem] flex flex-col items-center border border-solid border-border-primary bg-transparent">
      <div className="w-full py-spacing-2xl px-spacing-3xl rounded-md flex flex-col md:flex-row ms:items-center gap-spacing-xs bg-white">
        <div className="flex gap-spacing-xs md:flex-1">
          <div className="w-[40px] h-[40px] flex justify-center">
            <Image src="/move.svg" alt="icon" width={25} height={25} />
          </div>

          <div className="flex flex-col flex-1 gap-spacing-sm">
            <div className="font-semibold text-sm">{navItem.label}</div>
            <div className="text-sm text-text-tertiary-600">{navItem.url}</div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 rounded-l-md flex gap-2 items-center font-semibold border border-solid border-button-secondary-border hover:bg-gray-100">
            Usuń
          </button>

          <button className="bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 flex gap-2 items-center font-semibold border border-solid border-button-secondary-border border-x-0 hover:bg-gray-100">
            Edytuj
          </button>

          <button className="bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 rounded-r-md flex gap-2 items-center font-semibold border border-solid border-button-secondary-border hover:bg-gray-100">
            Dodaj <span className="hidden md:block">pozycję menu</span>
          </button>
        </div>
      </div>

      <div>
        {navItem.subitems.map((subitem) => <div key={subitem.id}>{subitem.label}</div>)}
      </div>

      <div className="w-full py-spacing-2xl px-spacing-3xl flex items-center bg-transparent">
        <button className="bg-white h-[40px] text-button-secondary-fg text-sm py-1 px-6 rounded-md flex gap-2 items-center font-semibold border border-solid border-button-secondary-border hover:bg-gray-100">
          Dodaj podstronę
        </button>
      </div>
    </div>
  );
}
