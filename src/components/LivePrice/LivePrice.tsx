'use client'

import usePriceChange from '../../hooks/usePriceStatus'

type LivePriceProps = {
    assetId: string
    initialPrice: string
}

const LivePrice = ({ assetId, initialPrice }: LivePriceProps) => {
    const { price, flashClass } = usePriceChange(assetId, initialPrice)

    return (
        <span className={`transition-colors duration-300 ${flashClass}`}>
            ${price.toFixed(2)}
        </span>
    )
}

export default LivePrice
