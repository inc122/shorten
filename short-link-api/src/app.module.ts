import { Injectable, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionConfig } from 'ormconfig';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    console.log('Running migrations...');
    await this.dataSource.runMigrations();
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ConnectionConfig,
      autoLoadEntities: true,
      entities: [__dirname + '/entities/*{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [DatabaseService, AppService],
})
export class AppModule {}
