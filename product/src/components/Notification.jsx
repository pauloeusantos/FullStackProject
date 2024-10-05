import { Toast } from "@/components/ui/toast";

const Notification = ({ message, type }) => {
  return (
    <Toast type={type}>
      {message}
    </Toast>
  );
};

export default Notification;