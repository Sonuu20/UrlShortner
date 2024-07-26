const sessionIdToUserMap = new Map(); //hasmap

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  return sessionIdToUserMap.get(id);
}

export { setUser, getUser };
