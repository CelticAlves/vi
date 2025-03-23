import { Assets } from '@/crypto/types/assets'
import React from 'react'

type tableProps = {
    data: Assets[]
}

const Table = ({ data }: tableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>Market Cap</th>
                    <th>Volume (24h)</th>
                    <th>Change (24h)</th>
                </tr>
            </thead>
            <tbody>
                {data.map(asset => (
                    <tr key={asset.id}>
                        <td>{asset.rank}</td>
                        <td>{asset.name}</td>
                        <td>{asset.symbol}</td>
                        <td>${asset.priceUsd}</td>
                        <td>${asset.marketCapUsd}</td>
                        <td>${asset.volumeUsd24Hr}</td>
                        <td>{asset.changePercent24Hr}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
