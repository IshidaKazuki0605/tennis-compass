import { useMemo, useState } from "react";
import { ArrowLeftRight, ChevronDown, ChevronUp, CircleDot } from "lucide-react";
import { comparisons, otherRecords, scaleLegend, setups } from "@/data/publicData";

type Tab = "setups" | "comparisons" | "measurements";

const setupById = new Map(setups.map((setup) => [setup.id, setup] as const));
const scoreLabel = (score: string) => scaleLegend.find((item) => item.score === score)?.label ?? "評価記録なし";

export default function Home() {
  const [tab, setTab] = useState<Tab>("setups");
  const [selectedComparison, setSelectedComparison] = useState(comparisons[0]?.id ?? "");
  const [expandedSetups, setExpandedSetups] = useState<string[]>([]);

  const activeComparison = useMemo(
    () => comparisons.find((item) => item.id === selectedComparison) ?? comparisons[0],
    [selectedComparison],
  );

  const toggleSetup = (id: string) => {
    setExpandedSetups((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f4] text-[#1d2c26]">
      <header className="border-b border-[#dce5dc] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#173f32] text-lg font-bold text-white">T</div>
            <div>
              <div className="text-xl font-bold tracking-tight text-[#173f32]">Tennis Compass</div>
              <div className="text-xs tracking-[0.18em] text-[#75877c]">テニコン / RACKET SETUP RECORDS</div>
            </div>
          </div>
          <span className="rounded-full border border-[#d8e5d9] bg-[#f5faf5] px-3 py-1.5 text-xs font-medium text-[#456d52]">READ ONLY</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-9">
        <section className="mb-8">
          <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-[#7d927f]">PERSONAL TENNIS DATABASE</p>
          <h1 className="text-3xl font-bold tracking-tight text-[#173f32] sm:text-4xl">セットアップ記録</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#68796e]">
            会話内で記録されたラケットセットアップ、実測値、比較結果を閲覧できます。
          </p>
        </section>

        <div className="mb-7 flex flex-wrap gap-2 border-b border-[#dce5dc]">
          {([
            ["setups", "セットアップ", setups.length],
            ["comparisons", "比較結果", comparisons.length],
            ["measurements", "測定・調整記録", otherRecords.length],
          ] as const).map(([key, label, count]) => (
            <button key={key} onClick={() => setTab(key)} className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition ${tab === key ? "border-[#28704d] text-[#1d573b]" : "border-transparent text-[#849188] hover:text-[#385b46]"}`}>
              {label}<span className="ml-2 text-xs text-[#96a39a]">{count}</span>
            </button>
          ))}
        </div>

        {tab === "setups" && (
          <section className="grid gap-5 lg:grid-cols-2">
            {setups.map((setup) => {
              const expanded = expandedSetups.includes(setup.id);
              return (
                <article key={setup.id} className="overflow-hidden rounded-2xl border border-[#dce5dc] bg-white shadow-[0_2px_10px_rgba(25,60,40,0.035)]">
                  <div className="border-b border-[#edf1ed] px-6 py-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-md bg-[#edf5ee] px-2.5 py-1 text-xs font-semibold text-[#356849]">{setup.owner}</span>
                      <span className="text-xs text-[#89958d]">{setup.role}</span>
                    </div>
                    <h2 className="text-xl font-bold text-[#213d2d]">{setup.racket}</h2>
                    <p className="mt-2 text-sm text-[#607267]">{setup.string}{setup.gauge ? ` / ${setup.gauge}` : ""}</p>
                    {setup.tension && <p className="mt-1 text-sm font-medium text-[#607267]">縦 / 横　{setup.tension}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-px bg-[#edf1ed] sm:grid-cols-4">
                    {(setup.measurements ?? []).map((measurement) => (
                      <div key={measurement.label} className="bg-[#fbfcfa] px-4 py-3">
                        <div className="text-[11px] text-[#8a988e]">{measurement.label}</div>
                        <div className="mt-1 text-base font-semibold tabular-nums text-[#254a34]">{measurement.value}</div>{measurement.condition && <div className="mt-1 text-[10px] leading-4 text-[#8a988e]">{measurement.condition}</div>}
                      </div>
                    ))}
                  </div>
                  {setup.details?.length ? (
                    <div className="px-6 py-4">
                      <button onClick={() => toggleSetup(setup.id)} className="flex w-full items-center justify-between text-sm font-semibold text-[#41644c]">
                        セットアップ情報・メモ
                        {expanded ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
                      </button>
                      {expanded && <ul className="mt-3 space-y-2 border-t border-[#edf1ed] pt-3 text-sm leading-6 text-[#68796e]">{setup.details.map((detail, index) => <li key={index}>・{detail}</li>)}</ul>}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </section>
        )}

        {tab === "comparisons" && (
          <section className="grid gap-5 lg:grid-cols-[300px_1fr]">
            <aside className="h-fit rounded-2xl border border-[#dce5dc] bg-white p-3">
              <div className="px-3 pb-3 pt-2 text-xs font-semibold tracking-wide text-[#849188]">比較一覧</div>
              {comparisons.map((comparison) => (
                <button key={comparison.id} onClick={() => setSelectedComparison(comparison.id)} className={`mb-1 w-full rounded-xl px-3 py-3 text-left transition ${selectedComparison === comparison.id ? "bg-[#edf5ee] text-[#214e34]" : "text-[#5e7064] hover:bg-[#f7f9f6]"}`}>
                  <div className="text-sm font-semibold">{comparison.title}</div>
                  <div className="mt-1 text-xs text-[#8a988e]">{comparison.date ?? "日付未記録"} ・ {comparison.items.length}項目</div>
                </button>
              ))}
            </aside>

            {activeComparison && (
              <article className="overflow-hidden rounded-2xl border border-[#dce5dc] bg-white">
                <div className="border-b border-[#edf1ed] px-6 py-5">
                  <p className="text-xs font-semibold tracking-[0.16em] text-[#819384]">COMPARISON DETAIL</p>
                  <h2 className="mt-2 text-2xl font-bold text-[#1d4931]">{activeComparison.title}</h2>
                  <p className="mt-1 text-xs text-[#89958d]">{activeComparison.date ?? "比較日未記録"}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                    <div className="rounded-xl bg-[#f5f8f4] p-4">
                      <div className="text-[10px] font-semibold tracking-wider text-[#819384]">BASE / 基準</div>
                      <div className="mt-1 font-semibold text-[#2c4a35]">{setupById.get(activeComparison.base)?.racket ?? "比較元の詳細未確認"}</div>
                      <div className="mt-1 text-xs text-[#748278]">{[setupById.get(activeComparison.base)?.string, setupById.get(activeComparison.base)?.gauge, setupById.get(activeComparison.base)?.tension].filter(Boolean).join(" / ")}</div>
                    </div>
                    <ArrowLeftRight className="mx-auto text-[#91a397]" size={20} />
                    <div className="rounded-xl bg-[#f5f8f4] p-4">
                      <div className="text-[10px] font-semibold tracking-wider text-[#819384]">COMPARED / 比較対象</div>
                      <div className="mt-1 font-semibold text-[#2c4a35]">{setupById.get(activeComparison.target)?.racket ?? "比較対象の詳細未確認"}</div>
                      <div className="mt-1 text-xs text-[#748278]">{[setupById.get(activeComparison.target)?.string, setupById.get(activeComparison.target)?.gauge, setupById.get(activeComparison.target)?.tension].filter(Boolean).join(" / ")}</div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-bold text-[#294b35]">比較結果</h3>
                    <div className="flex flex-wrap gap-2 text-[11px] text-[#75857a]">
                      {scaleLegend.map((item) => <span key={item.score}><b className="mr-1 text-[#315f40]">{item.score}</b>{item.label}</span>)}
                    </div>
                  </div>
                  {activeComparison.items.length ? (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[500px] text-left text-sm">
                        <thead><tr className="border-b border-[#e8eee8] text-xs text-[#849188]"><th className="py-3 pr-3 font-medium">分類</th><th className="py-3 pr-3 font-medium">比較項目</th><th className="py-3 pr-3 font-medium">評価</th><th className="py-3 font-medium">値・メモ</th></tr></thead>
                        <tbody>{activeComparison.items.map((item, index) => (
                          <tr key={index} className="border-b border-[#f0f3ef] last:border-0">
                            <td className="py-3 pr-3 text-xs text-[#849188]">{item.category}</td>
                            <td className="py-3 pr-3 font-medium text-[#344f3b]">{item.name}</td>
                            <td className="py-3 pr-3"><span className="inline-flex min-w-9 justify-center rounded-md bg-[#edf5ee] px-2 py-1 font-bold text-[#285b3b]">{item.score}</span><span className="ml-2 text-xs text-[#7e8c81]">{scoreLabel(item.score)}</span></td>
                            <td className="py-3 text-xs text-[#758278]">{item.note ?? "—"}</td>
                          </tr>
                        ))}</tbody>
                      </table>
                    </div>
                  ) : <p className="rounded-xl bg-[#f7f9f6] p-4 text-sm text-[#7b897f]">評価対象の項目内訳は記録されていません。</p>}
                  {activeComparison.note && <div className="mt-5 rounded-xl border border-[#e5ece4] bg-[#fafcf9] p-4"><div className="mb-1 text-xs font-semibold text-[#627768]">比較メモ</div><p className="text-sm leading-6 text-[#68796e]">{activeComparison.note}</p></div>}
                </div>
              </article>
            )}
          </section>
        )}

        {tab === "measurements" && (
          <section className="space-y-5">
            {otherRecords.map((record) => (
              <article key={record.title} className="overflow-hidden rounded-2xl border border-[#dce5dc] bg-white">
                <div className="border-b border-[#edf1ed] px-6 py-4"><h2 className="font-bold text-[#284b34]">{record.title}</h2></div>
                <div className="overflow-x-auto px-6 py-2">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead><tr className="text-xs text-[#89958d]"><th className="py-3 pr-4 font-medium">条件</th><th className="py-3 pr-4 font-medium">記録値</th><th className="py-3 font-medium">補足</th></tr></thead>
                    <tbody>{record.rows.map((row, index) => <tr key={index} className="border-t border-[#f0f3ef]"><td className="py-3 pr-4 font-medium text-[#3d5945]">{row[0]}</td><td className="py-3 pr-4 font-semibold tabular-nums text-[#2b4934]">{row[1]}</td><td className="py-3 text-xs leading-5 text-[#7a887e]">{row[2]}</td></tr>)}</tbody>
                  </table>
                </div>
              </article>
            ))}
          </section>
        )}

        <section className="mt-9 rounded-2xl border border-[#dce5dc] bg-white px-5 py-4">
          <div className="flex items-start gap-3">
            <CircleDot className="mt-0.5 shrink-0 text-[#66856b]" size={18} />
            <div>
              <h2 className="text-sm font-semibold text-[#385b42]">データについて</h2>
              <p className="mt-1 text-xs leading-6 text-[#7c8a80]">
                このページは過去の会話で記録された情報を静的に表示しています。未確認の値は推測で補完せず、測定条件や情報源が不明な場合はその旨を記載しています。入力・編集・削除・アカウント登録・データ保存機能はありません。
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dce5dc] bg-white py-6 text-center text-xs text-[#91a096]">
        Tennis Compass · テニコン
      </footer>
    </div>
  );
}
