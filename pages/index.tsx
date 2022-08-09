import Head from 'next/head';
import Connect from '../components/connect';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Notes App</title>
        <meta name='description' content='secure notes app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Connect />
      </main>
    </div>
  );
}
