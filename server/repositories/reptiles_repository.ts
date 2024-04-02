import { PrismaClient } from '@prisma/client'

export enum Species {
    BALL_PYTHON = 'ball_python',
    KING_SNAKE = 'king_snake',
    CORN_SNAKE = 'corn_snake',
    REDTAIL_BOA = 'redtail_boa'
}

export enum Sex {
    MALE = 'm',
    FEMALE = 'f'
}

export class ReptilesRepository {
    private db: PrismaClient
    private static instance: ReptilesRepository
    constructor(db: PrismaClient) {
        this.db = db
    }

    static getInstance(db?: PrismaClient): ReptilesRepository {
        if (!this.instance) {
            this.instance = new ReptilesRepository(db!!)
        }
        return this.instance
    }

    // make sure user is authorized to view this reptile
    // fetch reptile by user id and reptile id
    // if reptile exists, return feedings
    // else return null
    async getReptileById(user_id: number, reptile_id: number) {
        return this.db.reptile.findFirst({
            where: {
                id: reptile_id,
                user_id
            }
        })
    }

    async createReptile({
        name,
        species,
        sex,
        user_id
    }: {
        name: string
        species: Species
        sex: Sex
        user_id: number
    }) {
        return this.db.reptile.create({
            data: {
                name,
                species,
                sex,
                user_id
            }
        })
    }

    async updateReptile(
        user_id: number,
        {
            id,
            name,
            species,
            sex
        }: {
            id: number
            name?: string
            species?: Species
            sex?: Sex
        }
    ) {
        const reptile = await this.getReptileById(user_id, id)
        if (!reptile) {
            return null
        }

        return this.db.reptile.update({
            where: {
                id
            },
            data: {
                name,
                species,
                sex
            }
        })
    }

    async deleteReptile(user_id: number, id: number) {
        const reptile = await this.getReptileById(user_id, id)
        if (!reptile) {
            return null
        }

        return this.db.reptile.delete({
            where: {
                id
            }
        })
    }

    async getReptilesByUserId(user_id: number) {
        return this.db.reptile.findMany({
            where: {
                user_id
            }
        })
    }
}
