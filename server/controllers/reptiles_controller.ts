import { Router } from 'express'
import { ReptilesRepository } from '../repositories/reptiles_repository'
import { authMiddleware } from '../middleware/authentication'

// /reptiles/...
export const buildReptilesController = (reptilesRepository: ReptilesRepository) => {
    const router = Router()

    router.post('/', authMiddleware, async (req, res) => {
        const reptile = await reptilesRepository.createReptile(req.body)
        res.json(reptile)
    })

    router.get('/', authMiddleware, async (req, res) => {
        const user_id = req.user?.id as number

        const reptiles = await reptilesRepository.getReptilesByUserId(user_id)
        res.json(reptiles)
    })

    router.get('/:id', authMiddleware, async (req, res) => {
        const user_id = req.user?.id as number

        const reptile = await reptilesRepository.getReptileById(user_id, parseInt(req.params.id))
        res.json(reptile)
    })

    router.delete('/del/:id', authMiddleware, async (req, res) => {
        const user_id = req.user?.id as number
        const reptile = await reptilesRepository.deleteReptile(user_id, parseInt(req.params.id))
        res.json(reptile)
    })

    router.post('/update/:id', authMiddleware, async (req, res) => {
        const user_id = req.user?.id as number

        const reptile = await reptilesRepository.updateReptile(user_id, {
            id: parseInt(req.params.id),
            name: req.body.name,
            species: req.body.species,
            sex: req.body.sex
        })
        res.json(reptile)
    })

    return router
}
