import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parseDate } from '../utils/parseDate'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useApi } from '../hooks/useApi'

function HusbandryRecordCard({ husbandryRecord }: { husbandryRecord: HusbandryRecord }) {
    const api = useApi()

    const deleteRecord = () => {
        if (window.confirm('Are you sure you want to delete this husbandry record?')) {
            api.delete(`/husbandry/del/${husbandryRecord.id}`).then(() => {
                window.location.reload()
            })
        }
    }
    return (
        <div className="card">
            <h3>{parseDate(husbandryRecord.created_at)}</h3>
            <p>Weight: {husbandryRecord.weight}g</p>
            <p>Length: {husbandryRecord.length}in</p>
            <p>Temperature: {husbandryRecord.temperature}°F</p>
            <p>Humidity: {husbandryRecord.humidity}%</p>
            <button className="bottom-right" onClick={deleteRecord} title="Delete this reptile">
                <FontAwesomeIcon icon={faX} />
            </button>
        </div>
    )
}

export default HusbandryRecordCard
