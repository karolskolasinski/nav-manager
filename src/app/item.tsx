import { NavItem } from "@/app/contrancts";

export function NavItemComponent(props: { navItem: NavItem }) {
  const { navItem } = props;

  return (
    <div>
      <div>
        {navItem.label}
      </div>

      <div>
        {navItem.url}
      </div>

      <div>
        {navItem.subitems.map((subitem) => <div key={subitem.id}>{subitem.label}</div>)}
      </div>
    </div>
  );
}
