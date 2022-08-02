export const splitTags = (tags: string) => {
  return tags.split(/ *[,;] */).filter((tag) => tag);
};
