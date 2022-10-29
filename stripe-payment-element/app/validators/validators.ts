import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';

export const customerValidator = withZod(
  z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('Must be a valid email'),
    city: z.string().min(1, { message: 'City is required' }),
    addressLine1: z.string().min(1, { message: 'Address is required' }),
    postalCode: z.string().min(1, { message: 'Postal code is required' }),
    state: z.string().min(1, { message: 'State is required' })
  })
);

export const promoCodeValidator = withZod(
  z.object({
    promoCode: z.string().optional()
  })
);
