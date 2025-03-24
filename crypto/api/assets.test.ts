import { describe, it, expect, vi, afterEach, Mock } from 'vitest'
import axiosClient from '../services/axiosClient'
import { Assets } from '../types/assets'
import { getTopFiftyAssets } from './assets'

vi.mock('../services/axiosClient')

const mockAxiosClient = axiosClient as unknown as { get: Mock }

afterEach(() => {
    vi.clearAllMocks()
})

describe('getTopFiftyAssets', () => {
    it('should return an array of assets when API call succeeds', async () => {
        const mockAssets: Assets[] = [
            {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'BTC',
                rank: '1',
                supply: '19000000',
                max_supply: '21000000',
                marketCapUsd: '800000000000',
                volumeUsd24Hr: '5000000000',
                priceUsd: '40000',
                changePercent24Hr: ' -2.5',
                vwap24Hr: '39000',
            },
            {
                id: 'ethereum',
                name: 'Ethereum',
                symbol: 'ETH',
                rank: '2',
                supply: '120000000',
                max_supply: '211000000',
                marketCapUsd: '300000000000',
                volumeUsd24Hr: '2000000000',
                priceUsd: '2500',
                changePercent24Hr: '-1.5',
                vwap24Hr: '2400',
            },
        ]

        mockAxiosClient.get.mockResolvedValue({ data: { data: mockAssets } })

        const result = await getTopFiftyAssets()

        expect(result).toEqual(mockAssets)
        expect(axiosClient.get).toHaveBeenCalledWith('/assets', {
            params: { limit: 50 },
        })
    })

    it('should return null when API call fails', async () => {
        mockAxiosClient.get.mockRejectedValue(new Error('Network Error'))

        const result = await getTopFiftyAssets()

        expect(result).toBeNull()
        expect(axiosClient.get).toHaveBeenCalledWith('/assets', {
            params: { limit: 50 },
        })
    })
})
