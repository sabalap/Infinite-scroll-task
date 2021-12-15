import React, { useEffect } from 'react';
import { url } from '../utils/constants';
import { useSingleUserContext } from '../context/single_user_context';
import { useParams } from 'react-router-dom';
const SingleUser = () => {
    const {id} = useParams();
    const {
        single_user_loading:loading,
        single_user: user,
        fetchSingleUser
    } = useSingleUserContext();
    useEffect(() => {
        fetchSingleUser(`${url}${id}`)
    },[id])
    const {address,company,email,imageUrl,ip,jobArea,jobDescriptor,jobType,lastName,name,prefix,title} = user;
    if(loading) {
        return <p>Loading...</p>
    }
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
            </div>
        </div>
    );
}

export default SingleUser;
