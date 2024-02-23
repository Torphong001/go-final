import React, { useEffect, useState } from "react";

function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้จาก localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleUpdateName = (e) => {
    setUser({ ...user, Name: e.target.value });
  };

  const handleUpdatePassword = (e) => {
    setUser({ ...user, Password: e.target.value });
  };

  const handleUpdateUser = () => {
    // ทำการอัปเดตข้อมูลผู้ใช้ใน localStorage
    localStorage.setItem("user", JSON.stringify(user));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <div>
        <div>
          <label>Email:</label>
          <input type="text" value={user.Email} disabled />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={user.Name} onChange={handleUpdateName} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            value={user.Password}
            onChange={handleUpdatePassword}
          />
        </div>
        <button onClick={handleUpdateUser}>Update</button>
      </div>
    </div>
  );
}

export default User;
