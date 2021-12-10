import React, { FC, useEffect } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const MyProfile : FC = () => {

    const user = useTypedSelector(state => state.auth.user);
    useEffect(() => {console.log(user);}, [user]);
    return (
       <div></div>
    );
}

export default MyProfile;