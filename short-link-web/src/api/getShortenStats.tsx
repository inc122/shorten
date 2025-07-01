/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "@/constants";

export type SortenAnalytics = {
    count: number
    lastVisitedBy: string[]
}

export type SortenAnalyticsResponse = {
    data?: SortenAnalytics
    error?: string 
}

export const getShortenStats = async (url: string): Promise<SortenAnalyticsResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/analytics/${url}`)
        const data = await response.json()
        if (response.status !== 200) return {
            error: data.message ?? 'Unknown error'
        };
        return {
            data: data
        }
    } catch(e: any) {
        return {
            error: e.message ?? 'Unknown error'
        }
    }
}