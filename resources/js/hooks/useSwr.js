import { objectToParam, swrFetcher } from "@/helpers/api"
import { useMemo } from "react"
import { default as useDefaultSWR } from "swr"

export const useSwr = (
    url = null, 
    filter = {}, 
    refreshOnInterval = false
) => {
    const target = useMemo(() => {
        if (!url) {
            return null
        }

        if (filter === false) {
            return null
        }

        const param = objectToParam(filter)
        return `${url}${param}`
    }, [url, filter])

    return useDefaultSWR(target, swrFetcher, {
        shouldRetryOnError: false,
        refreshInterval: (data) => {
            if (!refreshOnInterval || data?.status?.code != 200) {
                return 0
            }

            return 2000
        }
    })
}