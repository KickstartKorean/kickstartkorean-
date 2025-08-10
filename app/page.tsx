'use client';

import { useState, useMemo, useRef, useId } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Calendar, Check, Globe, MessageSquare, Star, Video, ArrowRight, Phone } from "lucide-react";

/**
 * KickstartKorean — Landing Page (wired contact form, basic a11y)
 * Tip: Next.js 환경이면 <img>를 next/image로 바꾸면 더 빠릅니다.
 */

const CONTACT_MODE: "demo" | "email" = "demo"; // "email"로 바꾸면 mailto로 전송

const BRAND = {
  nameKo: "KickstartKorean",
  nameEn: "KickstartKorean",
  since: "Since 2018",
  email: "kickstartkorean@gmail.com",
  preply: "https://preply.com/en/tutor/2069795",
  calendar: "https://calendar.app.google/nneibzTWpL8QyNYV9",
  price: "$39",
  periodKo: "/ 50분",
  periodEn: "/ 50 min",
  logoSrc: "/images/logo.png",       // ← 방금 넣은 경로
  logoAlt: "KickstartKorean logo",
  profileSrc: "/images/profile.jpg", // ← 방금 넣은 경로
  profileAlt: "Gyuhun — Korean Tutor profile photo",
} as const;

export default function TutorLanding() {
  const [lang, setLang] = useState<"ko" | "en">("ko");
  const t = (ko: string, en: string) => (lang === "ko" ? ko : en);

  const features = useMemo(() => [
    { icon: <BookOpen className="h-5 w-5" />, title: t("체계적인 커리큘럼", "Structured Curriculum"), desc: t("세종한국어 기반 + 맞춤 보완 자료", "Based on Sejong Korean with custom supplements") },
    { icon: <MessageSquare className="h-5 w-5" />, title: t("발음/회화 집중", "Pronunciation & Conversation"), desc: t("실전 대화 스크립트와 피드백", "Real-world scripts with targeted feedback") },
    { icon: <Video className="h-5 w-5" />, title: t("온라인 1:1 수업", "1:1 Online Lessons"), desc: t("줌/구글미트, 녹화 옵션 제공", "Zoom/Meet with optional recordings") },
    { icon: <Globe className="h-5 w-5" />, title: t("영/스 지원", "EN/ES Support"), desc: t("영어·스페인어 보조 설명 가능", "Explanations available in English/Spanish") },
  ], [lang]);

  const plans = useMemo(() => [
    { id: "trial", name: t("체험 수업", "Trial Lesson"), price: BRAND.price, period: t(BRAND.periodKo, BRAND.periodEn),
      bullets: [t("레벨 진단 + 목표 설계", "Level check + goal mapping"), t("학습 계획 로드맵 제공", "Personal learning roadmap"), t("교재 및 자료 안내", "Textbook & materials guidance")], highlight: false },
    { id: "standard", name: t("표준 수업", "Standard Lesson"), price: BRAND.price, period: t(BRAND.periodKo, BRAND.periodEn),
      bullets: [t("맞춤 피드백 & 숙제 제공", "Custom feedback & homework"), t("발음 녹음 교정", "Pronunciation correction (recordings)"), t("개인 노션 보드", "Personal Notion board")], highlight: true },
    { id: "intensive", name: t("집중 패키지", "Intensive Pack"), price: t("문의", "Contact"), period: t("/ 월", "/ month"),
      bullets: [t("주 2~3회 + 과제 코칭", "2–3x/week + assignment coaching"), t("TOPIK/비즈니스 준비", "TOPIK/Business prep"), t("우선 예약/메시지 지원", "Priority booking & DM support")], highlight: false },
  ], [lang]);

  // Contact form
  const formRef = useRef<HTMLFormElement | null>(null);
  const nameId = useId(); const emailId = useId(); const msgId = useId();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name) { (e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.setCustomValidity(t("이름을 입력해 주세요.", "Please enter your name.")); (e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.reportValidity(); return; }
    else (e.currentTarget.elements.namedItem("name") as HTMLInputElement)?.setCustomValidity("");

    if (!emailValid) { (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.setCustomValidity(t("올바른 이메일을 입력해 주세요.", "Please enter a valid email.")); (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.reportValidity(); return; }
    else (e.currentTarget.elements.namedItem("email") as HTMLInputElement)?.setCustomValidity("");

    if (!message) { (e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement)?.setCustomValidity(t("메시지를 입력해 주세요.", "Please enter a message.")); (e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement)?.reportValidity(); return; }
    else (e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement)?.setCustomValidity("");

    if (CONTACT_MODE === "email") {
      const subject = encodeURIComponent(t("레슨 문의", "Lesson Inquiry"));
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
      return;
    }
    alert(t("데모 폼입니다. 상단의 예약 버튼을 이용해 주세요.", "This is a demo form. Please use the booking buttons above."));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={BRAND.logoSrc} alt={BRAND.logoAlt} width={36} height={36} loading="eager" className="h-9 w-9 object-contain" />
            <div className="font-semibold tracking-tight">{t(BRAND.nameKo, BRAND.nameEn)}</div>
            <Badge variant="secondary" className="ml-1 rounded-xl">1:1</Badge>
            <Badge variant="secondary" className="ml-1 rounded-xl text-red-600 border-red-100">{BRAND.since}</Badge>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Main">
            <a href="#features" className="hover:opacity-70">{t("특징", "Features")}</a>
            <a href="#pricing" className="hover:opacity-70">{t("가격", "Pricing")}</a>
            <a href="#reviews" className="hover:opacity-70">{t("후기", "Reviews")}</a>
            <a href="#contact" className="hover:opacity-70">{t("문의", "Contact")}</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="rounded-xl" aria-label={t("언어 전환: 영어로", "Toggle language: Korean")} onClick={() => setLang(lang === "ko" ? "en" : "ko")}>
              {lang === "ko" ? "EN" : "KO"}
            </Button>
            <a href="#booking" className="hidden sm:block"><Button className="rounded-2xl bg-blue-700 hover:bg-blue-800">{t("수업 예약", "Book a Lesson")}</Button></a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center py-16 md:py-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 rounded-xl bg-red-500 hover:bg-red-500" variant="default">{t("서울 · 원어민 튜터", "Seoul · Native Tutor")}</Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                {t("한국어, 목표대로 빠르게", "Korean, Faster to Your Goals")}
              </h1>
              <p className="mt-4 text-slate-600 text-lg">
                {t("6+년 경력, 300+명 지도. 발음, 회화, 문법을 균형 있게—당신만의 로드맵으로.", "6+ yrs experience, 300+ students. Balanced pronunciation, conversation, and grammar with your personal roadmap.")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#booking"><Button size="lg" className="rounded-2xl bg-blue-700 hover:bg-blue-800">{t("지금 예약", "Book Now")}</Button></a>
                <a href="#features"><Button variant="outline" size="lg" className="rounded-2xl border-blue-700 text-blue-700 hover:bg-blue-50">{t("어떻게 가르치나요?", "How I Teach")}</Button></a>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm text-slate-600">
                <Star className="h-4 w-4 text-amber-500" />
                <span>{t("만족 후기 다수 · 유연한 일정", "Lots of happy reviews · Flexible schedule")}</span>
              </div>
            </motion.div>

            {/* Profile */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 shadow-sm overflow-hidden grid place-items-center">
                  <div className="p-6 text-center w-full">
                    <div className="rounded-2xl border bg-white p-4 shadow-sm max-w-md mx-auto">
                      <img src={BRAND.profileSrc} alt={BRAND.profileAlt} width={640} height={480} loading="lazy" decoding="async" className="w-full h-auto rounded-xl object-cover" />
                      <p className="text-sm text-slate-500 mt-3">{t("튜터 프로필", "Tutor Profile")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">{t("이런 분께 추천해요", "Perfect For")}</h2>
            <p className="text-slate-600 mt-2">{t("처음 시작부터 TOPIK과 비즈니스 한국어까지", "From first steps to TOPIK & business Korean")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <Card key={f.title as string} className="rounded-2xl">
                <CardHeader className="pb-2">
                  <div className="h-9 w-9 rounded-xl bg-blue-800 text-white grid place-items-center mb-3">{f.icon}</div>
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-slate-600 text-sm">{f.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">{t("가격 및 패키지", "Pricing & Packages")}</h2>
            <p className="text-slate-600 mt-2">{t("모든 수업은 1:1 · 50분 기준", "All lessons are 1:1 · 50 minutes")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((p) => (
              <Card key={p.id} className={`rounded-2xl ${p.highlight ? "border-blue-800 shadow-md" : ""}`}>
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between">
                    <span>{p.name}</span>
                    {p.highlight && <Badge className="rounded-xl bg-blue-700">{t("인기", "Popular")}</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-1">
                    <div className="text-3xl font-extrabold">{p.price}</div>
                    <div className="text-slate-500">{p.period}</div>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm">
                    {p.bullets.map((b) => (<li key={b as string} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-700" />{b}</li>))}
                  </ul>
                  <div className="mt-6"><a href="#booking"><Button className="w-full rounded-xl bg-blue-700 hover:bg-blue-800">{t("시작하기", "Get Started")}</Button></a></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">{t("학생 후기", "Student Reviews")}</h2>
            <p className="text-slate-600 mt-2">{t("꾸준함이 실력을 만듭니다", "Consistency builds skill")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {["r1","r2","r3"].map((rid) => (
              <Card key={rid} className="rounded-2xl">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-amber-500 mb-3">
                    {Array.from({length:5}).map((_,i)=>(<Star key={i} className="h-4 w-4 fill-current" />))}
                  </div>
                  <p className="text-slate-700 text-sm leading-6">{t("발음이 눈에 띄게 좋아졌어요. 수업마다 녹음 피드백이 큰 도움이 됩니다.", "My pronunciation improved fast. The recording feedback each lesson is gold.")}</p>
                  <div className="mt-4 text-xs text-slate-500">{t("미국 • 직장인 학습자", "USA • Working professional")}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking & Contact */}
      <section id="booking" className="py-16 md:py-20 bg-slate-50 border-y">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">{t("바로 예약하세요", "Book Your Lesson")}</h2>
              <p className="text-slate-600 mt-2">{t("Preply 또는 Google 캘린더(상담/콜)로 연결됩니다.", "Connect via Preply or Google Calendar (consult/call).")}</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                <a href={BRAND.preply} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-2xl bg-blue-700 hover:bg-blue-800"><Calendar className="h-4 w-4 mr-2" />{t("Preply에서 예약", "Book on Preply")}</Button>
                </a>
                <a href={BRAND.calendar} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full rounded-2xl border-blue-700 text-blue-700 hover:bg-blue-50"><ArrowRight className="h-4 w-4 mr-2" />{t("Google 캘린더", "Google Calendar")}</Button>
                </a>
              </div>
              <ul className="mt-6 text-sm text-slate-600 space-y-2">
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-700" />{t("서울/미국 시간대 유연 조정", "Flexible across KR/US time zones")}</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-700" />{t("결제: Preply 또는 PayPal", "Payment: Preply or PayPal")}</li>
                <li className="flex gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-700" />{t("가격", "Price")}: {BRAND.price} {t(BRAND.periodKo, BRAND.periodEn)}</li>
              </ul>
            </div>

            <Card id="contact" className="rounded-2xl">
              <CardHeader><CardTitle>{t("문의하기", "Contact Form")}</CardTitle></CardHeader>
              <CardContent>
                <form ref={formRef} className="grid gap-4" aria-labelledby="contact-title" noValidate onSubmit={handleSubmit}>
                  <div>
                    <label className="text-sm text-slate-600" htmlFor={nameId}>{t("이름", "Name")}</label>
                    <Input id={nameId} name="name" placeholder={t("이름을 입력하세요", "Enter your name")} className="mt-1 rounded-xl" required aria-required="true"/>
                  </div>
                  <div>
                    <label className="text-sm text-slate-600" htmlFor={emailId}>Email</label>
                    <Input id={emailId} name="email" type="email" placeholder="you@example.com" className="mt-1 rounded-xl" required aria-required="true" inputMode="email"/>
                  </div>
                  <div>
                    <label className="text-sm text-slate-600" htmlFor={msgId}>{t("메시지", "Message")}</label>
                    <Textarea id={msgId} name="message" placeholder={t("간단한 목표와 가능한 시간을 알려 주세요", "Share your goals and availability")} className="mt-1 rounded-xl" rows={5} required aria-required="true"/>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button type="submit" className="rounded-2xl bg-blue-700 hover:bg-blue-800">
                      <Phone className="h-4 w-4 mr-2" />
                      {CONTACT_MODE === "demo" ? t("보내기 (데모)", "Send (Demo)") : t("이메일로 보내기", "Send via Email")}
                    </Button>
                    {CONTACT_MODE === "demo" && (<span className="text-xs text-slate-500">{t("* 데모 폼입니다. 상단 예약 버튼을 이용해 주세요.", "* Demo form. Please use the booking buttons above.")}</span>)}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-3">
                <img src={BRAND.logoSrc} alt={BRAND.logoAlt} width={36} height={36} loading="lazy" className="h-9 w-9 object-contain" />
                <div className="font-semibold">{t(BRAND.nameKo, BRAND.nameEn)}</div>
              </div>
              <p className="text-sm text-slate-600 mt-3">{t("1:1 원어민 레슨 · 서울 / 온라인", "1:1 Native-led lessons · Seoul / Online")}</p>
            </div>
            <div className="text-sm text-slate-600">
              <div className="font-semibold mb-2">{t("바로가기", "Quick Links")}</div>
              <ul className="space-y-1">
                <li><a href="#features" className="hover:underline">{t("특징", "Features")}</a></li>
                <li><a href="#pricing" className="hover:underline">{t("가격", "Pricing")}</a></li>
                <li><a href="#booking" className="hover:underline">{t("예약", "Booking")}</a></li>
              </ul>
            </div>
            <div className="text-sm text-slate-600">
              <div className="font-semibold mb-2">{t("연락처", "Contact")}</div>
              <ul className="space-y-1">
                <li>Email: <a href={`mailto:${BRAND.email}`} className="underline hover:no-underline">{BRAND.email}</a></li>
                <li>{t("서울 은평구", "Eunpyeong-gu, Seoul")}</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-xs text-slate-400">© {new Date().getFullYear()} {t(BRAND.nameKo, BRAND.nameEn)}. {t("모든 권리 보유", "All rights reserved")}</div>
        </div>
      </footer>
    </div>
  );
}
