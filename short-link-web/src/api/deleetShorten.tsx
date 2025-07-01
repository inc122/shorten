/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE_URL } from "@/constants";

export type DeleteSortenResponse = {
    success: boolean
}

export const deleteShorten = async (url: string): Promise<DeleteSortenResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/${url}`, {
            method: 'DELETE'
        })

        if (response.status !== 200) return {
            success: false
        };
        return {
            success: true
        }
    } catch(e: any) {
        return {
            success: false
        }
    }
}