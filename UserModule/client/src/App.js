import {useState, useEffect} from 'react';
import axios from 'axios';
import User from './components/User';
import AddUser from './components/AddUser';
const apiUrl = 'http://localhost:9000';

function App() {
  const [users, setUsers] = useState([]);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    axios.get(`${apiUrl}/users`)
      .then(res => {
        setUsers(res.data.users);
      })
      .catch(err => {
        console.log(err);
      });
      setPosted(false);
  }, [posted]);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body d-flex justify-content-between manage-head">
                <h5 className="card-title text-uppercase mb-0">Manage Users</h5>
                <AddUser posted={posted} setPosted={setPosted} />
              </div>
              <div className="table-responsive">
                <table className="table no-wrap user-table mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 text-uppercase font-medium pl-4">ID</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Username</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Name</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Surname</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Email</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Role</th>
                      <th scope="col" className="border-0 text-uppercase font-medium">Edit / Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => {
                      return <User key={user.id} user={user} posted={posted} setPosted={setPosted} />
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
