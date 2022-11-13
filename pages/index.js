import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { increment,decrement } from '../store/stateSlice';
import { increment2,decrement2 } from '../store/stateSlice2';

export default function Home() {
  const dispatch = useDispatch();
  const state1 = useSelector((state) => state.state1);
  const state2 = useSelector((state) => state.state2);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <h1>State1: {state1.count} and State2: {state2.count} </h1>
      <button className="btn" onClick={() => { dispatch(increment(1)) }}>increment</button>
      <button className="btn" onClick={() => { dispatch(decrement(1)) }}>decrement</button>
      <button className="btn" onClick={() => { dispatch(increment2(1)) }}>increment2</button>
      <button className="btn" onClick={() => { dispatch(decrement2(1)) }}>decrement2</button>
    </div>
  )
}
