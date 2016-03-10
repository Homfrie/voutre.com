import React from 'react';
import { Link } from 'react-router';

const NotFoundView = () => {
  return (
    <div>
      <h4>
        404 Page Not Found
      </h4>
      <Link to="/"> Go back to homepage </Link>
    </div>
  );
};
//test

export default NotFoundView;
