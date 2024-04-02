import { useState } from 'react'
import Modal from './Modal'
import { useApi } from '../hooks/useApi'

function FeedingModal({
    open,
    reptile_id,
    onClose
}: {
    open: boolean
    reptile_id: number
    onClose: () => void
}) {
    const [foodItem, setFoodItem] = useState('')
    const api = useApi()

    const createSchedule = async (e: React.FormEvent) => {
        e.preventDefault()

        const feeding = {
            reptile_id,
            foodItem
        }

        await api.post('/feedings', feeding)
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <h3>Add Feeding</h3>
            <form onSubmit={createSchedule}>
                <input
                    value={foodItem}
                    placeholder="Food Item"
                    onChange={(e) => setFoodItem(e.target.value)}
                />
                <button type="submit">Add Feeding</button>
            </form>
        </Modal>
    )
}

export default FeedingModal
