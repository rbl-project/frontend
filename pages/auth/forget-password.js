import React from "react";
import Head from 'next/head'

import AuthLayout from "../../layouts/AuthLayout";
import ForgetPasswordMainSection from "../../components/auth/ForgetPasswordMainSection";

const ForgetPassword = () => {
    return (
        <>
            <Head>
                <title>Forget Password | DataEngineering</title>
            </Head>
            <AuthLayout>
                <ForgetPasswordMainSection />
            </AuthLayout>
        </>

    )
}

export default ForgetPassword;