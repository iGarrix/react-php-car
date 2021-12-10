import React, { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const AutoList : React.FC = () => {

    const {getAuto} = useActions();
    const {loading, auto} = useTypedSelector(state => state.auto);
    useEffect(() => {
        getAuto();
    }, []);
    return (
        <div>
            {loading === false ? 
            <div>
                {auto?.map(item => {
                    return (
                        <div key={item.id}>
                            <h1>{item.name}</h1>
                            <h1>{item.detail}</h1>
                            <hr />
                        </div>
                    )
                })}
            </div>
            :
            <h1>Загрузка</h1>    
        }
        </div>
    )
}

export default AutoList;