export interface EnvInterface {
  production: boolean,
  isDebugMode: boolean,
  connection: {
    cordova,
    sqljs,
  }
}
