import chaiModule from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import { insertTestUser, getToken } from '../helpers/test.js';

chaiModule.use(chaiHttp);
const { expect } = chaiModule;

describe('Todo API Tests', () => {
  let token;

  before(async () => {
    await insertTestUser();
    token = await getToken('testuser@example.com');
  });

  it('should return all tasks for the authenticated user', async () => {
    const res = await chaiModule.request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    if (res.body.length > 0) {
      expect(res.body[0]).to.have.keys('id', 'description', 'user_id');
    }
  });

  it('should create a new task for the authenticated user', async () => {
    const newTask = { description: 'Test Task' };
    const res = await chaiModule.request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(newTask);

    expect(res).to.have.status(201);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('user_id');
    expect(res.body.description).to.equal('Test Task');
  });

  it('should delete a task by ID for the authenticated user', async () => {
    const newTask = { description: 'Task to Delete' };
    const createRes = await chaiModule.request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send(newTask);
    const taskId = createRes.body.id;

    expect(createRes).to.have.status(201);
    expect(taskId).to.exist;

    console.log(`Created task ID for deletion: ${taskId}`); // Debug log

    const deleteRes = await chaiModule.request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteRes).to.have.status(200);
    expect(deleteRes.body).to.have.property('message', 'Task deleted');
  });

  it('should return an error when creating a task without a description', async () => {
    const res = await chaiModule.request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error');
  });

  it('should handle invalid ID deletion gracefully', async () => {
    const res = await chaiModule.request(app)
      .delete('/tasks/invalid-id')
      .set('Authorization', `Bearer ${token}`);

    expect(res).to.have.status(400);
    expect(res.body).to.have.property('error', 'Invalid task ID format');
  });
});
