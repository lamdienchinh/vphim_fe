import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, email, password } = req.body

  try {
    const response = await fetch('http://your-nestjs-backend-url/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    if (response.ok) {
      res.status(200).json({ message: 'User registered successfully' })
    } else {
      const error = await response.text()
      res.status(response.status).json({ error })
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during registration' })
  }
}

