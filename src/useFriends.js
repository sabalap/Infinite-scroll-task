import { useEffect,useState } from "react";
import axios from "axios";
export default function useFriends(id,pageNumber) {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [friends,setFriends] = useState([]);
    const [hasMore,setHasMore] = useState(false);
    useEffect(() => {
        setFriends([]);
    },[id])
    useEffect(() => {
        setLoading(false);
        setError(false);
        axios({
            method:"GET",
            url:`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${pageNumber}/20`,
            params:{id:id,page:pageNumber}
        }).then(res => {
            setFriends(prevFriends => {
                return [...prevFriends,...res.data.list.map(friend => friend)]
            })
            setHasMore(res.data.list.length > 0)
            setLoading(false)
        }).catch(e => {
            setError(true)
        })
    },[pageNumber,id])
    return {loading,error,friends,hasMore}
}