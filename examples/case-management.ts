/**
 * Example: Case Management API usage
 * 
 * This example demonstrates how to use the Case Management API
 * to create, update, and manage cases.
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

    // 1. Create a new case
    console.log('1. Creating a new case...');
    const newCase = await client.caseManagement.createCase({
      title: 'Payment Processing Issue',
      description: 'Customer reports payment not being processed correctly',
      priority: 'high',
      type: 'billing',
      customerId: 'customer-12345',
      tags: ['payment', 'urgent'],
    });
    console.log('Created case:', newCase.id);

    // 2. List all open cases
    console.log('\n2. Listing all open cases...');
    const openCases = await client.caseManagement.listCases({
      status: 'open',
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
    console.log(`Found ${openCases.total} open cases`);
    openCases.cases.forEach((c, index) => {
      console.log(`  ${index + 1}. ${c.title} (${c.priority})`);
    });

    // 3. Get case details
    console.log('\n3. Getting case details...');
    const caseDetails = await client.caseManagement.getCase(newCase.id);
    console.log('Case details:', {
      id: caseDetails.id,
      title: caseDetails.title,
      status: caseDetails.status,
      priority: caseDetails.priority,
    });

    // 4. Add a comment to the case
    console.log('\n4. Adding a comment...');
    const comment = await client.caseManagement.addCaseComment(newCase.id, {
      content: 'Investigating the payment processing logs',
      isInternal: false,
    });
    console.log('Comment added:', comment.id);

    // 5. Update case status
    console.log('\n5. Updating case status...');
    const updatedCase = await client.caseManagement.updateCase(newCase.id, {
      status: 'in_progress',
      assignedTo: 'agent-789',
    });
    console.log('Case updated, new status:', updatedCase.status);

    // 6. List case comments
    console.log('\n6. Listing case comments...');
    const comments = await client.caseManagement.listCaseComments(newCase.id);
    console.log(`Found ${comments.total} comments`);
    comments.comments.forEach((comment, index) => {
      console.log(`  ${index + 1}. ${comment.content.substring(0, 50)}...`);
    });

    // 7. List case activities
    console.log('\n7. Listing case activities...');
    const activities = await client.caseManagement.listCaseActivities(newCase.id);
    console.log(`Found ${activities.total} activities`);
    activities.activities.forEach((activity, index) => {
      console.log(`  ${index + 1}. ${activity.action}`);
    });

    // 8. Close the case
    console.log('\n8. Closing the case...');
    const closedCase = await client.caseManagement.closeCase(newCase.id);
    console.log('Case closed:', closedCase.status);

    // 9. Search cases with multiple filters
    console.log('\n9. Searching cases with filters...');
    const filteredCases = await client.caseManagement.listCases({
      status: ['open', 'in_progress'],
      priority: ['high', 'urgent'],
      type: 'billing',
      page: 1,
      limit: 5,
    });
    console.log(`Found ${filteredCases.total} filtered cases`);

    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main();
