import React from 'react';
import Head from 'next/head'

// Components
import DashboardLayout from "/layouts/DashboardLayout";
import DataCleaningMainSection from '/components/dataCleaning/DataCleaningMainSection';

const DatasetOverview = () => {
  return (
    <>
      <Head>
        <title>Data Cleaning | DataX</title>
      </Head>
      <DashboardLayout>
        <DataCleaningMainSection/>
      </DashboardLayout>
    </>
  )
}

export default DatasetOverview;
