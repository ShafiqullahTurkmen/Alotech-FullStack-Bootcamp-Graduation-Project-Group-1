import axios from 'axios';
const apiUrl = 'http://localhost:9000';

function DeleteUser({user, setPosted}) {
    function deleteUser(e, id){
        axios.delete(apiUrl + `/users/${id}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
        setPosted(true);
    }

    return(
        <>
        <button type="button" className="btn btn-outline-info btn-circle btn-lg btn-circle" data-bs-toggle="modal" data-bs-target={`#deleteUserModal${user.id}`}>
            <i className="fa fa-trash"></i>
        </button>
        <div className="modal fade" id={`deleteUserModal${user.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Delete User</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    <h6>Are you sure to delete user <strong>{user.username}</strong>?</h6>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={(e) => deleteUser(e, user.id)}>Delete</button>
                </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default DeleteUser;