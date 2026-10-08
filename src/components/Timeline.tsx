//Server에서 받아온 데이터들을 실시간으로 최신순

import { useEffect, useState } from "react";
import Post from "./Post";

function Timeline() {
  //데이터의 개수를 넣을 State
  const [data, setData] = useState([0]);

  //버튼 누르면 실행, 데이터 1ㄱ 추가

  const addData = () => {
    setData([...data, data.length]);
  };

  // Mount(컴포넌트가 생성= 페이지에 접속했을 떄)
  // + 조건들을 만족할 때마다 코드 실행
  useEffect(() => {
    addData();
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <h4>불러온 데이터의 개수 : {data.length}개</h4>
      <button onClick={addData}>데이터 1개 추가</button>
      {data.map((d, index) => {
        return <Post name={d.toString()} />;
      })}
    </div>
  );
}

export default Timeline;
