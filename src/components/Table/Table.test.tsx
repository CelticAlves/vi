import { render, screen } from '@testing-library/react'
import Table from './Table'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../LivePrice/LivePrice', () => ({
    default: ({
        assetId,
        initialPrice,
    }: {
        assetId: string
        initialPrice: string
    }) => (
        <span data-testid={`live-price-${assetId}`}>
            ${parseFloat(initialPrice).toFixed(2)}
        </span>
    ),
}))

describe('<Table/>', () => {
    const mockData = [
        {
            id: 'bitcoin',
            rank: '1',
            name: 'Bitcoin',
            symbol: 'BTC',
            priceUsd: '45000.00',
            marketCapUsd: '900000000000',
            volumeUsd24Hr: '20000000000',
            changePercent24Hr: '2.5',
            supply: '19000000',
            max_supply: '21000000',
            vwap24Hr: '64500',
        },
        {
            id: 'ethereum',
            rank: '2',
            name: 'Ethereum',
            symbol: 'ETH',
            priceUsd: '3000.00',
            marketCapUsd: '400000000000',
            volumeUsd24Hr: '10000000000',
            changePercent24Hr: '-1.2',
            supply: '19000000',
            max_supply: '21000000',
            vwap24Hr: '64500',
        },
    ]

    it('renders table headers correctly', () => {
        render(<Table data={mockData} />)

        expect(screen.getByText('Rank')).toBeInTheDocument()
        expect(screen.getByText('Name')).toBeInTheDocument()
        expect(screen.getByText('Symbol')).toBeInTheDocument()
        expect(screen.getByText('Price')).toBeInTheDocument()
        expect(screen.getByText('Market Cap')).toBeInTheDocument()
        expect(screen.getByText('Volume (24h)')).toBeInTheDocument()
        expect(screen.getByText('Change (24h)')).toBeInTheDocument()
    })

    it('renders asset data correctly', () => {
        render(<Table data={mockData} />)

        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('Bitcoin')).toBeInTheDocument()
        expect(screen.getByText('BTC')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('Ethereum')).toBeInTheDocument()
        expect(screen.getByText('ETH')).toBeInTheDocument()

        expect(screen.getByTestId('live-price-bitcoin')).toHaveTextContent(
            '$45000.00',
        )
        expect(screen.getByTestId('live-price-ethereum')).toHaveTextContent(
            '$3000.00',
        )

        expect(screen.getByText('$900000000000.00')).toBeInTheDocument()
        expect(screen.getByText('$20000000000.00')).toBeInTheDocument()
        expect(screen.getByText('$400000000000.00')).toBeInTheDocument()
        expect(screen.getByText('$10000000000.00')).toBeInTheDocument()
    })

    it('applies the correct class for price change percentage', () => {
        render(<Table data={mockData} />)

        const btcChange = screen.getByText('2.50%')
        expect(btcChange).toHaveClass('text-green-300')

        const ethChange = screen.getByText('-1.20%')
        expect(ethChange).toHaveClass('text-red-300')
    })
})
