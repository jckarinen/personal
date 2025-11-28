import express, {type Request, type Response, type Router} from 'express';
import { execSync } from 'child_process'
import crypto from 'crypto'
import path from 'path'
import fs from 'fs'

const isDevEnvironment: () => boolean = () => {
  return !process.env.PROD
}
const SECRETS = {
  webhook: isDevEnvironment()
      ? null
      : fs.readFileSync(path.join(import.meta.dirname, 'secrets', 'webhook.txt'))
}
const PORT = 3003
const app = express();

// Handle rebuild and restart when updates pushed to GitHub
app.post('/webhook', express.raw({ type: 'application/json' }), (req: Request, res: Response) => {
  if (isDevEnvironment()) return res.status(403).send('No webhook on dev')
  if (!SECRETS.webhook) return res.status(500).send('Cannot verify secret')
  const sig = req.headers['x-hub-signature-256']
  if (!sig) return res.status(401).send('No signature')
  const rawBody: string = req.body.toString()
  const hash = 'sha256=' + crypto
      .createHmac('sha256', SECRETS.webhook)
      .update(rawBody)
      .digest('hex')
  if (hash !== sig) return res.status(401).send('Invalid signature')
  try {
    execSync(path.join(import.meta.dirname, 'build.sh'))
    res.status(200).send('OK')
  }
  catch (err) {
    res.status(500).send('Failed')
  }
})

app.use(express.json());

const apiRouter: Router = express.Router()

apiRouter.get('/', (req: Request, res: Response) => {
  res.send('API index')
})

apiRouter.get('/ex', (req: Request, res: Response) => {
  res.send('API example route')
})

app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log('API server running on http://localhost:3003');
});

