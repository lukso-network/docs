---
sidebar_label: 'Install the UP Browser Extension'
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Install the UP Browser Extension

:::danger
The UP Browser Extenstion is currently in the **development alpha** version. DO NOT use this in production!
:::

This guide will teach you how to download and install the Universal Profile browser extension on Chrome, Edge, Opera, or Brave.

## Download the Extension

Click on link below to download the extension, based on the browser to which you want to install it.

### :inbox_tray: **[Download link (v1.0.0-develop.189)](https://storage.googleapis.com/up-browser-extension/universalprofile-extension-1.0.0-develop.189-2022-05-17.zip)**

## Unpack the Archive

Open your download folder and unpack the ZIP archive by opening the file.

## Install the Extension

<Tabs>
  <TabItem value="chrome" label="Chrome">

#### 1. Open the extension page in your browser.

<Tabs>
  <TabItem value="chrome-settings" label="Using Settings">

![Step 1 - Chrome: Extension Settings](/img/extension/chrome1.png)

  </TabItem>
  <TabItem value="chrome-menu" label="Using Menu Bar">

![Step 1 - Chrome: Extension Menu Bar](/img/extension/chrome2.png)

  </TabItem>
  <TabItem value="chrome-url" label="Using URL">

Type `chrome://extensions` into the searchbar to open the extension page.

  </TabItem>
</Tabs>

#### 2. Enable the browser's developer mode.

![Step 2 - Chrome: Enable Developer Mode](/img/extension/chrome3.png)

#### 3. Load the extension from the folder.

Click _Load unpacked_ pointing to the extracted ZIP archive of the extension.<br/>
Alternatively, drag and drop the zip file onto the extensions page.

![Step 3 - Chrome: Load Extension](/img/extension/chrome4.png)

#### 4. Pin the extension.

Pin the extension to the extension bar and click on the icon to open it up.

![Step 4 - Chrome: Pin Extension](/img/extension/chrome5.png)

#### 5. Launch the extension.

Open the extension by clicking its icon from the menu bar.

![Step 5 - Chrome: Open Extension](/img/extension/chrome6.png)

  </TabItem>
  <TabItem value="edge" label="Edge">

#### 1. Open the extension page in your browser.

<Tabs>
  <TabItem value="edge-settings" label="Using Settings">

![Step 1 - Edge: Extension Settings](/img/extension/edge1.png)

  </TabItem>
  <TabItem value="edge-menu" label="Using Menu Bar">

![Step 1 - Edge: Extension Menu Bar](/img/extension/edge2.png)

  </TabItem>
  <TabItem value="edge-url" label="Using URL">

Type `edge://extensions` into the searchbar to open the extension page.

  </TabItem>
</Tabs>

#### 2. Enable the browser's developer mode.

On the left side, turn the _Developer mode_ slider to the right side.

![Step 2 - Edge: Load Extension](/img/extension/edge3.png)

#### 3. Load the extension from the folder.

Click _Load unpacked_ pointing to the extracted ZIP archive of the extension.<br/>
Alternatively, drag and drop the zip file onto the extensions page.

![Step 3 - Edge: Load Extension](/img/extension/edge3.png)

#### 4. Launch the extension.

Click on the extension icon.

![Step 4 - Edge: Open Extension](/img/extension/edge4.png)

  </TabItem>
  <TabItem value="opera" label="Opera">

#### 1. Open the extension page in your browser.

<Tabs>
  <TabItem value="opera-shortcut" label="Using Shortcut">

Press and hold `cmd+shift+e` or `ctrl+shift+e` on your keyboard.

  </TabItem>
  <TabItem value="opera-menu" label="Using Menu Bar">

![Step 1 - Opera: Menu Bar](/img/extension/opera1.png)

  </TabItem>
  <TabItem value="opera-url" label="Using URL">

Type `opera://extensions` into the searchbar to open the extension page.

  </TabItem>
</Tabs>

#### 2. Enable the browser's developer mode.

![Step 2 - Opera: Enable Developer Mode](/img/extension/opera2.png)

#### 3. Load the extension from the folder.

Click _Load unpacked_ pointing to the extracted ZIP archive of the extension.<br/>
Alternatively, drag and drop the zip file onto the extensions page.

![Step 3 - Opera: Load Extension](/img/extension/opera3.png)

#### 4. Pin the extension.

Pin the extension through the extension icon.

![Step 4 - Opera: Pin Extension](/img/extension/opera4.png)

#### 5. Launch the extension.

Open the extension by clicking its icon from the menu bar.

![Step 5 - Opera: Open Extension](/img/extension/opera5.png)

  </TabItem>
  <TabItem value="brave" label="Brave">

#### 1. Open the extension page in your browser.

<Tabs>
  <TabItem value="brave-settings" label="Using Settings">

![Step 1 - Brave: Settings](/img/extension/brave1.png)

  </TabItem>
  <TabItem value="brave-menu" label="Using Menu Bar">

![Step 1 - Brave: Menu Bar](/img/extension/brave2.png)

  </TabItem>
  <TabItem value="brave-url" label="Using URL">

Type `brave://extensions` into the searchbar to open the extension page.

  </TabItem>
</Tabs>

#### 2. Enable the browser's developer mode.

![Step 2 - Brave: Developer Mode](/img/extension/brave3.png)

#### 3. Load the extension from the folder.

Click _Load unpacked_ pointing to the extracted ZIP archive of the extension.<br/>
Alternatively, drag and drop the zip file onto the extensions page.

![Step 3 - Brave: Load Extension](/img/extension/brave4.png)

#### 4. Pin the extension.

Pin the extension through the extension icon.

![Step 4 - Brave: Pin Extension](/img/extension/brave5.png)

#### 5. Launch the extension.

Open the extension by clicking its icon from the menu bar.

![Step 5 - Brave: Open Extension](/img/extension/brave6.png)

  </TabItem>
   <TabItem value="firefox" label="Firefox">

:::note
This installation process is for **Firefox Developer Edition** (or **Firefox Nightly**) only, as the standard Firefox only allows the installation of temporary developer add-ons.
:::

#### 1. Disable requiring xpi signature

Type `about://config` into the searchbar to open the configuration page.

![Step 1a - Firefox: about:config](/img/extension/firefox1.png)  

Click _Accept Risk and Continue_ when promped with _Proceed with Caution_ warning.

Next, set the `xpinstall.signatures.required` to false.

![Step 1b - Firefox: about:config](/img/extension/firefox2.png)

#### 2. Open the addons section

<Tabs>
  <TabItem value="firefox-menu" label="Using Menu Bar">

![Step 2 - Firefox: Menu Bar](/img/extension/firefox3.png)

  </TabItem>
  <TabItem value="firefox-url" label="Using URL">

Type `about://addons` into the searchbar to open the extension page.

  </TabItem>
</Tabs>

#### 3. Load the extension from the zip file

Click on the settings wheel and then click on _Install Add-on From File_ pointing to the ZIP archive of the extension.<br/>

![Step 3a - Firefox: Load Extension](/img/extension/firefox4.png)

Click _Add_ when prompted with a question to add the unverified extension.

![Step 3b - Firefox: Accept Extension](/img/extension/firefox5.png)

#### 4. Launch the extension

Open the extension by clicking its icon from the menu bar.

![Step 4 - Firefox: Open Extension](/img/extension/firefox6.png)

  </TabItem>
</Tabs>
