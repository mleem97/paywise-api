/**
 * Example: Partner API usage
 * 
 * This example demonstrates how to use the Partner API
 * to manage companies, users, and user invites.
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

    // 1. Create a new company
    console.log('1. Creating a new company...');
    const newCompany = await client.partner.createCompany({
      name: 'Tech Solutions Inc',
      legal_form: 'GmbH',
      vat_id: 'DE123456789',
      address: {
        street: 'Tech Street',
        zip: '10115',
        city: 'Berlin',
        country: 'Germany',
      },
    });
    console.log('Created company:', newCompany.id);

    const companyId = newCompany.id;
    if (!companyId) {
      throw new Error('Failed to create company - no ID returned');
    }

    // 2. List all companies
    console.log('\n2. Listing all companies...');
    const companies = await client.partner.listCompanies({
      limit: 10,
    });
    console.log(`Found ${companies.count} companies`);
    companies.results.forEach((company, index) => {
      console.log(`  ${index + 1}. ${company.name}`);
    });

    // 3. Get company details
    console.log('\n3. Getting company details...');
    const companyDetails = await client.partner.getCompany(companyId);
    console.log('Company details:', {
      id: companyDetails.id,
      name: companyDetails.name,
    });

    // 4. Update company information
    console.log('\n4. Updating company...');
    const updatedCompany = await client.partner.updateCompany(companyId, {
      name: 'Tech Solutions Inc. Updated',
    });
    console.log('Company updated:', updatedCompany.name);

    // 5. Create a user
    console.log('\n5. Creating a new user...');
    const newUser = await client.partner.createUser({
      email: 'jane.smith@techsolutions.com',
      first_name: 'Jane',
      last_name: 'Smith',
      company: companyId,
      role: 'admin',
    });
    console.log('Created user:', newUser.id);

    const userId = newUser.id;
    if (!userId) {
      throw new Error('Failed to create user - no ID returned');
    }

    // 6. List users
    console.log('\n6. Listing users...');
    const users = await client.partner.listUsers({
      company: companyId,
      limit: 10,
    });
    console.log(`Found ${users.count} users`);
    users.results.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.email}`);
    });

    // 7. Get user details
    console.log('\n7. Getting user details...');
    const userDetails = await client.partner.getUser(userId);
    console.log('User details:', {
      id: userDetails.id,
      email: userDetails.email,
    });

    // 8. Create a user invite
    console.log('\n8. Creating user invite...');
    const invite = await client.partner.createUserInvite({
      email: 'newuser@techsolutions.com',
      first_name: 'New',
      last_name: 'User',
      company: companyId,
      role: 'user',
    });
    console.log('User invite created:', invite.id);
    console.log('Invite URL:', invite.invite_url);

    const inviteId = invite.id;
    if (!inviteId) {
      throw new Error('Failed to create invite - no ID returned');
    }

    // 9. Get invite details
    console.log('\n9. Getting invite details...');
    const inviteDetails = await client.partner.getUserInvite(inviteId);
    console.log('Invite details:', {
      id: inviteDetails.id,
      email: inviteDetails.email,
      status: inviteDetails.status,
    });

    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main();
