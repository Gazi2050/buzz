import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { MongoClient, ServerApiVersion } from 'mongodb'
import { cors } from 'hono/cors'
import 'dotenv/config'

const app = new Hono()

// Enable CORS
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization']
}))

app.get('/', (c) => {
  return c.text('hello buzz')
})

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
const db = client.db('buzz')
const userCollection = db.collection('users')

/*users api*/
//GET
app.get('/users', async (c) => {
  try {
    const users = await userCollection.find().toArray()
    return c.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return c.json({ error: 'Failed to fetch users' }, 500)
  }
})


//POST
app.post('/users', async (c) => {
  try {
    const user = await c.req.json()
    const query = { username: user.username }
    const existingUser = await userCollection.findOne(query)

    if (existingUser) {
      return c.json({ message: 'User already exists', insertedId: null }, 409)
    }

    const result = await userCollection.insertOne(user)
    return c.json(result, 201)
  } catch (error) {
    console.error('Error inserting user:', error)
    return c.json({ error: 'Failed to insert user' }, 500)
  }
})

async function run() {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log('✅ MongoDB Connected Successfully')
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err)
  }
}

run().catch(console.dir)
