import { config } from 'dotenv';
let isEnvSet = false;

export function setDotEnv(): void {
  if (isEnvSet) return;
  isEnvSet = true;
  config();
  console.log('[DotEnv] Successfully set development environment variables.');
}
