# paywise-api

[![npm version](https://img.shields.io/npm/v/paywise-api.svg)](https://www.npmjs.com/package/paywise-api)
[![Release Pipeline](https://github.com/mleem97/paywise-api/actions/workflows/release.yml/badge.svg)](https://github.com/mleem97/paywise-api/actions/workflows/release.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-mleem97%2Fpaywise--api-blue)](https://github.com/mleem97/paywise-api)

**TypeScript/JavaScript client library for Paywise API**

Complete implementation of the Paywise Case Management and Partner APIs with full type safety and zero dependencies.

**Maintainer:** [@mleem97](https://github.com/mleem97)  
**NPM:** [paywise-api](https://www.npmjs.com/package/paywise-api)  
**Docs:** [docs.paywise.de](https://docs.paywise.de)

---

## Features

- ✅ **Full TypeScript Support** - Native type definitions for all 50+ models
- ✅ **Zero Dependencies** - Uses native `fetch`, lightweight and fast
- ✅ **Isomorphic** - Works in Node.js (18+) and modern browsers
- ✅ **Complete API Coverage** - Both Case Management and Partner APIs

### Case Management API

| Resource | Operations |
|----------|------------|
| **Claims** | Create, list, get, delete, release, upload documents |
| **Debtors** | Create, list, get, add addresses/bank accounts/contacts |
| **Mandates** | List, get, archive, status updates, answer requests |
| **Payments** | Create, list, get |
| **Statements** | List, get, mandate details |

### Partner API

| Resource | Operations |
|----------|------------|
| **Companies** | Create, list, get, update |
| **Users** | Create, list, get |
| **User Invites** | Create, get status, get onboarded user |

---

## Installation

```bash
# npm
npm install paywise-api

# pnpm
pnpm add paywise-api

# yarn
yarn add paywise-api

# bun
bun add paywise-api
```

---

## Quick Start

### ES Modules / TypeScript

```typescript
import { PaywiseClient } from 'paywise-api';

const client = new PaywiseClient({
  baseUrl: 'https://api.paywise.de',
  apiKey: 'your-api-key',
  timeout: 30000, // optional (ms)
});

// List all claims
const claims = await client.caseManagement.listClaims();
console.log(claims);
```

### CommonJS

```javascript
const { PaywiseClient } = require('paywise-api');

const client = new PaywiseClient({
  baseUrl: 'https://api.paywise.de',
  apiKey: 'your-api-key',
});

client.partner.listCompanies()
  .then(companies => console.log(companies))
  .catch(err => console.error(err));
```

---

## Configuration

```typescript
interface PaywiseConfig {
  baseUrl: string;        // API base URL
  apiKey: string;         // Your API key
  timeout?: number;       // Request timeout in ms (default: 30000)
  headers?: Record<string, string>; // Custom headers
}
```

---

## Usage Examples

### Claims

```typescript
// Create a claim
const claim = await client.caseManagement.createClaim({
  debtor: '/v1/debtors/debtor-123',
  total_claim_amount: { value: '1500.00', currency: 'EUR' },
  main_claim_amount: { value: '1500.00', currency: 'EUR' },
  subject_matter: 'Invoice payment',
  document_reference: 'INV-2024-001',
  document_date: '2024-01-15',
  due_date: '2024-02-15',
  occurence_date: '2024-01-01',
  starting_approach: 'extrajudicial',
  claim_disputed: false,
  obligation_fulfilled: false,
  your_reference: 'INV-2024-001',
  reminder_date: null,
  delay_date: null,
});

// List claims
const claims = await client.caseManagement.listClaims({
  limit: 20,
  submission_state: 'created',
});

// Upload document & release
await client.caseManagement.uploadClaimDocument(claim.id!, file);
await client.caseManagement.releaseClaim(claim.id!, true);
```

### Debtors

```typescript
const debtor = await client.caseManagement.createDebtor({
  acting_as: 'consumer',
  addresses: [{
    street: 'Musterstraße 123',
    zip: '10115',
    city: 'Berlin',
    country: 'DE',
  }],
  person: {
    first_name: 'Max',
    last_name: 'Mustermann',
  },
  communication_channels: [{
    type: 'email',
    value: 'max@example.com',
  }],
});
```

### Companies & Users (Partner API)

```typescript
// Create company
const company = await client.partner.createCompany({
  name: 'Tech Solutions GmbH',
  legal_form: 'GmbH',
  vat_id: 'DE999999999',
  address: {
    street: 'Innovation Weg 1',
    zip: '10115',
    city: 'Berlin',
    country: 'DE',
  },
});

// Invite user
const invite = await client.partner.createUserInvite({
  email: 'admin@tech-solutions.de',
  first_name: 'Admin',
  last_name: 'User',
  company: company.href,
  role: 'admin',
});

console.log(`Invite URL: ${invite.invite_url}`);
```

---

## Error Handling

```typescript
try {
  const claim = await client.caseManagement.getClaim('invalid-id');
} catch (error: any) {
  if (error.status) {
    // HTTP error from Paywise API (400/401/403/404/500)
    console.error(`API Error: ${error.status} - ${error.message}`);
  } else {
    // Client-side error
    console.error('Client Error:', error);
  }
}
```

---

## Automated Dunning Integration

Example: Nightly cron job to hand over overdue invoices to Paywise.

```typescript
import { PaywiseClient } from 'paywise-api';

const client = new PaywiseClient({
  baseUrl: 'https://api.paywise.de',
  apiKey: process.env.PAYWISE_API_KEY!,
});

async function processOverdueInvoices() {
  const overdueInvoices = await db.invoices.find({
    status: 'overdue',
    dunningLevel: 3,
    handedOverToCollection: false,
  });

  for (const invoice of overdueInvoices) {
    // 1. Create debtor (if not exists)
    let debtorHref = invoice.user.paywiseDebtorHref;
    if (!debtorHref) {
      const debtor = await client.caseManagement.createDebtor({
        acting_as: 'consumer',
        addresses: [{ street: invoice.user.street, zip: invoice.user.zip, city: invoice.user.city, country: invoice.user.country }],
        person: { first_name: invoice.user.firstName, last_name: invoice.user.lastName },
        communication_channels: [{ type: 'email', value: invoice.user.email }],
      });
      debtorHref = debtor.href;
    }

    // 2. Create claim
    const claim = await client.caseManagement.createClaim({
      debtor: debtorHref,
      total_claim_amount: { value: invoice.totalAmount.toString(), currency: 'EUR' },
      main_claim_amount: { value: invoice.netAmount.toString(), currency: 'EUR' },
      subject_matter: `Invoice #${invoice.number}`,
      document_reference: invoice.number,
      document_date: invoice.date,
      due_date: invoice.dueDate,
      starting_approach: 'extrajudicial',
      claim_disputed: false,
      obligation_fulfilled: false,
      your_reference: invoice.id,
      occurence_date: invoice.serviceDate,
      reminder_date: invoice.lastReminderDate,
      delay_date: invoice.delayDate,
    });

    // 3. Upload invoice PDF
    const pdf = await generateInvoicePdf(invoice.id);
    await client.caseManagement.uploadClaimDocument(claim.id!, new File([pdf], `Invoice_${invoice.number}.pdf`, { type: 'application/pdf' }));

    // 4. Release claim
    await client.caseManagement.releaseClaim(claim.id!, true);

    // 5. Update local DB
    await db.invoices.update(invoice.id, { handedOverToCollection: true, paywiseClaimId: claim.id });
  }
}
```

> **💡 Important:** Always upload the invoice document before releasing the claim.

---

## Reporting Issues

| Issue Type | Action |
|------------|--------|
| **API errors** (500, auth issues, logic errors) | Contact [Paywise Support](https://paywise.de) |
| **Library bugs** (types, crashes, wrong requests) | [Open GitHub Issue](https://github.com/mleem97/paywise-api/issues) |

---

## License

MIT © [@mleem97](https://github.com/mleem97)

---

> ⚠️ **Disclaimer:** This is a **community project** and is **not** an official Paywise product. We are not partnered with or endorsed by Paywise. This library is provided "as is" without warranty.
