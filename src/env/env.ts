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
    }
  }
}
