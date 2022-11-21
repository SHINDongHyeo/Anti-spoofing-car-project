import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

function fetchfunction () {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  // error를 설정합니다. ""는 boolean상 false입니다.
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // error를 ""(false)로 설정합시다. 
      setError("");
      setLoading(true);
      try {
        const result = await axios(
          URL+`${search}`
        );
        setData(result.data);
        setLoading(false);
      } catch (error) {
        // 에러가 나면 error에 error 메세지를 담습니다.
        // 빈 문자열이 아니므로 true입니다.
        setError(error);
      }
    };
    fetchData();
  }, [URL, search]);
  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>
      
      
      {error && <div>에러가 발생했습니다 : {error}</div>}
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default fetchfunction;