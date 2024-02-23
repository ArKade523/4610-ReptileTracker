import express from 'express'
import path from 'path'
import { engine } from 'express-handlebars'
import fs from 'fs'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
dotenv.config()

const DEBUG = process.env.NODE_ENV !== 'production'
const MANIFEST: Record<string, any> = DEBUG
    ? {}
    : JSON.parse(fs.readFileSync('static/.vite/manifest.json').toString())

const app = express()
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

app.route('/user')
    .post((req, res) => {
        const prisma = new PrismaClient()
        prisma.user
            .create({
                data: {
                    email: req.body.email,
                    password_hash: bcrypt.hashSync(req.body.password),
                    Profile: {
                        create: {
                            first_name: req.body.first_name,
                            last_name: req.body.last_name
                        }
                    }
                }
            })
            .then((user) => {
                res.json(user)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
            .finally(() => {
                prisma.$disconnect()
            })
    })
    .get((req, res) => {
        const prisma = new PrismaClient()
        prisma.user
            .findMany({
                include: {
                    Profile: true
                }
            })
            .then((users) => {
                res.json(users)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
            .finally(() => {
                prisma.$disconnect()
            })
    })

app.get('/user/:id', (req, res) => {
    const prisma = new PrismaClient()
    prisma.user
        .findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                Profile: true
            }
        })
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
        .finally(() => {
            prisma.$disconnect()
        })
})

app.post('/login', (req, res) => {
    const prisma = new PrismaClient()
    prisma.user
        .findUnique({
            where: {
                email: req.body.email
            }
        })
        .then((user) => {
            if (user && bcrypt.compareSync(req.body.password, user.password_hash)) {
                res.json(user)
            } else {
                res.status(401).json({ message: 'Invalid email or password' })
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
        .finally(() => {
            prisma.$disconnect()
        })
})

app.get('/logout', (req, res) => {
    res.json({ message: 'Logged out' })
})

app.post('/register', (req, res) => {
    const prisma = new PrismaClient()
    prisma.user
        .create({
            data: {
                email: req.body.email,
                password_hash: bcrypt.hashSync(req.body.password),
                Profile: {
                    create: {
                        first_name: req.body.firstName,
                        last_name: req.body.lastName
                    }
                }
            }
        })
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
        .finally(() => {
            prisma.$disconnect()
        })
})

app.post('/create-reptile', (req, res) => {
    const prisma = new PrismaClient()
    prisma.reptile
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
        .finally(() => {
            prisma.$disconnect()
        })
})

app.post('/update-reptile', (req, res) => {
    // TODO: Make sure that user is authorized to update this reptile
    const prisma = new PrismaClient()
    prisma.reptile
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
        .finally(() => {
            prisma.$disconnect()
        })
})

app.get('/delete-reptile/:id', (req, res) => {
    // TODO: Make sure that user is authorized to delete this reptile
    const prisma = new PrismaClient()
    prisma.reptile
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
        .finally(() => {
            prisma.$disconnect()
        })
})

app.get('/user/:id/reptiles', (req, res) => {
    // TODO: Make sure that user is authorized to view these reptiles
    const prisma = new PrismaClient()
    prisma.reptile
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
        .finally(() => {
            prisma.$disconnect()
        })
})

app.post('/create-feeding', (req, res) => {
    // TODO: Make sure that user is authorized to create a feeding for this reptile
    const prisma = new PrismaClient()
    prisma.feeding
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
        .finally(() => {
            prisma.$disconnect()
        })
})

app.get('/reptile/:id/feedings', (req, res) => {
    // TODO: Make sure that user is authorized to view these feedings
    const prisma = new PrismaClient()
    prisma.feeding
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
        .finally(() => {
            prisma.$disconnect()
        })
})

app.post('/create-husbandry', (req, res) => {
    // TODO: Make sure that user is authorized to create a husbandry record for this reptile
    const prisma = new PrismaClient()
    prisma.husbandryRecord
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
        .finally(() => {
            prisma.$disconnect()
        })
})

app.get('/reptile/:id/husbandry', (req, res) => {
    // TODO: Make sure that user is authorized to view these husbandry records
    const prisma = new PrismaClient()
    prisma.husbandryRecord
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
        .finally(() => {
            prisma.$disconnect()
        })
})

app.post('/create-schedule', (req, res) => {
    const prisma = new PrismaClient()
    prisma.schedule
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
        .finally(() => {
            prisma.$disconnect()
        })
})

app.get('/reptile/:id/schedule', (req, res) => {
    // TODO: Make sure that user is authorized to view these schedules
    const prisma = new PrismaClient()
    prisma.schedule
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
        .finally(() => {
            prisma.$disconnect()
        })
})

app.get('/user/:id/schedule', (req, res) => {
    // TODO: Make sure that user is authorized to view these schedules
    const prisma = new PrismaClient()
    prisma.schedule
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
        .finally(() => {
            prisma.$disconnect()
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
