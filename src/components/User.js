import React from 'react';
import PropTypes from 'prop-types';

const User = ({ id, lastName, company, email, phone }) => {
  return (
    <article className="user">
      <h3>{id}</h3>
      <h3 className="user__name">{lastName}</h3>
      {company && <p>{company.title}</p>}
      <p className="user__email">{email}</p>
      <a className="user__phone" href={'tel:+' + phone}>
        {phone}
      </a>
    </article>
  );
};

User.propTypes = {
  id: PropTypes.number,
  lastName: PropTypes.string,
  company: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
};

export default User;
