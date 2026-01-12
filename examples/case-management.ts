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
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      type: 'person',
    });
    console.log('Created debtor:', newDebtor.id);

    // 2. Add address to debtor
    console.log('\n2. Adding address to debtor...');
    await client.caseManagement.addDebtorAddress(newDebtor.id, {
      street: 'Main Street',
      houseNumber: '123',
      postalCode: '12345',
      city: 'Berlin',
      country: 'Germany',
    });
    console.log('Address added successfully');

    // 3. Create a claim
    console.log('\n3. Creating a new claim...');
    const newClaim = await client.caseManagement.createClaim({
      debtorId: newDebtor.id,
      amount: 1500.00,
      currency: 'EUR',
      description: 'Invoice payment for services',
      invoiceNumber: 'INV-2024-001',
      invoiceDate: '2024-01-15',
      dueDate: '2024-02-15',
    });
    console.log('Created claim:', newClaim.id);

    // 4. List all claims
    console.log('\n4. Listing all claims...');
    const claims = await client.caseManagement.listClaims({
      limit: 10,
    });
    console.log(`Found ${claims.count} claims`);
    claims.results.forEach((claim, index) => {
      console.log(`  ${index + 1}. ${claim.description} - ${claim.amount} ${claim.currency}`);
    });

    // 5. Get claim details
    console.log('\n5. Getting claim details...');
    const claimDetails = await client.caseManagement.getClaim(newClaim.id);
    console.log('Claim details:', {
      id: claimDetails.id,
      amount: claimDetails.amount,
      status: claimDetails.status,
    });

    // 6. Release claim for processing
    console.log('\n6. Releasing claim for processing...');
    const releasedClaim = await client.caseManagement.releaseClaim(newClaim.id);
    console.log('Claim released:', releasedClaim.status);

    // 7. List debtors
    console.log('\n7. Listing debtors...');
    const debtors = await client.caseManagement.listDebtors({
      limit: 10,
    });
    console.log(`Found ${debtors.count} debtors`);

    // 8. List mandates
    console.log('\n8. Listing mandates...');
    const mandates = await client.caseManagement.listMandates({
      claimId: newClaim.id,
      limit: 10,
    });
    console.log(`Found ${mandates.count} mandates`);

    // 9. List payments
    console.log('\n9. Listing payments...');
    const payments = await client.caseManagement.listPayments({
      limit: 10,
    });
    console.log(`Found ${payments.count} payments`);

    // 10. Get user info
    console.log('\n10. Getting user info...');
    const userInfo = await client.caseManagement.getUserInfo();
    console.log('User info:', {
      email: userInfo.email,
      companyId: userInfo.companyId,
    });

    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main();
