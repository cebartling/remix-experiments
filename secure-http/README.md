# Remix: Secure HTTP in Express server

## Overview

Using the [following Medium post](https://medium.com/@dogukanakkaya/local-https-express-server-with-remix-framework-f7723c657066) to implement HTTPS in a Remix/Express app.



## Implementation

1. Create a new key and self-signed certificate:

    ```shell
    openssl req -newkey rsa:4096 -x509 -sha256 -days 3650 -nodes -out localhost.crt -keyout localhost.key
    ```

1. Add the new self-signed certificate to trusted certificates on your system:

    ```shell
   sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ./localhost.crt
    ```



## Remix stuff
- [Remix Docs](https://remix.run/docs)

### Development

Start the Remix development asset server and the Express server by running:

```sh
npm run dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

### Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

