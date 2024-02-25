import redis from 'redis'


const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USER,
    password: process.env.REDIS_PASSWORD
  });
  
// Event listener to handle Redis errors
client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('connect', (err) => {
    console.error('Redis connect');
});

export default client