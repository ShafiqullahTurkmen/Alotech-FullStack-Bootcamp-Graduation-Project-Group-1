import {useState} from 'react';
import axios from 'axios';
const apiUrl = 'http://localhost:9000';

function AddUser({posted, setPosted}) {
    const [username, setUsername] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState("user");
    const [password, setPassword] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            username: username,
            user_name: name,
            user_surname: surname,
            user_password: password,
            user_email: email,
            user_type: role,
        };
        console.log(data);
        axios.post(`${apiUrl}/users`, data)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        e.target.reset();
        setPosted(true);
    };

    return (
        <>
        <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle" data-bs-toggle="modal" data-bs-target="#addUserModal">
            <i className="fa fa-plus-circle"></i>
        </button>
        <div className="modal fade" id="addUserModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="createUsername" className="form-label">Username</label>
                                <input type="text" className="form-control" id="createUsername"
                                name="username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="createName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="createName"
                                name="name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="createSurname" className="form-label">Surname</label>
                                <input type="text" className="form-control" id="createSurname"
                                name="surname" onChange={(e) => setSurname(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="createPassword" className="form-label">Password</label>
                                <input type="password" className="form-control" id="createPassword"
                                name="password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="createEmail" className="form-label">Email</label>
                                <input type="email" className="form-control" id="createEmail"
                                name="email" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="createRole" className="form-label">Role</label>
                                <select className="form-select" id="createRole"
                                name="role" onChange={(e) => setRole(e.target.value)}>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
};

export default AddUser;