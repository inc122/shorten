import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Shorten } from './entities';
import { HttpException } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('AppService', () => {
  let appService: AppService;
  
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
          TypeOrmModule.forRoot({
            migrationsTableName: 'migrations',
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'admin',
            password: 'qwerty',
            database: 'shorten',
            logging: false,
            synchronize: false,
            name: 'default',
            autoLoadEntities: true,
            entities: [__dirname + '/entities/*{.ts,.js}'],
            migrations: [__dirname + '/migrations/*{.ts,.js}'],
          }),
        ],
      providers: [
        AppService
      ]
    }).compile();

    appService = app.get<AppService>(AppService)
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('shorten alias', () => {
    it('should retrun error for duplicated alias', async () => {
      const mockShorten = new Shorten()
      mockShorten.originalUrl = 'https://google.com';
      mockShorten.alias = 'service_test_alias';
      mockShorten.expiresAt = new Date();
      mockShorten.shortUrl = 'short_u';
      mockShorten.createdAt = new Date();

      const testShorten = await mockShorten.save()

      try {
        await expect(appService.postShorten({
          originalUrl: mockShorten.originalUrl,
          expiresAt: mockShorten.expiresAt,
          alias: mockShorten.alias
        })).rejects.toThrow(HttpException);
      }
      finally {
        await testShorten.remove()
      }
    });
  })
});
