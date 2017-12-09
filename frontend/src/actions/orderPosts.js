export const ORDER_POSTS = "ORDER_POSTS";

function orderPosts(orderPostsBy) {
    return {
        type: ORDER_POSTS,
        orderPostsBy
    }
}

function orderPostsAsync(orderPostsBy) {
    return dispatch => {
       dispatch(orderPosts(orderPostsBy));
    }
}

export default orderPostsAsync;