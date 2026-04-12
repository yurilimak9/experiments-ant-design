const requiredEnvVars = ["VITE_BASE_API_URL"] as const;

for (const key of requiredEnvVars) {
  if (!import.meta.env[key]) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${key}`);
  }
}

export const env = {
  BASE_API_URL: import.meta.env.VITE_BASE_API_URL as string,
  MODE: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
