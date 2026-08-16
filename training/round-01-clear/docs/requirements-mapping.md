# B4-2 Requirement → Implementation → Verification → Evidence

Source of Truth: `b4-2-mission.pdf` → `b4-2-mission.md` → `b4-2-evaluation.md`.

| ID | 공식 요구사항 | Reference 구현 | 검증 | Phase C Evidence |
|---|---|---|---|---|
| R01 | React SPA | Vite/React `App.jsx` | build/browser | 화면 |
| R02 | 5+ routes | 6 named routes + `*` | route count + direct navigation | route screens |
| R03 | Not Found | `NotFoundPage` | wrong URL | screen |
| R04 | list/detail | `ItemsPage`, `ItemDetailPage` | Supabase remote read | screens |
| R05 | create/update/delete | New/Edit/Detail + `lib/items.js` | remote CRUD | CRUD flow |
| R06 | pages/components/hooks-or-lib | canonical `src` structure | tree/code | tree |
| R07 | 8+ reusable components | 10 components | export count/code review | code/tree |
| R08 | common loading/error/empty | `ui.jsx` states | request scenarios | screens |
| R09 | controlled form | `ItemForm` values state | typing | screen/code |
| R10 | required validation/error | `ItemForm` errors | blank submit | screen |
| R11 | submitting UI | `submitting` prop/button | slow/request pending | screen |
| R12 | custom hook | `useItems`, `useItemDetail` | useEffect/reload | code/explanation |
| R13 | list/detail loading/error state | hooks + common UI | remote states | screens |
| R14 | Supabase/Firebase remote source | Supabase `items.js` | actual project CRUD | DB/UI |
| R15 | route param detail | `useParams` detail/edit | `/items/:id` | screen |
| R16 | state→render 3+ | filter, preview, submit/loading | interaction | screen/video/notes |
| R17 | deploy URL | `vercel.json` plan, NEEDS-RUNTIME | external URL | deployed URL |
| R18 | deployed CRUD | NEEDS-RUNTIME | external create/read/update/delete | external evidence |
| R19 | README local/stack | `reference/README.md` | clean re-run | notes |
| R20 | env/secret | `.env.example`, root gitignore | git status/secret scan | scan |

## 공식 범위 분리

전역 상태, 메모이제이션, 인증은 보너스이므로 필수 CLEAR Gate로 승격하지 않습니다. 반응형 디자인도 선택 사항입니다.

## 상태 원칙

Supabase schema/client 코드가 존재해도 실제 remote CRUD와 deployment는 Phase C 실제 결과가 없으면 PASS가 아닙니다.
