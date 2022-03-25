import { NextApiRequest, NextApiResponse } from 'next'
import { readContentFile } from 'lib/contentLoader'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  const {
    query: { id },
  } = req
  const postData = await readContentFile(`${id}`)
  res.end(JSON.stringify({ postData }))
}
