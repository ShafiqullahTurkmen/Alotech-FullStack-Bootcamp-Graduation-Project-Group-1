import {useState, useEffect} from 'react';
import axios from 'axios';
import User from './components/User';
import Loading from './components/Loading';
import configData from './config';

function App() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    // Get user id from cookie
    let userId = 1;
    //
    axios.get(`${configData.apiUrl}/users/${userId}`)
    .then(res => {
      setUser(res.data.user[0]);
      setIsLoading(false);
    })
    .catch(err => {
      setIsError(true);
    });
  }, [posted])

  return (
    <>
    {isLoading && <Loading isError={isError} />}
    {!isLoading && <User user={user} setPosted={setPosted} />}
    </>
  );
}

export default App;
