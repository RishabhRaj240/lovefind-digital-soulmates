-- Insert sample profiles for demonstration
INSERT INTO public.profiles (user_id, first_name, last_name, age, bio, location, interests, avatar_url) VALUES
(
  gen_random_uuid(),
  'Sarah',
  'Johnson',
  28,
  'Adventure seeker who loves hiking, photography, and trying new cuisines. Looking for someone who shares my passion for exploring the world!',
  'San Francisco, CA',
  ARRAY['hiking', 'photography', 'travel', 'cooking', 'yoga'],
  'https://images.unsplash.com/photo-1494790108755-2616b612b272?w=400&h=400&fit=crop&crop=face'
),
(
  gen_random_uuid(),
  'Michael',
  'Chen',
  32,
  'Software engineer by day, musician by night. I play guitar in a local band and love discovering new coffee shops around the city.',
  'Seattle, WA',
  ARRAY['music', 'coffee', 'technology', 'guitar', 'concerts'],
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
),
(
  gen_random_uuid(),
  'Emma',
  'Rodriguez',
  26,
  'Art teacher who believes creativity makes life beautiful. I spend weekends painting, visiting museums, and dancing salsa.',
  'Austin, TX',
  ARRAY['art', 'painting', 'dancing', 'museums', 'teaching'],
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
),
(
  gen_random_uuid(),
  'David',
  'Thompson',
  30,
  'Fitness enthusiast and personal trainer. I love helping others reach their goals. When I''m not at the gym, you''ll find me rock climbing or cooking healthy meals.',
  'Denver, CO',
  ARRAY['fitness', 'rock climbing', 'cooking', 'health', 'outdoor activities'],
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
),
(
  gen_random_uuid(),
  'Jessica',
  'Kim',
  29,
  'Book lover and writer working on my first novel. I enjoy quiet coffee shops, long walks, and deep conversations about life and literature.',
  'Portland, OR',
  ARRAY['reading', 'writing', 'coffee', 'literature', 'walking'],
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'
),
(
  gen_random_uuid(),
  'Ryan',
  'Parker',
  27,
  'Marketing professional who loves the outdoors. Weekends are for camping, fishing, or just relaxing by the lake with a good book.',
  'Minneapolis, MN',
  ARRAY['camping', 'fishing', 'outdoors', 'marketing', 'lakes'],
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
),
(
  gen_random_uuid(),
  'Olivia',
  'Martinez',
  25,
  'Veterinarian who adores all animals. I volunteer at local shelters and love horseback riding. Looking for someone who shares my compassion for furry friends!',
  'Phoenix, AZ',
  ARRAY['animals', 'veterinary', 'horseback riding', 'volunteering', 'nature'],
  'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face'
),
(
  gen_random_uuid(),
  'Alex',
  'Turner',
  31,
  'Chef at a local restaurant who experiments with fusion cuisine. I love farmers markets, wine tasting, and sharing meals with people I care about.',
  'Nashville, TN',
  ARRAY['cooking', 'wine', 'farmers markets', 'restaurants', 'food'],
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face'
);