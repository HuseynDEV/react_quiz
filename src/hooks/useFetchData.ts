import { useEffect, useState } from "react"

export const useFetchData = (url: string) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)
                const resp = await fetch(url)
                if (!resp.ok) {
                    throw new Error("Error")
                }
                const result = await resp.json()
                setData(result)
            }
            catch (err) {
                console.log(err);
                setError(true)
            }
            finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [url])

    return { data, loading, error }

}