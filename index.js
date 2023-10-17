const http = require('http');
const axios = require('axios');
const winston = require('winston'); 

// Create a logger instance
const logger = winston.createLogger({
  level: 'warn',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

const server = http.createServer(async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    logger.info('Successfully fetched data:', { responseData: response.data });
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response.data));
  } catch (error) {
    logger.error('Error fetching data:', { errorMessage: error.message });
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

const port = 4000;
const ip = '127.0.0.1';

server.listen(port, ip, () => {
  logger.info(`Server running at http://${ip}:${port}/`);
});
