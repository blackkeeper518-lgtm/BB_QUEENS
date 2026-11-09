create table if not exists public."🧿BB_xXx_ORDERCONTROL" (
  upsert_key text not null,
  page_id text not null,
  "threadId" text null,
  customer_id text null,
  page_name text null,
  facebook_name text null,
  customer_name text null,
  phone text null,
  extracted_phone text null,
  order_number text null,
  order_number_display text null,
  order_date text null,
  order_time timestamp with time zone null,
  order_time_display text null,
  time_th text null,
  cod_amount numeric(12, 2) null,
  shipping_carrier text null,
  address_display_packer text null,
  addressclean text null,
  district text null,
  amphoe text null,
  province text null,
  zipcode text null,
  sku text null,
  manus_for_packer text null,
  telegram_copy_text text null,
  order_status text null,
  delivery_state text null,
  delivery_status text null,
  carton_count smallint null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  assigned_agent text null,
  chat_age_hours numeric(5, 1) null,
  is_within_24h boolean null,
  can_send_standard boolean null,
  messaging_tag_required character varying(50) null,
  facebook_tracking_status text null,
  facebook_tracking_sent_at text null,
  message_id text null,
  target_room text null,
  tracking_check text null,
  recipient_id text null,
  recipient_name text null,
  page_message_time_th text null,
  customer_message_time_th text null,
  customer_latest_message text null,
  page_latest_message text null,
  latest_message text null,
  customer_time_val bigint null default 0,
  page_time_val bigint null default 0,
  bb_express_send_route text null default '⚪'::text,
  is_safety_white boolean null default true,
  order_hour integer null default 0,
  send_facebook_route text null,
  sent_at timestamp without time zone null,
  portal_key text null,
  original text null,
  telegram_message text null,
  assigned_hashtag text null,
  conversation_id text null,
  thread_id text null default ''::text,
  provider_message_id text null,
  message_text text null,
  message_raw text null,
  sniper_x_text_clean text null,
  speaker text null,
  is_sent boolean null default false,
  dedupe_key text null,
  conversation_key text null,
  sync_status text null default 'READY_TO_SAVE'::text,
  "time" timestamp with time zone null,
  occurred_at timestamp with time zone null default now(),
  message_time_display text null,
  has_attachment boolean null default false,
  attachment_type text null,
  attachment_url text null,
  attachment_urls jsonb null default '[]'::jsonb,
  attachments_raw jsonb null default '[]'::jsonb,
  sticker_url text null,
  shares_link text null,
  customer_chat_age_hours numeric null,
  is_24h_window_valid boolean null default true,
  chat_page_messages text null,
  id text null,
  parcel_status_emoji text null,
  facebook_tracking_message text null,
  drakside_tracking_message text null,
  fb_tracking_message_for_web text null,
  ds_tracking_message_for_web text null,
  access_token text null,
  bkk_cutoff_route text null,
  "customerMessageTimeTh" text null,
  tracking_number text null,
  chat_link_key text null,
  m text null,
  phone_candidates jsonb null,
  pager_message_time_th text null,
  admin_tracking_number text null,
  admin_tracking_carrier text null,
  admin_tracking_found boolean null,
  admin_tracking_source text null,
  has_tracking_notice boolean null,
  already_sent boolean null,
  "sendFacebookRoute" text null,
  route_source text null,
  signature_status text null,
  constraint "🧿BB_xXx_ORDERCONTROL_pkey" primary key (upsert_key),
  constraint ordercontrol_message_id_key unique (message_id)
) TABLESPACE pg_default;

alter table public."🧿BB_xXx_ORDERCONTROL"
  add column if not exists fb_tracking_message_for_web text,
  add column if not exists ds_tracking_message_for_web text;

-- One-time safe backfill for the web reader; never overwrite an existing web value.
update public."🧿BB_xXx_ORDERCONTROL"
set
  fb_tracking_message_for_web = coalesce(fb_tracking_message_for_web, facebook_tracking_message),
  ds_tracking_message_for_web = coalesce(ds_tracking_message_for_web, drakside_tracking_message)
where fb_tracking_message_for_web is null
   or ds_tracking_message_for_web is null;

create index IF not exists ordercontrol_phone_digits_idx
  on public."🧿BB_xXx_ORDERCONTROL" using btree (
    (regexp_replace(coalesce(phone, ''::text), '[^0-9]'::text, ''::text, 'g'::text))
  ) TABLESPACE pg_default
where
  nullif(btrim(regexp_replace(coalesce(phone, ''::text), '[^0-9]'::text, ''::text, 'g'::text)), ''::text) is not null;


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
