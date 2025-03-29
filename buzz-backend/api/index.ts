import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'
import { cors } from 'hono/cors'
import 'dotenv/config'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')
const PORT = Number(process.env.PORT) || 3000;
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : [];

// CORS
app.use(cors({
  origin: allowedOrigins,
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
const postCollection = db.collection('posts')

async function run() {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log('✅ MongoDB Connected Successfully')

    serve({
      fetch: app.fetch,
      port: PORT
    })
    console.log(`🚀 Server is running on http://localhost:${PORT}`)

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

/* posts API */
// GET
app.get('/posts', async (c) => {
  try {
    const posts = await postCollection.find().toArray()
    return c.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return c.json({ error: 'Failed to fetch posts' }, 500)
  }
})

//GET id:
// app.get('/posts/:id', async (c) => {
//   try {
//     const id = c.req.param('id');
//     if (!ObjectId.isValid(id)) {
//       return c.json({ error: 'Invalid ID format' }, 400);
//     }
//     const query = { _id: new ObjectId(id) };
//     const result = await postCollection.findOne(query);
//     if (!result) {
//       return c.json({ error: 'Post not found' }, 404);
//     }
//     return c.json(result);
//   } catch (error) {
//     console.error('Error fetching post:', error);
//     return c.json({ error: 'Failed to fetch post' }, 500);
//   }
// });

//GET :identifier
app.get('/posts/:identifier', async (c) => {
  try {
    const identifier = c.req.param('identifier');
    let query;
    let result;
    if (ObjectId.isValid(identifier)) {
      query = { _id: new ObjectId(identifier) };
      result = await postCollection.findOne(query);
    } else {
      query = { username: identifier };
      result = await postCollection.find(query).toArray();
    }
    if (!result || (Array.isArray(result) && result.length === 0)) {
      return c.json({ error: 'Post not found' }, 404);
    }
    return c.json(result);
  } catch (error) {
    console.error('Error fetching post:', error);
    return c.json({ error: 'Failed to fetch post' }, 500);
  }
});


// POST
app.post('/posts', async (c) => {
  try {
    const post = await c.req.json()
    const result = await postCollection.insertOne(post)
    return c.json(result, 201)
  } catch (error) {
    console.error('Error inserting post:', error)
    return c.json({ error: 'Failed to insert post' }, 500)
  }
})

// for Vercel
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app);
