const splitTags = (tags: string) =>
  tags.split(/ *[,;\s] */).filter((tag) => tag);

export default splitTags;
