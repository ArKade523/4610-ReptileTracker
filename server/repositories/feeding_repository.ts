import { PrismaClient } from '@prisma/client'
import { Schedule } from '@prisma/client'

export class FeedingRepository {
    private db: PrismaClient
    private static instance: FeedingRepository
    constructor(db: PrismaClient) {
        this.db = db
    }

    static getInstance(db?: PrismaClient): FeedingRepository {
        if (!this.instance) {
            this.instance = new FeedingRepository(db!!)
        }
        return this.instance
    }

    // make sure user is authorized to view this reptile
    // fetch reptile by user id and reptile id
    // if reptile exists, return feedings
    // else return null
    private async getReptileById(user_id: number, reptile_id: number) {
        return this.db.reptile.findFirst({
            where: {
                id: reptile_id,
                user_id
            }
        })
    }

    async createFeeding({
        user_id,
        reptile_id,
        foodItem
    }: {
        user_id: number
        reptile_id: number
        foodItem: string
    }) {
        return this.db.feeding.create({
            data: {
                reptile_id,
                foodItem
            }
        })
    }

    async getFeedingsByReptileId(user_id: number, reptile_id: number) {
        const reptile = await this.getReptileById(user_id, reptile_id)

        if (!reptile) {
            return null
        }

        return this.db.feeding.findMany({
            where: {
                reptile_id
            }
        })
    }
}
