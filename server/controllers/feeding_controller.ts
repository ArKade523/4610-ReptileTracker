import { Router } from 'express'
import { FeedingRepository } from '../repositories/feeding_repository'
import { authMiddleware } from '../middleware/authentication'

// /feedings/...
export const buildFeedingController = (feedingRepository: FeedingRepository) => {
    const router = Router()

    router.post('/', authMiddleware, async (req, res) => {
        const feeding = await feedingRepository.createFeeding(req.body)
        res.json(feeding)
    })

    router.get('/:id', authMiddleware, async (req, res) => {
        const feedings = await feedingRepository.getFeedingsByReptileId(
            req.user?.id as unknown as number,
            parseInt(req.params.id)
        )
        res.json(feedings)
    })

    router.delete('/del/:id', authMiddleware, async (req, res) => {
        const feeding = await feedingRepository.deleteFeeding(
            req.user?.id as unknown as number,
            parseInt(req.params.id)
        )
        res.json(feeding)
    })

    return router
}
