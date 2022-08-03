const splitTags = (tags: string) => tags.split(/ *[,;] */).filter((tag) => tag);

export default splitTags;
