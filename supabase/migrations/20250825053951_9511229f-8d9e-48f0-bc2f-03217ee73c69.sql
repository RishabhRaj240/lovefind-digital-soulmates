-- Add missing foreign key constraints
ALTER TABLE public.matches 
ADD CONSTRAINT matches_user1_id_fkey FOREIGN KEY (user1_id) REFERENCES public.profiles(user_id),
ADD CONSTRAINT matches_user2_id_fkey FOREIGN KEY (user2_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.conversation_participants 
ADD CONSTRAINT conversation_participants_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(user_id),
ADD CONSTRAINT conversation_participants_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id);

ALTER TABLE public.messages
ADD CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id),
ADD CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.profiles(user_id);

ALTER TABLE public.user_swipes
ADD CONSTRAINT user_swipes_swiper_id_fkey FOREIGN KEY (swiper_id) REFERENCES public.profiles(user_id),
ADD CONSTRAINT user_swipes_swiped_id_fkey FOREIGN KEY (swiped_id) REFERENCES public.profiles(user_id);

-- Fix the conversation_participants RLS policy that causes infinite recursion
DROP POLICY IF EXISTS "Users can view participants in their conversations" ON public.conversation_participants;

CREATE POLICY "Users can view participants in their conversations" 
ON public.conversation_participants 
FOR SELECT 
USING (EXISTS (
  SELECT 1 
  FROM public.conversation_participants cp2 
  WHERE cp2.conversation_id = conversation_participants.conversation_id 
  AND cp2.user_id = auth.uid()
));

-- Fix the conversations RLS policy
DROP POLICY IF EXISTS "Users can view conversations they participate in" ON public.conversations;

CREATE POLICY "Users can view conversations they participate in" 
ON public.conversations 
FOR SELECT 
USING (EXISTS (
  SELECT 1 
  FROM public.conversation_participants cp 
  WHERE cp.conversation_id = conversations.id 
  AND cp.user_id = auth.uid()
));