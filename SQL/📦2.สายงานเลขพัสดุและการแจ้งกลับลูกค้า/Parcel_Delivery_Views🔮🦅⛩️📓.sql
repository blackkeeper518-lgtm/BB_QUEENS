-- BB STORE ORDERS · Parcel Delivery Views
-- Canonical parcel pipeline
-- Matching contract: parcels.phone_number ↔ ORDERCONTROL.phone only.
-- ORD is the single source of order, message, route, and parcel status data.
-- Dependency: SHADOW -> ROGUE -> VOID -> DEAD
-- Drop in reverse dependency order so the changed column contract can be applied safely.
drop view if exists public."📓DEAD_xXx_NOTE";
drop view if exists public."⛩️VOID_xXx_GATEWAYz";
drop view if exists public."🦅ROGUE_xXx_SHIPPINGz";
drop view if exists public."🔮SHADOW_xXx_RECALL";

-- 1. SHADOW · รับเลขพัสดุและจับคู่ OrderControl ด้วยเบอร์โทรเท่านั้น
create view public."🔮SHADOW_xXx_RECALL" as
select
  p.id,
  p.pickup_date,
  p.tracking_number,
  p.consignee,
  p.phone_number,
  p.address,
  p.cod_amount,
  p.delivery_status,
  p.sent_at,
  ord.portal_key,
  ord.page_name,
  ord.parcel_status_emoji,
  ord.fb_tracking_message_for_web,
  ord.ds_tracking_message_for_web,
  ord.upsert_key
from public.parcels p
join lateral (
  select
    o.portal_key,
    o.page_name,
    o.parcel_status_emoji,
    o.fb_tracking_message_for_web,
    o.ds_tracking_message_for_web,
    o.upsert_key
  from public."🧿BB_xXx_ORDERCONTROL" o
  where nullif(btrim(regexp_replace(coalesce(o.phone, ''), '[^0-9]', '', 'g')), '') is not null
    and nullif(btrim(regexp_replace(coalesce(p.phone_number, ''), '[^0-9]', '', 'g')), '') is not null
    and regexp_replace(coalesce(o.phone, ''), '[^0-9]', '', 'g')
      = regexp_replace(coalesce(p.phone_number, ''), '[^0-9]', '', 'g')
  order by
    o.order_time desc nulls last,
    o.updated_at desc nulls last,
    o.upsert_key
  limit 1
) ord on true
where nullif(btrim(p.tracking_number), '') is not null
  and p.pickup_date::timestamp without time zone >= (now() - interval '2 days')
  and upper(btrim(coalesce(ord.parcel_status_emoji, ''))) not in (
    '🔥SENT', 'SENT', 'SUCCESS', 'COMPLETED', 'DELIVERED', 'SENT_TO_TELEGRAM'
  )
  and upper(btrim(coalesce(p.delivery_status, ''))) not in (
    'SENT', 'DELIVERED', '🔥SENT', 'SENT_TO_TELEGRAM', 'SUCCESS', 'COMPLETED'
  );

-- 2. ROGUE · ประกอบเลขพัสดุกับ ORD โดยตรง
-- SHADOW ได้ upsert_key มาจาก phone match แล้ว; ORD เป็นแหล่งข้อมูลหลักของสายส่ง
create view public."🦅ROGUE_xXx_SHIPPINGz" as
select
  pcl.tracking_number,
  pcl.phone_number as matched_phone,
  coalesce(nullif(btrim(ord.customer_name), ''), nullif(btrim(ord.facebook_name), '')) as recipient_name,
  pcl.address as parcel_address,
  ord.sku,
  ord.cod_amount,
  ord.upsert_key,
  ord.page_id,
  ord."threadId",
  ord.customer_id,
  ord.message_id,
  jsonb_build_object('id', ord.message_id) as m,
  ord.shipping_carrier,
  ord.facebook_tracking_status,
  ord.order_number,
  ord.order_number_display,
  ord.order_time_display,
  pcl.id as parcel_row_id,
  pcl.pickup_date,
  pcl.delivery_status,
  pcl.sent_at,
  ord.page_name,
  ord.portal_key,
  ord.facebook_name,
  ord.customer_name,
  ord.phone,
  ord.extracted_phone,
  ord.order_date,
  ord.order_time,
  ord.time_th,
  ord.address_display_packer,
  ord.addressclean,
  ord.district,
  ord.amphoe,
  ord.province,
  ord.zipcode,
  ord.manus_for_packer,
  ord.telegram_copy_text,
  ord.delivery_state,
  ord.delivery_status as order_delivery_status,
  ord.carton_count,
  ord.created_at,
  ord.updated_at,
  ord.assigned_agent,
  ord.facebook_tracking_sent_at,
  ord.target_room,
  ord.chat_age_hours as chat_age_hours,
  ord.is_within_24h as is_within_24h,
  ord.can_send_standard as can_send_standard,
  ord.messaging_tag_required as messaging_tag_required,
  ord.customer_latest_message as customer_latest_message,
  ord.customer_message_time_th as customer_message_time_th,
  ord.page_latest_message as page_latest_message,
  ord.page_message_time_th as page_message_time_th,
  ord.send_facebook_route as send_facebook_route,
  ord.parcel_status_emoji as parcel_status_emoji,
  ord.facebook_tracking_message as facebook_tracking_message,
  ord.drakside_tracking_message as drakside_tracking_message,
  ord.fb_tracking_message_for_web as fb_tracking_message_for_web,
  ord.ds_tracking_message_for_web as ds_tracking_message_for_web,
  ord.chat_link_key,
  ord.dedupe_key
from public."🔮SHADOW_xXx_RECALL" pcl
join public."🧿BB_xXx_ORDERCONTROL" ord
  on ord.upsert_key = pcl.upsert_key
where nullif(btrim(pcl.tracking_number), '') is not null
  and upper(btrim(coalesce(pcl.delivery_status, ''))) not in (
    'SENT', 'DELIVERED', '🔥SENT', 'SENT_TO_TELEGRAM', 'SUCCESS', 'COMPLETED'
  )
  and upper(btrim(coalesce(ord.facebook_tracking_status, ''))) not in (
    'SENT', 'DELIVERED', '🔥SENT', 'SENT_TO_TELEGRAM', 'SUCCESS', 'COMPLETED'
  )
  and coalesce(ord.page_latest_message, '') not ilike '%แจ้งเลขพัสดุจัดส่ง%'
  and coalesce(ord.page_latest_message, '') not ilike '%เลขพัสดุจะเริ่มเช็คสถานะ%'
  and coalesce(ord.fb_tracking_message_for_web, '') not ilike '%📌📣%'
  and coalesce(ord.ds_tracking_message_for_web, '') not ilike '%📌📣%'
  and coalesce(ord.facebook_tracking_message, '') not ilike '%📌📣%'
  and coalesce(ord.drakside_tracking_message, '') not ilike '%📌📣%';

-- 3. VOID · ประตูสุดท้าย: ROGUE + page token พร้อมให้ n8n ยิง Facebook
create view public."⛩️VOID_xXx_GATEWAYz" as
select
  pulse.*,
  page_map.access_token
from public."🦅ROGUE_xXx_SHIPPINGz" pulse
join public.page_tokens_vault page_map
  on page_map.page_id = pulse.page_id
where nullif(btrim(pulse.tracking_number), '') is not null
  and nullif(btrim(page_map.access_token), '') is not null
  and upper(btrim(coalesce(pulse.facebook_tracking_status, ''))) not in (
    'SENT', 'DELIVERED', '🔥SENT', 'SENT_TO_TELEGRAM', 'SUCCESS', 'COMPLETED'
  )
  and upper(btrim(coalesce(pulse.delivery_status, ''))) not in (
    'SENT', 'DELIVERED', '🔥SENT', 'SENT_TO_TELEGRAM', 'SUCCESS', 'COMPLETED'
  )
  and coalesce(pulse.fb_tracking_message_for_web, '') not ilike '%📌📣%'
  and coalesce(pulse.ds_tracking_message_for_web, '') not ilike '%📌📣%'
  and coalesce(pulse.facebook_tracking_message, '') not ilike '%📌📣%'
  and coalesce(pulse.drakside_tracking_message, '') not ilike '%📌📣%';

-- 4. DEAD · รายการที่ส่งแล้ว โดยจับคู่ข้อมูลออเดอร์ด้วยเบอร์โทรเท่านั้น
create view public."📓DEAD_xXx_NOTE" as
select
  parcel.id as parcel_row_id,
  parcel.tracking_number,
  parcel.consignee as flash_consignee,
  parcel.phone_number as matched_phone,
  parcel.pickup_date,
  parcel.cod_amount as parcel_cod_amount,
  parcel.address as parcel_address,
  parcel.delivery_status,
  parcel.sent_at,
  ord.upsert_key,
  ord.page_id,
  ord."threadId",
  ord.customer_id,
  ord.page_name,
  ord.portal_key,
  ord.facebook_name,
  ord.customer_name,
  ord.phone,
  ord.extracted_phone,
  ord.order_number,
  ord.order_number_display,
  ord.order_date,
  ord.order_time,
  ord.order_time_display,
  ord.time_th,
  ord.cod_amount,
  ord.shipping_carrier,
  ord.address_display_packer,
  ord.addressclean,
  ord.district,
  ord.amphoe,
  ord.province,
  ord.zipcode,
  ord.sku,
  ord.manus_for_packer,
  ord.telegram_copy_text,
  ord.carton_count,
  ord.created_at,
  ord.updated_at,
  ord.assigned_agent,
  ord.chat_age_hours as chat_age_hours,
  ord.is_within_24h as is_within_24h,
  ord.can_send_standard as can_send_standard,
  ord.messaging_tag_required as messaging_tag_required,
  ord.facebook_tracking_status,
  ord.facebook_tracking_sent_at,
  ord.delivery_state,
  ord.delivery_status as order_delivery_status,
  ord.message_id,
  ord.send_facebook_route as send_facebook_route,
  ord.target_room,
  ord.parcel_status_emoji as parcel_status_emoji,
  ord.facebook_tracking_message as facebook_tracking_message,
  ord.drakside_tracking_message as drakside_tracking_message,
  ord.fb_tracking_message_for_web as fb_tracking_message_for_web,
  ord.ds_tracking_message_for_web as ds_tracking_message_for_web,
  ord.customer_message_time_th as customer_message_time_th
from public.parcels parcel
left join lateral (
  select o.*
  from public."🧿BB_xXx_ORDERCONTROL" o
  where nullif(btrim(regexp_replace(coalesce(o.phone, ''), '[^0-9]', '', 'g')), '') is not null
    and nullif(btrim(regexp_replace(coalesce(parcel.phone_number, ''), '[^0-9]', '', 'g')), '') is not null
    and regexp_replace(coalesce(o.phone, ''), '[^0-9]', '', 'g')
      = regexp_replace(coalesce(parcel.phone_number, ''), '[^0-9]', '', 'g')
  order by o.order_time desc nulls last, o.updated_at desc nulls last, o.upsert_key
  limit 1
) ord on true
where nullif(btrim(parcel.tracking_number), '') is not null
  and (
    upper(btrim(coalesce(parcel.delivery_status, ''))) in (
      '🔥SENT', 'SENT', 'SUCCESS', 'COMPLETED', 'DELIVERED', 'SENT_TO_TELEGRAM'
    )
    or upper(btrim(coalesce(ord.facebook_tracking_status, ''))) in (
      '🔥SENT', 'SENT', 'SUCCESS', 'COMPLETED', 'DELIVERED', 'SENT_TO_TELEGRAM'
    )
  );
