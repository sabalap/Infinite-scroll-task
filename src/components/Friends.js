import { Link } from "react-router-dom";
import {useState,useRef,useCallback, useEffect} from "react";
import useFriends from "../useFriends";
import axios from "axios";
import { friendsUrl } from "../utils/constants";
const Friends = ({id}) => {
   const [pageNumber,setPageNumber] = useState(1);
   const {
     friends,
     hasMore,
     loading,
     error
   } = useFriends(id,pageNumber)
   const fetchFriends = async () => {
    const response = await axios.get(friendsUrl(id,pageNumber))
    const page = await response.data.pagination.current;
    setPageNumber(page)
   }
   useEffect(() => {
    fetchFriends();
  },[pageNumber])

   const observer = useRef();
   const lastFriendRef = useCallback(node => {
     if (loading) return
     if (observer.current) observer.current.disconnect()
     observer.current = new IntersectionObserver(entries => {
       if(entries[0].isIntersecting && hasMore) {
         setPageNumber(prevPageNumber => prevPageNumber + 1)
       }
     })
     if (node) observer.current.observe(node)
   },[loading,hasMore])
  return (
    <div className="users">
              <div className="users-list">
                  {friends.map((friend,index) => {
                    if(friends.length === index +1) {
                      return <div ref={lastFriendRef} key={friend.id} className="user">
                        <Link to={`/user/${friend.id}`} className="user-content">
                          <img src={friend.imageUrl} alt="" />
                          <div className="user-content-description">
                              <strong>
                                  {friend.prefix} {friend.name} {friend.lastName}
                              </strong>
                          </div>
                          <div className="user-content-description">{friend.title}</div>
                        </Link>
                      </div>
                    }else{
                      return <div key={friend.id} className="user">
                                <Link to={`/user/${friend.id}`} className="user-content">
                                <img src={friend.imageUrl} alt="" />
                                
                                <div className="user-content-description">
                                  <strong>
                                      {friend.prefix} {friend.name} {friend.lastName}
                                  </strong>
                                </div>
                                <div className="user-content-description">{friend.title}</div>
                              </Link>
                          </div>
                        }
                  })}
              </div>
              {loading && <p>Loading...</p>}
              {error && <p>Error Something Wrong!!!</p>}
            </div>
  );
};
export default Friends;