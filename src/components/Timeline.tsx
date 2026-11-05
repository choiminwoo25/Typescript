//Server에서 받아온 데이터들을 실시간으로 최신순

import { useEffect, useState } from "react";
import Post from "./Post";
import { getPosts, type IPost } from "../services/posts";
import LoadingScreen from "../screens/Loading-Screen";

function Timeline() {
  //데이터의 개수를 넣을 State
  const [data, setData] = useState<IPost[]>([]);
  //데이터를 불러오는 동안 로딩 처리를 할 state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mount(컴포넌트가 생성= 페이지에 접속했을 떄)
  // + 조건들을 만족할 때마다 코드 실행
  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      try {
        // 서버에서 게시글  받아오기(최신순)
        const result = await getPosts();
        if (isMounted) {
          setData(result);
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "게시글을 불러오는 중 오류가 발생했습니다.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  //로딩 중일때 보일 화면
  if (loading === true) {
    return <LoadingScreen />;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  //로딩이 끝났을 때 화면에 보여지는 영역
  return (
    <div style={{ flex: 1 }}>
      <h4>불러온 데이터의 개수 : {data.length}개</h4>
      {/*<button onClick={addData}>데이터 1개 추가</button>*/}
      {data.map((post, index) => {
        return (
          <Post
            key={post.id ?? `${post.createdAt}-${post.title}-${index}`}
            title={post.title}
            text={post.text}
            writer_name={post.writer_name}
            createdAt={post.createdAt}
            wirter_thumbnail={post.wirter_thumbnail}
            thumbnail={post.thumbnail}
          />
        );
      })}
    </div>
  );
}

export default Timeline;
