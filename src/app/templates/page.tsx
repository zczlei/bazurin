import type { Metadata } from "next";
import Link from "next/link";
import { PricingSection } from "@/components/PricingSection";
import {
  Breadcrumbs,
  CtaBand,
  FaqList,
  JsonLd,
  SectionHead,
  Steps,
  GalleryGrid,
  TemplateGrid,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/components/sections";
import { VideoGenerator } from "@/components/VideoGenerator";
import { EFFECTS, getEffect, type EffectDefinition } from "@/lib/effects";
import type { FaqItem } from "@/lib/faq";
import { toGeneratorEffect } from "@/lib/generator-effect";
import { SITE, absoluteUrl, pageAlternates } from "@/lib/site";
import { uploadSizeCopy } from "@/lib/upload-limit";

const PATH = "/templates";
const TITLE = "AI動画テンプレート6種｜写真を選ぶだけで8〜10秒・縦型";
const DESCRIPTION =
  "いま選べるAI動画テンプレート6種の一覧です。長さ・構図・動きはテンプレート側で決まっていて、編集画面もタイムラインもありません。写真は1枚（デュエットのみ2枚）、8〜10秒の縦型9:16。配置プレビューは何度でも無料・カード登録不要、書き出しは1本980円（税込）から。";
const UPDATED = "2026-10-12";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: pageAlternates(PATH),
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl(PATH) },
};

const BADGES = [
  "編集画面なし",
  "8〜10秒・縦型9:16",
  "プロンプト入力なし",
  "配置プレビューは何度でも無料",
  "アプリDL不要",
  "1本980円（税込）から",
];

const GROUPS: { id: string; title: string; desc: string; slugs: string[] }[] = [
  {
    id: "vertical",
    title: "TikTok・Instagram Reels・YouTube Shorts 向け",
    desc: "すべて縦型9:16、写真1枚です。手元で撮った1枚をそのまま入れられます。",
    slugs: ["bulin-47", "burning-bridges", "rain-dance", "pet-dance"],
  },
  {
    id: "duet",
    title: "2人で並ぶ型",
    desc: "写真2枚です。左の枠に入れた写真が左、右の枠に入れた写真が右に固定されます。出力は縦型9:16です。",
    slugs: ["hotel-lobby"],
  },
  {
    id: "season",
    title: "季節・イベント向けの型",
    desc: "ハロウィンや企画投稿で出番が増える型です。時期に合わせて入れ替えています。いま使えるのは Zombie Trend です。",
    slugs: ["zombie-trend"],
  },
];

const DIFFERENCE = [
  "日本で「動画テンプレート」と検索すると、実は3種類の別物が出てきます。①ストック素材型は、撮り下ろした映像クリップを差し替えて使う型で、Canva、Renderforest、Filmora、HeyGen（アバターやプレゼン用）がここです。②編集型のテンプレートは、CapCut のエクスプロアに並ぶ、時間軸とエフェクトが組まれた型です。素材を自分で並べて初めて完成します。③生成プリセット型は、動きの方向をテンプレート側で決め、写真や文章を足して1から作り出す型で、Vidu、vivideo、当社がここになります。",
  "当社の位置は③の中でも、足すものがいちばん少ない形です。プリセットを選んでプロンプトや写真を組み立てるのではなく、長さ、額縁、立ち位置、光の色、動きまで1つの型に固定してあり、加えるのは写真だけです。編集画面もタイムラインもありません。",
  "その代わり、細部を詰めたい方には向きません。構図を変える、尺を伸ばす、背景を別のものにする、あの振り付けをそのまま出す、これはこのページでは作れません。同じ型なら別の写真でも形が消えにくいのが利点です。失敗した回はクレジットが戻ります。配置のプレビューから、何度でもやり直せます。",
  "季節の型は入れ替えがあります（ハロウィン、年末、正月）。新しい型は、使えるようになってからこの一覧に足します。",
];

const COMPARE = {
  cols: ["見るポイント", "当社（生成・固定の型）", "ストック素材型 / 編集型"],
  rows: [
    ["足すもの", "写真1枚（デュエットのみ2枚）", "素材・クリップ・文章・BGM"],
    ["編集画面", "なし", "時間軸／スライド編集あり"],
    ["決まっているもの", "長さ・構図・光・動き", "レイアウトだけ"],
    ["直せる範囲", "構図・尺・背景は変更不可", "かなり広い"],
    ["完成までの作業", "選ぶだけ・数分", "素材選びと調整が主"],
    ["向いている人", "まず1本出したい人", "細部を詰めたい人"],
  ],
};

const STEPS = [
  {
    title: "この一覧から型を選ぶ",
    body: "比率はすべて縦型9:16です。必要な写真の枚数だけ先に見てください。TikTok・Reels・Shorts 向けは写真1枚の5つ、2人で並ぶ型だけ写真2枚です。",
  },
  {
    title: "写真を上げる（その場で配置を確認）",
    body: `JPG・PNG・WebP・HEIC。${uploadSizeCopy()}。アップロードすると、ブラウザ上で額縁と立ち位置が出ます。ここで何度でも無料で確認でき、カード登録はいりません。見えるのは配置で、完成した8〜10秒ではありません。`,
  },
  {
    title: "気に入ったら書き出して保存",
    body: "書き出すと8〜10秒の動画ができ、同じブラウザから端末へ保存して、そのまま投稿できます。音源は入らないので、投稿時に TikTok・Reels・Shorts のサウンドライブラリから選んでください。",
  },
];

const FAQ: FaqItem[] = [
  {
    q: "AI動画テンプレートとは何ですか？",
    a: "写真を入れるだけで動く動画が出るよう、長さ・構図・光・動きを最初から1つに決めた型です。当社の場合は編集画面がなく、足すのは写真だけです。素材を差し替えるストック型のテンプレートとも、時間軸を組む編集テンプレートとも指すものが違うので、上の比較表で分けています。",
  },
  {
    q: "テンプレートは無料で見られますか？",
    a: "一覧と、各型の配置プレビュー（写真が画面のどこに入るか）は回数無制限で無料、カード登録も不要です。ここで見えるのは立ち位置で、完成した8〜10秒の動画そのものではありません。課金は書き出し（透かしなしの完成動画を保存する）のときだけで、1本980円（税込）です。生成に失敗した回はクレジットが戻ります。",
  },
  {
    q: "写真が1枚しかないのですが、使える型はどれですか？",
    a: "6つのうち5つが写真1枚で作れます（Bulin 47、Burning Bridges、Rain Dance、Pet Dance、Zombie Trend）。写真2枚が必要なのは Hotel Lobby（2人のデュエット、縦型9:16）だけです。左右は「左の人」「右の人」の枠で決まり、アップロードした順番ではありません。",
  },
  {
    q: "構図や尺を変えられますか？",
    a: "変えられません。当社は動きと額縁をテンプレート側で固定する方式で、タイムライン編集、背景の差し替え、尺の調整はありません。プロンプトの入力欄もないため、言葉での指定もできません。細部を詰めたい場合は、ストック素材型か編集型のツールを使ってください。",
  },
  {
    q: "準備中のテンプレートはありますか？",
    a: "いま並んでいる6つはすべて使えます。季節の型（いまは Zombie Trend）は時期に合わせて入れ替えます。新しい型は、書き出せるようになってからこの一覧に足します。",
  },
  {
    q: "縦型と横型、どちらで出ますか？",
    a: "6つとも縦型9:16です。Hotel Lobby（写真2枚）も同じ縦型です。TikTok・Instagram Reels・YouTube Shorts は縦が前提なので、投稿先が決まっていてもこの一覧から選べます。横の素材を縦に切り替える機能はありません。",
  },
  {
    q: "有名人や他人の写真で作れますか？",
    a: "有名人・タレント、および本人の許諾がない人物やペットを無断で主役にした生成と投稿、ならびに広告・商品販売などの商用利用は利用規約で禁じています。個人SNSでの利用に限定してください。当社は関連する映像・楽曲・サービス名の権利者とは無関係の独立したサービスで、音源は同封していません。",
  },
];

const RELATED = [
  {
    href: "/tools/image-to-video",
    anchor: "画像から動画を作る",
    desc: "イラストやAI生成の絵を素材にしたい方向け。動きの指定方法の話を先に読めます。",
  },
  {
    href: "/tools/photo-to-video",
    anchor: "写真1枚から作る人",
    desc: "写真1枚で8〜10秒の縦型を作る入口です。配置の確認は無料で、スマホのブラウザで完結します。",
  },
  {
    href: "/tools/dance-video",
    anchor: "ダンスの型を選ぶ",
    desc: "元動画もプロンプトも不要な、写真1枚で踊る形のまとめです。",
  },
  {
    href: "/tools/animate-photo",
    anchor: "写真を動かす4方式",
    desc: "「動かす」が日本で指す4つの別物を分け、当社が受けられる形を特定しています。",
  },
  {
    href: "/make/ai-video-tutorial",
    anchor: "AI動画の作り方",
    desc: "元動画をなぞる型、プロンプトで指示する型、動きを固定した型の3通りを分けています。",
  },
];

function effectsIn(slugs: string[]) {
  return slugs.map((slug) => getEffect(slug)).filter((e): e is EffectDefinition => Boolean(e));
}

const HUB_EFFECTS = GROUPS.flatMap((g) => effectsIn(g.slugs));

export default function TemplatesPage() {
  const crumbs = [
    { name: "ホーム", path: "/" },
    { name: "テンプレート", path: PATH },
  ];

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbJsonLd(crumbs),
            {
              "@type": "ItemList",
              name: "AI動画テンプレート一覧",
              itemListOrder: "https://schema.org/ItemListUnordered",
              numberOfItems: HUB_EFFECTS.length,
              itemListElement: HUB_EFFECTS.map((e, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: e.name,
                url: absoluteUrl(`/effects/${e.slug}`),
              })),
            },
            faqJsonLd(FAQ, `${absoluteUrl(PATH)}#faq`),
          ],
        }}
      />
      <section className="page-hero">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <h1>動画テンプレート一覧｜いま選べる6つの型</h1>
          <p className="hero-lede">
            テンプレートは<strong>型そのもの</strong>です。光の色、額縁、立ち位置、体の揺れ、唇の動きまで最初から1つに決まっていて、写真を選ぶと8〜10秒の縦型で出てきます。
            <strong>編集画面もタイムラインもない</strong>ので、足すのは写真だけ。いま選べるのは6つで、すべて縦型9:16です。写真2枚なのは
            Hotel Lobby だけです。
          </p>
          <ul className="hero-badges">
            {BADGES.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="hero-ctas">
            <Link href="/effects/bulin-47" className="btn btn-primary btn-lg">
              選んで試す（写真1枚・10秒）
            </Link>
          </div>
          <p className="hero-season">配置のプレビューは無料で何度でも。カード登録は不要です。</p>
        </div>
      </section>

      <div className="shell">
        <section className="section section-tight">
          <SectionHead
            eyebrow="SAMPLES"
            title="作例"
            lede="各型のイメージです。完成した動画そのものではありません。立ち位置は下の配置プレビューで確認できます。"
          />
          <GalleryGrid />
        </section>

        <VideoGenerator
          effects={(HUB_EFFECTS.length ? HUB_EFFECTS : EFFECTS).map(toGeneratorEffect)}
          initialSlug="bulin-47"
          selectable
        />

        <section className="section section-tight">
          <SectionHead eyebrow="WHERE" title="投稿先で選ぶ" lede="別ページには分けていません。このページの中で切り替わります。" />
          <ul className="pill-links">
            {GROUPS.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`}>{g.title}</a>
              </li>
            ))}
          </ul>
        </section>

        {GROUPS.map((g) => (
          <section key={g.id} id={g.id} className="section section-tight">
            <SectionHead eyebrow={g.id.toUpperCase()} title={g.title} lede={g.desc} />
            <TemplateGrid effects={effectsIn(g.slugs)} uidPrefix={`hub-${g.id}`} />
          </section>
        ))}

        <section className="section">
          <SectionHead eyebrow="DIFF" title="ストック型・編集型のテンプレートと、何が違うのか" />
          <div className="prose">
            {DIFFERENCE.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="compare-wrap">
            <table className="compare">
              <thead>
                <tr>
                  {COMPARE.cols.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <SectionHead eyebrow="HOW TO" title="テンプレートから1本できるまで" />
          <Steps steps={STEPS} />
        </section>

        <PricingSection />

        <section className="section" id="faq">
          <SectionHead eyebrow="FAQ" title="よくある質問" />
          <FaqList items={FAQ} />
        </section>

        <section className="section section-tight">
          <SectionHead eyebrow="RELATED" title="関連" />
          <ul className="related-list">
            {RELATED.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.anchor}</Link>
                <p>{item.desc}</p>
              </li>
            ))}
          </ul>
          <p className="fine">
            最終更新：{UPDATED}｜{SITE.name}
            は関連する映像・楽曲・サービス名の権利者とは無関係の独立したサービスです。
          </p>
        </section>
      </div>
      <CtaBand title="型を選んで、まずは配置を見てみませんか。" href="#generator" />
    </main>
  );
}
