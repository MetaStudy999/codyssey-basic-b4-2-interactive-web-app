# B4-2 Runtime Evidence Guide

Phase C에서 실제 Supabase/브라우저/배포 결과만 저장합니다.

## 필수 Evidence

1. React/Vite 로컬 기동
2. 5개 이상 route + navigation
3. 잘못된 URL Not Found
4. Supabase `items` table/policy 준비
5. 목록 loading → success
6. 빈 DB EmptyState
7. 실패 상황 ErrorState
8. 등록 form 필수값 validation
9. 등록 submitting UI
10. remote create 후 상세/목록
11. route param 상세
12. 수정 전/후
13. 삭제 전/후
14. 검색 input → 목록 렌더 변화
15. form input → preview 변화
16. custom hook code 위치
17. 8+ reusable component 구조
18. 실제 `.env` Git 비포함/Secret 검사
19. 외부 deployment URL
20. 배포 환경에서 CRUD 전체 흐름

## 권장 이름

```text
01-local-start.txt
02-routes.md
03-not-found.png
04-supabase-table.png
05-loading.png
06-empty.png
07-error.png
08-form-validation.png
09-submitting.png
10-create.png
11-detail.png
12-update.png
13-delete.png
14-state-render.md
15-structure.txt
16-secret-scan.txt
17-deployed-url.md
18-deployed-crud.md
```

## 금지

- 실제 `.env` 전체 내용
- Supabase Service Role Key
- 실제 credential/token
- 실행하지 않은 예상 화면을 실제 Evidence처럼 저장하는 것
