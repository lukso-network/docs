---
sidebar_label: '🧪 Testing Mini-Apps Locally'
description: 'How to run and test your Mini-App locally'
sidebar_position: 2
---

# 🧪 Testing Mini-Apps Locally

:::info UniversalEverything Update

As of April 2025, developers can use their **localhost URL** to add their mini-apps to the Grid and test it.

:::

To test Mini-Apps in action on Universal Everything, we need to expose our Mini-App to an URL that can be accessed by the UP Provider.

We will be using [localtunnel](https://github.com/localtunnel/localtunnel) for this purpose.

## Prerequisites

- **Node.js and npm**: Ensure Node.js is installed on your system. If not, download and install it from the [official Node.js website](https://nodejs.org/).

## Install `localtunnel`

Install `localtunnel` globally to access it from any directory.

```bash
npm install -g localtunnel
```

If you encounter permission errors (EACCES), you may need administrator privileges:

```bash
sudo npm install -g localtunnel
```

## Start Your Mini-App Server

Start your development server. For Next.js projects, you can specify a custom port:

```bash
npm run dev -- -p 8000
```

Your app should be running locally, typically at: `http://localhost:8000`

## Run `localtunnel`

In a new terminal window (keep your app server running), execute the following command:

```bash
lt --port <PORT> // localhost port that your Mini-App is running on (e.g. 8000)
```

Running the command will generate a random URL. Initial visit to this URL will ask for a password, you can use **your IP address** to access your Mini-App.

![localtunnel-visit](/img/learn/localtunnel-visit.png)

## Troubleshooting the Password Screen

When accessing your Mini-App through the localtunnel URL, users may encounter a password screen. To bypass this:

1. Use your public IP address as the password
2. Alternatively, retrieve your password by visiting: `https://loca.lt/mytunnelpassword`
3. Or use this command in your terminal:
   ```bash
   curl https://loca.lt/mytunnelpassword
   ```

:::info
If you don't have your IP address in hand, you can visit the URL on the password page to retrieve it.
:::

## Test your Mini-App on Universal Everything

Go to your Universal Profile on Universal Everything, and add your Mini-App using the generated localtunnel URL to your Grid.
