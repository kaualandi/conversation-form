import MessagingChatWindow, {
  Response,
} from '../components/messaging-chat-window';
import { QUESTIONS } from '../contants/questions';
import { Question } from '../models/questions';

interface ChatProps {
  name: string;
  questions: Question[];
  validation(res: Response[]): void;
}

export default function Chat({ name, questions, validation }: ChatProps) {
  return (
    <div className='mx-auto max-w-5xl'>
      <MessagingChatWindow
        name={name}
        questions={questions}
        validation={validation}
      />
    </div>
  );
}
