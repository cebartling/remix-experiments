import type { ActionFunction, DataFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import type { LinkTokenCreateRequest } from 'plaid';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

export const action: ActionFunction = async function ({
  request
}: DataFunctionArgs) {
  const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET
      }
    }
  });

  const client = new PlaidApi(configuration);

  const configs = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: 'user-id'
    },
    client_name: process.env.PLAID_CLIENT_NAME,
    products: ['auth', 'transactions'],
    country_codes: ['US', 'CA'],
    language: 'en'
  } as LinkTokenCreateRequest;

  if (process.env.PLAID_REDIRECT_URI !== '') {
    configs.redirect_uri = process.env.PLAID_REDIRECT_URI;
  }

  const createTokenResponse = await client.linkTokenCreate(configs);

  return json(
    {
      linkToken: createTokenResponse.data
    },
    {
      headers: {}
    }
  );
};
