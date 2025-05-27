import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export class TestConfig {
  private static mongod: MongoMemoryServer;

  static async getMongoMemoryServer(): Promise<MongoMemoryServer> {
    if (!this.mongod) {
      this.mongod = await MongoMemoryServer.create();
    }
    return this.mongod;
  }

  static async getMongooseOptions(): Promise<MongooseModuleOptions> {
    const mongod = await this.getMongoMemoryServer();
    const uri = mongod.getUri();
    if (!uri) {
      throw new Error('Failed to get MongoDB URI');
    }
    return { uri };
  }

  static async closeMongoMemoryServer(): Promise<void> {
    if (this.mongod) {
      await this.mongod.stop();
    }
  }
}
