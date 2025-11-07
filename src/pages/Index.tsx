import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Bell, BarChart3, TrendingUp, AlertCircle, Box, Star, ChevronRight, Check, Zap, Shield, Users, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import warehouseHero from "@/assets/warehouse-hero.jpg";
import { useEffect, useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/20 via-secondary/20 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-20 w-[500px] h-[500px] bg-gradient-to-br from-secondary/20 via-accent/20 to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-accent/20 via-primary/20 to-transparent rounded-full blur-3xl animate-float" />

        {/* Rotating SVG shapes */}
        <svg className="absolute top-1/4 right-1/4 w-32 h-32 text-primary/10 animate-rotate-slow" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-1/4 left-1/4 w-40 h-40 text-secondary/10 animate-rotate-slow" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="currentColor" />
        </svg>
      </div>

      {/* Sticky Glass Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Inventra
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {/* <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
              <a href="#demo" className="text-foreground hover:text-primary transition-colors">How it Works</a>
              <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a> */}
            </div>

            {/* <Button variant="gradient" size="lg">
              Get Started Free <ArrowRight className="w-4 h-4 ml-1" />
            </Button> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-8 md:py-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-block px-4 py-2 backdrop-blur-lg bg-white/60 border border-white/20 rounded-full shadow-lg">
              <span className="text-sm font-medium bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ✨ The Future of Inventory Management
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Online{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Inventory Control
              </span>
              , Reimagined.
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Stop guessing. Start controlling. Inventra is the all-in-one platform to automate your stock,
              prevent shortages, and scale your business across India with confidence.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="gradient"
                size="xl"
                onClick={() => {
                  const newTab = window.open("https://inventra-oics.vercel.app/", "_blank");
                  if (newTab) newTab.focus();
                }}
              >
                Start Your Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                variant="glass"
                size="xl"
                className="hover:shadow-[0_0_30px_rgba(236,72,153,0.6),0_0_60px_rgba(236,72,153,0.3)] transition-all duration-1000"
                style={{
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}
                onClick={() => {
                  const newTab = window.open("https://inventra-oics.vercel.app/", "_blank");
                  if (newTab) newTab.focus();
                }}
              >
                <span style={{ animation: 'color-shift 3s ease-in-out infinite', fontWeight: 'bold' }}>
                  Login Now
                </span>
                <ArrowRight className="w-5 h-5 ml-2" style={{ animation: 'color-shift 3s ease-in-out infinite' }} />
              </Button>
            </div>


            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[testimonial1, testimonial2, testimonial3].map((img, i) => (
                  <img key={i} src={img} alt="Customer" className="w-12 h-12 rounded-full border-2 border-white shadow-lg" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Trusted by 10,000+ Indian businesses</p>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Animated Cards */}
          <div className="relative h-[600px] perspective-1000">
            <AnimatedCard3D delay={0}>
              <div className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Critical Alert</p>
                    <p className="font-semibold">Low Stock Warning</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">SKU: 88021 - Product 85</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-red-100 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-gradient-to-r from-red-500 to-red-600 animate-pulse-glow" />
                  </div>
                  <span className="text-sm font-bold text-red-600">25%</span>
                </div>
              </div>
            </AnimatedCard3D>

            <AnimatedCard3D delay={1}>
              <div className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sales Performance</p>
                    <p className="font-semibold text-2xl">+15.8%</p>
                  </div>
                </div>
                <svg className="w-full h-20" viewBox="0 0 200 50">
                  <path
                    d="M 0,40 L 40,30 L 80,35 L 120,20 L 160,25 L 200,15"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    fill="none"
                    className="animate-draw-line"
                    strokeDasharray="1000"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(150 80% 45%)" />
                      <stop offset="100%" stopColor="hsl(180 75% 50%)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </AnimatedCard3D>

            <AnimatedCard3D delay={2}>
              <div className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <img src={warehouseHero} alt="Product" className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold">Product 452</p>
                    <p className="text-sm text-muted-foreground">SKU: 98042</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">In Stock</span>
                      <span className="text-sm font-bold">₹24,999</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard3D>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="relative z-10 container mx-auto px-6 py-2">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
            Trusted by industry leaders worldwide
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex py-5 items-center gap-12 animate-scroll">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-12 shrink-0">
                {['Flipkart', 'Amazon', 'Myntra', 'Nykaa', 'BigBasket', 'Swiggy'].map((company, i) => (
                  <div
                    key={`${setIndex}-${i}`}
                    className="backdrop-blur-lg bg-white/40 border border-white/20 rounded-2xl px-8 py-6 shadow-lg hover:scale-110 hover:bg-white/60 transition-all duration-300 shrink-0"
                  >
                    <span className="text-2xl font-bold text-muted-foreground/60">{company}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything you need,{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              nothing you don't
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your inventory operations and boost efficiency
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Box className="w-8 h-8" />}
            gradient="from-blue-500 to-blue-600"
            title="Real-Time Product Management"
            description="Add, edit, and track all your products in one place with our intuitive interface. Never lose track of a single SKU."
          />
          <FeatureCard
            icon={<Bell className="w-8 h-8" />}
            gradient="from-red-500 to-red-600"
            title="Automated Low-Stock Alerts"
            description="Our system auto-triggers alerts to your dashboard and email when stock falls below your custom threshold. Stop stockouts before they happen."
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            gradient="from-green-500 to-green-600"
            title="Instant, Powerful Reports"
            description="Generate downloadable PDF & Excel reports for inventory status, transaction logs, and sales performance in seconds."
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing that grows with your business
          </p>

          <PricingToggle />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            name="Starter"
            price="3,999"
            period="month"
            description="Perfect for small businesses just getting started"
            features={[
              "Up to 1,000 products",
              "Basic reporting",
              "Email support",
              "Mobile app access",
              "Single location"
            ]}
            popular={false}
          />
          <PricingCard
            name="Professional"
            price="12,199"
            period="month"
            description="For growing businesses with advanced needs"
            features={[
              "Up to 10,000 products",
              "Advanced analytics",
              "Priority support 24/7",
              "Multiple locations",
              "API access",
              "Custom integrations"
            ]}
            popular={true}
          />
          <PricingCard
            name="Enterprise"
            price="Custom"
            period=""
            description="Tailored solutions for large organizations"
            features={[
              "Unlimited products",
              "Dedicated account manager",
              "Custom development",
              "On-premise deployment",
              "SLA guarantee",
              "Advanced security"
            ]}
            popular={false}
          />
        </div>
      </section>

      {/* Interactive Dashboard Demo Section */}
      <section id="demo" className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              See{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Inventra
              </span>
              {" "}in Action
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A Dashboard That Does the Work for You
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              No more complex spreadsheets. Our dashboard gives you a real-time, bird's-eye view of your
              entire operation, with dynamic charts that are always up-to-date.
            </p>
            <ul className="space-y-4">
              {[
                "Live inventory tracking across all locations",
                "Predictive analytics for demand forecasting",
                "One-click report generation",
                "Mobile-responsive design for on-the-go management"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Stock Movements (Live)</h3>
              <p className="text-sm text-muted-foreground">Real-time inventory flow visualization</p>
            </div>

            <LiveChart />

            <div className="grid grid-cols-3 gap-4 mt-8">
              <StatCard
                label="Total Items"
                value="12,847"
                change="+12%"
                positive
              />
              <StatCard
                label="Low Stock"
                value="23"
                change="-8%"
                positive
              />
              <StatCard
                label="Out of Stock"
                value="5"
                change="+2"
                positive={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Businesses That Scale
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">Don't just take our word for it</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TestimonialCard
            image={testimonial1}
            name="Rajesh Sharma"
            role="CEO, TechCart Solutions"
            rating={5}
            quote="Inventra changed the way we do business. We cut our inventory waste by 30% in just three months. The automated alerts alone have saved us lakhs of rupees."
          />
          <TestimonialCard
            image={testimonial2}
            name="Priya Patel"
            role="Operations Director, Fashion Bazaar"
            rating={5}
            quote="The real-time dashboard is a game-changer. I can manage our entire inventory from my phone while traveling across India. It's intuitive, powerful, and beautiful."
          />
          <TestimonialCard
            image={testimonial3}
            name="Vikram Singh"
            role="Inventory Manager, Express Logistics"
            rating={5}
            quote="We've tried every inventory system out there. Inventra is the only one that actually delivers on its promises. Setup took 10 minutes, and we were running the same day."
          />
        </div>
      </section>

      {/* Integration Partners Section */}
      {/* <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Seamless{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Integrations
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with the tools you already use and love
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'Shopify', category: 'E-commerce', color: 'from-green-500 to-green-600' },
            { name: 'WooCommerce', category: 'E-commerce', color: 'from-purple-500 to-purple-600' },
            { name: 'Tally ERP', category: 'Accounting', color: 'from-blue-500 to-blue-600' },
            { name: 'Razorpay', category: 'Payments', color: 'from-indigo-500 to-indigo-600' },
            { name: 'Paytm Business', category: 'Payments', color: 'from-orange-500 to-orange-600' },
            { name: 'Slack', category: 'Communication', color: 'from-pink-500 to-pink-600' },
            { name: 'Flipkart Seller', category: 'Marketplace', color: 'from-cyan-500 to-cyan-600' },
            { name: 'Amazon', category: 'Marketplace', color: 'from-yellow-500 to-yellow-600' }
          ].map((integration, i) => (
            <IntegrationCard key={i} {...integration} delay={i * 0.1} />
          ))}
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">Everything you need to know about Inventra</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl px-6 shadow-lg">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                How quickly can I get started with Inventra?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can be up and running in less than 5 minutes. Simply sign up, import your existing inventory
                (via CSV or API), and you're ready to go. No credit card required for the free trial.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl px-6 shadow-lg">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Can I migrate my existing inventory data?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutely! We support bulk imports via CSV, Excel, or direct API integration. Our support team
                can also assist with custom migration from your current system at no extra cost on Professional
                and Enterprise plans.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl px-6 shadow-lg">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Is my data secure?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Security is our top priority. We use bank-level 256-bit SSL encryption, regular security audits,
                and comply with Indian data protection laws, SOC 2, and GDPR standards. Your data is backed up daily
                and stored in secure data centers within India.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl px-6 shadow-lg">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Can I cancel anytime?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! There are no long-term contracts or cancellation fees. You can upgrade, downgrade, or cancel
                your subscription at any time. You'll retain access until the end of your billing period.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl px-6 shadow-lg">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Do you offer training and support?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! All plans include comprehensive documentation and video tutorials in English and Hindi.
                Professional and Enterprise plans get priority 24/7 support with local Indian support team,
                and Enterprise customers receive dedicated onboarding and ongoing training sessions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl px-6 shadow-lg">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Do you support GST and Indian tax compliance?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutely! Inventra includes built-in GST calculations, HSN/SAC code support, and generates
                GST-compliant invoices and reports. We also integrate with popular Indian accounting software
                like Tally ERP to ensure seamless tax compliance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="backdrop-blur-lg bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-white/20 rounded-3xl p-12 shadow-xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                10,000+
              </div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                50M+
              </div>
              <div className="text-muted-foreground">Products Tracked</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                99.9%
              </div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Let's{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Talk
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Have questions? Our team is here to help you succeed.
              </p>
            </div>

            <div className="space-y-6">
              <ContactInfoItem
                icon={<Mail className="w-6 h-6" />}
                title="Email Us"
                content="support@inventra.com"
                gradient="from-blue-500 to-blue-600"
              />
              <ContactInfoItem
                icon={<Phone className="w-6 h-6" />}
                title="Call Us"
                content="+91 98765 43210"
                gradient="from-green-500 to-green-600"
              />
              <ContactInfoItem
                icon={<MapPin className="w-6 h-6" />}
                title="Visit Us"
                content="Sector V, Kolkata, West Bengal"
                gradient="from-purple-500 to-purple-600"
              />
            </div>

            <div className="backdrop-blur-lg bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-white/20 rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold mb-2">Enterprise Solutions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Need a custom solution for your organization? Our enterprise team is ready to help.
              </p>
              <Button variant="gradient" size="sm">
                Schedule a Demo <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <ContactForm />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20 mb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-12 md:p-20 text-center shadow-2xl">
          {/* Animated circles in background */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full animate-pulse-glow" />
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Ready to Take Control of Your Inventory?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Get started in 5 minutes. No credit card required. Ever.
            </p>
            <Button
              variant="glass"
              size="xl"
              onClick={() => {
                const newTab = window.open("https://inventra-oics.vercel.app/", "_blank");
                if (newTab) newTab.focus();
              }}
            >
              Start Your Free Trial <ArrowRight className="w-5 h-5 ml-2" />
            </Button>



            <p className="text-sm text-white/80">Join 10,000+ Indian businesses already using Inventra</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 backdrop-blur-lg bg-white/60">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary via-secondary to-accent rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Inventra
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                The future of inventory control, today.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#demo" className="hover:text-primary transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20 text-center text-sm text-muted-foreground">
            <p>© 2025 Inventra. All rights reserved.😎 Designed by Anirban Bandyopadhyay</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Component for 3D animated cards in hero
const AnimatedCard3D = ({ children, delay }: { children: React.ReactNode; delay: number }) => {
  const positions = [
    { top: '10%', right: '5%', rotate: '5deg' },
    { top: '35%', right: '15%', rotate: '-8deg' },
    { top: '60%', right: '8%', rotate: '3deg' }
  ];

  return (
    <div
      className="absolute hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer"
      style={{
        top: positions[delay].top,
        right: positions[delay].right,
        transform: `rotate(${positions[delay].rotate})`,
        animation: `float ${15 + delay * 2}s ease-in-out infinite`,
        animationDelay: `${delay * 0.5}s`
      }}
    >
      {children}
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, gradient, title, description }: {
  icon: React.ReactNode;
  gradient: string;
  title: string;
  description: string;
}) => (
  <div className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
    <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white`}>
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

// Live Chart Component with animated line
const LiveChart = () => {
  const canvasRef = useRef<SVGPathElement>(null);

  return (
    <div className="relative h-48 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4">
      <svg className="w-full h-full" viewBox="0 0 400 160">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(220 90% 56%)" />
            <stop offset="50%" stopColor="hsl(270 70% 60%)" />
            <stop offset="100%" stopColor="hsl(320 85% 65%)" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[...Array(5)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={i * 40}
            x2="400"
            y2={i * 40}
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted/20"
          />
        ))}

        {/* Animated line */}
        <path
          ref={canvasRef}
          d="M 0,120 L 50,100 L 100,110 L 150,70 L 200,80 L 250,50 L 300,60 L 350,30 L 400,40"
          stroke="url(#chartGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-draw-line"
          style={{
            strokeDasharray: '1000',
            strokeDashoffset: '1000',
            animation: 'draw-line 4s ease-in-out infinite'
          }}
        />

        {/* Data points */}
        {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((x, i) => {
          const yValues = [120, 100, 110, 70, 80, 50, 60, 30, 40];
          return (
            <circle
              key={i}
              cx={x}
              cy={yValues[i]}
              r="4"
              className="fill-primary animate-pulse-glow"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ label, value, change, positive }: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) => (
  <div className="text-center space-y-1">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
      {change}
    </div>
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({ image, name, role, rating, quote }: {
  image: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}) => (
  <div className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
    <div className="flex items-center gap-1 mb-4 text-yellow-500">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-current" />
      ))}
    </div>
    <p className="text-foreground mb-6 leading-relaxed italic">"{quote}"</p>
    <div className="flex items-center gap-4">
      <img src={image} alt={name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg" />
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </div>
    </div>
  </div>
);

// Pricing Toggle Component
const PricingToggle = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <span className={`text-sm font-medium transition-colors ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
        Monthly
      </span>
      <button
        onClick={() => setIsAnnual(!isAnnual)}
        className="relative w-16 h-8 backdrop-blur-lg bg-white/60 border border-white/20 rounded-full shadow-lg transition-all hover:scale-105"
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-0'
            }`}
        />
      </button>
      <span className={`text-sm font-medium transition-colors ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
        Annual
        <span className="ml-1 text-xs bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold">
          Save 20%
        </span>
      </span>
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({ name, price, period, description, features, popular }: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
}) => (
  <div className={`relative backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ${popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''
    }`}>
    {popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary via-secondary to-accent text-white text-sm font-semibold rounded-full shadow-lg">
        Most Popular
      </div>
    )}

    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-baseline justify-center gap-1">
        {price !== 'Custom' && <span className="text-2xl font-semibold">₹</span>}
        <span className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {price}
        </span>
        {period && <span className="text-muted-foreground">/{period}</span>}
      </div>
    </div>

    <ul className="space-y-4 mb-8">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm text-foreground">{feature}</span>
        </li>
      ))}
    </ul>

    <Button
      variant={popular ? "gradient" : "glass"}
      size="lg"
      className="w-full"
    >
      {price === 'Custom' ? 'Contact Sales' : 'Get Started'}
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  </div>
);

// Integration Card Component
const IntegrationCard = ({ name, category, color, delay }: {
  name: string;
  category: string;
  color: string;
  delay: number;
}) => (
  <div
    className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer"
    style={{ animationDelay: `${delay}s` }}
  >
    <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
      <Zap className="w-7 h-7 text-white" />
    </div>
    <h3 className="font-bold text-lg mb-1">{name}</h3>
    <p className="text-sm text-muted-foreground">{category}</p>
    <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
      Connect <ChevronRight className="w-4 h-4 ml-1" />
    </div>
  </div>
);

// Contact Info Item Component
const ContactInfoItem = ({ icon, title, content, gradient }: {
  icon: React.ReactNode;
  title: string;
  content: string;
  gradient: string;
}) => (
  <div className="flex items-start gap-4">
    <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center flex-shrink-0 text-white`}>
      {icon}
    </div>
    <div>
      <div className="font-semibold mb-1">{title}</div>
      <div className="text-muted-foreground">{content}</div>
    </div>
  </div>
);

// Contact Form Component with validation
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters")
});

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const validated = contactSchema.parse(formData);

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="backdrop-blur-lg bg-white/60 border border-white/20 rounded-2xl p-8 shadow-lg space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name *
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="backdrop-blur-lg bg-white/80 border-white/30"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@company.com"
          className="backdrop-blur-lg bg-white/80 border-white/30"
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          Company
        </label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your Company"
          className="backdrop-blur-lg bg-white/80 border-white/30"
        />
        {errors.company && <p className="text-red-600 text-sm mt-1">{errors.company}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your inventory management needs..."
          rows={5}
          className="backdrop-blur-lg bg-white/80 border-white/30"
        />
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
        {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
      </Button>
    </form>
  );
};

export default Index;
