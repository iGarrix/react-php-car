import { Dispatch } from "react";
import http from "../../http_common";
import { IProfile, ProfileAction, ProfileActionTypes } from "./types";

export const fetchProfile = () => {
  return async (dispatch: Dispatch<ProfileAction>) => {
    try {
      const jwt = localStorage.getItem("token");
      console.log(jwt);
      if (jwt !== null) {
        
        const config = {
          headers: {
            'Authorization': 'Bearer ' + jwt, 
          }
        }
        const response = await http.get<any>("api/auth/user-profile", config);
        console.log(response);
        dispatch({
          type: ProfileActionTypes.FETCH_PROFILE,
          payload: response.data,
        });
      }
      return Promise.resolve();
    } catch (ex) {
      console.log("Problem fetch myprofile");
      return Promise.reject();
    }
  };
};
