import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { capitalizeFirst } from '../utils/capitalizeFirst'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useApi } from '../hooks/useApi'

function ScheduleCard({ schedule }: { schedule: Schedule }) {
    const api = useApi()

    const deleteSchedule = () => {
        if (window.confirm('Are you sure you want to delete this schedule?')) {
            api.delete(`/schedules/del/${schedule.id}`).then(() => {
                window.location.reload()
            })
        }
    }

    return (
        <div className="card">
            <h3>{capitalizeFirst(schedule.type + 'ing')}</h3>
            <p>{schedule.description}</p>
            <div>
                {schedule.monday && <p>Monday</p>}
                {schedule.tuesday && <p>Tuesday</p>}
                {schedule.wednesday && <p>Wednesday</p>}
                {schedule.thursday && <p>Thursday</p>}
                {schedule.friday && <p>Friday</p>}
                {schedule.saturday && <p>Saturday</p>}
                {schedule.sunday && <p>Sunday</p>}
                {!schedule.monday &&
                    !schedule.tuesday &&
                    !schedule.wednesday &&
                    !schedule.thursday &&
                    !schedule.friday &&
                    !schedule.saturday &&
                    !schedule.sunday && <p>No days :(</p>}
            </div>
            <button className="bottom-right" onClick={deleteSchedule} title="Delete this reptile">
                <FontAwesomeIcon icon={faX} />
            </button>
        </div>
    )
}

export default ScheduleCard
