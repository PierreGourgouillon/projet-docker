import * as process from 'process';

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

export default () => ({
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
  jwtRefreshToken: process.env.JWT_REFRESH_SECRET || 'defaultRefreshSecret',
  jwtExpiration: process.env.JWT_EXPIRATION || '15m',
});
