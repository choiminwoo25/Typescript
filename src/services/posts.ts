//post(게시글) 관련 헬퍼 함수, 도구, 통신 담당

//게시글의 데이터의 구조
export interface IPost {
  /** 작성자의 닉네임 */
  writer_name: string;
  /** 작성자의 프로필 이미지 URL */
  wirter_thumbnail: string;
  /**게시글 제목 */
  title: string;
  /** 게시글 내용 */
  text: string;
  /** 게시글 작성 시점 */
  createdAt: string;
  /** 게시글 이름 */
  thumbnail: string;
}

// 게시글 생성(upload to server)
//게시글 받아오기( load to server)

export const getPosts = (): IPost[] => {
  // 1. 사전에 login 되어있는 상태로
  // 2. 서버로부터 최신순으로 등록된 post 데이터 받아오기
  const data: IPost[] = dummyPosts;
  // 3. 받아온 데이터를 return (반환, output)
  return data;
};

const dummyPosts: IPost[] = [
  {
    title: "오늘 저녁 최고다",
    text: "오늘 저녁에 시켜먹은 치킨 존맛",
    writer_name: "둘리",
    wirter_thumbnail: "???",
    thumbnail: "???",
    createdAt: "오늘 저녁 7:00",
  },
  {
    title: " 내 생애 일본여행",
    text: "맛있는 오겡끼데스카",
    writer_name: "또치",
    wirter_thumbnail: "???",
    thumbnail: "???",
    createdAt: "오늘 저녁 8:00",
  },
];
