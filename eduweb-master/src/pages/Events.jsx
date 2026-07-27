import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';
import course1 from '../assets/images/course-1.jpg';
import course2 from '../assets/images/course-2.jpg';
import course3 from '../assets/images/course-3.jpg';
import blog1 from '../assets/images/blog-1.jpg';
import blog2 from '../assets/images/blog-2.jpg';
import blog3 from '../assets/images/blog-3.jpg';
import videoBanner from '../assets/images/video-banner.jpg';
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoVideocamOutline,
  IoPersonOutline,
  IoCheckmarkCircle,
  IoTicketOutline,
  IoSearchOutline,
  IoFunnelOutline,
  IoPeopleOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';

const FALLBACK_IMAGES = [course1, course2, course3, blog1, blog2, blog3, videoBanner];

const UPCOMING_EVENTS = [
  {
    id: 'evt_1',
    title: 'Future of AI in Web Development & Software Engineering',
    speaker: 'Dr. Marcus Vance (AI Researcher)',
    date: 'August 15, 2026',
    time: '6:00 PM - 7:30 PM EST',
    category: 'AI & Engineering',
    attendees: 1420,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Join leading tech pioneers as we discuss generative AI, automated coding pipelines, and modern web architecture.',
  },
  {
    id: 'evt_2',
    title: 'Mastering Scalable Microservices with Node.js & React',
    speaker: 'Sarah Connor (Senior Cloud Architect)',
    date: 'August 22, 2026',
    time: '4:00 PM - 5:30 PM EST',
    category: 'System Architecture',
    attendees: 890,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'In-depth live session covering event-driven architecture, Docker containers, and high-concurrency database queries.',
  },
  {
    id: 'evt_3',
    title: 'UI/UX Design Systems & Micro-Interactions Masterclass',
    speaker: 'Alex Rivera (Principal Product Designer)',
    date: 'September 5, 2026',
    time: '5:00 PM - 6:30 PM EST',
    category: 'Design & UX',
    attendees: 1100,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Learn how to build sleek design tokens, glassmorphism layouts, and smooth 60fps micro-animations in web applications.',
  },
  {
    id: 'evt_4',
    title: 'Next.js 15 App Router & Server Actions in Action',
    speaker: 'Guillermo Rau (Frontend Lead)',
    date: 'September 12, 2026',
    time: '3:00 PM - 4:30 PM EST',
    category: 'Web Development',
    attendees: 1560,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Live coding workshop demonstrating Next.js 15 Server Components, streaming SSR, and Prisma ORM backend integration.',
  },
  {
    id: 'evt_5',
    title: 'Cybersecurity Threat Hunting & Cloud Penetration Testing',
    speaker: 'Elena Rostova (SecOps Director)',
    date: 'September 18, 2026',
    time: '7:00 PM - 8:30 PM EST',
    category: 'Cybersecurity',
    attendees: 740,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Hands-on lab simulating real-world security vulnerabilities, zero-day exploits, and AWS cloud defensive hardening.',
  },
  {
    id: 'evt_6',
    title: 'Rust for High-Performance Systems & WebAssembly',
    speaker: 'Klaus Webber (Systems Engineer)',
    date: 'September 25, 2026',
    time: '6:00 PM - 7:30 PM EST',
    category: 'AI & Engineering',
    attendees: 980,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Explore memory safety without garbage collection, WASM browser compilation, and zero-cost abstraction patterns in Rust.',
  },
  {
    id: 'evt_7',
    title: 'AWS Certified Cloud Architect Exam Prep & Q&A Workshop',
    speaker: 'David Kim (AWS Principal Consultant)',
    date: 'October 2, 2026',
    time: '5:00 PM - 7:00 PM EST',
    category: 'Cloud & DevOps',
    attendees: 2100,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Live walkthrough of AWS VPC networking, Auto Scaling groups, S3 security policies, and official practice exam questions.',
  },
  {
    id: 'evt_8',
    title: 'Building Production AI Chatbots with LangChain & Python',
    speaker: 'Priya Sharma (AI Engineer)',
    date: 'October 9, 2026',
    time: '4:00 PM - 5:30 PM EST',
    category: 'AI & Engineering',
    attendees: 1850,
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Learn how to build enterprise RAG chatbots connected to custom PDF documentation with Pinecone vector search.',
  },
  {
    id: 'evt_9',
    title: 'Flutter 3 Cross-Platform Mobile Engineering Webinar',
    speaker: 'Lucas Martinez (Mobile Lead)',
    date: 'October 15, 2026',
    time: '6:00 PM - 7:15 PM EST',
    category: 'Web Development',
    attendees: 910,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Master Flutter custom painter widgets, Riverpod state management, and compiling native iOS & Android binaries.',
  },
  {
    id: 'evt_10',
    title: 'Tailwind CSS v4 & Modern Utility-First Architecture',
    speaker: 'Adam Wathan (Design Systems Author)',
    date: 'October 22, 2026',
    time: '2:00 PM - 3:30 PM EST',
    category: 'Design & UX',
    attendees: 2300,
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Discover the new CSS-first Rust compiler engine in Tailwind CSS v4, container queries, and dynamic theme switching.',
  },
  {
    id: 'evt_11',
    title: 'High-Throughput Data Streaming with Apache Kafka',
    speaker: 'Vikram Sethi (Data Architect)',
    date: 'October 28, 2026',
    time: '5:30 PM - 7:00 PM EST',
    category: 'System Architecture',
    attendees: 830,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Learn pub-sub messaging patterns, partition replication, event sourcing, and real-time analytics with Kafka.',
  },
  {
    id: 'evt_12',
    title: 'PostgreSQL Database Performance Tuning & Indexing',
    speaker: 'Claire Dubois (Database Specialist)',
    date: 'November 4, 2026',
    time: '6:00 PM - 7:30 PM EST',
    category: 'System Architecture',
    attendees: 670,
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Analyze EXPLAIN query plans, B-Tree index structures, table partitioning, and PgBouncer connection pooling.',
  },
  {
    id: 'evt_13',
    title: 'Technical Leadership: From Senior Engineer to Tech Lead',
    speaker: 'Rachel Green (VP of Engineering)',
    date: 'November 10, 2026',
    time: '4:00 PM - 5:15 PM EST',
    category: 'Career & Leadership',
    attendees: 1450,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Essential soft skills for tech leads: sprint planning, 1-on-1 mentoring formats, and architecture decision records.',
  },
  {
    id: 'evt_14',
    title: 'Docker & Kubernetes Auto-Scaling Operations Lab',
    speaker: 'Hassan Ali (DevOps Specialist)',
    date: 'November 16, 2026',
    time: '7:00 PM - 8:30 PM EST',
    category: 'Cloud & DevOps',
    attendees: 1120,
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Interactive session on Helm charts, Kubernetes Horizontal Pod Autoscalers (HPA), and zero-downtime rolling upgrades.',
  },
  {
    id: 'evt_15',
    title: 'TypeScript 5.5 Advanced Generics & Monorepo Design',
    speaker: 'Daniel Rosen (Principal Engineer)',
    date: 'November 23, 2026',
    time: '5:00 PM - 6:30 PM EST',
    category: 'Web Development',
    attendees: 1290,
    image: 'https://images.unsplash.com/photo-1516116211223-4c71424afd05?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Master mapped types, conditional infer types, strict tsconfig flags, and Turborepo workspace configurations.',
  },
  {
    id: 'evt_16',
    title: 'GraphQL API Design & DataLoader Performance Lab',
    speaker: 'Anita Roy (Backend Architect)',
    date: 'December 1, 2026',
    time: '6:00 PM - 7:30 PM EST',
    category: 'System Architecture',
    attendees: 780,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Eliminate N+1 database queries using DataLoader batching, schema federation, and Apollo GraphQL Subscriptions.',
  },
  {
    id: 'evt_17',
    title: 'Figma to React Code Automation & Design Tokens',
    speaker: 'Chris Taylor (Design Technologist)',
    date: 'December 7, 2026',
    time: '3:30 PM - 5:00 PM EST',
    category: 'Design & UX',
    attendees: 1040,
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Automate design token sync between Figma variables and Tailwind CSS variables via GitHub Actions pipelines.',
  },
  {
    id: 'evt_18',
    title: 'Ethical Hacking: Web Application OWASP Top 10 Lab',
    speaker: 'Jake Thompson (Penetration Tester)',
    date: 'December 14, 2026',
    time: '6:30 PM - 8:00 PM EST',
    category: 'Cybersecurity',
    attendees: 1380,
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Hands-on security lab testing SQL injections, Cross-Site Scripting (XSS), CSRF bypasses, and SSRF attacks.',
  },
  {
    id: 'evt_19',
    title: 'Go (Golang) Microservices & Concurrency Masterclass',
    speaker: 'Taro Yamada (Go Core Contributor)',
    date: 'December 20, 2026',
    time: '5:00 PM - 6:30 PM EST',
    category: 'AI & Engineering',
    attendees: 1190,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Learn goroutines, channels, mutex locks, gRPC Protocol Buffers, and building ultra-fast microservices in Go.',
  },
  {
    id: 'evt_20',
    title: 'Building Accessible Websites with WCAG 2.2 Standards',
    speaker: 'Maya Lin (Accessibility Lead)',
    date: 'January 8, 2027',
    time: '4:00 PM - 5:15 PM EST',
    category: 'Design & UX',
    attendees: 860,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Screen reader auditing, ARIA role implementations, keyboard focus traps, and color contrast compliance tools.',
  },
  {
    id: 'evt_21',
    title: 'Software Engineer Resume & Coding Interview Strategy',
    speaker: 'Jason Miller (Former Tech Recruiter)',
    date: 'January 15, 2027',
    time: '6:00 PM - 7:30 PM EST',
    category: 'Career & Leadership',
    attendees: 2450,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Free career workshop covering resume formatting, GitHub portfolio reviews, system design mock interviews, and salary negotiation.',
  },
  {
    id: 'evt_22',
    title: 'Clean Architecture & Domain-Driven Design in Node.js',
    speaker: 'Robert Vance (Software Consultant)',
    date: 'January 22, 2027',
    time: '5:00 PM - 6:30 PM EST',
    category: 'System Architecture',
    attendees: 970,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=350',
    description: 'Implement Uncle Bob Clean Architecture, decoupling domain entities, repositories, and use case interactors in TypeScript.',
  },
];

function Events() {
  const { addNotification } = useNotifications();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleRegister = (event) => {
    if (registeredEvents.includes(event.id)) return;
    setRegisteredEvents([...registeredEvents, event.id]);
    addNotification(
      'Event Registration Confirmed! 🎟️',
      `You are registered for "${event.title}" on ${event.date}. Check your email for access instructions.`
    );
  };

  // Filter events based on search query and category
  const filteredEvents = useMemo(() => {
    return UPCOMING_EVENTS.filter((evt) => {
      const matchesCategory =
        selectedCategory === 'all' || evt.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'All Webinars' },
    { id: 'AI & Engineering', label: '🤖 AI & Engineering' },
    { id: 'Web Development', label: '💻 Web Development' },
    { id: 'System Architecture', label: '⚙️ System Architecture' },
    { id: 'Cloud & DevOps', label: '☁️ Cloud & DevOps' },
    { id: 'Design & UX', label: '🎨 Design & UX' },
    { id: 'Cybersecurity', label: '🔒 Cybersecurity' },
    { id: 'Career & Leadership', label: '💼 Career & Leadership' },
  ];

  return (
    <div className="events-page bg-slate-50 dark:bg-slate-950 min-h-screen py-10 text-left">
      <div className="container">
        {/* Breadcrumb Header */}
        <div className="mb-8 max-w-4xl">
          <div className="flex items-center gap-2 text-[1.4rem] text-gray-web font-medium mb-2 font-sans">
            <Link to="/" className="hover:text-kappel transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-eerie-black-1 dark:text-white font-semibold">Events & Workshops</span>
          </div>
          <h1 className="h1 font-spartan text-eerie-black-1 dark:text-white font-bold">
            Live Webinars & Tech Workshops ({UPCOMING_EVENTS.length} Events)
          </h1>
          <p className="text-[1.6rem] text-gray-web dark:text-slate-400 mt-2 font-sans max-w-[750px] leading-relaxed">
            Participate in interactive live streams with industry leaders, ask questions during Q&A sessions, and reserve your free tickets.
          </p>

          {/* Search & Category Bar */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-quick-silver text-[2.0rem]" />
              <input
                type="text"
                placeholder="Search event title, speaker, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3.5 pl-12 pr-4 bg-white dark:bg-slate-900 border border-platinum dark:border-slate-800 rounded-[8px] text-[1.4rem] font-sans text-eerie-black-1 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-kappel"
              />
            </div>

            <div className="text-[1.4rem] text-gray-web font-medium">
              Showing <strong className="text-kappel">{filteredEvents.length}</strong> upcoming events
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[1.3rem] font-spartan font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-kappel text-white shadow-md scale-105'
                    : 'bg-white dark:bg-slate-900 text-eerie-black-1 dark:text-slate-300 border border-platinum dark:border-slate-800 hover:bg-kappel-15 hover:text-kappel'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt, idx) => {
              const isRegistered = registeredEvents.includes(evt.id);
              const fallbackImg = FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];

              return (
                <div
                  key={evt.id}
                  className="bg-white dark:bg-slate-900 border border-platinum/60 dark:border-slate-800 rounded-[12px] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-light-gray overflow-hidden">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = fallbackImg;
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-kappel text-white font-spartan text-[1.2rem] font-bold px-3 py-1 rounded-[4px] uppercase tracking-wider shadow-sm">
                        {evt.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-4 text-[1.3rem] text-gray-web dark:text-slate-400 font-sans mb-3">
                        <div className="flex items-center gap-1.5">
                          <IoCalendarOutline className="text-kappel text-base" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <IoTimeOutline className="text-kappel text-base" />
                          <span>{evt.time}</span>
                        </div>
                      </div>

                      <h3 className="font-spartan text-[1.9rem] font-bold text-eerie-black-1 dark:text-white mb-2 leading-tight">
                        {evt.title}
                      </h3>

                      <p className="text-[1.4rem] text-gray-web dark:text-slate-300 font-sans mb-4 leading-relaxed line-clamp-2">
                        {evt.description}
                      </p>

                      <div className="flex items-center gap-2 pt-3 border-t border-platinum/40 dark:border-slate-800 text-[1.3rem] text-eerie-black-1 dark:text-slate-200 font-medium">
                        <IoPersonOutline className="text-kappel" />
                        <span>{evt.speaker}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    {isRegistered ? (
                      <div className="w-full py-3 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 rounded-[6px] text-[1.4rem] font-spartan font-bold flex items-center justify-center gap-2 border border-green-300 dark:border-green-800">
                        <IoCheckmarkCircle className="text-xl" />
                        <span>Registered - Seat Reserved</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRegister(evt)}
                        className="btn has-before w-full justify-center text-[1.4rem] py-3 flex items-center gap-2"
                      >
                        <IoTicketOutline className="text-xl" />
                        <span>Reserve Free Spot ({evt.attendees} Attending)</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 border border-platinum dark:border-slate-800 rounded-[12px]">
            <h3 className="font-spartan text-[2.4rem] font-bold text-eerie-black-1 dark:text-slate-100">
              No Events Found
            </h3>
            <p className="text-[1.5rem] text-gray-web dark:text-slate-400 mt-2 max-w-[400px] mx-auto font-sans">
              No live webinars match your search keyword or selected category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="btn has-before mx-auto mt-6"
            >
              View All Webinars
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
