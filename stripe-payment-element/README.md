# Stripe Integration
This web application demonstrates using Stripe with Remix!

- The `stripe` Node.js module is used server-side in the Remix action functions to create Stripe resources based on form submissions.
- The `@stripe/stripe-js` and `@stripe/react-stripe-js` modules are uses client-side for rendering the Payment Element and capturing payment method information and submitting that to Stripe.



## Remix.run

- [Remix Docs](https://remix.run/docs)

### Development

1. Create a product and price in your Stripe test mode environment. Take note of the price ID.
1. Create the `.env` file in the project root directory and set the following environment variable values:
    ```dotenv
    STRIPE_PUBLISHABLE_KEY=<Stripe publishable key>
    STRIPE_SECRET_KEY=<Stripe secret key>
    STRIPE_STANDARD_SERVICE_PRICE_ID=<Stripe price id for standard service product>
    BASE_URL=http://localhost:3000
   ```
1. Start the Remix dev server. From your terminal:

    ```sh
    npm run dev
    ```
    
    This starts your app in development mode, rebuilding assets on file changes.
    
