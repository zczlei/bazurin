import { maxImageMbLabel } from "@/lib/upload-limit";

export type EffectTemplate = {
  id: string;
  name: string;
  /** Short Japanese label shown on the style card (e.g. 「あの構図そのもの」). */
  tagline?: string;
  blurb: string;
  /** Sent to the video provider; English reads more reliably for current models. */
  promptHint: string;
};

/** Visual theme for the free canvas preview and the CSS cover art. */
export type EffectScene = "booth" | "party" | "redroom" | "rain" | "zombie" | "pet";

export type EffectDefinition = {
  slug: string;
  /** Trend name as Japanese users search it (kept in English). */
  name: string;
  title: string;
  h1: string;
  lede: string;
  description: string;
  cardBlurb: string;
  accent: string;
  accent2: string;
  scene: EffectScene;
  category: "duet" | "dance" | "cinematic" | "horror";
  durationSec: number;
  aspectRatio: "16:9" | "9:16";
  subjects: 1 | 2;
  featured?: boolean;
  seoKeywords: string[];
  templates: EffectTemplate[];
  /** 「このトレンドとは」 */
  about: string[];
  aboutTitle?: string;
  /** 「具体的な作り方」 */
  steps: { title: string; body: string }[];
  stepsTitle?: string;
  /** Optional 「プロンプト」 section (#prompt) for trends people search with プロンプト. */
  promptGuide?: {
    title: string;
    paragraphs: string[];
    boxLabel: string;
    order: string;
    recipe: string;
    outro: string;
  };
  /** 「写真の条件」 */
  photoTips: { title: string; body: string }[];
  photoTipsTitle?: string;
  photoTipsLede?: string;
  cta?: { title: string; sub: string };
  faq: { q: string; a: string }[];
  /** Overrides the default hero badges. */
  badges?: string[];
  /** Shown as a boxed note under 「このトレンドとは」 (e.g. no official affiliation). */
  disclaimer?: string;
  extraSpecs?: [string, string][];
  /** ISO date of the last content update (sitemap lastModified). */
  updated: string;
  /** Replaces the generator’s default “顔と上半身” hint. */
  uploadHint?: string;
  /** Replaces the single-photo drop label 「写真を選ぶ」. */
  slotLabel?: string;
  compare?: {
    title: string;
    intro: string;
    cols: [string, string, string];
    rows: [string, string, string][];
    note: string;
  };
  related?: { href: string; anchor: string; desc: string }[];
};

const COMMON_FAQ = {
  music: {
    q: "曲は入っていますか？",
    a: "音源は付属しません。投稿時にTikTok・Instagram・YouTubeのサウンドから楽曲をお選びください。各プラットフォームの楽曲ライブラリを使うのが、著作権の面でもいちばん安全な方法です。",
  },
  commercial: {
    q: "商用利用はできますか？",
    a: "個人SNSへの投稿を前提としています。広告・商品販売・案件投稿などの商用利用はできません。",
  },
  others: {
    q: "他人や有名人の写真は使えますか？",
    a: "ご本人、またはご家族・ご友人など承諾を得ている方の写真のみご利用ください。有名人やタレントの肖像を使った動画の生成・投稿はお断りしています。",
  },
};

export const EFFECTS: EffectDefinition[] = [
  {
    slug: "hotel-lobby",
    updated: "2026-10-13",
    name: "Hotel Lobby",
    title: "ホテルロビーAI動画の作り方｜写真2枚でオレンジのデュエット",
    h1: "ホテルロビーAI動画の作り方｜写真2枚でオレンジのデュエットを",
    lede: "オレンジ色のブース、天井から吊るされたマイク、動かないカメラの前で2人が口を動かす。Migos「Hotel Lobby」× COLORS のブースを起点に、いままた広がっているあの形を、写真2枚から縦型9:16・10秒でそのまま再現します。プロンプトの入力はありません。",
    description:
      "Migos「Hotel Lobby」× COLORS のブース、あのオレンジの構図を写真2枚から縦型9:16で。プロンプト不要、左右の立ち位置は固定、配置プレビューはカード不要で無料。書き出しは1本780円（税込）から、音源は付属しません。",
    cardBlurb:
      "写真2枚で、オレンジ色のブースで向かい合うデュエット動画。Migos・COLORS風のあの構図を、そのまま再現できます。",
    accent: "#ff6a1f",
    accent2: "#ffb03a",
    scene: "booth",
    category: "duet",
    durationSec: 10,
    aspectRatio: "9:16",
    subjects: 2,
    featured: true,
    badges: ["写真2枚", "10秒・縦型9:16", "左右の位置は固定", "プレビューは無料", "カード不要", "アプリ不要"],
    seoKeywords: [
      "ホテルロビー ai動画",
      "ホテルロビー トレンド",
      "ホテルロビー ai動画 作り方",
      "ホテルロビー colors",
      "migos ホテルロビー ai動画",
      "ホテルロビー ブースフィルター",
      "ホテルロビー プロンプト",
      "hotel lobby ai video",
    ],
    templates: [
      {
        id: "classic-orange",
        name: "Classic Orange Booth",
        tagline: "あの構図そのもの",
        blurb:
          "オレンジ色のブース、天井から吊るされたマイク、全身が入る固定ショット。トレンドでみんなが真似しているのはこのスタイルです。",
        promptHint:
          "Two adults shown full body in a matte orange seamless booth, one black microphone hanging at center, soft even front light. The person from the left photo stays on the left and performs first while the person on the right nods, then they switch who performs. Positions never swap. Locked centered camera, visible feet, no zoom, no cuts. Keep both faces, hair, and outfits exactly from the reference photos. No face blending, no extra people, no text, no logos. Vertical 9:16.",
      },
      {
        id: "friends-couples",
        name: "Friends & Couples",
        tagline: "2人をはっきり左右に",
        blurb:
          "2人の主役をはっきり左右に離して配置します。顔が近い写真・寄り添った写真を使うときは、こちらが安定します。",
        promptHint:
          "Two adults shown full body with clear space between them in a matte orange seamless booth, one black microphone hanging at center. The left photo stays on the left and the right photo stays on the right. They smile and point across the gap. Positions never swap. Locked centered camera, visible feet, no zoom, no cuts. Keep both faces and outfits. No face blending, no extra people, no text, no logos. Vertical 9:16.",
      },
      {
        id: "pets",
        name: "Rapping Pets",
        tagline: "ペット2匹で",
        blurb: "犬や猫を2匹並べる派生形。毛並みや柄の個性はそのままに、口と体の動きをつけます。",
        promptHint:
          "Two pets shown full body side by side in a matte orange seamless booth, one black microphone hanging at center. The left pet stays left and the right pet stays right while they bob their heads. Locked camera, no cuts, no extra animals. Keep fur color and markings from the reference photos. No text, no logos. Vertical 9:16.",
      },
    ],
    aboutTitle: "ホテルロビーAI動画トレンドとは",
    about: [
      "形はとても単純です。オレンジ色に照らされたロビーで、2人の主役が並び、天井から吊るされたマイクに向かって口を動かす。カメラは固定されたミディアムショットのまま動かず、2人は揃ったリズムで体を揺らします。ミュージックビデオのデュエットのように撮られたこの形が、TikTok・Instagram Reels・YouTube Shorts で次々と真似されています。",
      "発端は Migos の「Hotel Lobby」——Quavo と Takeoff のトラック——にのせて撮られた、COLORS のブース・パフォーマンスです。そのためこのトレンドは「ホテルロビー COLORSトレンド」「Migos ホテルロビー AI動画」「ホテルロビーブースフィルター」とも呼ばれていて、検索される呼び方がいくつかに分かれています。",
      "ただし元映像はライセンスされたミュージックビデオなので、切り貼りして加工するやり方では、投稿できるものは残りません。実際に投稿できるのは、自分たちの写真から作った動画です。写真2枚と、この構図を固定したテンプレートがあれば、10秒の縦型動画が完成します。",
    ],
    disclaimer:
      "本ページはトレンドの作り方を解説する情報ページです。バズリンは Migos 氏、COLORS、および楽曲・映像の関連権利者とは一切関係を持っていません。元映像の編集・再配布は行っていません。",
    stepsTitle: "写真2枚からホテルロビー動画を作る3ステップ",
    steps: [
      {
        title: "2人の写真を用意する",
        body: "主役は2人だけ。「左の人」の枠に入れた写真が左、「右の人」の枠が右に固定され、動画の最後まで位置は動きません。友人・カップル・バンド仲間、自分の過去の写真との組み合わせでも、同じ形で作れます。",
      },
      {
        title: "1人1枚の正面顔をアップロード",
        body: `1枚につき1人、正面またはやや斜め向きで、光が均一、頭と肩まで写っている写真を選びます。JPG・PNG・WebP・HEIC、1枚最大${maxImageMbLabel(2)}MB。サングラス、真横の顔、顔が重なった集合写真、圧縮されたスクリーンショットは避けてください。`,
      },
      {
        title: "無料で配置を確認してから、保存",
        body: "クレジットを使う前に、ブラウザ上でブースの配置・誰がどちらに立つか・画面の切れ方を確認できます。左右に納得できたら、1本780円（税込）で10秒の動画を書き出します。",
      },
    ],
    promptGuide: {
      title: "ホテルロビーAI動画のプロンプト（バズリンでは書きません）",
      paragraphs: [
        "Reddit や TikTok には「オレンジ色のホテルロビー、吊るされたマイク、2人のラッパー、カメラ固定、リップシンク、10秒」と書き連ねた、長いプロンプトのレシピが出回っています。こうしたプロンプトが必要になるのは、多くの画像→動画ツールがユーザーに文章を書かせるからです。",
        "バズリンでは書きません。画角・ブースの灯り・マイクの位置・2人の左右の配置は、あなたの文章ではなくテンプレート側で決まるためです。他のツールでクレジットを無駄にする2大原因——カメラが勝手に動く、フレームごとに2人の左右が入れ替わる——を、仕組みの側で防いでいます。",
      ],
      boxLabel: "他の生成ツールで組む場合の、崩れにくい順番",
      order:
        "① 人数と位置 → ② 場所と灯り → ③ カメラの挙動 → ④ 動き → ⑤ 長さ。「動くもの」だけでなく「変わらないもの」を先に指定してください。",
      recipe: [
        "2人の人物が並んで立ち、左と右の位置は固定。",
        "オレンジ色に照らされたブース、",
        "2人の間に天井から吊るされたマイク。",
        "固定したミディアムショット、カメラは動かさない。",
        "2人とも最後まで同じ側に立ったまま、口を動かす。",
        "縦型9:16、長さ10秒。",
      ].join("\n"),
      outro: "…と書くくらいなら、写真を2枚選んでプレビューを押すほうが早いです。",
    },
    photoTipsTitle: "仕上がりが変わる・写真の条件",
    photoTipsLede:
      "うまくいかない生成のほとんどは、モデルではなく写真が原因です。アップロードする前に、この6項目だけ確認してください。クレジットを1回分節約できます。",
    photoTips: [
      {
        title: "顔がはっきり見えること",
        body: "帽子のつば、手で口元を隠した写真、ブレた写真では顔の一致率が下がります。柔らかい順光の正面か、斜め45度くらいの向きがいちばん安定します。",
      },
      {
        title: "1枚に1人",
        body: "アップロード1件を1人の主役として扱います。2人が同じ写真に写っていると、違う顔を動かそうとします。必ず別々の2枚にしてください。",
      },
      {
        title: "2枚の構図と大きさを揃える",
        body: "頭と肩のサイズがほぼ同じ2枚が、いちばん自然なデュエットになります。全身写真と顔のアップのセルフィーを組み合わせると、2人の大きさがちぐはぐになります。",
      },
      {
        title: "頭の上に余白を残す",
        body: "この画面には、2人の間に吊るされたマイクが入ります。頭の上に少し余白がないと、マイクが頭にかぶってしまいます。",
      },
      {
        title: "背景は単色、または暖色",
        body: "最終的にオレンジのブースに合成されるため、ごちゃついた背景はノイズになるだけです。",
      },
      {
        title: "ペットの場合",
        body: "Rapping Pets では、顔と耳の模様がはっきり写っている写真ほど、動き出した後も「その子」だと分かるままになります。",
      },
    ],
    extraSpecs: [
      ["料金", "1本780円（税込）／3本1,980円／10本4,880円。月額課金なし・クレジットに有効期限なし"],
      [
        "アカウント",
        "不要。ゲストのまま生成・ダウンロードできます。Googleログインでクレジットを端末間で引き継げます",
      ],
      ["生成に失敗したとき", "クレジットは自動で返却されます"],
      [
        "公式関係",
        "ありません。Migos 氏、COLORS、および楽曲・映像の関連権利者とは無関係の独立したサービスです",
      ],
    ],
    faq: [
      {
        q: "ホテルロビーAI動画トレンドとは何ですか？",
        a: "2人の主役がオレンジ色のロビーに立ち、天井から吊るされたマイクに向かって口を動かす、ミュージックビデオ風のデュエット動画のトレンドです。Migos の「Hotel Lobby」（Quavo と Takeoff のトラック）にのせて撮られた COLORS のブース・パフォーマンスの形が元になっており、今年に入って TikTok と Reels で再び広がっています。呼び方も複数あり、「ホテルロビー COLORSトレンド」「Migos ホテルロビー AI動画」「ホテルロビーブースフィルター」などで検索されています。",
      },
      {
        q: "写真は2枚必要ですか？",
        a: "2枚です。1人につき1枚をご用意ください。「左の人」「右の人」の枠に入れた写真がそのまま左右の立ち位置になり、動画の最後まで変わりません。主役が1人のトレンド（Bulin 47 など）は写真1枚で作れます。",
      },
      {
        q: "元動画（ミュージックビデオ）を使っているのですか？",
        a: "使っていません。元の映像はライセンスされたミュージックビデオのため、それを編集・再配布する形では、投稿できるものは作れません。バズリンはあなたの2枚の写真から新しいシーンとして生成します。オレンジ色の灯り、吊るされたマイク、画面の構図だけを受け継ぎ、主役は完全にあなたの写真です。",
      },
      {
        q: "プロンプトはどう書けばいいですか？",
        a: "書く必要はありません。この形をプロンプトで再現しようとすると、カメラが勝手に動く、2人の左右がフレームごとに入れ替わる、という2つの失敗が起きやすく、クレジットを無駄にします。バズリンでは画角・ブースの灯り・マイクの位置・左右の配置がテンプレート側で固定されています。他の生成ツールで組む場合の順番は、①人数と位置 ②場所と灯り ③カメラの挙動 ④動き ⑤長さ です。動くことだけでなく「変わらないこと」を先に指定してください。",
      },
      {
        q: "曲（音源）は入っていますか？",
        a: "入っていません。動画は音なしで完成します。投稿する際に TikTok・Instagram Reels・YouTube Shorts のサウンドライブラリから楽曲を選んでください。各プラットフォームのライセンスの範囲内で使える、いちばん安全な方法です。",
      },
      {
        q: "無料で試せますか？",
        a: "配置のプレビューは無料で、クレジットカードの登録も不要です。写真2枚をアップロードすると、ブラウザ上でオレンジのブースの画角、マイクの位置、誰がどちらに立つかを確認できます。納得できた方だけ、1本780円（税込）で本編を書き出します。月額課金や自動更新はありません。",
      },
      {
        q: "カップル・友人・ペットでも使えますか？",
        a: "使えます。トレンド本来の形なら Classic Orange Booth、2人の距離が近く顔が重なりそうな写真なら Friends & Couples、2匹とも人間でない場合は Rapping Pets を選んでください。",
      },
      {
        q: "他人や有名人の写真は使えますか？",
        a: "ご本人または承諾を得ている方のみご利用ください。有名人の写真を無断で主役にした動画の生成・投稿は利用規約で禁じています。個人SNSでの利用を前提としており、広告・商品販売などの商用利用はできません。",
      },
    ],
    cta: {
      title: "2人の写真を上げて、まずは配置を見てみませんか。",
      sub: "クレジットカードもアプリも不要です。画角と左右が決まったところまで、無料で確認できます。",
    },
  },
  {
    slug: "bulin-47",
    name: "Bulin 47",
    title: "Bulin 47 AI動画の作り方｜写真1枚でフリースタイルの主役に",
    h1: "Bulin 47 AI動画の作り方｜写真1枚でフリースタイルの主役に",
    lede: "赤い照明のライブハウス、群衆をかき分けるスマホカメラ、その前でもう一人がラップをする。Bulin 47 × Kevin Wai をきっかけに広がったあのフリースタイルの形を、写真1枚から縦型9:16・10秒でそのまま再現します。プロンプトの入力はありません。",
    description:
      "写真1枚で、赤い照明のライブハウスの主役に。Bulin 47 × Kevin Wai のフリースタイルトレンドを、プロンプト入力なしで縦型9:16・10秒のまま生成します。配置プレビューは無料、書き出しは1本780円（税込）から。",
    cardBlurb: "写真1枚で、赤い照明のライブハウスでフリースタイルをする主役に。",
    accent: "#ff2e55",
    accent2: "#ff8a3d",
    scene: "redroom",
    category: "dance",
    durationSec: 10,
    aspectRatio: "9:16",
    subjects: 1,
    updated: "2026-10-13",
    badges: ["写真1枚", "10秒・縦型9:16", "プレビューは無料", "会員登録不要", "アプリ不要"],
    seoKeywords: [
      "bulin 47",
      "bulin 47 ai",
      "bulin 47 プロンプト",
      "bulin 47 チュートリアル",
      "bulin 47 作り方",
      "kevin wai bulin 47",
    ],
    templates: [
      {
        id: "freestyle-lead",
        name: "Freestyle Lead",
        blurb: "赤い照明のライブハウスのど真ん中。定番のあの構図。",
        promptHint:
          "One person rapping a freestyle as the lead performer in the middle of a red-lit live venue, the crowd holding phones up, a handheld vertical phone camera pushing through the crowd toward the subject, dembow rhythm body moves, vertical 9:16, keep the subject's face identity and outfit from the photo, cinematic social video, not a celebrity likeness",
      },
      {
        id: "crowd-hype",
        name: "Crowd Hype",
        blurb: "群衆の輪の中、スマホを掲げる視線の先へ。テンション高めの1カット。",
        promptHint:
          "One person freestyling inside a tight circle of a hyped night crowd with phones raised, deep red lighting, energetic shaky handheld camera, vertical 9:16, keep face identity and outfit from the photo",
      },
      {
        id: "character-recast",
        name: "Character Recast",
        blurb: "キャラやスタンの一枚を主役に据える。使える素材かどうかはご自身で確認してください。",
        promptHint:
          "A stylized character as the lead freestyle performer in a red-lit live venue, crowd with phones raised, handheld camera energy, vertical 9:16, keep the distinctive look from the reference image",
      },
    ],
    about: [
      "Bulin 47 はドミニカ共和国のデムボウ（Dembow）アーティストで、Kevin Wai との組み合わせのフリースタイル映像を起点に、SNSで大きなトレンドになりました。西語圏のメディア（Telenoticias など）も「SNSで勢いづいているトレンドの主人公」として取り上げています。",
      "形はとても単純です。赤く光るライブ会場で、群衆がスマホを掲げ、その前にもう一人が即興のラップをする。手ブレする縦持ちカメラが群衆をかき分けて主役に寄っていく——この「空気感」が、いまの TikTok・Instagram Reels・YouTube Shorts で一瞬で伝わるため、次々と投稿が生まれています。",
      "元動画に自分の顔を乗せ換える「face swap」型のサイトもありますが、それは元映像に依存する作りです。バズリンはあなたの写真から新しいシーンとして生成します。元映像を編集・再配布するものではないので、赤い照明と手ブレの質感はそのままに、写真1枚で完成します。",
    ],
    disclaimer:
      "本ページはトレンドの作り方を解説する情報ページです。バズリンは Bulin 47 氏、Kevin Wai 氏、および楽曲・映像の関連権利者とは一切関係がありません。",
    steps: [
      {
        title: "写真を選ぶ",
        body: "スマホのアルバムから、正面を向いた1枚を選択します。加工・切り抜きは不要です。",
      },
      {
        title: "スタイルを決める",
        body: "Freestyle Lead が定番の赤い部屋。群衆の熱量を強めたいなら Crowd Hype、キャラを使いたいなら Character Recast。",
      },
      {
        title: "プレビューして、保存",
        body: "動画になる前の「配置」を無料でご確認ください。納得できたら1本780円（税込）で書き出します。音源は入りません。",
      },
    ],
    photoTips: [
      { title: "両目が見えていること", body: "前髪や手で目を隠した写真だと、顔の一致が甘くなります。" },
      {
        title: "1人の写真を使う",
        body: "このトレンドは主役1人。複数人が写っている写真は先に切り抜いてください。",
      },
      {
        title: "上半身まで入れる",
        body: "頭だけのトリミングより、肩と服装まで写っているほうが動きが自然に出ます。",
      },
      {
        title: "光のムラが少ない1枚",
        body: "強い逆光・夜の繁華街のような色被りは、赤い照明と混ざって潰れます。",
      },
      {
        title: "サングラスは避ける",
        body: "元動画では定番の小道具ですが、入力写真で目を覆うと顔の一致率が落ちます。",
      },
      { title: "使える写真だけを", body: "ご本人・ご家族・承諾のある友人の写真のみご利用ください。" },
    ],
    extraSpecs: [
      ["アカウント", "不要。ゲストのままプレビューまで可能です"],
      [
        "公式関係",
        "ありません。Bulin 47 氏および関連する権利者とは無関係の独立したサービスです",
      ],
    ],
    faq: [
      {
        q: "Bulin 47 AI動画とは何ですか？",
        a: "ドミニカ共和国のデムボウ（Dembow）アーティスト Bulin 47、そして Kevin Wai との組み合わせをきっかけに広がったフリースタイル系の動画トレンドに、自分の姿を合成する作り方のことです。赤く光るライブ会場で、群衆をかき分けるスマホカメラの前にもう一人がラップをする、あの構図を写真1枚から再現します。",
      },
      {
        q: "写真は1枚だけ必要ですか？",
        a: "1枚です。このトレンドは主役が1人の構図のため、Hotel Lobbyのように2枚を用意する必要はありません。複数人が写っている写真を使う場合は、主役だけ切り抜いてからアップロードしてください。",
      },
      {
        q: "プロンプトを書かないと作れませんか？",
        a: "書きません。照明・群衆の熱量・手ブレの空気感はテンプレート側で固定しています。プロンプトを打つ生成ツールだと、モデルが勝手に別のクラブシーンを作り、結果として「あのトレンド」に見えなくなるという失敗が起きます。バズリンではその失敗を構造的に消しています。",
      },
      {
        q: "曲（音源）は入っていますか？",
        a: "入っていません。動画は音なしで完成します。投稿する際に TikTok・Instagram Reels・YouTube Shorts のサウンドセレクションから、トレンドで使われている楽曲を選んでください。著作権・利用範囲の心配なくお試しいただける形にしています。",
      },
      {
        q: "Bulin 47 の公式サービスですか？",
        a: "いいえ。当社は Bulin 47 氏、Kevin Wai 氏、および楽曲・映像の関連権利者とは一切関係を持っていません。本ページはトレンドの作り方を解説する情報ページであり、元映像を編集・再配布するものではありません。あなたの写真から新しいシーンを生成します。",
      },
      {
        q: "有料ですか？いくらですか？",
        a: "配置のプレビューは何度でも無料です。書き出しは1本780円（税込）の都度課金で、月額課金やサブスクはありません。3本1,980円、10本4,880円のパックが1本あたり単価でお得です。生成に失敗した回はクレジットを戻します。",
      },
      {
        q: "スマホだけでも作れますか？",
        a: "作れます。iPhone・Android ともにブラウザだけで完結し、アプリのインストールは不要です。アルバムから写真を選ぶだけで縦型9:16の動画が書き出せます。",
      },
      {
        q: "他人や有名人の写真は使えますか？",
        a: "ご本人または承諾を得ている方のみご利用ください。有名人・タレントの肖像を使った動画の生成や、本人のふりをする投稿は利用規約で禁じています。個人SNSでの利用を前提としており、広告などの商用利用はできません。",
      },
    ],
  },
  {
    slug: "burning-bridges",
    updated: "2026-10-13",
    name: "Burning Bridges",
    title: "Burning Bridges AI動画の作り方｜写真1枚でパーティーの主役に",
    h1: "Burning Bridges AI動画の作り方｜写真1枚でシャンデリアの部屋の主役に",
    lede: "シャンデリアの灯るプライベートダイニング、混んだ部屋をかき分けるハンドヘルドのカメラ、掲げられた金属のカップ、そしてカメラにまっすぐ振る手。写真1枚で、ドレイク「Burning Bridges」を起点に広がったあのパーティーの形を、10秒・縦型9:16でそのまま再現します。プロンプトの入力はありません。",
    description:
      "ドレイク「Burning Bridges」のシャンデリアの部屋、あのパーティー動画を写真1枚から。プロンプト不要、金属のカップと「Where she at?」の仕草も選べます。配置プレビューはカード不要で無料、書き出しは1本780円（税込）から。",
    cardBlurb:
      "写真1枚で、シャンデリアの部屋でカップを掲げるパーティーの主役に。ドレイク「Burning Bridges」のあの構図。",
    accent: "#e0a43a",
    accent2: "#ff6b3d",
    scene: "party",
    category: "cinematic",
    durationSec: 10,
    aspectRatio: "9:16",
    subjects: 1,
    badges: ["写真1枚", "10秒・縦型9:16", "プレビューは無料", "会員登録不要", "ペットも可", "アプリ不要"],
    seoKeywords: [
      "burning bridges ai",
      "burning bridges ai動画",
      "burning bridges ai video 作り方",
      "drake burning bridges ai動画",
      "バーニングブリッジズ ai",
      "where she at ai",
    ],
    templates: [
      {
        id: "chandelier-party",
        name: "Chandelier Party",
        tagline: "定番のあの部屋",
        blurb:
          "混んだ個室、温かい金色の灯り、水晶のシャンデリア。カメラにまっすぐ振る手と金属のカップ。トレンドでいちばん多く真似されている形です。",
        promptHint:
          "One person stays in one packed private dining room under crystal chandeliers for the whole clip, warm golden light, handheld camera moving through the crowd toward them. A metal cup stays in their hand the entire time as they raise it and wave at the lens. Friends crowd behind. Single continuous shot, do not cut to another room. Keep face, hair, and outfit from the photo. No celebrity likeness, no text, no logos. Vertical 9:16.",
      },
      {
        id: "where-she-at",
        name: "Where She At?",
        tagline: "仕草まで入れる",
        blurb:
          "手のひらで目の上を覆いながら部屋を見渡す、あの一拍を入れるスタイル。音のタイミングに映像を寄せたい方向けです。",
        promptHint:
          "One person stays in the same chandelier-lit party room for the whole clip. They cover their eyes with one palm and look around the room, and they do that searching gesture only twice. A silver cup stays in the other hand the entire time, with small finger flicks toward the lens. Crowded friends behind, warm film light. Single continuous shot, do not cut to another room. Keep face identity from the photo. Vertical 9:16.",
      },
      {
        id: "party-pet",
        name: "Party Pet",
        tagline: "ペットを主役にする",
        blurb:
          "犬や猫をパーティーの主役の位置に立たせる派生形。毛並みと柄の個性はそのままに、少し得意げな立ち姿の動きをつけます。",
        promptHint:
          "One pet stands upright as the star of the same chandelier party room for the whole clip. A silver cup stays raised while it waves at the handheld camera. Warm golden light, friends in soft focus behind. Single continuous shot, do not cut away. Keep fur markings from the photo. No extra animals, no text. Vertical 9:16.",
      },
    ],
    aboutTitle: "Burning Bridges AI動画トレンドとは",
    about: [
      "いま真似されているのは、シャンデリアが灯る個室のパーティーの一場面です。ハンドヘルドのカメラが人混みの中を進んでいくと、周りの友人がレンズに集まり、金属のカップが掲げられ、主役がカメラに向かって手を振る。温かい金色の灯りと少し揺れる手ブレが、「本物のパーティー映像」らしさをつくっています。",
      "発端はドレイクの「Burning Bridges」のミュージックビデオとされ、多くのバージョンでは「Where she at?」の仕草——手のひらで目の上を覆いながら部屋を見渡す、あの一拍——まで再現されています。呼び方も分かれていて、「burning bridges ai」「drake burning bridges ai動画」「バーニングブリッジズ AI」などで検索されています。",
      "似た作りに、元映像へ顔を合成する face swap 系のサイトがあります。ただ、元映像はライセンスされたミュージックビデオなので、切り貼りで加工するやり方では権利の問題で投稿できるものが残りにくくなります。バズリンはあなたの写真から新しいシーンとして生成します。シャンデリアの灯り、カップ、手を振る動きといった「形」だけを受け継ぎ、主役は完全にあなたの写真です。",
    ],
    disclaimer:
      "本ページはトレンドの作り方を解説する情報ページです。バズリンは Drake 氏、および楽曲・映像の関連権利者とは一切関係を持っていません。元映像の編集・再配布は行っていません。",
    stepsTitle: "写真1枚からBurning Bridges動画を作る3ステップ",
    steps: [
      {
        title: "主役の1枚を選ぶ",
        body: "このトレンドの主役は1人だけ。セルフィー、全身写真、ペットの写真でも、同じ形で作れます。服装やアクセサリーまで写っている写真だと、その質感がパーティーのシーンに持ち込まれます。集合写真の場合は、先に1人分だけ切り抜いてください。",
      },
      {
        title: "正面の鮮明な1枚をアップロード",
        body: `正面または斜め向きで、光が均一、顔がはっきりしていて、肩（できれば腰）まで写っている写真を選びます。JPG・PNG・WebP・HEIC、1枚最大${maxImageMbLabel(1)}MB。強いフィルター、直接のフラッシュ、目を隠すサングラス、ブレた写真は避けてください。生成側は写っているものしか使えません。`,
      },
      {
        title: "スタイルを選んで、プレビューして、保存",
        body: "定番の部屋なら Chandelier Party、仕草まで入れたいなら Where She At?、ペットなら Party Pet。配置を無料で確認してから、1本780円（税込）で10秒の縦型動画を書き出します。曲は入りません。",
      },
    ],
    promptGuide: {
      title: "Burning Bridges AI動画のプロンプト（バズリンでは書きません）",
      paragraphs: [
        "プロンプト型の生成ツールでは、シャンデリアの個室、ハンドヘルドのカメラ、金属のカップ、手を振る動き、Where she at? の仕草、顔は写真のまま保つこと、10秒・縦型——これをまとめて入力する必要があります。そうした「レシピ」が出回るのは、プロンプト型のツールが撮影プランをあなたに任せているからです。",
        "その結果、よくある失敗は2つ。カメラが見知らぬクラブのシーンへ流れていくこと、そして顔がアップロードした写真からずれていくこと。どちらもクレジットを1回無駄にします。バズリンでは部屋の熱気・灯り・カップ・仕草の選択肢がテンプレート側で固定されているので、選ぶのは写真1枚とスタイルだけです。",
      ],
      boxLabel: "別のアプリで組む場合の、崩れにくい順番",
      order:
        "① 主役と顔の指定 → ② 場所と灯り → ③ カメラの挙動 → ④ 動き → ⑤ 長さ。「動くもの」だけでなく「変わらないもの」を先に書くのが、この形を崩さないコツです。",
      recipe: [
        "主役は1人。顔と服装は写真のまま保つ。",
        "水晶のシャンデリアが灯る、混んだ個室のパーティー、温かい金色の光。",
        "ハンドヘルドのカメラが人混みを進み、主役に寄る。",
        "主役は金属のカップを掲げ、カメラに手を振る。",
        "縦型9:16、長さ10秒。",
      ].join("\n"),
      outro: "…と書くくらいなら、写真を1枚選んでプレビューを押すほうが早いです。",
    },
    photoTipsTitle: "仕上がりが変わる・写真の条件",
    photoTipsLede:
      "うまくいかない生成のほとんどは、モデルではなく写真が原因です。アップロードする前に、この6項目だけ確認してください。",
    photoTips: [
      {
        title: "両目が見えていること",
        body: "前髪や手で顔を隠した写真、ブレた写真では顔の一致率が下がります。柔らかい順光の正面か、斜め向きがいちばん安定します。",
      },
      {
        title: "1枚に1人",
        body: "アップロード1件を1人の主役として扱います。2人が同じ写真に写っていると、違う人を動かそうとします。必ず1人だけの写真にしてください。",
      },
      {
        title: "上半身〜全身で撮る",
        body: "腰から上、または全身の写真なら、服装そのものがパーティーの装いに反映されます。顔だけの接写だと、服の情報を生成側が補うしかなくなります。",
      },
      {
        title: "露出を揃える",
        body: "強いネオンフィルター、暗い部分が潰れた写真、直接のフラッシュは避けてください。部屋の灯りはもともと暖かくにぎやかなので、写真側の色被りはノイズになります。",
      },
      {
        title: "ペットの場合",
        body: "顔と柄の特徴がはっきり写っている写真を使ってください。Party Pet はその柄を保ったまま、二本足で立つパーティーのポーズをつけます。",
      },
      {
        title: "使える写真だけを",
        body: "ご本人・ご家族・承諾のある方の写真のみご利用ください。有名人の写真を無断で主役にした生成・投稿は利用規約で禁じています。",
      },
    ],
    extraSpecs: [
      ["料金", "1本780円（税込）／3本1,980円／10本4,880円。月額課金・自動更新なし"],
      ["アカウント", "不要。ゲストのまま生成・ダウンロードできます"],
      ["生成に失敗したとき", "クレジットは自動で返却されます（有効期限もありません）"],
      ["公式関係", "ありません。Drake 氏および関連権利者とは無関係の独立したサービスです"],
    ],
    faq: [
      {
        q: "Burning Bridges AI動画トレンドとは何ですか？",
        a: "シャンデリアの灯る個室のパーティーで、あなたや友人、ペットが主役の位置に立つ短いAI動画のトレンドです。ハンドヘルドのカメラが混んだ部屋を進み、友人がレンズに集まり、金属のカップが掲げられ、主役がカメラへ手を振る。ドレイクの「Burning Bridges」のミュージックビデオから広がった形で、多くのバージョンでは「Where she at?」の仕草まで入ります。",
      },
      {
        q: "写真は1枚だけ必要ですか？",
        a: "1枚です。このトレンドは主役が1人の構図のため、Hotel Lobby のように2枚を用意する必要はありません。集合写真を使う場合は、主役だけ切り抜いてからアップロードしてください。",
      },
      {
        q: "ドレイクの元のMVを使っているのですか？",
        a: "使っていません。元映像はライセンスされたミュージックビデオで、顔を合成する face swap の方式はその映像に依存します。バズリンはあなたの写真から新しいパーティーのシーンとして生成します。形（灯り・カップ・手を振る動き）は受け継ぎますが、元映像を編集・再配布するものではありません。",
      },
      {
        q: "「Where She At?」とは何ですか？",
        a: "トレンドの多くのバージョンで入っている仕草で、手のひらで目の上を覆いながら部屋を見渡す、音の拍に合わせた一拍です。スタイルで Where She At? を選んだときだけ入ります。定番の部屋の構図だけが欲しい場合は Chandelier Party を選んでください。",
      },
      {
        q: "ペットやキャラクターでも作れますか？",
        a: "作れます。ペットなら Party Pet を選んでください。顔と柄がはっきり写っている写真ほど、動き出した後も「その子」だと分かるままになります。キャラクターの画像は Chandelier Party か Where She At? で、正面の顔が分かる1枚を使ってください。使える素材かどうかはご自身で確認してください。",
      },
      {
        q: "曲（音源）は入っていますか？",
        a: "入っていません。動画は音なしで完成します。投稿する際に TikTok・Instagram Reels・YouTube Shorts のサウンドライブラリから楽曲を選んでください。各プラットフォームのライセンスの範囲内で使える、いちばん安全な方法です。",
      },
      {
        q: "無料で試せますか？",
        a: "配置のプレビューは無料で、クレジットカードの登録も不要です。写真を1枚アップロードすると、シャンデリアの部屋での位置・顔の大きさ・画面の切れ方をブラウザ上で確認できます。納得できた方だけ、1本780円（税込）で本編を書き出します。",
      },
      {
        q: "スマホだけでも作れますか？",
        a: "作れます。iPhone・Android ともにブラウザだけで完結し、アプリのインストールは不要です。アルバムから写真を選ぶだけで、縦型9:16の10秒動画を書き出せます。",
      },
      {
        q: "他人や有名人の写真は使えますか？",
        a: "ご本人または承諾を得ている方のみご利用ください。有名人の写真を無断で主役にした動画の生成や、本人のふりをする投稿は利用規約で禁じています。個人SNSへの投稿を前提としており、広告・商品販売などの商用利用はできません。",
      },
    ],
    cta: {
      title: "写真1枚で、パーティーの主役の配置を見てみませんか。",
      sub: "クレジットカードもアプリも不要です。配置の確認までは無料です。",
    },
  },
  {
    slug: "rain-dance",
    updated: "2026-10-13",
    name: "Rain Dance",
    title: "レインダンスAI動画の作り方｜写真1枚・8秒で雨の中の主役に",
    h1: "Raindance（レインダンス）AI動画の作り方｜写真1枚で雨の中の1人ショットを",
    lede: "夜のネオンが路面に反射する、土砂降りの街。写真1枚から、雨に打たれて動くシネマティックな1人ショットを8秒・縦型9:16で生成します。やわらかい霧雨のスタイルも選べます。プロンプトの入力はありません。",
    description:
      "雨に打たれて動く、シネマティックな1人ショットを写真1枚から。夜のネオンの雨街と、やわらかい霧雨の2スタイル。プロンプト不要、8秒・縦型9:16で書き出します。配置プレビューはカード不要で無料、1本780円（税込）から。",
    cardBlurb: "写真1枚・8秒で、ネオンの雨街を動くシネマティックな1人ショット。",
    accent: "#2fb7ff",
    accent2: "#7a6bff",
    scene: "rain",
    category: "dance",
    durationSec: 8,
    aspectRatio: "9:16",
    subjects: 1,
    badges: ["写真1枚", "8秒・縦型9:16", "雨のスタイル2種", "プレビューは無料", "会員登録不要", "アプリ不要"],
    seoKeywords: [
      "rain dance ai",
      "raindance ai",
      "レインダンス ai動画",
      "rain dance ai video 作り方",
      "storm dance ai",
      "雨 動画 ai",
    ],
    templates: [
      {
        id: "night-rain",
        name: "Night Rain Street",
        tagline: "ネオンの土砂降り",
        blurb: "強い雨、路面の反射、夜の街の灯り。コントラストの効いた、いちばん映えるスタイルです。",
        promptHint:
          "One person dancing outdoors for the entire clip on a wet neon city street in heavy night rain. Raindrops hit their clothes, face, and the camera lens, with strong reflections on the ground. Do not move indoors and do not cut to another location. Keep face and outfit from the photo. Vertical 9:16.",
      },
      {
        id: "soft-drizzle",
        name: "Soft Drizzle",
        tagline: "やわらかい霧雨",
        blurb:
          "光を暖かく、雨を細くしたバージョン。顔立ちを柔らかく見せたいとき、日常の投稿に寄せたいときに合います。",
        promptHint:
          "One person moving gently outdoors for the entire clip in a fine warm drizzle. Light rain stays visible on their hair and on the camera lens. Do not move indoors and do not cut away. Emotional and calm. Keep face identity from the photo. Vertical 9:16.",
      },
    ],
    aboutTitle: "Raindance・Storm Dance・雨のAI動画——名前は3つ、作り方は2種類",
    about: [
      "いま「レインダンス」「Raindance」「Storm Dance」という名前で検索されている動画には、実は2つの別々の形があります。混乱したまま探している方が多いので、先に分けておきます。",
      "① 2人がMVのワンシーンに登場する形。写真2枚を用意して、15〜30秒の尺でMVの場面に入るタイプです。② 1人の主役が雨の中で動く、シネマティックな1人ショット。夜景・ネオンの反射・強い雨、あるいはやわらかい霧雨の中で、主役がカメラに向かって動くタイプです。",
      "バズリンのこのページは、②の作り方です（写真1枚・8秒）。①の2人版は、現在のテンプレートには含まれていません。2人で作りたい場合は、写真2枚のデュエット Hotel Lobby が形としては近いテンプレートです。",
      "「Storm Dance（ストームダンス）」という呼び方は、アプリ側がキャンペーン名として使っているもので、中身は雨や嵐の中で静止画を動かす同じ系統のアイデアです。一方で「雨 動画」「雨風 AI」のように、ただ雨の映像を作りたいという探し方もされています。このページはどちらにも対応しています。",
      "プロンプト型の生成ツールで雨を頼むと、雨の量が足りなかったり、屋内の別のシーンに流れたりすることがあります。バズリンでは雨の密度、ネオンの反射、カメラとの距離がテンプレート側で固定されているため、写真を選ぶだけで雨の場面が決まります。",
    ],
    disclaimer:
      "本ページはトレンドの作り方を解説する情報ページです。バズリンは「Raindance」「Storm Dance」を含む各楽曲・映像の権利者、およびアプリ運営者と一切関係を持っていません。既存の映像の編集・再配布は行わず、あなたの写真から新しいシーンを生成します。",
    stepsTitle: "写真1枚からレインダンス動画を作る3ステップ",
    steps: [
      {
        title: "雨の中で動かしたい1枚を選ぶ",
        body: "正面または斜め向きで、顔と上半身がはっきり写っている写真がいちばん安定します。集合写真の場合は、先に1人分だけ切り抜いてください。全身が写っていると、服装まで雨のシーンに反映されます。",
      },
      {
        title: "雨のスタイルを2つから選ぶ",
        body: "ネオンが反射する土砂降りの街なら Night Rain Street、光を暖かくした細い雨なら Soft Drizzle。どちらにするかで雰囲気が大きく変わるので、書き出す前に決めてください。",
      },
      {
        title: "プレビューして、保存",
        body: "クレジットを使う前に、人物の位置と雨の場面をブラウザ上で確認できます。納得できたら1本780円（税込）で8秒・縦型9:16の動画を書き出します。曲は入りません。",
      },
    ],
    promptGuide: {
      title: "レインダンスAI動画のプロンプト（バズリンでは書きません）",
      paragraphs: [
        "雨を「降らせてください」とだけ頼むと、室内のシーンになってしまうことがあります。屋内ではないこと・夜であること・雨の量を先に固定するのが、崩さないコツです。",
        "バズリンでは天気・場所と照明・カメラの距離・動きがテンプレート側で決まっているので、あなたが選ぶのは写真1枚とスタイルだけです。",
      ],
      boxLabel: "別の生成アプリで組む場合の順番",
      order:
        "① 主役と顔 → ② 天気と時間帯 → ③ 場所と照明 → ④ カメラの距離と挙動 → ⑤ 動き → ⑥ 長さ。",
      recipe: [
        "主役は1人。顔と服装は写真のまま保つ。",
        "夜、屋外。強い雨が降っている。",
        "濡れた路面にネオンの光が反射する街。",
        "カメラは主役の正面、膝から上が入る距離。",
        "主役は雨に打たれながら、ゆっくり体を動かす。",
        "縦型9:16、長さ8秒。",
      ].join("\n"),
      outro: "…と書くくらいなら、写真を1枚選んでプレビューを押すほうが早いです。",
    },
    photoTipsTitle: "仕上がりが変わる・写真の条件",
    photoTipsLede:
      "うまくいかない生成のほとんどは、モデルではなく写真が原因です。アップロードする前に、この6項目だけ確認してください。",
    photoTips: [
      {
        title: "両目が見えていること",
        body: "前髪や手で目を隠した写真では、雨の中で動いたときに顔の一致が甘くなります。",
      },
      {
        title: "1枚に1人",
        body: "この形は主役1人のカットです。複数人が写っている写真だと、誰を動かすかを生成側が決められません。",
      },
      {
        title: "上半身〜全身で撮る",
        body: "頭だけのトリミングより、肩と服装まで写っているほうが、雨に濡れた質感がそのまま出ます。",
      },
      {
        title: "光のムラが少ない1枚",
        body: "強い逆光や直接のフラッシュの写真は、夜のネオンの照明と混ざって潰れます。柔らかい順光がいちばん安定します。",
      },
      {
        title: "表情は自然に",
        body: "雨の中の映像は動きで伝わるので、作り込んだ表情より、落ち着いた顔のほうが自然に仕上がります。",
      },
      {
        title: "使える写真だけを",
        body: "ご本人・ご家族・承諾のある方の写真のみご利用ください。",
      },
    ],
    extraSpecs: [
      ["料金", "1本780円（税込）／3本1,980円／10本4,880円。月額課金・自動更新なし"],
      ["アカウント", "不要。ゲストのまま生成・ダウンロードできます"],
      ["生成に失敗したとき", "クレジットは自動で返却されます（有効期限もありません）"],
      [
        "2人版について",
        "MVのワンシーンに2人が登場する形（写真2枚・15〜30秒）は、現在のテンプレートには含まれていません",
      ],
    ],
    faq: [
      {
        q: "Raindance AI動画トレンドとは何ですか？",
        a: "雨の中で人を動かす短いAI動画の呼び方です。検索されている名前には Raindance、レインダンス、Storm Dance があり、作る形は2種類に分かれます。2人がMVのワンシーンに登場するタイプ（写真2枚・15〜30秒）と、1人の主役が雨の中で動くシネマティックなタイプ（写真1枚）です。バズリンは後者、1人ショットの作り方を提供しています。",
      },
      {
        q: "レインダンスとストームダンスは何が違うのですか？",
        a: "呼び方の違いで、中身は同じ系統のアイデアです。Storm Dance はアプリ側がキャンペーン名として使っている呼称で、嵐や雨の中で静止画を動かすものです。どちらも「雨の中で動く1人の映像」を指して探されているため、このページでは両方の呼び方に触れています。",
      },
      {
        q: "写真は1枚ですか、2枚ですか？",
        a: "1枚です。バズリンのレインダンスは、主役1人の8秒のカットを作ります。出回っている2枚タイプのMVシーン（15〜30秒）とは別の形なので、2人で作りたい場合は Hotel Lobby（写真2枚のデュエット）をご覧ください。",
      },
      {
        q: "動画の長さと形式は？",
        a: "8秒・縦型9:16のMP4で書き出します。TikTok・Instagram Reels・YouTube Shorts にそのまま投稿できる形です。",
      },
      {
        q: "曲（音源）は入っていますか？",
        a: "入っていません。動画は音なしで完成します。投稿する際に TikTok・Instagram Reels・YouTube Shorts のサウンドライブラリから曲を選んでください。著作権や利用範囲の心配なく使える方法です。",
      },
      {
        q: "プロンプトを書かないと作れませんか？",
        a: "書きません。雨の密度、ネオンの反射、夜の街、カメラとの距離はテンプレート側で固定されています。プロンプトで雨を頼むと、室内のシーンに流れたり雨の量が足りなくなったりすることがありますが、バズリンではその失敗が起きにくい作りにしています。",
      },
      {
        q: "無料で試せますか？",
        a: "配置のプレビューは無料で、クレジットカードの登録も不要です。人物の位置と雨の場面をブラウザ上で確認してから、1本780円（税込）で書き出します。月額課金や自動更新はありません。生成に失敗した回はクレジットを返却します。",
      },
      {
        q: "スマホだけでも作れますか？",
        a: "作れます。iPhone・Android ともにブラウザだけで完結し、アプリのインストールは不要です。アルバムから写真を選ぶだけで、8秒の縦型動画を書き出せます。",
      },
      {
        q: "他人や有名人の写真は使えますか？",
        a: "ご本人または承諾を得ている方のみご利用ください。有名人の写真を無断で主役にした動画の生成・投稿は利用規約で禁じています。個人SNSへの投稿を前提としており、広告・商品販売などの商用利用はできません。",
      },
    ],
    cta: {
      title: "写真1枚で、雨の中の1人ショットを見てみませんか。",
      sub: "クレジットカードもアプリも不要です。配置の確認までは無料です。",
    },
  },
  {
    slug: "zombie-trend",
    updated: "2026-10-13",
    name: "Zombie Trend",
    title: "ゾンビAI動画の作り方｜写真1枚・8秒でハロウィン向けの変身カット",
    h1: "ゾンビAI動画の作り方｜写真1枚で、8秒の変身カットを",
    lede: "暗い街を、ゆっくりカメラに向かって歩いてくる。ホラー調の色味をのせた、8秒・縦型9:16のひとカット。いま広がっているAIゾンビのトレンドを、写真1枚だけで作ります。プロンプトの入力も、ゾンビメイクも不要です。",
    description:
      "写真1枚から、ゆっくりカメラへ歩いてくるホラー調のゾンビカットを8秒・縦型9:16で。プロンプト不要、加工もゾンビメイクもいりません。書き出しは1本780円（税込）、失敗時はクレジットを返却。ハロウィンの投稿に間に合う形です。",
    cardBlurb: "写真1枚で、暗い街をゆっくり歩いてくる8秒。ハロウィンの投稿に。",
    accent: "#7dff5a",
    accent2: "#2bd4a0",
    scene: "zombie",
    category: "horror",
    durationSec: 8,
    aspectRatio: "9:16",
    subjects: 1,
    badges: ["写真1枚", "8秒・縦型9:16", "メイク不要", "アプリ不要", "月額なし"],
    seoKeywords: [
      "ゾンビ ai動画",
      "aiゾンビ トレンド",
      "ゾンビ 変身",
      "ゾンビ アポカリプス 動画",
      "ゾンビ 加工",
      "zombie trend",
      "ハロウィン ai動画",
    ],
    templates: [
      {
        id: "street-zombie",
        name: "Street Zombie",
        tagline: "このテンプレート唯一のスタイル",
        blurb:
          "ゆっくりカメラへ向かって歩いてくる、ホラー調の色味の8秒。色は落ち、影は濃くなり、空気だけが先に怖くなります。",
        promptHint:
          "Single continuous shot of one person slowly walking toward a locked camera on a dark street at night. Pale muted colors, heavier shadows, slight fog. Slow walk only, no running, no hug, no second person, no gore, no blood, no cuts. Keep face identity and outfit from the photo. Vertical 9:16.",
      },
    ],
    aboutTitle: "いま広がっているAIゾンビ動画のトレンドとは",
    about: [
      "形は大きく2つに分かれています。1つは、写真2枚で作る物語版です。ゾンビになった人と、それに気づくもう1人。廃墟になった街で抱き合う場面や、回想からいまのゾンビへつなぐカットを、13〜15秒の続き映像として作るものです。「ゾンビハグ」「ゾンビ・ラブストーリー」とも呼ばれ、ペットを主役にする派生もあります。",
      "もう1つが、このページで作る写真1枚の単一カット版です。主役は1人だけで、暗い街をゆっくりカメラへ向かって歩いてくる。変身の過程そのものは演出せず、色味と動きだけをホラー寄りに落とすので、元の写真1枚と8秒だけで完成します。物語版のように2枚の写真を用意して順番を決める作業はありません。",
      "呼び方もいくつかに分かれています。「ゾンビAI動画」「AIゾンビトレンド」「ゾンビ変身」「ゾンビアポカリプス動画」「ゾンビ加工」。検索する人によって名前が違うので、どの形の話なのかを先に分けておくのが、このトレンドでは大事です。",
      "バズリンの Street Zombie は、ハロウィンの投稿向けです。仮装した本人が1人で映った写真、制服やスーツのままの1枚、バンドやホラー系アカウントのサムネイル。「誰かとの対比」ではなく「その人自身が歩いてくる」一発の映像が欲しいときに、2枚目がいらないこちらで済みます。",
    ],
    disclaimer:
      "本ページはトレンドの作り方を解説する情報ページです。当社は映像・楽曲・キャラクターの権利者とは一切関係を持っていません。元映像の編集・再配布は行わず、あなたの写真から新しいカットを生成します。",
    stepsTitle: "写真1枚からゾンビ動画を作る3ステップ",
    steps: [
      {
        title: "正面の写真を1枚アップロード",
        body: `1枚につき1人。柔らかい順光で、表情は作り込まないほうが、ホラー調の色味と噛み合います。JPG・PNG・WebP・HEIC、1枚最大${maxImageMbLabel(1)}MB。加工・切り抜き・エフェクトの事前準備は不要です。`,
      },
      {
        title: "Street Zombie を選んで生成",
        body: "スタイルは1つです。暗い街の色味、カメラへ向かってゆっくり歩いてくる動き、縦型9:16・8秒。この3つがテンプレート側で固定されているので、設定で迷う余地がありません。",
      },
      {
        title: "配置を確認して、保存",
        body: "クレジットを使う前に、ブラウザ上で配置を確認できます。気に入ったら1本780円（税込）で8秒の動画を書き出します。生成に失敗した回はクレジットが戻るので、別の写真で試しても損はしません。音源は入りません。",
      },
    ],
    promptGuide: {
      title: "ゾンビ動画のプロンプトは書かなくていい",
      paragraphs: [
        "いま出回っている解説の多くは、プロンプトを打つ形でこのトレンドを紹介しています。ただプロンプトで組むと、この形に特有の失敗が2つ起きやすい。1つは、色味だけが派手になって動きが一切変わらないこと。「zombie」「apocalypse」「cinematic」を並べると、モデルは背景を壊すほうに働きがちです。もう1つは、歩き方が不自然になること。カメラが近づくのか、主役が歩くのかを指定しないと、両方が同時に起きて酔うような動きになります。",
        "Street Zombie は、動くものと変わらないものを先に固定しています。変わらないのは色味と画面の枠、動くのは一歩ずつ前に出る足と、わずかにずれる視線です。だからプロンプトを書く必要がありません。",
      ],
      boxLabel: "他の生成ツールで自分で組む場合の順番",
      order: "① 人数 → ② 場所と色味 → ③ カメラの挙動 → ④ 歩く速さ → ⑤ 長さ。「変わらないこと」を先に指定してください。",
      recipe: [
        "主役は1人。顔は写真のまま保つ。",
        "夜の暗い街。ホラー調の色味、影は濃い。流血や過剰なグロはない。",
        "カメラは固定。近づかない。",
        "主役が、ゆっくり一歩ずつカメラへ歩いてくる。",
        "縦型9:16、長さ8秒。",
      ].join("\n"),
      outro: "…と書くくらいなら、写真を1枚選んでプレビューを押すほうが早いです。",
    },
    photoTipsTitle: "仕上がりが変わる・写真の条件",
    photoTipsLede:
      "うまくいかない生成のほとんどは、モデルではなく写真が原因です。アップロードする前に、この6項目だけ確認してください。",
    photoTips: [
      {
        title: "順光、または柔らかい正面の光",
        body: "強い逆光や夜の色被りは、ホラー調の色味と混ざって顔が潰れます。窓際の順光がいちばん安定します。",
      },
      {
        title: "表情は作り込まない",
        body: "笑顔や叫び顔の写真だと、ホラー調の表情とつながらず「加工した感じ」が出ます。無表情か、口角を少し落とした程度が自然です。",
      },
      {
        title: "1枚に1人だけ",
        body: "アップロード1件を1人の主役として扱います。2人が同じ写真に写っている場合は、先に主役だけを切り抜いてください。",
      },
      {
        title: "頭と肩がはっきり写っている",
        body: "胸から上が入っている写真がいちばん安定します。後ろ姿、横顔中心、帽子や髪で目が隠れている写真は一致率が落ちます。",
      },
      {
        title: "背景はごちゃついていないほうが有利",
        body: "暗い街のシーンに合成されるため、元の背景に人が多いとノイズになります。壁、夜道、単色の背景の1枚がきれいに出ます。",
      },
      {
        title: "縦構図の元写真が収まりやすい",
        body: "出力は縦型9:16です。横向きの全身写真を無理に入れると、人物の上下が切れます。胸から上を縦に収めた1枚を選んでください。",
      },
    ],
    extraSpecs: [
      ["人数", "1人のみ。2人で抱き合う物語版（写真2枚・13〜15秒）には対応していません"],
      ["料金", "1本780円（税込）／3本1,980円／10本4,880円。月額課金なし・クレジットに有効期限なし"],
      ["生成に失敗したとき", "クレジットは自動で返却されます"],
      [
        "アカウント",
        "不要。ゲストのまま生成・ダウンロードできます。Googleログインでクレジットを端末間で引き継げます",
      ],
      ["公式関係", "ありません。関連する映像・楽曲の権利者とは無関係の独立したサービスです"],
    ],
    faq: [
      {
        q: "AIゾンビ動画トレンドとは何ですか？",
        a: "写真に写った人がホラー調の映像になって動く、いま広がっている動画トレンドの総称です。作り方は2系統あります。写真2枚で、ゾンビになった人と気づくもう1人を並べ、廃墟の街で抱き合う場面や回想からのカットを13〜15秒の続き映像にする物語版（ゾンビハグ、ゾンビ・ラブストーリーとも呼ばれます）。そして、主役1人だけで暗い街をゆっくりカメラへ向かって歩いてくる単一カット版です。バズリンの Street Zombie は後者で、写真1枚・8秒で終わります。",
      },
      {
        q: "写真は1枚だけですか？2枚必要という話も見ました。",
        a: "1枚です。このテンプレートは主役1人の単一カットなので、2枚目を用意する必要はありません。誰かと抱き合う、対比する物語版（写真2枚・13〜15秒）は、このページでは作れません。2人版を探している場合は、その形を明記している他のツールを見たほうが早いです。",
      },
      {
        q: "ゾンビメイクや仮装をしていない写真でもできますか？",
        a: "できます。メイクを足す加工ではなく、色味・影・動きをホラー寄りに落とすものなので、素顔の普段の写真1枚から作れます。仮装やメイク済みの1枚でも、そのまま動かせます。",
      },
      {
        q: "プロンプトはどう書けばいいですか？",
        a: "書く必要はありません。色味、画面の枠、歩く速さはテンプレート側で固定されています。プロンプトで組むと、「色味だけ派手で動きが変わらない」「カメラが近づくのか主役が歩くのかが混ざって酔う動きになる」という2つの失敗が起きやすく、クレジットを無駄にします。",
      },
      {
        q: "曲（音源）は入っていますか？",
        a: "入っていません。動画は音なしで完成します。投稿する際に TikTok・Instagram Reels・YouTube Shorts のサウンドライブラリから、ゾンビ系でよく使われている音源を選んでください。音源を同封しないのは、第三者の音源を当社が付けられないためで、投稿時の著作権の心配がない形にしています。",
      },
      {
        q: "無料で試せますか？いくらですか？",
        a: "配置のプレビューは無料で、クレジットカードの登録も不要です。気に入った方だけ、1本780円（税込）で8秒の動画を書き出します。月額課金や自動更新はなく、3本1,980円、10本4,880円が1本あたりの単価でお得です。生成に失敗した回はクレジットが戻ります。プレビューで確認できるのは配置で、完成した8秒の動画そのものではありません。",
      },
      {
        q: "ハロウィンに間に合いますか？",
        a: "間に合います。配置の確認はその場で終わり、書き出しは数分です。TikTok や Reels は投稿日が大事なので、仮装やメイクの写真が残っているうちに、今週中に出すのがおすすめです。",
      },
      {
        q: "他人や有名人の写真は使えますか？",
        a: "ご本人または承諾を得ている方のみご利用ください。有名人・タレントの写真を無断で主役にした動画の生成や投稿は利用規約で禁じています。個人SNSでの利用を前提としており、広告・商品販売などの商用利用はできません。",
      },
    ],
    cta: {
      title: "写真1枚、8秒。まずは配置を確認してみませんか。",
      sub: "クレジットカードもアプリも不要です。配置の確認までは無料です。",
    },
  },
  {
    slug: "pet-dance",
    updated: "2026-10-12",
    name: "Pet Dance",
    title: "犬ダンスAI｜写真1枚から8秒で踊るペット動画に",
    h1: "犬ダンスAIの作り方｜写真1枚から、8秒・縦型9:16",
    lede: "「うちの子も踊らせてみたい」と思っても、いちばん多い不満が「まったく踊ってくれない」です。原因のほとんどは写真ではなく、工程の多さにあります。このページは写真1枚だけ。二足歩行の静止画を作り直す工程も、振り付けの元動画も、プロンプトもいりません。動きはテンプレート側ではじめから決まっているので、写真を変えても動きそのものが消えません。",
    description:
      "写真1枚だけで、愛犬が立ち上がってリズムに揺れる8秒の縦型動画を作る方法です。二足歩行の画像を作り直す工程も、振り付けの元動画も、プロンプトも不要。配置のプレビューは何度でも無料・カード登録なし、書き出しは1本780円（税込）。猫にも対応。2匹並べる形は Hotel Lobby です。",
    cardBlurb: "写真1枚で、ペットが立ち上がってリズムに揺れる8秒。犬でも猫でも、元動画もプロンプトも不要。",
    accent: "#1f8a4c",
    accent2: "#8ee8a8",
    scene: "pet",
    category: "dance",
    durationSec: 8,
    aspectRatio: "9:16",
    subjects: 1,
    badges: ["写真1枚だけ", "その場で8秒・縦型9:16", "元動画・プロンプト不要", "アプリDL不要", "配置プレビュー無料", "猫もOK"],
    seoKeywords: [
      "犬ダンス ai",
      "犬ダンス 作り方",
      "ペットダンス ai",
      "犬 踊る ai",
      "猫 ダンス ai",
      "seedance",
      "higgsfield 犬",
    ],
    uploadHint: "横向きに全身と四つ足が写っている1枚が、いちばん崩れにくいです。首輪やリードはそのままで構いません。",
    slotLabel: "ペットの写真を選ぶ",
    templates: [
      {
        id: "stand-and-sway",
        name: "Stand and Sway",
        tagline: "立ち上がって、その場で揺れる",
        blurb: "後足で立ち上がり、体幹と前脚、口がリズムに合わせて揺れる8秒。振り付けの指定はありません。",
        promptHint:
          "Single continuous shot. The pet first rises onto its hind legs, then stays in place and sways, with the torso, front paws, and mouth moving gently. Locked camera, plain background, no dance steps, no copied human choreography, no extra animals, no cuts. Keep fur color and markings from the photo. Vertical 9:16.",
      },
    ],
    aboutTitle: "犬ダンス動画は、作り方が3つあります",
    about: [
      "いま日本で飛んでいる犬ダンス・ペットダンスの作り方は、3つに分かれます。いちばん多いのが工程を繋ぐ方式です。犬の写真を撮る、二足歩行で立った状態の画像を生成し直す、それにモーションを付ける、仕上げ、と4つの工程を別のツールで行きます。ここで落ちやすいのが2つ目の工程で、元の寝そべった写真から立ち上げた画像を作る時点で体型と毛柄が崩れます。崩れた画像に動きを付けると、踊るどころか「うちの犬らしくない」ものになります。",
      "2つ目が、振り付けの元動画を指定する方式です。Higgsfield や Viggle 系と呼ばれているのはこちらで、人間が踊っている元動画と同じモーションを、犬やペットになぞらせる形です。再現力は最も高い反面、その元動画を探してくるところが始まりになります。投稿されている動画の多くが、実はこの元動画を繋いだ結果です。",
      "3つ目が、動きを固定したテンプレートから選ぶ方式です。バズリンはこれです。立ち上がり方・体幹の揺れ・前脚と口の動きまで、はじめから1つの形に決まっていて、写真は1枚だけ。工程がないので、写真1枚で「動いている」状態まで一直線に出ます。その代わり、あの振り付けそのものの再現や、ステップの指定はできません。",
      "「シーダンス」や「higgsfield」で探している方へ。シーダンスは ByteDance の動画生成モデル「Seedance」のことで、higgsfield も海外の AI 動画サービスの名前です。どちらもダンスの種類ではありません。名前を指定して探すと教程が混ざって出てくるので、作りたい動画の形で選ぶのがこの界隈では一番の近道です。",
    ],
    disclaimer:
      "本ページは作り方の解説です。Seedance、Higgsfield、ByteDance、その他のサービスや楽曲の権利者とは関係がありません。元動画の編集・再配布は行いません。",
    stepsTitle: "ペットが踊る動画を作る3ステップ（8秒・縦型9:16）",
    steps: [
      {
        title: "横向き全身の1枚をアップロード",
        body: `JPG・PNG・WebP・HEIC、1枚最大${maxImageMbLabel(1)}MB。床に伏せている・座っている写真でも動かせますが、横向きに体全体と四つ足が写っている1枚が最も崩れにくいです。スマホのアルバムからそのまま選べます。`,
      },
      {
        title: "ペットダンスを選ぶ",
        body: "立ち上がってリズムに揺れる1カット、8秒・縦型9:16。プロンプトの入力欄はありません。犬でも猫でも、小柄な子でも大型の子でも同じ形で動きます。2匹並べたい場合は Hotel Lobby（写真2枚・縦型9:16・10秒）の Rapping Pets を選んでください。",
      },
      {
        title: "配置を確認して、気に入ったら保存",
        body: "クレジットを使う前に、写真が画面のどこに入るかをブラウザで確認できます。納得がいかなければ別の写真で何度でもやり直せます（無料・カード登録不要）。書き出したら同じ画面から端末へ保存し、そのまま TikTok・Instagram Reels・YouTube Shorts へ投稿できます。完成した8秒の動画が見えるのは、書き出しのあとです。",
      },
    ],
    photoTipsTitle: "動きが乗る・ペット写真の条件",
    photoTipsLede: "ペットの動画で崩れやすいのは、顔のアップではなく全身の写り方です。アップロードする前に、ここだけ確認してください。",
    photoTips: [
      {
        title: "横向きで全身が写っている",
        body: "四つ足と胴の長さがわかる1枚が最も形が崩れません。上からのアングル、前足だけが写った1枚は、立ち上がる際のプロポーションが乱れます。",
      },
      {
        title: "毛色と柄がはっきりしている",
        body: "茶・白・黒の境目、斑点、縞模様が判別できることが重要です。暗い床の上の黒い毛並み、ピントの合っていない1枚は柄が消えます。",
      },
      {
        title: "口を閉じている、または舌が出ている程度",
        body: "口元が大きく開いた写真、あくびの瞬間、ボールを加えている1枚は、そこから動きを作ると顔が破綻します。",
      },
      {
        title: "首輪・リード・服はそのままでOK",
        body: "外す必要はありません。着ている服のままで動かせます。服を外した写真に、あとから服を着せることはできません。",
      },
      {
        title: "1枚に1匹",
        body: "生成側はアップロード1件＝1匹として扱います。2匹を並べたい場合は Hotel Lobby（写真2枚・縦型9:16）の Rapping Pets へ。",
      },
      {
        title: "背景はすいているほうが有利",
        body: "ソファの模様、落ち葉、他の犬や人が写り込んでいる背景は、動きと混ざってノイズになります。壁・床・芝生の単調な背景がいちばん綺麗に出ます。",
      },
    ],
    extraSpecs: [
      ["対応する被写体", "犬・猫（1匹）。2匹を並べる形は Hotel Lobby の Rapping Pets（写真2枚・縦型9:16・10秒）"],
      ["動きの形", "立ち上がってリズムに揺れる単一カット。前脚・体幹・口の動きが入ります"],
      ["振り付けの指定", "できません（テンプレート側で固定。プロンプト入力欄はありません）"],
      ["元動画の用意", "不要（人間が踊っている参考動画を求められる形ではありません）"],
      ["料金", "1本780円（税込）／3本1,980円／10本4,880円。月額課金なし・クレジットに有効期限なし"],
      ["プレビュー", "配置の確認は回数無制限で無料。カード登録も不要。完成動画そのものは見えません"],
      ["生成失敗時", "クレジットは還元されます"],
      ["アカウント", "不要。ゲストのまま生成・保存できます。Googleログインでクレジットを端末間で引き継げます。写真そのものは引き継がれません"],
      ["公式関係", "ありません。関連する映像・楽曲・サービス名の権利者とは無関係の独立したサービスです"],
    ],
    compare: {
      title: "犬ダンスの3方式、どこが自分に合っているか",
      intro: "「写真1枚で」と書かれていても、工程が違うと失敗する場所が変わります。表の真ん中列が、このページで作れる形です。",
      cols: ["見るポイント", "このページ（写真1枚・テンプレート固定）", "工程を繋ぐ形 / 元動画を指定する形"],
      rows: [
        ["用意するもの", "ペットの写真1枚", "工程を繋ぐ形：画像生成ツール／元動画の形：踊っている元動画"],
        ["立ち上げの作業", "なし（写真1枚からそのまま動きます）", "二足歩行の画像を先に作り直す / 元動画を探す"],
        ["動きが消える事故", "起きにくい（動きが固定されている）", "画像生成の段階で毛柄・体型が崩れ、動きが乗らない"],
        ["振り付けの再現", "できない", "できる（元動画をなぞる方式）"],
        ["待ち時間", "配置の確認はその場。書き出しは数分", "生成待ちの工程がいくつもつながる"],
        ["向いている人", "まず「動いた1本」を出したい飼い主", "あの動画のステップをそのまま出したい人"],
      ],
      note: "「シーダンス」「Seedance」「higgsfield」で探している方は、モデル名・サービス名の側です。振りをそのまま再現したいなら元動画を指定する方式、工程を増やしたくないならこのページです。",
    },
    faq: [
      {
        q: "犬ダンスAIとは何ですか？",
        a: "寝ている・座っているペットの写真1枚から、立ち上がってリズムに揺れる動画を作る手法の総称です。いま日本で飛んでいるのは、SNSで「うちの子が踊り出した」という形で広がっている8秒前後の縦型カットです。撮り直しやしつけは不要で、アルバムにある1枚から作れます。",
      },
      {
        q: "本当に動きますか？作っても踊らないという話を聞きます。",
        a: "いちばん多い失敗は、写真の問題ではなく工程の問題です。多くの作り方が、まず「二足歩行で立った写真」を別途生成する工程を持っていて、そこで体型と毛柄が崩れます。崩れた画像に動きを付けると踊りません。当社は動きをテンプレート側で固定し、写真1枚からそのまま動かす形なので、写真を変えても動きそのものが消えません。その代わり、振り付けを細かく指定することはできません。",
      },
      {
        q: "二足歩行になりますか？あのステップをそのまま再現できますか？",
        a: "当社のテンプレートは、立ち上がってその場でリズムに揺れる1カットです。人間が踊っている元動画をなぞらせる方式とは別の作り方で、あの振り付けそのものの再現や、ステップの指定はできません。振りを指定したい場合は、元動画を指定する方式のツールを使ってください。",
      },
      {
        q: "猫でもできますか？",
        a: "できます。犬・猫どちらの被写体でも同じ形で動きます。1枚に1匹が前提です。2匹を並べたい場合は、Hotel Lobby（写真2枚・縦型9:16・10秒）の Rapping Pets を使ってください。横向きに全身が写っていれば、小型犬から大型犬、猫まで同じテンプレートで動かせます。",
      },
      {
        q: "どんな写真を選べばいいですか？",
        a: "横向きに全身と四つ足が写っている、毛色と柄の境目がわかる1枚が最も安定します。上から撮った1枚、暗い床の上の黒い毛並み、口が大きく開いている瞬間、ピントの合っていない1枚は崩れやすいです。加工・切り抜きは不要、首輪や服はそのままで構いません。",
      },
      {
        q: "「シーダンス」や「higgsfield」とは何が違うのですか？",
        a: "どちらもダンスの種類ではなく、サービスの名前です。シーダンスは ByteDance の動画生成モデル「Seedance」のこと、higgsfield も AI 動画サービスの名前で、犬ダンスの多くは踊っている元動画を指定してなぞらせる形で作られています。当社はモデル名ではなく「写真1枚から動くペットの動画を作る」という形で提供しているため、元動画を用意する必要がありません。",
      },
      {
        q: "無料でどこまでできますか？",
        a: "配置を確認するところまでが回数無制限で無料、カード登録も不要です。ここで見えるのは立ち位置で、完成した8秒の動画そのものではありません。書き出し（透かしなしの完成動画を保存する）は1本780円（税込）、3本1,980円、10本4,880円です。月額課金・自動更新はなく、クレジットに有効期限はありません。生成に失敗した回はクレジットが還元されます。",
      },
      {
        q: "アプリは必要ですか？スマホだけで完結しますか？",
        a: "アプリのダウンロードは不要です。スマホのブラウザ（Safari・Chrome とも）で、写真の選択、配置の確認、書き出し、端末への保存まで全部終わります。画像生成アプリと動画アプリを往復する作業がありません。",
      },
      {
        q: "曲は入っていますか？投稿時の音はどうしますか？",
        a: "入っていません。動画は無音で完成します。投稿時に TikTok・Instagram Reels・YouTube Shorts のサウンドライブラリから選んでください。当社が音源を同封しないのは、第三者の楽曲の権利を処理できないためで、投稿時の著作権リスクが一番少ない形になります。",
      },
      {
        q: "他人のペットの写真や、商用利用できますか？",
        a: "ご自身のペット、または承諾を得ている子の写真のみご利用ください。ペットの画像を無断で使った動画の生成や投稿は利用規約で禁じています。個人SNSでの利用を前提としており、広告・商品販売などの商用利用はできません。",
      },
    ],
    related: [
      {
        href: "/tools/dance-video",
        anchor: "ダンス動画のつくりかた（入口）",
        desc: "人が踊るテンプレートと、ペットが立ち上がって揺れる形のちがいをまとめています。",
      },
      {
        href: "/effects/hotel-lobby",
        anchor: "ペット2匹を並べる",
        desc: "写真2枚で、犬や猫を2匹並べる Rapping Pets（縦型9:16・10秒）です。",
      },
      {
        href: "/tools/photo-to-video",
        anchor: "写真1枚から作る人",
        desc: "人物の1枚から8〜10秒の縦型動画にする作り方の入口です。",
      },
      {
        href: "/effects/zombie-trend",
        anchor: "ハロウィン用のホラー調",
        desc: "写真1枚から暗い街へ歩いてくる8秒。こちらもアプリ不要・ブラウザで完結します。",
      },
    ],
    cta: {
      title: "ペットの写真1枚で、まずは配置を見てみませんか。",
      sub: "クレジットカードもアプリも不要です。配置の確認までは無料です。",
    },
  },
];

export function getEffect(slug: string) {
  return EFFECTS.find((e) => e.slug === slug);
}

export function getFeaturedEffect() {
  return EFFECTS.find((e) => e.featured) ?? EFFECTS[0];
}

export function photoCountLabel(effect: EffectDefinition) {
  return effect.subjects === 2 ? "写真2枚" : "写真1枚";
}
