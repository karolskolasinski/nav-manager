import { z } from "zod";

const BaseItem = z.object({
  id: z.number(),
  label: z.string().min(1),
  url: z.string().url(),
});

type Children = z.infer<typeof BaseItem> & {
  children: Children[];
};

export const Item: z.ZodType<Children> = BaseItem.extend({
  children: z.lazy(() => Item.array()),
});
export type Item = z.infer<typeof Item>;
