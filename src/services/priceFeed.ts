type PriceUpdateCallback = (prices: Record<string, string>) => void

class PriceFeed {
    private ws: WebSocket | null = null
    private callbacks: PriceUpdateCallback[] = []

    connect(assets: string[]) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            this.ws = new WebSocket(
                `wss://ws.coincap.io/prices?assets=${assets.join(',')}`,
            )

            this.ws.onmessage = event => {
                const data = JSON.parse(event.data)
                this.callbacks.forEach(callback => callback(data))
            }

            this.ws.onerror = error => {
                console.error('WebSocket Error:', error)
            }
        }
    }

    subscribe(callback: PriceUpdateCallback) {
        this.callbacks.push(callback)
        return () => {
            this.callbacks = this.callbacks.filter(cb => cb !== callback)
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close()
            this.ws = null
        }
    }
}

const priceFeed = new PriceFeed()
export default priceFeed
