import { useState } from 'react'
import Modal from './Modal'
import { useApi } from '../hooks/useApi'

function HusbandryRecordModal({
    open,
    reptile_id,
    onClose
}: {
    open: boolean
    reptile_id: number
    onClose: () => void
}) {
    const [length, setLength] = useState(0.0)
    const [weight, setWeight] = useState(0.0)
    const [temperature, setTemperature] = useState(0.0)
    const [humidity, setHumidity] = useState(0.0)
    const api = useApi()

    const createSchedule = async (e: React.FormEvent) => {
        e.preventDefault()

        const husbandryRecord = {
            reptile_id,
            length,
            weight,
            temperature,
            humidity
        }

        await api.post('/husbandry', husbandryRecord)
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <h3>Add Record</h3>
            <form onSubmit={createSchedule}>
                <label>
                    Length (in)
                    <input
                        type="number"
                        min="0"
                        max="50"
                        step="0.5"
                        value={length}
                        placeholder="Length"
                        onChange={(e) => setLength(parseFloat(e.target.value))}
                        required
                    />
                </label>
                <label>
                    Weight (g)
                    <input
                        type="number"
                        min="0"
                        max="5000"
                        step="5"
                        value={weight}
                        placeholder="Weight"
                        onChange={(e) => setWeight(parseFloat(e.target.value))}
                        required
                    />
                </label>
                <label>
                    Temperature (°F)
                    <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.5"
                        value={temperature}
                        placeholder="Temperature"
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        required
                    />
                </label>
                <label>
                    Humidity (%)
                    <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.5"
                        value={humidity}
                        placeholder="Humidity"
                        onChange={(e) => setHumidity(parseFloat(e.target.value))}
                        required
                    />
                </label>

                <button type="submit">Add Record</button>
            </form>
        </Modal>
    )
}

export default HusbandryRecordModal
