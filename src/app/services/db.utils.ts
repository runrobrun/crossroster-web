export function convertSnaps<T>(results) {
  return results.docs.map(snap => {
    return {
      id: snap.id,
      ...<any> snap.data()
    };
  }) as T[];
}
