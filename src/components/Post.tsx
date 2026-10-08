import styles from "./Post.module.css";

interface IPost {
  name: string;
  createdAt?: string;
  likes?: number;
}

function Post({ name, createdAt, likes }: IPost) {
  return (
    <div className={styles.container}>
      <img className={styles.thumbnail} />
      <div className={styles.info}>
        <p className={styles.title}>게시글제목</p>
        <p className={styles.text}>게시글내용</p>
        <div className={styles.writer_box}>
          <img className={styles.writer_profile} />
          <p className={styles.writer_name}>작성자</p>
          <p className={styles.createdAt}>생성날짜</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
