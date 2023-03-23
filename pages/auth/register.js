import React from "react";
import Head from 'next/head'

// Components
import AuthLayout from "/layouts/AuthLayout";
import RegisterMainSection from "/components/auth/RegisterMainSection";

const Register = () => {
    return (
        <>
            <Head>
                <title>Register | DataTreat</title>
            </Head>
            <AuthLayout>
                <RegisterMainSection />
            </AuthLayout>
        </>

    )
}

export default Register;