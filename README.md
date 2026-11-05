##프로젝트 만들기
npm create vite


##페이지 전환을 위한 Router 기능 적용
1. router 라이브러리 설치
``` npm install react-router-dom ```
2. router 객체 만들기
```const router= createBrouserRouter([]) ```
3. Layout - Outlet 개념 활용해서 공통 적용되는 레이아웃 생성하기
``` Layout.tsx 참조```

## Supabase - codex 연동하는 방법
1. codex - plugin supabase 연결 및 회원가입 로그인
 - Orgainzation(조직) 생성 > 프로젝트 생성
2. Supabase 대시보드 페이지 중앙 상단에 Connect 버튼 선택
3. FrameWork / use a client libarary 선택
4. FrameWork - react / Variant -Vite 선택
5. 하단에 step 에서 Copy prompt 버튼 클릭핵서 복사 븥
6. 코텍스에 붙여넣기
 -   .env.loca > Supabase 접근 키 노출되지 않도록 저장
 - utils/supabase.ts > 접근 키를 사용해 subabase DB에 생성
7. Create/Read/Write/Delete DB에 활용할 수 있도록 Supa base
 > Codex에게 시킬것임
 > How? Prompt 입력
 > 현재 Web구조에 맞추어서
 > - Supabase 테이블
 > - Supabase 버킷(Storage)
 > - Supabase RLS 보안 정책에 맞는 SQL 작성

 8. supabase.sql 생성된 sql문은 supabase의 대시보드 페이지의 sql Editor에서 입력 복붙후
    Run 버튼 실행하고 success 결과 확인
    > 프로젝트 구조에 맞는 table/buckey/policies 생성
9. 좌측메뉴에서 Authentication(인증설정) 메뉼 이동
10. sign in/providers 메뉴로 진입
11. confirm email 메뉴 비활성화
    > 이메일 인즈 ㅇ절차 하지 않음 (빠른 테스트 위해서)