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

  // 서버로부터 데이터 가져오기
  const getData = () => {
    // -- Loading 시작 --
    setLoading(true);
    // 서버에서 게시글  받아오기(최신순)
    const result = getPosts();
    // 받아온 데이터를 State에 할당(저장)
    setData(result);
    // -- Loading 끝 --
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  // Mount(컴포넌트가 생성= 페이지에 접속했을 떄)
  // + 조건들을 만족할 때마다 코드 실행
  useEffect(() => {
    getData();
  }, []);

  //로딩 중일때 보일 화면
  if (loading === true) {
    return <LoadingScreen />;
  }

  //로딩이 끝났을 때 화면에 보여지는 영역
  return (
    <div style={{ flex: 1 }}>
      <h4>불러온 데이터의 개수 : {data.length}개</h4>
      {/*<button onClick={addData}>데이터 1개 추가</button>*/}
      {data.map((post, index) => {
        return (
          <Post
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
