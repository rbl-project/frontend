import React from "react";
import Head from 'next/head'

// Components
import AuthLayout from "/layouts/AuthLayout";
import ForgetPasswordMainSection from "/components/auth/ForgetPasswordMainSection";

const ForgetPassword = () => {
    return (
        <>
            <Head>
                <title>Forget Password | DataTreat</title>
            </Head>
            <AuthLayout>
                <ForgetPasswordMainSection />
            </AuthLayout>
        </>

    )
}

export default ForgetPassword;