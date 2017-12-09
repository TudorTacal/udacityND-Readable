let token = 'Tudor'



const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
  }

export const fetchPosts = () => fetch('/posts',  { headers});
export const fetchCategories = () => fetch('/categories',  { headers});
export const fetchPostPost = (postData) => fetch('/posts', { method: 'POST',  headers, body: JSON.stringify(postData)});

