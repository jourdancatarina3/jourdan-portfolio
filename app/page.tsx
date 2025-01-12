'use client';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from "next/image";
import Navbar from "./components/Navbar";
import { FaReact, FaNodeJs, FaAws } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiDocker } from 'react-icons/si';
import SkillCard from './components/SkillCard';
import WelcomeAnimation from './components/WelcomeAnimation';
import { fadeInUp, staggerContainer } from './components/animations';
import ScrollAnimation from './components/ScrollAnimation';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface Project {
  title: string;
  description: string;
  images: {
    original: string;
    thumbnail: string;
    description?: string;
  }[];
  tags: string[];
  link: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  logo: string;
}

interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
  achievements: string[];
  logo: string;
  gpa?: string;
}

interface Social {
  name: string;
  icon: React.ElementType;
  url: string;
  color: string;
}

const socials: Social[] = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/jourdancatarina',
    color: 'hover:text-[#2ea44f]'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/jourdancatarina',
    color: 'hover:text-[#0077b5]'
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    url: 'https://twitter.com/jourdancatarina',
    color: 'hover:text-[#1da1f2]'
  },
  {
    name: 'Email',
    icon: HiMail,
    url: 'mailto:jourdancatarina3@gmail.com',
    color: 'hover:text-[#ea4c89]'
  }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const projects = [
    {
      title: "Badge Guru",
      description: "A mobile app that uses robust scanning technology to scan car emblems and automatically generate vector files for custom sticker cutting",
      images: [
        {
          original: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
          thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=160",
          description: "Main screen"
        },
        {
          original: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
          thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=160",
          description: "Chat screen"
        },
        {
          original: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
          thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=160",
          description: "Profile screen"
        }
      ],
      tags: ["React Native", "Firebase", "Redux"],
      link: "#"
    },
    {
      title: "Finite Automata Visualizer",
      description: "A visualizer for finite automata built with NextJS and TypeScript",
      images: [
        {
          original: "/projects/favisualizer1.png",
          thumbnail: "/projects/favisualizer1.png",
          description: "Main screen"
        },
        {
          original: "/projects/favisualizer2.png",
          thumbnail: "/projects/favisualizer2.png",
          description: "Main screen with sidebars"
        },
        {
          original: "/projects/favisualizer3.png",
          thumbnail: "/projects/favisualizer3.png",
          description: "Mobile view and Tablet view"
        }
      ],
      tags: ["Next.js", "React", "Node.js", "TypeScript"],
      link: "https://favisualizer.vercel.app/"
    },
    {
      title: "Promptopia",
      description: "AI prompting tool for modern world to discover, create and share creative prompts",
      images: [
        {
          original: "/projects/promptopia.png",
          thumbnail: "/projects/promptopia.png",
          description: "Main screen"
        },
      ],
      tags: ["Next.js", "React", "Tailwind",],
      link: "https://promptopia-jrdn.vercel.app/"
    },
    {
      title: "Project Management Tool",
      description: "Collaborative project management solution with real-time updates",
      images: [
        {
          original: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
          thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=160",
          description: "Main screen"
        },
        {
          original: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
          thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=160",
          description: "Project details"
        },
        {
          original: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
          thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=160",
          description: "Task management"
        }
      ],
      tags: ["Vue.js", "GraphQL", "PostgreSQL"],
      link: "#"
    },
    {
      title: "Crypto Trading Bot",
      description: "Automated cryptocurrency trading bot with advanced analytics",
      images: [
        {
          original: "https://images.unsplash.com/photo-1621761191319-c6fb62004040",
          thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=160",
          description: "Main screen"
        },
        {
          original: "https://images.unsplash.com/photo-1621761191319-c6fb62004040",
          thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=160",
          description: "Trading analytics"
        },
        {
          original: "https://images.unsplash.com/photo-1621761191319-c6fb62004040",
          thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=160",
          description: "Trade execution"
        }
      ],
      tags: ["Python", "Docker", "AWS", "MongoDB"],
      link: "#"
    },
    {
      title: "IoT Dashboard",
      description: "Real-time IoT device monitoring and management platform",
      images: [
        {
          original: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
          thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=160",
          description: "Main screen"
        },
        {
          original: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
          thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=160",
          description: "Device details"
        },
        {
          original: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
          thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=160",
          description: "Device management"
        }
      ],
      tags: ["React", "Node.js", "MQTT", "InfluxDB"],
      link: "#"
    }
  ];

  const skills = [
    { name: 'React/Next.js', icon: FaReact, level: 90 },
    { name: 'TypeScript', icon: SiTypescript, level: 85 },
    { name: 'Node.js', icon: FaNodeJs, level: 80 },
    { name: 'MongoDB', icon: SiMongodb, level: 75 },
    { name: 'AWS', icon: FaAws, level: 70 },
    { name: 'Docker', icon: SiDocker, level: 65 },
  ];

  const experiences: Experience[] = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovators Inc.",
      period: "2022 - Present",
      description: [
        "Led development of cloud-native applications serving 1M+ users",
        "Architected and implemented microservices infrastructure",
        "Mentored junior developers and established best practices"
      ],
      technologies: ["Next.js", "Node.js", "AWS", "MongoDB"],
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623" // Modern office building
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Co.",
      period: "2020 - 2022",
      description: [
        "Developed and maintained enterprise-level web applications",
        "Improved application performance by 40%",
        "Implemented CI/CD pipelines and automated testing"
      ],
      technologies: ["React", "TypeScript", "Docker", "PostgreSQL"],
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" // Corporate building
    },
    {
      title: "Frontend Developer",
      company: "Creative Web Labs",
      period: "2018 - 2020",
      description: [
        "Built responsive web applications using modern frameworks",
        "Collaborated with designers to implement pixel-perfect UIs",
        "Reduced load time by 60% through optimization"
      ],
      technologies: ["React", "Redux", "SASS", "Webpack"],
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c" // Creative office space
    }
  ];

  const education: Education[] = [
    {
      degree: "Master of Science in Computer Science",
      school: "Stanford University",
      period: "2020 - 2022",
      description: "Specialized in Artificial Intelligence and Machine Learning",
      achievements: [
        "Graduate Research Assistant in Deep Learning Lab",
        "Published 2 papers in top-tier conferences",
        "Teaching Assistant for Advanced Algorithms course"
      ],
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png",
      gpa: "3.92/4.0"
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      school: "Massachusetts Institute of Technology",
      period: "2016 - 2020",
      description: "Focus on Software Architecture and Systems Design",
      achievements: [
        "Dean's List for all semesters",
        "Led university's Programming Team",
        "Completed honors thesis on distributed systems"
      ],
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png",
      gpa: "3.89/4.0"
    }
  ];

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  function ProjectCard({ project, isFirst }: { project: Project; isFirst: boolean }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    };

    const handleGalleryClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click when clicking gallery button
      setIsModalOpen(true);
    };

    return (
      <>
        <motion.div
          className="card h-full group cursor-pointer flex flex-col"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onClick={handleCardClick}
        >
          <motion.div
            className="relative overflow-hidden rounded-xl mb-4 flex-shrink-0"
            whileHover="hover"
          >
            <Image
              src={project.images[0].original}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
            />
            {isFirst && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          flex items-end justify-center p-4"
              >
                <motion.button
                  className="px-6 py-2 bg-primary hover:bg-accent transition-colors rounded-full text-white font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGalleryClick}
                >
                  View Gallery
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          <div className="flex-grow flex flex-col">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-text-secondary mb-4 flex-grow group-hover:text-text-primary transition-colors">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary/50 rounded-full text-sm font-medium text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {isFirst && (
          <ProjectModal
            project={project}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </>
    );
  }

  function EducationCard({ education }: { education: Education }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-secondary/10 backdrop-blur-sm border border-secondary/30 p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
      >
        {/* Background gradient animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10">
          {/* Header section with logo and basic info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            <motion.div 
              className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/90 p-2 shadow-lg z-20"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={education.logo}
                alt={education.school}
                fill
                className="object-contain p-2"
              />
            </motion.div>
            
            <div className="flex-grow space-y-2">
              <motion.h3 
                className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: 'left' }}
              >
                {education.degree}
              </motion.h3>
              <p className="text-lg font-medium text-primary">{education.school}</p>
              <div className="flex items-center gap-3">
                <span className="text-text-secondary">{education.period}</span>
                {education.gpa && (
                  <>
                    <span className="text-text-secondary">•</span>
                    <motion.span 
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      whileHover={{ scale: 1.1 }}
                    >
                      GPA: {education.gpa}
                    </motion.span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Description */}x
          <motion.p 
            className="text-text-secondary mb-6"
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {education.description}
          </motion.p>

          {/* Achievements */}
          <motion.div
            className="space-y-3"
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-semibold text-text-primary mb-3">Key Achievements</h4>
            {education.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0 group-hover:scale-150 transition-transform" />
                <p className="text-text-secondary group-hover:text-text-primary transition-colors">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  function ProjectModal({ 
    project, 
    isOpen, 
    onClose 
  }: { 
    project: Project; 
    isOpen: boolean; 
    onClose: () => void;
  }) {
    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-6xl w-full bg-secondary p-6 rounded-2xl shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 hover:bg-background/80 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <ImageGallery
              items={project.images}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={true}
              showThumbnails={true}
              showBullets={false}
              autoPlay={false}
              slideInterval={3000}
              slideDuration={450}
              thumbnailPosition="bottom"
              additionalClass="custom-image-gallery"
            />
            <p className="text-text-secondary mt-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />
      
      {showWelcome && <WelcomeAnimation />}
      <Navbar />
      
      {/* Hero Section */}
      <ScrollAnimation>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          id="home" 
          className="section-padding min-h-screen flex items-center"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl sm:text-7xl font-bold mb-6"
              >
                Hi, I&apos;m <span className="text-primary">Jourdan</span>
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-xl sm:text-2xl text-text-secondary mb-8"
              >
                Full Stack Developer specializing in modern web and mobile applications
              </motion.p>
              <motion.a
                variants={fadeInUp}
                href="#contact"
                className="bg-primary hover:bg-accent transition-colors px-8 py-3 rounded-full text-white font-medium inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in touch
              </motion.a>
              <motion.div 
                variants={fadeInUp}
                className="mt-8 flex items-center gap-6"
              >
                <span className="text-text-secondary">Follow me on</span>
                <div className="flex items-center gap-4">
                  {socials.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-text-secondary ${social.color} transition-colors duration-300`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.name}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </ScrollAnimation>

      {/* Projects Section */}
      <ScrollAnimation>
        <section id="projects" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <h2 className="heading">Projects</h2>
            <p className="subheading">
              Here are some of my recent projects that showcase my skills and experience
            </p>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
            >
              {projects.map((project, index) => (
                <ProjectCard 
                  key={index} 
                  project={project} 
                  isFirst={index === 0}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollAnimation>

      {/* About Section */}
      <ScrollAnimation>
        <section id="about" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <h2 className="heading">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <p className="text-lg text-text-secondary">
                  With over 5 years of experience in full-stack development, I specialize in building scalable web and mobile applications. My passion lies in creating elegant solutions to complex problems.
                </p>
                <p className="text-lg text-text-secondary">
                  I&apos;m constantly learning new technologies and best practices to deliver cutting-edge solutions that meet modern development standards.
                </p>
                <div className="flex gap-4">
                  <a
                    href="/resume.pdf"
                    className="bg-primary hover:bg-accent transition-colors px-6 py-2 rounded-full text-white font-medium"
                  >
                    Download Resume
                  </a>
                  <a
                    href="#contact"
                    className="border border-primary text-primary hover:bg-primary hover:text-white transition-colors px-6 py-2 rounded-full font-medium"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
              <div className="relative h-[400px] animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 rounded-2xl" />
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                  alt="Profile"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Skills Section */}
      <ScrollAnimation>
        <section id="skills" className="section-padding bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="heading">Skills & Expertise</h2>
            <p className="subheading">
              Technologies and tools I work with
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
              {skills.map((skill, index) => (
                <SkillCard key={index} {...skill} />
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Experience Section */}
      <ScrollAnimation>
        <section id="experience" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <h2 className="heading">Experience</h2>
            <p className="subheading">
              My professional journey in software development
            </p>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="relative bg-secondary/50 rounded-2xl p-6 md:p-8 hover:bg-secondary/70 transition-colors">
                    {/* Timeline connector */}
                    {index !== experiences.length - 1 && (
                      <div className="absolute left-8 bottom-0 w-0.5 h-12 bg-primary/20 transform translate-y-full" />
                    )}
                    
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      {/* Company Logo */}
                      <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden bg-background/50">
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
                      </div>

                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                          <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                          <div className="flex items-center gap-2 text-text-secondary">
                            <span className="font-medium">{exp.company}</span>
                            <span>•</span>
                            <span>{exp.period}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <ul className="space-y-2 mb-4">
                          {exp.description.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + (i * 0.1) }}
                              className="flex items-start gap-2 text-text-secondary"
                            >
                              <span className="text-primary">▹</span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 + (i * 0.1) }}
                              className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Education Section */}
      <ScrollAnimation>
        <section id="education" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <h2 className="heading">Education</h2>
            <p className="subheading">
              My academic journey and achievements
            </p>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-8"
            >
              {education.map((edu, index) => (
                <EducationCard 
                  key={index} 
                  education={edu}
                />
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Contact Section */}
      <ScrollAnimation>
        <section id="contact" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <h2 className="heading">Get in Touch</h2>
            <p className="subheading">
              Let&apos;s discuss your next project
            </p>
            <div className="grid md:grid-cols-2 gap-12">
              <form className="space-y-6 animate-fade-in">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-secondary rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-secondary rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-secondary rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-accent transition-colors px-8 py-3 rounded-full text-white font-medium"
                >
                  Send Message
                </button>
              </form>
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <p className="flex items-center gap-3">
                      <span className="text-primary">📍</span> Cebu, Philippines
                    </p>
                    <p className="flex items-center gap-3">
                      <span className="text-primary">📧</span> jourdancatarina3@gmail.com
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                  <div className="flex gap-4">
                    {socials.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-text-secondary ${social.color} transition-colors duration-300`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={social.name}
                      >
                        <social.icon className="w-6 h-6" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Add more sections as needed */}
      <Footer />
    </>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/20 border-t border-secondary/30">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">John Doe</h3>
            <p className="text-text-secondary max-w-xs">
              Building digital experiences with modern web technologies
            </p>
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-text-secondary ${social.color} transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-text-secondary hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-text-secondary">
                <HiMail className="w-5 h-5 text-primary" />
                <a href="mailto:hello@example.com" className="hover:text-primary transition-colors duration-300">
                  hello@example.com
                </a>
              </li>
              <li className="text-text-secondary">
                <span className="flex items-center gap-2">
                  <span className="text-primary">📍</span>
                  San Francisco, CA
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-secondary/30">
          <p className="text-center text-text-secondary">
            © {currentYear} Jourdan Catarina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
