import dayjs from 'dayjs'
export const genPath = (post: Post) => {
    const d = dayjs(post.date).format('/YYYY/MM/DD/');
    
    return {
        path: d + post.title,
        oldTitle: d + encodeURIComponent(post.title)
    }
}