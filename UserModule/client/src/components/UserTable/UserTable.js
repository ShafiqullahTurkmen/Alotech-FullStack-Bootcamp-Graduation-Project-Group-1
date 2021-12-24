import User from "../User";
import { Table } from "react-bootstrap";

function UserTable({ users, posted, setPosted }) {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th scope="col" className="border-0 text-uppercase font-medium pl-4">
            ID
          </th>
          <th scope="col" className="border-0 text-uppercase font-medium">
            Username
          </th>
          <th scope="col" className="border-0 text-uppercase font-medium">
            Name
          </th>
          <th scope="col" className="border-0 text-uppercase font-medium">
            Surname
          </th>
          <th scope="col" className="border-0 text-uppercase font-medium">
            Email
          </th>
          <th scope="col" className="border-0 text-uppercase font-medium">
            Role
          </th>
          <th scope="col" className="border-0 text-uppercase font-medium">
            Edit / Delete
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <User
              key={user.id}
              user={user}
              posted={posted}
              setPosted={setPosted}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

export default UserTable;
