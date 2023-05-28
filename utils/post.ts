import dayjs from 'dayjs'
export const genPath = (post: Pick<Post, 'date' | 'title'>) => {
    const d = dayjs(post.date).format('/YYYY/MM/DD/');

    return {
        path: d + post.title,
        oldTitle: d + encodeURIComponent(post.title)
    }
}