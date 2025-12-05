"use client"
import React from 'react';
import Link from 'next/link';

const jsonLd = `{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "プライバシーポリシー - 学びリンク",
  "datePublished": "2025-11-28",
  "author": { "@type": "Organization", "name": "学びリンク", "address": "石川県野々市市扇が丘７−１" },
  "mainEntity": { "@type": "CreativeWork", "headline": "プライバシーポリシー", "about": "当社が取得する情報、利用目的、第三者提供、変更およびお問い合わせについて記載" }
}`;

export default function Page(){
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-900">
      <Link href="/" className="inline-block mb-4 px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition">← ホームに戻る</Link>
      <header className="border-b pb-3 mb-4">
        <h1 className="text-2xl font-bold">プライバシーポリシー</h1>
        <div className="text-sm text-gray-600">制定日: 2025年11月28日</div>
      </header>

      <section id="collected-information" className="mb-4">
        <h2 className="text-lg font-semibold">お客様から取得する情報</h2>
        <p>当社は、お客様から以下の情報を取得します。</p>
        <ul className="list-disc ml-5 mt-2">
          <li>氏名(ニックネームやペンネームも含む)</li>
          <li>年齢または生年月日</li>
          <li>メールアドレス</li>
          <li>電話番号</li>
          <li>写真や動画</li>
          <li>外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報</li>
          <li>OSが生成するID、端末の種類、端末識別子等のお客様が利用するOSや端末に関する情報</li>
          <li>当社ウェブサイトの滞在時間、入力履歴、購買履歴等の当社ウェブサイトにおけるお客様の行動履歴</li>
        </ul>
      </section>

      <section id="purposes" className="mb-4">
        <h2 className="text-lg font-semibold">お客様の情報を利用する目的</h2>
        <p>当社は、お客様から取得した情報を、以下の目的のために利用します。</p>
        <ul className="list-disc ml-5 mt-2">
          <li>当社サービスに関する登録の受付、お客様の本人確認、認証のため</li>
          <li>お客様の当社サービスの利用履歴を管理するため</li>
          <li>当社サービスにおけるお客様の行動履歴を分析し、当社サービスの維持改善に役立てるため</li>
          <li>当社のサービスに関するご案内をするため</li>
          <li>提携する事業者・サービスのご案内をお送りするため</li>
          <li>お客様からのお問い合わせに対応するため</li>
          <li>当社の規約や法令に違反する行為に対応するため</li>
          <li>当社サービスの変更、提供中止、終了、契約解除をご連絡するため</li>
          <li>当社規約の変更等を通知するため</li>
          <li>以上の他、当社サービスの提供、維持、保護及び改善のため</li>
        </ul>
      </section>

      <section id="security" className="mb-4">
        <h2 className="text-lg font-semibold">安全管理のために講じた措置</h2>
        <p className="bg-gray-50 border-l-4 border-gray-200 p-3">当社が、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡いただきましたら、法令の定めに従い個別にご回答させていただきます。</p>
      </section>

      <section id="third-party" className="mb-4">
        <h2 className="text-lg font-semibold">第三者提供</h2>
        <p>当社は、お客様から取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。</p>
        <p>但し、次の場合は除きます。</p>
        <ul className="list-disc ml-5 mt-2">
          <li>個人データの取扱いを外部に委託する場合</li>
          <li>当社や当社サービスが買収された場合</li>
          <li>事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）</li>
          <li>その他、法律によって合法的に第三者提供が許されている場合</li>
        </ul>
      </section>

      <section id="policy-change" className="mb-4">
        <h2 className="text-lg font-semibold">プライバシーポリシーの変更</h2>
        <p>当社は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。</p>
      </section>

      <section id="contact" className="mb-6">
        <h2 className="text-lg font-semibold">お問い合わせ</h2>
        <p>お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のメールアドレスにご連絡ください。</p>
        <p className="contact">e-mail: <a className="text-blue-600" href="mailto:manabi.link2025@gamil.com">manabi.link2025@gamil.com</a></p>
        <p>この場合、必ず、運転免許証のご提示等当社が指定する方法により、ご本人からのご請求であることの確認をさせていただきます。なお、情報の開示請求については、開示の有無に関わらず、ご申請時に一件あたり1,000円の事務手数料を申し受けます。</p>
      </section>

      <footer className="mt-6 border-t pt-4 text-sm text-gray-700">
        <div><strong>事業者の氏名</strong><br />学びリンク</div>
        <div className="mt-2"><strong>事業者の住所</strong><br />石川県野々市市扇が丘７−１</div>
        <div className="mt-2 text-gray-500"><small>制定: 2025年11月28日</small></div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </div>
  );
}
