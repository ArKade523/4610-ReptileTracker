import { PrismaClient } from '@prisma/client'

export class HusbandryRecordRepository {
    private db: PrismaClient
    private static instance: HusbandryRecordRepository
    constructor(db: PrismaClient) {
        this.db = db
    }

    static getInstance(db?: PrismaClient): HusbandryRecordRepository {
        if (!this.instance) {
            this.instance = new HusbandryRecordRepository(db!!)
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

    async createHusbandryRecord({
        user_id,
        reptile_id,
        temperature,
        length,
        weight,
        humidity
    }: {
        user_id: number
        reptile_id: number
        temperature: number
        length: number
        weight: number
        humidity: number
        notes: string
    }) {
        const reptile = await this.getReptileById(user_id, reptile_id)
        if (!reptile) {
            return null
        }

        return this.db.husbandryRecord.create({
            data: {
                reptile_id,
                temperature,
                length,
                weight,
                humidity
            }
        })
    }

    async getHusbandryRecordsByReptileId(user_id: number, reptile_id: number) {
        const reptile = await this.getReptileById(user_id, reptile_id)
        if (!reptile) {
            return null
        }

        return this.db.husbandryRecord.findMany({
            where: {
                reptile_id
            }
        })
    }

    async deleteHusbandryRecord(user_id: number, record_id: number) {
        const record = await this.db.husbandryRecord.findFirst({
            where: {
                id: record_id
            }
        })

        if (!record) {
            return null
        }

        const reptile = await this.getReptileById(user_id, record.reptile_id)
        if (!reptile) {
            return null
        }

        return this.db.husbandryRecord.delete({
            where: {
                id: record_id
            }
        })
    }
}
