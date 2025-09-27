import * as z from 'zod';
const categories = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
export const taskSchema = z.object({
  title: z
    .string()
    .min(5, 'Minimum 5 characters ')
    .max(255, 'Maximum 255 characters').nonempty("please enter your title "),
  category_id: z.coerce.number().refine((val) => categories.includes(val), {
    message: 'The selected category id does not exist',
  }),
  description: z.string().nonempty("please enter your description "),
});
export type taskFormFields = z.infer<typeof taskSchema>;
