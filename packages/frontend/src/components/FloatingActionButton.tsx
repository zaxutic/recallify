import { Icon } from "@ailibs/feather-react-ts";
import "twin.macro";

import { trpc } from "client";

export const fileToDataUrl = (file: File): Promise<string> => {
  const reader = new FileReader();
  const dataUrlPromise: Promise<string> = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result as string);
  });

  reader.readAsDataURL(file);
  return dataUrlPromise;
};

const FloatingActionButton = () => {
  const mutation = trpc.postReceipt.useMutation();

  const handleCapture = async (target: HTMLInputElement) => {
    if (target.files && target.files.length !== 0) {
      const file = target.files[0];
      mutation.mutate({ image: await fileToDataUrl(file) });
    }
  };

  return (
    <label htmlFor="fab">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        tw="hidden"
        id="fab"
        onChange={e => void handleCapture(e.target)}
      />
      <Icon
        name="plus"
        tw="w-16 h-16 absolute bottom-32 right-8 bg-[#FDFDFF] overflow-visible rounded-full shadow-2 p-5 text-purple-1000"
      />
    </label>
  );
};

export default FloatingActionButton;
