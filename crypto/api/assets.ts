import axiosClient from '../services/axiosClient'
import { Assets } from '../types/assets'

export const getTopFiftyAssets = async (): Promise<Assets[] | null> => {
    try {
        const response = await axiosClient.get('/assets', {
            params: {
                limit: 50,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error fetching assets:', error)
        return null
    }
}
