import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local as MONGODB_URI')
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the client is reused
  // across hot-reloads to avoid exhausting connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production, create a fresh client
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise