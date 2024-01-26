import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <List data={initialFriends} />
        <FormAddFriend />

        <Button>Add form</Button>
      </div>

      <FormSlpitBill />
    </div>
  );
}

function List({ data }) {
  return (
    <ul>
      {data.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}
function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.image} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} € {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you € {Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>Friend name</label>
      <input type="text" />

      <label>Image url</label>
      <input type="text" />
      <Button>Add</Button>
      {""}
    </form>
  );
}

function FormSlpitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split with bill</h2>

      <label>Bill value</label>
      <input type="text" />

      <label>Your expense</label>
      <input type="text" />

      <label>x's expense</label>
      <input type="text" disabled />

      <label>who pay thebill</label>
      <select>
        <option value="user">you</option>
        <option value="friend">friend</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
