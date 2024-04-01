import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

// /users/...
export const buildUsersController = (db: PrismaClient) => {
    const router = Router()

    router
        .route('/')
        .post((req, res) => {
            db.user
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
                    db.$disconnect()
                })
        })
        .get((req, res) => {
            db.user
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
                    db.$disconnect()
                })
        })

    router.get('/:id', (req, res) => {
        db.user
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
                db.$disconnect()
            })
    })

    return router
}
