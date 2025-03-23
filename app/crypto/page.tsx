import { getTopFiftyAssets } from '@/crypto/api/assets'
import React from 'react'

export default async function CryptoPage() {
    const assets = await getTopFiftyAssets()

    if (!assets) {
        return <>Sorry, we cant resolve the list at this moment.</>
    }

    return <div>{JSON.stringify(assets, null, 2)}</div>
}
