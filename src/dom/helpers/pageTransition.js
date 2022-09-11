const pageTranstion = (content) => {
  removeContent(content);
};

const removeContent = (content) => {
  content.remove();
};

export { pageTranstion, removeContent };
