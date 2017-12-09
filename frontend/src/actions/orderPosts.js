import sortBy from "sort-by"; //sort-by changes array in place
export const ORDER_POSTS = "ORDER_POSTS";

function orderPosts(orderedPosts) {
    return {
        type: ORDER_POSTS,
        orderedPosts
    }
}

function orderPostsAsync(orderPostsBy) {
    let orderedPosts;
    return (dispatch, getState) => {
        orderedPosts = getState().posts.posts;
        orderedPosts.sort(sortBy("-"+orderPostsBy));
       dispatch(orderPosts(orderedPosts));
    }
}

export default orderPostsAsync;