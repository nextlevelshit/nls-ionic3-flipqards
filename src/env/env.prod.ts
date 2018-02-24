import { EnvInterface } from './interface';
// Entities
import { Card } from '@entities/card';
import { Category } from '@entities/category';
import { Settings } from '@entities/settings';

export const ENV: EnvInterface = {
  production: true,
  isDebugMode: false,
  connection: {
    cordova: {
      type: 'cordova',
      location: 'default',
      database: 'nls-flipcards',
      logging: false,
      synchronize: false,
      dropSchema: false,
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
      dropSchema: false,
      loggin: false,
      synchronize: false,
      entities: [
        Card,
        Category,
        Settings
      ]
    }
  }
};
