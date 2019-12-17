## The Big Party Board

A fun little web app created with `React` and `socket.io` that you can leave running on a fullscreen browser on your TV during your house parties. Invite your friends to scan the QR Code on the screen to let them draw whatever they want. Their drawings will show up on your telly floating like an old DVD screensaver!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo

You can access a running demo of this project on https://thebigpartyboard.herokuapp.com
(Please note that any of your drawings will appear to anyone with the main page open)

## Screenshot

![](demogif.gif)

## Installation

```bash
git clone https://github.com/luizschiestl/thebigpartyboard.git
cd thebigpartyboard
yarn
```

## Usage

To run the app in development mode first you must create a `.env` file in the root directory declaring the following variables:

-   `PORT` The port number in which you wish to run the server. Optional if you don't have anything running on port 8080;
-   `REACT_APP_URL` The URL in which your React app will be running;
-   `REACT_APP_SOCKET_URL` The URL of your server. It must end with the same port number of the `PORT` variable.

`.env` example:

```
PORT=8081
REACT_APP_URL=http://192.168.1.128:3000
REACT_APP_SOCKET_URL=http://192.168.1.128:8081
```

After that you can simply run:

```bash
yarn server | yarn start
```

## Build

Run `yarn build`.
Then, restart your server with `yarn server`.
You can now access the build on the same address of your server. You also need to change the `REACT_APP_URL` environment variable to point to your server's URL.

## Deployment

This project is ready to be deployed in Heroku. All you have to do is create a `REACT_APP_URL` Config Var on your app's settings pointing to your heroku app URL.
