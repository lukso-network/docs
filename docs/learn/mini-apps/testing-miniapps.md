---
sidebar_label: '🧪 Testing Mini-Apps Locally'
description: 'How to run and test your Mini-App locally'
sidebar_position: 2
---

# 🧪 Testing Mini-Apps Locally

To test Mini-Apps in action on Universal Everything, we need to expose our Mini-App to an URL that can be accessed by the UP Provider.

We will be using [localtunnel](https://github.com/localtunnel/localtunnel) for this purpose.

## Install `localtunnel`

Install `localtunnel` globally to access it from any directory.

```bash
npm install -g localtunnel
```

## Run `localtunnel`

In a new terminal window, run the following command:

```bash
lt --port <PORT> // localhost port that your Mini-App is running on (e.g. 3000)
```

Running the command will generate a random URL. Initial visit to this URL will ask for a password, you can use **your IP address** to access your Mini-App.

![localtunnel-visit](/img/learn/localtunnel-visit.png)

:::info

If you don't have your IP address in hand, you can visit the URL on the page to retrieve it.

:::

## Test your Mini-App on Universal Everything

Go to your Universal Profile on Universal Everything, and add your Mini-App with using the provided URL to your Grid.
