import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";

function User({ user, posted, setPosted }) {
  return (
    <tr>
      <td className="pl-4">
        <h6 className="font-medium mb-0">{user.id}</h6>
      </td>
      <td>
        <h6 className="font-medium mb-0">{user.username}</h6>
      </td>
      <td>
        <h6 className="font-medium mb-0">{user.user_name}</h6>
      </td>
      <td>
        <h6 className="font-medium mb-0">{user.user_surname}</h6>
      </td>
      <td>
        <span className="text">{user.user_email}</span>
      </td>
      <td>
        <span className="text">{user.user_type}</span>
      </td>
      <td>
        <UpdateUser user={user} posted={posted} setPosted={setPosted} />
        <DeleteUser user={user} setPosted={setPosted} />
      </td>
    </tr>
  );
}

export default User;
