import React from 'react';
import Head from 'next/head'

// Components
import DashboardLayout from "/layouts/DashboardLayout";
import ShowMissingValueMainSection from "/components/missingValueImputation/ShowMissingValueMainSection";

const MissingValueImputation = () => {
  return (
    <>
      <Head>
        <title>Missing Value Imputation | DataTreat</title>
      </Head>
      <DashboardLayout>
        <ShowMissingValueMainSection />
      </DashboardLayout>
    </>
  )
}

export default MissingValueImputation;