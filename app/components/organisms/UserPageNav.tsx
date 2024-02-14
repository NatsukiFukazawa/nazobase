import Link from "next/link";

const collections = [
  { page: 'userpage', label: 'マイページ' },
  { page: 'toppage', label: 'ランダム10問' },
  { page: 'search', label: '謎検索' },
  { page: 'tag-setting', label: 'タグ設定' },
]



export function UserPageNav() {
  const collectionLinks = collections.map((collection) => (
    <div className="flex justify-start" key={collection.label}>
      <Link
        href={`/${collection.page}`}
        key={collection.label}
      >
        {collection.label}
      </Link>
    </div>
  ));

  return (
    <nav className="w-36 border-r border-gray-500">
      <div className="mx-2">{collectionLinks}</div>
    </nav>
  );
}