import { createClient } from "@supabase/supabase-js";

//.env.local 애 들어있는 SupabaseDB URL 불러오기
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
//.env.local 애 들어있는 SupabaseDB 공개키 불러오기
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
// supabasedb와 소통하는 여러 기능을 가진 고객 생성
// DB와 소통하는 여러기능(업로드/다운로드/읽기 쓰기 지우기)
export const supabase = createClient(supabaseUrl, supabaseKey);
