import Head from 'next/head';
import Image from 'next/image';
import AuthNavbar from '../components/navbar/AuthNavbar/AuthNavbar';

// components
import HomeSection from '../components/home/Home';



const Home = () => {

  return (
    <>
      <Head>
        <title>Home | DataX</title>
      </Head>
      <AuthNavbar page="home" />
      <HomeSection />
    </>
  )
}

export default Home