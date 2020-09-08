import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase-config';
import './Home.css';

firebase.initializeApp(firebaseConfig);

const Home = () => {
    const [ user, setUser ] = useState({
        isSignedIn:false,
        name:'', 
        email:'',
        photo:''
    })
    const provider = new firebase.auth.GoogleAuthProvider();

    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then( res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
            isSignedIn: true,
            name:displayName,
            email:email,
            photo:photoURL
        }
        setUser(signedInUser)
           console.log(displayName, email, photoURL)
        })
        .catch(error => {
            console.log(error);
            console.log(error.message);
        })
    }

    const handleSignOut = () => {
       firebase.auth().signOut()
       .then( res => {
           const signedOutUser = {
               isSignedIn: false,
               name:'',
               email:'',
               photo:''
           }
           setUser(signedOutUser)
       })
       .catch(error => {
           console.log(error)
       })
    }

    return (
   
        <div className="button">
            <marquee> <h1 style={{color: "aqua"}}>Welcome to My First FireBase Project!</h1></marquee>
            {
                user.isSignedIn ?  <button className="sign-out" onClick={handleSignOut}>Sign Out</button> :
                <button className="sign-in" onClick={handleSignIn}>Sign In</button>
            }
           
          {
              user.isSignedIn && <div>
                  <h2>Welcome, {user.name}</h2>
                  <h3>Your Email: {user.email}</h3>
                  <img src={user.photo} alt=""/>
              </div>
          }
        </div>
    );
};

export default Home;