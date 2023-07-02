module.exports.validateRegisterInput = (
  firstName,
  lastName,
  email,
  phone,
  password,
  confirmPassword,
  organization,
  street,
  city,
  state,
  zip
) => {
  const errors = {};
  if (firstName.trim() === "") {
    errors.firstName = "First name must not be empty";
  }

  if (lastName.trim() === "") {
    errors.lastName = "Last name must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (phone.trim() === "") {
    errors.phone = "Phone number must not be empty";
  } else {
    const regEx = /^\d{10}$/;
    if (!phone.match(regEx)) {
      errors.phone = "Phone number must be a valid phone number";
    }
  }

  if (password === "") {
    errors.password = "Password must not empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  if (organization.trim() === "") {
    errors.organization = "Organization must not be empty";
  }

  if (street.trim() === "") {
    errors.street = "Street must not be empty";
  }

  if (city.trim() === "") {
    errors.city = "City must not be empty";
  }

  if (state.trim() === "") {
    errors.state = "State must not be empty";
  }

  if (zip.trim() === "") {
    errors.zip = "Zip code must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};


module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};