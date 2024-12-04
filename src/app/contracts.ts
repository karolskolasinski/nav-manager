import { z } from "zod";

const BaseItem = z.object({
  id: z.string().uuid(),
  label: z.string().min(1),
  url: z.string().url(),
});

type SubItems = z.infer<typeof BaseItem> & {
  subItems: SubItems[];
};

export const Item: z.ZodType<SubItems> = BaseItem.extend({
  subItems: z.lazy(() => Item.array()),
});
export type Item = z.infer<typeof Item>;
