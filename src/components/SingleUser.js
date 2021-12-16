import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSingleUserContext } from "../context/single_user_context";
import { singleUserUrl as url } from "../API";
import Friends from "./Friends";
const SingleUser = () => {
    const {id} = useParams();
    const {
        single_user_error:error,
        single_user,
        fetchSingleUser
    } = useSingleUserContext();
    useEffect(() => {
        fetchSingleUser(`${url}${id}`)
    },[id])
    
    if(error) {
        return <p>Error</p>
    }
    const {imageUrl,name,prefix,lastName,title,email,ip,jobArea,jobType,company,address} = single_user;
    return (
        <div className="container">
            <div className="header-wrapper">
                <div className="header">
                    <img src={imageUrl} alt={name} />
                    <fieldset>
                        <legend>Info</legend>
                        <div>
                            <strong>{prefix} {name} {lastName}</strong>
                        </div>
                        <div>
                            <i>{title}</i>
                        </div>
                        <br />
                        <div>
                            <span>Email</span>:&nbsp;
                            {email}
                        </div>
                        <div>
                            <span>Ip Address</span>:&nbsp;
                            {ip}
                        </div>
                        <div>
                            <span>Ip Address</span>:&nbsp;
                            {ip}
                        </div>
                        <div>
                            <span>Job Area</span>:&nbsp;
                            {jobArea}
                        </div>
                        <div>
                            <span>Job Type</span>:&nbsp;
                            {jobType}
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Address</legend>
                        <div>
                            <strong>
                                {company && `${company.name} ${company.suffix}`} 
                            </strong>
                        </div>
                        <div>
                            <span>City</span>:&nbsp;
                            {address && `${address.city}`}
                        </div>
                        <div>
                            <span>Country</span>:&nbsp;
                            {address && `${address.country}`}
                        </div>
                        <div>
                            <span>State</span>:&nbsp;
                            {address && `${address.state}`}
                        </div>
                        <div>
                            <span>Street Address</span>:&nbsp;
                            {address && `${address.streetAddress}`}
                        </div>
                        <div>
                            <span>ZIP</span>:&nbsp;
                            {address && `${address.zipCode}`}
                        </div>
                    </fieldset>
                </div>
                <Friends id={id}/>
            </div>
        </div>
    );
}

export default SingleUser;
