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
dotenv.config()

const DEBUG = process.env.NODE_ENV !== 'production'
const MANIFEST: Record<string, any> = DEBUG
    ? {}
    : JSON.parse(fs.readFileSync('static/.vite/manifest.json').toString())

const app = express()
const db = new PrismaClient()
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

app.use('/users', buildUsersController(db))
app.use('/sessions', buildSessionsController(db))

app.post('/create-reptile', (req, res) => {
    db.reptile
        .create({
            data: {
                name: req.body.name,
                species: req.body.species,
                sex: req.body.sex,
                user_id: req.body.user_id
            }
        })
        .then((reptile) => {
            res.json(reptile)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

app.post('/update-reptile', (req, res) => {
    // TODO: Make sure that user is authorized to update this reptile
    db.reptile
        .update({
            where: {
                id: req.body.id
            },
            data: {
                name: req.body.name,
                species: req.body.species,
                sex: req.body
            }
        })
        .then((reptile) => {
            res.json(reptile)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

app.get('/delete-reptile/:id', (req, res) => {
    // TODO: Make sure that user is authorized to delete this reptile
    db.reptile
        .delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        .then((reptile) => {
            res.json(reptile)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

app.get('/user/:id/reptiles', (req, res) => {
    // TODO: Make sure that user is authorized to view these reptiles
    db.reptile
        .findMany({
            where: {
                user_id: parseInt(req.params.id)
            }
        })
        .then((reptiles) => {
            res.json(reptiles)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

app.post('/create-feeding', (req, res) => {
    // TODO: Make sure that user is authorized to create a feeding for this reptile
    db.feeding
        .create({
            data: {
                foodItem: req.body.foodItem,
                reptile_id: req.body.reptile_id
            }
        })
        .then((feeding) => {
            res.json(feeding)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

app.get('/reptile/:id/feedings', (req, res) => {
    // TODO: Make sure that user is authorized to view these feedings
    db.feeding
        .findMany({
            where: {
                reptile_id: parseInt(req.params.id)
            }
        })
        .then((feedings) => {
            res.json(feedings)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

app.post('/create-husbandry', (req, res) => {
    // TODO: Make sure that user is authorized to create a husbandry record for this reptile
    db.husbandryRecord
        .create({
            data: {
                length: req.body.length,
                weight: req.body.weight,
                temperature: req.body.temperature,
                humidity: req.body.humidity,
                reptile_id: req.body.reptile_id
            }
        })
        .then((husbandry) => {
            res.json(husbandry)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

app.get('/reptile/:id/husbandry', (req, res) => {
    // TODO: Make sure that user is authorized to view these husbandry records
    db.husbandryRecord
        .findMany({
            where: {
                reptile_id: parseInt(req.params.id)
            }
        })
        .then((husbandry) => {
            res.json(husbandry)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

app.post('/create-schedule', (req, res) => {
    db.schedule
        .create({
            data: {
                type: req.body.type,
                reptile_id: req.body.reptile_id,
                user_id: req.body.user_id,
                description: req.body.description,
                monday: req.body.monday,
                tuesday: req.body.tuesday,
                wednesday: req.body.wednesday,
                thursday: req.body.thursday,
                friday: req.body.friday,
                saturday: req.body.saturday,
                sunday: req.body.sunday
            }
        })
        .then((schedule) => {
            res.json(schedule)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

app.get('/reptile/:id/schedule', (req, res) => {
    // TODO: Make sure that user is authorized to view these schedules
    db.schedule
        .findMany({
            where: {
                reptile_id: parseInt(req.params.id)
            }
        })
        .then((schedules) => {
            res.json(schedules)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

app.get('/user/:id/schedule', (req, res) => {
    // TODO: Make sure that user is authorized to view these schedules
    db.schedule
        .findMany({
            where: {
                user_id: parseInt(req.params.id)
            }
        })
        .then((schedules) => {
            res.json(schedules)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

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
