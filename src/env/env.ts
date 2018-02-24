import { EnvInterface } from './interface';
// Entities
import { Card } from '@entities/card';
import { Category } from '@entities/category';
import { Settings } from '@entities/settings';

export const ENV: EnvInterface = {
  production: false,
  isDebugMode: true,
  connection: {
    cordova: {
      type: 'cordova',
      location: 'default',
      database: 'nls-flipcards-dev',
      logging: true,
      synchronize: true,
      dropSchema: true,
      entities: [
        Card,
        Category,
        Settings
      ]
    },
    websql: {
      type: 'websql',
      database: 'nls-flipcards-dev',
      version: '1',
      description: 'development database',
      size: 2 * 1024 * 1024,
      entities: [
        Card,
        Category,
        Settings
      ],
      logging: true,
      synchronize: false
    },
    sqljs: {
      type: 'sqljs',
      autoSave: true,
      location: 'browser',
      dropSchema: true,
      loggin: true,
      synchronize: true,
      entities: [
        Card,
        Category,
        Settings
      ]
    },
    sqlite: {

    }
  }
}
