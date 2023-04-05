import React from 'react';
import Head from 'next/head'

// Components
import DashboardLayout from "/layouts/DashboardLayout";
import DataDiscretizationMainSection from '/components/dataDiscretization/DataDiscretizationMainSection';

const DataDiscretization = () => {
  return (
    <>
      <Head>
        <title>Data Discretization | DataTreat</title>
      </Head>
      <DashboardLayout>
        <DataDiscretizationMainSection/>
      </DashboardLayout>
    </>
  )
}

export default DataDiscretization;
