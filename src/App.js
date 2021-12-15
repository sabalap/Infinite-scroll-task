import React, {useState,useEffect, useRef,useCallback} from "react";
import {getUsers} from "./API";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SingleUser from "./components/SingleUser";
const App = () => {
  const [error,setError] = useState(false);
  const [page,setPage] = useState(1);
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
  const [hasMore,setHasMore] = useState(false);
  const observer = useRef();
  const lastUserRef = useCallback(node => {
    if(loading) return
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    })
    if(node) observer.current.observe(node);
  },[loading,hasMore]);
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const newUsers = await getUsers(page);
      setUsers((prev) => [...prev,...newUsers])
      setHasMore(newUsers.length > 0);
      setLoading(false);
    }
    loadUsers();
  },[page])
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="container">
            <div className="users">
              <div className="users-list">
                  {users.map((user,index) => {
                    if(users.length === index +1) {
                      return <div ref={lastUserRef} key={user.id} className="user">
                        <div className="user-content">
                          <img src={user.imageUrl} alt="" />
                          <div className="user-content-description">
                              <strong>
                                  {user.prefix} {user.name} {user.lastName}
                              </strong>
                          </div>
                          <div className="user-content-description">{user.title}</div>
                        </div>
                      </div>
                    }else{
                      return <div key={user.id} className="user">
                              <div className="user-content">
                                <Link to={`/user/${user.id}`}>
                                <img src={user.imageUrl} alt="" />
                                </Link>
                                <div className="user-content-description">
                                  <strong>
                                      {user.prefix} {user.name} {user.lastName}
                                  </strong>
                                </div>
                                <div className="user-content-description">{user.title}</div>
                              </div>
                          </div>
                        }
                  })}
              </div>
              {loading && <p>Loading...</p>}
              {error && <p>Error Something Wrong!!!</p>}
            </div>
          </div>
        </Route>
        <Route path="/user/:id" exact children={<SingleUser />} />
    </Switch>
    </Router>
  )
}
export default App;