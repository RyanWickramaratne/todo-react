// Bring in Chai, which helps us write test assertions
import chaiModule from 'chai';
// Bring in chai-http so we can test HTTP endpoints
import chaiHttp from 'chai-http';
// Import our Express app so we can test it
import app from '../index.js'; // Double-check this path is correct for your setup

// Tell Chai to use chai-http so we can make HTTP requests
chaiModule.use(chaiHttp);

// Grab the `expect` function from Chai for easy assertions
const { expect } = chaiModule;

// Group all the tests under a single "Todo API Tests" section
describe('Todo API Tests', () => 
{



  // Test to check if we can get all tasks from the server
  it('should return all tasks', async () => {
    // Make a GET request to the server's root endpoint
    const res = await chaiModule.request(app).get('/tasks');
    
    // Check that we get a 200 status (OK)
    expect(res).to.have.status(200);
    
    // Make sure the response body is an array
    expect(res.body).to.be.an('array');
    
    // If there are tasks, check that each one has 'id' and 'description'
    if (res.body.length > 0) {
      expect(res.body[0]).to.have.keys('id', 'description');
    }
  });





  // Test to see if we can create a new task
  it('should create a new task', async () => {
    // Define a new task to be sent in the request
    const newTask = { description: 'Test Task' };
    
    // Make a POST request to add a new task
    const res = await chaiModule.request(app).post('/tasks').send(newTask);
    
    // Check for a 201 status, which means "Created"
    expect(res).to.have.status(201);
    
    // Make sure the response body is an object
    expect(res.body).to.be.an('object');
    
    // Confirm the response includes an 'id'
    expect(res.body).to.have.property('id');
    
    // Check that the description matches what we sent
    expect(res.body.description).to.equal('Test Task');
  });





  // Test to delete a task and see if it works
  it('should delete a task by ID', async () => {
    // First, create a task so we have something to delete
    const newTask = { description: 'Task to Delete' };
    const createRes = await chaiModule.request(app).post('/tasks').send(newTask);
    const taskId = createRes.body.id; // Get the ID of the newly created task

    // Now, make a DELETE request to remove the task by its ID
    const deleteRes = await chaiModule.request(app).delete(`/tasks/${taskId}`);
    
    // Check for a 200 status, which means "OK"
    expect(deleteRes).to.have.status(200);
    
    // Make sure the response says the task was deleted
    expect(deleteRes.body).to.have.property('message', 'Task deleted');
  });

  // Test what happens when we try to create a task without a description
  it('should return an error when creating a task without a description', async () => {
    // Send an empty POST request to trigger an error
    const res = await chaiModule.request(app).post('/tasks').send({});
    
    // Expect a 500 status (internal server error)
    expect(res).to.have.status(500);
    
    // Confirm the response includes an 'error' property
    expect(res.body).to.have.property('error');
  });

  // Test to see how the server handles an invalid task ID during deletion
  it('should handle invalid ID deletion', async () => {
    // Send a DELETE request with an invalid ID
    const res = await chaiModule.request(app).delete('/tasks/invalid-id');
    
    // Expect a 500 status, since it's an invalid request
    expect(res).to.have.status(500);
    
    // Check that the response includes an 'error' property
    expect(res.body).to.have.property('error');
  });



});
