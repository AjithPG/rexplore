-- Seed data for resources table
INSERT INTO resources (title, description, category, tags, url, type, status)
VALUES
  (
    'FreeCodeCamp',
    'Learn to code for free. Build projects. Earn certifications. Since 2014, more than 40,000 FreeCodeCamp.org graduates have gotten jobs at tech companies including Google, Apple, Amazon, and Microsoft.',
    'Course',
    ARRAY['Programming', 'Web Development', 'Certifications'],
    'https://www.freecodecamp.org/',
    'Course',
    'approved'
  ),
  (
    'Coursera (Free Courses)',
    'Join for free and get personalized recommendations, updates on new courses, and more. Thousands of free courses from top universities and companies.',
    'Course',
    ARRAY['University', 'Professional Certificates', 'Skills'],
    'https://www.coursera.org/courses?query=free',
    'Course',
    'approved'
  ),
  (
    'Upwork',
    'Upwork connects businesses with independent professionals and agencies around the globe. Where companies and freelancers work together.',
    'Earning',
    ARRAY['Freelancing', 'Jobs', 'Gigs'],
    'https://www.upwork.com/',
    'Job',
    'approved'
  ),
  (
    'Y Combinator Startup School',
    'The best resource for founders. Learn how to start a company, with help from the world''s top startup accelerator.',
    'Event',
    ARRAY['Startup', 'Entrepreneurship', 'Networking'],
    'https://www.startupschool.org/',
    'Event',
    'approved'
  );
