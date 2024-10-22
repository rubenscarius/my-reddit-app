import { useEffect, useState } from 'react';
import './App.css'
import Card from './components/card';


function App() {

  const [item, setItem] = useState([]);

  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const userAgent = import.meta.env.VITE_USER_AGENT;

  useEffect(() => {
    async function getAccessToken() {
      const authString = btoa(`${clientId}:${clientSecret}`);
      const response = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'grant_type': 'client_credentials'
        })
      });

      const data = await response.json();
      return data.access_token;
    }

    console.log(getAccessToken());

    async function getSubredditAbout(subreddit) {
      const token = await getAccessToken();

      const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'User-Agent': userAgent
        }
      });

      if (response.ok) {
        const data = await response.json();
        setItem(data.data.children)

      } else {
        console.error('Erro ao buscar os dados do subreddit', response.status);
      }
    }

    getSubredditAbout('programacao');
  }, [])

  setTimeout(() => {
    console.log(item);
    console.log(item[1].data.author);
  }, 1500)

  return (
    <>
      {item.length > 0 ? (
        item.map((element, index) =>
          <>
            <Card
              key={index}
              username={element.data.author}
              title={element.data.title}
              text={element.data.selftext}
              likes={element.data.ups}
              likesRatio={element.data.upvote_ratio}
            />
            <hr />
          </>
        )
      ) : (
        <p>Carregando...</p>
      )}
    </>
  )
}
export default App