import React, {useContext, useState, useEffect} from 'react';
import { auth } from '../firabase';

/***
 *      Return kısmında ise bu şekilde kullan 
 *       <AuthContext.Provider value= {value}>
             {children}
        </AuthContext.Provider>
 */
export const AuthContext = React.createContext(); 

/**
 * Sayfaya direk böyle çağırısan value içerisindeki değerlere ulaşabilirsin
 */
export function useAuth() {
    return useContext(AuthContext)
}

// sağlayıcı  
/**
 * 
 * <AuthProvider> 
 * Ana componenet şeklinde kullan
 * </AuthProvider>
 */
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);


    function signUp(email, password) {
       return  auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email,password);
    }

    function logout() {
        auth.signOut().then( () => {
            console.log('success');
        }).catch((error) => {
            console.log('error');            
        }) 
    }

    function resetPassword(email) {
        alert(1);
        return auth.sendPasswordResetEmail(email).then(
            () => console.log('basarılı')
        ).catch(
            ()=> console.log('hatalı')
        )
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function updateEmail(email) {
       return currentUser.updateEmail(email)
    }
  

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        
        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signUp,
        login,
        logout,
        resetPassword,
        updatePassword,
        updateEmail
    }



    return (
        <AuthContext.Provider value= {value}>
             {!loading && children}
        </AuthContext.Provider>
    )
}

