import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus, faX } from '@fortawesome/free-solid-svg-icons'
import { capitalizeFirst } from '../utils/capitalizeFirst'
import { useApi } from '../hooks/useApi'

function ReptileCard({ reptile }: { reptile: Reptile }) {
    const api = useApi()

    const deleteReptile = () => {
        if (window.confirm('Are you sure you want to delete this reptile?')) {
            api.delete(`/reptiles/del/${reptile.id}`).then(() => {
                window.location.reload()
            })
        }
    }

    return (
        <div className="reptile card">
            <Link to={`/reptile/${reptile.id}`} title={`Learn more about ${reptile.name}`}>
                <h3>{reptile.name}</h3>
                <p>{capitalizeFirst(reptile.species.split('_').map((word) => word + ' '))}</p>
                <p>
                    {reptile.sex.toLowerCase() === 'm' ? (
                        <FontAwesomeIcon icon={faMars} />
                    ) : (
                        <FontAwesomeIcon icon={faVenus} />
                    )}
                </p>
            </Link>
            <button className="bottom-right" onClick={deleteReptile} title="Delete this reptile">
                <FontAwesomeIcon icon={faX} />
            </button>
        </div>
    )
}

export default ReptileCard
