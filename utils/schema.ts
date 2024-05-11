import { z } from 'zod';

export const ZSupplier = z.object({
    firstname: z.string().min(2, {
        message: "FirstName must be at least 2 characters.",
    }),
    lastname: z.string().min(2, {
        message: "LastName must be at least 2 characters.",
    }),
    gender: z.string(),
    businesstype: z.string(),
    descriptions: z.string().optional(),
    active: z.boolean().default(true).optional()
});