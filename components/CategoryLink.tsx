import Link from 'next/link'

type CategoryLinkProps = { category: string }

export const CategoryLink = ({ category }: CategoryLinkProps) => {
  return (
    <Link
      href={`/categories/${category}`}
      className="no-underline border text-sm px-2 py-1 bg-gray-100 rounded-md"
    >
      {category}
    </Link>
  )
}
