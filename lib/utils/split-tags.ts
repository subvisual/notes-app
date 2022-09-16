const splitTags = (tags: string) => tags.split(/ *[,;] */).filter(Boolean);

export default splitTags;
