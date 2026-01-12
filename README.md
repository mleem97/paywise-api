# paywise-api

[![npm version](https://img.shields.io/npm/v/paywise-api.svg)](https://www.npmjs.com/package/paywise-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-mleem97%2Fpaywise--api-blue)](https://github.com/mleem97/paywise-api)

**TypeScript/JavaScript client library for Paywise API**

Complete implementation of the Paywise Case Management and Partner APIs with full type safety and zero dependencies.

**Maintained by:** [@mleem97](https://github.com/mleem97)  
**NPM Package:** [@paywise-api](https://www.npmjs.com/package/paywise-api)

---

## Features

- ✅ **Full TypeScript Support** - Native type definitions for all models and endpoints
- ✅ **Complete API Coverage** - Both Case Management and Partner APIs fully implemented
- ✅ **Case Management API** - Manage Claims, Debtors, Mandates, Payments, Statements, and Requests
- ✅ **Partner API** - Manage Companies, Users, and User Invites
- ✅ **Isomorphic** - Works in both **Node.js** and **Browser** environments
- ✅ **Zero Dependencies** - Lightweight and fast
- ✅ **Production Ready** - Semantic versioning and automated releases
- ✅ **Well Documented** - Comprehensive JSDoc comments and examples

## Installation

Install the package using your preferred package manager:

### npm

```bash
npm install paywise-api

```

### pnpm

```bash
pnpm add paywise-api

```

### Yarn

```bash
yarn add paywise-api

```

### Bun

```bash
bun add paywise-api

```

## Quick Start

Initialize the client with your API credentials.

### TypeScript & ES Modules (Import)

*Recommended for React, Vue, Angular, and modern Node.js.*

```typescript
import { PaywiseClient } from 'paywise-api';

// Initialize the client
const client = new PaywiseClient({
  baseUrl: '[https://api.paywise.de](https://api.paywise.de)',
  apiKey: 'your-api-key',
  timeout: 30000, // optional (ms)
});

// Example: List all claims
const claims = await client.caseManagement.listClaims();
console.log(claims);

```

### JavaScript (CommonJS / Require)

*For legacy Node.js environments.*

```javascript
const { PaywiseClient } = require('paywise-api');

const client = new PaywiseClient({
  baseUrl: '[https://api.paywise.de](https://api.paywise.de)',
  apiKey: 'your-api-key',
});

// Example: List companies using Promises
client.partner.listCompanies()
  .then(companies => console.log(companies))
  .catch(err => console.error(err));

```

## Configuration

### Client Options

```typescript
interface PaywiseConfig {
  baseUrl: string;        // API base URL (e.g., '[https://api.paywise.de](https://api.paywise.de)')
  apiKey: string;         // Your API key
  timeout?: number;       // Request timeout in milliseconds (default: 30000)
  headers?: Record<string, string>; // Custom headers (e.g., for proxy auth)
}

```

## Usage Examples

### Case Management API

#### Claims

```typescript
// 1. Create a claim
const newClaim = await client.caseManagement.createClaim({
  debtorId: 'debtor-123',
  amount: 1500.00,
  currency: 'EUR',
  description: 'Invoice payment',
  invoiceNumber: 'INV-2024-001',
  invoiceDate: '2024-01-15',
  dueDate: '2024-02-15',
});

// 2. List claims with filtering
const claims = await client.caseManagement.listClaims({
  limit: 20,
  offset: 0,
  status: 'open',
});

// 3. Upload a document to a claim
const file = new File(['content'], 'invoice.pdf', { type: 'application/pdf' });
await client.caseManagement.uploadClaimDocument('claim-id', file);

```

#### Debtors

```typescript
// Create a debtor
const newDebtor = await client.caseManagement.createDebtor({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  type: 'person',
});

// Add a bank account
await client.caseManagement.addDebtorBankAccount(newDebtor.id, {
  iban: 'DE89370400440532013000',
  bic: 'COBADEFFXXX',
  accountHolder: 'John Doe',
});

```

### Partner API

#### Companies & Users

```typescript
// Create a new company
const company = await client.partner.createCompany({
  name: 'Tech Solutions GmbH',
  legalForm: 'GmbH',
  taxId: 'DE999999999',
  address: {
    street: 'Innovation Weg',
    houseNumber: '1',
    postalCode: '10115',
    city: 'Berlin',
    country: 'Germany',
  },
  contactEmail: 'contact@tech-solutions.de',
});

// Invite a user to that company
const invite = await client.partner.createUserInvite({
  email: 'admin@tech-solutions.de',
  companyId: company.id,
  roles: ['admin'],
});

console.log(`Invite generated: ${invite.inviteUrl}`);

```

## Error Handling

The client throws typed errors. Please differentiate between API errors and Client errors.

```typescript
try {
  const claim = await client.caseManagement.getClaim('invalid-id');
} catch (error: any) {
  // HTTP 400/401/403/404/500 -> Issue from Paywise API
  if (error.status) {
      console.error(`Paywise API Error: ${error.status} - ${error.message}`);
  } 
  // Code Error -> Issue in this library or your implementation
  else {
      console.error('Client Error:', error);
  }
}

```

## Web Automation & Billing Integration

Automating the handover of overdue claims is a crucial feature for **Web Hosters**, **SaaS Providers**, and **E-Commerce Shops**. This library allows you to seamlessly integrate debt collection into your existing billing loops (e.g., custom Node.js backends, WHMCS hooks, or Shopify apps).

### Scenario: Automated Dunning Handoff

The following example demonstrates a background job (e.g., a Cron Job) that runs every night. It checks your local database for invoices that have exceeded the final payment deadline and automatically transfers them to Paywise.

**Workflow:**

1. Identify invoices where `daysOverdue > 30` (and dunning process failed).
2. Check if the debtor already exists in Paywise; if not, create them.
3. Register the claim.
4. Upload the original invoice PDF (Required for processing).
5. Release the claim immediately.

```typescript
import { PaywiseClient } from 'paywise-api';
import { db } from './your-database'; // Your internal DB
import { generateInvoicePdf } from './your-pdf-service'; // Your PDF generator

const client = new PaywiseClient({
  baseUrl: 'https://api.paywise.de',
  apiKey: process.env.PAYWISE_API_KEY!,
});

async function processOverdueInvoices() {
  // 1. Fetch overdue invoices from your system
  const overdueInvoices = await db.invoices.find({
    status: 'overdue',
    dunningLevel: 3, // e.g., after 3rd reminder
    handedOverToCollection: false
  });

  console.log(`Found ${overdueInvoices.length} invoices to handover.`);

  for (const invoice of overdueInvoices) {
    try {
      // 2. Create or Get Debtor
      // Ideally, store the Paywise debtorId in your user table to avoid duplicates
      let debtorHref = invoice.user.paywiseDebtorHref;

      if (!debtorHref) {
        const newDebtor = await client.caseManagement.createDebtor({
          acting_as: 'consumer', // or 'business'
          addresses: [{
            street: invoice.user.street,
            zip: invoice.user.zip,
            city: invoice.user.city,
            country: invoice.user.country // ISO 3166-1 alpha-2
          }],
          person: {
            first_name: invoice.user.firstName,
            last_name: invoice.user.lastName,
          },
          communication_channels: [{
            type: 'email',
            value: invoice.user.email
          }]
        });
        debtorHref = newDebtor.href;
        // Save debtorHref back to your DB
        await db.users.update(invoice.userId, { paywiseDebtorHref: debtorHref });
      }

      // 3. Create the Claim
      const claim = await client.caseManagement.createClaim({
        debtor: debtorHref,
        total_claim_amount: { value: invoice.totalAmount.toString(), currency: 'EUR' },
        main_claim_amount: { value: invoice.netAmount.toString(), currency: 'EUR' },
        subject_matter: `Service Invoice #${invoice.number}`,
        document_reference: invoice.number,
        document_date: invoice.date,
        due_date: invoice.dueDate,
        reminder_date: invoice.lastReminderDate,
        delay_date: invoice.delayDate,
        starting_approach: 'extrajudicial',
        claim_disputed: false,
        obligation_fulfilled: false,
        your_reference: invoice.id,
        occurence_date: invoice.serviceDate,
      });

      // 4. Upload the Invoice PDF (Crucial Evidence)
      const pdfBuffer = await generateInvoicePdf(invoice.id);
      const file = new File([pdfBuffer], `Invoice_${invoice.number}.pdf`, { type: 'application/pdf' });
      
      await client.caseManagement.uploadClaimDocument(claim.id!, file);

      // 5. Release Claim (Handover to Paywise)
      await client.caseManagement.releaseClaim(claim.id!, {
        submission_state: 'released',
        send_order_confirmation: true
      });

      // 6. Update local state
      await db.invoices.update(invoice.id, { 
        handedOverToCollection: true,
        paywiseClaimId: claim.id 
      });
      
      console.log(`Successfully handed over invoice ${invoice.number}`);

    } catch (error) {
      console.error(`Failed to process invoice ${invoice.number}`, error);
      // Implement your retry logic or admin notification here
    }
  }
}

// Run as a scheduled job (e.g., every night at 2 AM)
processOverdueInvoices();
```

> **💡 Best Practice:** Always ensure you upload the original invoice document (`uploadClaimDocument`) before releasing the claim. Without the invoice file, the debt collection process cannot legally start.

## Reporting Issues

Since this is a community project by **Lunexor**, please direct your inquiries to the correct channel:

1. **Paywise API Issues:**

- If you receive `500` Server Errors, `401` Authentication errors (with correct keys), or logic errors from the API side.

- 👉 **Contact Paywise Support directly.**

1. **Library/Code Issues:**

- If the TypeScript types are wrong, the library crashes, or the request format is incorrect.

- 👉 **[Open an Issue on GitHub](https://www.google.com/search?q=https://github.com/mleem97/paywise-api/issues)**

## License

MIT

---

*Maintained by [Lunexor](https://www.npmjs.com/org/lunexor).*

---

> ⚠️ **IMPORTANT DISCLAIMER**
>
> This library is a **community project** maintained by [Lunexor](https://www.npmjs.com/org/lunexor) and is **not** an official product of Paywise.
>
> - We are **not partnered** with Paywise, nor do we act on their behalf.
> - This library is provided "as is" and **may contain errors**.
> - **API Errors:** If you encounter errors originating from the Paywise system (e.g., 500 Server Errors, Logic errors on their end), please contact **Paywise Support** directly.
> - **Library Bugs:** If you find a bug in this code/wrapper, please open an Issue in the GitHub repository.
