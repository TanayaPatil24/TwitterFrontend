// import axios from "axios";
// import { TWEET_API_END_POINT } from "../utils/constant";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllTweets } from "../redux/tweetSlice";

// const useGetMyTweets = (id) => {
//     const dispatch = useDispatch();
//     const { refresh, isActive } = useSelector(store => store.tweet);
    

//     const fetchMyTweets = async () => {
//         try {
//             const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
//                 withCredentials: true
//             });
//             console.log(res);
//             dispatch(getAllTweets(res.data.tweets));
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     const followingTweetHandler = async () => { 
//         try {
//             axios.defaults.withCredentials = true;
//             const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`);
//             console.log(res);
//             dispatch(getAllTweets(res.data.tweets));
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     useEffect(() => {
//         if(isActive){
//             fetchMyTweets();
//         }else{
//             followingTweetHandler();
//         }
//     }, [id,isActive,refresh]);
// };
// export default useGetMyTweets;

// import axios from "axios";
// import { TWEET_API_END_POINT } from "../utils/constant";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllTweets } from "../redux/tweetSlice";

// const useGetMyTweets = (id) => {
//     const dispatch = useDispatch();
//     const { refresh, isActive } = useSelector(store => store.tweet);
    
//     // Function to fetch user's own tweets
//     const fetchMyTweets = async () => {
//         try {
//             const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
//                 withCredentials: true
//             });
//             dispatch(getAllTweets(res.data.tweets));
//         } catch (error) {
//             console.error("Error fetching my tweets:", error);
//             // Optionally show a user-friendly message or handle retry
//         }
//     }

//     // Function to fetch tweets from accounts user is following
//     const followingTweetHandler = async () => {
//         try {
//             const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`, {
//                 withCredentials: true
//             });
//             dispatch(getAllTweets(res.data.tweets));
//         } catch (error) {
//             console.error("Error fetching following tweets:", error);
//             // Optionally show a user-friendly message or handle retry
//         }
//     }

//     useEffect(() => {
//         // Ensure that the correct API is called based on 'isActive'
//         if (isActive) {
//             fetchMyTweets();
//         } else {
//             followingTweetHandler();
//         }
//     }, [refresh,isActive,fetchMyTweets,followingTweetHandler]);  // Include `id` to handle changes to the user id

// };

// export default useGetMyTweets;


import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
    const dispatch = useDispatch();
    const { refresh, isActive } = useSelector(store => store.tweet);

    // Memoize fetchMyTweets using useCallback
    const fetchMyTweets = useCallback(async () => {
        try {
            const { data } = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
                withCredentials: true
            });
            if (data.tweets) {
                dispatch(getAllTweets(data.tweets));
            }
        } catch (error) {
            console.error("Error fetching my tweets:", error);
        }
    }, [id, dispatch]);  // `id` and `dispatch` are the dependencies

    // Memoize followingTweetHandler using useCallback
    const followingTweetHandler = useCallback(async () => {
        try {
            const { data } = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`, {
                withCredentials: true
            });
            if (data.tweets) {
                dispatch(getAllTweets(data.tweets));
            }
        } catch (error) {
            console.error("Error fetching following tweets:", error);
        }
    }, [id, dispatch]);  // `id` and `dispatch` are the dependencies

    useEffect(() => {
        // Ensure the correct API is called based on the `isActive` flag
        if (isActive) {
            fetchMyTweets();
        } else {
            followingTweetHandler();
        }
    }, [id, isActive, refresh, fetchMyTweets, followingTweetHandler]);  // Include memoized functions in dependency array
};

export default useGetMyTweets;
