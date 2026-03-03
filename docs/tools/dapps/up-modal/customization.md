---
sidebar_position: 3
title: 'Customization'
---

# Customization

The modal supports visual customization via CSS variables. Set them on `:root` or any ancestor of the `<connect-modal>` element.

## CSS Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--up-modal-font-family` | Modal font family | `Inter, ui-sans-serif, system-ui, sans-serif` |
| `--up-modal-font-color` | Modal text color (light) | `#243542` |
| `--up-modal-font-dark-color` | Modal text color (dark) | `#f5f8fa` |
| `--up-modal-btn-color` | Button background (light) | `#ffffff` |
| `--up-modal-btn-dark-color` | Button background (dark) | `#243542` |
| `--up-modal-btn-text` | Button text & icon (light) | `#243542` |
| `--up-modal-btn-dark-text` | Button text & icon (dark) | `#ffffff` |
| `--up-modal-btn-radius` | Button border radius | `12px` (large) / `10px` (medium) |
| `--up-modal-border-radius` | Modal border radius | `12px` |
| `--up-modal-bg` | Modal background (light) | `#f8fafb` |
| `--up-modal-dark-bg` | Modal background (dark) | `#121b21` |

## Example: Custom Brand Colors

```html
<style>
  :root {
    --up-modal-font-family: 'Roboto', sans-serif;
    --up-modal-font-color: #1e3a5f;
    --up-modal-btn-color: #4285f4;
    --up-modal-btn-text: #ffffff;
    --up-modal-bg: #eff6ff;
    --up-modal-border-radius: 20px;
  }
</style>
```
