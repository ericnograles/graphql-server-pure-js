import Promise from 'bluebird';
import redis from 'redis';
import { REDIS } from './constants';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

export default {
  userTokens: redis.createClient({
    url: `${REDIS.URL}/${REDIS.USER_SESSIONS_DB}`
  })
};
