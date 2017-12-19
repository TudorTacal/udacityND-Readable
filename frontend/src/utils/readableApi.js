let token = 'Tudor'

const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
  }

export const fetchPosts = () => fetch('/posts',  { headers});
export const fetchCategories = () => fetch('/categories',  { headers});
export const fetchPostPost = (postData) => fetch('/posts', { method: 'POST',  headers, body: JSON.stringify(postData)});
export const fetchPostVote = (id, option) => fetch(`/posts/${id}`, { method: 'POST', headers, body: JSON.stringify(option)});
export const fetchPostComments = (id) => fetch(`/posts/${id}/comments`, { headers});
export const fetchPostUpdate = (id, postData) => fetch(`/posts/${id}`, {method: 'PUT', headers, body: JSON.stringify(postData)});
export const fetchPostDelete = (id) => fetch(`/posts/${id}`, {method: 'DELETE', headers});
export const fetchCommentCreate = (commentData) => fetch('/comments',  { method: 'POST', headers, body: JSON.stringify(commentData)});
export const fetchCommentUpdate = (id, commentData) => fetch(`/comments/${id}`, {method: 'PUT', headers, body: JSON.stringify(commentData)});