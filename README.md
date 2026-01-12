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
- ✅ **Case Management API** - Manage cases, comments, attachments, and activities
- ✅ **Partner API** - Manage partners, transactions, analytics, and API keys
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
const cases = await client.caseManagement.listCases();

// Use Partner API
const partners = await client.partner.listPartners();
```

## Usage Examples

### Case Management API

#### Create a Case

```typescript
const newCase = await client.caseManagement.createCase({
  title: 'Payment Issue',
  description: 'Customer unable to complete payment',
  priority: 'high',
  type: 'billing',
  customerId: 'customer-123',
});
```

#### List Cases with Filters

```typescript
const cases = await client.caseManagement.listCases({
  status: 'open',
  priority: ['high', 'urgent'],
  page: 1,
  limit: 20,
  sortBy: 'createdAt',
  sortOrder: 'desc',
});

console.log(`Total cases: ${cases.total}`);
cases.cases.forEach(c => console.log(c.title));
```

#### Get a Specific Case

```typescript
const case = await client.caseManagement.getCase('case-id-123');
console.log(case.title, case.status);
```

#### Update a Case

```typescript
const updatedCase = await client.caseManagement.updateCase('case-id-123', {
  status: 'in_progress',
  assignedTo: 'user-456',
});
```

#### Add a Comment to a Case

```typescript
const comment = await client.caseManagement.addCaseComment('case-id-123', {
  content: 'Issue has been identified and we are working on a fix',
  isInternal: false,
});
```

#### Close a Case

```typescript
await client.caseManagement.closeCase('case-id-123');
```

#### List Case Activities

```typescript
const activities = await client.caseManagement.listCaseActivities('case-id-123');
activities.activities.forEach(activity => {
  console.log(`${activity.action}: ${activity.description}`);
});
```

### Partner API

#### Create a Partner

```typescript
const newPartner = await client.partner.createPartner({
  name: 'Acme Corp',
  email: 'partner@acme.com',
  type: 'reseller',
  companyName: 'Acme Corporation',
  contactPerson: 'John Doe',
  commission: 15.5,
});
```

#### List Partners

```typescript
const partners = await client.partner.listPartners({
  status: 'active',
  type: 'reseller',
  page: 1,
  limit: 50,
});

console.log(`Total partners: ${partners.total}`);
```

#### Get Partner Details

```typescript
const partner = await client.partner.getPartner('partner-id-123');
console.log(partner.name, partner.email);
```

#### Create a Transaction

```typescript
const transaction = await client.partner.createPartnerTransaction('partner-id-123', {
  type: 'commission',
  amount: 150.00,
  currency: 'EUR',
  description: 'Monthly commission for Q1',
});
```

#### Get Partner Analytics

```typescript
const analytics = await client.partner.getPartnerAnalytics('partner-id-123', {
  startDate: '2024-01-01',
  endDate: '2024-03-31',
  groupBy: 'month',
});

console.log(`Total revenue: ${analytics.totalRevenue}`);
console.log(`Total commission: ${analytics.totalCommission}`);
```

#### Create API Key for Partner

```typescript
const apiKey = await client.partner.createPartnerApiKey('partner-id-123', {
  name: 'Production API Key',
  scope: ['read', 'write'],
  expiresAt: '2025-12-31T23:59:59Z',
});

console.log(`API Key: ${apiKey.key}`);
```

## JavaScript Usage (CommonJS)

```javascript
const { PaywiseClient } = require('paywise-api');

const client = new PaywiseClient({
  baseUrl: 'https://api.paywise.de',
  apiKey: 'your-api-key',
});

// Use with async/await
async function getCases() {
  const cases = await client.caseManagement.listCases();
  return cases;
}

// Or use with promises
client.caseManagement.listCases()
  .then(cases => console.log(cases))
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
  const case = await client.caseManagement.getCase('invalid-id');
} catch (error) {
  if (error.status === 404) {
    console.error('Case not found');
  } else if (error.status === 401) {
    console.error('Authentication failed');
  } else {
    console.error('Error:', error.message);
  }
}
```

## API Reference

### Case Management API

#### Methods

- `listCases(params?)` - List all cases with optional filters
- `getCase(caseId)` - Get a specific case
- `createCase(params)` - Create a new case
- `updateCase(caseId, params)` - Update a case
- `deleteCase(caseId)` - Delete a case
- `closeCase(caseId)` - Close a case
- `reopenCase(caseId)` - Reopen a closed case
- `listCaseComments(caseId, params?)` - List comments for a case
- `addCaseComment(caseId, params)` - Add a comment to a case
- `updateCaseComment(caseId, commentId, content)` - Update a comment
- `deleteCaseComment(caseId, commentId)` - Delete a comment
- `listCaseActivities(caseId, params?)` - List activities for a case
- `listCaseAttachments(caseId)` - List attachments for a case
- `uploadCaseAttachment(caseId, file)` - Upload an attachment
- `deleteCaseAttachment(caseId, attachmentId)` - Delete an attachment
- `assignCase(caseId, userId)` - Assign a case to a user
- `unassignCase(caseId)` - Unassign a case

### Partner API

#### Methods

- `listPartners(params?)` - List all partners with optional filters
- `getPartner(partnerId)` - Get a specific partner
- `createPartner(params)` - Create a new partner
- `updatePartner(partnerId, params)` - Update a partner
- `deletePartner(partnerId)` - Delete a partner
- `activatePartner(partnerId)` - Activate a partner
- `deactivatePartner(partnerId)` - Deactivate a partner
- `suspendPartner(partnerId)` - Suspend a partner
- `listPartnerTransactions(partnerId, params?)` - List transactions for a partner
- `getPartnerTransaction(partnerId, transactionId)` - Get a specific transaction
- `createPartnerTransaction(partnerId, params)` - Create a transaction
- `getPartnerAnalytics(partnerId, params?)` - Get analytics for a partner
- `listPartnerApiKeys(partnerId)` - List API keys for a partner
- `createPartnerApiKey(partnerId, params?)` - Create an API key
- `revokePartnerApiKey(partnerId, apiKeyId)` - Revoke an API key
- `regeneratePartnerApiKey(partnerId)` - Regenerate primary API key

## TypeScript Support

This library is written in TypeScript and provides complete type definitions:

```typescript
import { 
  PaywiseClient, 
  Case, 
  CaseStatus, 
  Partner, 
  PartnerStatus 
} from 'paywise-api';

const client = new PaywiseClient({ /* ... */ });

// Full type inference
const cases: Case[] = (await client.caseManagement.listCases()).cases;

// Type-safe parameters
const newCase = await client.caseManagement.createCase({
  title: 'Issue',
  status: 'open', // Type: CaseStatus
  priority: 'high', // Type: CasePriority
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

function CaseList() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    async function loadCases() {
      const result = await client.caseManagement.listCases();
      setCases(result.cases);
    }
    loadCases();
  }, []);

  return (
    <ul>
      {cases.map(c => <li key={c.id}>{c.title}</li>)}
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

const cases = ref([]);

onMounted(async () => {
  const result = await client.caseManagement.listCases();
  cases.value = result.cases;
});
</script>

<template>
  <ul>
    <li v-for="case in cases" :key="case.id">{{ case.title }}</li>
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
  const cases = await client.caseManagement.listCases();
  console.log(`Found ${cases.total} cases`);
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
