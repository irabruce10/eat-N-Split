import "./index.css";
import { useState } from "react";

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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [newFriend, setNewFriend] = useState(initialFriends);
  const [selectFriend, setSelectFriend] = useState(null);

  function handleToggle() {
    setIsOpen((open) => !open);
  }

  function HandleAddFriend(friend) {
    setNewFriend((friends) => [...friends, friend]);
    setIsOpen(false);
  }

  function handleSelectFriend(friend) {
    // setSelectFriend(friend);
    setSelectFriend((curr) => (curr?.id === friend?.id ? null : friend));
    setIsOpen(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <List
          friend={newFriend}
          onSelectFriend={handleSelectFriend}
          selectFriend={selectFriend}
        />

        {isOpen && <FormAddFriend onAddFriend={HandleAddFriend} />}

        <Button value={isOpen} onClick={handleToggle}>
          {isOpen ? "CLose" : "Add friend"}
        </Button>
      </div>

      {selectFriend && <FormSlpitBill selectFriend={selectFriend} />}
    </div>
  );
}

function List({ friend, onSelectFriend, selectFriend }) {
  return (
    <ul>
      {friend.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          selectFriend={selectFriend}
          onSelectFriend={onSelectFriend}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onSelectFriend, selectFriend }) {
  const isSelected = selectFriend?.id === friend?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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

      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleNewFriend(e) {
    e.preventDefault();
    if (!name || !image) return;
    let id = crypto.randomUUID();

    const newFriend = { id, name, image: `${image}?=${id}`, balance: 0 };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleNewFriend}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Image url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSlpitBill({ selectFriend }) {
  const [bill, setBill] = useState("");
  const [exp, setExp] = useState("");
  const cal = bill && bill - exp;
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  return (
    <form className="form-split-bill">
      <h2>Split bill with {selectFriend.name}</h2>

      <label>Bill value</label>
      <input
        type="text"
        onChange={(e) => setBill(Number(e.target.value))}
        value={bill}
      />

      <label>Your expense</label>
      <input
        type="text"
        value={exp}
        onChange={(e) =>
          setExp(Number(e.target.value) > bill ? exp : Number(e.target.value))
        }
      />

      <label>{selectFriend.name}'s expense</label>
      <input type="text" disabled value={cal} />

      <label>who pay thebill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">you</option>
        <option value="friend">friend</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
