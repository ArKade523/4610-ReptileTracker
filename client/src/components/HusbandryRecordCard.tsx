import { parseDate } from '../utils/parseDate'

function HusbandryRecordCard({ husbandryRecord }: { husbandryRecord: HusbandryRecord }) {
    return (
        <div className="card">
            <h3>{parseDate(husbandryRecord.created_at)}</h3>
            <p>Weight: {husbandryRecord.weight}</p>
            <p>Length: {husbandryRecord.length}</p>
            <p>Temperature: {husbandryRecord.temperature}</p>
            <p>Humidity: {husbandryRecord.humidity}</p>
        </div>
    )
}

export default HusbandryRecordCard
