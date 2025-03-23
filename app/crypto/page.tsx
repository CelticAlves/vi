import { getTopFiftyAssets } from '@/crypto/api/assets'
import Table from '@/crypto/components/Table/Table'
import React from 'react'

export default async function CryptoPage() {
    const assets = await getTopFiftyAssets()

    if (!assets) {
        return <>Sorry, we cant resolve the list at this moment.</>
    }

    return (
        <div>
            <Table data={assets} />
        </div>
    )
}
