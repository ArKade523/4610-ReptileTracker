import { useState } from 'react'
import Modal from './Modal'
import { useApi } from '../hooks/useApi'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function ScheduleModal({
    open,
    reptile_id,
    onClose
}: {
    open: boolean
    reptile_id: number
    onClose: () => void
}) {
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)
    const [saturday, setSaturday] = useState(false)
    const [sunday, setSunday] = useState(false)
    const api = useApi()
    const user_id = useSelector((state: RootState) => state.auth.user?.id)

    const createSchedule = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user_id) return
        const schedule = {
            user_id,
            reptile_id,
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

        await api.post('/schedules', schedule)
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <h3>Add Schedule</h3>
            <form onSubmit={createSchedule}>
                <input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div>
                    Type:
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="feed"
                            onChange={() => setType('feed')}
                        />
                        Feeding
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="clean"
                            onChange={() => setType('clean')}
                        />
                        Cleaning
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="record"
                            onChange={() => setType('record')}
                        />
                        Record
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" onChange={() => setMonday(!monday)} />
                        Monday
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => setTuesday(!tuesday)} />
                        Tuesday
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => setWednesday(!wednesday)} />
                        Wednesday
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => setThursday(!thursday)} />
                        Thursday
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => setFriday(!friday)} />
                        Friday
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => setSaturday(!saturday)} />
                        Saturday
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => setSunday(!sunday)} />
                        Sunday
                    </label>
                </div>
                <button type="submit">Add Schedule</button>
            </form>
        </Modal>
    )
}

export default ScheduleModal
