'use client'

import Image from "next/image"
import { useId, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Check,
  Gift,
  Loader2,
  Star,
  Sparkles,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const BRAND = {
  name: "KickstartKorean",
  email: "kickstartkorean@gmail.com",
  calendar: "https://calendar.app.google/nneibzTWpL8QyNYV9",
  price: "$49",             // 수정됨
  period: "/ 50분",
  experience: "7+ Years",   // 수정됨
  students: "400+",         // 수정됨
  rating: 5.0,
  profileSrc: "/images/profile.jpg",
  profileAlt: "Gyuhun Kim 프로필",
} as const

export default function HomeClient() {
  // ... (중간 로직 생략: 기존과 동일) ...

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 scroll-smooth">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="font-bold text-xl tracking-tighter text-blue-700">{BRAND.name}</div>
          <a href={BRAND.calendar} target="_blank">
            <Button className="rounded-full bg-blue-700 hover:bg-blue-800">
              무료 체험 수업 예약 <Gift className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-100 py-1 px-3">
              <Sparkles className="w-3 h-3 mr-2" /> 1:1 맞춤형 코칭
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              7년의 노하우,<br />실전 한국어의 <span className="text-blue-700">지름길</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              400명 이상의 학생이 증명한 커리큘럼. <br />
              <strong className="text-slate-900 underline decoration-blue-200 decoration-4">
                웹사이트를 통해 구글 캘린더로 예약하시면 첫 체험 수업은 무료입니다.
              </strong>
            </p>
            
            {/* 데이터 연동 카드 섹션 (괴리가 있었던 부분) */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex-1 min-w-[140px] text-center">
                <div className="text-blue-700 font-bold text-3xl">{BRAND.experience}</div>
                <div className="text-sm text-slate-500 font-medium">Teaching Career</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex-1 min-w-[140px] text-center">
                <div className="text-blue-700 font-bold text-3xl">{BRAND.students}</div>
                <div className="text-sm text-slate-500 font-medium">Students Taught</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex-1 min-w-[140px] text-center">
                <div className="text-blue-700 font-bold text-3xl">{BRAND.price}</div>
                <div className="text-sm text-slate-500 font-medium">{BRAND.period}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={BRAND.calendar} target="_blank" className="flex-1">
                <Button size="lg" className="w-full rounded-2xl bg-blue-700 py-8 text-xl font-bold hover:bg-blue-800 shadow-xl shadow-blue-100">
                  무료 체험 수업 신청
                </Button>
              </a>
            </div>
          </motion.div>

          {/* 프로필 이미지 섹션 */}
          <div className="relative">
             <Image 
                src={BRAND.profileSrc} 
                alt={BRAND.profileAlt} 
                width={500} height={600} 
                className="rounded-[3rem] shadow-2xl border-8 border-white"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <div className="font-bold text-lg">Preply Top Rated</div>
                <div className="text-sm text-slate-500">{BRAND.rating} Star Professional Coach</div>
             </div>
          </div>
        </section>

        {/* 상담 신청 섹션 (이하 생략 - 기존 폼 유지) */}
      </main>
    </div>
  )
}