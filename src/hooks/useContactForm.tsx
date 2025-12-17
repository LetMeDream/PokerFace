import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { SubmitHandler } from "react-hook-form"
import type { FormValues } from "../types/Chat"
import { ContactFormSchema } from '../constants/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCompleteChatMutation } from '../services/service'
import { handleCompleteChatError } from "../utils/helpers";
import { setGuestProfile } from "../store/slices/guest";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

declare const grecaptcha: any;

// ! Deprecated
// Hook to actually be used in the PARENT of the ContactForm
/* export const useContactForm = ({ chatBodyRef, isChatInitiationSuccess }: ContactFormProps) => {
  const dispatch = useDispatch();
  const chatMessages = useSelector((state: RootState) => state.guest.messages);
  
  // Variables used to handle the form for the 'register' logic
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);
  // const [isUserConected, setIsUserConected] = useState(false);
  // useEffect to show the Contact Form
  useEffect(() => {
    if (chatMessages.length === 1 && isChatInitiationSuccess) {
      setTimeout(() => {
        // Scroll to bottom when contact form appears
        dispatch(setGuestMessages([...chatMessages, { type: 'contactForm', content: '' }]));
        setTimeout(() => {
          if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
          }
        }, 10);

      }, 1300);
    }
  }, [chatMessages, dispatch])

  return {
    isContactFormVisible,
    setIsContactFormVisible
  }
} */

/* Hook to be used INSIDE contact form */
export const useContactFormInternal = ({
  isSending,
  setIsSending,
  chatBodyRef
}: {
  isSending: boolean;
  setIsSending: (animating: boolean) => void;
  chatBodyRef: React.RefObject<HTMLDivElement | null>;
}) => {

  // Use FormValues as the form generic and cast the resolver to that type to avoid type mismatch
  const methods = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(ContactFormSchema),
    defaultValues: {
      phone: undefined,
    }
  });

  const { register, handleSubmit, formState: { isValid } } = methods;
  const { id: guestSessionId } = useSelector((state: RootState) => state.guest); // get chat state if needed
  const { isUserConected, phone_number } = useSelector((state: RootState) => state.guest);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = () => {
    // console.log(data);
  };
  const [completeChat, { isSuccess, isError, error, data }] = useCompleteChatMutation();

  const handleSend = async (token: string) => {
    if (isSending) return; // prevent duplicate animations
    (document.activeElement as HTMLElement | null)?.blur(); // remove focus from input
    setIsSending(true);
    const values = methods.getValues();
    await completeChat({
      session_id: guestSessionId,
      phone_number: values.phone || '',
      recaptcha_token: token
    }).unwrap()
  };

  const handleRecaptchaToken = (token: string) => {
    handleSend(token);
  }

  //* Initial function used to complete the chat when the user submits the contact form
  const handleSubmitContactForm = async (e: any) => {
    e.preventDefault();
    if (isSubmitting) return; 
    setIsSubmitting(true);

    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(() => {
        grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY_V3, { action: 'complete_chat' }).then((token: string) => {
          handleRecaptchaToken(token);
          setIsSubmitting(false);
        });
      });
    }
  }

  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSending(false); // reset animation state
        console.log(data)
        // Ensure data exists and normalize shape to satisfy GuesstState
        if (!data) return;
        const resp: any = data;
        const user = resp.user_data ?? resp.user ?? {};
        dispatch(setGuestProfile({
          id: user.id,
          session_id: user.session_id,
          chatRoomId: user.chat_room_id,
          email: user.email,
          full_name: user.full_name,
          phone_number: user.phone_number,
          is_temporary: user.is_temporary ?? false,
          messages: resp.messages ?? [],
          isUserConected: true,
          created_at: user.created_at ?? new Date().toISOString(),
        }));
      }, 1000); // match animation duration
    } else if (isError) {
      setTimeout(() => {
        setIsSending(false); // reset animation state
        handleCompleteChatError(error);
      }, 1000);
    }
  }, [isSuccess, setIsSending, isError, error]);


  const [isAgentAlerted, setIsAgentAlerted] = useState(false);

  useEffect(() => {
    if (isUserConected) {
      setTimeout(() => {
        setIsAgentAlerted(true);
      }, 333);
    }
  }, [isUserConected]);

  useEffect(() => {
    setTimeout(() => {
      if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, 333);
  }, [isAgentAlerted, chatBodyRef]);

  return {
    methods,
    register,
    handleSubmit,
    isValid,
    onSubmit,
    isUserConected,
    phone_number,
    isAgentAlerted,
    handleSubmitContactForm
  }
}