import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from "react-router-dom";


export default function (SpecificCompenet, option, adminRoute = null) {

    //null  => 아무나 출입 가능한 페이지
    //true  => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입이 불가능한 페이지

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)
                // 로그인하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        navigate('/login')
                    }
                } else {
                    // 로그인한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        navigate('/')
                    } else {
                        if(option === false)
                            navigate('/')
                    }

                }
            })

        }, [])
        return (
            <SpecificCompenet {...props}/>
        )
    }

    return AuthenticationCheck
}