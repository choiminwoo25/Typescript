//post(게시글) 관련 헬퍼 함수, 도구, 통신 담당

import { supabase } from "../utils/supabase";

//게시글의 데이터의 구조
export interface IPost {
  /** 게시글 식별자 */
  id?: number | string;
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

interface PostRow extends Omit<IPost, "createdAt"> {
  created_at: string;
}

// 게시글 생성(upload to server)
//게시글 받아오기( load to server)

export const getPosts = async (): Promise<IPost[]> => {
  const { data, error } = await supabase
    .from("Posts")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`게시글을 불러오지 못했습니다: ${error.message}`);
  }

  return ((data ?? []) as PostRow[]).map(({ created_at, ...post }) => ({
    ...post,
    createdAt: created_at,
  }));
};
