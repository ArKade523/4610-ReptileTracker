import { capitalizeFirst } from '../utils/capitalizeFirst'

function ScheduleCard({ schedule }: { schedule: Schedule }) {
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
        </div>
    )
}

export default ScheduleCard
