import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parseDate } from '../utils/parseDate'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useApi } from '../hooks/useApi'

function FeedingCard({ feeding }: { feeding: Feeding }) {
    const api = useApi()

    const deleteFeeding = () => {
        if (window.confirm('Are you sure you want to delete this feeding?')) {
            api.delete(`/feedings/del/${feeding.id}`).then(() => {
                window.location.reload()
            })
        }
    }

    return (
        <div className="card">
            <h3>{parseDate(feeding.created_at)}</h3>
            <p>Food Item: {feeding.foodItem}</p>
            <button className="bottom-right" onClick={deleteFeeding} title="Delete this reptile">
                <FontAwesomeIcon icon={faX} />
            </button>
        </div>
    )
}

export default FeedingCard
