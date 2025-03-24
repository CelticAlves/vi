'use client'

import priceFeed from '@/crypto/services/priceFeed'
import { useEffect, useState } from 'react'

type LivePriceProps = {
    assetId: string
    initialPrice: string
}

const LivePrice = ({ assetId, initialPrice }: LivePriceProps) => {
    const [price, setPrice] = useState(initialPrice)
    console.log('Type of price:', typeof price, 'Value:', price)

    useEffect(() => {
        priceFeed.connect([assetId])

        const unsubscribe = priceFeed.subscribe(prices => {
            if (prices[assetId]) {
                setPrice(prices[assetId])
            }
        })

        return () => unsubscribe()
    }, [assetId])

    return <span>${price}</span>
}

export default LivePrice
