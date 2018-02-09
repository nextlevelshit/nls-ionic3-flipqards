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
      database: 'nls-flipcards',
      description: 'Development Database for NLS Flipcards',
      version: '1',
      size: 2097152,
      logging: true,
      synchronize: true,
      entities: [
        Category,
        Card
      ],
      dropSchema: true
    }
  }
};
