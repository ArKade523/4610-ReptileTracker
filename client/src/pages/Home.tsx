// import { Prisma } from '@prisma/client'
import { useEffect, useState } from 'react'
import { requireLoggedIn } from '../hooks/isLoggedIn'

function Home() {
    const [reptiles, setReptiles] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [reptileName, setReptileName] = useState('')
    const [reptileSpecies, setReptileSpecies] = useState('')
    const [reptileSex, setReptileSex] = useState('')

    requireLoggedIn()

    const createReptile = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const name = reptileName
        const species = reptileSpecies
        const sex = reptileSex
        const res = await fetch('/create-reptile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, species, sex, user_id: 1 })
        })
        if (res.ok) {
            const newReptile = await res.json()
            setReptiles([...reptiles, newReptile])
            form.reset()
        } else {
            console.error('Create reptile failed')
        }
    }

    useEffect(() => {
        const fetchReptiles = async () => {
            setLoading(true)
            const res = await fetch('/user/1/reptiles')
            const data = await res.json()
            setReptiles(data)
            setLoading(false)
        }
        fetchReptiles()
    }, [])

    return (
        <div>
            <h1>Home</h1>
            {loading && <div>Loading...</div>}
            <h2>Reptiles</h2>
            <ul>
                {reptiles[0] ? (
                    reptiles.map((reptile, i) => (
                        <li key={i}>
                            {reptile.name}, {reptile.sex}, {reptile.species}
                        </li>
                    ))
                ) : (
                    <li>No reptiles found</li>
                )}
            </ul>
            <h3>Create Reptile</h3>
            <form onSubmit={createReptile}>
                <input
                    type="text"
                    placeholder="Name"
                    value={reptileName}
                    onChange={(e) => setReptileName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Species"
                    value={reptileSpecies}
                    onChange={(e) => setReptileSpecies(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Sex"
                    value={reptileSex}
                    onChange={(e) => setReptileSex(e.target.value)}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default Home
