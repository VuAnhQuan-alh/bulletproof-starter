import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code2, Database, Palette, Shield, Sparkles, TestTube, Zap } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('hero')
  const tNav = await getTranslations('nav')
  const tMain = await getTranslations('mainHeading')
  const tCta = await getTranslations('cta')
  const tSection = await getTranslations('section')
  const tFeatures = await getTranslations('features')
  const tBottomCta = await getTranslations('bottomCta')
  const tAnnouncement = await getTranslations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950/50">
      {/* Navigation */}
      <header className="relative border-b border-slate-200/50 bg-white/80 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-xl font-bold text-transparent dark:from-white dark:to-slate-300">
                {t('title')}
              </span>
            </div>
            <nav className="hidden items-center space-x-6 md:flex">
              <a
                href="#features"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {tNav('features')}
              </a>
              <a
                href="#docs"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {tNav('docs')}
              </a>
              <a
                href="#examples"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                {tNav('examples')}
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle />
            {/* <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button variant="outline" size="sm">
                <SignInButton>Sign in</SignInButton>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Get Started
              </Button>
            </SignedOut> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />

        <div className="container relative mx-auto px-4 pb-32 pt-20">
          <div className="mx-auto max-w-4xl text-center">
            {/* Announcement Badge */}
            <div className="mb-8 flex justify-center">
              <Badge
                variant="secondary"
                className="group cursor-pointer border border-slate-200/50 bg-slate-100/50 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-200/50 dark:border-slate-800/50 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700/50"
              >
                <Sparkles className="mr-2 h-3 w-3" />
                {tAnnouncement('announcement')}
                <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-slate-100 dark:to-white">
                {tMain('part1')}
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {tMain('part2')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-slate-600 dark:text-slate-400">
              {tAnnouncement('subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
              >
                {tCta('startBuilding')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group border-slate-300 bg-transparent px-8 py-3 text-base font-medium transition-all duration-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                {tCta('viewDocs')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>

            {/* Feature Highlight */}
            <div className="flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
              <Zap className="mr-2 h-4 w-4 text-green-500" />
              {tAnnouncement('featureHighlight')}
            </div>
          </div>
        </div>
      </main>

      {/* Project Explanation Section */}
      <section className="relative bg-gradient-to-b from-white/50 to-slate-50/80 py-24 backdrop-blur-sm dark:from-slate-900/50 dark:to-slate-950/80">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                  {tSection('title')}
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                {tSection('description')}
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Authentication */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800/50 dark:bg-slate-900/50 dark:hover:shadow-blue-400/10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                    {tFeatures('auth.title')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {tFeatures('auth.description')}
                  </p>
                </div>
              </div>

              {/* Database */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-800/50 dark:bg-slate-900/50 dark:hover:shadow-emerald-400/10">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                    {tFeatures('database.title')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {tFeatures('database.description')}
                  </p>
                </div>
              </div>

              {/* Testing */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 dark:border-slate-800/50 dark:bg-slate-900/50 dark:hover:shadow-purple-400/10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                    <TestTube className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                    {tFeatures('testing.title')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {tFeatures('testing.description')}
                  </p>
                </div>
              </div>

              {/* UI Components */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 dark:border-slate-800/50 dark:bg-slate-900/50 dark:hover:shadow-orange-400/10">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                    {tFeatures('ui.title')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {tFeatures('ui.description')}
                  </p>
                </div>
              </div>

              {/* Developer Experience */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 dark:border-slate-800/50 dark:bg-slate-900/50 dark:hover:shadow-cyan-400/10">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                    <Code2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                    {tFeatures('devTools.title')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {tFeatures('devTools.description')}
                  </p>
                </div>
              </div>

              {/* Performance */}
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/50 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10 dark:border-slate-800/50 dark:bg-slate-900/50 dark:hover:shadow-green-400/10">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                    {tFeatures('performance.title')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {tFeatures('performance.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center rounded-full border border-slate-200/50 bg-white/50 px-6 py-3 backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-900/50">
                <span className="mr-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                  {tBottomCta('text')}
                </span>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  {tBottomCta('button')}
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
