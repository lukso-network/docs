---
sidebar_position: 4
title: 'Internationalization'
---

# Internationalization

The modal ships with English (`en_US`) translations by default. You can customize any text string or add support for other languages.

## Changing the Locale

The modal uses the global `IntlService` from `@lukso/core`. If your app already sets up an intl service, the modal will use it automatically. Otherwise it creates a local English instance.

```typescript
import { createIntlService, setIntlService } from '@lukso/core/services/intl';

const intl = createIntlService({
  locale: 'de-DE',
  messages: {
    connect_modal_title: 'Wir melden Sie an',
    connect_modal_description: 'Melden Sie sich mit Ihrem Universalprofil an.',
    // ... other keys
  },
});

// Set it globally — the modal picks it up automatically
setIntlService(intl);
```

## Overriding Individual Strings

If you only need to change a few labels, set the global service with your full message map. Any keys you omit will fall back to the built-in English translations.

```typescript
import enMessages from '@lukso/core/translations/en_US.json';

const intl = createIntlService({
  locale: 'en-US',
  messages: {
    ...enMessages,
    connect_modal_title: 'Sign in to MyApp',
    connect_modal_description: 'Connect your Universal Profile to continue',
  },
});

setIntlService(intl);
```

## Switching Locale at Runtime

```typescript
import { getIntlService } from '@lukso/core/services/intl';

const intl = getIntlService();
intl?.setLocale('de-DE', germanMessages);
// The modal re-renders automatically
```

## Translation Keys

| Key                                             | Default (English)                                                      |
| ----------------------------------------------- | ---------------------------------------------------------------------- |
| `connect_modal_title`                           | Let's log you in                                                       |
| `connect_modal_description`                     | Log in with your Universal Profile                                     |
| `connect_modal_connectors_passkey_wallet`       | Passkey Wallet                                                         |
| `connect_modal_connectors_up_mobile`            | Mobile Application                                                     |
| `connect_modal_connectors_up_browser_extension` | Browser Extension                                                      |
| `connect_modal_or`                              | Or                                                                     |
| `connect_modal_or_info`                         | Log in with a different wallet                                         |
| `connect_modal_other_connectors`                | Connect Wallet                                                         |
| `connect_modal_eoa_title`                       | Connect your Wallet                                                    |
| `connect_modal_installed`                       | INSTALLED                                                              |
| `connect_modal_failed_to_load`                  | Failed to load...                                                      |
| `connect_modal_try_again`                       | Try again                                                              |
| `connect_modal_qr_code_title`                   | Scan to log in                                                         |
| `connect_modal_qr_code_description`             | Scan the below QR code with the Universal Profile mobile app to log in |
| `connect_modal_close`                           | Close modal                                                            |
| `connect_modal_go_back`                         | Go back                                                                |
| `sign_up_modal_title`                           | Create Universal Profile!                                              |
| `sign_up_modal_description`                     | Choose the device on which you want to create a profile                |
| `sign_up_modal_use_mobile`                      | Install the Mobile Application                                         |
| `sign_up_modal_install_extension`               | Install the Browser Extension                                          |
