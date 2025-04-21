'use client';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
// import { HiMail } from 'react-icons/hi';
import { fadeInUp, staggerContainer } from './animations';

interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

interface Social {
  name: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

interface ContactSectionProps {
  socials: Social[];
}

export default function ContactSection({ socials }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'limit-reached'>('idle');
  const [responseData, setResponseData] = useState<{
    messagesRemaining?: number;
    limitReached?: boolean;
    resetTime?: string;
    error?: string;
  }>({});
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      setResponseData(responseData);

      if (response.status === 429) {
        // Rate limit exceeded
        setSubmitStatus('limit-reached');
        return;
      }
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      reset(); // Clear form
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <h2 className="heading">Get in Touch</h2>
        <p className="subheading">
          Let&apos;s discuss your next project
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.form 
            className="space-y-6 animate-fade-in"
            onSubmit={handleSubmit(onSubmit)}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`w-full px-4 py-2 bg-secondary rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                  errors.name ? 'ring-2 ring-red-500' : ''
                }`}
                {...register('name', { 
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`w-full px-4 py-2 bg-secondary rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                  errors.email ? 'ring-2 ring-red-500' : ''
                }`}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className={`w-full px-4 py-2 bg-secondary rounded-lg focus:ring-2 focus:ring-primary outline-none ${
                  errors.message ? 'ring-2 ring-red-500' : ''
                }`}
                {...register('message', { 
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' }
                })}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </motion.div>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/10 text-green-500 rounded-lg"
              >
                <p>Message sent successfully! I&apos;ll get back to you soon.</p>
                {responseData.messagesRemaining !== undefined && (
                  <p className="mt-2 text-sm">
                    You have {responseData.messagesRemaining} {responseData.messagesRemaining === 1 ? 'message' : 'messages'} remaining today.
                  </p>
                )}
              </motion.div>
            )}

            {submitStatus === 'limit-reached' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-yellow-500/10 text-yellow-500 rounded-lg"
              >
                <p>Message limit reached. You can only send 3 messages per day.</p>
                <p className="mt-2 text-sm">Please try again {responseData.resetTime || 'later'}.</p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 text-red-500 rounded-lg"
              >
                Failed to send message. Please try again later.
              </motion.div>
            )}

            <motion.button
              variants={fadeInUp}
              type="submit"
              className="w-full bg-primary hover:bg-accent transition-colors px-8 py-3 rounded-full text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || submitStatus === 'limit-reached'}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>

          <motion.div 
            className="space-y-8 animate-fade-in"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <span className="text-primary">📍</span> Cebu, Philippines
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-primary">📧</span> jourdancatarina3@gmail.com
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 