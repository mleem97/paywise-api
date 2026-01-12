/**
 * Example: Basic usage in JavaScript (CommonJS)
 * 
 * This example shows how to use the library in plain JavaScript
 * with CommonJS (Node.js) or ES modules.
 */

// CommonJS import
const { PaywiseClient } = require('../dist');

// Or ES Module import:
// import { PaywiseClient } from '../dist/index.js';

const client = new PaywiseClient({
  baseUrl: 'https://api.paywise.de',
  apiKey: process.env.PAYWISE_API_KEY || 'your-api-key',
});

async function basicExample() {
  try {
    // List cases
    const cases = await client.caseManagement.listCases({ limit: 5 });
    console.log(`Found ${cases.total} cases`);

    // List partners
    const partners = await client.partner.listPartners({ limit: 5 });
    console.log(`Found ${partners.total} partners`);

    // Create a case
    const newCase = await client.caseManagement.createCase({
      title: 'Test Case',
      description: 'This is a test case created from JavaScript',
      priority: 'medium',
    });
    console.log('Created case with ID:', newCase.id);

  } catch (error) {
    console.error('Error:', error.message);
    if (error.status) {
      console.error('Status:', error.status);
    }
  }
}

// Using promises (without async/await)
function promiseExample() {
  client.caseManagement.listCases({ limit: 5 })
    .then(cases => {
      console.log(`Found ${cases.total} cases`);
      return client.partner.listPartners({ limit: 5 });
    })
    .then(partners => {
      console.log(`Found ${partners.total} partners`);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Run the example
basicExample();
