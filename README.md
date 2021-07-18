# normalize-mailbox

[![npm version](https://badge.fury.io/js/normalize-mailbox.svg)](https://www.npmjs.com/package/normalize-mailbox)

- `joeblow@gmail.com`
- `joe.blow@gmail.com`
- `JoE.bLoW@gmail.com`
- `j.o.e.b.l.o.w@gmail.com`

These are all the same person. This package helps detect this kind of stuff.

Specifically, this package converts all the above forms to the first one--deemed the _normalized_
one.

Unfortunately, the rules differ for each email client. While the above is true for Gmail (until the
time of writing), it is not for, for instance, Outlook. This community effort attempts to collect
all known client-specific rules into one package.

> **DISCLAIMER**: This is a community-driven effort and BY NO MEANS represent an authoritative
> source for detecting client-specific email aliases.

## Usage

```typescript
import normalize from 'normalize-mailbox';

const normalized = normalize('JoE.bLoW@gmail.com');
// returns 'joeblow@gmail.com'
```

## Rule sets

Rule sets used to normalize email addresses according to the client are all found in
[ruleSets.ts](src/ruleSets.ts).

PRs are always welcome.
