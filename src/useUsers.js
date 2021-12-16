import { useEffect,useState } from "react";
import axios from "axios";
export default function useUsers(pageNumber) {
    const [loading,setLoading]= useState(true);
    const [error,setError] = useState(false);
    const [users,setUsers] = useState([]);
    const [hasMore,setHasMore] = useState(false);
    useEffect(() => {
        setUsers([])
    },[])
    useEffect(() => {
        setLoading(true);
        setError(false);
        axios({
            method:"GET",
            url:`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageNumber}/20`,
            params:{page:pageNumber}
        }).then(res => {
            setUsers(prevUsers => {
                return [...prevUsers,...res.data.list.map(user => user)]
            })
            setHasMore(res.data.list.length > 0)
            setLoading(false)
        }).catch(e => {
            setError(true)
        })
    },[pageNumber])
    return {loading,error,users,hasMore}
}
