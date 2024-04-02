import { useEffect, useState } from 'react'
import { requireLoggedIn } from '../hooks/isLoggedIn'
import { useApi } from '../hooks/useApi'
import { useDispatch } from 'react-redux'
import Loading from '../components/Loading'
import ReptileCard from '../components/ReptileCard'
import { setReptilesSlice } from '../slices/reptilesSlice'
import { setUser } from '../slices/authSlice'
import ReptileModal from '../components/ReptileModal'
import { findReptileNameById } from '../utils/findReptileNameById'

function Dashboard() {
    const [reptiles, setReptiles] = useState<Reptile[]>([])
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [loading, setLoading] = useState(false)
    const [isReptileModalOpen, setIsReptileModalOpen] = useState(false)
    const [dayOfTheWeek, setDayOfTheWeek] = useState<string>('')
    const api = useApi()
    const dispatch = useDispatch()

    const fetchReptiles = async () => {
        setLoading(true)
        const data = await api.get('/reptiles')
        setReptiles(data)
        dispatch(setReptilesSlice(data))
        setLoading(false)
    }

    requireLoggedIn()

    const fetchSchedules = async () => {
        setLoading(true)
        const data = await api.get('/schedules/user')
        setSchedules(data)
        setLoading(false)
    }

    useEffect(() => {
        api.get('/users/me').then((user) => {
            dispatch(setUser(user))
        })
        setDayOfTheWeek(new Date().toLocaleString('en-us', { weekday: 'long' }))
        fetchReptiles()
        fetchSchedules()
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
            {loading && <Loading />}
            <div className="container-row">
                <div className="container-item max-one-third sticky">
                    <h2>Scheduled for {dayOfTheWeek}</h2>
                    <ul className="card">
                        {schedules[0] ? (
                            schedules.map((schedule) => {
                                const listItem = (
                                    <li key={schedule.id}>
                                        {findReptileNameById(schedule.reptile_id, reptiles) +
                                            ': ' +
                                            schedule.description}
                                    </li>
                                )

                                switch (dayOfTheWeek) {
                                    case 'Monday':
                                        return schedule.monday && listItem
                                    case 'Tuesday':
                                        return schedule.tuesday && listItem
                                    case 'Wednesday':
                                        return schedule.wednesday && listItem
                                    case 'Thursday':
                                        return schedule.thursday && listItem
                                    case 'Friday':
                                        return schedule.friday && listItem
                                    case 'Saturday':
                                        return schedule.saturday && listItem
                                    case 'Sunday':
                                        return schedule.sunday && listItem
                                    default:
                                        return null
                                }
                            })
                        ) : (
                            <li>No schedules found</li>
                        )}
                    </ul>
                </div>
                <div className="container-item">
                    <h2>Reptiles</h2>
                    <button onClick={() => setIsReptileModalOpen(true)}>Create Reptile</button>
                    <ul className="reptiles-list">
                        {reptiles[0] ? (
                            reptiles.map((reptile, i) => (
                                <li key={i}>
                                    <ReptileCard reptile={reptile} />
                                </li>
                            ))
                        ) : (
                            <li>No reptiles found</li>
                        )}
                    </ul>
                </div>
                <ReptileModal
                    open={isReptileModalOpen}
                    onClose={() => {
                        setIsReptileModalOpen(false)
                        fetchReptiles()
                    }}
                />
            </div>
        </div>
    )
}

export default Dashboard
