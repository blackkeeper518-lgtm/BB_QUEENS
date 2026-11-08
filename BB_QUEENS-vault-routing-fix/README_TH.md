# Vault routing fix

วางทับ:

- `server/meta.ts`
- `server/supabase.ts`

แพตช์นี้ให้ระบบค้น `page_tokens_vault` ตามลำดับ:

1. Chat
2. Main Order
3. Tracking
4. SUPABASE เดิม

และรองรับชื่อ Render variables ทั้ง `MAIN_ORDER_SUPABASE_*` และ `ORDER_SUPABASE_*`.

Local commit: `540fb5d fix: resolve page tokens across configured supabase lanes`
