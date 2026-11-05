import { useState } from "react";

function Login() {
  //useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 서버에 로그인 정보 전달
  const onSubmit = () => {};

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
      <h1>여기는 로그인 화면입니다</h1>
      <form>
        <h4>로그인</h4>
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
      </form>
    </div>
  );
}

export default Login;
