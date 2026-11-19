//Goal : Context(user정보)라는 공공 데이터를 만들어
//         provider(제공도구)를 통해  거의 모든 컴포넌트
//          제공해서 바로 사용할 수 있도록 한다.
//필수개념
// - Context: 어디서든 사용 가능한 데이터
// - Provider : context 전달자
// - receiver : 전달받은 Context를 사용

import type { Session } from "@supabase/supabase-js";
import { createContext, use, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

//Context 데이터 구조
export interface IAuthContext {
  /**로그인 시 supabase가 주는 정보 */
  session: Session | null;
  /**로그인 성공여부 판단에 걸리는 로딩여부 */
  isLoading: boolean;
}
//Context
export const AuthContext = createContext<IAuthContext | null>(null);
//Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  //0.최신상태의 값을 저장할 State
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 1.Context를 최신 상태로 갱신(초기화)
  // -useEffect : Provider 실행 시 1번
  useEffect(() => {
    //  최신상태 값으로 session 갱신
    const init = async () => {
      //1. 현재 새션 정보 받아오기
      const result = await supabase.auth.getSession();
      //2.현재 새션 정보로 state 최신화
      setSession(result.data.session);
      // 3. 로딩 종료
      setIsLoading(false);
    };
    init;

    // +add : 로그인했는지,로그아웃했는지 감시
    //  => 즉시 변경사항 반영
    supabase.auth.onAuthStateChange((event, session) => {
      //변경된 세션을 할당
      setSession(session);
    });
    //'특정시점 '로그인/로그아웃 여부를 감시를 종료
    //특정시점 : provder를 사용하지 않을때 ,페이지를 나갈때
    return () => {
      //useEffect가 실행된 컴포넌트가 더이상 사용되지 않을떄 1번 실행되는코드
      // 감시자 종료
    };
  }, []);
  // 2.Provider Context 반환
  return (
    <AuthContext.Provider value={{ session: session, isLoading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
//Receiver (받아서 사용하기 위해)
// Custom Hook : AuthContext 빠르게 사용
//  ㄴ 작명규칙: useXXXX....
//  ㄴ 사용규칙: 컴포넌트 항상 '최상단' 사용
export const useSession = () => {
  // 1. AuthContext 에 저장한 Session 정보 불러오기
  const value = use(AuthContext);
  // 2. 예외처리) 에러가 발생하면  에러 처리
  if (!value) {
    throw new Error("AuthContext Error");
  }
  // Goal : session 정보를 반환
  return value;
};
