// components/breadcrumb-navigation.tsx
interface BreadcrumbNavigationProps {
  breadcrumbs: any[]
}

export function BreadcrumbNavigation({ breadcrumbs }: BreadcrumbNavigationProps) {
  return (
    <nav>
      <ul>
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.id}>{breadcrumb.label}</li>
        ))}
      </ul>
    </nav>
  )
}
