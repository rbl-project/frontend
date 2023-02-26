import React from 'react';
import Head from 'next/head'

// Components
import DashboardLayout from "/layouts/DashboardLayout";

const MissingValueImputation = () => {
  return (
    <>
      <Head>
        <title>Missing Value Imputation | DataX</title>
      </Head>
      <DashboardLayout>
        <div>Missing Value Imputation</div>
      </DashboardLayout>
    </>
  )
}

export default MissingValueImputation;