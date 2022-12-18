import React from "react";
import Head from 'next/head'

import AuthLayout from "../../layouts/AuthLayout";
import RegisterMainSection from "../../components/auth/RegisterMainSection";

const Register = () => {
    return (
        <>
            <Head>
                <title>Login | DataEngineering</title>
            </Head>
            <AuthLayout>
                <RegisterMainSection />
            </AuthLayout>
        </>

    )
}

export default Register;