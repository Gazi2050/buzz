import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { MongoClient, ServerApiVersion } from 'mongodb'
import 'dotenv/config'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Start the server properly
serve({
  fetch: app.fetch,
  port: 3000
})

console.log(`Server is running on http://localhost:3000`)

// MongoDB connection
const uri = process.env.DB_URL

if (!uri) {
  console.error("Missing DB_URL in environment variables!")
  process.exit(1) // Exit the process to prevent further errors
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. Successfully connected to MongoDB!')
  } catch (err) {
    console.error('MongoDB connection error:', err)
  } finally {
    await client.close()
  }
}

run().catch(console.dir)
