import Head from 'next/head';
import Connect from '../components/connect';
import { useStore } from '../lib/store';

export default function Home() {
  const {
    session: { isConnected },
  } = useStore();

  return (
    <div>
      <Head>
        <title>Notes App</title>
        <meta name='description' content='secure notes app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>{isConnected ? <div>User connected</div> : <Connect />}</main>
    </div>
  );
}
