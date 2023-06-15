import { userActions } from "../reducers/user-slice";

const userURL = "localhost:9001";

export const registerUserData = (data)=> {
    return async (dispatch) => {
        try {
            const response = await fetch(`${userURL}/register`,{
                method: "POST",
                body: JSON.stringify(data)
            });
            const body = await response.json();
            console.log(body);
            if(!response.ok) {
                dispatch(userActions.setMessage({message:body.message}))
            } else {
                dispatch(userActions.setMessage({message:''}))
                dispatch(userActions.loggedIn({user:body}));
            }
        } catch(error) {
            console.log("error occured");
            dispatch(userActions.setMessage({message:'Server error: Try again later'}));
        }
    }
}