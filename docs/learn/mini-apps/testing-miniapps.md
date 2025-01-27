---
sidebar_label: '🧪 Testing Mini-Apps Locally'
description: 'How to run and test your mini-app locally'
sidebar_position: 2
---

# 🧪 Testing Mini-Apps Locally

To test mini-apps in action on Universal Everything, we need to expose our mini-app to an URL that can be accessed by the UP Provider.

We will be using [localtunnel](https://github.com/localtunnel/localtunnel) for this purpose.

## Install `localtunnel`

Install `localtunnel` globally to access it from any directory.

```bash
npm install -g localtunnel
```

## Run `localtunnel`

In a new terminal window, run the following command:

```bash
lt --port <PORT> // localhost port that your mini-app is running on (e.g. 3000)
```

Running the command will generate a random URL. Initial visit to this URL will ask for a password, you can use **your IP address** to access your mini-app.

![localtunnel-visit](/img/learn/localtunnel-visit.png)

:::info

If you don't have your IP address in hand, you can visit the URL on the page to retrieve it.

:::

## Test your Mini-App on Universal Everything

Go to your Universal Profile on Universal Everything, and add your mini-app with using the provided URL to your Grid.
