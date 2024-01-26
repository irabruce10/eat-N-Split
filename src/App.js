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
      </div>
    </div>
  );
}

function List({ data }) {
  return (
    <ul>
      {data.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
      ;
    </ul>
  );
}
function Friend({ friend }) {
  return (
    <div>
      <ul>
        <li>
          <img src={friend.image} alt={friend.image} />
          <p>{friend.name}</p>
          <span>{friend.balance}</span>
          <button>Select</button>
        </li>
      </ul>
    </div>
  );
}
