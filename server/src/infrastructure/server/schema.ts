const schema = {
  type: 'object',
  required: ['PORT', 'DATABASE_URL'],
  properties: {
    PORT: {
      type: 'string',
      default: 3000,
    },
    DATABASE_URL: {
      type: 'string',
    },
    PINO_LOG_LEVEL: {
      type: 'string',
      default: 'error',
    },
    NODE_ENV: {
      type: 'string',
      default: 'production',
    },
  },
}

export const options = {
  schema: schema,
  dotenv: true,
}