import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";

function User({user}) {
    return (
        <tr>
            <td className="pl-4">
                <h6 className="font-medium mb-0">{user.id}</h6>
            </td>
            <td>
                <h6 className="font-medium mb-0">{user.username}</h6>
            </td>
            <td>
                <h6 className="font-medium mb-0">{user.name}</h6>
            </td>
            <td>
                <h6 className="font-medium mb-0">{user.surname}</h6>
            </td>
            <td>
                <span className="text">{user.email}</span>
            </td>
            <td>
                <span className="text">{user.role}</span>
            </td>
            <td>
                <UpdateUser user={user}/>
                <DeleteUser user={user}/>
            </td>
        </tr>
    )
};

export default User;