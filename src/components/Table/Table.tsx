import React from 'react'
import LivePrice from '../LivePrice/LivePrice'
import { Assets } from '@/src/types/assets'

type tableProps = {
    data: Assets[]
}

const Table = ({ data }: tableProps) => {
    return (
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="sticky top-0 bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Rank
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Symbol
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Market Cap
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Volume (24h)
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Change (24h)
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map(asset => {
                    const changePercent = parseFloat(asset.changePercent24Hr)
                    const changeClass =
                        changePercent < 0 ? 'text-red-300' : 'text-green-300'
                    return (
                        <tr
                            key={asset.id}
                            className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <td className="px-6 py-4">{asset.rank}</td>
                            <td className="px-6 py-4">{asset.name}</td>
                            <td className="px-6 py-4">{asset.symbol}</td>
                            <td className="bg-gray-50 px-6 py-4 dark:bg-gray-900">
                                <LivePrice
                                    assetId={asset.id}
                                    initialPrice={asset.priceUsd}
                                />
                            </td>
                            <td className="px-6 py-4">
                                ${parseFloat(asset.marketCapUsd).toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                                ${parseFloat(asset.volumeUsd24Hr).toFixed(2)}
                            </td>
                            <td
                                className={`px-6 py-4 font-semibold ${changeClass}`}
                            >
                                {changePercent.toFixed(2)}%
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table
