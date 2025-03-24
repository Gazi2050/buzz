import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
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

// Middleware to set the userCollection in context
app.use('*', async (c, next) => {
  c.set('userCollection', userCollection);
  await next();
});

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

//DELETE
app.delete('/users/:id', async (c) => {
  try {
    const userCollection = c.get('userCollection') as any;
    const id = c.req.param('id');

    if (!ObjectId.isValid(id)) return c.json({ error: 'Invalid user ID' }, 400);

    const result = await userCollection.deleteOne({ _id: new ObjectId(id) });

    return result.deletedCount
      ? c.json({ message: 'User deleted successfully' })
      : c.json({ error: 'User not found' }, 404);
  } catch (error) {
    console.error('Error deleting user:', error)
    return c.json({ error: 'Failed to delete user' }, 500)
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
