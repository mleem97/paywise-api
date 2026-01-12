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
      legalForm: 'GmbH',
      taxId: 'DE123456789',
      address: {
        street: 'Tech Street',
        houseNumber: '123',
        postalCode: '10115',
        city: 'Berlin',
        country: 'Germany',
      },
      contactEmail: 'contact@techsolutions.com',
      contactPhone: '+49301234567',
    });
    console.log('Created company:', newCompany.id);

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
    const companyDetails = await client.partner.getCompany(newCompany.id);
    console.log('Company details:', {
      id: companyDetails.id,
      name: companyDetails.name,
      taxId: companyDetails.taxId,
    });

    // 4. Update company information
    console.log('\n4. Updating company...');
    const updatedCompany = await client.partner.updateCompany(newCompany.id, {
      contactEmail: 'info@techsolutions.com',
    });
    console.log('Company updated, new email:', updatedCompany.contactEmail);

    // 5. Create a user
    console.log('\n5. Creating a new user...');
    const newUser = await client.partner.createUser({
      email: 'jane.smith@techsolutions.com',
      firstName: 'Jane',
      lastName: 'Smith',
      companyId: newCompany.id,
      roles: ['admin', 'user'],
    });
    console.log('Created user:', newUser.id);

    // 6. List users
    console.log('\n6. Listing users...');
    const users = await client.partner.listUsers({
      companyId: newCompany.id,
      limit: 10,
    });
    console.log(`Found ${users.count} users`);
    users.results.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.email} (${user.roles?.join(', ')})`);
    });

    // 7. Get user details
    console.log('\n7. Getting user details...');
    const userDetails = await client.partner.getUser(newUser.id);
    console.log('User details:', {
      id: userDetails.id,
      email: userDetails.email,
      companyId: userDetails.companyId,
    });

    // 8. Create a user invite
    console.log('\n8. Creating user invite...');
    const invite = await client.partner.createUserInvite({
      email: 'newuser@techsolutions.com',
      companyId: newCompany.id,
      roles: ['user'],
    });
    console.log('User invite created:', invite.id);
    console.log('Invite URL:', invite.inviteUrl);

    // 9. Get invite details
    console.log('\n9. Getting invite details...');
    const inviteDetails = await client.partner.getUserInvite(invite.id);
    console.log('Invite details:', {
      id: inviteDetails.id,
      email: inviteDetails.email,
      status: inviteDetails.status,
    });

    // 10. Get token info
    console.log('\n10. Getting token info...');
    const tokenInfo = await client.partner.getTokenInfo();
    console.log('Token info:', {
      userId: tokenInfo.userId,
      companyId: tokenInfo.companyId,
      scopes: tokenInfo.scopes,
    });

    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main();
