"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Reveal, Stagger, StaggerItem } from "@/components/motion"
import { DotGrid, PlusMarks, WaveDivider } from "@/components/illustrations"
import Image from "next/image"
import Link from "next/link"
import {
  BookOpen,
  Search,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Heart,
  Brain,
  Bone,
  Activity,
  Pill,
  Eye,
  Tag
} from "lucide-react"
import { useState } from "react"

const categories = [
  "All Posts",
  "Heart Health",
  "Mental Health",
  "Bone & Joint",
  "General Wellness",
  "Medications",
  "Eye Care"
]

const featuredPost = {
  id: 1,
  slug: "understanding-heart-health",
  title: "Understanding Heart Health: A Complete Guide to Cardiovascular Wellness",
  excerpt: "Learn about the key factors that contribute to heart health, from diet and exercise to stress management and regular check-ups. This comprehensive guide covers everything you need to know about maintaining a healthy heart.",
  category: "Heart Health",
  author: "Dr. Sarah Wilson",
  authorRole: "Chief Cardiologist",
  date: "January 15, 2024",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
  featured: true
}

const blogPosts = [
  {
    id: 2,
    slug: "mental-health-awareness",
    title: "Mental Health Awareness: Breaking the Stigma",
    excerpt: "Mental health is just as important as physical health. Learn about common mental health conditions and how to seek help.",
    category: "Mental Health",
    author: "Dr. Andrew Foster",
    authorRole: "Psychiatrist",
    date: "January 12, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80"
  },
  {
    id: 3,
    slug: "joint-pain-management",
    title: "Managing Joint Pain: Tips for Better Mobility",
    excerpt: "Practical advice for managing joint pain and improving your quality of life through lifestyle changes and treatment options.",
    category: "Bone & Joint",
    author: "Dr. Lisa Chen",
    authorRole: "Orthopedic Surgeon",
    date: "January 10, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"
  },
  {
    id: 4,
    slug: "importance-of-regular-checkups",
    title: "The Importance of Regular Health Check-ups",
    excerpt: "Preventive care is key to maintaining good health. Discover why regular check-ups are essential for early detection and prevention.",
    category: "General Wellness",
    author: "Dr. Emma Thompson",
    authorRole: "General Physician",
    date: "January 8, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80"
  },
  {
    id: 5,
    slug: "understanding-medications",
    title: "Understanding Your Medications: A Patient's Guide",
    excerpt: "Everything you need to know about taking medications safely, including tips for managing prescriptions and avoiding interactions.",
    category: "Medications",
    author: "Dr. James Wilson",
    authorRole: "Clinical Pharmacist",
    date: "January 5, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80"
  },
  {
    id: 6,
    slug: "eye-health-tips",
    title: "Protecting Your Eyes: Essential Tips for Digital Age",
    excerpt: "With increased screen time, eye health has become more important than ever. Learn how to protect your vision in the digital age.",
    category: "Eye Care",
    author: "Dr. John Martinez",
    authorRole: "Ophthalmologist",
    date: "January 3, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=600&q=80"
  },
  {
    id: 7,
    slug: "healthy-heart-diet",
    title: "Heart-Healthy Diet: Foods That Protect Your Heart",
    excerpt: "Discover the best foods for cardiovascular health and learn how to create a heart-healthy meal plan.",
    category: "Heart Health",
    author: "Dr. Sarah Wilson",
    authorRole: "Chief Cardiologist",
    date: "January 1, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
  },
  {
    id: 8,
    slug: "stress-anxiety-management",
    title: "Managing Stress and Anxiety in Daily Life",
    excerpt: "Practical techniques for managing stress and anxiety to improve your mental well-being and overall health.",
    category: "Mental Health",
    author: "Dr. Andrew Foster",
    authorRole: "Psychiatrist",
    date: "December 28, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=600&q=80"
  }
]

const getCategoryIcon = (category: string) => {
  const icons: Record<string, typeof Heart> = {
    "Heart Health": Heart,
    "Mental Health": Brain,
    "Bone & Joint": Bone,
    "General Wellness": Activity,
    "Medications": Pill,
    "Eye Care": Eye
  }
  return icons[category] || Activity
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Heart Health": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    "Mental Health": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    "Bone & Joint": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "General Wellness": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    "Medications": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    "Eye Care": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300"
  }
  return colors[category] || "bg-gray-100 text-gray-700"
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Posts")

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/[0.07] to-background py-20">
        <DotGrid className="absolute inset-0 text-primary/20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
        <div className="container relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="mr-1 h-3 w-3" />
              Health Blog
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Health Insights &{" "}
              <span className="text-gradient">Medical Articles</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Stay informed with the latest health tips, medical insights, and wellness
              advice from our expert healthcare professionals.
            </p>

            {/* Search */}
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="h-12 pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y bg-muted/30 py-4">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === "All Posts" && !searchQuery && (
        <section className="container py-12">
          <Reveal>
            <div className="mb-6">
              <Badge variant="secondary" className="mb-2">Featured Article</Badge>
            </div>
            <Card className="overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <Badge className={getCategoryColor(featuredPost.category)}>
                      {featuredPost.category}
                    </Badge>
                    <Badge variant="outline">Featured</Badge>
                  </div>
                  <h2 className="mb-4 cursor-pointer text-2xl font-bold hover:text-primary">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="mb-6 text-muted-foreground">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{featuredPost.author}</p>
                        <p className="text-xs text-muted-foreground">{featuredPost.authorRole}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button className="group mt-6 w-full sm:w-auto">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </Reveal>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="container py-12">
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            return (
              <StaggerItem key={post.id}>
                <Card className="group h-full overflow-hidden border-none shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                    <h3 className="mb-2 mt-3 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>

                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">{post.author}</p>
                          <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            )
          })}
        </Stagger>

        {filteredPosts.length === 0 && (
          <Reveal className="py-12 text-center">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-medium">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
          </Reveal>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Stay Updated</Badge>
            <h2 className="mb-4 text-2xl font-bold">Subscribe to Our Newsletter</h2>
            <p className="mb-6 text-muted-foreground">
              Get the latest health tips and articles delivered directly to your inbox.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Reveal className="relative overflow-hidden rounded-2xl bg-primary/5 p-8 text-center md:p-12">
          <WaveDivider className="absolute inset-x-0 bottom-0 text-primary/10" flip />
          <h2 className="relative mb-4 text-3xl font-bold tracking-tight">
            Have a Health Question?
          </h2>
          <p className="relative mx-auto mb-8 max-w-2xl text-muted-foreground">
            Our team of medical experts is here to help. Book a consultation or
            contact us for personalized health advice.
          </p>
          <div className="relative flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="group">
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/faq">
              <Button size="lg" variant="outline">
                View FAQ
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>
    </PublicLayout>
  )
}
