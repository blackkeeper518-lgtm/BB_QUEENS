# BB_QUEENS · Chat First Fix

วางทับไฟล์ตาม path เดิมใน repository `BB_QUEENS`:

- `server/meta.ts`
- `server/routers.ts`
- `client/src/lib/canonical.ts`
- `client/src/pages/ChatHub.tsx`

สิ่งที่แก้:

1. พก `portal_key` และ `chat_link_key` จากแถวแชทไปยังปุ่มตอบ
2. ดึง token จาก `page_tokens_vault` โดยลอง `portal_key` ก่อน แล้ว fallback ด้วย `page_id`
3. ส่ง Meta ให้สำเร็จก่อน แล้วบันทึก audit/write-back แบบไม่ขวางการส่ง
4. รองรับการตอบจากห้องเดิมโดยไม่ต้องเลือกเพจซ้ำ
