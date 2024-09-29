/// <reference types="cypress" />

describe('Simple Books API Tests', () => {
  let token;
  let orderId;

  // Test for API Authentication
  it('API Authentication', () => {
    cy.request({
      method: 'POST',
      url: '/api-clients',
      body: {
        clientName: 'Your Name',
        clientEmail: `test+${Date.now()}@example.com`
      }
    }).then((response) => {
      cy.log('Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(201); // Assert status code for token creation
      expect(response.body).to.have.property('accessToken'); // Assert token is present
      token = response.body.accessToken; // Save token for use in subsequent requests
      cy.log('API Authentication Token:', token);
    });
  });

  it('List of Books', () => {
    cy.request({
      method: 'GET',
      url: '/books',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      cy.log('Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(200); // Assert successful operation
      expect(response.body).to.be.an('array'); // Assert that the response is an array
    });
  });

  it('Get Single Book', () => {
    cy.request({
      method: 'GET',
      url: '/books/1',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      cy.log('Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(200); // Assert successful operation
      expect(response.body.id).to.eq(1); // Assert correct book ID
    });
  });

  it('Submit an Order', () => {
    cy.request({
      method: 'POST',
      url: '/orders',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        bookId: 1,
        customerName: 'Test User'
      }
    }).then((response) => {
      cy.log('Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(201); // Assert order creation
      expect(response.body).to.have.property('orderId'); // Assert order ID is present
      orderId = response.body.orderId; // Save order ID for further operations
    });
  });

  it('Get All Orders', () => {
    cy.request({
      method: 'GET',
      url: '/orders',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      cy.log('Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(200); // Assert successful operation
      expect(response.body).to.be.an('array'); // Assert that the response is an array
    });
  });

  it('Update an Order', () => {
    const updatedName = 'Updated User';
    cy.request({
      method: 'PATCH',
      url: `/orders/${orderId}`, // Use saved orderId from earlier test
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        customerName: updatedName
      }
    }).then((response) => {
      cy.log('Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(204); // Assert successful update
    });
  });

  it('Delete an Order', () => {
    cy.request({
      method: 'DELETE',
      url: `/orders/${orderId}`, // Use saved orderId from earlier test
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      cy.log('Response:', JSON.stringify(response.body));
      expect(response.status).to.eq(204); // Assert successful deletion
    });
  });
});
