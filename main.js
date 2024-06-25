class DataHandler {
  constructor() {
    this.posts = new Map();
  }

  async fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    data.forEach(post => this.posts.set(post.id, post));
    return Promise.resolve(); // Returns a promise to let the consumer code know the operation is done. But this line is't necessary
  }

  listPosts() {
    const postsArray = Array.from(this.posts.values());
    return postsArray.sort((a, b) => a.title.localeCompare(b.title));
  }

  getPost(id) {
      return this.posts.get(id);
  }

  clearPosts() {
      this.posts.clear();
  }
}

(async () => {
  const dataHandler = new DataHandler();
  await dataHandler.fetchPosts();
  console.log(dataHandler.listPosts()); // the whole set of posts sorted alphabetically by titles
  console.log(dataHandler.getPost(5)); // the post object with id 5
  dataHandler.clearPosts(); // deletes all the stored posts
})();
