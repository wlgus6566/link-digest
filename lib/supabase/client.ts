"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

// 환경 변수에서 Supabase URL과 익명 키 가져오기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabase 클라이언트가 브라우저에서만 생성되도록 함
export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL과 익명 키가 설정되지 않았습니다.");
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      flowType: "pkce", // PKCE 흐름 사용 (보안 강화)
      detectSessionInUrl: true, // URL에서 세션 감지
    },
    global: {
      fetch: fetch, // 기본 fetch 사용
    },
  });
};

// 타임라인 데이터를 서버에 저장
export async function saveTimelineData(digestId: number, timelineData: any[]) {
  try {
    // 로그인 상태 확인
    const supabase = createClient();
    const { data: authData } = await supabase.auth.getSession();

    // 인증 헤더 준비
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // 인증된 사용자인 경우 토큰 추가
    if (authData?.session?.access_token) {
      headers["Authorization"] = `Bearer ${authData.session.access_token}`;
    }

    const response = await fetch("/api/timeline", {
      method: "POST",
      headers,
      body: JSON.stringify({
        digestId,
        timelineData,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("타임라인 데이터 저장 오류:", error);
    return {
      success: false,
      error: "타임라인 데이터 저장 중 오류가 발생했습니다.",
    };
  }
}

// 타임라인 데이터를 서버에서 가져오기
export async function getTimelineData(digestId: number) {
  try {
    // 로그인 상태 확인
    const supabase = createClient();
    const { data: authData } = await supabase.auth.getSession();

    // 인증 헤더 준비
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // 인증된 사용자인 경우 토큰 추가
    if (authData?.session?.access_token) {
      headers["Authorization"] = `Bearer ${authData.session.access_token}`;
    }

    const response = await fetch(`/api/timeline?digestId=${digestId}`, {
      method: "GET",
      headers,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("타임라인 데이터 가져오기 오류:", error);
    return {
      success: false,
      error: "타임라인 데이터를 가져오는 중 오류가 발생했습니다.",
    };
  }
}
