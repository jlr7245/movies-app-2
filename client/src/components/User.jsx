import React from 'react';

const User = (props) => {
  return (
    <div>
      <h1>Hello {props.user.username}!!</h1>
    </div>
  );
};

export default User;
