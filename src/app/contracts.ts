import { z } from "zod";

const BaseItem = z.object({
  id: z.string().uuid(),
  label: z.string().min(1),
  url: z.string().url(),
});

type SubItem = z.infer<typeof BaseItem> & {
  subItem?: SubItem;
};

export const Item: z.ZodType<SubItem> = BaseItem.extend({
  subItem: z.lazy(() => Item.optional()),
});
export type Item = z.infer<typeof Item>;
