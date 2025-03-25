import { useState, useEffect } from 'react'
import priceFeed from '../services/priceFeed'

const usePriceChange = (assetId: string, initialPrice: string) => {
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

    return { price, flashClass }
}

export default usePriceChange
