import { z } from "zod";

const Item = z.object({
  id: z.string().uuid(),
  label: z.string(),
  url: z.string().url(),
});

type Items = z.infer<typeof Item> & {
  subitems: Items[];
};

export const NavItem: z.ZodType<Items> = Item.extend({
  subitems: z.lazy(() => NavItem.array()),
});
export type NavItem = z.infer<typeof NavItem>;
