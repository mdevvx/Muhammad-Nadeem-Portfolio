import { links, nav, profile } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold tracking-tight">{profile.siteName}</p>
          <p className="mt-1 text-sm text-muted">{profile.role}. {profile.location}.</p>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="hover:text-fg">
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              GitHub
            </a>
          </li>
          <li>
            <a href={links.upwork} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              Upwork
            </a>
          </li>
        </ul>
      </div>
      <div className="container-page mt-8 border-t border-line/60 pt-6 text-center text-xs text-muted">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p className="mt-1">Not affiliated with Discord Inc. Discord is a trademark of its respective owner.</p>
      </div>
    </footer>
  );
}
