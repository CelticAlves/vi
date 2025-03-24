'use client'

import priceFeed from '@/crypto/services/priceFeed'
import { useEffect, useState } from 'react'

type LivePriceProps = {
    assetId: string
    initialPrice: string
}

const LivePrice = ({ assetId, initialPrice }: LivePriceProps) => {
    const [price, setPrice] = useState(parseFloat(initialPrice))
    const [flashClass, setFlashClass] = useState<string>('')

    useEffect(() => {
        priceFeed.connect([assetId])

        const unsubscribe = priceFeed.subscribe(prices => {
            if (prices[assetId]) {
                const newPrice = parseFloat(prices[assetId])

                setPrice(newPrice)

                if (newPrice > price) {
                    setFlashClass('text-green-300')
                } else if (newPrice < price) {
                    setFlashClass('text-red-300')
                }

                setTimeout(() => setFlashClass(''), 500)
            }
        })

        return () => unsubscribe()
    }, [assetId, price])

    return (
        <span className={`transition-colors duration-300 ${flashClass}`}>
            ${price.toFixed(2)}
        </span>
    )
}

export default LivePrice
