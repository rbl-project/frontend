import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'

// Components
import DashboardLayout from "/layouts/DashboardLayout";
import ImputeMissingValueMainSection from '/components/missingValueImputation/ImputeMissingValueMainSection';

const MissingValueImputation = () => {

  // Get the column name from the URL
  const router = useRouter()
  const { column_name } = router.query;

  return (
    <>
      <Head>
        <title>Missing Value Imputation - {column_name} | DataTreat</title>
      </Head>
      <DashboardLayout>
        <ImputeMissingValueMainSection columnName={decodeURIComponent(column_name)} />
      </DashboardLayout>
    </>
  )
}

export default MissingValueImputation;