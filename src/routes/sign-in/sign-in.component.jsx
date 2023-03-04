import { useEffect } from 'react'
import { getRedirectResult  } from 'firebase/auth'

import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocumentFromAuth  
} from "../../utils/firebase/firebase.utils"



const  SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)        
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    )
    /* useEffect(() => {
        const fetchRedirectResult = async () => {
            const response = await getRedirectResult(auth)
            console.log(response)
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user)
            }
        }
        fetchRedirectResult()
    },[])

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    
    return (
        <div>
            <h1>Sign In with Google Redirect</h1>
            <button onClick={logGoogleUser} >Sign In With Google Popup</button>
            <button onClick={signInWithGoogleRedirect} >Sign In With Google Redirect</button>
        </div>
    ) */
}

export default SignIn