function runtimeConfig() {
  if (typeof window === 'undefined') return {}
  return window.__APP_CONFIG__ ?? {}
}

function envValue(name) {
  const runtime = runtimeConfig()
  if (runtime[name]) return runtime[name]
  return import.meta.env[name]
}

export function isSupabaseConfigured() {
  return Boolean(envValue('VITE_SUPABASE_URL') && envValue('VITE_SUPABASE_ANON_KEY'))
}

export function getSupabaseConfig() {
  const supabaseUrl = envValue('VITE_SUPABASE_URL')
  const supabaseAnonKey = envValue('VITE_SUPABASE_ANON_KEY')

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase 환경변수가 없습니다. VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 설정하세요.',
    )
  }

  return {
    baseUrl: `${supabaseUrl.replace(/\/$/, '')}/rest/v1`,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
    },
  }
}

export async function supabaseRequest(path, options = {}) {
  const { baseUrl, headers } = getSupabaseConfig()
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers ?? {}),
    },
  })

  if (!response.ok) {
    let detail = `${response.status} ${response.statusText}`
    try {
      const payload = await response.json()
      detail = payload.message || payload.hint || payload.details || detail
    } catch {
      // 응답 본문이 JSON이 아니면 HTTP 상태를 사용한다.
    }
    throw new Error(`Supabase 요청 실패: ${detail}`)
  }

  if (response.status === 204) return null
  const text = await response.text()
  return text ? JSON.parse(text) : null
}
