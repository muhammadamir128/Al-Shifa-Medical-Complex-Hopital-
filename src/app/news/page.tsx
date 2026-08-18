"use client"

import { PublicLayout } from "@/components/shared/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Reveal, Stagger, StaggerItem, AnimatedCounter } from "@/components/motion"
import { DotGrid, PlusMarks, WaveDivider } from "@/components/illustrations"
import Image from "next/image"
import Link from "next/link"
import {
  Newspaper,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Search,
  Tag,
  Users,
  Award,
  Heart
} from "lucide-react"
import { useState } from "react"

const newsCategories = ["All News", "Announcements", "Events", "Awards", "Community"]

const featuredNews = {
  id: 1,
  title: "Al-Shifa Medical Complex Receives National Quality Healthcare Award 2024",
  excerpt: "We are proud to announce that Al-Shifa Medical Complex has been recognized with the prestigious National Quality Healthcare Award for excellence in patient care and medical innovation.",
  category: "Awards",
  date: "January 20, 2024",
  author: "Hospital Administration",
  image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
  featured: true
}

const newsItems = [
  {
    id: 2,
    title: "New Pediatric Wing Opening Ceremony",
    excerpt: "Join us for the grand opening of our state-of-the-art pediatric wing, featuring child-friendly facilities and specialized care units.",
    category: "Events",
    date: "January 25, 2024",
    time: "10:00 AM",
    location: "Main Hospital Campus",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&q=80"
  },
  {
    id: 3,
    title: "Free Health Camp for Senior Citizens",
    excerpt: "Organizing a free health screening camp for senior citizens above 60 years. Includes BP, sugar, and comprehensive health checkups.",
    category: "Community",
    date: "February 5, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "Community Center",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"
  },
  {
    id: 4,
    title: "Introduction of Robotic Surgery Program",
    excerpt: "Al-Shifa Medical Complex introduces advanced robotic surgery capabilities, offering minimally invasive procedures with faster recovery times.",
    category: "Announcements",
    date: "January 18, 2024",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&q=80"
  },
  {
    id: 5,
    title: "Blood Donation Drive Success",
    excerpt: "Thank you to all 450+ donors who participated in our quarterly blood donation drive. Your contribution helps save lives.",
    category: "Community",
    date: "January 15, 2024",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&q=80"
  },
  {
    id: 6,
    title: "Dr. Sarah Wilson Named Top Cardiologist",
    excerpt: "Our Chief Cardiologist, Dr. Sarah Wilson, has been recognized as one of the top 10 cardiologists in the region.",
    category: "Awards",
    date: "January 12, 2024",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80"
  },
  {
    id: 7,
    title: "Extended Emergency Department Hours",
    excerpt: "We are now offering extended hours in our emergency department to better serve our community's urgent care needs.",
    category: "Announcements",
    date: "January 10, 2024",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&q=80"
  },
  {
    id: 8,
    title: "Annual Medical Conference 2024",
    excerpt: "Join healthcare professionals from across the region for our annual medical conference featuring workshops and guest speakers.",
    category: "Events",
    date: "March 15-17, 2024",
    location: "Convention Center",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&q=80"
  }
]

const upcomingEvents = [
  {
    id: 1,
    title: "Heart Health Awareness Week",
    date: "Feb 1-7, 2024",
    description: "Free heart screenings and wellness workshops"
  },
  {
    id: 2,
    title: "Parent Education Seminar",
    date: "Feb 10, 2024",
    description: "Workshop on child health and development"
  },
  {
    id: 3,
    title: "Diabetes Management Camp",
    date: "Feb 20, 2024",
    description: "Free glucose testing and dietary counseling"
  }
]

const impactStats = [
  { label: "Patients Served", value: "10,000+" },
  { label: "Medical Staff", value: "500+" },
  { label: "Free Camps", value: "50+" },
  { label: "Awards Won", value: "25+" }
]

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Announcements": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "Events": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    "Awards": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    "Community": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
  }
  return colors[category] || "bg-gray-100 text-gray-700"
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, typeof Newspaper> = {
    "Announcements": Newspaper,
    "Events": Calendar,
    "Awards": Award,
    "Community": Users
  }
  return icons[category] || Newspaper
}

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All News")

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All News" || item.category === selectedCategory
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
              <Newspaper className="mr-1 h-3 w-3" />
              News & Events
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Latest Updates &{" "}
              <span className="text-gradient">Events</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Stay informed about hospital news, community events, awards, and
              healthcare initiatives.
            </p>

            {/* Search */}
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                placeholder="Search news and events..."
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
            {newsCategories.map((category) => (
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

      {/* Main Content */}
      <section className="container py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* News Grid */}
          <div className="space-y-8 lg:col-span-2">
            {/* Featured News */}
            {selectedCategory === "All News" && !searchQuery && (
              <Reveal>
                <Card className="overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={featuredNews.image}
                        alt={featuredNews.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <CardContent className="p-8">
                      <Badge className={getCategoryColor(featuredNews.category)}>
                        {featuredNews.category}
                      </Badge>
                      <h2 className="mb-3 mt-4 cursor-pointer text-2xl font-bold hover:text-primary">
                        {featuredNews.title}
                      </h2>
                      <p className="mb-4 text-muted-foreground">{featuredNews.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {featuredNews.date}
                        </span>
                        <span>{featuredNews.author}</span>
                      </div>
                      <Button className="group mt-6">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Reveal>
            )}

            {/* News List */}
            <Stagger className="space-y-4">
              {filteredNews.map((item) => {
                return (
                  <StaggerItem key={item.id}>
                    <Card className="group overflow-hidden border-none shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, 192px"
                            />
                          </div>
                          <div className="flex-1 p-6">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              <Badge className={getCategoryColor(item.category)}>
                                {item.category}
                              </Badge>
                            </div>
                            <h3 className="mb-2 cursor-pointer text-lg font-semibold transition-colors group-hover:text-primary">
                              {item.title}
                            </h3>
                            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                              {item.excerpt}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {item.date}
                              </span>
                              {item.time && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {item.time}
                                </span>
                              )}
                              {item.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {item.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                )
              })}
            </Stagger>

            {filteredNews.length === 0 && (
              <Reveal className="py-12 text-center">
                <Newspaper className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium">No news found</h3>
                <p className="text-muted-foreground">Try adjusting your search or category filter</p>
              </Reveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Reveal direction="left">
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Events
                  </h3>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="group flex cursor-pointer gap-4">
                        <div className="shrink-0 text-center">
                          <div className="rounded-lg bg-primary/10 px-3 py-2">
                            <p className="text-xs font-medium text-primary">{event.date.split(",")[0]}</p>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-medium transition-colors group-hover:text-primary">
                            {event.title}
                          </h4>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="group mt-4 w-full" size="sm">
                    View All Events
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </Reveal>

            {/* Newsletter Signup */}
            <Reveal direction="left" delay={0.1}>
              <Card className="border-none bg-primary/5 shadow-md">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-semibold">Stay Updated</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Subscribe to receive the latest news and health tips.
                  </p>
                  <div className="space-y-3">
                    <Input placeholder="Your email address" />
                    <Button className="w-full">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            {/* Quick Stats */}
            <Reveal direction="left" delay={0.2}>
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold">Our Impact</h3>
                  <div className="space-y-4">
                    {impactStats.map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                        <AnimatedCounter value={stat.value} className="font-bold text-primary" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Reveal className="relative overflow-hidden rounded-2xl bg-primary/5 p-8 text-center md:p-12">
          <WaveDivider className="absolute inset-x-0 bottom-0 text-primary/10" flip />
          <h2 className="relative mb-4 text-3xl font-bold tracking-tight">
            Join Our Community Events
          </h2>
          <p className="relative mx-auto mb-8 max-w-2xl text-muted-foreground">
            Participate in our health camps, awareness programs, and community events.
            Together, we can make healthcare accessible to everyone.
          </p>
          <div className="relative flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="group">
                Get Involved
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline">
                View Services
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>
    </PublicLayout>
  )
}
