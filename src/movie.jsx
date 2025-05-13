import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Movie() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  
  useEffect(() => {
    const controller = new AbortController();
    ;(async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts?search='+search,{signal:controller.signal});
        setPosts(res.data);
        console.log(res)
      } catch (err) {
        setError(true);
        if(axios.isCancel(err)){
          console.log('Request cancled',error.message)
          return;
        }
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    })();
    return ()=>{
      controller.abort();
    }
  }, [search]);

  if (error) return <h1>Something went wrong</h1>;
  if (loading) return <h1>Loading...</h1>;

  // const filteredPosts = posts.filter((post) =>
  //   post.title.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <>
      <h1>Posts</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* {filteredPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))} */}
    </>
  );
}
