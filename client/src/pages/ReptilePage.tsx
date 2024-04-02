import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import { capitalizeFirst } from '../utils/capitalizeFirst'
import { useApi } from '../hooks/useApi'
import { useEffect, useState } from 'react'
import ScheduleCard from '../components/ScheduleCard'
import { requireLoggedIn } from '../hooks/isLoggedIn'
import FeedingCard from '../components/FeedingCard'
import HusbandryRecordCard from '../components/HusbandryRecordCard'
import ScheduleModal from '../components/ScheduleModal'
import FeedingModal from '../components/FeedingModal'
import HusbandryRecordModal from '../components/HusbandryRecordModal'
import UpdateModal from '../components/UpdateModal'
import { setReptilesSlice } from '../slices/reptilesSlice'

function ReptilePage() {
    requireLoggedIn()
    const { id } = useParams() as { id: string }
    const [reptile, setReptile] = useState<Reptile | undefined>(
        useSelector((state: RootState) =>
            state.reptiles.reptiles.find((reptile) => reptile.id === parseInt(id))
        )
    )
    const [feedings, setFeedings] = useState<Feeding[]>([])
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [husbandryRecords, setHusbandryRecords] = useState<HusbandryRecord[]>([])
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
    const [isFeedingModalOpen, setIsFeedingModalOpen] = useState(false)
    const [isHusbandryModalOpen, setIsHusbandryModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const api = useApi()
    const dispatch = useDispatch()


    const fetchReptiles = async () => {
        const data = await api.get('/reptiles')
        dispatch(setReptilesSlice(data))
        setReptile(data.find((reptile: Reptile) => reptile.id === parseInt(id)))
    }

    const fetchDetails = async () => {
        if (!reptile) {
            fetchReptiles()
        }

        api.get(`/feedings/${parseInt(id)}`).then((feedings) => {
            setFeedings(feedings)
        })
        api.get(`/schedules/reptile/${parseInt(id)}`).then((schedules) => {
            setSchedules(schedules)
        })
        api.get(`/husbandry/${parseInt(id)}`).then((husbandryRecords) => {
            setHusbandryRecords(husbandryRecords)
        })
    }

    useEffect(() => {
        fetchDetails()

        return () => {
            setFeedings([])
            setSchedules([])
            setHusbandryRecords([])
        }
    }, [])

    return (
        <>
            {reptile ? (
                <div className="container-row">
                    <div className="container-item card">
                        <h1>{reptile.name}</h1>
                        <p>
                            {capitalizeFirst(reptile.species.split('_').map((word) => word + ' '))}
                        </p>
                        <p>
                            {reptile.sex.toLowerCase() === 'm' ? (
                                <FontAwesomeIcon icon={faMars} />
                            ) : (
                                <FontAwesomeIcon icon={faVenus} />
                            )}
                        </p>
                        <button onClick={() => setIsUpdateModalOpen(true)}>Update Reptile</button>
                        <UpdateModal
                            open={isUpdateModalOpen}
                            onClose={() => {
                                setIsUpdateModalOpen(false)
                                fetchReptiles()
                            }}
                            reptile={reptile}
                        />
                    </div>
                    <div className="container-item">
                        <h2>Schedules</h2>
                        <button
                            onClick={() => {
                                setIsScheduleModalOpen(true)
                                setIsFeedingModalOpen(false)
                                setIsHusbandryModalOpen(false)
                            }}
                        >
                            Add Schedule
                        </button>
                        {schedules.map((schedule: Schedule) => (
                            <ScheduleCard schedule={schedule} key={schedule.id} />
                        ))}
                    </div>
                    <div className="container-item">
                        <h2>Feedings</h2>
                        <button
                            onClick={() => {
                                setIsFeedingModalOpen(true)
                                setIsHusbandryModalOpen(false)
                                setIsScheduleModalOpen(false)
                            }}
                        >
                            Add Feeding
                        </button>
                        {feedings.map((feeding: Feeding) => (
                            <FeedingCard feeding={feeding} key={feeding.id} />
                        ))}
                    </div>
                    <div className="container-item">
                        <h2>Husbandry</h2>
                        <button
                            onClick={() => {
                                setIsHusbandryModalOpen(true)
                                setIsFeedingModalOpen(false)
                                setIsScheduleModalOpen(false)
                            }}
                        >
                            Add Record
                        </button>
                        {husbandryRecords.map((record: HusbandryRecord) => (
                            <HusbandryRecordCard husbandryRecord={record} key={record.id} />
                        ))}
                    </div>

                    <ScheduleModal
                        open={isScheduleModalOpen}
                        onClose={() => {
                            setIsScheduleModalOpen(false)
                            fetchDetails()
                        }}
                        reptile_id={parseInt(id)}
                    />
                    <FeedingModal
                        open={isFeedingModalOpen}
                        onClose={() => {
                            setIsFeedingModalOpen(false)
                            fetchDetails()
                        }}
                        reptile_id={parseInt(id)}
                    />
                    <HusbandryRecordModal
                        open={isHusbandryModalOpen}
                        onClose={() => {
                            setIsHusbandryModalOpen(false)
                            fetchDetails()
                        }}
                        reptile_id={parseInt(id)}
                    />
                </div>
            ) : (
                <h1>Reptile not found</h1>
            )}
        </>
    )
}

export default ReptilePage
