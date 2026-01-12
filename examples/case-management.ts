/**
 * Example: Case Management API usage
 * 
 * This example demonstrates how to use the Case Management API
 * to manage claims, debtors, mandates, payments, and statements.
 */

import { PaywiseClient } from '../src';

// Initialize the client
const client = new PaywiseClient({
  baseUrl: 'https://api.paywise.de',
  apiKey: process.env.PAYWISE_API_KEY || 'your-api-key',
});

async function main() {
  try {
    console.log('=== Case Management API Examples ===\n');

    // 1. Create a debtor
    console.log('1. Creating a new debtor...');
    const newDebtor = await client.caseManagement.createDebtor({
      acting_as: 'business',
      addresses: [
        {
          street: 'Main Street',
          zip: '10115',
          city: 'Berlin',
          country: 'Germany',
        },
      ],
      person: {
        first_name: 'John',
        last_name: 'Doe',
        birth_date: '1990-01-01',
      },
    });
    console.log('Created debtor:', newDebtor.id);

    // 2. Create a claim
    console.log('\n2. Creating a new claim...');
    const newClaimId = newDebtor.id;
    if (!newClaimId) {
      throw new Error('Failed to create debtor - no ID returned');
    }
    const newClaim = await client.caseManagement.createClaim({
      debtor: newClaimId,
      your_reference: 'REF-001',
      subject_matter: 'Invoice payment',
      occurence_date: '2024-01-15',
      document_reference: 'INV-2024-001',
      document_date: '2024-01-15',
      due_date: '2024-02-15',
      reminder_date: '2024-02-20',
      delay_date: '2024-03-01',
      total_claim_amount: { value: '1500.00', currency: 'EUR' },
      main_claim_amount: { value: '1500.00', currency: 'EUR' },
      starting_approach: 'extrajudicial',
      claim_disputed: false,
      obligation_fulfilled: false,
    });
    console.log('Created claim:', newClaim.id);

    // 3. List all claims
    console.log('\n3. Listing all claims...');
    const claims = await client.caseManagement.listClaims({
      limit: 10,
    });
    console.log(`Found ${claims.count} claims`);
    if (claims.results.length > 0) {
      claims.results.forEach((claim, index) => {
        console.log(`  ${index + 1}. Claim ${claim.id}`);
      });
    }

    // 4. Get claim details
    console.log('\n4. Getting claim details...');
    const claimId = newClaim.id;
    if (!claimId) {
      throw new Error('Failed to create claim - no ID returned');
    }
    const claimDetails = await client.caseManagement.getClaim(claimId);
    console.log('Claim details:', {
      id: claimDetails.id,
      debtor: claimDetails.debtor,
    });

    // 5. Release claim for processing
    console.log('\n5. Releasing claim for processing...');
    const releasedClaim = await client.caseManagement.releaseClaim(claimId);
    console.log('Claim released:', releasedClaim.id);

    // 6. List debtors
    console.log('\n6. Listing debtors...');
    const debtors = await client.caseManagement.listDebtors({
      limit: 10,
    });
    console.log(`Found ${debtors.count} debtors`);

    // 7. List mandates
    console.log('\n7. Listing mandates...');
    const mandates = await client.caseManagement.listMandates({
      limit: 10,
    });
    console.log(`Found ${mandates.count} mandates`);

    // 8. List payments
    console.log('\n8. Listing payments...');
    const payments = await client.caseManagement.listPayments({
      limit: 10,
    });
    console.log(`Found ${payments.count} payments`);

    // 9. Get user info
    console.log('\n9. Getting user info...');
    const userInfo = await client.caseManagement.getUserInfo();
    console.log('User info retrieved successfully');

    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main();
