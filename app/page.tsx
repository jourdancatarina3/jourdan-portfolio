'use client';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from "next/image";
import Navbar from "./components/Navbar";
import { FaReact, FaNodeJs, FaAws, FaVuejs } from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiDjango, SiTailwindcss, SiSvelte, SiN8N, SiSupabase } from 'react-icons/si';
import SkillCard from './components/SkillCard';
import WelcomeAnimation from './components/WelcomeAnimation';
import { fadeInUp, staggerContainer } from './components/animations';
import ScrollAnimation from './components/ScrollAnimation';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import Footer from './components/Footer';
import EducationCard from './components/EducationCard';
import ProjectModal from './components/ProjectModal';
import ContactSection from './components/ContactSection';

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
  type: 'fullstack' | 'frontend';
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
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url: string;
  color: string;
}

const socials: Social[] = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/jourdancatarina3',
    color: 'hover:text-[#2ea44f]'
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/jourdan-ken-catarina-606485241/',
    color: 'hover:text-[#0077b5]'
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
      title: "UP Cebu Campus Explorer",
      description: "Explore UP Cebu Campus - Navigate through buildings, find facilities, and discover the beauty of UP Cebu campus with our interactive map. Get real-time room schedules to plan your day efficiently!",
      images: [
        {
          original: "/projects/up-campus.png",
          thumbnail: "/projects/up-campus.png",
          description: "Interactive campus map"
        },
      ],
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      link: "https://upsee.sheldonarthursagrado.site/",
      type: "fullstack" as const
    },
    {
      title: "Badge Guru",
      description: "A mobile app that uses robust scanning technology to scan car emblems and automatically generate vector files for custom sticker cutting",
      images: [
        {
          original: "/projects/badgeguru1.png",
          thumbnail: "/projects/badgeguru1.png",
          description: "Home screen"
        },
        {
          original: "/projects/badgeguru2.png",
          thumbnail: "/projects/badgeguru2.png",
          description: "Emblems screen"
        },
        {
          original: "/projects/badgeguru3.png",
          thumbnail: "/projects/badgeguru3.png",
          description: "Scan screen"
        },
        {
          original: "/projects/badgeguru4.png",
          thumbnail: "/projects/badgeguru4.png",
          description: "How To screen"
        },
        {
          original: "/projects/badgeguru5.png",
          thumbnail: "/projects/badgeguru5.png",
          description: "Shop screen"
        },
      ],
      tags: ["React Native", "Expo", "AWS", "Directus CMS"],
      link: "#",
      type: "fullstack" as const
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
      link: "https://favisualizer.vercel.app/",
      type: "fullstack" as const
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
      link: "https://promptopia-jrdn.vercel.app/",
      type: "fullstack" as const
    },
    {
      title: "CarHub",
      description: "Streamline your car rental experience with our effortless booking process.",
      images: [
        {
          original: "/projects/carhub.png",
          thumbnail: "/projects/carhub.png",
          description: "Main screen"
        },
      ],
      tags: ["Next.js", "React", "Typescript", "Tailwind"],
      link: "https://carhub-jrdn.vercel.app/",
      type: "frontend" as const
    },
    {
      title: "GPT3 Landing Page",
      description: "A landing page for GPT3, built with React and Vanilla CSS",
      images: [
        {
          original: "/projects/gpt3.png",
          thumbnail: "/projects/gpt3.png",
          description: "Main screen"
        },
      ],
      tags: ["React", "Vanilla CSS"],
      link: "https://gpt3-jrdn.vercel.app/",
      type: "frontend" as const
    },
    {
      title: "Gerícht Restaurant",
      description: "A modern restaurant website built with React and styled with Vanilla CSS.",
      images: [
        {
          original: "/projects/restaurant.png",
          thumbnail: "/projects/restaurant.png",
          description: "Main screen"
        },
      ],
      tags: ["React", "Vanilla CSS"],
      link: "https://gericht-jrdn.vercel.app/",
      type: "frontend" as const
    },
    {
      title: "Flavor Finder",
      description: "Flavor Finder is a modern web application built with Vue 3 and Vite that helps users discover and explore recipes from around the world.",
      images: [
        {
          original: "/projects/flavor-finder.png",
          thumbnail: "/projects/flavor-finder.png",
          description: "Main screen"
        },
      ],
      tags: ["Vue", "Vite", "Tailwind"],
      link: "https://flavor-finder-gules.vercel.app/",
      type: "frontend" as const
    }
  ];

  const skills = [
    { name: 'React/Next.js', icon: FaReact, level: 90 },
    { name: 'React Native', icon: FaReact, level: 90 },
    { name: 'TypeScript', icon: SiTypescript, level: 85 },
    { name: 'Node.js', icon: FaNodeJs, level: 80 },
    { name: 'Expo', icon: SiMongodb, level: 80 },
    { name: 'Django', icon: SiDjango, level: 70 },
    { name: 'AWS', icon: FaAws, level: 60 },
    { name: 'Vue', icon: FaVuejs, level: 80 },
    { name: 'Tailwind', icon: SiTailwindcss, level: 90 },
    { name: 'Svelte', icon: SiSvelte, level: 65 },
    { name: 'n8n', icon: SiN8N, level: 70 },
    { name: 'Supabase', icon: SiSupabase, level: 80 },
  ];

  const experiences: Experience[] = [
    {
      title: "Lead Mobile App Developer",
      company: "Cyberclinic Inc.",
      period: "February 2025 - Present",
      description: [
        "Led the complete development of the company's cross-platform mobile application using React Native and Expo",
        "Built the mobile app from the ground up, replicating and integrating core features from the existing web platform, including task management, ticketing, meetings, projects, and accounting modules",
        "Developed and maintained backend integrations to ensure seamless data synchronization and communication with the company's existing Express.js and MongoDB backend",
        "Handled all aspects of infrastructure setup, app configuration, and deployment to both the App Store and Google Play Store",
        "Delivered a fully functional mobile app as a solo developer, achieving feature parity with the large-scale web platform maintained by a multi-developer team"
      ],
      technologies: [
        "React Native",
        "Expo",
        "iOS",
        "Android"
      ],
      logo: "/projects/cyberclinic-logo.png"
    },
    {
      title: "Fullstack Web Developer and Mobile App Developer",
      company: "Bitwork Solutions",
      period: "March 2024 - March 2025",
      description: [
        "Led development of Badge Guru, a React Native mobile app for scanning vehicle emblems and generating vector files for sticker-cutting templates",
        "Implemented a comprehensive e-commerce system with Stripe integration for secure payments",
        "Built user authentication system and profile management with secure image handling",
        "Developed real-time emblem scanning functionality supporting iOS and Android platforms",
        "Integrated subscription management system for premium features and recurring payments",
        "Created a robust feedback system using Mailgun for direct user communication"
      ],
      technologies: [
        "React Native",
        "Stripe",
        "Mailgun",
        "iOS",
        "Android"
      ],
      logo: "/projects/bitwork-logo.jpeg"
    },
    {
      title: "Fullstack Web Developer",
      company: "HQZen",
      period: "December 2023 - March 2024",
      description: [
        "Maintained and debugged the production website, ensuring optimal uptime and functionality",
        "Developed workforce management features for employee assignment and operational efficiency",
        "Collaborated with cross-functional teams to deliver scalable solutions using Vue.js and Django",
        "Participated in code reviews and team synchronization for optimal solution implementation"
      ],
      technologies: ["Vue.js", "Django", "Python", "PostgreSQL"],
      logo: "/projects/hqzen-logo.png"
    },
    {
      title: "Fullstack Developer",
      company: "Mind Fusion LTD",
      period: "October 2021 - January 2023",
      description: [
        "Developed and maintained a full-stack product review platform using Next.js, Express, and MongoDB",
        "Designed and optimized user interfaces in Figma, enhancing usability and overall user experience",
        "Implemented responsive and accessible front-end components with React, Next.js, and Tailwind CSS",
        "Built and integrated RESTful APIs with Express.js, managing data persistence and queries via MongoDB",
        "Ensured cross-platform compatibility and optimized performance for both mobile and desktop users"
      ],
      technologies: ["Next.js", "Express.js", "MongoDB", "React", "Tailwind CSS", "Figma"],
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623"
    },
  ];

  const education: Education[] = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of the Philippines - Cebu",
      period: "2022 - Present",
      description: "Focusing on Software Engineering and Web Development",
      achievements: [
        "Consistent Dean's Lister since First Year (2022-Present)",
        "Active member of UP Computer Science Guild",
        "Contributed to multiple collaborative software projects",
        "Maintained academic excellence while pursuing freelance development work"
      ],
      logo: "/projects/up-logo.png",
      gpa: "1.45/1.0"
    },
    {
      degree: "Senior High School",
      school: "Cebu City National Science High School",
      period: "2020 - 2022",
      description: "STEM Track with focus on Research and Technology",
      achievements: [
        "Graduated with High Honors",
        "Consistent High Honor Student (Grade 11-12)",
        "Conducted research on technological solutions for local community problems"
      ],
      logo: "/projects/scihi-logo.png",
      gpa: "96/100"
    },
    {
      degree: "Junior High School",
      school: "Cebu City National Science High School",
      period: "2016 - 2020",
      description: "Science and Technology Curriculum",
      achievements: [
        "Consistent Honor Student (Grade 7-10)",
        "Participated in various academic competitions",
        "Developed strong foundation in STEM subjects"
      ],
      logo: "/projects/scihi-logo.png",
      gpa: "93/100"
    }
  ];

  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  function ProjectCard({ project }: { project: Project }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasMultipleImages = project.images.length > 1;

    const handleCardClick = () => {
      if (project.link === "#" || hasMultipleImages) {
        setIsModalOpen(true);
      } else {
        window.open(project.link, '_blank', 'noopener,noreferrer');
      }
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
            <div className="absolute top-4 right-4 z-10">
              <span 
                className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
                  project.type === 'fullstack' 
                    ? 'bg-black/80 text-white border-white/20' 
                    : 'bg-black/80 text-white border-white/20'
                } shadow-lg`}
              >
                {project.type === 'fullstack' ? 'Full Stack' : 'Frontend'}
              </span>
            </div>

            <Image
              src={project.images[0].original}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
            />
            {hasMultipleImages && (
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

        {hasMultipleImages && (
          <ProjectModal
            project={project}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </>
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
              <div className="flex gap-4">
                <motion.a
                  variants={fadeInUp}
                  href="#contact"
                  className="bg-primary hover:bg-accent transition-colors px-8 py-3 rounded-full text-white font-medium inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in touch
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  className="border border-primary hover:border-accent hover:text-accent text-primary px-8 py-3 rounded-full font-medium inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </motion.a>
              </div>
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
                  As a Full Stack Developer with expertise in React Native and web technologies, I specialize in building scalable mobile and web applications. Currently pursuing my Computer Science degree at UP Cebu while maintaining Dean&apos;s List standing, I bring a strong academic foundation combined with practical industry experience.
                </p>
                <p className="text-lg text-text-secondary">
                  I&apos;m proficient in React/Next.js, React Native, TypeScript, Node.js, and various modern development tools, consistently delivering high-quality solutions that meet business needs. My professional journey includes developing Badge Guru&apos;s mobile application, maintaining HQzen&apos;s production website, and creating responsive web solutions at Mind Fusion Ltd.
                </p>
                <div className="flex gap-4">
                  <a
                    href="/resume.pdf"
                    className="bg-primary hover:bg-accent transition-colors px-6 py-2 rounded-full text-white font-medium"
                  >
                    Resume
                  </a>
                  <a
                    href="#contact"
                    className="border border-primary text-primary hover:border-accent hover:text-accent transition-colors px-6 py-2 rounded-full font-medium"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
              <div className="relative h-[450px] animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 rounded-2xl" />
                <Image
                  src="/jourdan.jpg"
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
        <ContactSection socials={socials} />
      </ScrollAnimation>

      {/* Add more sections as needed */}
      <Footer />
    </>
  );
}
