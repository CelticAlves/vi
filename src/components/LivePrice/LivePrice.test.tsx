import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, Mock } from 'vitest'

import usePriceChange from '../../hooks/usePriceStatus'
import LivePrice from './LivePrice'

vi.mock('../../hooks/usePriceStatus', () => ({
    default: vi.fn(),
}))

describe('<LivePrice />', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders initial price correctly', () => {
        ;(usePriceChange as Mock).mockReturnValue({
            price: 100,
            flashClass: '',
        })

        render(<LivePrice assetId="bitcoin" initialPrice="100" />)

        expect(screen.getByText('$100.00')).toBeInTheDocument()
    })

    it('updates price when price changes', () => {
        ;(usePriceChange as Mock).mockReturnValue({
            price: 120,
            flashClass: 'text-green-300',
        })

        render(<LivePrice assetId="bitcoin" initialPrice="100" />)

        expect(screen.getByText('$120.00')).toBeInTheDocument()
        expect(screen.getByText('$120.00')).toHaveClass('text-green-300')
    })
})
