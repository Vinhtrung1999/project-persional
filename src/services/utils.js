const emailValidator = email => {
  if (!email) {
    return false;
  }

  if (email.length > 256) {
    return false;
  }

  const [partBefore, partAfter] = email.split('@');
  if (!partBefore || !partAfter) {
    return false;
  }

  return true;
}

module.exports = {
  emailValidator,
}