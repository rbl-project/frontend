import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { increment,decrement } from '../store/stateSlice';
import { fetchPosts } from '../store/stateSlice2';
import { useEffect } from 'react';
import { welcome } from "../store/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  const state1 = useSelector((state) => state.state1);
  const state2 = useSelector((state) => state.state2);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <h1>State1: {state1.count} </h1>
      {state2.posts.map((post) => (
        <h2 key={post.id}>{post.id}: {post.title}</h2>
      ))}
      <button className="btn" onClick={() => { dispatch(increment(1)) }}>increment</button>
      <button className="btn" onClick={() => { dispatch(decrement(1)) }}>decrement</button>
      <button className="btn" onClick={() => { dispatch(fetchPosts()) }}>get_posts</button>
      <button className="btn" onClick={() => { dispatch(welcome()) }}>Welcome</button>
    </div>
  )
}
