import { Router } from 'express'
import { HusbandryRecordRepository } from '../repositories/husbandryRecord_repository'
import { authMiddleware } from '../middleware/authentication'

// /husbandry/...
export const buildHusbandryController = (husbandryRecordRepository: HusbandryRecordRepository) => {
    const router = Router()

    router.post('/', authMiddleware, async (req, res) => {
        const husbandryRecord = await husbandryRecordRepository.createHusbandryRecord(req.body)
        res.json(husbandryRecord)
    })

    router.get('/:id', authMiddleware, async (req, res) => {
        const husbandryRecords = await husbandryRecordRepository.getHusbandryRecordsByReptileId(
            req.user?.id as unknown as number,
            parseInt(req.params.id)
        )
        res.json(husbandryRecords)
    })

    router.delete('/del/:id', authMiddleware, async (req, res) => {
        const husbandryRecord = await husbandryRecordRepository.deleteHusbandryRecord(
            req.user?.id as unknown as number,
            parseInt(req.params.id)
        )
        res.json(husbandryRecord)
    })

    return router
}
