import type { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumbs,
  CtaBand,
  FaqList,
  JsonLd,
  SectionHead,
  Steps,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/components/sections";
import type { FaqItem } from "@/lib/faq";
import { SITE, absoluteUrl, pageAlternates } from "@/lib/site";
import { maxImageMbLabel } from "@/lib/upload-limit";

const PATH = "/make/ai-video-tutorial";
const PUBLISHED = "2026-10-12";
const UPDATED = "2026-10-12";
const TITLE = "AI動画の作り方【2026年版】｜写真1枚からの型と、3通りの分け方";
const DESCRIPTION =
  "AI動画の作り方は「元動画をなぞらせる型」「プロンプトで言葉で指示する型」「動きを固定した型に写真をはめる型」の3通りに分かれます。写真1枚から8〜10秒の縦型を作る流れ、アプリ不要でスマホだけで完結する形、無料でどこまで試せるかをまとめました。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: pageAlternates(PATH),
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },
};

const BADGES = [
  "3通りの型を分けてから選べる",
  "写真1枚から",
  "8〜10秒・縦9:16",
  "配置プレビューは何度でも無料",
  "アプリのDL不要",
  "プロンプトを書かなくていい",
];

const TOC = [
  { id: "methods", label: "AI動画の作り方は3通りに分かれます" },
  { id: "matrix", label: "どれを選ぶかの早見表" },
  { id: "steps", label: "写真1枚からの作り方（当サイトの5ステップ）" },
  { id: "tips", label: "失敗しないコツ" },
  { id: "decide", label: "型が決まらない時の3つの質問" },
  { id: "faq", label: "よくある質問" },
  { id: "changelog", label: "更新記録" },
];

const METHODS = [
  {
    id: "m1",
    h: "① 元動画をなぞらせる型（Higgsfield・Viggle 系）",
    body: [
      "手元に振り付けの元動画があって、その動きをそのまま流用したい場合の形です。元動画のダンスやカメラワークを再利用する作り方で、人とペットを同じ動きに揃えるときにも使われます。",
      "実際の流れは工程が分かれています。日本語で出ているこの型の手順は、ペットの写真を撮る、まず二足歩行の静止画を別途作る、モーションを付ける、仕上げる、の4工程です。写真1枚を置くだけでは終わらず、途中で静止画を作り直す工程が入ります。",
    ],
    good: "本家の振り付けを正確に再現したい。人とペットを同じ動きに揃えたい。動き自体にオリジナリティを出したい。",
    bad: "なぞらせる元動画を用意する必要があります。その動画が誰かの創作なら、そのまま流用はできない形になります。工程が分かれているぶん、手戻りも多いです。",
  },
  {
    id: "m2",
    h: "② プロンプトで言葉で指示する型（Sora・Veo・Canva・Kling 系）",
    body: [
      "画像1枚を軸に、「腕を上げて左右に揺れる」のように動きを言葉で指示する形です。テキストだけで動画を作る場合もここに入ります。いま出ている解説の多くは、この型の話をしています。",
      "自由度はいちばん高いです。そのぶん、思った通りに動かない回をその都度引き受ける形になります。「1枚の写真が動き出す」と書いて試しても、ちっとも踊らない結果は普通に出ます。言葉での指示に慣れが必要で、当たる範囲も型ほど固定されません。",
    ],
    good: "動かしたい画がもう決まっている。1本を作り込んで詰めたい。横長や映画的な画も狙いたい。",
    bad: "何本も出す用途には、1本あたりの手戻りが重いです。プロンプトに慣れていないと、思った動きになるまで試す回数がかかります。",
  },
  {
    id: "m3",
    h: "③ 動きを固定した型に写真をはめる形（当サイト）",
    body: [
      "動きのほうを先に固定しておいて、差し替えるのは写真だけです。プロンプトも、なぞらせる元動画も要りません。バズリンはここで、縦型9:16・8〜10秒の型を用意して、その中から選んでもらう形にしています。Hotel Lobby も同じ縦型で、写真だけ2枚です。",
      "この型で見ているのは、型の数と、型ごとの動きが崩れにくいかです。写真を変えても動きそのものが消えにくいので、投稿を続けたときのブレが小さくなります。振り付けを細かく指定することはできません。そこは①か②です。",
    ],
    good: "写真1枚から縦動画を何本も出したい。スマホだけで完結させたい。プロンプトを書きたくない。仕上がりの形を揃えたい。",
    bad: "「この曲のこの振り付けをそのまま」には向きません。使いたい型がまだ無い場合は、その型が増えるまで待つことになります。",
  },
];

const MATRIX = {
  cols: ["やりたいこと", "向いている型", "用意するもの", "手戻り"],
  rows: [
    ["本家の振り付けをそのまま再現", "① なぞらせ型", "元動画。必要なら二足歩行の静止画", "多い"],
    ["写真1枚から縦動画を何本も出す", "③ 型固定", "写真1枚", "少ない"],
    ["決まっている画を1本仕上げる", "② プロンプト型", "画像1枚、またはテキスト", "中"],
    ["アプリを入れずスマホだけで完結", "③ 型固定", "写真1枚", "少ない"],
    ["ペット（犬・猫）を動かす", "③（Pet Dance）", "横向きで全身と四つ足が写った1枚", "少ない"],
    ["2人のデュエット", "③（Hotel Lobby）", "写真2枚（左の枠と右の枠）", "少ない"],
    ["1本を30秒以上にしたい", "①②（編集で繋ぐ）", "素材と編集", "多い"],
  ],
};

const STEPS = [
  {
    title: "型を選ぶ",
    body: "縦型9:16・8〜10秒で、動きを先に固定した型が一覧に出ています。ここで動きを決めるので、プロンプトは書きません。写真を変えても、型そのものは壊れません。",
  },
  {
    title: "写真を1枚選ぶ",
    body: `JPG・PNG・WebP・HEIC、1枚の型は最大${maxImageMbLabel(1)}MB。人なら胸から上がわかる1枚、ペットなら横向きで全身と四つ足が写っている1枚。加工・切り抜き・撮り直しの下準備は要りません。画面のキャプチャや、圧縮を繰り返して粗くなった写真は避けてください。2人が並ぶ Hotel Lobby だけ写真は2枚で、1枚あたり最大${maxImageMbLabel(2)}MBです。`,
  },
  {
    title: "そのままアップロード",
    body: "スマホのアルバムから選んで終わりです。アプリのインストールはありません。パソコンなら、ファイルをそのまま置けます。",
  },
  {
    title: "配置を無料で確認する",
    body: "クレジットを使う前に、写真が画面のどこに入るかをブラウザで確認できます。納得がいかなければ、別の写真で何度でもやり直せます。この確認は何度でも無料で、カード登録も要りません。見えるのは立ち位置で、完成した8〜10秒ではありません。",
  },
  {
    title: "気に入った型だけ書き出して投稿",
    body: "書き出しは1本980円（税込）です。透かしなしの完成動画を同じブラウザから端末へ保存して、そのまま TikTok・Instagram Reels・YouTube Shorts へ上げられます。音源は付いていないので、投稿時に各アプリのサウンドから選んでください。",
  },
];

const TIPS = [
  {
    h: "写真は動く前提で選ぶ",
    p: "柔らかい順光で、表情は作り込みすぎないほうが動きと噛み合います。1枚につき1人を基本にしてください。人が複数写っている1枚より、1人の1枚のほうが動きが崩れません。",
  },
  {
    h: "背景がごちゃついていると動きと混ざる",
    p: "人物と背景の境がわかりにくい写真（夜の色が近い、壁と服の色が同じ）は、動きが付いたとき背景ごと引っ張られたように見えることがあります。",
  },
  {
    h: "1本目が弱かったら、型を変える",
    p: "写真を変えるより型を変えるほうが効きます。動きは型側で固定しているので、同じ写真でも型の当たり外れが出ます。",
  },
  {
    h: "縦型9:16で確認してから本数を考える",
    p: "投稿先はほぼ縦です。型は縦型9:16を前提に作ってあるので、横に切り替えて見栄えを占うより、縦で何本作るかを考えたほうが伸びます。",
  },
];

const DECIDE = [
  "Q1. なぞらせる元動画は、手元にありますか？　あるなら①が本命です。ただしその動画が誰かの創作なら、そのまま流用できない形になります。無いなら①は外してよいです。",
  "Q2. 1本を作り込みたいか、10本を出したいか。　1本なら②（プロンプトで詰める）。10本なら③（型を固定して写真だけ差し替える）。ここで②と③が分かれます。",
  "Q3. アプリを入れずに、スマホだけで完結する必要がありますか？　必要なら③です。①②の道具の多くはアプリかパソコンが前提で、工程も分かれます。",
  "この3つに答えると、だいたい1つ残ります。残ったものだけ試してください。全部の型を回すと、その分だけ手間が増えます。",
];

const FAQ: FaqItem[] = [
  {
    q: "無料でどこまでできますか？",
    a: "アップロードから配置プレビュー（写真が画面のどこに入るか）までが、回数無制限で無料、カード登録も不要です。ここで見えるのは立ち位置で、完成した8〜10秒ではありません。その先の書き出し（透かしなしの完成動画を保存する）は1本980円（税込）、3本2,480円（1本あたり約827円）、10本5,980円（Creator Pack、1本あたり約598円）です。生成に失敗した回はクレジットが戻ります。生成には実費がかかるので、無制限に無料で完成動画が出る、という形にはしていません。",
  },
  {
    q: "アプリを入れずにスマホだけでできますか？",
    a: "できます。アプリのダウンロードはありません。スマホのブラウザ（Safari・Chrome とも）で、写真の選択、配置の確認、書き出した動画の保存まで完結します。この点が、アプリ前提の①②との分かりやすい差です。",
  },
  {
    q: "写真は何枚必要ですか？",
    a: `基本は1枚です。人は胸から上がわかる1枚、ペットは横向きで全身と四つ足が写った1枚。JPG・PNG・WebP・HEIC、1枚最大${maxImageMbLabel(1)}MBです。2枚必要なのは Hotel Lobby（2人のデュエット、縦型9:16）だけで、1枚あたり最大${maxImageMbLabel(2)}MB、左の枠が左、右の枠が右に固定されます。`,
  },
  {
    q: "何秒、どの比率で作れますか？",
    a: "型の長さで8〜10秒、比率は縦型9:16です。Hotel Lobby も同じ縦型です。TikTok・Instagram Reels・YouTube Shorts にそのまま上げられる形になります。",
  },
  {
    q: "動きがおかしい、踊らない場合は？",
    a: "課金前に確認できるのは配置です。動きそのものは、書き出したあとに分かります。崩れやすいのは、背景と人物の色が近い写真、圧縮を繰り返した写真、人が複数写っている写真です。生成に失敗した回はクレジットが戻ります。同じ写真で弱いときは、別の型を選んでください。",
  },
  {
    q: "「シーダンス」は何ですか？",
    a: "日本語で「シーダンス」と呼ばれているものの多くは、ByteDance の動画生成モデル「Seedance」です。ダンスの種類ではなくモデルの名前で、①②の側に分類される道具の話です。検索では人と犬を同じ動きにする作例がこの名前で回っていることが多いので、型で選ぶときに混ざると迷います。",
  },
  {
    q: "Higgsfield など、他の道具との違いは何ですか？",
    a: "バズリンは③の型固定だけで、プロンプトも、なぞらせる元動画も選びません。動きを指定する自由度はそのぶん低いですが、写真1枚から8〜10秒の縦型を何本も出すときの手戻りが小さい形になります。本家の振り付けを正確に再現したいなら①の道具を使ってください。当サイトはその代替ではありません。",
  },
  {
    q: "商用利用できますか？",
    a: "個人SNSでの利用に限定しています。広告・商品販売などの商用利用は利用規約で禁じています。",
  },
  {
    q: "誰かの動画の振り付けを真似できますか？",
    a: "当サイトの型には、特定の人の振り付けを再現する機能はありません。動きは用意した型の中からです。本人以外の写真や、著名人の写真を無断で主役にする生成は禁止しています。ペットや、許諾のある自分の写真を使ってください。",
  },
  {
    q: "月額課金や自動更新はありますか？",
    a: "ありません。月額課金も自動更新もなく、クレジットの買い切りです。1本980円、3本2,480円、10本5,980円で、クレジットに有効期限はありません。使わない月は払いません。",
  },
];

const CHANGELOG = [
  { date: "2026-10-12", text: "公開。3通りの型の分け方、写真1枚からの5ステップ、無料でどこまでかを掲載。" },
];

const RELATED = [
  {
    href: "/templates",
    anchor: "AI動画の型をまとめて見る",
    desc: "縦型9:16・8〜10秒で、動きを固定した型を一覧にしています。このページの③がどの型かをここで選べます。",
  },
  {
    href: "/tools/photo-to-video",
    anchor: "写真1枚から作る人",
    desc: "③の型のうち、1枚だけで済む形に絞った説明です。配置の確認は無料で、スマホのブラウザで完結します。",
  },
  {
    href: "/tools/image-to-video",
    anchor: "画像から動画を作る",
    desc: "写真以外（イラスト・AI生成の絵）を動かす場合の形です。プロンプトとテンプレートの違いを先に読めます。",
  },
  {
    href: "/tools/dance-video",
    anchor: "ダンス系の3つの作り方",
    desc: "①・②・③のうち、ダンスでどれが使われているかを、このページより細かく分けています。",
  },
  {
    href: "/effects/pet-dance",
    anchor: "ペットを踊らせる",
    desc: "ペットの写真1枚から、立ち上がってリズムに揺れる8秒の縦型です。",
  },
];

export default function AiVideoTutorialPage() {
  const crumbs = [
    { name: "ホーム", path: "/" },
    { name: "AI動画の作り方", path: PATH },
  ];

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbJsonLd(crumbs),
            {
              "@type": "Article",
              headline: "AI動画の作り方｜写真1枚から始める3通りの型と、実際に作る流れ",
              description: DESCRIPTION,
              inLanguage: "ja",
              datePublished: PUBLISHED,
              dateModified: UPDATED,
              author: { "@type": "Organization", name: SITE.name, url: SITE.url },
              publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
              mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(PATH) },
            },
            faqJsonLd(FAQ, `${absoluteUrl(PATH)}#faq`),
          ],
        }}
      />
      <section className="page-hero">
        <div className="shell">
          <Breadcrumbs items={crumbs} />
          <p className="updated">
            最終更新：{UPDATED}（公開：{PUBLISHED}）
          </p>
          <h1>AI動画の作り方｜写真1枚から始める3通りの型と、実際に作る流れ</h1>
          <p className="hero-lede">
            AI動画の作り方は、いま<strong>3つの別々の型</strong>に分かれています。元になる動画をなぞらせる型、言葉で動きを指示する型、動きのほうを先に固定して写真をはめる型。
            <strong>どれで作るか決まっていないままツールを選ぶと、だいたい手戻りになります。</strong>
            このページでは3通りを分けたあと、写真1枚から8〜10秒の縦型を作る流れを、当サイトの画面で追います。
          </p>
          <ul className="hero-badges">
            {BADGES.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="shell">
        <nav className="section section-tight" aria-label="目次">
          <SectionHead eyebrow="INDEX" title="目次" />
          <ol className="toc">
            {TOC.map((t, i) => (
              <li key={t.id}>
                <a href={`#${t.id}`}>
                  {i + 1}. {t.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section className="section prose-section">
          <div className="prose">
            <p>
              「AIで動画を作る」といっても、実際には同じ作り方ではありません。検索して出てくる説明の多くが
              <strong>テキストから動画を生成する形</strong>
              （Sora、Veo、Canva、Kling など）を先に置いていますが、写真1枚を動かしたい人にとっては、そこはむしろ選択肢の後半です。
            </p>
            <p>
              先に分けておくと、いま作られているAI動画の出自はこの3つ。<strong>①</strong>{" "}
              誰かが踊っている・動いている動画を軸にして、モーションを流用する形。<strong>②</strong>{" "}
              画像1枚を入れて、言葉で動きを指示する形。<strong>③</strong>{" "}
              動きのほうを先に固定（型）しておいて、写真だけ差し替える形。
            </p>
            <p>
              この分け方を先に書くのは、<strong>①と②は1本を作るのに向いていて、③は何本も出すのに向いている</strong>
              からです。TikTok・Instagram Reels・YouTube Shorts に、写真1枚から縦動画を続けて投稿したい人は、③を読んでください。なお、日本語で
              <strong>「シーダンス」と呼ばれているものはダンスの種類ではなく、ByteDance の動画生成モデル「Seedance」</strong>
              のことで、①②の道具の名前です。型の話と混ぜないように、このページでは型で書きます。
            </p>
          </div>
        </section>

        <section className="section" id="methods">
          <SectionHead eyebrow="METHODS" title="AI動画の作り方は3通りに分かれます" />
          <div className="stack">
            {METHODS.map((m) => (
              <article key={m.id} id={m.id} className="tip">
                <h3>{m.h}</h3>
                {m.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
                <p>
                  <strong>向いている：</strong>
                  {m.good}
                </p>
                <p>
                  <strong>向いていない：</strong>
                  {m.bad}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="matrix">
          <SectionHead eyebrow="MATRIX" title="どれを選ぶかの早見表" />
          <div className="compare-wrap">
            <table className="compare">
              <thead>
                <tr>
                  {MATRIX.cols.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.rows.map((row) => (
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

        <section className="section" id="steps">
          <SectionHead eyebrow="HOW TO" title="写真1枚からの作り方（当サイトの5ステップ）" />
          <Steps steps={STEPS} />
          <div className="hero-ctas">
            <Link href="/templates" className="btn btn-primary btn-lg">
              型を選んで、写真1枚から試す
            </Link>
          </div>
          <p className="fine">
            配置の確認まで無料、カード登録は不要です。気に入った型だけ書き出します（1本980円・税込）。完成した8〜10秒が見えるのは、書き出しのあとです。
          </p>
        </section>

        <section className="section" id="tips">
          <SectionHead eyebrow="TIPS" title="失敗しないコツ" />
          <div className="tips">
            {TIPS.map((t) => (
              <article key={t.h} className="tip">
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="decide">
          <SectionHead eyebrow="DECIDE" title="型が決まらない時の3つの質問" />
          <div className="prose">
            {DECIDE.map((p) => (
              <p key={p.slice(0, 16)}>{p}</p>
            ))}
          </div>
        </section>

        <section className="section" id="faq">
          <SectionHead eyebrow="FAQ" title="よくある質問" />
          <FaqList items={FAQ} />
        </section>

        <section className="section" id="changelog">
          <SectionHead eyebrow="LOG" title="更新記録" />
          <ul className="changelog">
            {CHANGELOG.map((x) => (
              <li key={x.date}>
                <time dateTime={x.date}>{x.date}</time>
                <span>{x.text}</span>
              </li>
            ))}
          </ul>
          <p className="fine">更新日は、本文を実際に直したときだけ動かします。</p>
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
            {SITE.name}
            は、文中に触れる映像・楽曲・モデル名・サービス名の権利者とは無関係の独立したサービスです。表記しているツール名は、それぞれの所有者に帰属します。紹介する第三者のツールに関する記述は、2026年10月時点の公開情報に基づきます。
          </p>
        </section>
      </div>
      <CtaBand title="型を選んで、まずは配置を見てみませんか。" href="/templates" />
    </main>
  );
}
