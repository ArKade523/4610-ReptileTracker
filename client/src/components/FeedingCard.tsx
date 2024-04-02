import { parseDate } from '../utils/parseDate'

function FeedingCard({ feeding }: { feeding: Feeding }) {
    return (
        <div className="card">
            <h3>{parseDate(feeding.created_at)}</h3>
            <p>Food Item: {feeding.foodItem}</p>
        </div>
    )
}

export default FeedingCard
