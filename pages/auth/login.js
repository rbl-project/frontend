import React from "react";
import Head from 'next/head'

// Components
import AuthLayout from "/layouts/AuthLayout";
import LoginMainSection from "/components/auth/LoginMainSection";

const Login = () => {
    return (
        <>
            <Head>
                <title>Login | DataX</title>
            </Head>
            <AuthLayout>
                <LoginMainSection />
            </AuthLayout>
        </>

    )
}

export default Login;