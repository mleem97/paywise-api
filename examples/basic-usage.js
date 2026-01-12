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
    // List claims
    const claims = await client.caseManagement.listClaims({ limit: 5 });
    console.log(`Found ${claims.count} claims`);

    // List companies
    const companies = await client.partner.listCompanies({ limit: 5 });
    console.log(`Found ${companies.count} companies`);

    // Create a debtor
    const newDebtor = await client.caseManagement.createDebtor({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      type: 'person',
    });
    console.log('Created debtor with ID:', newDebtor.id);

  } catch (error) {
    console.error('Error:', error.message);
    if (error.status) {
      console.error('Status:', error.status);
    }
  }
}

// Using promises (without async/await)
function promiseExample() {
  client.caseManagement.listClaims({ limit: 5 })
    .then(claims => {
      console.log(`Found ${claims.count} claims`);
      return client.partner.listCompanies({ limit: 5 });
    })
    .then(companies => {
      console.log(`Found ${companies.count} companies`);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Run the example
basicExample();
