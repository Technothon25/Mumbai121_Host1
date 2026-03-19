import { NextResponse } from 'next/server'
import clientPromise from '../../../lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('Mumbai121') // add your DB name here if needed: client.db('yourdbname')
    const companies = await db
      .collection('Requirements') // replace with your actual collection name
      .find({})
      .limit(12)
      .project({ company: 1, jobPreference: 1, employees: 1, _id: 0 })
      .toArray()
    return NextResponse.json(companies)
  } catch (err) {
    console.error('MongoDB error:', err)
    return NextResponse.json({ error: 'Failed to fetch companies' }, { status: 500 })
  }
}