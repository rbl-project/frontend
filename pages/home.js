import Head from 'next/head';

// components
import AuthNavbar from '/components/navbar/AuthNavbar/AuthNavbar';
import HomeSection from '/components/home/Home';


const Home = () => {

  return (
    <>
      <Head>
        <title>Home | DataTreat</title>
      </Head>
      <AuthNavbar page="home" />
      <HomeSection />
    </>
  )
}

export default Home