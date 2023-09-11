export function useLike(
  postCallback: () => void,
  setStoreCallback: (newLikes: number) => void,
  getLikeCallback: () => number
) {
  const likes: number = getLikeCallback();
  function incrementLike() {
    postCallback();
    setStoreCallback(likes + 1);
  }
  return { likes, incrementLike };
}
