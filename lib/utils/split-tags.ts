const splitTags = (tags: string) => tags.split(/ *[,;\s] */).filter(Boolean);

export default splitTags;
