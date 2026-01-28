'use client'

import Image from "next/image"
import { useId, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  LineChart,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const CONTACT_MODE: "demo" | "email" = "demo"

const BRAND = {
  name: "KickstartKorean",
  since: "Since 2018",
  email: "kickstartkorean@gmail.com",
  preply: "https://preply.com/en/tutor/2069795",
  calendar: "https://calendar.app.google/nneibzTWpL8QyNYV9",
  price: "$39",
  period: "/ 50분",
  logoSrc: "/images/logo.png",
  logoAlt: "KickstartKorean logo",
  profileSrc: "/images/profile.jpg",
  profileAlt: "KickstartKorean 프로필 사진",
} as const

export default function HomePage() {
  const reduceMotion = useReducedMotion()
  const formRef = useRef<HTMLFormElement | null>(null)
  const nameId = useId()
  const emailId = useId()
  const msgId = useId()

  const fadeUp = {
    // NOTE: opacity를 0으로 두면(완전 투명) hydration/JS 문제 시 본문이 "텅 빈" 것처럼 보일 수 있어,
    // 기본 상태를 살짝 흐리게(0.72) 설정해 안전하게 표시되도록 했습니다.
    hidden: {
      opacity: reduceMotion ? 1 : 0.72,
      y: reduceMotion ? 0 : 18,
      filter: reduceMotion ? "none" : "blur(6px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: "easeOut" },
    },
  } as const

  const stagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.06,
      },
    },
  } as const

  const viewportOnce = { once: true, amount: 0.2 } as const

  const plans = [
    {
      id: "trial",
      name: "체험 수업",
      price: BRAND.price,
      period: BRAND.period,
      bullets: ["레벨 진단 + 목표 설계", "학습 로드맵 제안", "교재/자료 추천"],
      highlight: false,
    },
    {
      id: "standard",
      name: "표준 수업",
      price: BRAND.price,
      period: BRAND.period,
      bullets: ["맞춤 피드백 + 과제 제공", "회화 루틴 + 표현 확장", "발음 교정 포인트 정리"],
      highlight: true,
    },
    {
      id: "intensive",
      name: "집중 패키지",
      price: "문의",
      period: "/ 월",
      bullets: ["주 2–3회 집중", "TOPIK/면접/비즈니스 대비", "우선 일정 조율"],
      highlight: false,
    },
  ] as const

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get("name") || "").trim()
    const email = String(fd.get("email") || "").trim()
    const message = String(fd.get("message") || "").trim()
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!name) {
      ;(e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.setCustomValidity(
        "이름을 입력해 주세요."
      )
      ;(e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.reportValidity()
      return
    }
    ;(e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.setCustomValidity("")

    if (!emailValid) {
      ;(e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.setCustomValidity(
        "올바른 이메일을 입력해 주세요."
      )
      ;(e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.reportValidity()
      return
    }
    ;(e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.setCustomValidity("")

    if (!message) {
      ;(e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement)?.setCustomValidity(
        "메시지를 입력해 주세요."
      )
      ;(e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement)?.reportValidity()
      return
    }
    ;(e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement)?.setCustomValidity("")

    if (CONTACT_MODE === "email") {
      const subject = encodeURIComponent("KickstartKorean 문의")
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
      window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`
      return
    }

    alert("데모 폼입니다. ‘바로 시작하기’로 예약/상담을 진행해 주세요.")
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_circle_at_18%_6%,rgba(59,130,246,0.20),transparent_55%),radial-gradient(900px_circle_at_85%_20%,rgba(14,165,233,0.16),transparent_50%),linear-gradient(to_bottom,#ffffff,#f4f9ff)] text-slate-900">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        href="#main"
      >
        본문으로 바로가기
      </a>

      {/* Top navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Image
              src={BRAND.logoSrc}
              alt={BRAND.logoAlt}
              width={36}
              height={36}
              priority
              className="h-9 w-9 object-contain"
            />
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">{BRAND.name}</div>
              <div className="text-xs text-slate-500">{BRAND.since}</div>
            </div>
          </div>

          <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex" aria-label="주요 메뉴">
            <a className="hover:text-slate-900" href="#features">
              기능
            </a>
            <a className="hover:text-slate-900" href="#pricing">
              가격
            </a>
            <a className="hover:text-slate-900" href="#curriculum">
              학습 로드맵
            </a>
            <a className="hover:text-slate-900" href="#reviews">
              후기
            </a>
            <a className="hover:text-slate-900" href="#contact">
              문의
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a className="hidden sm:block" href="#contact">
              <Button
                variant="outline"
                className="rounded-2xl border-blue-200 bg-white text-blue-800 hover:bg-blue-50"
              >
                무료 진단 받기
              </Button>
            </a>
            <a href="#booking">
              <Button className="rounded-2xl bg-blue-700 hover:bg-blue-800">
                바로 시작하기 <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-12 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-200/40 via-sky-200/30 to-transparent blur-3xl" />
            <div className="absolute -left-24 top-40 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />
          </div>

          <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
            <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                // Hero는 상단에서 항상 보여야 하므로 "완전 투명" 시작을 피합니다.
                initial={{
                  opacity: reduceMotion ? 1 : 0.9,
                  y: reduceMotion ? 0 : 14,
                  filter: reduceMotion ? "none" : "blur(4px)",
                }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-xl bg-blue-700 text-white hover:bg-blue-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    맞춤 학습 플랜
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="rounded-xl bg-blue-50 text-blue-800"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                  영어 가능
                  
                  </Badge>
                </div>

                <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
                  <span className="text-slate-900">한국어,</span>{" "}
                  <span className="bg-gradient-to-r from-blue-950 via-blue-700 to-sky-500 bg-clip-text text-transparent drop-shadow-[0_18px_24px_rgba(37,99,235,0.18)]">
                    목표대로 빠르게
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-lg leading-7 text-slate-600">
                  레벨 진단 → 목표 설계 → 주간 루틴까지. 발음·회화·문법을 균형 있게,
                  지금의 실력을 “목표 달성”로 연결해 드립니다.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#booking">
                    <Button size="lg" className="rounded-2xl bg-blue-700 hover:bg-blue-800">
                      지금 시작하기 <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </a>
                  <a href="#curriculum">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-2xl border-blue-200 bg-white text-blue-800 hover:bg-blue-50"
                    >
                      학습 로드맵 보기
                    </Button>
                  </a>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                  {[
                    { label: "경력", value: "6+년" },
                    { label: "지도", value: "300+명" },
                    { label: "수업", value: "1:1" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-blue-100 bg-white/70 px-4 py-3 shadow-sm"
                    >
                      <div className="text-xs text-slate-500">{s.label}</div>
                      <div className="mt-0.5 font-semibold text-slate-900">{s.value}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                  <Star className="h-4 w-4 text-amber-500" />
                  꾸준한 피드백과 루틴 설계로 성장 체감
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: reduceMotion ? 1 : 0.9,
                  y: reduceMotion ? 0 : 14,
                  filter: reduceMotion ? "none" : "blur(4px)",
                }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              >
                <Card className="rounded-3xl border-blue-100 bg-white/80 shadow-md backdrop-blur">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm text-slate-500">프로필</div>
                        <div className="mt-1 text-xl font-semibold tracking-tight">
                          Gyuhun · 한국어 코치
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge
                            variant="secondary"
                            className="rounded-xl bg-blue-50 text-blue-800"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            회화 집중
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="rounded-xl bg-blue-50 text-blue-800"
                          >
                            <Target className="h-3.5 w-3.5" />
                            목표 설계
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="rounded-xl bg-blue-50 text-blue-800"
                          >
                            <LineChart className="h-3.5 w-3.5" />
                            성장 추적
                          </Badge>
                        </div>
                      </div>
                      <div className="hidden rounded-2xl border border-blue-100 bg-white px-3 py-2 text-xs text-slate-600 md:block">
                        {BRAND.price} {BRAND.period}
                      </div>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-3xl border border-blue-100 bg-slate-50 shadow-sm">
                      <Image
                        src={BRAND.profileSrc}
                        alt={BRAND.profileAlt}
                        width={1280}
                        height={960}
                        className="h-auto w-full object-cover"
                        priority
                      />
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        {
                          icon: <BookOpen className="h-4 w-4" />,
                          title: "맞춤 커리큘럼",
                          desc: "레벨과 목표에 맞춘 주간 플랜",
                        },
                        {
                          icon: <MessageSquare className="h-4 w-4" />,
                          title: "실전 회화 루틴",
                          desc: "상황별 스크립트 + 즉시 피드백",
                        },
                      ].map((it) => (
                        <div
                          key={it.title}
                          className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <span className="text-blue-800">{it.icon}</span>
                            {it.title}
                          </div>
                          <div className="mt-1 text-sm text-slate-600">{it.desc}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <motion.section
          id="features"
          className="py-14 md:py-20"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
        >
          <div className="mx-auto max-w-6xl px-4">
            <motion.div className="mb-9 text-center" variants={fadeUp}>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">핵심 기능</h2>
              <p className="mt-2 text-slate-600">
                “듣고 끝”이 아니라, 목표까지 가는 시스템을 제공합니다.
              </p>
            </motion.div>

            <div className="rounded-[28px] border border-blue-100 bg-white/65 p-4 shadow-sm backdrop-blur md:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <Target className="h-5 w-5" />,
                  title: "목표 기반 설계",
                  desc: "TOPIK·취업·여행·연애 등 목표에 맞춘 로드맵",
                },
                {
                  icon: <MessageSquare className="h-5 w-5" />,
                  title: "회화 중심 트레이닝",
                  desc: "실전 상황 스크립트 + 표현 업그레이드",
                },
                {
                  icon: <Sparkles className="h-5 w-5" />,
                  title: "피드백 루프",
                  desc: "발음/문장 교정 → 다음 과제까지 연결",
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  title: "신뢰 가능한 진행",
                  desc: "명확한 기준·기록·리뷰로 성장 추적",
                },
              ].map((f) => (
                <motion.div key={f.title} variants={fadeUp}>
                  <Card className="rounded-2xl border-slate-200 bg-white/80 transition-shadow hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-blue-700 text-white">
                        {f.icon}
                      </div>
                      <CardTitle className="text-lg">{f.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-slate-600">{f.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Pricing */}
        <motion.section
          id="pricing"
          className="border-y border-slate-200/70 bg-white py-14 md:py-20"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
        >
          <div className="mx-auto max-w-6xl px-4">
            <motion.div className="mb-9 text-center" variants={fadeUp}>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">가격표</h2>
              <p className="mt-2 text-slate-600">목표와 일정에 맞춰 가장 효율적인 플랜을 선택하세요.</p>
            </motion.div>

            <div className="rounded-[28px] border border-blue-100 bg-blue-50/20 p-4 shadow-sm md:p-6">
              <div className="grid gap-4 md:grid-cols-3">
              {plans.map((p) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <Card
                    className={[
                      "rounded-3xl border-slate-200 bg-white/90 transition-shadow hover:shadow-md",
                      p.highlight ? "border-blue-300 shadow-sm ring-1 ring-blue-100" : "",
                    ].join(" ")}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between gap-3">
                        <span>{p.name}</span>
                        {p.highlight ? (
                          <Badge className="rounded-xl bg-blue-700 text-white hover:bg-blue-700">
                            추천
                          </Badge>
                        ) : null}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <div className="text-3xl font-extrabold tracking-tight text-slate-900">
                          {p.price}
                        </div>
                        <div className="text-slate-500">{p.period}</div>
                      </div>

                      <ul className="mt-4 space-y-2 text-sm text-slate-700">
                        {p.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-blue-700" />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6">
                        <a href="#booking">
                          <Button
                            className={[
                              "w-full rounded-2xl",
                              p.highlight
                                ? "bg-blue-700 hover:bg-blue-800"
                                : "bg-slate-900 hover:bg-slate-800",
                            ].join(" ")}
                          >
                            {p.highlight ? "가장 많이 선택해요" : "이 플랜으로 시작하기"}
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Curriculum */}
        <motion.section
          id="curriculum"
          className="border-y border-slate-200/70 bg-white py-14 md:py-20"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
        >
          <div className="mx-auto max-w-6xl px-4">
            <motion.div className="mb-9 text-center" variants={fadeUp}>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">학습 로드맵</h2>
              <p className="mt-2 text-slate-600">매주 “무엇을, 왜, 어떻게”를 선명하게.</p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "레벨 진단",
                  desc: "발음·문법·회화 습관을 빠르게 파악합니다.",
                },
                {
                  step: "02",
                  title: "목표 설계",
                  desc: "기간·시간·목표에 맞춰 현실적인 플랜을 세웁니다.",
                },
                {
                  step: "03",
                  title: "루틴 실행",
                  desc: "수업·과제·피드백을 반복하며 실력을 고정합니다.",
                },
              ].map((s) => (
                <motion.div key={s.step} variants={fadeUp}>
                  <Card className="rounded-2xl border-blue-100 bg-blue-50/30 transition-shadow hover:shadow-md">
                    <CardContent className="pt-6">
                      <div className="text-sm font-semibold text-blue-800">{s.step}</div>
                      <div className="mt-2 text-xl font-semibold">{s.title}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Reviews */}
        <motion.section
          id="reviews"
          className="py-14 md:py-20"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
        >
          <div className="mx-auto max-w-6xl px-4">
            <motion.div className="mb-9 text-center" variants={fadeUp}>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">학습자 후기</h2>
              <p className="mt-2 text-slate-600">작은 루틴이 큰 변화를 만듭니다.</p>
            </motion.div>

            <div className="rounded-[28px] border border-blue-100 bg-white/65 p-4 shadow-sm backdrop-blur md:p-6">
              <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  quote:
                    "문장을 ‘어떻게 말하면 자연스러운지’를 바로잡아줘서 회화가 확실히 편해졌어요.",
                  who: "미국 · 직장인 학습자",
                },
                {
                  quote:
                    "목표를 쪼개서 주간 루틴으로 만들어주니까, 공부가 ‘계획’이 아니라 ‘습관’이 됐어요.",
                  who: "캐나다 · 대학생",
                },
                {
                  quote:
                    "발음 피드백이 디테일해서, 스스로도 소리가 달라지는 걸 느꼈습니다.",
                  who: "싱가포르 · 취미 학습자",
                },
              ].map((r) => (
                <motion.div key={r.who} variants={fadeUp}>
                  <Card className="rounded-2xl border-slate-200 bg-white/80 transition-shadow hover:shadow-md">
                    <CardContent className="pt-6">
                      <div className="mb-3 flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm leading-6 text-slate-700">“{r.quote}”</p>
                      <div className="mt-4 text-xs text-slate-500">{r.who}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Booking & Contact */}
        <motion.section
          id="booking"
          className="border-t border-slate-200/70 bg-slate-50/60 py-14 md:py-20"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={stagger}
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <motion.div variants={fadeUp}>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">바로 시작하기</h2>
                <p className="mt-2 text-slate-600">
                  예약은 Preply 또는 Google 캘린더(상담/콜)로 연결됩니다.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a href={BRAND.preply} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full rounded-2xl bg-blue-700 hover:bg-blue-800">
                      <Calendar className="mr-2 h-4 w-4" />
                      Preply로 예약
                    </Button>
                  </a>
                  <a href={BRAND.calendar} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="w-full rounded-2xl border-blue-200 bg-white text-blue-800 hover:bg-blue-50"
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Google 캘린더
                    </Button>
                  </a>
                </div>

                <ul className="mt-6 space-y-2 text-sm text-slate-600">
                  {[
                    "서울/미국 시간대 유연 조정",
                    "수업 기록·과제·피드백으로 성장 추적",
                    `가격: ${BRAND.price} ${BRAND.period}`,
                  ].map((b) => (
                    <li key={b} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-blue-700" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Card
                  id="contact"
                  className="rounded-3xl border-blue-100 bg-white/85 shadow-md backdrop-blur"
                >
                  <CardHeader>
                    <CardTitle>문의하기</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form
                      ref={formRef}
                      className="grid gap-4"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <div>
                        <label className="text-sm text-slate-600" htmlFor={nameId}>
                          이름
                        </label>
                        <Input
                          id={nameId}
                          name="name"
                          placeholder="이름을 입력하세요"
                          className="mt-1 rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-600" htmlFor={emailId}>
                          이메일
                        </label>
                        <Input
                          id={emailId}
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          className="mt-1 rounded-xl"
                          required
                          inputMode="email"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-slate-600" htmlFor={msgId}>
                          메시지
                        </label>
                        <Textarea
                          id={msgId}
                          name="message"
                          placeholder="목표(예: TOPIK 4급/면접/여행)와 가능한 시간을 알려 주세요"
                          className="mt-1 rounded-xl"
                          rows={5}
                          required
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <Button
                          type="submit"
                          className="rounded-2xl bg-blue-700 hover:bg-blue-800"
                        >
                          보내기 {CONTACT_MODE === "demo" ? "(데모)" : ""}
                        </Button>
                        {CONTACT_MODE === "demo" && (
                          <span className="text-xs text-slate-500">
                            * 데모 폼입니다. 상단 “바로 시작하기”로 예약을 진행해 주세요.
                          </span>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src={BRAND.logoSrc}
                  alt={BRAND.logoAlt}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                <div className="font-semibold">{BRAND.name}</div>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                한국어 학습을 “목표 달성”으로 바꾸는 플랫폼형 코칭.
              </p>
            </div>

            <div className="text-sm text-slate-600">
              <div className="mb-2 font-semibold">바로가기</div>
              <ul className="space-y-1">
                <li>
                  <a className="hover:underline" href="#features">
                    기능
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#pricing">
                    가격표
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#curriculum">
                    학습 로드맵
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#booking">
                    시작하기
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-sm text-slate-600">
              <div className="mb-2 font-semibold">연락처</div>
              <ul className="space-y-1">
                <li>
                  Email:{" "}
                  <a className="underline hover:no-underline" href={`mailto:${BRAND.email}`}>
                    {BRAND.email}
                  </a>
                </li>
                <li>서울 · 온라인</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-xs text-slate-400">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
