import { PrismaClient } from '@prisma/client'

export enum ScheduleType {
    FEED = 'feed',
    RECORD = 'record',
    CLEAN = 'clean'
}

export class ScheduleRepository {
    private db: PrismaClient
    private static instance: ScheduleRepository
    constructor(db: PrismaClient) {
        this.db = db
    }

    static getInstance(db?: PrismaClient): ScheduleRepository {
        if (!this.instance) {
            this.instance = new ScheduleRepository(db!!)
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

    async createSchedule({
        reptile_id,
        user_id,
        type,
        description,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday
    }: {
        reptile_id: number
        user_id: number
        type: ScheduleType
        description: string
        monday: boolean
        tuesday: boolean
        wednesday: boolean
        thursday: boolean
        friday: boolean
        saturday: boolean
        sunday: boolean
    }) {
        const reptile = await this.getReptileById(user_id, reptile_id)
        if (!reptile) {
            return null
        }

        return this.db.schedule.create({
            data: {
                reptile_id,
                user_id,
                type,
                description,
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday
            }
        })
    }

    async getSchedulesByReptileId(user_id: number, reptile_id: number) {
        const reptile = await this.getReptileById(user_id, reptile_id)
        if (!reptile) {
            return null
        }

        return this.db.schedule.findMany({
            where: {
                reptile_id
            }
        })
    }

    async getSchedulesByUserId(user_id: number) {
        return this.db.schedule.findMany({
            where: {
                user_id
            }
        })
    }
}
