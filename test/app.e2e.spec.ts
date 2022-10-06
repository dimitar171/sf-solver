import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Workspaces', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('gets all workspaces', async () => {
    return request(app.getHttpServer())
      .get('/workspaces/all')
      .expect(401)
      .then((res) => {
        const workspaces = res.body;
        expect(workspaces).toBeDefined();
        expect(workspaces).toEqual({
          message: 'Unauthorized',
          statusCode: 401,
        }); //just for test, we need to authorize
      });
  });
});
