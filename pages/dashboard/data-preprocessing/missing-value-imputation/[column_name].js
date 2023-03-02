import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'

// Components
import DashboardLayout from "/layouts/DashboardLayout";

const MissingValueImputation = () => {
    
    // Get the column name from the URL
    const router = useRouter()
    const { column_name } = router.query;


  return (
    <>
      <Head>
        <title>Missing Value Imputation - {column_name} | DataX</title>
      </Head>
      <DashboardLayout>
        <div>Missing Value Imputation - {column_name} </div>
      </DashboardLayout>
    </>
  )
}

export default MissingValueImputation;