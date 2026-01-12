/**
 * Example: Partner API usage
 * 
 * This example demonstrates how to use the Partner API
 * to manage partners, transactions, and analytics.
 */

import { PaywiseClient } from '../src';

// Initialize the client
const client = new PaywiseClient({
  baseUrl: 'https://api.paywise.de',
  apiKey: process.env.PAYWISE_API_KEY || 'your-api-key',
});

async function main() {
  try {
    console.log('=== Partner API Examples ===\n');

    // 1. Create a new partner
    console.log('1. Creating a new partner...');
    const newPartner = await client.partner.createPartner({
      name: 'Tech Solutions Inc',
      email: 'contact@techsolutions.com',
      type: 'reseller',
      companyName: 'Tech Solutions Incorporated',
      contactPerson: 'Jane Smith',
      phone: '+1-555-0123',
      address: {
        street: '123 Tech Street',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94102',
        country: 'USA',
      },
      commission: 20,
    });
    console.log('Created partner:', newPartner.id);

    // 2. List all active partners
    console.log('\n2. Listing all active partners...');
    const activePartners = await client.partner.listPartners({
      status: 'active',
      limit: 10,
      sortBy: 'name',
      sortOrder: 'asc',
    });
    console.log(`Found ${activePartners.total} active partners`);
    activePartners.partners.forEach((p, index) => {
      console.log(`  ${index + 1}. ${p.name} (${p.type})`);
    });

    // 3. Get partner details
    console.log('\n3. Getting partner details...');
    const partnerDetails = await client.partner.getPartner(newPartner.id);
    console.log('Partner details:', {
      id: partnerDetails.id,
      name: partnerDetails.name,
      email: partnerDetails.email,
      commission: partnerDetails.commission,
    });

    // 4. Update partner information
    console.log('\n4. Updating partner...');
    const updatedPartner = await client.partner.updatePartner(newPartner.id, {
      commission: 22.5,
      phone: '+1-555-9999',
    });
    console.log('Partner updated, new commission:', updatedPartner.commission);

    // 5. Activate partner
    console.log('\n5. Activating partner...');
    const activatedPartner = await client.partner.activatePartner(newPartner.id);
    console.log('Partner status:', activatedPartner.status);

    // 6. Create a transaction
    console.log('\n6. Creating a transaction...');
    const transaction = await client.partner.createPartnerTransaction(newPartner.id, {
      type: 'commission',
      amount: 500.00,
      currency: 'EUR',
      description: 'Q1 2024 commission payment',
      referenceId: 'REF-2024-Q1-001',
    });
    console.log('Transaction created:', transaction.id);

    // 7. List partner transactions
    console.log('\n7. Listing partner transactions...');
    const transactions = await client.partner.listPartnerTransactions(newPartner.id, {
      limit: 10,
    });
    console.log(`Found ${transactions.total} transactions`);
    transactions.transactions.forEach((t, index) => {
      console.log(`  ${index + 1}. ${t.type}: ${t.amount} ${t.currency || 'EUR'}`);
    });

    // 8. Get partner analytics
    console.log('\n8. Getting partner analytics...');
    const analytics = await client.partner.getPartnerAnalytics(newPartner.id, {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      groupBy: 'month',
    });
    console.log('Analytics:', {
      totalRevenue: analytics.totalRevenue,
      totalCommission: analytics.totalCommission,
      totalTransactions: analytics.totalTransactions,
    });

    // 9. Create an API key for the partner
    console.log('\n9. Creating API key...');
    const apiKey = await client.partner.createPartnerApiKey(newPartner.id, {
      name: 'Production Key',
      scope: ['read', 'write'],
      expiresAt: '2025-12-31T23:59:59Z',
    });
    console.log('API key created:', apiKey.id);

    // 10. List partner API keys
    console.log('\n10. Listing partner API keys...');
    const apiKeys = await client.partner.listPartnerApiKeys(newPartner.id);
    console.log(`Found ${apiKeys.total} API keys`);
    apiKeys.apiKeys.forEach((key, index) => {
      console.log(`  ${index + 1}. ${key.name || 'Unnamed'} (${key.scope?.join(', ')})`);
    });

    // 11. Search partners by type
    console.log('\n11. Searching reseller partners...');
    const resellers = await client.partner.listPartners({
      type: 'reseller',
      status: 'active',
    });
    console.log(`Found ${resellers.total} active resellers`);

    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main();
