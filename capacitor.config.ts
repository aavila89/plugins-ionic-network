import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.network.events',
  appName: 'base',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
