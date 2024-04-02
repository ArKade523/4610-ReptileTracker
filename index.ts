import express from 'express'
import path from 'path'
import { engine } from 'express-handlebars'
import fs from 'fs'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { buildUsersController } from './server/controllers/users_controller'
import { buildSessionsController } from './server/controllers/sessions_controller'
import { buildReptilesController } from './server/controllers/reptiles_controller'
import { buildFeedingController } from './server/controllers/feeding_controller'
import { buildScheduleController } from './server/controllers/schedule_controller'
import { buildHusbandryController } from './server/controllers/husbandry_controller'
import { UsersRepository } from './server/repositories/users_repository'
import { ReptilesRepository } from './server/repositories/reptiles_repository'
import { FeedingRepository } from './server/repositories/feeding_repository'
import { ScheduleRepository } from './server/repositories/schedule_repository'
import { HusbandryRecordRepository } from './server/repositories/husbandryRecord_repository'
dotenv.config()

const DEBUG = process.env.NODE_ENV !== 'production'
const MANIFEST: Record<string, any> = DEBUG
    ? {}
    : JSON.parse(fs.readFileSync('static/.vite/manifest.json').toString())

const app = express()
const db = new PrismaClient()
const usersRepository = UsersRepository.getInstance(db)
const reptilesRepository = ReptilesRepository.getInstance(db)
const feedingRepository = FeedingRepository.getInstance(db)
const scheduleRepository = ScheduleRepository.getInstance(db)
const husbandryRecordRepository = HusbandryRecordRepository.getInstance(db)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
})

if (!DEBUG) {
    app.use(express.static('static'))
} else {
    app.use((req, res, next) => {
        if (req.url.includes('.')) {
            res.redirect(`${process.env.ASSET_URL}/${req.url}`)
        } else {
            next()
        }
    })
}

app.use('/users', buildUsersController(usersRepository))
app.use('/sessions', buildSessionsController(db))
app.use('/reptiles', buildReptilesController(reptilesRepository))
app.use('/feedings', buildFeedingController(feedingRepository))
app.use('/schedules', buildScheduleController(scheduleRepository))
app.use('/husbandry', buildHusbandryController(husbandryRecordRepository))

console.log(MANIFEST)
app.get('/', (req, res) => {
    res.render('index', {
        debug: DEBUG,
        jsBundle: DEBUG ? '' : MANIFEST['src/main.jsx']['file'],
        cssBundle: DEBUG ? '' : MANIFEST['src/main.jsx']['css'][0],
        assetUrl: process.env.ASSET_URL,
        layout: false
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}...`)
})
