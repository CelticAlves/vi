import React from 'react'
import { getTopFiftyAssets } from '../../api/assets'
import Table from '../../components/Table/Table'

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
