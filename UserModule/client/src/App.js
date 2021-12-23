import User from './components/User';
import AddUser from './components/AddUser';
const user = [{
  id: 1,
  username: 'coskunatak',
  name: 'Coşkun',
  surname: 'Atak',
  password: '123456',
  email: 'coskntkk@mail.com',
  role: 'Admin'
},{
  id: 2,
  username: 'shafiqullahturkmen',
  name: 'Shafiqullah',
  surname: 'Türkmen',
  password: '123456',
  email: 'shafiqullah@mail.com',
  role: 'Admin'
},{
  id: 3,
  username: 'nurullahkucuk',
  name: 'Nurullah',
  surname: 'Küçük',
  password: '123456',
  email: 'nurullah@mail.com',
  role: 'Admin'
},{
  id: 4,
  username: 'oguzhanbayram',
  name: 'Oğuzhan',
  surname: 'Bayram',
  password: '123456',
  email: 'oguzhan@mail.com',
  role: 'Admin'
},
]

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body d-flex justify-content-between manage-head">
                <h5 className="card-title text-uppercase mb-0">Manage Users</h5>
                <AddUser />
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
                    {user.map(user => {
                      return <User key={user.id} user={user} />
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
