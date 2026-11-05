import type { IPost } from "../services/posts";
import styles from "./Post.module.css";

function Post({
  title,
  text,
  createdAt,
  writer_name,
  wirter_thumbnail,
  thumbnail,
}: IPost) {
  return (
    <div className={styles.container}>
      <img className={styles.thumbnail} src={thumbnail} alt="게시글 이미지" />
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{text}</div>
        <div className={styles.footer}>
          <div className={styles.wirter_box}>
            <img
              className={styles.wirter_thumbnail}
              src={wirter_thumbnail}
              alt={`${writer_name} 프로필`}
            />
            <p className={styles.writer_name}>{writer_name}</p>
          </div>
          <p className={styles.createdAt}>{createdAt}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
