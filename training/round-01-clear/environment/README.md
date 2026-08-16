# B4-2 R01 Environment

## Golden Path

- Node.js LTS / npm
- React 18+
- Vite
- Supabase remote database
- Vercel 또는 Netlify deployment

## Runtime 환경 변수

`reference/.env.example`을 `.env`로 복사한 뒤 로컬에서만 입력합니다.

```text
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

실제 `.env`는 Git에 올리지 않습니다. Frontend에는 Service Role Key를 사용하지 않습니다.

## Supabase

`reference/supabase-schema.sql`을 SQL Editor에서 실행해 `items` 테이블과 학습용 CRUD policy를 만듭니다.

해당 policy는 B4-2 anonymous CRUD 학습용이며 민감 데이터를 다루는 실서비스 보안 설계가 아닙니다.

## 파일 역할

- `setup.sh`: npm dependencies와 `.env` template 준비
- `verify.sh`: route/component/hook/remote CRUD/form/secret pattern 정적검증
- `reset.sh`: `node_modules`, `dist`만 제거하고 `.env`는 보존

## 실제 실행

```bash
cd training/round-01-clear/reference
npm install
cp .env.example .env
# .env local edit
npm run dev
```

실제 Supabase 연결과 배포 URL은 Phase C에서만 PASS 처리합니다.
