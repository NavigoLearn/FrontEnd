function useLike(
  postCallback: () => void,
  setStoreCallback: (newLikes: number) => void,
  getLikeCallback: () => number
) {
  const likes = getLikeCallback();
  function incrementLike() {
    postCallback();
    setStoreCallback(likes + 1);
  }
  return [likes, incrementLike];
}
