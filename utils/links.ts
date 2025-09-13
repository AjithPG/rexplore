type NavLink = {
  href: string;
  label: string;
};

export const Links: NavLink[] = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/resources", label: "resources" },
  { href: "/favorites", label: "favorites" },
];

export const adminLinks: NavLink[] = [
  { href: "/admin/resources", label: "my resources" },
  { href: "/admin/resources/create", label: "create resources" },
];