# paywise-api

TypeScript/JavaScript client library for Paywise API, providing easy access to Case Management API and Partner API.

## Installation

```bash
npm install paywise-api
```

or

```bash
yarn add paywise-api
```

## Features

- ✅ **Full TypeScript Support** - Complete type definitions for all API endpoints
- ✅ **Case Management API** - Claims, Debtors, Mandates, Payments, Statements
- ✅ **Partner API** - Companies, Users, User Invites management
- ✅ **Promise-based** - Modern async/await support
- ✅ **Framework Agnostic** - Works with any JavaScript/TypeScript framework (React, Vue, Angular, Node.js, etc.)
- ✅ **Browser & Node.js** - Compatible with both browser and Node.js environments

## Quick Start

```typescript
import { PaywiseClient } from 'paywise-api';

// Initialize the client
const client = new PaywiseClient({
  baseUrl: 'https://api.paywise.de',
  apiKey: 'your-api-key',
  timeout: 30000, // optional, default: 30000ms
});

// Use Case Management API
const claims = await client.caseManagement.listClaims();

// Use Partner API
const companies = await client.partner.listCompanies();
```

## Usage Examples

### Case Management API

#### Claims

```typescript
// Create a claim
const newClaim = await client.caseManagement.createClaim({
  debtorId: 'debtor-123',
  amount: 1500.00,
  currency: 'EUR',
  description: 'Invoice payment',
  invoiceNumber: 'INV-2024-001',
  invoiceDate: '2024-01-15',
  dueDate: '2024-02-15',
});

// List claims
const claims = await client.caseManagement.listClaims({
  limit: 20,
  offset: 0,
  status: 'open',
});

// Get a specific claim
const claim = await client.caseManagement.getClaim('claim-id');

// Release a claim for processing
await client.caseManagement.releaseClaim('claim-id');

// Upload a document to a claim
const file = new File(['content'], 'invoice.pdf', { type: 'application/pdf' });
await client.caseManagement.uploadClaimDocument('claim-id', file);

// Delete an unreleased claim
await client.caseManagement.deleteClaim('claim-id');
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

// List debtors
const debtors = await client.caseManagement.listDebtors({
  limit: 50,
  search: 'Doe',
});

// Get a specific debtor
const debtor = await client.caseManagement.getDebtor('debtor-id');

// Add an address to a debtor
await client.caseManagement.addDebtorAddress('debtor-id', {
  street: 'Main Street',
  houseNumber: '123',
  postalCode: '12345',
  city: 'Berlin',
  country: 'Germany',
});

// Add a bank account to a debtor
await client.caseManagement.addDebtorBankAccount('debtor-id', {
  iban: 'DE89370400440532013000',
  bic: 'COBADEFFXXX',
  accountHolder: 'John Doe',
});

// Add a communication channel
await client.caseManagement.addDebtorCommunicationChannel('debtor-id', {
  type: 'email',
  value: 'contact@example.com',
});
```

#### Mandates

```typescript
// List mandates
const mandates = await client.caseManagement.listMandates({
  limit: 20,
  claimId: 'claim-id',
});

// Get a specific mandate
const mandate = await client.caseManagement.getMandate('mandate-id');

// Archive a mandate
await client.caseManagement.archiveMandate('mandate-id');

// List status updates
const statusUpdates = await client.caseManagement.listMandateStatusUpdates('mandate-id');

// List requests to client
const requests = await client.caseManagement.listMandateRequests('mandate-id');

// Get request details
const request = await client.caseManagement.getMandateRequest('mandate-id', 'request-id');

// Submit an answer to a request
await client.caseManagement.submitMandateRequestAnswer('mandate-id', 'request-id', {
  answer: 'Here is the requested information...',
});

// Upload document to request answer
const document = new File(['content'], 'document.pdf', { type: 'application/pdf' });
await client.caseManagement.uploadMandateRequestDocument('mandate-id', 'request-id', document);
```

#### Payments

```typescript
// Create a payment
const payment = await client.caseManagement.createPayment({
  mandateId: 'mandate-id',
  amount: 500.00,
  currency: 'EUR',
  paymentDate: '2024-01-20',
  paymentMethod: 'bank_transfer',
  reference: 'REF-2024-001',
});

// List payments
const payments = await client.caseManagement.listPayments({
  mandateId: 'mandate-id',
  limit: 50,
});

// Get a specific payment
const paymentDetails = await client.caseManagement.getPayment('payment-id');
```

#### Statements

```typescript
// List statements
const statements = await client.caseManagement.listStatements({
  periodStart: '2024-01-01',
  periodEnd: '2024-03-31',
});

// Get a specific statement
const statement = await client.caseManagement.getStatement('statement-id');

// List mandate details for a statement
const mandateDetails = await client.caseManagement.listStatementMandateDetails('statement-id');
```

#### User Info

```typescript
// Get current user information
const userInfo = await client.caseManagement.getUserInfo();
console.log(userInfo.email, userInfo.companyId);
```

### Partner API

#### Companies

```typescript
// Create a company
const newCompany = await client.partner.createCompany({
  name: 'Acme Corporation',
  legalForm: 'GmbH',
  taxId: 'DE123456789',
  address: {
    street: 'Business Ave',
    houseNumber: '42',
    postalCode: '10115',
    city: 'Berlin',
    country: 'Germany',
  },
  contactEmail: 'info@acme.com',
});

// List companies
const companies = await client.partner.listCompanies({
  limit: 20,
  name: 'Acme',
});

// Get a specific company
const company = await client.partner.getCompany('company-id');

// Update a company
await client.partner.updateCompany('company-id', {
  contactEmail: 'new-email@acme.com',
  contactPhone: '+49301234567',
});
```

#### Users

```typescript
// Create a user
const newUser = await client.partner.createUser({
  email: 'user@example.com',
  firstName: 'Jane',
  lastName: 'Smith',
  companyId: 'company-id',
  roles: ['admin', 'user'],
});

// List users
const users = await client.partner.listUsers({
  companyId: 'company-id',
  limit: 50,
});

// Get a specific user
const user = await client.partner.getUser('user-id');
```

#### User Invites

```typescript
// Create a user invite
const invite = await client.partner.createUserInvite({
  email: 'newuser@example.com',
  companyId: 'company-id',
  roles: ['user'],
});

console.log('Invite URL:', invite.inviteUrl);

// Get invite details
const inviteDetails = await client.partner.getUserInvite('invite-id');

// Get onboarded user information
const onboardedUser = await client.partner.getOnboardedUser('invite-id');
```

#### Token Info

```typescript
// Get token information
const tokenInfo = await client.partner.getTokenInfo();
console.log('Token expires at:', tokenInfo.expiresAt);
console.log('Scopes:', tokenInfo.scopes);
```

## JavaScript Usage (CommonJS)

```javascript
const { PaywiseClient } = require('paywise-api');

const client = new PaywiseClient({
  baseUrl: 'https://api.paywise.de',
  apiKey: 'your-api-key',
});

// Use with async/await
async function getClaims() {
  const claims = await client.caseManagement.listClaims();
  return claims;
}

// Or use with promises
client.caseManagement.listClaims()
  .then(claims => console.log(claims))
  .catch(error => console.error(error));
```

## Configuration

### Client Options

```typescript
interface PaywiseConfig {
  baseUrl: string;        // API base URL (e.g., 'https://api.paywise.de')
  apiKey: string;         // Your API key
  timeout?: number;       // Request timeout in milliseconds (default: 30000)
  headers?: Record<string, string>; // Custom headers to send with every request
}
```

### Custom Headers

```typescript
const client = new PaywiseClient({
  baseUrl: 'https://api.paywise.de',
  apiKey: 'your-api-key',
  headers: {
    'X-Custom-Header': 'custom-value',
  },
});
```

## Error Handling

All API methods throw errors when requests fail:

```typescript
try {
  const claim = await client.caseManagement.getClaim('invalid-id');
} catch (error) {
  if (error.status === 404) {
    console.error('Claim not found');
  } else if (error.status === 401) {
    console.error('Authentication failed');
  } else {
    console.error('Error:', error.message);
  }
}
```

## API Reference

### Case Management API

#### Claims
- `listClaims(params?)` - List all claims with optional filters
- `createClaim(params)` - Create a new claim
- `getClaim(claimId)` - Get a specific claim
- `deleteClaim(claimId)` - Delete an unreleased claim
- `releaseClaim(claimId)` - Release a claim for processing
- `uploadClaimDocument(claimId, file)` - Upload a document to a claim

#### Debtors
- `listDebtors(params?)` - List all debtors with optional filters
- `createDebtor(params)` - Create a new debtor
- `getDebtor(debtorId)` - Get a specific debtor
- `addDebtorAddress(debtorId, address)` - Add an address to a debtor
- `addDebtorBankAccount(debtorId, bankAccount)` - Add a bank account to a debtor
- `addDebtorCommunicationChannel(debtorId, channel)` - Add a communication channel to a debtor

#### Mandates
- `listMandates(params?)` - List all mandates with optional filters
- `getMandate(mandateId)` - Get a specific mandate
- `archiveMandate(mandateId)` - Archive a mandate
- `listMandateStatusUpdates(mandateId, params?)` - List status updates for a mandate
- `listMandateRequests(mandateId, params?)` - List requests to client for a mandate
- `getMandateRequest(mandateId, requestId)` - Get request to client details
- `submitMandateRequestAnswer(mandateId, requestId, params)` - Submit an answer to a request
- `uploadMandateRequestDocument(mandateId, requestId, file)` - Upload document to request answer

#### Payments
- `listPayments(params?)` - List all payments with optional filters
- `createPayment(params)` - Create a new payment
- `getPayment(paymentId)` - Get a specific payment

#### Statements
- `listStatements(params?)` - List all statements with optional filters
- `getStatement(statementId)` - Get a specific statement
- `listStatementMandateDetails(statementId, params?)` - List mandate details for a statement

#### Info
- `getUserInfo()` - Get current user information

### Partner API

#### Companies
- `listCompanies(params?)` - List all companies with optional filters
- `createCompany(params)` - Create a new company
- `getCompany(companyId)` - Get a specific company
- `updateCompany(companyId, params)` - Update a company

#### Users
- `listUsers(params?)` - List all users with optional filters
- `createUser(params)` - Create a new user
- `getUser(userId)` - Get a specific user

#### User Invites
- `createUserInvite(params)` - Create a user invite
- `getUserInvite(inviteId)` - Get a specific user invite
- `getOnboardedUser(inviteId)` - Get onboarded user information from an invite

#### Info
- `getTokenInfo()` - Get token information

## TypeScript Support

This library is written in TypeScript and provides complete type definitions:

```typescript
import { 
  PaywiseClient, 
  Claim, 
  Debtor, 
  Company, 
  User 
} from 'paywise-api';

const client = new PaywiseClient({ /* ... */ });

// Full type inference
const claims: Claim[] = (await client.caseManagement.listClaims()).results;

// Type-safe parameters
const newClaim = await client.caseManagement.createClaim({
  debtorId: 'debtor-123',
  amount: 1500.00,
  currency: 'EUR',
});
```

## Framework Integration

### React

```typescript
import { PaywiseClient } from 'paywise-api';
import { useEffect, useState } from 'react';

const client = new PaywiseClient({
  baseUrl: process.env.REACT_APP_PAYWISE_URL,
  apiKey: process.env.REACT_APP_PAYWISE_API_KEY,
});

function ClaimList() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    async function loadClaims() {
      const result = await client.caseManagement.listClaims();
      setClaims(result.results);
    }
    loadClaims();
  }, []);

  return (
    <ul>
      {claims.map(c => <li key={c.id}>{c.description}</li>)}
    </ul>
  );
}
```

### Vue 3

```vue
<script setup lang="ts">
import { PaywiseClient } from 'paywise-api';
import { ref, onMounted } from 'vue';

const client = new PaywiseClient({
  baseUrl: import.meta.env.VITE_PAYWISE_URL,
  apiKey: import.meta.env.VITE_PAYWISE_API_KEY,
});

const claims = ref([]);

onMounted(async () => {
  const result = await client.caseManagement.listClaims();
  claims.value = result.results;
});
</script>

<template>
  <ul>
    <li v-for="claim in claims" :key="claim.id">{{ claim.description }}</li>
  </ul>
</template>
```

### Node.js

```typescript
import { PaywiseClient } from 'paywise-api';

const client = new PaywiseClient({
  baseUrl: process.env.PAYWISE_URL,
  apiKey: process.env.PAYWISE_API_KEY,
});

async function main() {
  const claims = await client.caseManagement.listClaims();
  console.log(`Found ${claims.count} claims`);
}

main().catch(console.error);
```

## Documentation

For more details about the Paywise API, refer to the official documentation:

- [Case Management API Documentation](https://docs.paywise.de/api-docs/case-management-api/)
- [Partner API Documentation](https://docs.paywise.de/api-docs/partner-api/)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub or contact Paywise support.

