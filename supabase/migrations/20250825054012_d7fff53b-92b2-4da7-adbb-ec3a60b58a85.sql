-- Fix the conversation_participants RLS policy that causes infinite recursion
DROP POLICY IF EXISTS "Users can view participants in their conversations" ON public.conversation_participants;

-- Create security definer function to check if user participates in conversation
CREATE OR REPLACE FUNCTION public.user_participates_in_conversation(conversation_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.conversation_participants 
    WHERE conversation_id = conversation_uuid 
    AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

CREATE POLICY "Users can view participants in their conversations" 
ON public.conversation_participants 
FOR SELECT 
USING (public.user_participates_in_conversation(conversation_id));

-- Fix the conversations RLS policy
DROP POLICY IF EXISTS "Users can view conversations they participate in" ON public.conversations;

CREATE POLICY "Users can view conversations they participate in" 
ON public.conversations 
FOR SELECT 
USING (public.user_participates_in_conversation(id));