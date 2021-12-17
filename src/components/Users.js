import React, {useState,useRef,useCallback} from "react";
import useUsers from "../useUsers";
import { Link } from "react-router-dom";
export default function Users() {
    const [pageNumber,setPageNumber] = useState(1);
    const {
        users,
        hasMore,
        loading,
        error
    } = useUsers(pageNumber)
    const observer = useRef()
    const lastUserRef = useCallback(node => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    }, [loading, hasMore])
    return (
        <div className="users">
              <div className="users-list">
                  {users.map((user,index) => {
                    if(users.length === index +1) {
                      return <div ref={lastUserRef} key={user.id} className="user">
                        <Link to={`/user/${user.id}`} className="user-content">
                          <img src={`${user.imageUrl}?v=${user.id}`} alt="" />
                          <div className="user-content-description">
                              <strong>
                                  {user.prefix} {user.name} {user.lastName}
                              </strong>
                          </div>
                          <div className="user-content-description">{user.title}</div>
                        </Link>
                      </div>
                    }else{
                      return <div key={user.id} className="user">
                                <Link to={`/user/${user.id}`} className="user-content">
                                <img src={`${user.imageUrl}?v=${user.id}`} alt="" />
                                
                                <div className="user-content-description">
                                  <strong>
                                      {user.prefix} {user.name} {user.lastName}
                                  </strong>
                                </div>
                                <div className="user-content-description">{user.title}</div>
                              </Link>
                          </div>
                        }
                  })}
              </div>
              {loading && <p>Loading...</p>}
              {error && <p>Error Something Wrong!!!</p>}
            </div>
    )
}
