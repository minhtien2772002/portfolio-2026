# Security Audit

Audit date: 2026-07-22

## Executive summary

The portfolio is a public, static, client-rendered website. Its JavaScript source is intentionally delivered to browsers and no server-side secret, privileged API, authentication flow, database, or contact-form backend was found. No credential pattern was found in the current working tree, reachable Git history, or deployed JavaScript reviewed during this audit.

The confirmed production weakness was missing browser security headers beyond HSTS. Repository hardening now defines a restrictive Content Security Policy and related headers for Vercel, removes the only inline bootstrap script so `script-src` can remain strict, expands secret-file exclusions, and adds repeatable local and CI checks. These response-header fixes require a Vercel redeployment before they protect the live domain.

## Scope

- Local tracked and non-ignored untracked files in this repository
- All commits reachable from local branches, remote-tracking branches, and tags
- Static deployment configuration and dependency manifests
- Public production domains `tienminhng.com` and `www.tienminhng.com`
- Low-volume checks of the deployed HTML, JavaScript, CSS, common sensitive paths, and source-map paths
- GitHub repository metadata available without authenticated account access

No destructive production testing, credential use, brute force, data mutation, or third-party source upload was performed.

## Detected architecture

- Framework: plain HTML, CSS, and browser JavaScript modules; no Next.js, React runtime, Vite, Astro, SSR, ISR, or server build pipeline
- Routing: client-side hash routing in `src/app.js`
- Rendering: static `index.html` plus JavaScript-generated local templates
- Hosting: Vercel, confirmed by live response headers and DNS
- Source control: public GitHub repository with `main` as the default branch
- Deployment state: the deployed `src/app.js` SHA-256 matched the repository `HEAD` version during the audit, consistent with the existing Git-to-Vercel workflow
- APIs/server functions: none found
- Authentication/authorization: none found
- Databases/CMS/email/contact form/uploads: none found
- Analytics/third-party browser scripts: none found
- External browser resources: Google Fonts only; all application scripts and media are local
- Client storage: one non-sensitive `sessionStorage` boolean controlling the intro curtain

## Attack surface

- Public HTML, CSS, JavaScript modules, images, videos, and the vendored Matter.js file
- Hash route parsing and local template rendering
- External portfolio/contact links
- Vercel response and deployment configuration
- npm dependency installation used for local gallery tooling and installed animation packages
- GitHub repository and future pull-request dependency changes

## Confirmed findings

| ID | Severity | Category | Affected file or URL | Evidence | Impact | Exploitability | Remediation | Fix status | Validation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SEC-001 | Medium | Security headers | `https://www.tienminhng.com/` | Live responses had HSTS but no CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, or `frame-ancestors` policy | Weaker browser containment for injected content, framing, and unnecessary browser capabilities | Requires another injection/framing condition; no such remote input was confirmed | Added scoped Vercel headers and a CSP adapted to local scripts/media and Google Fonts | Fixed in repository; deployment pending | `vercel.json` is parsed and enforced by `npm run security:check`; live headers must be rechecked after deploy |
| SEC-002 | Low | CSP compatibility | `index.html` | A small inline `sessionStorage` bootstrap required allowing inline JavaScript under an enforced CSP | Keeping the inline block would weaken `script-src` or break the intro behavior | Only relevant if HTML injection occurs | Moved the bootstrap unchanged to `src/initial-curtain.js`; CSP now uses `script-src 'self'` without `unsafe-inline` or `unsafe-eval` | Fixed | Syntax and browser checks pass; initial curtain state remains equivalent |
| SEC-003 | Low | Supply chain | Repository configuration | No GitHub Actions workflow or Dependabot configuration existed | Dependency or accidental exposure regressions could reach `main` without an automated check | Requires a future vulnerable or unsafe change | Added least-privilege, SHA-pinned CI checks and weekly npm dependency updates | Fixed in repository | Workflow YAML and pinned action revisions reviewed; activation requires push |
| SEC-004 | Informational | Public frontend code | `/src/*.js` | Production directly serves readable JavaScript modules | Browser code and public portfolio content are visible, as expected for this architecture | Public by design; no privileged logic or secret was found | No obfuscation applied; added regression scans for credential patterns and source maps | Accepted | Deployed bundle scan found no reviewed secret pattern and no map reference |

## Potential findings requiring external verification

### Vercel account settings

The repository does not expose Vercel dashboard settings. Production/Preview environment-variable scopes, preview-deployment access, deployment-log retention, Git integration permissions, and protection settings could not be verified without authenticated project access. The application currently reads no environment variables, reducing the immediate leakage risk.

### GitHub account settings

The public API confirmed a public repository and no Actions workflows at audit time. Branch protection returned an authentication-required response, and secret-scanning/security-analysis status was not exposed by the unauthenticated API. Branch protection, required checks, push protection, and repository security settings remain unverified.

### Published content approval

Contact details, a hosted CV link, certificate imagery, and case-study/gallery content are intentionally rendered as public portfolio content. Content authorization and client-confidentiality approval cannot be established from code alone. Image metadata checks found Figma creator markers and dimensions but no GPS coordinate marker or named creator in the inspected PNG metadata.

## Fixes applied

- Added a Vercel CSP with strict script sources, clickjacking protection through `frame-ancestors 'none'`, restricted object/form/connect/media/font/image sources, and HTTPS upgrading
- Added HSTS, MIME sniffing protection, referrer policy, permissions policy, and COOP headers
- Externalized the initial curtain bootstrap script to avoid weakening `script-src`
- Expanded `.gitignore` for environment files, private-key containers, service accounts, source maps, Vercel state, and backups
- Added a safe `.env.example` documenting that no variables are currently required
- Added a local security check for sensitive filenames, credential patterns, source-map references, inline scripts, required headers, CSP quality, and JavaScript syntax
- Added least-privilege GitHub CI with lifecycle scripts disabled during install and actions pinned to commit SHAs
- Added weekly Dependabot npm updates

## Secrets requiring rotation

None confirmed. No complete secret was found in the working tree, reachable Git history, reviewed production files, or generated/static deployment artifact. If GitHub or Vercel secret scanning later identifies a credential outside the locally available history, treat it as compromised and rotate it at the provider before redeploying.

## Deployment actions required

1. Commit and push the hardening files, then redeploy the Vercel production project.
2. Recheck both domains for the headers defined in `vercel.json` and verify the CSP causes no browser violations.
3. In Vercel, confirm there are no unused environment variables; restrict any future secrets to the minimum Production/Preview scope and never expose them through client code.
4. Review Preview Deployment Protection and ensure untrusted pull requests cannot access production secrets or unpublished content.
5. In GitHub, enable branch protection/rulesets for `main`, require the new security check, and enable secret scanning/push protection if available for the repository.
6. Review the intentional public contact, certificate, CV, HPF, Smart Smash, and gallery content for publication approval.

## Validation results

- Working-tree credential-pattern scan: no match
- Reachable Git-history credential-pattern scan: no match across all locally available branches; no tags were present
- Sensitive filename history scan: no historic environment, key, credential, archive, or backup filename found
- Production source maps: no references found; tested JavaScript/CSS map URLs returned 404
- Common production exposure paths: reviewed environment, Git, package/config, and archive paths returned 404
- Production JavaScript: reviewed deployed modules contained no known credential pattern
- Dependency audit: `npm audit --omit=dev` reported 0 vulnerabilities
- OSV version checks: no vulnerability returned for installed direct packages or vendored Matter.js 0.20.0
- Client storage: only a non-sensitive intro-state boolean in `sessionStorage`
- XSS sinks: three `innerHTML` uses were reviewed; each receives repository-controlled static markup, not URL/form/CMS input
- External links: new-tab links use `noopener noreferrer`
- Source artifact: no source-map file or reference is allowed by the new repository check
- Local browser validation: Home, About, Study Cases, and Gallery rendered under the enforced CSP with no CSP refusal or JavaScript exception detected; long-lived animation loops kept the Study Cases and Gallery headless processes active after their DOM had rendered
- Type checking: not applicable; the project contains no TypeScript
- Framework build: not applicable; Vercel serves the static repository directly and no build script exists

## Residual risks

- The response-header remediation is not active until Vercel redeploys this commit.
- Public JavaScript and portfolio assets remain downloadable by design.
- `style-src 'unsafe-inline'` remains necessary because the animation implementation creates and mutates inline styles. JavaScript remains strict and does not allow inline execution or `eval`.
- The custom secret scan covers common credential formats but does not replace GitHub/Vercel provider-side secret scanning.
- Vercel and GitHub dashboard controls remain unverified without authenticated access.
- Repository collaborators can intentionally alter generated gallery data or static templates; code review and protected-branch checks remain the appropriate trust boundary.
