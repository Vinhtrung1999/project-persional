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

const generateId = () => {
  return String(Math.floor(Math.random() * (99999999 - 10000000 + 1)));
}

module.exports = {
  generateId,
  emailValidator,
}