import { useState } from 'react'
import Modal from './Modal'
import { useApi } from '../hooks/useApi'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function ReptileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [reptileName, setReptileName] = useState('')
    const [reptileSpecies, setReptileSpecies] = useState('king_snake')
    const [reptileSex, setReptileSex] = useState('m')
    const api = useApi()
    const user_id = useSelector((state: RootState) => state.auth.user?.id)

    const createReptile = async (e: React.FormEvent) => {
        e.preventDefault()
        const reptile = {
            name: reptileName,
            species: reptileSpecies,
            sex: reptileSex,
            user_id
        }

        await api.post('/reptiles', reptile)
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <h3>Create Reptile</h3>
            <form onSubmit={createReptile}>
                <input
                    type="text"
                    placeholder="Name"
                    value={reptileName}
                    onChange={(e) => setReptileName(e.target.value)}
                    required
                />
                <div>
                    Species:
                    <label>
                        <input
                            type="radio"
                            name="species"
                            value="king_snake"
                            onChange={(e) => setReptileSpecies(e.target.value)}
                            checked={reptileSpecies === 'king_snake'}
                            required
                        />
                        King Snake
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="species"
                            value="ball_python"
                            onChange={(e) => setReptileSpecies(e.target.value)}
                            checked={reptileSpecies === 'ball_python'}
                        />
                        Ball Python
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="species"
                            value="corn_snake"
                            onChange={(e) => setReptileSpecies(e.target.value)}
                            checked={reptileSpecies === 'corn_snake'}
                        />
                        Corn Snake
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="species"
                            value="redtail_boa"
                            onChange={(e) => setReptileSpecies(e.target.value)}
                            checked={reptileSpecies === 'redtail_boa'}
                        />
                        Redtail Boa
                    </label>
                </div>
                <div>
                    Sex:
                    <label>
                        <input
                            type="radio"
                            value="m"
                            onChange={(e) => setReptileSex(e.target.value)}
                            checked={reptileSex === 'm'}
                            required
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="f"
                            onChange={(e) => setReptileSex(e.target.value)}
                            checked={reptileSex === 'f'}
                        />
                        Female
                    </label>
                </div>
                <button type="submit">Create</button>
            </form>
        </Modal>
    )
}

export default ReptileModal
