import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  //useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //useNavigate 페이지이동 훅
  const Navigate = useNavigate();

  // 서버에 로그인 정보 전달
  const onSubmit = async () => {
    //supabase에 로그인
    const result = await supabase.auth.signUp({
      email,
      password,
    });
    if (result.error) {
      //회원가입 실패
      console.warn("회원가입 실패", result.error.message);
      return;
    }
    //회원가입성공
    //A_1 confirm email(이메일 인증) off
    if (result.data.session) {
      Navigate("/");
    }
    //A-2 confrim email(이메일 인증) on ->
    else {
      Navigate("/login");
    }

    //회원가입 성공 시 홈화면으로 이동
    //회원가입 실패 시, 에러메세지 출력
  };

  //입력한 텍스트(이메일,암호)를 받아오는 함수
  const onChange = (text: string, type: "email" | "password") => {
    if (type == "email") {
      setEmail(text);
    } else if (type == "password") {
      setPassword(text);
    }
  };

  return (
    <div>
      <h1>여기는 회원가입 화면입니다</h1>
      <form>
        <h4>회원가입</h4>
        <p>이메일</p>
        <input
          onChange={(e) => {
            onChange(e.target.value, "email");
          }}
          type="email"
          placeholder="example@example."
        />
        <p>비밀번호</p>
        <input
          onChange={(e) => {
            onChange(e.target.value, "password");
          }}
          type="password"
        />
        <button
          type="submit"
          title="login"
          onClick={() => {
            onSubmit();
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default CreateAccount;
