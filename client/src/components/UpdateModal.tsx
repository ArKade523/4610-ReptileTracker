import { useState } from 'react'
import Modal from './Modal'
import { useApi } from '../hooks/useApi'
import { useDispatch } from 'react-redux'
import { updateReptilesSlice } from '../slices/reptilesSlice'

function UpdateModal({
    open,
    onClose,
    reptile
}: {
    open: boolean
    onClose: () => void
    reptile: Reptile
}) {
    const [name, setName] = useState(reptile.name)
    const [species, setSpecies] = useState(reptile.species)
    const [sex, setSex] = useState(reptile.sex)
    const api = useApi()
    const dispatch = useDispatch()

    const updateReptile = async (e: React.FormEvent) => {
        e.preventDefault()

        const updatedReptile = {
            name,
            species,
            sex
        }

        await api.post(`/reptiles/update/${reptile.id}`, updatedReptile)
        dispatch(updateReptilesSlice({ updatedReptile }))
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <h3>Update Reptile</h3>
            <form onSubmit={updateReptile}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div>
                    Species:
                    <label>
                        <input
                            type="radio"
                            name="species"
                            value="king_snake"
                            onChange={(e) => setSpecies(e.target.value)}
                            checked={species === 'king_snake'}
                        />
                        King Snake
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="species"
                            value="ball_python"
                            onChange={(e) => setSpecies(e.target.value)}
                            checked={species === 'ball_python'}
                        />
                        Ball Python
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="species"
                            value="corn_snake"
                            onChange={(e) => setSpecies(e.target.value)}
                            checked={species === 'corn_snake'}
                        />
                        Corn Snake
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="species"
                            value="redtail_boa"
                            onChange={(e) => setSpecies(e.target.value)}
                            checked={species === 'redtail_boa'}
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
                            onChange={(e) => setSex(e.target.value)}
                            checked={sex === 'm'}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="f"
                            onChange={(e) => setSex(e.target.value)}
                            checked={sex === 'f'}
                        />
                        Female
                    </label>
                </div>
                <button type="submit">Update</button>
            </form>
        </Modal>
    )
}

export default UpdateModal
