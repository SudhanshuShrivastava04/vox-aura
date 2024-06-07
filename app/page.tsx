import { SparklesPreview } from "@/components/sparkles-preview";
import VoiceAssistant from "@/components/voice-assist";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SparklesPreview />
      <VoiceAssistant />
    </main>
  );
}
