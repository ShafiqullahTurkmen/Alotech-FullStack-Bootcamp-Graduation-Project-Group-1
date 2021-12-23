import {useState} from 'react';

function UpdateUser({user}){
    const [username, setUsername] = useState(user.username);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const [password, setPassword] = useState(user.password);

    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            username,
            name,
            surname,
            email,
            role,
            password,
        };
        console.log(data);
    };

    return(
        <>
        <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle" data-bs-toggle="modal" data-bs-target={`#updateUserModal${user.id}`}>
            <i className="fa fa-edit"></i>
        </button>
        <div className="modal fade" id={`updateUserModal${user.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="modal-header">
                            <h5 className="modal-title">Add User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor={`updateUsername${user.id}`} className="form-label">Username</label>
                                <input type="text" className="form-control" id={`updateUsername${user.id}`}
                                name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`updateName${user.id}`} className="form-label">Name</label>
                                <input type="text" className="form-control" id={`updateName${user.id}`}
                                name="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`updateSurname${user.id}`} className="form-label">Surname</label>
                                <input type="text" className="form-control" id={`updateSurname${user.id}`}
                                name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`updatePassword${user.id}`} className="form-label">Password</label>
                                <input type="password" className="form-control" id={`updatePassword${user.id}`}
                                name="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`updateEmail${user.id}`} className="form-label">Email</label>
                                <input type="email" className="form-control" id={`updateEmail${user.id}`}
                                name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`updateRole${user.id}`} className="form-label" defaultValue={`${role}`}>Role</label>
                                <select className="form-select" defaultValue={role} id={`updateRole${user.id}`}
                                name="role" onChange={(e) => setRole(e.target.value)}>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
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

export default UpdateUser;