import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import homesRoutes from './routes/homes'
import matchmakingRoutes from './routes/matchmaking'
import preferencesRoutes from './routes/preferences'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/homes', homesRoutes)
app.use('/api/matchmaking', matchmakingRoutes)
app.use('/api/preferences', preferencesRoutes)

app.listen(4000, () => console.log('Server running on port 4000'))
