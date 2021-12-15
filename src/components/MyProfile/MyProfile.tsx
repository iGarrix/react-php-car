import React, { FC, useEffect } from "react";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import "./MyProfile.css";

const MyProfile : FC = () => {

    const profile = useTypedSelector(state => state.profile.profile);

    const {fetchProfile} = useActions();
    useEffect(() => {
        try {
            fetchProfile();
        } catch (error) {
            console.log(error);
        }
    }, []);
    return (
       <div>
           {profile ? 
            <div className="block">
                <h1>Мій профіль</h1>
                <h2>Name: {profile.name}</h2>
                <h2>Email: {profile.email}</h2>
            </div>
            :
            <h1>Загрузка</h1>   
        }
       </div>
    );
}

export default MyProfile;