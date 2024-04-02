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
    const [type, setType] = useState('feed')
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
    console.log(user_id)

    const createSchedule = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user_id) {
            console.log('No user id')
            console.log(user_id)
            return
        }
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
                    required
                />
                <div>
                    Type:
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="feed"
                            onChange={() => setType('feed')}
                            checked={type === 'feed'}
                        />
                        Feeding
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="clean"
                            onChange={() => setType('clean')}
                            checked={type === 'clean'}
                        />
                        Cleaning
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="type"
                            value="record"
                            onChange={() => setType('record')}
                            checked={type === 'record'}
                        />
                        Record
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => setMonday(!monday)}
                            checked={monday}
                        />
                        Monday
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => setTuesday(!tuesday)}
                            checked={tuesday}
                        />
                        Tuesday
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => setWednesday(!wednesday)}
                            checked={wednesday}
                        />
                        Wednesday
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => setThursday(!thursday)}
                            checked={thursday}
                        />
                        Thursday
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => setFriday(!friday)}
                            checked={friday}
                        />
                        Friday
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => setSaturday(!saturday)}
                            checked={saturday}
                        />
                        Saturday
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            onChange={() => setSunday(!sunday)}
                            checked={sunday}
                        />
                        Sunday
                    </label>
                </div>
                <button type="submit">Add Schedule</button>
            </form>
        </Modal>
    )
}

export default ScheduleModal
