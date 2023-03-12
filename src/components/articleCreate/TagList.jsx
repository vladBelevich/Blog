import { useEffect, useState } from 'react';

export default function TagList({ getItems, tagsCount }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const newTags = getItems(tagsCount);
    setTags(newTags);
    // eslint-disable-next-line
  }, [getItems]);

  return <div>{tags}</div>;
}
