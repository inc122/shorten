/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "@/constants";

export type AddSortenResponse = {
    data?: string
    error?: string 
}

export const addShorten = async (originalUrl: string, alias?: string): Promise<AddSortenResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                originalUrl,
                alias
            })
        })
        const data = await response.json()
        if (response.status !== 201) return {
            error: data.message ?? 'Unknown error'
        };
        return {
            data: `${API_BASE_URL}/${data.shortUrl}` 
        }
    } catch(e: any) {
        return {
            error: e.message ?? 'Unknown error'
        }
    }
}