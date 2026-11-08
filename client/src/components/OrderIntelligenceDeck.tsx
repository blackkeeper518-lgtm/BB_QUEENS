import { PanelRightOpen, X } from "lucide-react";

type OrderIntelligenceDeckProps = {
  open: boolean;
  location: string;
  surfaceLabel: string;
  onClose: () => void;
};

export default function OrderIntelligenceDeck({ open, location, surfaceLabel, onClose }: OrderIntelligenceDeckProps) {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-[60] w-[min(430px,calc(100vw-1rem))] transform border-l border-fuchsia-300/20 bg-[#0b0715]/95 shadow-[-18px_0_60px_rgba(130,42,220,.2)] backdrop-blur-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      aria-hidden={!open}
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-fuchsia-300/15 bg-gradient-to-r from-fuchsia-500/[0.12] via-violet-500/[0.08] to-cyan-400/[0.08] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[9px] tracking-[0.24em] text-cyan-200/65">NEBULA // ORDER SIGNAL SURFACE</p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-fuchsia-50">ORDER INTELLIGENCE DECK</h2>
              <p className="mt-1 text-[11px] leading-5 text-fuchsia-100/45">แผงดู DNA ออเดอร์จากทุกห้อง · presentation layer เท่านั้น</p>
            </div>
            <button type="button" onClick={onClose} aria-label="ปิด ORDER INTELLIGENCE DECK" className="rounded-lg p-2 text-fuchsia-100/55 hover:bg-fuchsia-400/10 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.05] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-[0.18em] text-cyan-100/60">CURRENT SURFACE</span>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-200"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_10px_#6fffe0]" />LIVE</span>
            </div>
            <p className="mt-3 text-xl font-semibold text-white">{surfaceLabel}</p>
            <p className="mt-1 text-xs text-fuchsia-100/45">{location}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-400/[0.06] p-3">
              <p className="text-[9px] tracking-[0.16em] text-fuchsia-100/45">SIGNAL MODE</p>
              <p className="mt-2 text-sm font-medium text-fuchsia-100">READ ONLY</p>
            </div>
            <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] p-3">
              <p className="text-[9px] tracking-[0.16em] text-cyan-100/45">DATABASE</p>
              <p className="mt-2 text-sm font-medium text-cyan-100">DEPLOYMENT</p>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-300/15 bg-violet-500/[0.05] p-4">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-violet-200/65">DNA CHANNELS</p>
            <div className="mt-3 space-y-2 text-xs text-fuchsia-100/65">
              <div className="flex items-center justify-between rounded-xl bg-black/20 px-3 py-2"><span>CHAT · ห้องแชท</span><span className="text-pink-200">SURFACE</span></div>
              <div className="flex items-center justify-between rounded-xl bg-black/20 px-3 py-2"><span>ORDER · ใบสั่งซื้อ</span><span className="text-violet-200">SURFACE</span></div>
              <div className="flex items-center justify-between rounded-xl bg-black/20 px-3 py-2"><span>PARCEL · พัสดุ</span><span className="text-cyan-200">SURFACE</span></div>
            </div>
          </div>

          <div className="rounded-2xl border border-pink-300/15 bg-pink-400/[0.04] p-4">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-pink-200/65">DECK NOTE</p>
            <p className="mt-2 text-xs leading-5 text-fuchsia-100/55">แผงนี้มีหน้าที่แสดงผลเท่านั้น ไม่เปลี่ยนสถานะ ไม่ส่งข้อมูล และไม่ยุ่งกับเส้นทางออเดอร์เดิม</p>
          </div>
        </div>
      </div>
    </div>
  );
}
