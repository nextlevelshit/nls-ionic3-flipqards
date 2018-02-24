export interface EnvInterface {
  production: boolean,
  isDebugMode: boolean,
  connection: {
    cordova,
    websql,
    sqljs,
    sqlite
  }
}
