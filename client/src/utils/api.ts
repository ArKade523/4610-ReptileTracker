import { createContext } from 'react'

export class Api {
    authToken = null as string | null

    constructor(initialToken: string | null) {
        this.authToken = initialToken
    }

    async makeRequest(url: string, method: string, body?: any) {
        const options = {} as any
        if (method === 'POST' || method === 'PUT') {
            options.body = JSON.stringify(body)
        }

        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.authToken ? `Bearer ${this.authToken}` : ''
            },
            ...options
        })

        return res.json()
    }

    get(url: string) {
        return this.makeRequest(url, 'GET')
    }

    post(url: string, body: any) {
        return this.makeRequest(url, 'POST', body)
    }

    put(url: string, body: any) {
        return this.makeRequest(url, 'PUT', body)
    }

    delete(url: string) {
        return this.makeRequest(url, 'DELETE')
    }
}

export const ApiContext = createContext(new Api(null))
