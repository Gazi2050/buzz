import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import { cors } from 'hono/cors'
import 'dotenv/config'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

// CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://buzz-01.vercel.app'],
  allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}))

app.get('/', (c) => {
  return c.text('hello buzz')
})

// MongoDB connection
const uri = process.env.DB_URL
if (!uri) {
  console.error("❌ Missing DB_URL in environment variables!")
  process.exit(1)
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

async function run() {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log('✅ MongoDB Connected Successfully')

    serve({
      fetch: app.fetch,
      port: 3000
    })
    console.log(`🚀 Server is running on http://localhost:3000`)

  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err)
    process.exit(1) // Stop server on failure
  }
}

run()

/* users API */
// GET
app.get('/users', async (c) => {
  try {
    const users = await userCollection.find().toArray()
    return c.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return c.json({ error: 'Failed to fetch users' }, 500)
  }
})

// POST
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

// DELETE
app.delete('/users/:id', async (c) => {
  try {
    const id = c.req.param('id')

    if (!ObjectId.isValid(id)) return c.json({ error: 'Invalid user ID' }, 400)

    const result = await userCollection.deleteOne({ _id: new ObjectId(id) })

    return result.deletedCount
      ? c.json({ message: 'User deleted successfully' })
      : c.json({ error: 'User not found' }, 404)
  } catch (error) {
    console.error('Error deleting user:', error)
    return c.json({ error: 'Failed to delete user' }, 500)
  }
})

// for Vercel
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);
