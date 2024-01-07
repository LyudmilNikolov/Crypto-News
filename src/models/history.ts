export interface History {
    status: string,
    data: {
        change: string,
        history: Array<{ price: string; timestamp: number; }>
    }
}