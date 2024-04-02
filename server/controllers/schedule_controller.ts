import { Router } from 'express'
import { ScheduleRepository } from '../repositories/schedule_repository'
import { authMiddleware } from '../middleware/authentication'

// /schedules/...
export const buildScheduleController = (scheduleRepository: ScheduleRepository) => {
    const router = Router()

    router.post('/', authMiddleware, async (req, res) => {
        const schedule = await scheduleRepository.createSchedule(req.body)
        res.json(schedule)
    })

    router.get('/user/', authMiddleware, async (req, res) => {
        const user_id = req.user?.id as number

        const schedules = await scheduleRepository.getSchedulesByUserId(user_id)
        res.json(schedules)
    })

    router.get('/reptile/:id', authMiddleware, async (req, res) => {
        const reptile_id = parseInt(req.params.id)
        const schedules = await scheduleRepository.getSchedulesByReptileId(
            req.user?.id as unknown as number,
            reptile_id
        )
        res.json(schedules)
    })

    router.delete('/del/:id', authMiddleware, async (req, res) => {
        const schedule = await scheduleRepository.deleteSchedule(
            req.user?.id as unknown as number,
            parseInt(req.params.id)
        )
        res.json(schedule)
    })

    return router
}
