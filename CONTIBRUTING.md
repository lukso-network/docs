# LUKSO Docs Contribution Guide

Welcome to our documentation guide for contributors. We've set up specific rules and conventions to make PR reviews more seamless and have a global way of styling things.

## Naming Conventions

- We write `true`/`false` in code brackets without additional styling or uppercase to ensure it is a boolean, not a value or constant.
- We always refer to [ERC725Y keys]() as _data keys_, so there is no confusion for readers about keys in general, for instance, controller keys, public/private keys, etc.
- We only use bold text for keywords or phrases instead of whole sentences, as it should only highlight the most critical information.
- We use _simple present_ tense and _3rd person singular_ to describe functions and document API calls.
- We use _simple present_ in headings but do not enrich them with additional styling.

## Word Specification

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this repository are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

## Content Styling

- We try to keep a unified look for the headings on the right navigation bar and, therefore, encourage the use of _less than_ 35 characters so they do not split up into several rows.
- We do not skip headline sizes. The use of `##` should only be done if at least one parent headline uses only one hash sign.
- We always write parameter names in _code brackets_. If there is an additional code snippet, the naming of the parameters should be equal.
- We only use one text styling at a time and neither stack bold, italic, heading, or code formation on top of each other. Links, however, do not count as styling and can always be added.
- We try to stick to Markdown as much as possible. We make exceptions for
  - media integrations other than pictures
  - tables bigger than 120 chars in line length
  - custom styling out of regular page content
- We encourage the use of [Docusaurus Admonitions](https://docusaurus.io/docs/markdown-features/admonitions) for
  - additional information,
  - warnings, or
  - hints.
- We encourage the use of [Docusaurus Tabs](https://docusaurus.io/docs/markdown-features/tabs) if there are different
  - versions for code snippets or files,
  - outcomes regarding code execution, or
  - additional code explanations, unnecessary for the immediate implementation.

## File Links

- We use relative redirections that end with `.md` for all internal content within this repository. This way, link correctness can be checked within the build process of the webpage and is not affected by restructuring to subfolders in the left sidebar.

## LSP Naming

- We always write standard names beginning with an uppercase letter to distinguish them from regular descriptions.
- We use the _full standard name with a hyphen and spaces_ between the abbreviation and the long-written words for headings.
- We always use the _full standard name_ without any additional characters for explanations within the text. The abbreviation should _only_ be excluded if the _full standard name_ was mentioned at least once on the _same_ page before.
- We use the _full standard name without any spaces_ to address the _underlying smart contract_ directly

## Examples

### Name Conventions

The function retrieves an array of _data keys_ for **multiple** smart contract addresses if the read-in result of the last call returned `true.` Otherwise, the function will return `false` as the given addresses do not appear to be [LSP0 ERC725 Accounts](./docs/standards/universal-profile/lsp0-erc725account.md).

### LSP7 - Digital Asset Example

The LSP 7 Digital Asset is a token standard for fungible assets built by LUKSO. Developers can look up the LSP7DigitalAsset smart contract within the [`@lukso/lsp-factory.js`](https://docs.lukso.tech/tools/lsp-factoryjs/getting-started) library. Some features of the Digital Asset include more secure transfers, additional metadata, and token hooks.
