import { Input } from "@/components/ui/input";
import { readBlackboxRoom, readCanonicalOrders, readChatThreads, readCloseJobCases, readParcelByTrackingNumber, readParcelMappingQueue } from "@/lib/canonical";
import { useQuery } from "@tanstack/react-query";
import { Copy, ExternalLink, LoaderCircle, PanelRightOpen, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";

type OrderIntelligenceDeckProps = {
  open: boolean;
  location: string;
  surfaceLabel: string;
  onClose: () => void;
};

type SearchResult = {
  orders: Array<Record<string, any>>;
  parcels: Array<Record<string, any>>;
  chats: Array<Record<string, any>>;
  blackbox: Array<Record<string, any>>;
  changeHistory: Array<Record<string, any>>;
};

function trackingNumber(value: unknown) {
  return String(value ?? "").toUpperCase().match(/\bTH[A-Z0-9]{8,20}\b/)?.[0] ?? "";
}

function phoneDigits(value: unknown) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits.startsWith("66") ? `0${digits.slice(2)}` : digits;
}

function rowSearchText(row: Record<string, any>) {
  return Object.values(row).map(value => String(value ?? "")).join(" ").toLowerCase();
}

export default function OrderIntelligenceDeck({ open, location, surfaceLabel, onClose }: OrderIntelligenceDeckProps) {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState("");
  const term = search.trim();
  const copyValue = async (value: unknown, key: string) => {
    const text = String(value ?? "").trim();
    if (!text || text === "—" || text === "ไม่พบเบอร์" || text === "ไม่มีเลขพัสดุ") return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(current => current === key ? "" : current), 1400);
    } catch { /* clipboard permission can be unavailable in an embedded preview */ }
  };
  const pureTracking = trackingNumber(term);
  const searchQuery = useQuery<SearchResult>({
    queryKey: ["order-intelligence-deck-search", term],
    enabled: open && term.length >= 3,
    staleTime: 15_000,
    queryFn: async () => {
      const [orderResult, parcelResult, chatResult, blackboxResult, changeResult] = await Promise.all([
        readCanonicalOrders(term).catch(() => ({ orders: [] })),
        (pureTracking ? readParcelByTrackingNumber(pureTracking) : readParcelMappingQueue("all", 5000)).catch(() => []),
        readChatThreads().catch(() => []),
        readBlackboxRoom(term).catch(() => []),
        readCloseJobCases().catch(() => []),
      ]);
      const normalizedTerm = term.toLowerCase();
      const phoneTerm = phoneDigits(term);
      const parcels = (parcelResult ?? []).filter((row: Record<string, any>) => {
        if (pureTracking) return trackingNumber(row.tracking_number) === pureTracking;
        const haystack = rowSearchText(row);
        return haystack.includes(normalizedTerm) || (phoneTerm.length >= 7 && [row.phone, row.phone_number, row.matched_phone, row.order_phone].some(value => phoneDigits(value).includes(phoneTerm)));
      }).slice(0, 8);
      const chats = (chatResult ?? []).filter((row: Record<string, any>) => {
        const haystack = rowSearchText(row);
        const rowPhone = phoneDigits(row.customerPhone ?? row.customer_phone ?? row.phone);
        return haystack.includes(normalizedTerm) || (phoneTerm.length >= 7 && rowPhone.includes(phoneTerm));
      }).slice(0, 8);
      const blackbox = (blackboxResult ?? []).filter((row: Record<string, any>) => rowSearchText(row).includes(normalizedTerm) || (phoneTerm.length >= 7 && phoneDigits(row.phone).includes(phoneTerm))).slice(0, 8);
      const changeHistory = (changeResult ?? []).filter((row: Record<string, any>) => rowSearchText(row).includes(normalizedTerm) || (phoneTerm.length >= 7 && phoneDigits(row.phone).includes(phoneTerm))).slice(0, 8);
      return { orders: (orderResult?.orders ?? []).slice(0, 8) as Array<Record<string, any>>, parcels, chats, blackbox, changeHistory };
    },
  });
  const result = searchQuery.data;
  const totalMatches = useMemo(() => (result?.orders.length ?? 0) + (result?.parcels.length ?? 0) + (result?.chats.length ?? 0) + (result?.blackbox.length ?? 0) + (result?.changeHistory.length ?? 0), [result]);

  return (
    <>
      {open ? <button type="button" aria-label="ปิดพื้นหลัง Order Intelligence Deck" onClick={onClose} className="fixed inset-0 z-[55] bg-black/25 backdrop-blur-[1px]" /> : null}
      <aside className={`fixed inset-y-0 right-0 z-[60] w-[min(650px,calc(100vw-1rem))] transform border-l border-fuchsia-300/20 bg-[#0b0715]/[.97] shadow-[-24px_0_90px_rgba(130,42,220,.28)] backdrop-blur-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!open}>
        <div className="flex h-full flex-col">
          <div className="border-b border-fuchsia-300/15 bg-gradient-to-r from-fuchsia-500/[0.16] via-violet-500/[0.10] to-cyan-400/[0.10] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[9px] tracking-[0.24em] text-cyan-200/70">NEBULA // ORDER SIGNAL SURFACE</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-fuchsia-50">ORDER INTELLIGENCE DECK</h2>
                <p className="mt-1 text-[11px] leading-5 text-fuchsia-100/50">ค้น DNA ออเดอร์จากทุกห้อง · แสดงผลจากหลายระบบในแผงเดียว</p>
              </div>
              <button type="button" onClick={onClose} aria-label="ปิด ORDER INTELLIGENCE DECK" className="rounded-lg p-2 text-fuchsia-100/55 hover:bg-fuchsia-400/10 hover:text-white"><X className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            <section className="rounded-3xl border border-cyan-300/30 bg-[radial-gradient(circle_at_90%_0%,rgba(103,232,249,.13),transparent_38%),linear-gradient(145deg,rgba(18,11,35,.98),rgba(6,8,18,.98))] p-4 shadow-[0_0_35px_rgba(103,232,249,.08)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-cyan-100/70">UNIVERSAL SEARCH · ORDER DNA</p>
                  <p className="mt-1 text-xs text-fuchsia-100/45">เบอร์โทร · เลขพัสดุ · ชื่อ · เลขออเดอร์ · chat_link_key</p>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-200"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_10px_#6fffe0]" />LIVE</span>
              </div>
              <div className="relative mt-4">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-200 drop-shadow-[0_0_7px_rgba(103,232,249,.7)]" />
                <Input autoFocus={open} value={search} onChange={event => setSearch(event.target.value)} placeholder="ค้นทุกห้องด้วยเบอร์หรือคีย์ออเดอร์…" className="h-12 rounded-2xl border-cyan-300/35 bg-black/35 pl-11 text-sm text-white shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_0_20px_rgba(103,232,249,.08)] placeholder:text-fuchsia-100/30 focus-visible:border-cyan-200/75 focus-visible:ring-cyan-300/20" />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-fuchsia-100/45">
                <span>HERMES · CHAT · PARCEL · BLACKBOX · CHANGE HISTORY</span>
                {term.length < 3 ? <span>พิมพ์อย่างน้อย 3 ตัวอักษร</span> : searchQuery.isFetching ? <span className="inline-flex items-center gap-1.5 text-cyan-200"><LoaderCircle className="h-3 w-3 animate-spin" />กำลังไล่สัญญาณ</span> : <span className="text-emerald-200">พบ {totalMatches} จุดเชื่อม</span>}
              </div>
            </section>

            {term.length >= 3 && !searchQuery.isFetching && result ? <section className="space-y-3">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                {[['ORDER', result.orders.length, 'text-fuchsia-200'], ['PARCEL', result.parcels.length, 'text-cyan-200'], ['CHAT', result.chats.length, 'text-emerald-200'], ['BLACKBOX', result.blackbox.length, 'text-pink-200'], ['CHANGE', result.changeHistory.length, 'text-amber-200']].map(([label, count, tone]) => <div key={String(label)} className="rounded-2xl border border-white/10 bg-black/20 p-3"><p className="text-[9px] tracking-[0.16em] text-fuchsia-100/40">{label}</p><p className={`mt-1 text-xl font-semibold ${tone}`}>{count}</p></div>)}
              </div>
              <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                {result.orders.slice(0, 8).map((order, index) => <article key={`order-${String(order.upsert_key ?? index)}`} className="group flex min-h-[206px] flex-col rounded-2xl border border-fuchsia-300/20 bg-[linear-gradient(135deg,rgba(80,15,77,.18),rgba(8,10,22,.92))] p-3 transition hover:border-fuchsia-200/60 hover:shadow-[0_0_24px_rgba(217,70,239,.14)]">
                  <div className="flex items-start justify-between gap-2 border-b border-fuchsia-200/10 pb-2"><div><p className="font-mono text-[10px] text-fuchsia-200/75">✦ {String(order.order_number_display ?? order.order_number ?? order.upsert_key ?? "ORDER")}</p><p className="mt-1 text-[10px] text-slate-300/55">{String(order.order_time_display ?? order.time_th ?? "ไม่ระบุเวลา")}</p></div><span className="shrink-0 rounded-full border border-orange-300/25 bg-orange-400/10 px-2 py-0.5 text-[9px] text-orange-100">{String(order.delivery_status ?? order.telegram_status ?? order.bb_express_send_route ?? "ตรวจสอบ")}</span></div>
                  <div className="mt-2 grid grid-cols-[1fr_auto] gap-3"><div><p className="text-lg font-semibold text-white">{String(order.cod_amount ?? "—")} บาท</p><p className="mt-1 text-xs font-semibold text-fuchsia-100">{String(order.customer_name ?? order.facebook_name ?? "ไม่ระบุชื่อ")}</p><button type="button" title="ก๊อปเบอร์โทร" onClick={event => { event.preventDefault(); event.stopPropagation(); void copyValue(order.phone ?? order.extracted_phone, `order-phone-${index}`); }} className="mt-1 inline-flex items-center gap-1 rounded-md font-mono text-[10px] text-cyan-200/80 transition hover:bg-cyan-300/10 hover:text-cyan-100"><Copy className="h-3 w-3" /> {copied === `order-phone-${index}` ? "ก๊อปแล้ว" : String(order.phone ?? order.extracted_phone ?? "ไม่พบเบอร์")}</button></div><div className="text-right text-[10px] text-fuchsia-100/55"><p>{String(order.page_name ?? "ไม่ระบุเพจ")}</p><p className="mt-1 text-cyan-200/70">{String(order.shipping_carrier ?? "ไม่ระบุขนส่ง")}</p><p className="mt-1 text-orange-200">{String(order.bb_express_send_route ?? "")}</p></div></div>
                  <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-slate-300/70">📍 {String(order.address_display_packer ?? order.finalAddress ?? order.addressclean ?? order.short_address ?? "ไม่พบที่อยู่")} {order.province ? `· ${String(order.province)}` : ""} {order.zipcode ? String(order.zipcode) : ""}</p><p className="mt-1 line-clamp-1 text-[10px] text-emerald-200/75">📦 {String(order.orderItems ?? order.for_packer_st_display ?? "ไม่พบรายการสินค้า")}</p><div className="mt-auto flex items-center justify-between gap-2 pt-2 text-[9px] text-fuchsia-100/40"><span className="truncate">{String(order.upsert_key ?? "")}</span><div className="flex shrink-0 gap-1.5"><Link href={`/orders?search=${encodeURIComponent(String(order.upsert_key ?? order.order_number ?? term))}`} onClick={onClose} className="rounded-md border border-fuchsia-300/25 px-2 py-1 text-fuchsia-200/80 hover:bg-fuchsia-300/10">เปิดโต๊ะ</Link><Link href={`/chats?search=${encodeURIComponent(String(order.phone ?? order.extracted_phone ?? order.customer_name ?? term))}`} onClick={onClose} className="rounded-md border border-emerald-300/30 bg-emerald-400/[.06] px-2 py-1 text-emerald-200 hover:bg-emerald-300/15">เปิดห้องแชทจริง ↗</Link></div></div>
                </article>)}
              </div>
              <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                {result.parcels.slice(0, 8).map((parcel, index) => <article key={`parcel-${String(parcel.tracking_number ?? index)}`} className="group flex min-h-[206px] flex-col rounded-2xl border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(7,65,80,.18),rgba(8,10,22,.92))] p-3 transition hover:border-cyan-200/60 hover:shadow-[0_0_24px_rgba(103,232,249,.14)]">
                  <div className="flex items-start justify-between gap-2 border-b border-cyan-200/10 pb-2"><div><button type="button" title="ก๊อปเลขพัสดุ" onClick={event => { event.preventDefault(); event.stopPropagation(); void copyValue(parcel.tracking_number, `parcel-tracking-${index}`); }} className="inline-flex items-center gap-1 rounded-md font-mono text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300/10 hover:text-white"><Copy className="h-3 w-3" /> {copied === `parcel-tracking-${index}` ? "ก๊อปแล้ว" : (trackingNumber(parcel.tracking_number) || String(parcel.tracking_number ?? "ไม่มีเลขพัสดุ"))}</button><p className="mt-1 text-[10px] text-slate-300/55">{String(parcel.order_time_display ?? parcel.sent_at ?? parcel.created_at ?? "ไม่ระบุเวลา")}</p></div><span className="shrink-0 rounded-full border border-orange-300/25 bg-orange-400/10 px-2 py-0.5 text-[9px] text-orange-100">{String(parcel.delivery_status ?? parcel.telegram_status ?? (parcel.telegram_sent ? "SENT" : "รอตรวจ"))}</span></div>
                  <div className="mt-2 grid grid-cols-[1fr_auto] gap-3"><div><p className="text-xs font-semibold text-white">{String(parcel.recipient_name ?? parcel.customer_name ?? parcel.facebook_name ?? "ไม่ระบุชื่อ")}</p><button type="button" title="ก๊อปเบอร์โทร" onClick={event => { event.preventDefault(); event.stopPropagation(); void copyValue(parcel.phone ?? parcel.extracted_phone, `parcel-phone-${index}`); }} className="mt-1 inline-flex items-center gap-1 rounded-md font-mono text-[10px] text-cyan-200/80 transition hover:bg-cyan-300/10 hover:text-cyan-100"><Copy className="h-3 w-3" /> {copied === `parcel-phone-${index}` ? "ก๊อปแล้ว" : String(parcel.phone ?? parcel.extracted_phone ?? "ไม่พบเบอร์")}</button><p className="mt-1 text-sm font-semibold text-amber-200">ยอดเก็บปลายทาง: {String(parcel.cod_amount ?? "—")} บาท</p></div><div className="text-right text-[10px] text-cyan-100/55"><p>{String(parcel.page_name ?? "ไม่ระบุเพจ")}</p><p className="mt-1 text-emerald-200/75">{String(parcel.shipping_carrier ?? "FLASH EXPRESS")}</p></div></div>
                  <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-slate-300/70">📍 {String(parcel.full_address ?? parcel.address_display_packer ?? parcel.address ?? "ไม่พบที่อยู่")} {parcel.province ? `· ${String(parcel.province)}` : ""} {parcel.zipcode ? String(parcel.zipcode) : ""}</p><p className="mt-1 line-clamp-1 text-[10px] text-emerald-200/75">📦 {String(parcel.telegram_product_display ?? parcel.final_display_for_packer ?? parcel.sku ?? "ไม่พบรายการสินค้า")}</p><div className="mt-auto flex items-center justify-between gap-2 pt-2 text-[9px] text-cyan-100/40"><span>PARCEL / ROOM MAP</span><div className="flex shrink-0 gap-1.5"><Link href={`/orders?search=${encodeURIComponent(String(parcel.tracking_number ?? term))}`} onClick={onClose} className="rounded-md border border-cyan-300/25 px-2 py-1 text-cyan-200/80 hover:bg-cyan-300/10">เปิด direct</Link><Link href={`/chats?search=${encodeURIComponent(String(parcel.phone ?? parcel.extracted_phone ?? parcel.customer_name ?? parcel.tracking_number ?? term))}`} onClick={onClose} className="rounded-md border border-emerald-300/30 bg-emerald-400/[.06] px-2 py-1 text-emerald-200 hover:bg-emerald-300/15">เปิดห้องแชทจริง ↗</Link></div></div>
                </article>)}
              </div>
              {result.chats.slice(0, 4).map((chat, index) => <Link key={`chat-${String(chat.key ?? index)}`} href={`/chats?search=${encodeURIComponent(String(chat.customerName ?? chat.customerPhone ?? chat.chatLinkKey ?? term))}`} onClick={onClose} className="block rounded-2xl border border-emerald-300/15 bg-emerald-400/[.04] p-3 transition hover:border-emerald-200/50 hover:bg-emerald-400/[.09]"><div className="flex items-center justify-between gap-3"><span className="text-xs text-emerald-100">{String(chat.customerName ?? "ไม่ระบุชื่อลูกค้า")}</span><span className="text-[10px] text-emerald-100/55">CHAT · เปิดห้อง</span></div><p className="mt-1 truncate font-mono text-[9px] text-emerald-100/45">{String(chat.chatLinkKey ?? chat.key ?? "")}</p><p className="mt-1 line-clamp-2 text-[10px] text-slate-300/75">{String(chat.preview ?? "ไม่มีข้อความตัวอย่าง")}</p></Link>)}
              {term.length >= 3 && totalMatches > 0 ? <div className="rounded-2xl border border-emerald-300/25 bg-emerald-400/[.05] p-3"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-semibold text-emerald-100">CHAT LINK · ห้องแชทจริง</p><p className="mt-1 text-[10px] text-emerald-100/55">เปิดห้องแชทจริงได้ตลอด แม้ผลลัพธ์จะมาจาก ORDER, PARCEL หรือ BLACKBOX</p></div><Link href={`/chats?search=${encodeURIComponent(term)}`} onClick={onClose} className="shrink-0 rounded-lg border border-emerald-200/40 bg-emerald-300/10 px-3 py-2 text-[10px] font-semibold text-emerald-100 hover:bg-emerald-300/20">เปิดห้องแชทจริง ↗</Link></div></div> : null}
              {result.blackbox.slice(0, 4).map((row, index) => <Link key={`blackbox-${String(row.id ?? index)}`} href={`/blackbox?search=${encodeURIComponent(term)}`} onClick={onClose} className="block rounded-2xl border border-pink-300/15 bg-pink-400/[.04] p-3 transition hover:border-pink-200/50 hover:bg-pink-400/[.09]"><div className="flex items-center justify-between gap-3"><span className="text-xs text-pink-100">{String(row.customer_name ?? row.facebook_name ?? "BLACKBOX SIGNAL")}</span><span className="text-[10px] text-pink-100/55">BLACKBOX · ตรวจรอยตก</span></div><p className="mt-1 truncate font-mono text-[9px] text-pink-100/45">{String(row.order_number ?? row.upsert_key ?? row.phone ?? "ไม่มีคีย์อ้างอิง")}</p><p className="mt-1 line-clamp-2 text-[10px] text-slate-300/75">{String(row.last_chat_text ?? row.message_text ?? "พบรอยในห้องดำ")}</p></Link>)}
              {result.changeHistory.slice(0, 4).map((row, index) => <Link key={`change-${String(row.id ?? index)}`} href={`/close-job-history`} onClick={onClose} className="block rounded-2xl border border-amber-300/15 bg-amber-400/[.04] p-3 transition hover:border-amber-200/50 hover:bg-amber-400/[.09]"><div className="flex items-center justify-between gap-3"><span className="text-xs text-amber-100">{String(row.customer_name ?? "CHANGE HISTORY")}</span><span className="text-[10px] text-amber-100/55">CHANGE · เปิดประวัติ</span></div><p className="mt-1 truncate font-mono text-[9px] text-amber-100/45">{String(row.tracking_number ?? row.order_number ?? row.phone ?? "ไม่มีคีย์อ้างอิง")}</p><p className="mt-1 line-clamp-2 text-[10px] text-slate-300/75">{String(row.message_text ?? row.case_type ?? "พบประวัติการเปลี่ยนแปลง")}</p></Link>)}
              {totalMatches === 0 ? <div className="rounded-2xl border border-pink-300/15 bg-pink-400/[.04] p-5 text-center text-xs text-pink-100/70">ไม่พบสัญญาณที่ตรงกันใน ORDER · PARCEL · CHAT · BLACKBOX · CHANGE HISTORY</div> : null}
            </section> : null}

            <div className="rounded-2xl border border-violet-300/15 bg-violet-500/[.05] p-4"><div className="flex items-center justify-between"><span className="text-[10px] font-semibold tracking-[0.18em] text-violet-200/65">CURRENT SURFACE</span><PanelRightOpen className="h-3.5 w-3.5 text-fuchsia-200/50" /></div><p className="mt-2 text-lg font-semibold text-white">{surfaceLabel}</p><p className="mt-1 text-xs text-fuchsia-100/45">{location} · DNA presentation layer</p></div>
            <div className="grid grid-cols-2 gap-2 text-center text-[10px] sm:grid-cols-5"><div className="rounded-xl border border-pink-300/15 bg-pink-400/[.04] p-3 text-pink-100/70">CHAT<br /><span className="text-pink-200">SURFACE</span></div><div className="rounded-xl border border-violet-300/15 bg-violet-400/[.04] p-3 text-violet-100/70">ORDER<br /><span className="text-violet-200">SURFACE</span></div><div className="rounded-xl border border-cyan-300/15 bg-cyan-400/[.04] p-3 text-cyan-100/70">PARCEL<br /><span className="text-cyan-200">SURFACE</span></div><div className="rounded-xl border border-fuchsia-300/15 bg-fuchsia-400/[.04] p-3 text-fuchsia-100/70">BLACKBOX<br /><span className="text-fuchsia-200">TRACE</span></div><div className="rounded-xl border border-amber-300/15 bg-amber-400/[.04] p-3 text-amber-100/70">CHANGE<br /><span className="text-amber-200">HISTORY</span></div></div>
            <div className="rounded-2xl border border-pink-300/15 bg-pink-400/[.04] p-4"><p className="text-[10px] font-semibold tracking-[0.18em] text-pink-200/65">DECK NOTE</p><p className="mt-2 text-xs leading-5 text-fuchsia-100/55">ค้นหาเพื่อดูเส้นทางออเดอร์ทั้งก้อน ไม่ได้เปลี่ยนสถานะ ไม่ส่งข้อมูล และไม่ยุ่งกับ route เดิม</p></div>
          </div>
        </div>
      </aside>
    </>
  );
}
